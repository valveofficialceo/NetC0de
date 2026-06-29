import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import telegram from '../lib/telegram';

export interface AppNotification {
  id: string;
  type: 'value' | 'odds_move' | 'live' | 'system' | 'win';
  title: string;
  titleRu: string;
  message: string;
  messageRu: string;
  time: string;
  read: boolean;
  matchId?: string;
  priority: 'high' | 'medium' | 'low';
}

const initialNotifications: AppNotification[] = [
  {
    id: 'n1',
    type: 'value',
    title: 'Value Bet Alert: Medvedev vs Sinner',
    titleRu: 'Валуй: Медведев против Синнера',
    message: 'PARI offers 2.15, model fair odds 1.85. Edge +6.2%',
    messageRu: 'PARI дает 2.15, честный кэф модели 1.85. Перевес +6.2%',
    time: new Date(Date.now() - 120000).toISOString(),
    read: false,
    matchId: 'm1',
    priority: 'high'
  },
  {
    id: 'n2',
    type: 'odds_move',
    title: 'Odds Movement: Rublev',
    titleRu: 'Движение линии: Рублев',
    message: 'FONBET: 1.48 → 1.52 in 4 min. Sharp money detected.',
    messageRu: 'FONBET: 1.48 → 1.52 за 4 мин. Обнаружены умные деньги.',
    time: new Date(Date.now() - 240000).toISOString(),
    read: false,
    matchId: 'm2',
    priority: 'medium'
  },
  {
    id: 'n3',
    type: 'live',
    title: 'LIVE: Break Point Andreeva',
    titleRu: 'LIVE: Брейк-пойнт Андреева',
    message: 'Mirra Andreeva has break point vs Sabalenka, 30-40',
    messageRu: 'У Мирры Андреевой брейк-пойнт против Соболенко, 30-40',
    time: new Date(Date.now() - 45000).toISOString(),
    read: false,
    matchId: 'm3',
    priority: 'high'
  },
  {
    id: 'n4',
    type: 'win',
    title: 'Prediction WON ✓',
    titleRu: 'Прогноз ВЫИГРАЛ ✓',
    message: 'Kasatkina vs Rybakina: model pick correct. +14.3% ROI',
    messageRu: 'Касаткина vs Рыбакина: прогноз модели верный. +14.3% ROI',
    time: new Date(Date.now() - 900000).toISOString(),
    read: true,
    priority: 'medium'
  },
  {
    id: 'n5',
    type: 'system',
    title: 'Model recalibrated',
    titleRu: 'Модель перекалибрована',
    message: 'Surface speed data updated for indoor hard. Accuracy +1.2%',
    messageRu: 'Обновлены данные по скорости покрытия indoor hard. Точность +1.2%',
    time: new Date(Date.now() - 1800000).toISOString(),
    read: true,
    priority: 'low'
  }
];

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllRead: () => void;
  pushNotification: (n: Omit<AppNotification, 'id' | 'time' | 'read'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);

  const markAsRead = (id: string) => {
    setNotifications(ns => ns.map(n => n.id === id ? { ...n, read: true } : n));
  };
  const markAllRead = () => {
    setNotifications(ns => ns.map(n => ({ ...n, read: true })));
  };

  const pushNotification = (n: Omit<AppNotification, 'id' | 'time' | 'read'>) => {
    const nn: AppNotification = {
      ...n,
      id: 'n' + Date.now() + Math.random().toString(36).slice(2,6),
      time: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [nn, ...prev].slice(0, 50));
    // haptic + telegram
    try { telegram.haptic(n.priority === 'high' ? 'success' : 'light'); } catch {}
    // browser notification if allowed
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(nn.titleRu, { body: nn.messageRu, icon: '/favicon.ico' });
    }
  };

  // simulate live incoming notifications
  useEffect(() => {
    const templates: Omit<AppNotification, 'id' | 'time' | 'read'>[] = [
      {
        type: 'odds_move',
        title: 'Odds spike detected',
        titleRu: 'Скачок коэффициента',
        message: 'BETBOOM moved Kotov 2.30 → 2.42',
        messageRu: 'BETBOOM: Котов 2.30 → 2.42',
        priority: 'medium',
        matchId: 'm8'
      },
      {
        type: 'value',
        title: 'New Value Bet',
        titleRu: 'Новый валуй',
        message: 'Shnaider vs Zheng: EV 1.14, FONBET 2.60',
        messageRu: 'Шнайдер vs Чжэн: EV 1.14, FONBET 2.60',
        priority: 'high',
        matchId: 'm9'
      },
      {
        type: 'live',
        title: 'LIVE momentum shift',
        titleRu: 'LIVE смена моментума',
        message: 'Alcaraz win prob: 63% → 71% after break',
        messageRu: 'Вероятность Алькараса: 63% → 71% после брейка',
        priority: 'high',
        matchId: 'm4'
      }
    ];

    const interval = setInterval(() => {
      if (Math.random() > 0.55) {
        const t = templates[Math.floor(Math.random()*templates.length)];
        pushNotification(t);
      }
    }, 17000); // every ~17s new alert

    // ask browser notification permission once
    if ('Notification' in window && Notification.permission === 'default') {
      setTimeout(() => Notification.requestPermission().catch(()=>{}), 6000);
    }

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllRead, pushNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider');
  return ctx;
};
