import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AdminImage, Product } from '../types';

const CONFIG_STORAGE_KEY_URL = 'preppy_supabase_url';
const CONFIG_STORAGE_KEY_ANON = 'preppy_supabase_anon_key';
const LOCAL_IMAGES_STORAGE_KEY = 'preppy_local_admin_images';

export function getSupabaseCredentials() {
  const url = import.meta.env.VITE_SUPABASE_URL || localStorage.getItem(CONFIG_STORAGE_KEY_URL) || '';
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || localStorage.getItem(CONFIG_STORAGE_KEY_ANON) || '';
  return { url, anonKey };
}

let supabaseInstance: SupabaseClient | null = null;
let cachedUrl = '';
let cachedAnonKey = '';

export function saveSupabaseCredentials(url: string, anonKey: string) {
  localStorage.setItem(CONFIG_STORAGE_KEY_URL, url.trim());
  localStorage.setItem(CONFIG_STORAGE_KEY_ANON, anonKey.trim());
  supabaseInstance = null;
  cachedUrl = '';
  cachedAnonKey = '';
}

export function getSupabaseClient(): SupabaseClient | null {
  const { url, anonKey } = getSupabaseCredentials();
  if (url && anonKey && typeof url === 'string' && url.trim().startsWith('http')) {
    const trimmedUrl = url.trim();
    const trimmedKey = anonKey.trim();
    
    if (supabaseInstance && cachedUrl === trimmedUrl && cachedAnonKey === trimmedKey) {
      return supabaseInstance;
    }
    
    try {
      cachedUrl = trimmedUrl;
      cachedAnonKey = trimmedKey;
      supabaseInstance = createClient(cachedUrl, cachedAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: false
        }
      });
      return supabaseInstance;
    } catch (err) {
      console.error('Failed to initialize Supabase client:', err);
      supabaseInstance = null;
    }
  }
  return null;
}

function cleanFileNameTitle(rawName: string): string {
  if (!rawName) return 'Artisan Creation';
  const withoutExt = rawName.replace(/\.[^/.]+$/, '');
  const stripped = withoutExt.replace(/^\d+[\s_-]*/, '').replace(/[_]/g, ' ').trim();
  if (!stripped || /^\d+$/.test(stripped)) {
    return 'Bespoke Atelier Creation';
  }
  return stripped;
}

function getLocalMetadataCache(): Record<string, Partial<AdminImage>> {
  try {
    const list: AdminImage[] = JSON.parse(localStorage.getItem(LOCAL_IMAGES_STORAGE_KEY) || '[]');
    return Object.fromEntries(
      list.filter(Boolean).flatMap(item => [
        item.filePath ? [item.filePath, item] : [],
        item.url ? [item.url, item] : []
      ].filter(pair => pair.length === 2))
    );
  } catch {
    return {};
  }
}

export function mapAdminImagesToProducts(adminImages: AdminImage[], idPrefix = 'up-prod'): Product[] {
  return adminImages
    .filter(img => img.targetSection === 'collection')
    .map((img, idx) => {
      const dPrice = img.displayPrice || 2950;
      const aPrice = img.actualPrice;
      const discountPercent = (aPrice && aPrice > dPrice) ? Math.round(((aPrice - dPrice) / aPrice) * 100) : undefined;

      return {
        id: `${idPrefix}-${img.id || idx}`,
        name: img.title || `${img.targetCategory || 'Couture'} Creation`,
        subtitle: img.subtitle || 'Artisan Atelier Special',
        category: img.targetCategory || 'Sarees',
        price: dPrice,
        originalPrice: aPrice,
        discountPercentage: discountPercent,
        rating: img.rating || 5.0,
        reviewCount: 18,
        isNew: true,
        isBestSeller: true,
        images: [img.url, img.url],
        colors: [{ name: 'Royal Gold', hex: '#D4AF37' }],
        sizes: ['Standard', 'Custom Fit'],
        fabric: 'Handcrafted Silk',
        careInstructions: 'Dry clean only',
        description: 'Custom handcrafted creation uploaded directly from atelier.',
        details: ['Handcrafted detailing', 'Custom sizing available'],
        inStock: true,
        stockCount: 5,
        reviewsList: [],
        sku: `SKU-UP-${idx}`,
        tags: ['New', 'Atelier', img.badgeText || 'Trending']
      };
    });
}

export async function fetchAdminImages(): Promise<AdminImage[]> {
  const supabase = getSupabaseClient();
  let results: AdminImage[] = [];
  const metaMap = getLocalMetadataCache();

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
          title: cleanFileNameTitle(row.title || 'Uploaded Media'),
          subtitle: row.subtitle || row.sub_title,
          bucket: row.bucket || 'home',
          filePath: row.file_path || '',
          targetSection: row.target_section || 'collection',
          targetCategory: row.target_category,
          displayPrice: row.display_price ? Number(row.display_price) : undefined,
          actualPrice: row.actual_price ? Number(row.actual_price) : undefined,
          rating: row.rating ? Number(row.rating) : undefined,
          badgeText: row.badge_text,
          createdAt: row.created_at
        }));
      }

      // Try fetching cloud catalog_metadata.json directly from Supabase Storage bucket
      try {
        const { data: fileData, error: downloadError } = await supabase.storage.from('home').download('catalog_metadata.json');
        if (!downloadError && fileData) {
          const text = await fileData.text();
          const cloudItems: AdminImage[] = JSON.parse(text);
          if (Array.isArray(cloudItems) && cloudItems.length > 0) {
            return cloudItems;
          }
        }
      } catch (jsonErr) {
        console.warn('Cloud catalog_metadata.json read error:', jsonErr);
      }

      for (const bucketName of ['home', 'images', 'public']) {
        const { data: storageFiles } = await supabase
          .storage
          .from(bucketName)
          .list('', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });

        if (storageFiles && storageFiles.length > 0) {
          const files = storageFiles
            .filter(f => f.name !== '.emptyFolderPlaceholder' && f.name !== 'catalog_metadata.json')
            .map(f => {
              const publicUrl = supabase.storage.from(bucketName).getPublicUrl(f.name).data.publicUrl;
              const cached = metaMap[f.name] || metaMap[publicUrl];
              const isTrendingFile = f.name.toLowerCase().includes('trending');
              return {
                id: f.id || f.name,
                url: publicUrl,
                title: cached?.title || cleanFileNameTitle(f.name),
                subtitle: cached?.subtitle,
                bucket: bucketName,
                filePath: f.name,
                targetSection: cached?.targetSection || (isTrendingFile ? 'trending' : 'collection'),
                targetCategory: cached?.targetCategory,
                displayPrice: cached?.displayPrice,
                actualPrice: cached?.actualPrice,
                rating: cached?.rating,
                badgeText: cached?.badgeText,
                createdAt: f.created_at || new Date().toISOString()
              };
            });
          if (files.length > 0) {
            results.push(...files);
            break; // Stop once primary bucket files are loaded
          }
        }
      }

      if (results.length > 0) {
        return results;
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
        const validUserUploaded = parsed.filter(img => img && img.url && !img.url.includes('unsplash.com'));
        return validUserUploaded;
      }
    }
  } catch (e) {
    console.error('LocalStorage read error:', e);
  }

  return [];
}

export async function uploadImageToStorage(
  file: File,
  title: string,
  targetSection: 'collection' | 'trending' | 'hero' | 'banner' | 'gallery' = 'collection',
  targetCategory?: 'Sarees' | 'Aariwork' | 'Accessories',
  extraMeta?: {
    displayPrice?: number;
    actualPrice?: number;
    rating?: number;
    badgeText?: string;
    subtitle?: string;
  }
): Promise<AdminImage> {
  const supabase = getSupabaseClient();
  const fileExt = file.name.split('.').pop();
  const cleanName = file.name.replace(/[^a-zA-Z0-9]/g, '_');
  const fileName = `${Date.now()}_${targetSection}_${cleanName}.${fileExt}`;
  
  // Potential buckets to try in order
  const bucketsToTry = ['home', 'images', 'public'];

  if (supabase) {
    let lastError: any = null;

    for (const bucketName of bucketsToTry) {
      try {
        const { error: uploadError } = await supabase
          .storage
          .from(bucketName)
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: true
          });

        if (!uploadError) {
          const { data: publicUrlData } = supabase
            .storage
            .from(bucketName)
            .getPublicUrl(fileName);

          const publicUrl = publicUrlData.publicUrl;
          const newId = `spb-${Date.now()}`;
          const itemTitle = cleanFileNameTitle(title || file.name);

          try {
            await supabase.from('home_images').insert([
              {
                id: newId,
                url: publicUrl,
                title: itemTitle,
                subtitle: extraMeta?.subtitle,
                bucket: bucketName,
                file_path: fileName,
                target_section: targetSection,
                target_category: targetCategory,
                display_price: extraMeta?.displayPrice,
                actual_price: extraMeta?.actualPrice,
                rating: extraMeta?.rating,
                badge_text: extraMeta?.badgeText,
                created_at: new Date().toISOString()
              }
            ]);
          } catch (dbErr) {
            console.warn('Database record insert skipped (optional table):', dbErr);
          }

          const item: AdminImage = {
            id: newId,
            url: publicUrl,
            title: itemTitle,
            subtitle: extraMeta?.subtitle,
            bucket: bucketName,
            filePath: fileName,
            targetSection,
            targetCategory,
            displayPrice: extraMeta?.displayPrice,
            actualPrice: extraMeta?.actualPrice,
            rating: extraMeta?.rating,
            badgeText: extraMeta?.badgeText,
            createdAt: new Date().toISOString()
          };

          await syncToLocalCache(item);
          return item;
        } else {
          lastError = uploadError;
          console.warn(`Upload attempt failed for bucket '${bucketName}':`, uploadError.message);
        }
      } catch (err: any) {
        lastError = err;
      }
    }

    // If Supabase client was present but all bucket uploads failed, throw the error!
    if (lastError) {
      throw new Error(`Supabase Storage Error: ${lastError.message || 'Bucket not found or permission denied. Please create a public bucket named "home" in Supabase Dashboard.'}`);
    }
  }

  // Fallback to FileReader only when no Supabase client is configured
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
        targetCategory,
        displayPrice: extraMeta?.displayPrice,
        actualPrice: extraMeta?.actualPrice,
        rating: extraMeta?.rating,
        badgeText: extraMeta?.badgeText,
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
    await syncCloudMetadata(updated);
  } catch (e) {
    console.error('LocalStorage write error:', e);
  }
}

async function syncCloudMetadata(items: AdminImage[]) {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const jsonBlob = new Blob([JSON.stringify(items)], { type: 'application/json' });
      await supabase.storage.from('home').upload('catalog_metadata.json', jsonBlob, {
        upsert: true,
        cacheControl: '0'
      });
    } catch (e) {
      console.warn('Cloud metadata sync skipped:', e);
    }
  }
}

async function syncToLocalCache(newItem: AdminImage) {
  try {
    let existing: AdminImage[] = [];
    const raw = localStorage.getItem(LOCAL_IMAGES_STORAGE_KEY);
    if (raw) {
      existing = JSON.parse(raw);
    }
    const filtered = existing.filter(img => img.id !== newItem.id && img.filePath !== newItem.filePath);
    const updated = [newItem, ...filtered];
    localStorage.setItem(LOCAL_IMAGES_STORAGE_KEY, JSON.stringify(updated));
    await syncCloudMetadata(updated);
  } catch (e) {
    console.error('Sync to local cache error:', e);
  }
}
