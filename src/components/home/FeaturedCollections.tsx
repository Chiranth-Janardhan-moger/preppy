import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { CategoryType } from '../../types';
import { CATEGORIES_LIST } from '../../data/mockData';

export const FeaturedCollections: React.FC = () => {
  const { navigateTo } = useShop();

  const featuredCategories = CATEGORIES_LIST.filter(
    (category) => !['Ethnic', 'Party Wear', 'Casual', 'Accessories'].includes(category.name)
  );

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold">
            Curated Lines
          </span>
          <h2 className="font-serif-luxury text-3xl md:text-5xl font-medium tracking-tight">
            Featured Collections
          </h2>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md font-sans">
          Explore bespoke couture lines designed across women’s eveningwear and royal bridal heritage.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featuredCategories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            onClick={() => navigateTo('category', { category: category.name as CategoryType })}
            className="group relative rounded-xl overflow-hidden cursor-pointer bg-stone-200 dark:bg-neutral-900 shadow-xl border border-transparent hover:border-[#C5A880]/40 transition-all duration-500 aspect-[16/10]"
          >
            {/* Image */}
            <img
              src={category.image}
              alt={category.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:from-black/95 transition-all duration-500" />

            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
              <div className="flex justify-between items-start">
                <span className="bg-white/10 backdrop-blur-md text-[#E5C158] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
                  {category.itemCount}
                </span>
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md group-hover:bg-[#C5A880] group-hover:text-black flex items-center justify-center transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-serif-luxury text-2xl md:text-3xl font-medium tracking-wide group-hover:text-[#C5A880] transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-300 font-sans line-clamp-2 max-w-md">
                  {category.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
