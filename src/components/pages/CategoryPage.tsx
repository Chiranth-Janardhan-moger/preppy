import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Star, Eye, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS, CATEGORIES_LIST } from '../../data/mockData';

export const CategoryPage: React.FC = () => {
  const { 
    selectedCategory, 
    formatPrice, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setQuickViewProduct, 
    navigateTo 
  } = useShop();

  const categoryMeta = CATEGORIES_LIST.find(c => c.name === selectedCategory) || {
    name: selectedCategory,
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1600&q=85',
    description: 'Explore our bespoke haute couture selection.',
    itemCount: 'Catalog Collection'
  };

  const categoryProducts = PRODUCTS.filter(p => {
    if (selectedCategory === 'Luxury Collection') return p.isLuxury;
    return p.category === selectedCategory || p.tags.includes(selectedCategory);
  });

  return (
    <div className="pt-16 sm:pt-20 pb-20 sm:pb-28 space-y-10 sm:space-y-16">
      {/* Category Hero Banner */}
      {/* Category Hero Banner */}
<div className="relative w-full min-h-[360px] sm:min-h-[400px] md:h-[480px] overflow-hidden flex items-center justify-center bg-stone-950 text-stone-100">
  <img
    src={categoryMeta.image}
    alt={categoryMeta.name}
    referrerPolicy="no-referrer"
    className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

  <div className="relative z-10 w-full max-w-3xl px-5 sm:px-6 py-10 sm:py-12 text-center space-y-3 sm:space-y-5">
    
    <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-[#C5A880]/20 border border-[#C5A880]/40 text-[8px] sm:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#E5C158]">
      <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
      <span>Maison Line</span>
    </div>

    <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-6xl font-medium tracking-tight break-words">
      {categoryMeta.name}
    </h1>

    <p className="text-[11px] sm:text-xs md:text-sm text-stone-300 font-sans max-w-xl mx-auto leading-relaxed px-2">
      {categoryMeta.description}
    </p>

    <button
      onClick={() => navigateTo('shop')}
      className="inline-flex items-center justify-center gap-2 text-[9px] sm:text-xs font-semibold tracking-[0.15em] sm:tracking-widest uppercase text-[#E5C158] hover:underline pt-1 sm:pt-2 max-w-full"
    >
      <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
      <span>Back To All Categories</span>
    </button>
  </div>
</div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 space-y-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-stone-200 dark:border-neutral-800 pb-4 gap-4">
          <div>
            <h2 className="font-serif-luxury text-2xl md:text-3xl font-semibold text-stone-900 dark:text-stone-100">
              Curated {categoryMeta.name} Creations
            </h2>
            <p className="text-xs text-stone-500">{categoryProducts.length} master pieces available in ateliers</p>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="text-xs uppercase tracking-wider font-semibold text-[#C5A880] hover:underline flex items-center gap-1"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
          {categoryProducts.map(product => {
            const inWish = isInWishlist(product.id);

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-white dark:bg-neutral-900 rounded-xl sm:rounded-2xl overflow-hidden border border-stone-200 dark:border-neutral-800 shadow-sm hover:shadow-2xl hover:border-[#C5A880]/50 transition-all duration-500 flex flex-col justify-between"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 dark:bg-neutral-800 cursor-pointer">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    onClick={() => navigateTo('product-detail', { product })}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
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
                      onClick={() => navigateTo('product-detail', { product })}
                      className="font-serif-luxury text-xs sm:text-base font-semibold truncate text-stone-900 dark:text-stone-100 hover:text-[#C5A880] cursor-pointer transition-colors"
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
      </div>
    </div>
  );
};
