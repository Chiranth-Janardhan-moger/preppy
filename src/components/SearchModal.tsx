import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/mockData';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, formatPrice, navigateTo } = useShop();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = useMemo(() => {
    if (!searchTerm.trim()) return PRODUCTS.slice(0, 4);
    const q = searchTerm.toLowerCase();
    return PRODUCTS.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [searchTerm]);

  if (!isSearchOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSearchOpen(false)}
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          className="relative w-full max-w-3xl bg-[#FAF8F5] dark:bg-[#121212] text-[#121212] dark:text-[#FAF8F5] rounded-xl shadow-2xl border border-[#C5A880]/40 overflow-hidden z-10"
        >
          {/* Search Bar Input */}
          <div className="flex items-center px-6 py-4 border-b border-gray-200 dark:border-neutral-800 gap-3">
            <Search className="w-5 h-5 text-[#C5A880]" />
            <input
              type="text"
              autoFocus
              placeholder="Search haute couture gowns, silk dresses, royal lehengas, gold jewelry..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent text-sm md:text-base outline-none font-medium placeholder:text-gray-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-xs text-gray-400 hover:text-black dark:hover:text-white"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Category Tags */}
          <div className="px-6 py-3 bg-stone-100/60 dark:bg-neutral-900/60 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
            <span className="text-gray-400 shrink-0 font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" /> Popular:
            </span>
            {['Silk Gowns', 'Velvet Anarkali', 'Bridal Lehenga', 'Gold Jewelry', 'Cashmere Gowns'].map(
              tag => (
                <button
                  key={tag}
                  onClick={() => setSearchTerm(tag)}
                  className="px-3 py-1 bg-white dark:bg-neutral-800 rounded-full border border-gray-200 dark:border-neutral-700 hover:border-[#C5A880] transition-colors whitespace-nowrap text-[11px]"
                >
                  {tag}
                </button>
              )
            )}
          </div>

          {/* Results List */}
          <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
            <div className="flex justify-between items-center text-xs text-gray-500 uppercase tracking-wider font-semibold">
              <span>{searchTerm ? `Results for "${searchTerm}" (${filtered.length})` : 'Curated Suggestions'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map(product => (
                <div
                  key={product.id}
                  onClick={() => {
                    setIsSearchOpen(false);
                    navigateTo('shop', { category: product.category, product });
                  }}
                  className="flex items-center gap-4 p-3 rounded-lg border border-transparent hover:border-[#C5A880]/40 hover:bg-white dark:hover:bg-neutral-900 transition-all cursor-pointer group"
                >
                  <div className="w-16 h-20 rounded overflow-hidden shrink-0 bg-stone-200">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block">
                      {product.category}
                    </span>
                    <h4 className="text-sm font-serif-luxury font-medium truncate group-hover:text-[#C5A880] transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{product.subtitle}</p>
                    <span className="text-xs font-semibold text-[#C5A880] block mt-1">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#C5A880] group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-500 space-y-2">
                <p className="font-serif-luxury text-lg">No luxury pieces match your search.</p>
                <p className="text-xs">Try searching for categories like "Gown", "Wedding", or "Jewelry"</p>
              </div>
            )}
          </div>

          <div className="p-4 bg-stone-100 dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-800 text-center">
            <button
              onClick={() => {
                setIsSearchOpen(false);
                navigateTo('shop');
              }}
              className="text-xs uppercase tracking-widest text-[#C5A880] hover:underline font-semibold"
            >
              Explore Full Haute Couture Catalog →
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
