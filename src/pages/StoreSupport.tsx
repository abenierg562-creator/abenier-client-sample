import { ArrowLeft, Phone, MessageCircle, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PHONE_NUMBER = '+251940227733';

const StoreSupport = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-20">
      <div className="sticky top-0 z-40 flex items-center gap-3 h-14 px-4 bg-background/95 backdrop-blur-sm border-b border-border">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-secondary">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-display font-bold text-foreground">Store Support</h1>
      </div>

      <div className="mx-4 mt-4 space-y-3">
        <div className="p-4 bg-card rounded-2xl border border-border/50 text-center">
          <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mx-auto mb-3">
            <HelpCircle size={24} className="text-primary" />
          </div>
          <h2 className="text-sm font-display font-bold text-foreground">Need Help?</h2>
          <p className="text-xs text-muted-foreground mt-1">We're here to assist you with any questions about orders, products, or delivery.</p>
        </div>

        <a
          href={`tel:${PHONE_NUMBER}`}
          className="flex items-center gap-3 p-4 bg-card rounded-2xl border border-border/50 hover:bg-secondary/50 transition-colors"
        >
          <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shrink-0">
            <Phone size={18} className="text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Call Us</p>
            <p className="text-xs text-muted-foreground">{PHONE_NUMBER}</p>
          </div>
        </a>

        <a
          href={`https://t.me/${PHONE_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 bg-card rounded-2xl border border-border/50 hover:bg-secondary/50 transition-colors"
        >
          <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shrink-0">
            <MessageCircle size={18} className="text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Chat on Telegram</p>
            <p className="text-xs text-muted-foreground">Message us anytime</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default StoreSupport;
