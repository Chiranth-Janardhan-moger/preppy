import React from 'react';
import { Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useShop();

  const timeline = [
    { year: '1988', title: 'The Paris Atelier Inception', desc: 'Opened our flagship salon on Place Vendôme, pioneering classical silk draping.' },
    { year: '2004', title: 'The Milan Sartorial House', desc: 'Expanded into Italian wool tailoring and Super 160s bespoke suit construction.' },
    { year: '2015', title: 'Royal Indian Imperial Line', desc: 'Introduced 24K gold zardozi hand-embroidery and bridal lehenga heritage.' },
    { year: '2026', title: 'Modern Sustainable Haute Couture', desc: 'Pioneering organic silk, traceable cashmere, and zero-waste pattern drafting.' }
  ];

  return (
    <div className="pt-28 pb-24 space-y-20">
      {/* Header Text Section */}
      <div className="max-w-3xl mx-auto text-center px-6 space-y-3 border-b border-stone-200 dark:border-neutral-800 pb-8">
        <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A880] font-bold flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Maison PREPPY Story
        </span>
        <h1 className="font-serif-luxury text-3xl md:text-5xl font-medium tracking-tight text-stone-900 dark:text-stone-100">
          The Philosophy Of Eternal Elegance
        </h1>
        <p className="text-xs md:text-sm text-stone-500 dark:text-stone-400 max-w-xl mx-auto leading-relaxed font-sans">
          Crafting wearable works of art designed to transcend seasonal trend cycles and be passed down across generations.
        </p>
      </div>

      {/* Founder's Note Section */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-stone-200">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
            alt="Creative Director Lady Eleanor Vance"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="lg:col-span-7 space-y-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-bold">
            Founder &amp; Creative Director's Note
          </span>
          <h2 className="font-serif-luxury text-3xl md:text-4xl font-medium tracking-tight">
            "We Do Not Manufacture Fashion. We Sculpt Emotion."
          </h2>

          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-sans">
            "When a woman steps into a PREPPY silk gown or an imperial royal lehenga, she is not merely putting on clothing — she is embodying confidence, history, and pure artistic expression."
          </p>

          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-sans">
            Every thread, bullion stitch, and hand-cut silk panel is meticulously examined across 14 quality checkpoints by master conservators before earning our seal.
          </p>

          <div className="pt-2 border-t border-gray-200 dark:border-neutral-800">
            <h4 className="font-serif-luxury text-lg font-bold">Lady Eleanor Vance</h4>
            <span className="text-xs text-gray-400">Creative Director &amp; Master Couturier</span>
          </div>
        </div>
      </div>

      {/* Interactive Maison Timeline */}
      <div className="bg-stone-100/70 dark:bg-neutral-900/50 py-20 border-y border-[#C5A880]/20">
        <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-bold">
              Heritage Milestones
            </span>
            <h2 className="font-serif-luxury text-3xl md:text-4xl font-medium">
              Four Decades Of Haute Innovation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {timeline.map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-md space-y-3">
                <span className="font-serif-luxury text-3xl font-bold text-[#C5A880] block">{item.year}</span>
                <h3 className="font-serif-luxury font-semibold text-base">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-4 max-w-xl mx-auto px-6">
        <h3 className="font-serif-luxury text-2xl font-semibold">Experience The Maison Firsthand</h3>
        <p className="text-xs text-gray-500">Book a private fitting session at our Paris, NYC, Milan, or Mumbai salons.</p>
        <button
          onClick={() => navigateTo('contact')}
          className="bg-[#121212] dark:bg-[#FAF8F5] text-white dark:text-[#121212] hover:bg-[#C5A880] px-8 py-3.5 rounded text-xs uppercase font-semibold tracking-widest transition-colors"
        >
          Book Atelier Appointment
        </button>
      </div>
    </div>
  );
};
