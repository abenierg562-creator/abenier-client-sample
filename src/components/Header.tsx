import { Bell, Heart } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useFavorites } from '@/context/FavoritesContext';

const StarIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2L14.5 8.5L21.5 9L16.5 13.5L18 20.5L12 17L6 20.5L7.5 13.5L2.5 9L9.5 8.5L12 2Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M12 2L14 7L19 8L15 12L16.5 17.5L12 15L7.5 17.5L9 12L5 8L10 7L12 2Z"
      fill="#1a1a1a"
      strokeWidth="0"
    />
  </svg>
);

const Header = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { favorites } = useFavorites();

  const clientParam = searchParams.get('client');
  const formattedClientName = clientParam
    ? clientParam.replace(/_sample$/i, '').replace(/_/g, ' ').toUpperCase()
    : 'AKOTET SHOES';

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
        <button onClick={() => navigate('/')} className="flex items-center gap-2">
          <span className="text-lg font-display font-black tracking-tight text-primary">{formattedClientName}</span>
          <span className="text-primary">
            <StarIcon />
          </span>
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
