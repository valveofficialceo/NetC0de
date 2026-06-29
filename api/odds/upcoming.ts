import type { VercelRequest, VercelResponse } from '@vercel/node';
import { russianMarketFallback } from '../_lib/merge';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate=60');
  const data = russianMarketFallback().map(m => ({...m, status: 'UPCOMING' as const}));
  res.status(200).json({
    source: 'upcoming-ru',
    timestamp: new Date().toISOString(),
    matches: data
  });
}
