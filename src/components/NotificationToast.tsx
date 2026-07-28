import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Info, AlertCircle, ShoppingBag, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const NotificationToast: React.FC = () => {
  const { toasts, removeToast, setIsCartOpen } = useShop();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 md:px-0">
      <AnimatePresence>
        {toasts.map(toast => {
          const isCartAlert = toast.message.toLowerCase().includes('cart');

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="pointer-events-auto relative overflow-hidden bg-stone-900/95 dark:bg-neutral-900/95 text-stone-100 px-5 py-3.5 rounded-xl shadow-2xl backdrop-blur-xl border border-[#C5A880]/40 flex items-center gap-3.5"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A880] to-transparent" />

              {isCartAlert ? (
                <div className="p-2 rounded-full bg-[#C5A880]/15 border border-[#C5A880]/30 shrink-0">
                  <ShoppingBag className="w-4 h-4 text-[#E5C158]" />
                </div>
              ) : toast.type === 'error' ? (
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              ) : toast.type === 'info' ? (
                <Info className="w-5 h-5 text-[#C5A880] shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-[#C5A880] shrink-0" />
              )}
              
              <div className="flex-1 min-w-0 space-y-0.5">
                <p className="text-[11px] font-sans tracking-wide text-stone-200 leading-snug truncate">
                  {toast.message}
                </p>
              </div>

              {isCartAlert && (
                <button
                  onClick={() => {
                    setIsCartOpen(true);
                    removeToast(toast.id);
                  }}
                  className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded bg-[#C5A880] hover:bg-[#b09268] text-stone-950 transition-colors shrink-0 shadow-sm"
                >
                  View Bag
                </button>
              )}

              <button
                onClick={() => removeToast(toast.id)}
                className="text-stone-400 hover:text-stone-100 transition-colors p-1"
                aria-label="Close notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
