import { Bell, Search, UserCircle, X, CheckCheck, Wifi } from 'lucide-react';
import { Button } from '../ui/Button';
import { useLanguage } from '../../lib/i18n';
import { useNotifications } from '../../contexts/NotificationContext';
import { useRealtime } from '../../contexts/RealtimeContext';
import { useUser } from '../../contexts/UserContext';
import { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
}

export function Header({ searchTerm, onSearchChange }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const { notifications, unreadCount, markAsRead, markAllRead } = useNotifications();
  const { isLiveConnected, connectionLatency, updateCount, lastUpdate } = useRealtime();
  const { user, stats } = useUser();
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const timeAgo = (iso: string) => {
    const sec = Math.floor((Date.now() - new Date(iso).getTime())/1000);
    if (sec < 60) return `${sec}s`;
    if (sec < 3600) return `${Math.floor(sec/60)}m`;
    return `${Math.floor(sec/3600)}h`;
  };

  return (
    <header className="h-16 border-b bg-background/90 backdrop-blur-xl flex items-center justify-between px-5 md:px-8 sticky top-0 z-20">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-[420px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.searchPlaceholder} 
            className="w-full bg-secondary/50 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-foreground"
          />
        </div>

        {/* Live feed status */}
        <div className="hidden xl:flex items-center gap-3 pl-4 border-l border-white/10">
          <div className={`w-2 h-2 rounded-full ${isLiveConnected ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`} />
          <div className="text-[11px] leading-tight">
            <div className="font-mono font-bold text-green-400 flex items-center gap-1">
              <Wifi className="w-3 h-3" />
              LIVE FEED
            </div>
            <div className="text-muted-foreground font-mono">{connectionLatency}ms • upd #{updateCount}</div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Language Switcher */}
        <div className="hidden sm:flex items-center bg-secondary/80 rounded-full p-1 border border-white/10">
          <button
            onClick={() => setLanguage('ru')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              language === 'ru'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span>🇷🇺</span> РУС
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              language === 'en'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span>🇬🇧</span> ENG
          </button>
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <Button variant="ghost" size="icon" className="relative" onClick={()=>setNotifOpen(!notifOpen)}>
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <>
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border border-background animate-pulse"></span>
                <span className="absolute -top-1 -right-1 text-[9px] font-black bg-red-500 text-white rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              </>
            )}
          </Button>

          {notifOpen && (
            <div className="absolute right-0 top-12 w-[390px] max-w-[92vw] bg-[#141c2d]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-bold">{t.notifications}</div>
                  <div className="text-[11px] text-muted-foreground font-mono">wss://feed.netpredict.ru • {new Date(lastUpdate).toLocaleTimeString()}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={markAllRead} className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1">
                    <CheckCheck className="w-3 h-3"/>{language==='ru'?'Прочитать все':'Read all'}
                  </button>
                  <button onClick={()=>setNotifOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4"/></button>
                </div>
              </div>
              <div className="max-h-[420px] overflow-y-auto">
                {notifications.length===0 ? (
                  <div className="p-8 text-center text-sm text-muted-foreground">{t.notificationsEmpty}</div>
                ) : notifications.map(n => (
                  <div key={n.id}
                    onClick={()=>markAsRead(n.id)}
                    className={`p-3 border-b border-white/5 cursor-pointer transition hover:bg-white/[0.03] ${!n.read ? 'bg-blue-500/[0.04]' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                        n.type==='value' ? 'bg-green-500' :
                        n.type==='live' ? 'bg-red-500 animate-pulse' :
                        n.type==='odds_move' ? 'bg-amber-500' :
                        n.type==='win' ? 'bg-emerald-500' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold truncate">{language==='ru'?n.titleRu:n.title}</span>
                          <span className="text-[10px] text-muted-foreground font-mono shrink-0">{timeAgo(n.time)}</span>
                        </div>
                        <div className="text-[11px] text-muted-foreground mt-1 leading-snug">{language==='ru'?n.messageRu:n.message}</div>
                        <div className="mt-1.5">
                          <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            n.priority==='high' ? 'bg-red-500/15 text-red-400' :
                            n.priority==='medium' ? 'bg-amber-500/15 text-amber-400' :
                            'bg-blue-500/15 text-blue-400'
                          }`}>
                            {n.type}
                          </span>
                          {!n.read && <span className="ml-2 text-[9px] text-blue-400">● new</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 text-center text-[11px] text-muted-foreground bg-black/20">
                Push-уведомления • Telegram Bot • WebSocket TLS
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 pl-3 border-l border-white/10">
          <div className="text-right hidden lg:block">
            <p className="text-sm font-semibold leading-none flex items-center gap-1.5">
              {user?.name || t.quantTeam}
              <span className="text-[9px] bg-amber-500 text-black font-black px-1.5 rounded">PRO</span>
            </p>
            <p className="text-[11px] text-green-400 font-mono mt-1">₽ {stats.balance.toLocaleString('ru-RU')}</p>
          </div>
          {user?.avatar ? (
            <img src={user.avatar} alt="u" className="w-9 h-9 rounded-xl ring-2 ring-blue-500/30 object-cover" />
          ) : (
            <UserCircle className="w-8 h-8 text-blue-400" />
          )}
        </div>
      </div>
    </header>
  );
}
