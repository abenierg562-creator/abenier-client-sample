import { ArrowLeft, Package, MessageCircle, Truck, HelpCircle, User, ChevronRight, Settings, Zap, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTelegram } from '@/context/TelegramContext';

const PHONE_NUMBER = '+251918170559';

const menuItems = [
  { icon: Package, label: 'My Orders', subtitle: 'Track your purchases', route: '/orders' },
  { icon: MessageCircle, label: 'Contact Store', subtitle: 'Call +251918170559', action: () => window.open(`tel:${PHONE_NUMBER}`) },
  { icon: Truck, label: 'Delivery Information', subtitle: 'Shipping details', route: '/delivery-info' },
  { icon: HelpCircle, label: 'Store Support', subtitle: 'Help & FAQ', route: '/support' },
  { icon: Settings, label: 'Settings', subtitle: 'Dark mode & preferences', route: '/settings' },
];

const Profile = () => {
  const navigate = useNavigate();
  const { user, isTelegram } = useTelegram();

  const displayName = user?.firstName || 'Welcome!';
  const subtitle = user?.username ? `@${user.username}` : 'Style Fashion Customer';

  return (
    <div className="pb-20">
      <div className="sticky top-0 z-40 flex items-center gap-3 h-14 px-4 bg-background/95 backdrop-blur-sm border-b border-border">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-secondary">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-display font-bold text-foreground">Profile</h1>
      </div>

      {/* Avatar area */}
      <div className="flex flex-col items-center pt-8 pb-6">
        {user?.photoUrl ? (
          <img
            src={user.photoUrl}
            alt={displayName}
            className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-primary/20"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mb-3">
            <User size={32} className="text-primary" />
          </div>
        )}
        <h2 className="text-base font-display font-bold text-foreground">{displayName}</h2>
        <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        {isTelegram && (
          <span className="mt-2 px-3 py-1 rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">
            Connected via Telegram
          </span>
        )}
      </div>

      {/* Menu */}
      <div className="mx-4 bg-card rounded-2xl border border-border/50 overflow-hidden divide-y divide-border/50">
        {menuItems.map(({ icon: Icon, label, subtitle, route, action }) => (
          <button
            key={label}
            onClick={() => action ? action() : route && navigate(route)}
            className="flex items-center gap-3 w-full px-4 py-3.5 hover:bg-secondary/50 transition-colors text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shrink-0">
              <Icon size={18} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{label}</p>
              <p className="text-[11px] text-muted-foreground">{subtitle}</p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground shrink-0" />
          </button>
        ))}
      </div>

      {/* Why Shop With Us */}
      <section className="mx-4 mt-6 p-4 bg-accent rounded-2xl">
        <h3 className="text-sm font-display font-bold text-accent-foreground mb-3">Why Shop With Us</h3>
        <div className="space-y-2.5">
          {[
            { icon: MessageCircle, text: 'Fast response on Telegram' },
            { icon: Zap, text: 'Easy ordering process' },
            { icon: Sparkles, text: 'New styles added every week' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon size={16} className="text-primary" />
              </div>
              <span className="text-xs font-medium text-foreground">{text}</span>
            </div>
          ))}
        </div>
      </section>

      <p className="text-center text-[11px] text-muted-foreground mt-8">
        Style Fashion © 2026 • Powered by Abenier
      </p>
    </div>
  );
};

export default Profile;
