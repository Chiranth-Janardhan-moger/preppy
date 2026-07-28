import React from 'react';
import { motion } from 'motion/react';
import { Bookmark, ShoppingBag, Trash2, Share2, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, formatPrice, navigateTo, showToast } = useShop();

  const handleShareWishlist = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Your private wishlist link has been copied to clipboard!');
  };

  return (
    <div className="pt-28 pb-24 px-6 md:px-12 max-w-7xl mx-auto space-y-10">
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 dark:border-neutral-800 pb-6 gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A880] font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" /> Private Curation
          </span>
          <h1 className="font-serif-luxury text-3xl md:text-5xl font-medium tracking-tight">
            Saved Haute Creations ({wishlist.length})
          </h1>
        </div>

        {wishlist.length > 0 && (
          <button
            onClick={handleShareWishlist}
            className="px-5 py-2.5 rounded-lg border border-[#C5A880] text-[#C5A880] hover:bg-[#C5A880] hover:text-white text-xs uppercase font-semibold tracking-wider flex items-center gap-2 transition-colors"
          >
            <Share2 className="w-4 h-4" /> Share Curation Link
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-24 space-y-4 max-w-md mx-auto">
          <Bookmark className="w-16 h-16 text-gray-300 dark:text-neutral-700 mx-auto" />
          <h2 className="font-serif-luxury text-2xl font-semibold">Your Wishlist is Empty</h2>
          <p className="text-xs text-gray-500">
            Save your favorite gowns, royal lehengas, and fine jewelry while exploring our catalog.
          </p>
          <button
            onClick={() => navigateTo('shop')}
            className="bg-[#121212] dark:bg-[#FAF8F5] text-white dark:text-[#121212] px-8 py-3 rounded text-xs font-semibold uppercase tracking-widest"
          >
            Explore Collections
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlist.map(item => (
            <motion.div
              key={item.product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-neutral-900 rounded-xl overflow-hidden border border-gray-200 dark:border-neutral-800 shadow-lg p-4 space-y-3 flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-stone-100 cursor-pointer">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  onClick={() => navigateTo('product-detail', { product: item.product })}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={() => toggleWishlist(item.product)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 dark:bg-black/80 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block">
                  {item.product.category}
                </span>
                <h3
                  onClick={() => navigateTo('product-detail', { product: item.product })}
                  className="font-serif-luxury text-base font-semibold truncate hover:text-[#C5A880] cursor-pointer"
                >
                  {item.product.name}
                </h3>
                <span className="text-sm font-semibold text-[#C5A880] block">
                  {formatPrice(item.product.price)}
                </span>
              </div>

              <button
                onClick={() => {
                  addToCart(item.product);
                  toggleWishlist(item.product);
                }}
                className="w-full bg-[#121212] dark:bg-[#FAF8F5] text-white dark:text-[#121212] hover:bg-[#C5A880] py-2.5 rounded text-xs uppercase font-semibold tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" /> Move To Bag
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
