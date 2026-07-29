import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronDown, 
  Home,
  Grid,
  Info,
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CategoryType } from '../types';
import { CATEGORIES_LIST } from '../data/mockData';
import logo from '../assets/logo-preppy.png';

export const Navbar: React.FC = () => {
  const { 
    pageView, 
    navigateTo, 
    cart, 
    setIsCartOpen
  } = useShop();

  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleCategoryClick = (catName: CategoryType) => {
    setActiveMegaMenu(null);
    setMobileMenuOpen(false);
    navigateTo('category', { category: catName });
  };

  return (
    <header
  className="fixed top-0 left-0 right-0 z-40"
  style={{ overflow: "visible" }}
>

      {/* Main Bar */}
      <nav className="w-full px-4 md:px-12 py-3.5 bg-[#FAF8F5] text-[#121212] shadow-md flex items-center justify-between">
        {/* Left: Brand Logo in left side corner */}
        <div className="flex-1 flex items-center justify-start">
  <div
    className="cursor-pointer"
    onClick={() => navigateTo('home')}
  >
    <img
      src={logo}
      alt="PREPPY"
      className="h-10 md:h-10 w-auto object-contain block"
    />
  </div>
</div>

        {/* Center: Desktop Navigation Links in PC view */}
        <div className="hidden lg:flex items-center justify-center gap-8 text-xs uppercase tracking-widest font-medium text-[#121212]">
          <button
            onClick={() => navigateTo('home')}
            className={`relative py-1 transition-colors hover:text-[#8C6D3B] ${
              pageView === 'home' ? 'text-[#8C6D3B] font-semibold' : ''
            }`}
          >
            Home
          </button>

          <button
            onClick={() => navigateTo('shop')}
            className={`relative py-1 transition-colors hover:text-[#8C6D3B] ${
              pageView === 'shop' ? 'text-[#8C6D3B] font-semibold' : ''
            }`}
          >
            Shop All
          </button>
          {/* Collections Mega Menu trigger */}
          <div 
            className="relative py-2"
            onMouseEnter={() => setActiveMegaMenu('collections')}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <button
              onClick={() => setActiveMegaMenu(activeMegaMenu === 'collections' ? null : 'collections')}
              className="flex items-center gap-1 hover:text-[#8C6D3B] transition-colors"
            >
              Collections
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMegaMenu === 'collections' ? 'rotate-180' : ''}`} />
            </button>

            {/* Mega Menu Dropdown */}
            <AnimatePresence>
              {activeMegaMenu === 'collections' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[640px] bg-[#FAF8F5] text-[#121212] p-6 rounded-b-xl shadow-2xl border border-[#C5A880]/30 grid grid-cols-3 gap-4 z-50 mt-1"
                >
                  {CATEGORIES_LIST.filter(cat => ['Sarees', 'Aariwork', 'Accessories'].includes(cat.name)).map(cat => (
                    <div
                      key={cat.name}
                      onClick={() => handleCategoryClick(cat.name as CategoryType)}
                      className="group cursor-pointer p-2 rounded-lg hover:bg-stone-200/60 transition-all"
                    >
                      <div className="aspect-[4/3] rounded overflow-hidden mb-2 bg-stone-200">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <h4 className="font-serif-luxury text-sm font-semibold group-hover:text-[#8C6D3B] transition-colors">
                        {cat.name}
                      </h4>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => navigateTo('about')}
            className={`relative py-1 transition-colors hover:text-[#8C6D3B] ${
              pageView === 'about' ? 'text-[#8C6D3B] font-semibold' : ''
            }`}
          >
            About Us
          </button>

          <button
            onClick={() => navigateTo('contact')}
            className={`relative py-1 transition-colors hover:text-[#8C6D3B] ${
              pageView === 'contact' ? 'text-[#8C6D3B] font-semibold' : ''
            }`}
          >
            Contact
          </button>
        </div>

        {/* Right: Cart & Mobile Menu Icon on Right Side */}
        <div className="flex-1 flex items-center justify-end gap-3 md:gap-5">
          {/* Cart Bag trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-full hover:bg-stone-200/60 transition-colors"
            aria-label="Cart Bag"
          >
            <ShoppingBag className="w-5 h-5 text-[#8C6D3B]" />
            {totalCartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-[#8C6D3B] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Icon on Right Side Corner */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-full hover:bg-stone-200/60 transition-colors text-current"
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-6 h-6 text-[#8C6D3B]" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="absolute inset-y-0 right-0 w-5/6 max-w-xs bg-[#FAF8F5] dark:bg-[#121212] text-[#121212] dark:text-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto no-scrollbar"
            >
              <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar">
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-5 border-b border-stone-200 dark:border-neutral-800 mb-6">
                  <div
  className="cursor-pointer"
  onClick={() => {
    setMobileMenuOpen(false);
    navigateTo('home');
  }}
>
  <img
    src={logo}
    alt="PREPPY"
    className="h-8 w-auto object-contain block"
  />
</div>
                  <button 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-neutral-800 transition-colors text-stone-600 dark:text-stone-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col flex-1 gap-4 text-xs font-semibold uppercase tracking-wider">
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigateTo('home');
                      }}
                      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                        pageView === 'home' 
                          ? 'bg-[#C5A880]/15 text-[#C5A880] font-bold' 
                          : 'hover:bg-stone-100 dark:hover:bg-neutral-900 text-stone-800 dark:text-stone-200'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Home className="w-4 h-4 text-[#C5A880]" />
                        Home
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                    </button>

                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigateTo('shop');
                      }}
                      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                        pageView === 'shop' 
                          ? 'bg-[#C5A880]/15 text-[#C5A880] font-bold' 
                          : 'hover:bg-stone-100 dark:hover:bg-neutral-900 text-stone-800 dark:text-stone-200'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Grid className="w-4 h-4 text-[#C5A880]" />
                        Shop All
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                    </button>

                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigateTo('about');
                      }}
                      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                        pageView === 'about' 
                          ? 'bg-[#C5A880]/15 text-[#C5A880] font-bold' 
                          : 'hover:bg-stone-100 dark:hover:bg-neutral-900 text-stone-800 dark:text-stone-200'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Info className="w-4 h-4 text-[#C5A880]" />
                        About Us
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                    </button>

                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigateTo('contact');
                      }}
                      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                        pageView === 'contact' 
                          ? 'bg-[#C5A880]/15 text-[#C5A880] font-bold' 
                          : 'hover:bg-stone-100 dark:hover:bg-neutral-900 text-stone-800 dark:text-stone-200'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <MessageSquare className="w-4 h-4 text-[#C5A880]" />
                        Contact
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};

