import { useState } from 'react';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Match, BookmakerName } from '../../types';
import { useLanguage } from '../../lib/i18n';
import { Scale, CheckCircle2, Sparkles } from 'lucide-react';
import { LiveParserBanner } from '../live/LiveParserBanner';
import { OddsFlash } from '../ui/OddsFlash';

interface BookmakersMatrixProps {
  matches: Match[];
  searchTerm: string;
}

export function BookmakersMatrix({ matches, searchTerm }: BookmakersMatrixProps) {
  const { t, language } = useLanguage();
  const [selectedBookmaker, setSelectedBookmaker] = useState<BookmakerName | 'ALL'>('ALL');

  const filteredMatches = matches.filter(match => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      match.player1.name.toLowerCase().includes(q) ||
      match.player1.nameRu.toLowerCase().includes(q) ||
      match.player2.name.toLowerCase().includes(q) ||
      match.player2.nameRu.toLowerCase().includes(q) ||
      match.tournament.toLowerCase().includes(q) ||
      match.tournamentRu.toLowerCase().includes(q)
    );
  });

  const getBookmakerColor = (bm: BookmakerName) => {
    switch (bm) {
      case 'PARI': return 'from-cyan-500 to-blue-600 border-cyan-500/30 text-cyan-400';
      case 'FONBET': return 'from-red-500 to-rose-600 border-red-500/30 text-red-400';
      case 'BETBOOM': return 'from-yellow-500 to-amber-600 border-yellow-500/30 text-yellow-400';
      case 'WINLINE': return 'from-orange-500 to-amber-500 border-orange-500/30 text-orange-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Scale className="w-8 h-8 text-blue-500" />
            {t.compareBookmakers}
          </h2>
          <p className="text-muted-foreground mt-1">
            {language === 'ru'
              ? 'Мониторинг линий российских легальных БК (PARI, FONBET, BETBOOM, WINLINE) в режиме реального времени'
              : 'Live odds matrix and margin analysis across official Russian betting companies'}
          </p>
        </div>

        {/* Bookmaker Filter Pills */}
        <div className="flex flex-wrap gap-2 bg-secondary/40 p-1.5 rounded-xl border border-white/5">
          <button
            onClick={() => setSelectedBookmaker('ALL')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedBookmaker === 'ALL'
                ? 'bg-blue-600 text-white shadow'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t.filterAll}
          </button>
          {(['PARI', 'FONBET', 'BETBOOM', 'WINLINE'] as BookmakerName[]).map((bm) => (
            <button
              key={bm}
              onClick={() => setSelectedBookmaker(bm)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedBookmaker === bm
                  ? 'bg-white/10 text-white border border-white/20 shadow'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {bm}
            </button>
          ))}
        </div>
      </div>

      <LiveParserBanner />

      <div className="grid gap-4">
        {filteredMatches.map((match) => {
          const p1Name = language === 'ru' ? match.player1.nameRu : match.player1.name;
          const p2Name = language === 'ru' ? match.player2.nameRu : match.player2.name;
          const tourName = language === 'ru' ? match.tournamentRu : match.tournament;

          const displayQuotes = selectedBookmaker === 'ALL'
            ? match.bookmakers
            : match.bookmakers.filter(b => b.bookmaker === selectedBookmaker);

          return (
            <Card key={match.id} className="bg-card/40 hover:bg-card/60 transition-colors border-white/5 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  
                  {/* Match Info */}
                  <div className="space-y-3 lg:w-1/3">
                    <div className="flex items-center gap-2">
                      <Badge variant={match.status === 'LIVE' ? 'destructive' : 'secondary'}>
                        {match.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-medium uppercase">{tourName}</span>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-base font-bold">
                        <span>1. {p1Name}</span>
                        <span className="text-xs font-mono text-muted-foreground">#{match.player1.rank}</span>
                      </div>
                      <div className="flex items-center justify-between text-base font-bold">
                        <span>2. {p2Name}</span>
                        <span className="text-xs font-mono text-muted-foreground">#{match.player2.rank}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{t.predictedWinner}:</span>
                      <span className="font-semibold text-blue-400">
                        {match.prediction.winnerId === match.player1.id ? p1Name : p2Name} 
                        {' '}({(match.prediction.probability * 100).toFixed(0)}%)
                      </span>
                    </div>
                  </div>

                  {/* Odds Matrix Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:w-2/3">
                    {displayQuotes.map((quote) => (
                      <div
                        key={quote.bookmaker}
                        className={`relative rounded-xl p-3 bg-secondary/30 border transition-all ${
                          quote.isBestValue 
                            ? 'border-green-500/40 bg-green-500/5 shadow-lg shadow-green-500/10' 
                            : 'border-white/5'
                        }`}
                      >
                        {quote.isBestValue && (
                          <div className="absolute -top-2 right-2 bg-green-500 text-black text-[9px] font-black px-1.5 py-0.5 rounded uppercase flex items-center gap-0.5">
                            <Sparkles className="w-2.5 h-2.5" />
                            BEST VALUE
                          </div>
                        )}

                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-xs font-black tracking-wider ${getBookmakerColor(quote.bookmaker).split(' ').pop()}`}>
                            {quote.bookmaker}
                          </span>
                          <span className="text-[10px] text-muted-foreground font-mono">
                            Маржа: {quote.margin}%
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div className={`p-2 rounded-lg text-center ${quote.odds1 === match.prediction.bestOdds && match.prediction.winnerId === match.player1.id ? 'bg-blue-600/30 border border-blue-500/40 text-blue-300' : 'bg-background/60'}`}>
                            <span className="block text-[10px] text-muted-foreground">П1</span>
                            <span className="font-mono font-bold text-sm"><OddsFlash value={quote.odds1} /></span>
                          </div>
                          <div className={`p-2 rounded-lg text-center ${quote.odds2 === match.prediction.bestOdds && match.prediction.winnerId === match.player2.id ? 'bg-blue-600/30 border border-blue-500/40 text-blue-300' : 'bg-background/60'}`}>
                            <span className="block text-[10px] text-muted-foreground">П2</span>
                            <span className="font-mono font-bold text-sm"><OddsFlash value={quote.odds2} /></span>
                          </div>
                        </div>

                        {quote.isBestValue && (
                          <div className="mt-2 text-[10px] text-green-400 flex items-center justify-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            {language === 'ru' ? 'Рекомендовано для ставки' : 'Recommended Bookmaker'}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
