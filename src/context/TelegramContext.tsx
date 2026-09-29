import React, { createContext, useContext, useEffect, useState } from 'react';
import type { TelegramUser, User } from '@/types';

// Telegram WebApp type shim
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initData: string;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            photo_url?: string;
            language_code?: string;
          };
          auth_date: number;
          hash: string;
        };
        ready: () => void;
        expand: () => void;
        close: () => void;
        MainButton: {
          text: string;
          show: () => void;
          hide: () => void;
          onClick: (cb: () => void) => void;
        };
        themeParams: Record<string, string>;
        colorScheme: 'light' | 'dark';
        platform: string;
        version: string;
      };
    };
  }
}

interface TelegramContextType {
  /** Raw Telegram user from initDataUnsafe */
  telegramUser: TelegramUser | null;
  /** App-level user (mapped from Telegram data, will later come from Convex) */
  user: User | null;
  /** Whether the app is running inside Telegram */
  isTelegram: boolean;
  /** Raw initData string for backend verification */
  initData: string | null;
  /** Loading state during bootstrap */
  isLoading: boolean;
}

const TelegramContext = createContext<TelegramContextType>({
  telegramUser: null,
  user: null,
  isTelegram: false,
  initData: null,
  isLoading: true,
});

export const TelegramProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [telegramUser, setTelegramUser] = useState<TelegramUser | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isTelegram, setIsTelegram] = useState(false);
  const [initData, setInitData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const webapp = window.Telegram?.WebApp;

    if (webapp) {
      // Signal Telegram that the app is ready
      webapp.ready();
      webapp.expand();

      setIsTelegram(true);
      setInitData(webapp.initData || null);

      const tgUser = webapp.initDataUnsafe?.user;
      if (tgUser) {
        const mapped: TelegramUser = {
          id: tgUser.id,
          firstName: tgUser.first_name,
          lastName: tgUser.last_name,
          username: tgUser.username,
          photoUrl: tgUser.photo_url,
          languageCode: tgUser.language_code,
        };
        setTelegramUser(mapped);

        // Build a local User object. In production this will come from Convex
        // after verifying initData on the backend.
        const appUser: User = {
          id: String(tgUser.id), // placeholder; real id comes from Convex
          telegramUserId: tgUser.id,
          firstName: tgUser.first_name,
          username: tgUser.username,
          photoUrl: tgUser.photo_url,
          lastSeenAt: new Date().toISOString(),
        };
        setUser(appUser);
      }
    }

    setIsLoading(false);
  }, []);

  return (
    <TelegramContext.Provider value={{ telegramUser, user, isTelegram, initData, isLoading }}>
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => useContext(TelegramContext);
