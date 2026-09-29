import { useBrands } from '@/hooks/useProducts';

interface BrandChipsProps {
  selected?: string | null;
  onSelect: (brand: string | null) => void;
  showAll?: boolean;
}

const BrandChips = ({ selected, onSelect, showAll = false }: BrandChipsProps) => {
  const { brands } = useBrands();

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-3">
      {showAll && (
        <button
          onClick={() => onSelect(null)}
          className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
            !selected
              ? 'bg-foreground text-background'
              : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
          }`}
        >
          All
        </button>
      )}
      {brands.map(brand => (
        <button
          key={brand}
          onClick={() => onSelect(selected === brand ? null : brand)}
          className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
            selected === brand
              ? 'bg-foreground text-background'
              : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
          }`}
        >
          {brand}
        </button>
      ))}
    </div>
  );
};

export default BrandChips;
