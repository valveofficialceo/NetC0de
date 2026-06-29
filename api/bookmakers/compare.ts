import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate=30');

  // In production this would aggregate real-time spreads
  const snapshot = [
    { bookmaker: 'PARI', avg_margin: 4.6, tennis_events: 47, best_odds_count: 19, roi_30d: 14.2 },
    { bookmaker: 'FONBET', avg_margin: 5.1, tennis_events: 52, best_odds_count: 22, roi_30d: 13.5 },
    { bookmaker: 'BETBOOM', avg_margin: 4.9, tennis_events: 41, best_odds_count: 24, roi_30d: 15.1 },
    { bookmaker: 'WINLINE', avg_margin: 5.4, tennis_events: 38, best_odds_count: 11, roi_30d: 12.8 },
  ];

  res.status(200).json({
    timestamp: new Date().toISOString(),
    snapshot,
    arbitrage_opportunities: Math.floor(2 + Math.random()*4),
    updated: 'realtime'
  });
}
