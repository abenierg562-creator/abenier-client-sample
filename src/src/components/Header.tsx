import { Bell, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '@/context/FavoritesContext';

const Header = () => {
  const navigate = useNavigate();
  const { favorites } = useFavorites();

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
        <button onClick={() => navigate('/')} className="flex items-center gap-1.5">
          <span className="text-lg font-display font-bold tracking-tight text-foreground">STYLE</span>
          <span className="text-lg font-display font-light text-primary">FASHION</span>
        </button>
        <div className="flex items-center gap-1">
          <button onClick={() => navigate('/favorites')} className="p-2 rounded-full hover:bg-secondary transition-colors relative">
            <Heart size={20} className="text-foreground" />
            {favorites.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>
          <button className="p-2 rounded-full hover:bg-secondary transition-colors relative">
            <Bell size={20} className="text-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
