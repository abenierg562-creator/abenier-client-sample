import { ArrowLeft, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-20">
      <div className="sticky top-0 z-40 flex items-center gap-3 h-14 px-4 bg-background/95 backdrop-blur-sm border-b border-border">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-secondary">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-display font-bold text-foreground">Settings</h1>
      </div>

      <div className="mx-4 mt-6 bg-card rounded-2xl border border-border/50 overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-4">
          <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
            <Moon size={18} className="text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Dark Mode</p>
            <p className="text-[11px] text-muted-foreground">Dark theme active</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
