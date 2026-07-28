import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  User,
  Phone,
  MapPin
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    clearCart, 
    removeFromCart, 
    updateCartQuantity, 
    formatPrice, 
    navigateTo, 
    user, 
    showToast 
  } = useShop();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      showToast('Please complete all delivery details before proceeding', 'error');
      return;
    }

    const productsList = cart.map(item => `• ${item.product.name} × ${item.quantity}`).join('\n');
    const message = `🛍️ New Order\n\nName: ${customerName.trim()}\nPhone: ${customerPhone.trim()}\n\nProducts:\n${productsList}\n\nTotal: ${formatPrice(subtotal)}\n\nAddress:\n${customerAddress.trim()}`;

    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
    clearCart();
    showToast('Redirecting to WhatsApp to complete order...', 'success');
    navigateTo('home');
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="pt-36 pb-24 max-w-md mx-auto px-6 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#C5A880]/15 flex items-center justify-center mx-auto text-[#C5A880]">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-serif-luxury text-3xl font-bold text-stone-900 dark:text-stone-100">
          Your Shopping Bag is Empty
        </h2>
        <p className="text-xs text-stone-500 leading-relaxed">
          Please add items to your bag before generating an order summary.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 hover:bg-[#C5A880] px-8 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-widest transition-colors shadow-lg"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 px-6 md:px-12 max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 border-b border-stone-200 dark:border-neutral-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/15 border border-[#C5A880]/30 text-[10px] font-bold tracking-[0.3em] uppercase text-[#9E814D] dark:text-[#E5C158]">
          <Sparkles className="w-3.5 h-3.5" />
          Maison Order Placement
        </div>
        <h1 className="font-serif-luxury text-3xl md:text-5xl font-medium tracking-tight text-stone-900 dark:text-stone-100">
          Order Summary
        </h1>
        <p className="text-xs text-stone-500 max-w-lg mx-auto">
          Review your items, provide delivery details, and place your order directly via WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Scrollable Order Items List (6 cols) */}
        <div className="lg:col-span-6 bg-white dark:bg-neutral-900 p-6 md:p-8 rounded-2xl border border-stone-200 dark:border-neutral-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-neutral-800 pb-4">
            <h3 className="font-serif-luxury text-xl font-semibold flex items-center gap-2.5 text-stone-900 dark:text-stone-100">
              <ShoppingBag className="w-5 h-5 text-[#C5A880]" />
              Selected Items ({cart.reduce((total, i) => total + i.quantity, 0)})
            </h3>
           
          </div>

          {/* Scrollable Items Container */}
          <div className="max-h-[380px] md:max-h-[460px] overflow-y-auto pr-2 space-y-4 divide-y divide-stone-100 dark:divide-neutral-800">
            {cart.map((item, index) => (
              <div key={index} className="pt-4 first:pt-0 flex gap-4 items-center">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-20 object-cover rounded-xl border border-stone-200 dark:border-neutral-800 shrink-0"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-serif-luxury text-sm font-semibold truncate text-stone-900 dark:text-stone-100">
                      {index + 1}. {item.product.name}
                    </h4>
                    <button
                      onClick={() => removeFromCart(index)}
                      className="text-stone-400 hover:text-red-500 p-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    {item.selectedColor?.name || 'Standard'} {item.selectedSize ? `• Size ${item.selectedSize}` : ''}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center border border-stone-200 dark:border-neutral-800 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateCartQuantity(index, -1)}
                        className="px-2 py-1 text-stone-500 hover:bg-stone-100 dark:hover:bg-neutral-800"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(index, 1)}
                        className="px-2 py-1 text-stone-500 hover:bg-stone-100 dark:hover:bg-neutral-800"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-semibold text-sm text-[#C5A880]">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Subtotal & Delivery Summary */}
          <div className="pt-4 border-t border-stone-200 dark:border-neutral-800 space-y-2 text-xs">
            <div className="flex justify-between text-base font-serif-luxury font-bold pt-3 text-stone-900 dark:text-stone-100">
              <span>Total Price</span>
              <span className="text-[#C5A880]">{formatPrice(subtotal)}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Customer Details & WhatsApp Action (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <form onSubmit={handleSendToWhatsApp} className="bg-white dark:bg-neutral-900 p-6 md:p-8 rounded-2xl border border-stone-200 dark:border-neutral-800 shadow-xl space-y-6">
            <div className="space-y-1">
              <h3 className="font-serif-luxury text-xl font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <User className="w-5 h-5 text-[#C5A880]" />
                Customer &amp; Delivery Details
              </h3>
              <p className="text-xs text-stone-500">
                These details will be formatted into your WhatsApp order message.
              </p>
            </div>

            <div className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#C5A880]" />
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full p-3 bg-stone-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl outline-none focus:border-[#C5A880] text-stone-900 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Enter your phone number (e.g. +91 98765 43210)"
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  className="w-full p-3 bg-stone-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl outline-none focus:border-[#C5A880] text-stone-900 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                  Delivery Address *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter your full street address, apartment, city, state, postal code..."
                  value={customerAddress}
                  onChange={e => setCustomerAddress(e.target.value)}
                  className="w-full p-3 bg-stone-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 rounded-xl outline-none resize-none focus:border-[#C5A880] text-stone-900 dark:text-stone-100"
                />
              </div>
            </div>

            {/* Main Action Button */}
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-3 transition-all duration-300 shadow-xl"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              <span>Proceed to Place Order on WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Completion Modal */}
      <AnimatePresence>
        {orderPlaced && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative bg-white dark:bg-stone-900 p-8 md:p-12 rounded-2xl max-w-lg w-full text-center space-y-6 shadow-2xl z-10 border border-[#C5A880]/50"
            >
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A880] font-bold">
                  WhatsApp Dispatched
                </span>
                <h2 className="font-serif-luxury text-3xl font-bold text-stone-900 dark:text-stone-100">
                  Order Summary Ready
                </h2>
                <p className="text-xs text-stone-500 leading-relaxed">
                  WhatsApp has opened with your pre-filled order details. Simply tap <strong className="text-stone-900 dark:text-stone-100 font-bold">Send</strong> in WhatsApp to complete your order placement.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    clearCart();
                    setOrderPlaced(false);
                    navigateTo('shop');
                  }}
                  className="flex-1 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 hover:bg-[#C5A880] py-3.5 px-6 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Clear Bag &amp; Continue
                </button>
                <button
                  onClick={() => setOrderPlaced(false)}
                  className="px-6 py-3.5 border border-stone-300 dark:border-neutral-700 rounded-xl text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-neutral-800"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
