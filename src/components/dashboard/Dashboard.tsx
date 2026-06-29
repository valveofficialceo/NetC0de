import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Target, DollarSign, Activity, AlertTriangle } from 'lucide-react';
import { MOCK_MODEL_STATS, MOCK_CHART_DATA } from '../../lib/api';
import { useLanguage } from '../../lib/i18n';

export function Dashboard() {
  const { t, language } = useLanguage();

  const insights = [
    { title: t.insight1Title, desc: t.insight1Desc, time: language === 'ru' ? '2 часа назад' : '2h ago', type: 'alert' },
    { title: t.insight2Title, desc: t.insight2Desc, time: language === 'ru' ? '4 часа назад' : '4h ago', type: 'insight' },
    { title: t.insight3Title, desc: t.insight3Desc, time: language === 'ru' ? '8 часов назад' : '8h ago', type: 'system' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{t.overviewTitle}</h2>
        <p className="text-muted-foreground mt-1">{t.overviewSubtitle}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.modelAccuracy}</CardTitle>
            <Target className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(MOCK_MODEL_STATS.accuracy * 100).toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {t.fromLastMonth}
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.totalRoi}</CardTitle>
            <DollarSign className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">+{(MOCK_MODEL_STATS.roi * 100).toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {t.profitableMonths}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.totalPredictions}</CardTitle>
            <Activity className="h-4 w-4 text-indigo-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{MOCK_MODEL_STATS.totalPredictions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {t.acrossTours}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.trainingData}</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{MOCK_MODEL_STATS.trainingDataSize}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {t.updatedTime}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bookmaker Arbitrage Banner */}
      <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/40 border border-blue-500/20 rounded-2xl p-6 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase px-2 py-0.5 rounded bg-blue-500 text-white">ARBITRAGE SCANNER</span>
              <span className="text-xs text-blue-300 font-mono">PARI • FONBET • BETBOOM • WINLINE</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">
              {language === 'ru' 
                ? 'Интеграция официальных РФ букмекеров активна' 
                : 'Russian Licensed Bookmakers Odds Feed Active'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {language === 'ru'
                ? 'Алгоритм сканирует линии в реальном времени, выявляя перевесы до 6.8% на рынках ATP и WTA.'
                : 'Algorithm tracks live lines across PARI, FONBET, and BETBOOM highlighting edges up to 6.8%.'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-card/80 border border-white/10 text-xs font-mono font-bold text-green-400">
            PARI: +14.2% ROI
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-card/80 border border-white/10 text-xs font-mono font-bold text-blue-400">
            FONBET: +13.5% ROI
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-card/80 border border-white/10 text-xs font-mono font-bold text-purple-400">
            BETBOOM: +15.1% ROI
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>{t.yieldCurve}</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_CHART_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRoi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111827', borderColor: '#374151' }}
                    itemStyle={{ color: '#22c55e' }}
                  />
                  <Area type="monotone" dataKey="roi" stroke="#22c55e" fillOpacity={1} fill="url(#colorRoi)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>{t.recentInsights}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {insights.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-3 rounded-xl bg-secondary/30 border border-white/5 hover:border-white/10 transition-colors">
                  <div className={`w-2.5 h-2.5 mt-1.5 rounded-full shrink-0 ${item.type === 'alert' ? 'bg-red-500 shadow-sm shadow-red-500/50' : item.type === 'insight' ? 'bg-green-500 shadow-sm shadow-green-500/50' : 'bg-blue-500'}`} />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold leading-none">{item.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    <p className="text-[10px] text-muted-foreground font-mono pt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
