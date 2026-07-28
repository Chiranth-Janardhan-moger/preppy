import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { NotificationToast } from './components/NotificationToast';

// Home Sections
import { HeroSection } from './components/home/HeroSection';
import { FeaturedCollections } from './components/home/FeaturedCollections';
import { NewArrivals } from './components/home/NewArrivals';
import { BestSellers } from './components/home/BestSellers';
import { SeasonalCollection } from './components/home/SeasonalCollection';
import { WhyChooseUsSection } from './components/home/WhyChooseUsSection';
import { ReviewsSection } from './components/home/ReviewsSection';
import { InstagramGallery } from './components/home/InstagramGallery';

// Pages
import { ShopPage } from './components/pages/ShopPage';
import { CategoryPage } from './components/pages/CategoryPage';
import { CheckoutPage } from './components/pages/CheckoutPage';
import { WishlistPage } from './components/pages/WishlistPage';
import { UserAccountPage } from './components/pages/UserAccountPage';
import { AboutPage } from './components/pages/AboutPage';
import { FAQPage } from './components/pages/FAQPage';
import { ContactPage } from './components/pages/ContactPage';

const AppContent: React.FC = () => {
  const { pageView } = useShop();

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#121212] font-sans selection:bg-[#C5A880] selection:text-white flex flex-col justify-between">
      {/* Top Fixed Header */}
      <Navbar />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {(pageView === 'home' || !['shop', 'category', 'checkout', 'wishlist', 'account', 'about', 'faq', 'contact'].includes(pageView)) && (
          <>
            <HeroSection />
            <FeaturedCollections />
            <NewArrivals />
            <BestSellers />
            <SeasonalCollection />
            <WhyChooseUsSection />
            <ReviewsSection />
            <InstagramGallery />
          </>
        )}

        {pageView === 'shop' && <ShopPage />}
        {pageView === 'product-detail' && <ShopPage />}
        {pageView === 'cart' && <ShopPage />}
        {pageView === 'category' && <CategoryPage />}
        {pageView === 'checkout' && <CheckoutPage />}
        {pageView === 'wishlist' && <WishlistPage />}
        {pageView === 'account' && <UserAccountPage />}
        {pageView === 'about' && <AboutPage />}
        {pageView === 'faq' && <FAQPage />}
        {pageView === 'contact' && <ContactPage />}
      </main>

      {/* Global Drawers & Modals */}
      <CartDrawer />
      <SearchModal />
      <NotificationToast />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
