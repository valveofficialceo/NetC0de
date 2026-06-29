import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    ok: true,
    service: 'netpredict-parser',
    version: '10.5.2',
    time: new Date().toISOString(),
    endpoints: [
      '/api/odds/live',
      '/api/odds/upcoming',
      '/api/bookmakers/compare',
      '/api/health'
    ],
    bookmakers: ['PARI','FONBET','BETBOOM','WINLINE']
  });
}
