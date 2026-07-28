import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { fetchAdminImages } from '../../lib/supabase';
import trendingFallback from '../../assets/trending.jpg';

export const SeasonalCollection: React.FC = () => {
  const { navigateTo } = useShop();
  const [trendingImg, setTrendingImg] = useState<string>(trendingFallback);

  useEffect(() => {
    async function loadTrending() {
      try {
        const images = await fetchAdminImages();
        const uploadedTrending = images.find(
          img => img.targetSection === 'trending' || img.filePath.toLowerCase().includes('trending') || img.url.toLowerCase().includes('trending')
        );
        if (uploadedTrending && uploadedTrending.url) {
          setTrendingImg(uploadedTrending.url);
        }
      } catch (e) {
        console.error('Error loading trending image:', e);
      }
    }
    loadTrending();
  }, []);

  return (
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="bg-stone-900 text-white rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2 border border-[#C5A880]/30 relative">
        {/* Left Visual */}
        <div className="relative min-h-[400px] lg:min-h-[550px] overflow-hidden group">
          <img
            src={trendingImg}
            alt="Trending Haute Collection"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent lg:to-stone-900/80" />
        </div>

        {/* Right Editorial Copy */}
        <div className="p-8 md:p-16 flex flex-col justify-center space-y-6">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#E5C158] font-bold flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" /> Seasonal Capsule 2026
          </span>

          <h2 className="font-serif-luxury text-3xl md:text-5xl font-medium tracking-tight leading-tight">
            Trending
          </h2>

          <p className="text-xs md:text-sm text-stone-300 font-sans leading-relaxed">
            Discover our newest trending creations, featuring exquisite handloom silk sarees, bespoke Aari needlework, and luxury handcrafted accessories. Each piece is individually tailored with intricate craftsmanship, rich color palettes, and royal detailing designed to make every occasion unforgettable.
          </p>

          <div>
            <button
              onClick={() => navigateTo('shop')}
              className="bg-[#C5A880] hover:bg-[#A88B60] text-black font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-lg transition-all duration-300 shadow-xl inline-flex items-center gap-2 group"
            >
              Shop The Capsule Line
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
