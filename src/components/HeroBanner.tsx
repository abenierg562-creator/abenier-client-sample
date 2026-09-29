import { useNavigate } from 'react-router-dom';
import heroBanner from '@/assets/akotet-hero-banner.jpg';

const HeroBanner = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative mt-3 rounded-2xl overflow-hidden mx-2 cursor-pointer"
      onClick={() => navigate('/brands')}
      style={{ aspectRatio: '16/9' }}
    >
      <img
        src={heroBanner}
        alt="Akotet Shoes — New Collection"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default HeroBanner;
