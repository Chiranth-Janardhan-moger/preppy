import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, 
  Trash2, 
  Copy, 
  Check, 
  ExternalLink, 
  Image as ImageIcon, 
  LogOut, 
  Settings, 
  Database, 
  RefreshCw,
  ArrowLeft
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { AdminImage } from '../../types';
import { 
  getSupabaseCredentials, 
  saveSupabaseCredentials, 
  fetchAdminImages, 
  uploadImageToStorage, 
  deleteImageFromStorage 
} from '../../lib/supabase';

export const AdminDashboardPage: React.FC = () => {
  const { adminLogout, navigateTo, showToast } = useShop();

  // Self-contained admin image state (not from ShopContext)
  const [adminImages, setAdminImages] = useState<AdminImage[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [imageTitle, setImageTitle] = useState('');
  const [targetSection, setTargetSection] = useState<'hero' | 'banner' | 'gallery' | 'collection'>('hero');
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterSection, setFilterSection] = useState<string>('all');

  // Supabase Credentials Settings Modal State
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [devPasswordVerified, setDevPasswordVerified] = useState(false);
  const [devPassword, setDevPassword] = useState('');
  const [devPasswordError, setDevPasswordError] = useState(false);
  const initialCreds = getSupabaseCredentials();
  const [supabaseUrl, setSupabaseUrl] = useState(initialCreds.url);
  const [supabaseAnonKey, setSupabaseAnonKey] = useState(initialCreds.anonKey);

  const loadImages = async () => {
    try {
      const images = await fetchAdminImages();
      setAdminImages(Array.isArray(images) ? images : []);
    } catch (e) {
      console.error('Failed to load admin images:', e);
      setAdminImages([]);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setImageTitle(file.name.replace(/\.[^/.]+$/, ""));
      const preview = URL.createObjectURL(file);
      setFilePreviewUrl(preview);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setImageTitle(file.name.replace(/\.[^/.]+$/, ""));
      const preview = URL.createObjectURL(file);
      setFilePreviewUrl(preview);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      showToast('Please choose an image file to upload.', 'error');
      return;
    }

    try {
      setIsUploading(true);
      const uploaded = await uploadImageToStorage(selectedFile, imageTitle, targetSection);
      setAdminImages(prev => [uploaded, ...prev]);
      showToast(`Image "${uploaded.title}" uploaded successfully!`, 'success');
      setSelectedFile(null);
      setFilePreviewUrl(null);
      setImageTitle('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err: any) {
      showToast(`Upload error: ${err.message || 'Failed to upload'}`, 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async (image: AdminImage) => {
    try {
      await deleteImageFromStorage(image);
      setAdminImages(prev => prev.filter(img => img.id !== image.id));
      showToast('Image deleted successfully from Storage', 'info');
    } catch (err) {
      showToast('Failed to delete image', 'error');
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    showToast('Public Image URL copied to clipboard!', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDevPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (devPassword === 'preppy@dev2026') {
      setDevPasswordVerified(true);
      setDevPasswordError(false);
    } else {
      setDevPasswordError(true);
      showToast('Invalid developer password', 'error');
    }
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveSupabaseCredentials(supabaseUrl, supabaseAnonKey);
    setIsConfigOpen(false);
    setDevPasswordVerified(false);
    setDevPassword('');
    showToast('Supabase API credentials saved successfully!', 'success');
    loadImages();
  };

  const handleCloseConfig = () => {
    setIsConfigOpen(false);
    setDevPasswordVerified(false);
    setDevPassword('');
    setDevPasswordError(false);
  };

  const filteredImages = (adminImages || []).filter(img => {
    if (filterSection === 'all') return true;
    return img.targetSection === filterSection;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0A0A0A] text-[#121212] dark:text-white pt-24 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Top Action Bar & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-stone-200 dark:border-neutral-800">
          <div className="space-y-1">
            <button
              onClick={() => navigateTo('home')}
              className="text-xs text-[#C5A880] font-semibold flex items-center gap-1 hover:underline mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Website Homepage
            </button>
            <h1 className="font-serif-luxury text-3xl md:text-4xl font-bold tracking-tight">
              Admin Media &amp; Supabase Storage
            </h1>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-sans">
              Upload images to Supabase Storage, retrieve public URLs, and manage homepage banners dynamically.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsConfigOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 hover:border-[#C5A880] transition-colors shadow-sm"
            >
              <Settings className="w-4 h-4 text-[#C5A880]" />
              <span>Supabase Config</span>
            </button>

            <button
              onClick={() => loadImages()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 hover:border-[#C5A880] transition-colors shadow-sm"
              title="Refresh images list"
            >
              <RefreshCw className="w-4 h-4 text-stone-500" />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={() => {
                adminLogout();
                navigateTo('home');
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/60 hover:bg-red-100 transition-colors shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Upload Form Card */}
        <div className="bg-white dark:bg-neutral-900 border border-stone-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C5A880]/15 flex items-center justify-center text-[#C5A880]">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif-luxury text-xl font-bold">Upload New Media to Storage</h2>
              <p className="text-xs text-stone-500">
                Select an image file. It will upload to Supabase Storage and generate a permanent public URL.
              </p>
            </div>
          </div>

          <form onSubmit={handleUploadSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Drag & Drop File Input Area */}
            <div className="lg:col-span-6 space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 block">
                1. Select Image File
              </label>
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-stone-300 dark:border-neutral-700 hover:border-[#C5A880] rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors min-h-[220px] bg-stone-50/50 dark:bg-neutral-800/30 group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {filePreviewUrl ? (
                  <div className="relative w-full h-44 rounded-xl overflow-hidden shadow-md group">
                    <img
                      src={filePreviewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                      Click to Change File
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-full bg-stone-200/60 dark:bg-neutral-700 flex items-center justify-center mx-auto text-stone-500 group-hover:text-[#C5A880] group-hover:scale-110 transition-all">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-stone-700 dark:text-stone-300">
                        Drag &amp; Drop Image Here or <span className="text-[#C5A880] underline">Browse</span>
                      </p>
                      <p className="text-[11px] text-stone-400">
                        Supports PNG, JPG, WEBP, SVG up to 10MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Metadata & Target Section Selector */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 block">
                    2. Image Title / Caption
                  </label>
                  <input
                    type="text"
                    value={imageTitle}
                    onChange={(e) => setImageTitle(e.target.value)}
                    placeholder="e.g. Royal Emerald Velvet Banner 2026"
                    className="w-full bg-stone-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 block">
                    3. Destination Placement Section
                  </label>
                  <select
                    value={targetSection}
                    onChange={(e: any) => setTargetSection(e.target.value)}
                    className="w-full bg-stone-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C5A880]"
                  >
                    <option value="hero">Hero Slider (Homepage Main Top Banner)</option>
                    <option value="banner">Middle Promotional Banner</option>
                    <option value="collection">Featured Collections Banner</option>
                    <option value="gallery">Instagram &amp; Runway Gallery</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isUploading || !selectedFile}
                className="w-full bg-[#121212] dark:bg-white text-white dark:text-black py-4 rounded-xl font-semibold text-xs uppercase tracking-widest hover:bg-[#C5A880] dark:hover:bg-[#C5A880] dark:hover:text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
              >
                {isUploading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Uploading to Supabase Storage...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Upload &amp; Generate Public URL</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Uploaded Media Table & Public URL Gallery */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif-luxury text-2xl font-bold">Uploaded Storage Images ({filteredImages.length})</h2>
              <p className="text-xs text-stone-500">
                Click "Copy Public URL" to use anywhere or test directly in your browser.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {['all', 'hero', 'banner', 'collection', 'gallery'].map((sec) => (
                <button
                  key={sec}
                  onClick={() => setFilterSection(sec)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${
                    filterSection === sec
                      ? 'bg-[#C5A880] text-stone-950 shadow'
                      : 'bg-stone-200/70 dark:bg-neutral-800 text-stone-600 dark:text-stone-400 hover:bg-stone-300'
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>
          </div>

          {filteredImages.length === 0 ? (
            <div className="bg-white dark:bg-neutral-900 border border-stone-200 dark:border-neutral-800 rounded-3xl p-12 text-center space-y-3">
              <ImageIcon className="w-10 h-10 text-stone-400 mx-auto" />
              <p className="text-sm font-semibold text-stone-600 dark:text-stone-300">
                No uploaded images found for section "{filterSection}"
              </p>
              <p className="text-xs text-stone-400 max-w-sm mx-auto">
                Use the upload form above to add image assets directly into your Supabase Storage bucket.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((img) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white dark:bg-neutral-900 border border-stone-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-md flex flex-col justify-between group hover:shadow-xl transition-shadow"
                >
                  <div className="space-y-3">
                    {/* Thumbnail Image Container */}
                    <div className="relative aspect-[16/10] bg-stone-100 dark:bg-neutral-800 overflow-hidden">
                      <img
                        src={img.url}
                        alt={img.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-[#E5C158] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/20">
                        {img.targetSection}
                      </span>
                    </div>

                    {/* Content Details */}
                    <div className="p-4 space-y-2">
                      <h3 className="font-semibold text-sm line-clamp-1">{img.title}</h3>
                      <div className="bg-stone-50 dark:bg-neutral-800/70 p-2 rounded-lg border border-stone-200/80 dark:border-neutral-700">
                        <span className="text-[10px] font-bold uppercase text-stone-400 block mb-0.5">
                          Public Storage URL:
                        </span>
                        <p className="text-[11px] font-mono text-stone-600 dark:text-stone-300 truncate">
                          {img.url}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-4 pt-0 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleCopyUrl(img.url, img.id)}
                      className="flex-1 bg-stone-100 dark:bg-neutral-800 hover:bg-[#C5A880] hover:text-black text-stone-800 dark:text-stone-200 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      {copiedId === img.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Public URL</span>
                        </>
                      )}
                    </button>

                    <a
                      href={img.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-stone-100 dark:bg-neutral-800 hover:bg-stone-200 rounded-xl text-stone-700 dark:text-stone-300 transition-colors"
                      title="Open image in new tab"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <button
                      onClick={() => handleDeleteImage(img)}
                      className="p-2 bg-red-50 dark:bg-red-950/50 hover:bg-red-100 dark:hover:bg-red-900/60 text-red-600 dark:text-red-400 rounded-xl transition-colors"
                      title="Delete image from storage"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Supabase API Credentials Modal */}
      <AnimatePresence>
        {isConfigOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-neutral-900 border border-stone-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-neutral-800 pb-4">
                <div className="flex items-center gap-3">
                  <Database className="w-6 h-6 text-[#C5A880]" />
                  <h3 className="font-serif-luxury text-xl font-bold">
                    {devPasswordVerified ? 'Supabase API Configuration' : 'Developer Verification'}
                  </h3>
                </div>
                <button
                  onClick={handleCloseConfig}
                  className="text-stone-400 hover:text-stone-700 font-bold"
                >
                  ✕
                </button>
              </div>

              {!devPasswordVerified ? (
                <form onSubmit={handleDevPasswordSubmit} className="space-y-4">
                  <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 text-xs space-y-1">
                    <p className="font-bold text-amber-700 dark:text-amber-400">Restricted Access</p>
                    <p className="text-amber-600 dark:text-amber-500 text-[11px] leading-relaxed">
                      Supabase credentials can only be modified by authorized developers. Enter the developer password to continue.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 block">
                      Developer Password
                    </label>
                    <input
                      type="password"
                      value={devPassword}
                      onChange={(e) => { setDevPassword(e.target.value); setDevPasswordError(false); }}
                      placeholder="Enter developer password"
                      autoFocus
                      className={`w-full bg-stone-50 dark:bg-neutral-800 border rounded-xl px-4 py-3 text-xs font-mono focus:outline-none focus:border-[#C5A880] ${
                        devPasswordError ? 'border-red-400 dark:border-red-600' : 'border-stone-200 dark:border-neutral-700'
                      }`}
                    />
                    {devPasswordError && (
                      <p className="text-[11px] text-red-500 font-semibold">Incorrect developer password. Access denied.</p>
                    )}
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleCloseConfig}
                      className="px-4 py-2.5 rounded-xl text-xs font-semibold border border-stone-300 dark:border-neutral-700 hover:bg-stone-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#121212] dark:bg-white text-white dark:text-black hover:bg-[#C5A880]"
                    >
                      Verify &amp; Continue
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSaveConfig} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 block">
                      Supabase Project URL
                    </label>
                    <input
                      type="url"
                      value={supabaseUrl}
                      onChange={(e) => setSupabaseUrl(e.target.value)}
                      placeholder="https://your-project.supabase.co"
                      className="w-full bg-stone-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl px-4 py-3 text-xs font-mono focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 block">
                      Supabase Anon Public API Key
                    </label>
                    <textarea
                      rows={3}
                      value={supabaseAnonKey}
                      onChange={(e) => setSupabaseAnonKey(e.target.value)}
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                      className="w-full bg-stone-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl px-4 py-3 text-xs font-mono focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div className="bg-stone-50 dark:bg-neutral-800/50 p-4 rounded-xl border border-stone-200 text-xs space-y-1">
                    <p className="font-bold text-[#C5A880]">Bucket Setup Instructions:</p>
                    <p className="text-stone-500 leading-relaxed text-[11px]">
                      Create a bucket named <code className="font-bold text-stone-900 dark:text-white">home</code> in Supabase Dashboard &rarr; Storage, and enable Public access.
                    </p>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleCloseConfig}
                      className="px-4 py-2.5 rounded-xl text-xs font-semibold border border-stone-300 dark:border-neutral-700 hover:bg-stone-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#121212] dark:bg-white text-white dark:text-black hover:bg-[#C5A880]"
                    >
                      Save Credentials
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
