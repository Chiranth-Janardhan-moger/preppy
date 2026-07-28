import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  WishlistItem, 
  CategoryType, 
  Currency, 
  PageView, 
  UserProfile, 
  ProductColor,
  AdminImage
} from '../types';
import { PRODUCTS, CURRENCY_RATES } from '../data/mockData';
import { 
  fetchAdminImages, 
  uploadImageToStorage, 
  deleteImageFromStorage 
} from '../lib/supabase';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface ShopContextType {
  pageView: PageView;
  setPageView: (page: PageView) => void;
  navigateTo: (page: PageView, extra?: { category?: CategoryType; product?: Product }) => void;
  selectedCategory: CategoryType;
  setSelectedCategory: (cat: CategoryType) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  
  cart: CartItem[];
  addToCart: (product: Product, color?: ProductColor, size?: string, quantity?: number) => void;
  removeFromCart: (index: number) => void;
  updateCartQuantity: (index: number, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  wishlist: WishlistItem[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (usdPrice: number) => string;
  
  isDarkMode: boolean;
  toggleTheme: () => void;
  
  user: UserProfile;
  updateUser: (updated: Partial<UserProfile>) => void;
  
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Recently Viewed Products
  recentlyViewed: Product[];
  addRecentlyViewed: (product: Product) => void;

  // Admin & Supabase Storage state
  isAdminLoggedIn: boolean;
  adminLogin: (passcode: string) => boolean;
  adminLogout: () => void;
  adminImages: AdminImage[];
  loadAdminImages: () => Promise<void>;
  uploadAdminImage: (file: File, title: string, targetSection?: 'hero' | 'banner' | 'gallery' | 'collection') => Promise<AdminImage>;
  deleteAdminImage: (image: AdminImage) => Promise<void>;
}

const defaultUser: UserProfile = {
  id: 'usr-9081',
  name: 'Lady Eleanor Vance',
  email: 'eleanor.vance@preppy-couture.com',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  tier: 'Platinum VIP',
  joinedDate: 'October 2024',
  addresses: [
    {
      id: 'addr-1',
      title: 'Penthouse Residence',
      fullName: 'Lady Eleanor Vance',
      street: '432 Park Avenue, Suite 62A',
      city: 'New York',
      state: 'NY',
      postalCode: '10022',
      country: 'United States',
      phone: '+91 98765 43210',
      isDefault: true
    }
  ],
  orders: [
    {
      id: 'ORD-98421',
      date: 'July 14, 2026',
      status: 'Delivered',
      items: [
        {
          product: PRODUCTS[0],
          selectedColor: PRODUCTS[0].colors[0],
          selectedSize: 'S',
          quantity: 1
        }
      ],
      totalAmount: 3850,
      shippingAddress: {
        id: 'addr-1',
        title: 'Penthouse Residence',
        fullName: 'Lady Eleanor Vance',
        street: '432 Park Avenue, Suite 62A',
        city: 'New York',
        state: 'NY',
        postalCode: '10022',
        country: 'United States',
        phone: '+91 98765 43210',
        isDefault: true
      },
      trackingNumber: 'AST-EX-8830192',
      estimatedDelivery: 'July 16, 2026'
    }
  ]
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pageView, setPageView] = useState<PageView>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS[0]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('astryx_cart');
      return saved ? JSON.parse(saved) : [
        {
          product: PRODUCTS[0],
          selectedColor: PRODUCTS[0].colors[0],
          selectedSize: 'S',
          quantity: 1
        }
      ];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem('astryx_wishlist');
      return saved ? JSON.parse(saved) : [
        { product: PRODUCTS[2], addedAt: new Date().toISOString() },
        { product: PRODUCTS[3], addedAt: new Date().toISOString() }
      ];
    } catch {
      return [];
    }
  });

  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([PRODUCTS[1], PRODUCTS[4]]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currency, setCurrency] = useState<Currency>('INR');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Admin Auth & Storage state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('preppy_admin_session') === 'true';
  });
  const [adminImages, setAdminImages] = useState<AdminImage[]>([]);

  const loadAdminImages = async () => {
    try {
      const images = await fetchAdminImages();
      setAdminImages(Array.isArray(images) ? images : []);
    } catch (e) {
      console.error('Failed to load admin images:', e);
      setAdminImages([]);
    }
  };

  useEffect(() => {
    loadAdminImages();
  }, []);

  const adminLogin = (passcode: string): boolean => {
    if (passcode === 'preppy2026' || passcode === 'admin123' || passcode === 'admin') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('preppy_admin_session', 'true');
      showToast('Welcome Admin! Authenticated successfully.', 'success');
      return true;
    }
    showToast('Invalid Security Passcode', 'error');
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('preppy_admin_session');
    showToast('Admin session logged out', 'info');
  };

  const uploadAdminImage = async (
    file: File, 
    title: string, 
    targetSection: 'hero' | 'banner' | 'gallery' | 'collection' = 'hero'
  ): Promise<AdminImage> => {
    const uploaded = await uploadImageToStorage(file, title, targetSection);
    setAdminImages(prev => [uploaded, ...prev]);
    showToast(`Image "${uploaded.title}" uploaded successfully!`, 'success');
    return uploaded;
  };

  const deleteAdminImage = async (image: AdminImage): Promise<void> => {
    await deleteImageFromStorage(image);
    setAdminImages(prev => prev.filter(img => img.id !== image.id));
    showToast(`Image deleted successfully from Storage`, 'info');
  };

  // Persist cart & wishlist
  useEffect(() => {
    try {
      localStorage.setItem('astryx_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('astryx_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Sync dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Sync browser history for back & forward navigation
  useEffect(() => {
    if (!window.history.state) {
      window.history.replaceState({ page: 'home' }, '');
    }

    const VALID_PAGES = ['home', 'shop', 'category', 'checkout', 'wishlist', 'account', 'about', 'faq', 'contact', 'admin', 'admin-login'];

    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;
      if (state && state.page && VALID_PAGES.includes(state.page)) {
        setPageView(state.page as PageView);
        if (state.category) {
          setSelectedCategory(state.category);
        }
        if (state.productId) {
          const found = PRODUCTS.find(p => p.id === state.productId);
          if (found) setSelectedProduct(found);
        }
      } else {
        setPageView('home');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = crypto.randomUUID();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const navigateTo = (page: PageView, extra?: { category?: CategoryType; product?: Product }, replace = false) => {
    if (extra?.category) {
      setSelectedCategory(extra.category);
    }
    if (extra?.product) {
      setSelectedProduct(extra.product);
      addRecentlyViewed(extra.product);
    }
    setPageView(page);

    const historyPayload = {
      page,
      category: extra?.category,
      productId: extra?.product?.id
    };

    if (replace) {
      window.history.replaceState(historyPayload, '');
    } else {
      window.history.pushState(historyPayload, '');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addRecentlyViewed = (prod: Product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== prod.id);
      return [prod, ...filtered].slice(0, 6);
    });
  };

  const addToCart = (
    product: Product, 
    color?: ProductColor, 
    size?: string, 
    quantity: number = 1
  ) => {
    const chosenColor = color || product.colors[0];
    const chosenSize = size || product.sizes[0];

    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && 
                item.selectedColor.name === chosenColor.name && 
                item.selectedSize === chosenSize
      );

      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      } else {
        return [...prev, { product, selectedColor: chosenColor, selectedSize: chosenSize, quantity }];
      }
    });

    showToast(`Added ${quantity}x "${product.name}" to your Cart Bag`);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (index: number, delta: number) => {
    setCart(prev => {
      const copy = [...prev];
      const newQty = copy[index].quantity + delta;
      if (newQty <= 0) {
        return prev.filter((_, i) => i !== index);
      }
      copy[index].quantity = newQty;
      return copy;
    });
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some(w => w.product.id === product.id);
    if (exists) {
      setWishlist(prev => prev.filter(w => w.product.id !== product.id));
      showToast(`Removed "${product.name}" from Wishlist`, 'info');
    } else {
      setWishlist(prev => [...prev, { product, addedAt: new Date().toISOString() }]);
      showToast(`Added "${product.name}" to Wishlist`);
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(w => w.product.id === productId);
  };

  const formatPrice = (usdPrice: number): string => {
    const config = CURRENCY_RATES[currency];
    const converted = Math.round(usdPrice * config.rate);
    return `${config.symbol}${converted.toLocaleString()}`;
  };

  const updateUser = (updated: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updated }));
    showToast('Account details updated successfully');
  };

  return (
    <ShopContext.Provider
      value={{
        pageView,
        setPageView,
        navigateTo,
        selectedCategory,
        setSelectedCategory,
        selectedProduct,
        setSelectedProduct,
        quickViewProduct,
        setQuickViewProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        currency,
        setCurrency,
        formatPrice,
        isDarkMode,
        toggleTheme,
        user,
        updateUser,
        toasts,
        showToast,
        removeToast,
        recentlyViewed,
        addRecentlyViewed,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        adminImages,
        loadAdminImages,
        uploadAdminImage,
        deleteAdminImage
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
