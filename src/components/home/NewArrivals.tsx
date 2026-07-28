import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Star, Eye, ShoppingBag, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/mockData';
import { Product } from '../../types';
import { fetchAdminImages, mapAdminImagesToProducts } from '../../lib/supabase';

export const NewArrivals: React.FC = () => {
  const { 
    formatPrice, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setQuickViewProduct, 
    navigateTo 
  } = useShop();

  const carouselRef = useRef<HTMLDivElement>(null);
  const [uploadedProducts, setUploadedProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadUploaded() {
      try {
        const adminImgs = await fetchAdminImages();
        setUploadedProducts(mapAdminImagesToProducts(adminImgs, 'up-prod'));
      } catch (e) {
        console.error('Error loading uploaded images for NewArrivals:', e);
      }
    }
    loadUploaded();
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;
    }
  }, [uploadedProducts]);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const products = [...uploadedProducts, ...PRODUCTS];

  return (
    <section className="py-24 bg-stone-100/70 dark:bg-neutral-900/40 border-y border-[#C5A880]/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Fresh From Atelier
            </span>
            <h2 className="font-serif-luxury text-3xl md:text-5xl font-medium tracking-tight">
              New Arrivals
            </h2>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 hover:border-[#C5A880] transition-colors shadow-sm"
              title="Scroll left"
            >
              <ChevronLeft className="w-4 h-4 text-stone-700 dark:text-stone-300" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 hover:border-[#C5A880] transition-colors shadow-sm"
              title="Scroll right"
            >
              <ChevronRight className="w-4 h-4 text-stone-700 dark:text-stone-300" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Product Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pt-1 pb-4 px-1 snap-x snap-proximity touch-pan-x touch-pan-y overscroll-x-contain"
        >
          {products.map(product => {
            const inWish = isInWishlist(product.id);
            const topBadge = (product.tags && product.tags[2]) ? product.tags[2] : (product.isNew ? 'New' : undefined);

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-[280px] sm:w-[310px] md:w-[330px] shrink-0 snap-start group relative bg-white dark:bg-neutral-900 rounded-xl overflow-hidden border border-gray-200/80 dark:border-neutral-800 shadow-sm hover:shadow-xl hover:border-[#C5A880]/50 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                  {/* Primary & Hover Image Swap */}
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  {product.images[1] && (
                    <img
                      src={product.images[1]}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  )}

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                    {topBadge && (
                      <span className="bg-[#121212] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded shadow">
                        {topBadge}
                      </span>
                    )}
                    {product.discountPercentage && (
                      <span className="bg-[#C5A880] text-black text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded shadow">
                        -{product.discountPercentage}% Off
                      </span>
                    )}
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-bold">
                      <span className="text-[#C5A880]">{product.category}</span>
                      <div className="flex items-center gap-1 text-amber-500 font-semibold">
                        <Star className="w-3 h-3 fill-amber-500" />
                        <span className="text-stone-800 dark:text-stone-200">{product.rating}</span>
                      </div>
                    </div>

                    <h3
                      className="font-serif-luxury text-base font-semibold truncate text-stone-900 dark:text-stone-100 transition-colors"
                    >
                      {product.name}
                    </h3>

                    <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1">
                      {product.subtitle}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 dark:border-neutral-800 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-bold text-[#C5A880]">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[11px] line-through text-stone-400">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-[#121212] dark:bg-[#FAF8F5] text-white dark:text-[#121212] hover:bg-[#C5A880] dark:hover:bg-[#C5A880] p-2.5 rounded-full transition-colors shadow-sm"
                      title="Add to Bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>


      </div>
    </section>
  );
};
