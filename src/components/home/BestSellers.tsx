import React from 'react';
import { Star, ShoppingBag } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/mockData';

export const BestSellers: React.FC = () => {
  const { formatPrice, addToCart, navigateTo } = useShop();

  const bestSellers = PRODUCTS.filter(p => p.isBestSeller || p.rating >= 4.8);

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-12">
      <div className="flex items-end justify-between">
        <div className="space-y-2">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold">
            Iconic Masterpieces
          </span>
          <h2 className="font-serif-luxury text-3xl md:text-5xl font-medium tracking-tight">
            Best Sellers
          </h2>
        </div>
      </div>

      {/* Horizontal Scroll Carousel */}
      <div
        className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pt-1 pb-4 px-2 -mx-2"
      >
        {bestSellers.map(product => {
          return (
            <div
              key={product.id}
              className="min-w-[280px] sm:min-w-[320px] max-w-[340px] shrink-0 bg-white dark:bg-neutral-900 rounded-xl overflow-hidden border border-gray-200 dark:border-neutral-800 shadow-sm hover:shadow-xl hover:border-[#C5A880]/50 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 dark:bg-neutral-800">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

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
            </div>
          );
        })}
      </div>
    </section>
  );
};
