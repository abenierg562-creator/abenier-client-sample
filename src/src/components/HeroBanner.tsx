import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroBanner from '@/assets/hero-banner.jpg';

const HeroBanner = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative mx-4 mt-3 rounded-2xl overflow-hidden h-56"
      style={{
        backgroundImage: `url(${heroBanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />

      {/* Accent glow */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 75% 60%, rgba(140,30,30,0.15) 0%, transparent 50%)' }} />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-5 z-10">
        <motion.span
          className="text-sm font-display font-black tracking-[0.25em] uppercase mb-3 bg-clip-text text-transparent"
          style={{ backgroundImage: `url(${heroBanner})`, backgroundSize: '200%', backgroundPosition: 'center' }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Style Fashion
        </motion.span>
        <motion.h2
          className="text-white text-2xl font-display font-extrabold leading-[1.15] tracking-tight"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          Step Into<br />
          <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Luxury</span>
        </motion.h2>
        <motion.p
          className="text-white/40 text-[11px] mt-1.5 mb-4 max-w-[55%] leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.5 }}
        >
          Premium sneakers for standout style
        </motion.p>
        <motion.button
          onClick={() => navigate('/brands')}
          className="text-[11px] font-bold px-5 py-2 rounded-full w-fit transition-all shadow-lg bg-white text-neutral-900 hover:bg-white/90"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          whileTap={{ scale: 0.95 }}
        >
          Shop Now →
        </motion.button>
      </div>
    </div>
  );
};

export default HeroBanner;
