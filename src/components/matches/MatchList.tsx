import { useState } from 'react';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Progress } from '../ui/Progress';
import { Match, BookmakerName } from '../../types';
import { Trophy, Activity, TrendingUp, Sparkles } from 'lucide-react';
import { useLanguage } from '../../lib/i18n';
import { LiveParserBanner } from '../live/LiveParserBanner';
import { OddsFlash } from '../ui/OddsFlash';

interface MatchListProps {
  matches: Match[];
  title: string;
  searchTerm: string;
}

export function MatchList({ matches, title, searchTerm }: MatchListProps) {
  const { t, language } = useLanguage();
  const [selectedBookmaker, setSelectedBookmaker] = useState<BookmakerName | 'ALL'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredMatches = matches.filter(match => {
    // Search query filter
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const mMatch = 
        match.player1.name.toLowerCase().includes(q) ||
        match.player1.nameRu.toLowerCase().includes(q) ||
        match.player2.name.toLowerCase().includes(q) ||
        match.player2.nameRu.toLowerCase().includes(q) ||
        match.tournament.toLowerCase().includes(q) ||
        match.tournamentRu.toLowerCase().includes(q);
      if (!mMatch) return false;
    }
    // Category filter
    if (selectedCategory !== 'ALL' && match.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  const categories = ['ALL', 'Grand Slam', 'ATP 1000', 'ATP 500', 'WTA 1000', 'WTA 500', 'Challenger'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground mt-1">
            {language === 'ru' ? `Показано матчей: ${filteredMatches.length}` : `Displaying ${filteredMatches.length} matches`}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          {/* Category Selector */}
          <div className="flex items-center gap-1.5 bg-secondary/50 p-1 rounded-xl border border-white/5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat 
                    ? 'bg-blue-600 text-white shadow' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat === 'ALL' ? t.filterAll : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <LiveParserBanner />

      {/* Bookmaker quick filter */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground overflow-x-auto pb-1">
        <span className="font-semibold text-foreground shrink-0">{t.filterBookmaker}</span>
        {(['ALL', 'PARI', 'FONBET', 'BETBOOM', 'WINLINE'] as (BookmakerName | 'ALL')[]).map((bm) => (
          <button
            key={bm}
            onClick={() => setSelectedBookmaker(bm)}
            className={`px-3 py-1 rounded-full font-mono text-xs transition-all border shrink-0 ${
              selectedBookmaker === bm
                ? 'border-blue-500 bg-blue-500/10 text-blue-400 font-bold'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            {bm === 'ALL' ? (language === 'ru' ? 'Все БК' : 'All Bookmakers') : bm}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredMatches.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-card/30 border border-white/5">
            <p className="text-muted-foreground">{language === 'ru' ? 'Матчи по заданным фильтрам не найдены' : 'No matches found matching criteria'}</p>
          </div>
        ) : filteredMatches.map((match) => {
          const p1Name = language === 'ru' ? match.player1.nameRu : match.player1.name;
          const p2Name = language === 'ru' ? match.player2.nameRu : match.player2.name;
          const tourName = language === 'ru' ? match.tournamentRu : match.tournament;

          // Find specific or best quote
          const activeQuotes = selectedBookmaker === 'ALL'
            ? match.bookmakers
            : match.bookmakers.filter(b => b.bookmaker === selectedBookmaker);

          return (
            <Card key={match.id} className="bg-card/40 hover:bg-card/60 transition-colors border-white/5 overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col xl:flex-row">
                  
                  {/* Match Info Side */}
                  <div className="flex-1 p-6 border-b xl:border-b-0 xl:border-r border-white/5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Badge variant={match.status === 'LIVE' ? 'destructive' : 'secondary'} className="animate-in fade-in">
                          {match.status === 'LIVE' ? (
                            <span className="flex items-center gap-1"><Activity className="w-3 h-3 animate-pulse" /> LIVE</span>
                          ) : match.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{tourName} • {match.surface}</span>
                      </div>
                      {match.score && (
                        <div className="flex items-center gap-3 font-mono font-bold text-sm bg-secondary/60 px-3 py-1 rounded-lg border border-white/5">
                          <span className="text-blue-400">{match.score.sets1.join(' ')}</span>
                          <span className="text-muted-foreground">:</span>
                          <span className="text-indigo-400">{match.score.sets2.join(' ')}</span>
                          {match.score.currentGame && <span className="text-yellow-400 ml-2 text-xs">({match.score.currentGame})</span>}
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <PlayerRow player={match.player1} nameDisplay={p1Name} isWinner={match.prediction.winnerId === match.player1.id} />
                      <PlayerRow player={match.player2} nameDisplay={p2Name} isWinner={match.prediction.winnerId === match.player2.id} />
                    </div>

                    {/* Bookmaker strip */}
                    <div className="mt-6 pt-4 border-t border-white/5">
                      <p className="text-[11px] font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-yellow-400" />
                        {t.bookmakerQuotes}
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {activeQuotes.map((quote) => (
                          <div key={quote.bookmaker} className={`p-2 rounded-lg border text-xs flex items-center justify-between ${quote.isBestValue ? 'bg-green-500/10 border-green-500/30 text-green-300' : 'bg-background/40 border-white/5'}`}>
                            <span className="font-black font-mono tracking-wide">{quote.bookmaker}</span>
                            <div className="font-mono flex gap-2">
                              <OddsFlash value={quote.odds1} />
                              <span className="text-muted-foreground">/</span>
                              <OddsFlash value={quote.odds2} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Prediction Side */}
                  <div className="w-full xl:w-[380px] bg-secondary/20 p-6 flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-yellow-500" />
                        {t.predictedWinner}
                      </span>
                      <Badge variant="outline" className={
                        match.prediction.confidence === 'HIGH' ? 'text-green-400 border-green-400/20 bg-green-400/10' :
                        match.prediction.confidence === 'MEDIUM' ? 'text-yellow-400 border-yellow-400/20 bg-yellow-400/10' :
                        'text-red-400 border-red-400/20 bg-red-400/10'
                      }>
                        {match.prediction.confidence === 'HIGH' ? t.confidenceHigh :
                         match.prediction.confidence === 'MEDIUM' ? t.confidenceMed : t.confidenceLow}
                      </Badge>
                    </div>
                    
                    <div className="text-xl font-bold mb-4">
                      {match.prediction.winnerId === match.player1.id ? p1Name : p2Name}
                    </div>

                    <div className="space-y-1 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{t.winProbability}</span>
                        <span className="font-mono text-blue-400 font-bold">{(match.prediction.probability * 100).toFixed(0)}%</span>
                      </div>
                      <Progress value={match.prediction.probability * 100} indicatorClassName="bg-blue-500" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                      <div>
                        <span className="text-xs text-muted-foreground block mb-1">{t.suggestedOdds}</span>
                        <span className="font-mono text-base font-semibold">{match.prediction.suggestedOdds.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground block mb-1">
                          {t.bestOddsAt} <strong className="text-yellow-400">{match.prediction.bestBookmaker}</strong>
                        </span>
                        <span className="font-mono text-base font-bold text-green-400">{match.prediction.bestOdds.toFixed(2)}</span>
                      </div>
                    </div>

                    {match.prediction.expectedValue > 1 && (
                       <div className="mt-4 flex items-center gap-2 text-xs text-green-400 bg-green-500/10 p-2.5 rounded-xl border border-green-500/20 font-medium">
                         <TrendingUp className="w-4 h-4 shrink-0" />
                         <span>{t.valueBetDetected}: +{((match.prediction.expectedValue - 1) * 100).toFixed(1)}%)</span>
                       </div>
                    )}
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

function PlayerRow({ player, nameDisplay, isWinner }: { player: any, nameDisplay: string, isWinner: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono text-muted-foreground w-7 text-right">#{player.rank}</span>
        <span className="text-xl px-1">{getFlagEmoji(player.country)}</span>
        <span className={`font-semibold text-base ${isWinner ? 'text-foreground' : 'text-muted-foreground'}`}>{nameDisplay}</span>
      </div>
      <div className="flex gap-1">
        {player.form.map((res: string, i: number) => (
          <div key={i} className={`w-5 h-5 rounded text-[10px] flex items-center justify-center font-bold font-mono ${res === 'W' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
            {res}
          </div>
        ))}
      </div>
    </div>
  )
}

function getFlagEmoji(countryCode: string) {
  if(countryCode === 'ESP') return '🇪🇸';
  if(countryCode === 'SRB') return '🇷🇸';
  if(countryCode === 'GER') return '🇩🇪';
  if(countryCode === 'RUS') return '🇷🇺';
  if(countryCode === 'ITA') return '🇮🇹';
  if(countryCode === 'BLR') return '🇧🇾';
  if(countryCode === 'KAZ') return '🇰🇿';
  if(countryCode === 'GRE') return '🇬🇷';
  if(countryCode === 'CHN') return '🇨🇳';
  if(countryCode === 'USA') return '🇺🇸';
  if(countryCode === 'HUN') return '🇭🇺';
  return '🏳️';
}
