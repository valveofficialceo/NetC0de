import WebApp from '@twa-dev/sdk';

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
}

export const telegram = {
  isAvailable: () => {
    try {
      return !!WebApp && typeof window !== 'undefined' && !!WebApp.initData;
    } catch {
      return false;
    }
  },

  init: () => {
    try {
      WebApp.ready();
      WebApp.expand();
      WebApp.enableClosingConfirmation();
      // Theme sync
      WebApp.setHeaderColor('#141925');
      WebApp.setBackgroundColor('#141925');
      return true;
    } catch {
      return false;
    }
  },

  user: (): TelegramUser | null => {
    try {
      return WebApp.initDataUnsafe?.user || null;
    } catch {
      return null;
    }
  },

  haptic: (type: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' = 'light') => {
    try {
      if (type === 'success' || type === 'warning' || type === 'error') {
        WebApp.HapticFeedback.notificationOccurred(type);
      } else {
        WebApp.HapticFeedback.impactOccurred(type);
      }
    } catch {}
  },

  mainButton: {
    show: (text: string, onClick: () => void) => {
      try {
        WebApp.MainButton.setText(text);
        WebApp.MainButton.onClick(onClick);
        WebApp.MainButton.show();
      } catch {}
    },
    hide: () => {
      try { WebApp.MainButton.hide(); } catch {}
    }
  },

  close: () => {
    try { WebApp.close(); } catch {}
  },

  getTheme: () => {
    try {
      return WebApp.colorScheme; // 'light' | 'dark'
    } catch { return 'dark'; }
  },

  version: () => {
    try { return WebApp.version; } catch { return '7.0'; }
  }
};

export default telegram;
