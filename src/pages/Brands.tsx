import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import Header from '@/components/Header';
import CategoryChips from '@/components/CategoryChips';
import ProductCard from '@/components/ProductCard';
import FilterSheet, { type FilterState } from '@/components/FilterSheet';
import { useProducts } from '@/hooks/useProducts';
import type { ProductFilters } from '@/types';

type GenderFilter = 'Men' | 'Women' | 'Unisex' | null;

const budgetRanges: Record<string, [number, number]> = {
  'under-3000': [0, 3000],
  '3000-5000': [3000, 5000],
  '5000-8000': [5000, 8000],
  '8000+': [8000, Infinity],
};

const Brands = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [search, setSearch] = useState('');
  const [gender, setGender] = useState<GenderFilter>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({ categories: [], budget: null, collections: [] });

  const activeFilterCount = filters.categories.length + (filters.budget ? 1 : 0) + filters.collections.length;

  const productFilters = useMemo<ProductFilters>(() => {
    const f: ProductFilters = {};
    if (selectedCategory) f.category = selectedCategory;
    if (gender) f.gender = gender;
    if (search) f.search = search;
    if (filters.categories.length === 1) f.category = filters.categories[0];
    if (filters.budget) {
      const [min, max] = budgetRanges[filters.budget];
      f.budgetMin = min;
      f.budgetMax = max === Infinity ? undefined : max;
    }
    if (filters.collections.includes('New Arrivals')) f.collection = 'new-arrivals';
    else if (filters.collections.includes('Trending')) f.collection = 'trending';
    else if (filters.collections.includes('Special Offers')) f.collection = 'special-offers';
    return f;
  }, [selectedCategory, search, gender, filters]);

  const { products: filtered } = useProducts(productFilters);

  const finalFiltered = useMemo(() => {
    if (filters.categories.length <= 1) return filtered;
    return filtered.filter(p => filters.categories.includes(p.category));
  }, [filtered, filters.categories]);

  const FilterChip = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all ${
        active ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="pb-20">
      <Header />
      <div className="px-4 pt-4">
        <h1 className="text-xl font-display font-bold text-foreground">Browse Shoes</h1>
        <div className="flex gap-2 mt-3">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search shoes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-secondary text-sm text-foreground placeholder:text-muted-foreground outline-none border border-border focus:border-primary transition-colors"
            />
          </div>
          <button
            onClick={() => setFilterOpen(true)}
            className="relative h-10 w-10 shrink-0 rounded-xl bg-secondary border border-border flex items-center justify-center hover:border-primary/40 transition-colors"
          >
            <SlidersHorizontal size={18} className="text-foreground" />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Category chips */}
      <CategoryChips
        selected={selectedCategory}
        onSelect={cat => setSelectedCategory(cat)}
      />

      {/* Gender filter */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 pb-2">
        {(['Men', 'Women', 'Unisex'] as const).map(g => (
          <FilterChip key={g} label={g} active={gender === g} onClick={() => setGender(gender === g ? null : g)} />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 px-4 mt-3">
        {finalFiltered.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {finalFiltered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-sm">No shoes found</p>
        </div>
      )}

      <FilterSheet
        open={filterOpen}
        filters={filters}
        onApply={setFilters}
        onClose={() => setFilterOpen(false)}
      />
    </div>
  );
};

export default Brands;
