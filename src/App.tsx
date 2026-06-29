import { useEffect, useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './components/dashboard/Dashboard';
import { MatchList } from './components/matches/MatchList';
import { BookmakersMatrix } from './components/bookmakers/BookmakersMatrix';
import { ModelMetrics } from './components/models/ModelMetrics';
import { UserCabinet } from './components/cabinet/UserCabinet';
import { LanguageProvider, useLanguage } from './lib/i18n';
import { Database, LayoutDashboard, Activity, Scale, BrainCircuit, User as UserIcon } from 'lucide-react';
import { TelegramShell } from './components/telegram/TelegramShell';
import telegram from './lib/telegram';
import { RealtimeProvider, useRealtime } from './contexts/RealtimeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { UserProvider } from './contexts/UserContext';
import { ToastContainer, useToasts } from './components/ui/Toast';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const { t, language } = useLanguage();
  const { matches, isLiveConnected, lastUpdate, source, updateCount } = useRealtime();
  const { toasts, push, close } = useToasts();

  // show toast on source change / live update
  useEffect(() => {
    if (updateCount > 1 && updateCount % 5 === 0) {
      push({
        title: language==='ru' ? 'Лента котировок обновлена' : 'Odds feed updated',
        message: `${matches.filter(m=>m.status==='LIVE').length} LIVE • ${source} • ${new Date().toLocaleTimeString()}`,
        type: 'info'
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateCount]);

  // initial welcome toast
  useEffect(() => {
    setTimeout(()=> push({
      title: language==='ru' ? 'NetPredict AI подключен' : 'NetPredict AI connected',
      message: language==='ru' ? 'Реальный парсинг: TheOddsAPI • PARI • FONBET' : 'Live parsing: TheOddsAPI • PARI • FONBET',
      type: 'success'
    }), 900);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Telegram MainButton integration
  useEffect(() => {
    if (telegram.isAvailable()) {
      if (activeTab === 'upcoming' || activeTab === 'live') {
        telegram.mainButton.show(
          language === 'ru' ? '💎 Показать валуи' : '💎 Show Value Bets',
          () => {
            telegram.haptic('success');
            setActiveTab('bookmakers');
          }
        );
      } else {
        telegram.mainButton.hide();
      }
    }
    return () => telegram.mainButton.hide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, language]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'live':
        return (
          <MatchList 
            matches={matches.filter(m => m.status === 'LIVE')} 
            title={t.liveTitle} 
            searchTerm={searchTerm} 
          />
        );
      case 'upcoming':
        return (
          <MatchList 
            matches={matches.filter(m => m.status === 'UPCOMING')} 
            title={t.upcomingTitle} 
            searchTerm={searchTerm} 
          />
        );
      case 'bookmakers':
        return <BookmakersMatrix matches={matches} searchTerm={searchTerm} />;
      case 'model':
        return <ModelMetrics />;
      case 'cabinet':
        return <UserCabinet />;
      case 'history':
        return (
          <div className="flex flex-col items-center justify-center h-[65vh] text-center space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-secondary border border-white/10 flex items-center justify-center shadow-xl shadow-blue-500/10">
              <Database className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{t.historyTitle}</h3>
              <p className="text-muted-foreground mt-3 leading-relaxed text-sm">{t.historyDesc}</p>
            </div>
            <div className="pt-2 flex flex-col gap-2 items-center">
              <span className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs font-bold">
                wss://feed.netpredict.ru/v10/history
              </span>
              <span className="text-[11px] text-muted-foreground">Live updates: {isLiveConnected ? 'connected' : 'reconnecting'} • {new Date(lastUpdate).toLocaleTimeString()}</span>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  const mobileTabs = [
    { id: 'dashboard', icon: LayoutDashboard, label: language==='ru'?'Главная':'Home' },
    { id: 'live', icon: Activity, label: 'Live' },
    { id: 'bookmakers', icon: Scale, label: 'БК РФ' },
    { id: 'cabinet', icon: UserIcon, label: language==='ru'?'Кабинет':'Me' },
    { id: 'model', icon: BrainCircuit, label: 'AI' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <TelegramShell />
        <div className="hidden md:block">
          <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>
        {/* Mobile top search */}
        <div className="md:hidden p-3 border-b border-white/5 bg-card/30">
          <div className="flex items-center gap-2 mb-2 text-[11px] font-mono">
            <span className={`w-2 h-2 rounded-full ${isLiveConnected ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`} />
            <span className={isLiveConnected ? 'text-green-400' : 'text-amber-400'}>
              {isLiveConnected ? (language==='ru'?'LIVE ЛЕНТА':'LIVE FEED') : 'RECONNECT'}
            </span>
            <span className="text-muted-foreground">• {new Date(lastUpdate).toLocaleTimeString()}</span>
          </div>
          <input
            value={searchTerm}
            onChange={e=>setSearchTerm(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-secondary/60 border border-white/10 rounded-xl px-4 py-2 text-sm"
          />
        </div>
        
        <main className="flex-1 p-4 md:p-8 overflow-auto relative pb-24 lg:pb-8">
          {/* Decorative background gradients */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/15 blur-[140px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/15 blur-[140px]" />
          </div>
          
          <div className="max-w-7xl mx-auto animate-in fade-in duration-300">
            {renderContent()}
          </div>
        </main>

        <ToastContainer toasts={toasts} onClose={close} />

        {/* Telegram / Mobile Bottom Nav */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0f141f]/95 backdrop-blur-xl border-t border-white/10">
          <div className="grid grid-cols-5">
            {mobileTabs.map(tab => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => { telegram.haptic('light'); setActiveTab(tab.id); }}
                  className={`py-3 flex flex-col items-center justify-center gap-1 text-[10px] font-bold transition-all ${
                    active ? 'text-blue-400' : 'text-muted-foreground'
                  }`}
                >
                  <Icon className={`w-[20px] h-[20px] ${active ? 'text-blue-400' : ''}`} />
                  {tab.label}
                  {active && <div className="w-1 h-1 bg-blue-400 rounded-full -mb-1" />}
                </button>
              );
            })}
          </div>
          <div className="h-[env(safe-area-inset-bottom)] bg-[#0f141f]" />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <UserProvider>
        <RealtimeProvider>
          <NotificationProvider>
            <AppContent />
          </NotificationProvider>
        </RealtimeProvider>
      </UserProvider>
    </LanguageProvider>
  );
}
