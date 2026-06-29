import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import telegram, { TelegramUser } from '../lib/telegram';

export interface UserBet {
  id: string;
  match: string;
  matchRu: string;
  pick: string;
  odds: number;
  stake: number;
  bookmaker: 'PARI' | 'FONBET' | 'BETBOOM' | 'WINLINE';
  status: 'pending' | 'won' | 'lost' | 'cashout';
  profit?: number;
  date: string;
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatar: string;
  tier: 'QUANT PRO' | 'ELITE' | 'STARTER';
  joinedAt: string;
  telegramId?: number;
}

export interface UserStats {
  balance: number;
  totalProfit: number;
  roi: number;
  winRate: number;
  totalBets: number;
  wonBets: number;
  avgOdds: number;
  maxWinStreak: number;
  followedTipsters: number;
}

interface UserContextType {
  user: UserProfile | null;
  stats: UserStats;
  bets: UserBet[];
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  updateBalance: (delta: number) => void;
}

const mockBets: UserBet[] = [
  { id: 'b1', match: 'Medvedev vs Sinner', matchRu: 'Медведев vs Синнер', pick: 'Medvedev', odds: 2.15, stake: 5000, bookmaker: 'PARI', status: 'pending', date: new Date().toISOString() },
  { id: 'b2', match: 'Rublev vs Khachanov', matchRu: 'Рублев vs Хачанов', pick: 'Rublev', odds: 1.48, stake: 12000, bookmaker: 'FONBET', status: 'won', profit: 5760, date: new Date(Date.now()-86400000).toISOString() },
  { id: 'b3', match: 'Andreeva M. vs Sabalenka', matchRu: 'Андреева М. vs Соболенко', pick: 'Andreeva', odds: 3.35, stake: 2000, bookmaker: 'BETBOOM', status: 'pending', date: new Date().toISOString() },
  { id: 'b4', match: 'Alcaraz vs Zverev', matchRu: 'Алькарас vs Зверев', pick: 'Alcaraz', odds: 1.68, stake: 8000, bookmaker: 'PARI', status: 'won', profit: 5440, date: new Date(Date.now()-172800000).toISOString() },
  { id: 'b5', match: 'Kasatkina vs Rybakina', matchRu: 'Касаткина vs Рыбакина', pick: 'Kasatkina', odds: 2.95, stake: 3500, bookmaker: 'FONBET', status: 'won', profit: 6825, date: new Date(Date.now()-259200000).toISOString() },
  { id: 'b6', match: 'Djokovic vs Tsitsipas', matchRu: 'Джокович vs Циципас', pick: 'Djokovic', odds: 1.35, stake: 15000, bookmaker: 'BETBOOM', status: 'lost', profit: -15000, date: new Date(Date.now()-345600000).toISOString() },
];

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // auto-login for demo
  const [tgUser, setTgUser] = useState<TelegramUser | null>(null);
  const [stats, setStats] = useState<UserStats>({
    balance: 347850,
    totalProfit: 128420,
    roi: 0.187,
    winRate: 0.684,
    totalBets: 312,
    wonBets: 213,
    avgOdds: 1.92,
    maxWinStreak: 11,
    followedTipsters: 3,
  });
  const [bets] = useState<UserBet[]>(mockBets);

  useEffect(() => {
    const u = telegram.user();
    if (u) setTgUser(u);
    // simulate balance ticking up slowly (live profit)
    const iv = setInterval(() => {
      setStats(s => ({ ...s, balance: s.balance + Math.floor(Math.random()*17) }));
    }, 4200);
    return () => clearInterval(iv);
  }, []);

  const user: UserProfile | null = isAuthenticated ? {
    id: tgUser ? String(tgUser.id) : 'quant_1147',
    name: tgUser ? `${tgUser.first_name} ${tgUser.last_name || ''}`.trim() : 'Алексей Квантов',
    username: tgUser?.username ? '@' + tgUser.username : '@quant_alpha',
    avatar: tgUser?.photo_url || '',
    tier: 'QUANT PRO',
    joinedAt: '2019-03-14',
    telegramId: tgUser?.id,
  } : null;

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);
  const updateBalance = (delta: number) => setStats(s => ({ ...s, balance: s.balance + delta, totalProfit: s.totalProfit + delta }));

  return (
    <UserContext.Provider value={{ user, stats, bets, isAuthenticated, login, logout, updateBalance }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
};
