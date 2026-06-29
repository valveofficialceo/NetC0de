export interface LiveOddsResponse {
  source: string;
  timestamp: string;
  latency_ms: number;
  matches: ParsedMatch[];
  meta: {
    total: number;
    bookmakers: string[];
    parser_version: string;
  }
}

export interface ParsedMatch {
  id: string;
  tournament: string;
  tournament_ru: string;
  player1: string;
  player1_ru: string;
  player2: string;
  player2_ru: string;
  score?: string;
  status: 'LIVE' | 'UPCOMING';
  start_time?: string;
  bookmakers: {
    name: 'PARI' | 'FONBET' | 'BETBOOM' | 'WINLINE';
    p1: number;
    p2: number;
    updated_at: string;
    margin?: number;
  }[];
}
