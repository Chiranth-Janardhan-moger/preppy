import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS_LIST } from '../../data/mockData';

export const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = ['All', 'Orders & Bespoke Fitting', 'Shipping & Delivery', 'Returns & Authenticity'];

  const filteredFaqs = useMemo(() => {
    return FAQS_LIST.filter(faq => {
      if (selectedCategory !== 'All' && faq.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          faq.question.toLowerCase().includes(q) ||
          faq.answer.toLowerCase().includes(q) ||
          faq.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="pt-28 pb-24 px-6 md:px-12 max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 border-b border-gray-200 dark:border-neutral-800 pb-6">
        <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A880] font-bold flex items-center justify-center gap-1">
          <HelpCircle className="w-3.5 h-3.5" /> Patron Guidance
        </span>
        <h1 className="font-serif-luxury text-3xl md:text-5xl font-medium tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xs text-gray-500 max-w-md mx-auto">
          Find instant answers regarding bespoke fittings, white-glove shipping, and garment preservation.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="space-y-6">
        <div className="relative max-w-xl mx-auto">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions (e.g. Bespoke fitting, Shipping, Returns)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl text-xs outline-none focus:border-[#C5A880] shadow-sm"
          />
        </div>

        <div className="flex justify-center gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-[#121212] dark:bg-[#FAF8F5] text-white dark:text-[#121212]'
                  : 'bg-stone-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-300 hover:border-[#C5A880]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion FAQ Items */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-stone-50 dark:hover:bg-neutral-800/50 transition-colors"
              >
                <div className="space-y-1">
                  <span className="text-[10px] text-[#C5A880] font-bold uppercase tracking-widest block">
                    {faq.category}
                  </span>
                  <h3 className="font-serif-luxury text-base font-semibold text-black dark:text-white">
                    {faq.question}
                  </h3>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#C5A880]' : ''}`} />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6 text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-sans border-t border-gray-100 dark:border-neutral-800/60 pt-4"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
