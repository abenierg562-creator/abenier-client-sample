import { ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import type { Product } from '@/types';

interface ProductSectionProps {
  title: string;
  products: Product[];
  onSeeAll?: () => void;
}

const ProductSection = ({ title, products, onSeeAll }: ProductSectionProps) => {
  return (
    <section className="mt-6">
      <div className="flex items-center justify-between px-4 mb-3">
        <h2 className="text-base font-display font-bold text-foreground">{title}</h2>
        {onSeeAll && (
          <button onClick={onSeeAll} className="flex items-center text-xs text-primary font-medium">
            See all <ChevronRight size={14} />
          </button>
        )}
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-1">
        {products.slice(0, 4).map(p => (
          <ProductCard key={p.id} product={p} compact />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
