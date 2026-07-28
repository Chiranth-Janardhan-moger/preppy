import React from 'react';
import { ShieldCheck, Truck, RotateCcw, PackageCheck, Scissors, Sparkles } from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  const features = [
    {
      icon: Scissors,
      title: 'Bespoke Haute Tailoring',
      description: 'Custom tailored to your exact measurements with personal fitting support.'
    },
    {
      icon: Sparkles,
      title: '100% Handcrafted Artistry',
      description: 'Handcrafted using pure Mulberry silk and gold needlework by master artisans.'
    },
    {
      icon: Truck,
      title: 'White-Glove Express Shipping',
      description: 'Complimentary climate-controlled, fully insured global delivery on orders over $2,500.'
    },
    {
      icon: PackageCheck,
      title: 'Velvet Gift Packaging',
      description: 'Delivered in a signature velvet box with custom silk ribbon ties.'
    },
    {
      icon: RotateCcw,
      title: '30-Day Effortless Returns',
      description: 'Hassle-free 30-day returns and free fitting adjustments for tailored items.'
    },
    {
      icon: ShieldCheck,
      title: 'Authenticity Guaranteed',
      description: 'Every piece carries an official authenticity certificate registered in our client records.'
    }
  ];

  return (
    <section className="py-20 bg-stone-100/60 dark:bg-neutral-900/60 border-y border-[#C5A880]/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A880] font-bold">
            The PREPPY Promise
          </span>
          <h2 className="font-serif-luxury text-3xl md:text-4xl font-medium tracking-tight">
            Why High Society Chooses Maison PREPPY
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-neutral-900 p-8 rounded-xl border border-gray-200/80 dark:border-neutral-800 shadow-sm hover:shadow-xl hover:border-[#C5A880]/40 transition-all duration-300 space-y-4 group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#C5A880]/10 text-[#C5A880] flex items-center justify-center group-hover:bg-[#C5A880] group-hover:text-black transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif-luxury text-lg font-semibold tracking-wide">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
