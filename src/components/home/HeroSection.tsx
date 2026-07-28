import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import hero1 from '../../assets/hero-1.png';
import hero2 from '../../assets/hero-2.png';
import hero3 from '../../assets/hero-3.png';
import hero4 from '../../assets/hero-4.png';
import hero5 from '../../assets/hero-5.png';
import hero6 from '../../assets/hero-6.png';
import hero7 from '../../assets/hero-7.png';
import hero8 from '../../assets/hero-8.png';

const HERO_IMAGES = [
  {
    img: hero1,
    alt: 'PREPPY White Silk Haute Couture Collection',
    tag: 'Maison PREPPY Haute Couture',
  },
  {
    img: hero2,
    alt: 'PREPPY Royal Blue Velvet & Silk Couture',
    tag: 'Royal Sapphire Midnight Collection',
  },
  {
    img: hero3,
    alt: 'PREPPY Bronze & Chocolate Velvet Haute Couture',
    tag: 'Imperial Amber & Bronze Velvet Line',
  },
  {
    img: hero4,
    alt: 'PREPPY Royal Emerald Silk & Velvet Couture',
    tag: 'Imperial Emerald Heritage Line',
  },
  {
    img: hero5,
    alt: 'PREPPY Rosé Quartz & Champagne Silk Gown',
    tag: 'Rose Quartz Gala Atelier Capsule',
  },
  {
    img: hero6,
    alt: 'PREPPY Midnight Obsidian Silk Collection',
    tag: 'Midnight Obsidian Edition',
  },
  {
    img: hero7,
    alt: 'PREPPY Golden Hour Silk Ensemble',
    tag: 'Golden Hour Atelier Line',
  },
  {
    img: hero8,
    alt: 'PREPPY Ivory Elegance Couture',
    tag: 'Ivory Elegance Heritage Capsule',
  },
];

export const HeroSection: React.FC = () => {
  const { navigateTo } = useShop();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const validHeroImages = HERO_IMAGES.filter(i => Boolean(i.img));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % validHeroImages.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [validHeroImages.length]);

  const activeSlide = validHeroImages[currentImageIndex] || validHeroImages[0] || { img: hero1, alt: 'PREPPY' };

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden flex items-center justify-center bg-[#FAF8F5] dark:bg-[#0A0A0A] text-[#121212] dark:text-white">
      {/* Background Light Imagery & Overlay with Auto Transition */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={activeSlide.img}
            alt={activeSlide.alt}
            referrerPolicy="no-referrer"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.02]"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/40 to-[#FAF8F5]/60 dark:from-[#0A0A0A] dark:via-[#0A0A0A]/60 dark:to-[#0A0A0A]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/30 via-white/10 to-[#FAF8F5]/90 dark:from-transparent dark:via-black/20 dark:to-black/80" />
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full text-left space-y-8 pt-16">

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#121212] dark:text-white leading-[1.08] max-w-4xl"
        >
          Sculpted In <span className="italic font-normal text-[#C5A880]">Gold</span> &amp; Draped In <span className="underline decoration-[#C5A880]/50 underline-offset-8">Silk</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm md:text-lg text-stone-700 dark:text-stone-300 max-w-2xl font-sans font-normal leading-relaxed tracking-wide"
        >
          Discover elegant luxury fashion crafted with pure silk, hand-stitching, and timeless design.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-5 justify-start items-start sm:items-center pt-4"
        >
          <button
            onClick={() => navigateTo('shop')}
            className="w-full sm:w-auto bg-[#121212] hover:bg-[#C5A880] text-white dark:bg-[#C5A880] dark:hover:bg-[#A88B60] dark:text-black font-semibold text-xs uppercase tracking-[0.2em] px-9 py-4 rounded-lg transition-all duration-300 shadow-2xl flex items-center justify-center gap-2 group"
          >
            Explore Collection
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
