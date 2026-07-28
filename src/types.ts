export type CategoryType = 
  | 'All'
  | 'Women' 
  | 'Men' 
  | 'Ethnic' 
  | 'Wedding' 
  | 'Party Wear' 
  | 'Casual' 
  | 'Accessories' 
  | 'Luxury Collection';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'INR';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: CategoryType;
  subCategory?: string;
  price: number; // base price in USD
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  isFeatured?: boolean;
  isLuxury?: boolean;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  fabric: string;
  careInstructions: string;
  description: string;
  details: string[];
  inStock: boolean;
  stockCount: number;
  reviewsList: Review[];
  sku: string;
  tags: string[];
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface Address {
  id: string;
  title: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'In Tailoring';
  items: CartItem[];
  totalAmount: number;
  shippingAddress: Address;
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  tier: 'Gold Member' | 'Platinum VIP' | 'Privilege Club';
  joinedDate: string;
  addresses: Address[];
  orders: Order[];
}

export interface AdminImage {
  id: string;
  url: string;
  title: string;
  bucket: string;
  filePath: string;
  targetSection: 'hero' | 'banner' | 'gallery' | 'collection';
  createdAt: string;
}

export type PageView = 
  | 'home' 
  | 'shop' 
  | 'category' 
  | 'product-detail'
  | 'cart'
  | 'checkout' 
  | 'wishlist' 
  | 'account' 
  | 'about' 
  | 'faq' 
  | 'contact'
  | 'admin'
  | 'admin-login';
