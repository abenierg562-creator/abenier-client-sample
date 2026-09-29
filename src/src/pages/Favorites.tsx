import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ProductCard';

const Favorites = () => {
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const { products } = useProducts();

  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  return (
    <div className="pb-24">
      <div className="sticky top-0 z-40 flex items-center gap-3 h-14 px-4 bg-background/95 backdrop-blur-sm">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-secondary">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-display font-bold text-foreground">Favorites</h1>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <Heart size={48} className="text-muted-foreground/40 mb-4" />
          <p className="text-lg font-display font-bold text-foreground">No favorites yet</p>
          <p className="text-sm text-muted-foreground mt-1">Tap the heart icon on products you love</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 px-4 mt-2">
          {favoriteProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
