import { useNavigate } from 'react-router-dom';
import { useClientProfile } from '@/hooks/useClientProfile';
import heroBannerFallback from '@/assets/akotet-hero-banner.jpg';

const HeroBanner = () => {
  const navigate = useNavigate();
  const { profile, isLoading, slug } = useClientProfile();

  // Rules:
  // - No slug in URL → show fallback (demo mode)
  // - Slug present but still loading → show nothing (avoid flash of wrong image)
  // - Profile loaded with heroBanner → show it
  // - Profile loaded without heroBanner → show a plain dark placeholder (no old image)

  if (slug && isLoading) {
    // Still fetching — show a dark placeholder to avoid flash of old fallback image
    return (
      <div
        className="relative mt-3 rounded-2xl overflow-hidden mx-2"
        style={{ aspectRatio: '16/9', background: 'rgba(255,255,255,0.04)' }}
      />
    );
  }

  const bannerSrc = profile?.heroBanner || (!slug ? heroBannerFallback : null);
  const altText = profile ? `${profile.businessName} — New Collection` : 'New Collection';

  if (!bannerSrc) {
    // Client profile exists but has no banner — show branded placeholder
    return (
      <div
        className="relative mt-3 rounded-2xl overflow-hidden mx-2 flex items-center justify-center"
        style={{ aspectRatio: '16/9', background: 'rgba(229,169,59,0.08)', border: '1px dashed rgba(229,169,59,0.3)' }}
      >
        <p style={{ fontSize: 14, color: 'rgba(229,169,59,0.6)', fontWeight: 600 }}>
          {profile?.businessName ?? ''}
        </p>
      </div>
    );
  }

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
