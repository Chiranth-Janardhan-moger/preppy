import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Filter, 
  Grid3X3, 
  List, 
  X, 
  Star, 
  Eye, 
  ShoppingBag, 
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { DropdownMenu, DropdownMenuItem } from '@astryxdesign/core/DropdownMenu';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/mockData';
import { CategoryType, Product } from '../../types';
import { fetchAdminImages, mapAdminImagesToProducts } from '../../lib/supabase';

export const ShopPage: React.FC = () => {
  const { 
    selectedCategory, 
    setSelectedCategory, 
    formatPrice, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setQuickViewProduct, 
    navigateTo 
  } = useShop();

  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState<number>(15000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [uploadedProducts, setUploadedProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadUploaded() {
      try {
        const adminImgs = await fetchAdminImages();
        setUploadedProducts(mapAdminImagesToProducts(adminImgs, 'shop-up-prod'));
      } catch (e) {
        console.error('Error loading uploaded images for ShopPage:', e);
      }
    }
    loadUploaded();
  }, []);

  const categories: CategoryType[] = [
    'All', 'Sarees', 'Aariwork', 'Accessories'
  ];

  const resetFilters = () => {
    setSelectedCategory('All');
    setPriceRange(15000);
    setSortBy('featured');
  };

  const activeFilterCount = (selectedCategory !== 'All' ? 1 : 0) + (priceRange < 15000 ? 1 : 0);

  const allProducts = useMemo(() => [...uploadedProducts, ...PRODUCTS], [uploadedProducts]);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      if (selectedCategory !== 'All') {
        if (selectedCategory === 'Luxury Collection' && !p.isLuxury) return false;
        if (selectedCategory === 'Sarees') {
          if (p.category !== 'Sarees' && p.subCategory !== 'Saree' && !p.tags.some(t => t.toLowerCase().includes('saree'))) return false;
        } else if (selectedCategory === 'Aariwork') {
          if (p.category !== 'Aariwork' && p.subCategory !== 'Aariwork' && !p.tags.some(t => t.toLowerCase().includes('aari') || t.toLowerCase().includes('embroidered') || t.toLowerCase().includes('zardozi'))) return false;
        } else if (p.category !== selectedCategory && !p.tags.includes(selectedCategory)) {
          return false;
        }
      }
      if (p.price > priceRange) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default featured order
    });
  }, [allProducts, selectedCategory, priceRange, sortBy]);

  return (
    <div className="pt-24 pb-28 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto space-y-12">
      {/* Header Text */}
      <div className="text-center space-y-3 border-b border-stone-200 dark:border-neutral-800 pb-6">
        <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A880] font-bold flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Haute Couture Collection
        </span>
        <h1 className="font-serif-luxury text-3xl md:text-5xl font-medium tracking-tight text-stone-900 dark:text-stone-100">
          Signature Collections
        </h1>
        <p className="text-xs text-stone-500 max-w-lg mx-auto leading-relaxed">
          Browse our finest silk, cotton, bridal, and festive sarees, thoughtfully crafted for every celebration.
        </p>
      </div>


      {/* Top Controls Bar */}
      <div className="flex items-center justify-between gap-4 py-2 border-b border-stone-200 dark:border-neutral-800">
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="lg:hidden flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-stone-100 dark:bg-neutral-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 px-4 py-2 rounded-xl border border-stone-300 dark:border-neutral-700 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#C5A880]" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#C5A880] text-stone-950 font-bold text-[10px] flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>

        <div className="flex items-center gap-3 ml-auto">
  {/* Sort By Label */}
  <span className="text-[10px] uppercase tracking-[0.15em] font-semibold text-stone-500 dark:text-stone-400">
    Sort By
  </span>

  {/* Dropdown */}
  <DropdownMenu
  button={{
    label:
      sortBy === "featured"
        ? "Featured First"
        : sortBy === "price-asc"
        ? "Price: Low to High"
        : sortBy === "price-desc"
        ? "Price: High to Low"
        : "Highest Rating",
    className:
      "min-w-[180px] rounded-xl border border-stone-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm font-semibold text-stone-900 dark:text-stone-100 shadow-sm",
  }}
>
    <DropdownMenuItem
      label="Featured First"
      onClick={() => setSortBy("featured")}
      style={{}}
      className="font-semibold text-base px-3 py-2"
    />
    <DropdownMenuItem
      label="Price: Low to High"
      onClick={() => setSortBy("price-asc")}
      style={{}}
      className="font-semibold text-base px-3 py-2"
    />
    <DropdownMenuItem
      label="Price: High to Low"
      onClick={() => setSortBy("price-desc")}
      style={{}}
      className="font-[#C5A880] font-semibold text-base px-3 py-2"
    />
    <DropdownMenuItem
      label="Highest Rating"
      onClick={() => setSortBy("rating")}
      style={{}}
      className="font-semibold text-base px-3 py-2"
    />
  </DropdownMenu>


          {/* Grid/List Toggle */}
          <div className="hidden sm:flex border border-stone-200 dark:border-neutral-700 rounded-xl overflow-hidden p-0.5 bg-stone-50 dark:bg-neutral-800">
            <button
              onClick={() => setLayoutMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                layoutMode === 'grid' ? 'bg-[#C5A880] text-stone-950 shadow-sm font-bold' : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
              title="Grid View"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayoutMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                layoutMode === 'list' ? 'bg-[#C5A880] text-stone-950 shadow-sm font-bold' : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Catalog Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Sidebar Filters (Desktop) */}
        <div className="hidden lg:block space-y-7 bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-stone-200 dark:border-neutral-800 shadow-md h-fit sticky top-28">
          <div className="flex justify-between items-center pb-4 border-b border-stone-200 dark:border-neutral-800">
            <h3 className="font-serif-luxury text-base font-semibold flex items-center gap-2 text-stone-900 dark:text-stone-100">
              <Filter className="w-4 h-4 text-[#C5A880]" /> Refine Collection
            </h3>
            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-[11px] text-[#C5A880] hover:underline flex items-center gap-1 font-semibold uppercase tracking-wider"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>

          {/* Categories Sidebar */}
          <div className="space-y-2.5">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Category</h4>
            <div className="space-y-1 text-xs font-medium">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left py-2 px-3 rounded-xl transition-all flex justify-between items-center ${
                    selectedCategory === cat
                      ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-semibold shadow'
                      : 'hover:bg-stone-100 dark:hover:bg-neutral-800 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  <span>{cat}</span>
                  {selectedCategory === cat && <ChevronRight className="w-3.5 h-3.5 text-[#C5A880]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-3 pt-5 border-t border-stone-200 dark:border-neutral-800">
            <div className="flex justify-between text-xs font-semibold">
              <span className="uppercase text-stone-400 text-[10px] tracking-wider">Max Price</span>
              <span className="text-[#C5A880] font-bold">{formatPrice(priceRange)}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="15000"
              step="500"
              value={priceRange}
              onChange={e => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#C5A880] cursor-pointer"
            />
          </div>
        </div>

        {/* Product Catalog Display Grid/List */}
        <div className="lg:col-span-3 space-y-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-neutral-900 rounded-2xl p-8 border border-stone-200 dark:border-neutral-800 space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-[#C5A880]/15 flex items-center justify-center mx-auto text-[#C5A880]">
                <Filter className="w-8 h-8" />
              </div>
              <h3 className="font-serif-luxury text-2xl text-stone-900 dark:text-stone-100">
                No matching creations found
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
                We couldn't find any items matching your selected criteria. Try adjusting your filters or price limit.
              </p>
              <button
                onClick={resetFilters}
                className="bg-[#C5A880] hover:bg-[#b09268] text-stone-950 px-6 py-3 rounded-xl text-xs uppercase font-bold tracking-wider transition-colors shadow-md"
              >
                Reset All Filters
              </button>
            </div>
          ) : layoutMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {filteredProducts.map(product => {
                const inWish = isInWishlist(product.id);

                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="group relative bg-white dark:bg-neutral-900 rounded-xl sm:rounded-2xl overflow-hidden border border-stone-200 dark:border-neutral-800 shadow-sm hover:shadow-2xl hover:border-[#C5A880]/50 transition-all duration-500 flex flex-col justify-between"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 dark:bg-neutral-800">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-duration-700"
                      />

                      {/* Luxury Badge Tag */}
                      {product.isLuxury && (
                        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-stone-900/90 text-[#E5C158] text-[8px] sm:text-[9px] font-bold uppercase tracking-widest border border-[#C5A880]/40 backdrop-blur-md">
                          Haute Exclusive
                        </div>
                      )}
                    </div>

                    <div className="p-3 sm:p-4 space-y-1 sm:space-y-1.5 flex-1 flex flex-col justify-between">
                      <div className="space-y-0.5 sm:space-y-1">
                        <div className="flex items-center justify-between text-[9px] sm:text-[10px] uppercase tracking-widest font-bold">
                          <span className="text-[#C5A880] truncate max-w-[65%]">{product.category}</span>
                          <div className="flex items-center gap-0.5 sm:gap-1 text-amber-500 font-semibold shrink-0">
                            <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-500" />
                            <span className="text-stone-800 dark:text-stone-200">{product.rating}</span>
                          </div>
                        </div>

                        <h3
                          className="font-serif-luxury text-xs sm:text-base font-semibold truncate text-stone-900 dark:text-stone-100 transition-colors"
                        >
                          {product.name}
                        </h3>

                        <p className="text-[10px] sm:text-xs text-stone-500 dark:text-stone-400 line-clamp-1">
                          {product.subtitle}
                        </p>
                      </div>

                      <div className="pt-1.5 sm:pt-2 border-t border-stone-100 dark:border-neutral-800 flex items-center justify-between">
                        <div className="flex flex-wrap items-baseline gap-1 sm:gap-2">
                          <span className="text-xs sm:text-sm font-bold text-[#C5A880]">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-[10px] sm:text-[11px] line-through text-stone-400">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => addToCart(product)}
                          className="bg-[#121212] dark:bg-[#FAF8F5] text-white dark:text-[#121212] hover:bg-[#C5A880] dark:hover:bg-[#C5A880] p-2 sm:p-2.5 rounded-full transition-colors shadow-sm shrink-0"
                          title="Add to Bag"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* List Layout */
            <div className="space-y-4">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="flex flex-col sm:flex-row gap-6 p-4 bg-white dark:bg-neutral-900 rounded-2xl border border-stone-200 dark:border-neutral-800 shadow-sm hover:border-[#C5A880]/50 transition-all items-center"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full sm:w-40 h-52 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-bold">
                        {product.category} • {product.subtitle}
                      </span>
                    </div>

                    <h3
                      className="font-serif-luxury text-2xl font-semibold text-stone-900 dark:text-stone-100"
                    >
                      {product.name}
                    </h3>

                    <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="flex items-center gap-4 pt-2">
                      <span className="text-xl font-serif-luxury font-bold text-[#C5A880]">
                        {formatPrice(product.price)}
                      </span>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 hover:bg-[#C5A880] dark:hover:bg-[#C5A880] px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-colors"
                      >
                        <ShoppingBag className="w-4 h-4" /> Add to Bag
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Slide-over Drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="relative w-full max-w-xs bg-white dark:bg-neutral-900 h-full shadow-2xl p-6 overflow-y-auto space-y-6 z-10 text-stone-900 dark:text-stone-100"
            >
              <div className="flex justify-between items-center pb-4 border-b border-stone-200 dark:border-neutral-800">
                <h3 className="font-serif-luxury text-lg font-bold flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#C5A880]" /> Filter Catalog
                </h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Categories */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Category</h4>
                <div className="space-y-1 text-xs">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setMobileFilterOpen(false);
                      }}
                      className={`w-full text-left py-2 px-3 rounded-xl transition-all ${
                        selectedCategory === cat
                          ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-bold'
                          : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-neutral-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Price */}
              <div className="space-y-2 pt-4 border-t border-stone-200 dark:border-neutral-800">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="uppercase text-stone-400 text-[10px]">Max Price</span>
                  <span className="text-[#C5A880]">{formatPrice(priceRange)}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="15000"
                  step="500"
                  value={priceRange}
                  onChange={e => setPriceRange(Number(e.target.value))}
                  className="w-full accent-[#C5A880]"
                />
              </div>

              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-[#C5A880] text-stone-950 font-bold py-3 rounded-xl uppercase tracking-wider text-xs shadow-lg mt-6"
              >
                Apply Filters ({filteredProducts.length} Items)
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
