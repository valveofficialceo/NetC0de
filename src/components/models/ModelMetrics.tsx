import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Progress } from '../ui/Progress';
import { BrainCircuit, Database, Network, Cpu, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useLanguage } from '../../lib/i18n';

export function ModelMetrics() {
  const { t } = useLanguage();

  const featureImportance = [
    { name: t.featH2H, value: 24.5 },
    { name: t.featRecentForm, value: 18.2 },
    { name: t.featSurfaceElo, value: 16.8 },
    { name: t.featFatigue, value: 12.4 },
    { name: t.featServeReturn, value: 11.1 },
    { name: t.featBreakPoints, value: 8.5 },
    { name: t.featWeather, value: 5.3 },
    { name: t.featCrowd, value: 3.2 },
  ];

  const trainingHistory = Array.from({ length: 12 }).map((_, i) => ({
    month: `M${i+1}`,
    loss: 0.8 - (Math.log(i + 2) * 0.15) + (Math.random() * 0.05),
    accuracy: 55 + (Math.log(i + 2) * 10) + (Math.random() * 2),
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t.diagnosticsTitle}</h2>
          <p className="text-muted-foreground mt-1">{t.diagnosticsSubtitle}</p>
        </div>
        <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-xl border border-white/5 font-mono text-sm">
          <Cpu className="w-4 h-4 text-blue-400" />
          <span>{t.inferenceLatency}</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="w-5 h-5 text-indigo-400" />
              {t.featureImportance}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {featureImportance.map((feature, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{feature.name}</span>
                    <span className="text-muted-foreground font-mono">{feature.value.toFixed(1)}%</span>
                  </div>
                  <Progress value={feature.value * 2} indicatorClassName={i < 3 ? "bg-indigo-500" : "bg-blue-500"} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-purple-400" />
                {t.trainingConvergence}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trainingHistory} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                    <XAxis dataKey="month" stroke="#888" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151' }} />
                    <Area type="monotone" dataKey="accuracy" stroke="#a855f7" fill="#a855f7" fillOpacity={0.1} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-orange-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <AlertTriangle className="w-5 h-5" />
                {t.dataDriftWarning}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t.dataDriftDesc}
              </p>
              <div className="mt-4 flex gap-4">
                <div className="flex-1 bg-background rounded-xl p-3 border border-white/5">
                  <p className="text-xs text-muted-foreground">{t.expectedVal}</p>
                  <p className="font-mono text-sm mt-1 font-bold">62.4%</p>
                </div>
                <div className="flex-1 bg-background rounded-xl p-3 border border-white/5">
                  <p className="text-xs text-muted-foreground">{t.observedVal}</p>
                  <p className="font-mono text-sm mt-1 text-orange-400 font-bold">65.8%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card className="bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-green-400" />
            {t.historicalBacktest}
          </CardTitle>
        </CardHeader>
        <CardContent>
           <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={Array.from({length: 13}).map((_, i) => ({ year: 2014+i, roi: 5 + Math.random()*15 + (i > 8 ? 12 : 0) }))} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                <XAxis dataKey="year" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`}/>
                <Tooltip cursor={{fill: '#1f2937'}} contentStyle={{ backgroundColor: '#111827', borderColor: '#374151' }} />
                <Bar dataKey="roi" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
