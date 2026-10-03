/**
 * Data hook: useProducts
 *
 * When a Convex client profile is provided, returns that profile's sample
 * products. Otherwise falls back to the static mock data.
 */
import { useMemo } from 'react';
import { products as mockProducts } from '@/data/products';
import type { Product, ProductFilters } from '@/types';
import { useClientProfile } from './useClientProfile';

/** Map legacy mock product shape → Product type */
function mockToProduct(p: (typeof mockProducts)[number]): Product {
  return {
    id: p.id,
    name: p.name,
    brand: p.brand,
    category: p.category,
    price: p.price,
    oldPrice: p.oldPrice,
    images: p.images,
    sizes: p.sizes,
    colors: p.colors,
    description: p.description,
    material: p.material,
    gender: p.gender,
    inStock: p.inStock,
    stockCount: p.stockCount,
    isTrending: p.isTrending,
    isNewArrival: p.isNewDrop,
    isSpecialOffer: p.isSpecialOffer,
    isBestSeller: p.isBestSeller,
    status: 'active',
  };
}

/** Map Convex profile product → Product type */
function profileToProduct(p: {
  id: string;
  name: string;
  price: string;
  image?: string;
  category: string;
  description: string;
}): Product {
  // Parse price string like "4,500 ETB" → use 0 as numeric fallback (display only)
  const numericPrice = parseFloat(p.price.replace(/[^0-9.]/g, '')) || 0;
  return {
    id: p.id,
    name: p.name,
    brand: 'Client',
    category: p.category,
    price: numericPrice,
    images: p.image ? [p.image] : ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80'],
    sizes: [],
    colors: [],
    description: p.description,
    inStock: true,
    // Mark all client products as new arrivals, trending, and special offers
    // so they show in all 3 tabs
    isNewArrival: true,
    isTrending: true,
    isSpecialOffer: true,
    isBestSeller: false,
    status: 'active',
  };
}

const mockAllProducts: Product[] = mockProducts.map(mockToProduct);

export function useProducts(filters?: ProductFilters) {
  const { profile, isLoading } = useClientProfile();

  // Use profile products when a client profile is loaded; fall back to mock
  const sourceProducts: Product[] = useMemo(() => {
    if (profile && profile.products.length > 0) {
      return profile.products.map(profileToProduct);
    }
    return mockAllProducts;
  }, [profile]);

  const filtered = useMemo(() => {
    let result = sourceProducts;

    if (filters?.brand) {
      result = result.filter(p => p.brand === filters.brand);
    }
    if (filters?.category) {
      result = result.filter(p => p.category === filters.category);
    }
    if (filters?.gender) {
      result = result.filter(p => p.gender === filters.gender);
    }
    if (filters?.collection === 'new-arrivals') {
      result = result.filter(p => p.isNewArrival);
    }
    if (filters?.collection === 'trending') {
      result = result.filter(p => p.isTrending);
    }
    if (filters?.collection === 'special-offers') {
      result = result.filter(p => p.isSpecialOffer);
    }
    if (filters?.budgetMin != null) {
      result = result.filter(p => p.price >= filters.budgetMin!);
    }
    if (filters?.budgetMax != null) {
      result = result.filter(p => p.price < filters.budgetMax!);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(p =>
        (p.name + p.brand + p.category).toLowerCase().includes(q)
      );
    }

    return result;
  }, [sourceProducts, filters]);

  return {
    products: filtered,
    isLoading,
  };
}

export function useBrands(): string[] {
  const { profile } = useClientProfile();
  if (profile && profile.products.length > 0) {
    return [profile.businessName];
  }
  return ['Akotet Shoes'];
}
