/**
 * Data hook: useProducts
 *
 * Currently returns mock data from src/data/products.ts.
 * When Convex is integrated, swap the implementation to use
 * useQuery(api.products.list, filters) etc.
 */
import { useMemo } from 'react';
import { products as mockProducts, brands as mockBrands } from '@/data/products';
import type { Product, ProductFilters } from '@/types';

/** Map legacy product shape → Convex-ready Product type */
function toProduct(p: (typeof mockProducts)[number]): Product {
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

const allProducts: Product[] = mockProducts.map(toProduct);

export function useProducts(filters?: ProductFilters) {
  const filtered = useMemo(() => {
    let result = allProducts;

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
  }, [filters]);

  return {
    products: filtered,
    isLoading: false, // will be true when using Convex query
  };
}

export function useProduct(id: string | undefined) {
  const product = useMemo(
    () => (id ? allProducts.find(p => p.id === id) ?? null : null),
    [id]
  );

  return {
    product,
    isLoading: false,
  };
}

export function useBrands() {
  // When Convex is integrated, this will be a distinct query
  return {
    brands: mockBrands as string[],
    isLoading: false,
  };
}

export function useNewArrivals(limit = 4) {
  return useMemo(() => allProducts.filter(p => p.isNewArrival).slice(0, limit), [limit]);
}

export function useTrending(limit = 4) {
  return useMemo(() => allProducts.filter(p => p.isTrending).slice(0, limit), [limit]);
}

export function useSpecialOffers(limit = 4) {
  return useMemo(() => allProducts.filter(p => p.isSpecialOffer || p.oldPrice).slice(0, limit), [limit]);
}
