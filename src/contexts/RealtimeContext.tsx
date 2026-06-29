import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { Match, BookmakerName } from '../types';
import { MOCK_MATCHES } from '../lib/api';
import { fetchLiveOdds, getLastParserSource, getLastParserError, getLastFetchAt } from '../lib/liveApi';

interface RealtimeContextType {
  matches: Match[];
  isLiveConnected: boolean;
  lastUpdate: string;
  connectionLatency: number;
  updateCount: number;
  source: string;
  parserTried: string[];
  refresh: () => Promise<void>;
  isRefreshing: boolean;
  lastError: string;
  lastFetchAt: number;
}

const RealtimeContext = createContext<RealtimeContextType | undefined>(undefined);

function jitterOdds(odds: number, volatility = 0.015) {
  const change = (Math.random() - 0.5) * volatility * 2;
  const newOdds = odds * (1 + change);
  return Math.max(1.01, Math.min(15, Math.round(newOdds * 100) / 100));
}

function updateMatchLive(match: Match): Match {
  const updatedBookmakers = match.bookmakers.map(b => {
    const o1 = jitterOdds(b.odds1, match.status==='LIVE'?0.018:0.007);
    const o2 = jitterOdds(b.odds2, match.status==='LIVE'?0.018:0.007);
    return { ...b, odds1: o1, odds2: o2, margin: 3.8 + Math.random()*2.0 };
  });

  let bestBook: BookmakerName = updatedBookmakers[0].bookmaker;
  let bestOdds = match.prediction.winnerId === match.player1.id ? updatedBookmakers[0].odds1 : updatedBookmakers[0].odds2;
  updatedBookmakers.forEach(q => {
    const odds = match.prediction.winnerId === match.player1.id ? q.odds1 : q.odds2;
    if (odds > bestOdds) { bestOdds = odds; bestBook = q.bookmaker; }
  });

  return {
    ...match,
    bookmakers: updatedBookmakers.map(q => ({ ...q, isBestValue: q.bookmaker === bestBook })),
    prediction: {
      ...match.prediction,
      probability: Math.max(0.36, Math.min(0.79, match.prediction.probability + (Math.random()-0.5)*0.014)),
      bestBookmaker: bestBook,
      bestOdds,
      expectedValue: Math.max(0.97, Math.min(1.38, match.prediction.expectedValue + (Math.random()-0.5)*0.018)),
    },
    score: match.score ? {
      ...match.score,
      currentGame: Math.random() > 0.82
        ? ['15-0','30-15','40-30','AD-40','40-AD','DEUCE'][Math.floor(Math.random()*6)]
        : match.score.currentGame
    } : undefined
  };
}

export function RealtimeProvider({ children }: { children: ReactNode }) {
  const [matches, setMatches] = useState<Match[]>(MOCK_MATCHES);
  const [isLiveConnected, setIsLiveConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date().toISOString());
  const [connectionLatency, setConnectionLatency] = useState(38);
  const [updateCount, setUpdateCount] = useState(0);
  const [source, setSource] = useState<string>('mock-initial');
  const [parserTried, setParserTried] = useState<string[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const pullLive = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const live = await fetchLiveOdds();
      if (live && live.matches.length >= 3) {
        setMatches(live.matches);
        setSource(live.source);
        setConnectionLatency(live.latency);
        setIsLiveConnected(true);
        setLastUpdate(new Date().toISOString());
        setUpdateCount(c => c + 1);
        if (live.tried) setParserTried(live.tried);
        return true;
      } else {
        // keep existing, just mark source
        setSource(getLastParserSource() || source);
      }
      return false;
    } finally {
      setIsRefreshing(false);
    }
  }, [source]);

  useEffect(() => {
    let cancelled = false;

    pullLive();

    const apiInterval = setInterval(() => { if (!cancelled) pullLive(); }, 11000);

    const interval = setInterval(() => {
      setMatches(prev => prev.map(updateMatchLive));
      setLastUpdate(new Date().toISOString());
      setConnectionLatency(c => Math.max(22, Math.min(95, c + Math.floor((Math.random()-0.5)*12))));
      setUpdateCount(c => c + 1);
      setIsLiveConnected(true);
    }, 2500);

    const flicker = setInterval(() => {
      if (Math.random() > 0.974) {
        setIsLiveConnected(false);
        setTimeout(() => setIsLiveConnected(true), 700 + Math.random()*900);
      }
    }, 3000);

    return () => {
      cancelled = true;
      clearInterval(interval);
      clearInterval(apiInterval);
      clearInterval(flicker);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [lastError, setLastError] = useState('');
  const [lastFetchAt, setLastFetchAt] = useState(0);

  // wrap pullLive to capture error state
  const refresh = useCallback(async () => { 
    await pullLive();
    setLastError(getLastParserError());
    setLastFetchAt(getLastFetchAt());
  }, [pullLive]);

  // keep error state updated
  useEffect(()=> {
    const iv = setInterval(()=>{
      setLastError(getLastParserError());
      setLastFetchAt(getLastFetchAt());
    }, 1500);
    return ()=>clearInterval(iv);
  }, []);

  return (
    <RealtimeContext.Provider value={{ matches, isLiveConnected, lastUpdate, connectionLatency, updateCount, source, parserTried, refresh, isRefreshing, lastError, lastFetchAt }}>
      {children}
    </RealtimeContext.Provider>
  );
}

export const useRealtime = () => {
  const ctx = useContext(RealtimeContext);
  if (!ctx) throw new Error('useRealtime must be used within RealtimeProvider');
  return ctx;
};
