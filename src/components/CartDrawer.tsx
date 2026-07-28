import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    formatPrice, 
    navigateTo 
  } = useShop();

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md h-full max-h-full bg-[#FAF8F5] dark:bg-[#121212] text-[#121212] dark:text-[#FAF8F5] shadow-2xl flex flex-col border-l border-[#C5A880]/30 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-neutral-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#C5A880]" />
                <h3 className="font-serif-luxury text-xl font-medium tracking-tight">Your Shopping Bag</h3>
                <span className="bg-[#C5A880] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-6 divide-y divide-gray-200 dark:divide-neutral-800">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-stone-200 dark:bg-neutral-800 flex items-center justify-center mx-auto text-gray-400">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif-luxury text-lg">Your shopping bag is empty</h4>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto">
                    Explore our haute couture collections and select pieces tailored to your elegance.
                  </p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      navigateTo('shop');
                    }}
                    className="inline-block bg-[#121212] dark:bg-[#FAF8F5] text-white dark:text-[#121212] hover:bg-[#C5A880] text-xs uppercase tracking-widest font-semibold px-6 py-3 rounded transition-all"
                  >
                    Discover Collections
                  </button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="pt-4 first:pt-0 flex gap-4 items-start">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-28 object-cover rounded bg-stone-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0 space-y-1">
                      <span className="text-[10px] text-[#C5A880] font-semibold uppercase tracking-widest block">
                        {item.product.category}
                      </span>
                      <h4 className="font-serif-luxury text-sm font-medium truncate">{item.product.name}</h4>
                      <div className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-2">
                        <span>Color: <strong className="text-black dark:text-white">{item.selectedColor.name}</strong></span>
                        <span>•</span>
                        <span>Size: <strong className="text-black dark:text-white">{item.selectedSize}</strong></span>
                      </div>
                      <div className="text-xs font-semibold text-[#C5A880] pt-1">
                        {formatPrice(item.product.price)}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-gray-300 dark:border-neutral-700 rounded overflow-hidden">
                          <button
                            onClick={() => updateCartQuantity(idx, -1)}
                            className="px-2 py-0.5 text-xs hover:bg-gray-200 dark:hover:bg-neutral-800"
                          >
                            -
                          </button>
                          <span className="px-3 text-xs font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(idx, 1)}
                            className="px-2 py-0.5 text-xs hover:bg-gray-200 dark:hover:bg-neutral-800"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(idx)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-200 dark:border-neutral-800 bg-stone-50 dark:bg-neutral-900/80 space-y-4 shrink-0">
                {/* Subtotal Calculation */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-base font-serif-luxury font-bold text-black dark:text-white pt-2">
                    <span>Estimated Total</span>
                    <span className="text-[#C5A880]">{formatPrice(subtotal)}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('checkout');
                  }}
                  className="w-full bg-[#121212] dark:bg-[#FAF8F5] text-white dark:text-[#121212] hover:bg-[#C5A880] dark:hover:bg-[#C5A880] dark:hover:text-white py-4 rounded-xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-xl"
                >
                  <span>Proceed to Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
