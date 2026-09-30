import { useNavigate } from 'react-router-dom';
import { useClientProfile } from '@/hooks/useClientProfile';
import heroBannerFallback from '@/assets/akotet-hero-banner.jpg';

const HeroBanner = () => {
  const navigate = useNavigate();
  const { profile } = useClientProfile();

  // Use the uploaded hero banner from the client profile, fall back to default
  const bannerSrc = profile?.heroBanner || heroBannerFallback;
  const altText = profile ? `${profile.businessName} — New Collection` : 'New Collection';

  return (
    <div
      className="relative mt-3 rounded-2xl overflow-hidden mx-2 cursor-pointer"
      onClick={() => navigate('/brands')}
      style={{ aspectRatio: '16/9' }}
    >
      <img
        src={bannerSrc}
        alt={altText}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default HeroBanner;
