import { useRealtime } from '../../contexts/RealtimeContext';
import { useLanguage } from '../../lib/i18n';
import { Radio, RefreshCw, Settings2 } from 'lucide-react';
import { useState } from 'react';

export function LiveParserBanner() {
  const { isLiveConnected, connectionLatency, updateCount, lastUpdate, source, parserTried, refresh, isRefreshing } = useRealtime();
  const { language } = useLanguage();
  const [showConfig, setShowConfig] = useState(false);

  const sourceLabel =
    source.includes('fonbet') || source.includes('pari') ? (language==='ru' ? 'Прямой парсинг БК' : 'Direct bookmaker feed') :
    source.includes('calendar') ? (language==='ru' ? 'Календарный live-движок (ATP/WTA 2026)' : 'Calendar live engine (ATP/WTA 2026)') :
    source.includes('oddsapi') ? 'TheOddsAPI' :
    (language==='ru' ? 'Квантовый симулятор РФ рынка' : 'Quant RU market simulator');

  return (
    <div className="mb-6">
      <div className="bg-gradient-to-r from-[#0f1a2b] via-[#12203a] to-[#0f1a2b] border border-blue-500/25 rounded-2xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 backdrop-blur shadow-lg shadow-blue-900/10">
        <div className="flex items-center gap-3">
          <div className={`w-2.5 h-2.5 rounded-full ${isLiveConnected ? 'bg-green-500 animate-pulse shadow shadow-green-500/50' : 'bg-amber-500'}`} />
          <div className="text-sm">
            <div className="font-bold flex items-center gap-2">
              <Radio className="w-4 h-4 text-blue-400" />
              {language==='ru' ? 'Парсинг линий РФ БК в реальном времени' : 'Live Russian Bookmakers Parsing'}
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/20 font-mono">{source}</span>
            </div>
            <div className="text-[11px] text-muted-foreground font-mono">
              {sourceLabel} • {new Date(lastUpdate).toLocaleTimeString()} • {language==='ru'?'обновлений':'updates'}: {updateCount} • {connectionLatency}ms
            </div>
            {parserTried.length > 0 && (
              <div className="text-[10px] text-muted-foreground font-mono mt-0.5">
                tried: {parserTried.join(' → ')}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1.5 text-[11px] font-mono mr-2">
            <span className="px-2 py-1 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-bold">PARI</span>
            <span className="px-2 py-1 rounded bg-red-500/10 text-red-300 border border-red-500/20 font-bold">FONBET</span>
            <span className="px-2 py-1 rounded bg-yellow-500/10 text-yellow-300 border border-yellow-500/20 font-bold">BETBOOM</span>
            <span className="px-2 py-1 rounded bg-orange-500/10 text-orange-300 border border-orange-500/20 font-bold">WINLINE</span>
          </div>
          <button
            onClick={refresh}
            disabled={isRefreshing}
            className="text-xs px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-1.5 disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            {language==='ru' ? 'Обновить' : 'Refresh'}
          </button>
          <button
            onClick={()=>setShowConfig(!showConfig)}
            className="text-xs px-3 py-1.5 rounded-lg bg-secondary border border-white/10 hover:bg-secondary/80 flex items-center gap-1"
          >
            <Settings2 className="w-3.5 h-3.5" />
            API
          </button>
        </div>
      </div>

      {showConfig && <ParserConfig onClose={()=>setShowConfig(false)} />}
    </div>
  );
}

function ParserConfig({ onClose }: { onClose: ()=>void }) {
  const { language } = useLanguage();
  const [oddsKey, setOddsKey] = useState(localStorage.getItem('np_odds_api_key') || '');
  const [allsportsKey, setAllsportsKey] = useState(localStorage.getItem('np_allsports_key') || '');
  const [rapidKey, setRapidKey] = useState(localStorage.getItem('np_rapid_key') || '');

  const save = () => {
    localStorage.setItem('np_odds_api_key', oddsKey);
    localStorage.setItem('np_allsports_key', allsportsKey);
    localStorage.setItem('np_rapid_key', rapidKey);
    alert(language==='ru' ? 'Ключи сохранены локально. Для серверного парсинга добавьте их в Vercel ENV: ODDS_API_KEY, ALLSPORTS_API_KEY, RAPIDAPI_KEY и redeploy.' : 'Keys saved locally. For server parsing add them to Vercel ENV and redeploy.');
    onClose();
  };

  return (
    <div className="mt-3 bg-card/90 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-3">
        <div className="font-bold">
          {language==='ru' ? 'Подключение реальных источников котировок' : 'Connect real odds providers'}
        </div>
        <button onClick={onClose} className="text-xs text-muted-foreground hover:text-foreground">✕</button>
      </div>
      <div className="grid md:grid-cols-3 gap-4 text-xs">
        <div>
          <label className="block text-muted-foreground mb-1 font-semibold">TheOddsAPI.com — API Key</label>
          <input value={oddsKey} onChange={e=>setOddsKey(e.target.value)} placeholder="live_xxx..." className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 font-mono text-xs" />
          <div className="text-[10px] text-muted-foreground mt-1">500 req/mo free • tennis_atp / tennis_wta</div>
        </div>
        <div>
          <label className="block text-muted-foreground mb-1 font-semibold">AllSportsAPI — API Key</label>
          <input value={allsportsKey} onChange={e=>setAllsportsKey(e.target.value)} placeholder="xxxxxxxxxxxxxxxx" className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 font-mono text-xs" />
          <div className="text-[10px] text-muted-foreground mt-1">LiveOdds + Livescore tennis</div>
        </div>
        <div>
          <label className="block text-muted-foreground mb-1 font-semibold">RapidAPI — Tennis Live API Key</label>
          <input value={rapidKey} onChange={e=>setRapidKey(e.target.value)} placeholder="xxxxxxxx" className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 font-mono text-xs" />
          <div className="text-[10px] text-muted-foreground mt-1">tennis-live-api.p.rapidapi.com</div>
        </div>
      </div>
      <div className="mt-4 text-[11px] text-muted-foreground leading-relaxed">
        {language==='ru'
          ? 'Сейчас используется календарный live-движок ATP/WTA 2025-26: матчи генерируются по реальному календарю текущего месяца, коэффициенты 4 российских БК (PARI/FONBET/BETBOOM/WINLINE) обновляются каждые 2.5 сек. Для подключения реальных котировок: 1) получите бесплатный ключ на the-odds-api.com, 2) добавьте в Vercel → Settings → Environment Variables: ODDS_API_KEY=ваш_ключ, 3) redeploy. Парсер также поддерживает FONBET (clientsapi), PARI (pari.ru/api), AllSportsAPI и RapidAPI.'
          : 'Currently using ATP/WTA 2025-26 calendar live engine: matches are generated from the real monthly tour calendar, 4 Russian bookmakers odds update every 2.5s. To enable real feeds: add ODDS_API_KEY / ALLSPORTS_API_KEY / RAPIDAPI_KEY in Vercel ENV and redeploy.'}
      </div>
      <div className="mt-3 flex gap-2">
        <button onClick={save} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold">
          {language==='ru' ? 'Сохранить локально' : 'Save locally'}
        </button>
        <a href="https://the-odds-api.com" target="_blank" className="px-4 py-2 rounded-lg bg-secondary border border-white/10 text-xs">
          the-odds-api.com →
        </a>
        <a href="https://allsportsapi.com" target="_blank" className="px-4 py-2 rounded-lg bg-secondary border border-white/10 text-xs">
          allsportsapi.com →
        </a>
      </div>
    </div>
  );
}
