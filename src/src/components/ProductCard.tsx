import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '@/context/FavoritesContext';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

const ProductCard = ({ product, compact = false }: ProductCardProps) => {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(product.id);

  return (
    <div
      className={`group relative bg-card rounded-2xl overflow-hidden border border-border/50 ${
        compact ? 'w-40 shrink-0' : ''
      }`}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative aspect-square bg-secondary overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <button
          onClick={e => { e.stopPropagation(); toggleFavorite(product.id); }}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 backdrop-blur-sm transition-colors"
        >
          <Heart size={16} className={fav ? 'fill-sale text-sale' : 'text-muted-foreground'} />
        </button>
        {product.oldPrice && (
          <span className="absolute top-2 left-2 bg-sale text-sale-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
            SALE
          </span>
        )}
        {product.stockCount && product.stockCount <= 5 && (
          <span className="absolute bottom-2 left-2 bg-foreground/80 text-background text-[10px] font-medium px-2 py-0.5 rounded-full">
            {product.stockCount} left
          </span>
        )}
      </div>
      <div className="p-3">
        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">{product.brand}</p>
        <h3 className="text-sm font-semibold text-foreground leading-tight mt-0.5 line-clamp-1">
          {product.brand} {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-sm font-bold text-foreground">${product.price}</span>
          {product.oldPrice && (
            <span className="text-xs text-muted-foreground line-through">${product.oldPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
