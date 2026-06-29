import type { VercelRequest, VercelResponse } from '@vercel/node';

// Vercel Cron Job – runs every 5 minutes
// vercel.json: { "crons": [{ "path": "/api/cron/notify-value", "schedule": "*/5 * * * *" }] }

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Allow Vercel Cron + manual trigger (?key=)
  const cronSecret = process.env.CRON_SECRET || 'netpredict2026';
  const key = req.query.key || req.headers['x-cron-key'];
  const isVercelCron = req.headers['x-vercel-cron'] === '1';

  if (!isVercelCron && key !== cronSecret) {
    return res.status(401).json({ ok: false, error: 'Unauthorized – use ?key=netpredict2026 or Vercel Cron' });
  }

  const base = `https://${req.headers.host}`;
  try {
    const r = await fetch(base + '/api/telegram/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ test: false })
    });
    const j = await r.json();
    return res.status(200).json({ ok: true, cron: 'value-bet-notifier', ran_at: new Date().toISOString(), result: j });
  } catch (e:any) {
    return res.status(500).json({ ok:false, error: e?.message });
  }
}
