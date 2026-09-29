import { ArrowLeft, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';
import { useEffect, useState } from 'react';

const Settings = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <div className="pb-20">
      <div className="sticky top-0 z-40 flex items-center gap-3 h-14 px-4 bg-background/95 backdrop-blur-sm border-b border-border">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-secondary">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-display font-bold text-foreground">Settings</h1>
      </div>

      <div className="mx-4 mt-6 bg-card rounded-2xl border border-border/50 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
              {isDark ? <Moon size={18} className="text-primary" /> : <Sun size={18} className="text-primary" />}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Dark Mode</p>
              <p className="text-[11px] text-muted-foreground">{isDark ? 'Dark theme active' : 'Light theme active'}</p>
            </div>
          </div>
          <Switch checked={isDark} onCheckedChange={setIsDark} />
        </div>
      </div>
    </div>
  );
};

export default Settings;
