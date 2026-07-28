import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Upload, 
  Trash2, 
  Image as ImageIcon, 
  LogOut, 
  RefreshCw,
  ArrowLeft
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { AdminImage } from '../../types';
import { 
  fetchAdminImages, 
  uploadImageToStorage, 
  deleteImageFromStorage,
  getSupabaseCredentials,
  saveSupabaseCredentials,
  getSupabaseClient
} from '../../lib/supabase';

export const AdminDashboardPage: React.FC = () => {
  const { adminLogout, navigateTo, showToast } = useShop();

  // Self-contained admin image state (not from ShopContext)
  const [adminImages, setAdminImages] = useState<AdminImage[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [imageTitle, setImageTitle] = useState('');
  const [targetSection, setTargetSection] = useState<'collection' | 'trending'>('collection');
  const [targetCategory, setTargetCategory] = useState<'Sarees' | 'Aariwork' | 'Accessories'>('Sarees');
  const [displayPrice, setDisplayPrice] = useState<string>('');
  const [actualPrice, setActualPrice] = useState<string>('');
  const [rating, setRating] = useState<string>('5.0');
  const [badgeText, setBadgeText] = useState<string>('Trending');
  const [subtitle, setSubtitle] = useState<string>('Artisan Atelier Special');
  const [isUploading, setIsUploading] = useState(false);
  const [filterSection, setFilterSection] = useState<string>('all');

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

  const formatCleanTitle = (fileName: string) => {
    const withoutExt = fileName.replace(/\.[^/.]+$/, "");
    const stripped = withoutExt.replace(/^\d+[\s_-]*/, '').replace(/[_]/g, ' ').trim();
    if (!stripped || /^\d+$/.test(stripped)) {
      return "Bespoke Couture Creation";
    }
    return stripped;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setImageTitle(formatCleanTitle(file.name));
      const preview = URL.createObjectURL(file);
      setFilePreviewUrl(preview);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setImageTitle(formatCleanTitle(file.name));
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
      const uploaded = await uploadImageToStorage(
        selectedFile, 
        imageTitle, 
        targetSection, 
        targetSection === 'collection' ? targetCategory : undefined,
        targetSection === 'collection' ? {
          displayPrice: displayPrice ? Number(displayPrice) : undefined,
          actualPrice: actualPrice ? Number(actualPrice) : undefined,
          rating: rating ? Number(rating) : 5.0,
          badgeText: badgeText || undefined,
          subtitle: subtitle || undefined
        } : undefined
      );
      setAdminImages(prev => [uploaded, ...prev]);
      showToast(`Image "${uploaded.title}" uploaded successfully!`, 'success');
      setSelectedFile(null);
      setFilePreviewUrl(null);
      setImageTitle('');
      setDisplayPrice('');
      setActualPrice('');
      setRating('5.0');
      setBadgeText('Trending');
      setSubtitle('Artisan Atelier Special');
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
              Admin Section
            </h1>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-sans">
              Upload and manage your store media images and homepage banners.
            </p>
          </div>

          <div className="flex items-center gap-3">
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
              <h2 className="font-serif-luxury text-xl font-bold">Upload New Media</h2>
              <p className="text-xs text-stone-500">
                Select an image file to upload to your storage collection.
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
                    <option value="collection">Featured Collections</option>
                    <option value="trending">Trending Section</option>
                  </select>
                </div>

                {targetSection === 'collection' && (
                  <>
                    <div className="space-y-1.5 pt-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 block">
                        4. Select Collection Category
                      </label>
                      <select
                        value={targetCategory}
                        onChange={(e: any) => setTargetCategory(e.target.value)}
                        className="w-full bg-stone-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C5A880]"
                      >
                        <option value="Sarees">Sarees</option>
                        <option value="Aariwork">Aariwork</option>
                        <option value="Accessories">Accessories</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 block">
                        Product Subtitle / Tagline
                      </label>
                      <input
                        type="text"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        placeholder="e.g. Artisan Atelier Special or Handcrafted Silk Edition"
                        className="w-full bg-stone-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 block">
                          Display Price (Sale ₹)
                        </label>
                        <input
                          type="number"
                          value={displayPrice}
                          onChange={(e) => setDisplayPrice(e.target.value)}
                          placeholder="e.g. 2450"
                          className="w-full bg-stone-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#C5A880]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 block">
                          Actual Price (Original ₹)
                        </label>
                        <input
                          type="number"
                          value={actualPrice}
                          onChange={(e) => setActualPrice(e.target.value)}
                          placeholder="e.g. 3950"
                          className="w-full bg-stone-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#C5A880]"
                        />
                      </div>
                    </div>

                    {actualPrice && displayPrice && Number(actualPrice) > Number(displayPrice) && (
                      <p className="text-[11px] text-[#C5A880] font-semibold">
                        Discount Preview: -{Math.round(((Number(actualPrice) - Number(displayPrice)) / Number(actualPrice)) * 100)}% Off (Strikethrough line active)
                      </p>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 block">
                          Star Rating (1.0 - 5.0)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          min="1"
                          max="5"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                          placeholder="5.0"
                          className="w-full bg-stone-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#C5A880]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 block">
                          Badge Tag (Top Left)
                        </label>
                        <input
                          type="text"
                          value={badgeText}
                          onChange={(e) => setBadgeText(e.target.value)}
                          placeholder="e.g. Trending, Latest, Hot"
                          className="w-full bg-stone-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#C5A880]"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              <button
                type="submit"
                disabled={isUploading || !selectedFile}
                className="w-full bg-[#121212] dark:bg-white text-white dark:text-black py-4 rounded-xl font-semibold text-xs uppercase tracking-widest hover:bg-[#C5A880] dark:hover:bg-[#C5A880] dark:hover:text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
              >
                {isUploading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Uploading Image...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Upload Image</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Uploaded Media Table */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif-luxury text-2xl font-bold">Uploaded Media Images ({filteredImages.length})</h2>
              <p className="text-xs text-stone-500">
                Manage your uploaded media images for featured collections and trending section.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {['all', 'collection', 'trending'].map((sec) => (
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
                Use the upload form above to add image assets.
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
                    <div className="p-4 flex items-center justify-between gap-3 border-t border-stone-100 dark:border-neutral-800">
                      <div className="space-y-0.5 truncate">
                        <h3 className="font-semibold text-sm truncate">{img.title}</h3>
                        <span className="text-[10px] uppercase text-stone-400 font-medium">{img.targetSection}</span>
                      </div>

                      <button
                        onClick={() => handleDeleteImage(img)}
                        className="px-3 py-2 bg-red-50 dark:bg-red-950/50 hover:bg-red-600 hover:text-white text-red-600 dark:text-red-400 rounded-xl transition-all text-xs font-semibold flex items-center gap-1.5 shrink-0 shadow-sm"
                        title="Delete image"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
