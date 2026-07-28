import React from 'react';
import { Star, Quote } from 'lucide-react';
import { SAMPLE_REVIEWS } from '../../data/mockData';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A880] font-bold">
          VIP Testimonials
        </span>
        <h2 className="font-serif-luxury text-3xl md:text-5xl font-medium tracking-tight">
          What Our Customers Say
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SAMPLE_REVIEWS.map(rev => (
          <div
            key={rev.id}
            className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-xl space-y-6 relative flex flex-col justify-between"
          >
            <Quote className="w-10 h-10 text-[#C5A880]/20 absolute top-6 right-6" />

            <div className="space-y-4 relative z-10">
              <div className="flex gap-1 text-amber-500">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>

              <p className="font-serif-luxury italic text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                "{rev.comment}"
              </p>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};
