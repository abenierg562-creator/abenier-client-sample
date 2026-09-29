// ========================
// Style Fashion — Shared Types
// Convex-ready data models
// ========================

// ---------- User ----------
export interface TelegramUser {
  id: number;
  firstName: string;
  lastName?: string;
  username?: string;
  photoUrl?: string;
  languageCode?: string;
}

export interface User {
  id: string;
  telegramUserId: number;
  firstName: string;
  username?: string;
  photoUrl?: string;
  lastSeenAt: string; // ISO date
}

// ---------- Product ----------
export type Brand = string;
export type Category = string;
export type Gender = 'Men' | 'Women' | 'Unisex';
export type ProductStatus = 'active' | 'draft' | 'archived';

export interface Product {
  id: string;
  name: string;
  brand: Brand;
  category: Category;
  price: number;
  oldPrice?: number;
  images: string[];
  sizes: number[];
  colors: string[];
  description: string;
  material?: string;
  gender?: Gender;
  inStock: boolean;
  stockCount?: number;
  featured?: boolean;
  isNewArrival?: boolean;
  isTrending?: boolean;
  isSpecialOffer?: boolean;
  isBestSeller?: boolean;
  status: ProductStatus;
}

// ---------- Cart ----------
export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  size: number;
  quantity: number;
}

// Local cart item used on the frontend (includes product data)
export interface LocalCartItem {
  product: Product;
  size: number;
  quantity: number;
}

// ---------- Order ----------
export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  name: string;
  brand: string;
  size: number;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  phone?: string;
  deliveryNote?: string;
  createdAt: string; // ISO date
}

// ---------- Filter ----------
export interface ProductFilters {
  brand?: string | null;
  category?: string | null;
  gender?: Gender | null;
  search?: string;
  collection?: 'new-arrivals' | 'trending' | 'special-offers' | null;
  budgetMin?: number;
  budgetMax?: number;
}
