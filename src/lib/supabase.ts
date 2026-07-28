import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AdminImage } from '../types';

const CONFIG_STORAGE_KEY_URL = 'preppy_supabase_url';
const CONFIG_STORAGE_KEY_ANON = 'preppy_supabase_anon_key';
const LOCAL_IMAGES_STORAGE_KEY = 'preppy_local_admin_images';

export function getSupabaseCredentials() {
  const url = import.meta.env.VITE_SUPABASE_URL || localStorage.getItem(CONFIG_STORAGE_KEY_URL) || '';
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || localStorage.getItem(CONFIG_STORAGE_KEY_ANON) || '';
  return { url, anonKey };
}

export function saveSupabaseCredentials(url: string, anonKey: string) {
  localStorage.setItem(CONFIG_STORAGE_KEY_URL, url.trim());
  localStorage.setItem(CONFIG_STORAGE_KEY_ANON, anonKey.trim());
}

export function getSupabaseClient(): SupabaseClient | null {
  const { url, anonKey } = getSupabaseCredentials();
  if (url && anonKey && typeof url === 'string' && url.trim().startsWith('http')) {
    try {
      return createClient(url.trim(), anonKey.trim());
    } catch (err) {
      console.error('Failed to initialize Supabase client:', err);
    }
  }
  return null;
}

// Initial seed default dynamic banners
const DEFAULT_DYNAMIC_IMAGES: AdminImage[] = [
  {
    id: 'img-seed-1',
    url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=80',
    title: 'Haute Couture Silk Showcase',
    bucket: 'home',
    filePath: 'home/banner_silk_showcase.jpg',
    targetSection: 'hero',
    createdAt: new Date().toISOString()
  },
  {
    id: 'img-seed-2',
    url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=80',
    title: 'Royal Festive Velvet Edition',
    bucket: 'home',
    filePath: 'home/banner_velvet_edition.jpg',
    targetSection: 'banner',
    createdAt: new Date().toISOString()
  }
];

export async function fetchAdminImages(): Promise<AdminImage[]> {
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('home_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((row: any) => ({
          id: row.id,
          url: row.url,
          title: row.title || 'Uploaded Media',
          bucket: row.bucket || 'home',
          filePath: row.file_path || '',
          targetSection: row.target_section || 'banner',
          createdAt: row.created_at
        }));
      }

      const { data: storageFiles, error: storageErr } = await supabase
        .storage
        .from('home')
        .list('', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });

      if (!storageErr && storageFiles && storageFiles.length > 0) {
        return storageFiles
          .filter(f => f.name !== '.emptyFolderPlaceholder')
          .map(f => {
            const publicUrl = supabase.storage.from('home').getPublicUrl(f.name).data.publicUrl;
            return {
              id: f.id || f.name,
              url: publicUrl,
              title: f.name,
              bucket: 'home',
              filePath: f.name,
              targetSection: 'hero',
              createdAt: f.created_at || new Date().toISOString()
            };
          });
      }
    } catch (e) {
      console.warn('Supabase fetch error, using local fallback:', e);
    }
  }

  try {
    const raw = localStorage.getItem(LOCAL_IMAGES_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('LocalStorage read error:', e);
  }

  return DEFAULT_DYNAMIC_IMAGES;
}

export async function uploadImageToStorage(
  file: File,
  title: string,
  targetSection: 'hero' | 'banner' | 'gallery' | 'collection' = 'hero'
): Promise<AdminImage> {
  const supabase = getSupabaseClient();
  const fileExt = file.name.split('.').pop();
  const cleanName = file.name.replace(/[^a-zA-Z0-9]/g, '_');
  const fileName = `${Date.now()}_${cleanName}.${fileExt}`;
  const bucketName = 'home';

  if (supabase) {
    try {
      const { error: uploadError } = await supabase
        .storage
        .from(bucketName)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        console.error('Supabase storage upload error:', uploadError);
        throw new Error(uploadError.message);
      }

      const { data: publicUrlData } = supabase
        .storage
        .from(bucketName)
        .getPublicUrl(fileName);

      const publicUrl = publicUrlData.publicUrl;
      const newId = `spb-${Date.now()}`;

      try {
        await supabase.from('home_images').insert([
          {
            id: newId,
            url: publicUrl,
            title: title || file.name,
            bucket: bucketName,
            file_path: fileName,
            target_section: targetSection,
            created_at: new Date().toISOString()
          }
        ]);
      } catch (dbErr) {
        console.warn('Database record insert skipped (optional table):', dbErr);
      }

      const item: AdminImage = {
        id: newId,
        url: publicUrl,
        title: title || file.name,
        bucket: bucketName,
        filePath: fileName,
        targetSection,
        createdAt: new Date().toISOString()
      };

      await syncToLocalCache(item);
      return item;
    } catch (err: any) {
      console.warn('Supabase upload failed, using local blob reader:', err);
    }
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      const fallbackItem: AdminImage = {
        id: `loc-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        url: dataUrl,
        title: title || file.name,
        bucket: 'home-local',
        filePath: fileName,
        targetSection,
        createdAt: new Date().toISOString()
      };
      await syncToLocalCache(fallbackItem);
      resolve(fallbackItem);
    };
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

export async function deleteImageFromStorage(image: AdminImage): Promise<void> {
  const supabase = getSupabaseClient();

  if (supabase && image.bucket === 'home' && image.filePath) {
    try {
      await supabase.storage.from(image.bucket).remove([image.filePath]);
      await supabase.from('home_images').delete().eq('id', image.id);
    } catch (err) {
      console.error('Supabase deletion error:', err);
    }
  }

  try {
    const existing = await fetchAdminImages();
    const updated = existing.filter(img => img.id !== image.id);
    localStorage.setItem(LOCAL_IMAGES_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('LocalStorage write error:', e);
  }
}

async function syncToLocalCache(newItem: AdminImage) {
  try {
    const existing = await fetchAdminImages();
    const filtered = existing.filter(img => img.id !== newItem.id);
    const updated = [newItem, ...filtered];
    localStorage.setItem(LOCAL_IMAGES_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Sync to local cache error:', e);
  }
}
