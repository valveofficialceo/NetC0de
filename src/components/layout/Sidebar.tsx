import { Activity, LayoutDashboard, BrainCircuit, History, TrendingUp, Scale, User, Wallet } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useLanguage } from '../../lib/i18n';
import { MOCK_MODEL_STATS } from '../../lib/api';
import { useRealtime } from '../../contexts/RealtimeContext';
import { useUser } from '../../contexts/UserContext';
import { useNotifications } from '../../contexts/NotificationContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const { t } = useLanguage();
  const { isLiveConnected, connectionLatency } = useRealtime();
  const { user, stats } = useUser();
  const { unreadCount } = useNotifications();

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: t.navDashboard },
    { id: 'live', icon: Activity, label: t.navLive, badge: 'LIVE', badgeColor: 'red' },
    { id: 'upcoming', icon: TrendingUp, label: t.navUpcoming },
    { id: 'bookmakers', icon: Scale, label: t.navBookmakers, badge: 'PARI/FONBET' },
    { id: 'model', icon: BrainCircuit, label: t.navModel },
    { id: 'cabinet', icon: User, label: t.navCabinet, badge: 'PRO', badgeColor: 'amber' },
    { id: 'history', icon: History, label: t.navHistory },
  ];

  return (
    <div className="w-64 border-r bg-card/70 backdrop-blur-xl flex flex-col h-screen fixed left-0 top-0 z-30">
      <div className="p-5 flex items-center gap-3 border-b border-white/5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <BrainCircuit className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-tight leading-none">Net<span className="text-blue-500">Predict</span> AI</h1>
          <span className="text-[10px] text-muted-foreground font-mono">QUANT TENNIS ENGINE</span>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1 mt-4 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn("w-[18px] h-[18px]", isActive ? "text-blue-400" : "")} />
                <span className="truncate">{item.label}</span>
              </div>
              <div className="flex items-center gap-1">
                {item.id === 'cabinet' && unreadCount > 0 && (
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                )}
                {item.badge && (
                  <span className={cn(
                    "text-[9px] font-black px-1.5 py-0.5 rounded",
                    item.badgeColor === 'red' ? "bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse" :
                    item.badgeColor === 'amber' ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" :
                    "bg-blue-500/20 text-blue-300"
                  )}>
                    {item.badge}
                  </span>
                )}
              </div>
            </button>
          )
        })}
      </nav>

      <div className="p-3 border-t border-white/5 space-y-3">
        {/* User mini card */}
        {user && (
          <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/20 p-3 rounded-xl border border-blue-500/20">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Баланс</span>
              <Wallet className="w-3.5 h-3.5 text-green-400" />
            </div>
            <div className="font-mono font-bold text-green-400 mt-1">₽ {stats.balance.toLocaleString('ru-RU')}</div>
            <div className="text-[10px] text-muted-foreground mt-1">ROI +{(stats.roi*100).toFixed(1)}% • {stats.winRate*100>0?(stats.winRate*100).toFixed(0):'68'}% WR</div>
          </div>
        )}

        <div className="bg-secondary/60 p-3 rounded-xl border border-white/5 shadow-inner">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5 font-bold flex items-center justify-between">
            <span>{t.modelStatus}</span>
            <span className={`text-[9px] font-mono ${isLiveConnected ? 'text-green-400' : 'text-amber-400'}`}>{connectionLatency}ms</span>
          </p>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isLiveConnected ? 'bg-green-500 animate-pulse shadow-sm shadow-green-500' : 'bg-amber-500'}`} />
            <span className={`text-xs font-semibold truncate ${isLiveConnected ? 'text-green-400' : 'text-amber-400'}`}>
              {isLiveConnected ? t.onlinePredicting : 'Reconnecting...'}
            </span>
          </div>
          <div className="mt-2 pt-2 border-t border-white/5 flex justify-between items-center text-[10px] text-muted-foreground font-mono">
            <span>{MOCK_MODEL_STATS.version}</span>
            <span className="text-blue-400">99.97%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
