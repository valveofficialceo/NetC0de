export type Language = 'ru' | 'en';

export type BookmakerName = 'PARI' | 'FONBET' | 'BETBOOM' | 'WINLINE';

export interface BookmakerQuote {
  bookmaker: BookmakerName;
  odds1: number;
  odds2: number;
  margin: number;
  isBestValue?: boolean;
}

export interface Player {
  id: string;
  name: string;
  nameRu: string;
  rank: number;
  country: string;
  form: ('W' | 'L')[];
  surfaceStats: {
    hard: number;
    clay: number;
    grass: number;
  };
}

export interface Match {
  id: string;
  tournament: string;
  tournamentRu: string;
  category: 'Grand Slam' | 'ATP 1000' | 'ATP 500' | 'WTA 1000' | 'WTA 500' | 'Challenger';
  surface: 'Hard' | 'Clay' | 'Grass';
  date: string;
  status: 'LIVE' | 'UPCOMING' | 'FINISHED';
  player1: Player;
  player2: Player;
  score?: {
    sets1: number[];
    sets2: number[];
    currentSet?: number;
    currentGame?: string;
  };
  bookmakers: BookmakerQuote[];
  prediction: {
    winnerId: string;
    probability: number;
    confidence: 'HIGH' | 'MEDIUM' | 'LOW';
    expectedValue: number;
    suggestedOdds: number;
    bestBookmaker: BookmakerName;
    bestOdds: number;
    modelFactors: {
      headToHead: number;
      recentForm: number;
      surfaceProficiency: number;
      fatigueIndex: number;
    };
  };
}

export interface ModelStats {
  version: string;
  accuracy: number;
  roi: number;
  totalPredictions: number;
  profitableMonths: number;
  lastUpdated: string;
  trainingDataSize: string;
}
