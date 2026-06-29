import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useUser } from '../../contexts/UserContext';
import { useLanguage } from '../../lib/i18n';
import { Wallet, TrendingUp, Target, Award, Clock, LogOut, Shield, Bell, Settings, CreditCard, BarChart3, Zap } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

export function UserCabinet() {
  const { user, stats, bets, logout } = useUser();
  const { language } = useLanguage();

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-16 text-center">
        <Card className="bg-card/60">
          <CardContent className="p-10">
            <Shield className="w-12 h-12 mx-auto text-blue-400 mb-4" />
            <h2 className="text-xl font-bold mb-2">{language === 'ru' ? 'Вход в Личный Кабинет' : 'Sign in'}</h2>
            <p className="text-sm text-muted-foreground mb-6">
              {language === 'ru' ? 'Авторизация через Telegram для доступа к предиктивной аналитике' : 'Telegram auth required'}
            </p>
            <Button className="w-full">Войти через Telegram</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const profitData = Array.from({length: 24}).map((_,i)=>({
    d: i,
    profit: 95000 + i*1800 + Math.sin(i/2)*3400 + Math.random()*1200
  }));

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img 
              src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
              alt={user.name}
              className="w-16 h-16 rounded-2xl ring-2 ring-blue-500/40 shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-black border-0 font-black text-[10px]">{user.tier}</Badge>
            </div>
            <div className="text-sm text-blue-400 font-mono">{user.username} • ID {user.id}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {language === 'ru' ? 'В системе с' : 'Member since'} {new Date(user.joinedAt).toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US')} • {language === 'ru' ? 'Верифицирован' : 'Verified'} ✓
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Settings className="w-4 h-4 mr-1"/>{language==='ru'?'Настройки':'Settings'}</Button>
          <Button variant="ghost" size="sm" onClick={logout}><LogOut className="w-4 h-4 mr-1"/>{language==='ru'?'Выйти':'Logout'}</Button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/20 border-green-500/20">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm">{language==='ru'?'Баланс':'Balance'}</CardTitle>
            <Wallet className="w-4 h-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400 font-mono">₽ {stats.balance.toLocaleString('ru-RU')}</div>
            <div className="text-xs text-green-300/80 mt-1">+ ₽ {(stats.totalProfit).toLocaleString('ru-RU')} {language==='ru'?'всего': 'total'}</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm">ROI</CardTitle>
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">+{(stats.roi*100).toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground mt-1">{language==='ru'?'Средний кэф':'Avg odds'} {stats.avgOdds}</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm">Win Rate</CardTitle>
            <Target className="w-4 h-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(stats.winRate*100).toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground mt-1">{stats.wonBets} / {stats.totalBets} {language==='ru'?'ставок':'bets'}</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm">{language==='ru'?'Серия':'Streak'}</CardTitle>
            <Award className="w-4 h-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-400">{stats.maxWinStreak} 🔥</div>
            <div className="text-xs text-muted-foreground mt-1">{language==='ru'?'макс. побед подряд':'max win streak'}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profit chart */}
        <Card className="lg:col-span-2 bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2"><BarChart3 className="w-5 h-5 text-green-400"/>{language==='ru'?'Динамика банка':'Bankroll growth'}</CardTitle>
            <Badge variant="outline" className="text-green-400 border-green-400/30">LIVE</Badge>
          </CardHeader>
          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={profitData} margin={{top:5, right:10, left:-20, bottom:0}}>
                  <defs>
                    <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity={0.35}/>
                      <stop offset="100%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="d" hide />
                  <YAxis stroke="#555" fontSize={11} tickFormatter={(v)=> (v/1000).toFixed(0)+'k'} />
                  <Tooltip contentStyle={{background:'#111827', border:'1px solid #374151', fontSize:12}} formatter={(v:any)=>['₽ '+Number(v).toLocaleString('ru-RU'), language==='ru'?'Банк':'Bankroll']} />
                  <Area type="monotone" dataKey="profit" stroke="#22c55e" strokeWidth={2} fill="url(#profitGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Quick actions */}
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="text-base">{language==='ru'?'Быстрые действия':'Quick actions'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary border border-white/5 text-left transition">
              <CreditCard className="w-4 h-4 text-blue-400" />
              <div><div className="font-semibold">{language==='ru'?'Пополнить':'Deposit'}</div><div className="text-xs text-muted-foreground">СБП / Карта / Crypto</div></div>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary border border-white/5 text-left transition">
              <Bell className="w-4 h-4 text-amber-400" />
              <div><div className="font-semibold">{language==='ru'?'Алерты валуев':'Value alerts'}</div><div className="text-xs text-muted-foreground">{language==='ru'?'Настроено 6 фильтров':'6 filters active'}</div></div>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary border border-white/5 text-left transition">
              <Zap className="w-4 h-4 text-purple-400" />
              <div><div className="font-semibold">Auto-Bet API</div><div className="text-xs text-muted-foreground">{language==='ru'?'Подключено':'Connected'} • PARI</div></div>
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Bet history */}
      <Card className="bg-card/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2"><Clock className="w-5 h-5"/>{language==='ru'?'История ставок':'Bet history'}</CardTitle>
          <div className="text-xs text-muted-foreground font-mono">API sync: PARI • FONBET • BETBOOM</div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-[11px] text-muted-foreground uppercase tracking-wider border-b border-white/10">
                <tr>
                  <th className="text-left py-2 px-2">{language==='ru'?'Матч':'Match'}</th>
                  <th className="text-left py-2 px-2">{language==='ru'?'Выбор':'Pick'}</th>
                  <th className="text-left py-2 px-2">БК</th>
                  <th className="text-right py-2 px-2">{language==='ru'?'Кэф':'Odds'}</th>
                  <th className="text-right py-2 px-2">{language==='ru'?'Ставка':'Stake'}</th>
                  <th className="text-right py-2 px-2">{language==='ru'?'Статус':'Status'}</th>
                  <th className="text-right py-2 px-2">P&L</th>
                </tr>
              </thead>
              <tbody>
                {bets.map(b => (
                  <tr key={b.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="py-3 px-2 font-medium">{language==='ru'?b.matchRu:b.match}</td>
                    <td className="py-3 px-2 text-blue-300">{b.pick}</td>
                    <td className="py-3 px-2"><span className={`text-[10px] font-black px-2 py-1 rounded ${
                      b.bookmaker==='PARI' ? 'bg-cyan-500/15 text-cyan-300' :
                      b.bookmaker==='FONBET' ? 'bg-red-500/15 text-red-300' :
                      b.bookmaker==='BETBOOM' ? 'bg-yellow-500/15 text-yellow-300' :
                      'bg-orange-500/15 text-orange-300'
                    }`}>{b.bookmaker}</span></td>
                    <td className="py-3 px-2 text-right font-mono">{b.odds.toFixed(2)}</td>
                    <td className="py-3 px-2 text-right font-mono">{b.stake.toLocaleString('ru-RU')} ₽</td>
                    <td className="py-3 px-2 text-right">
                      {b.status==='won' && <Badge variant="success" className="text-[10px]">WON</Badge>}
                      {b.status==='lost' && <Badge variant="destructive" className="text-[10px]">LOST</Badge>}
                      {b.status==='pending' && <Badge variant="secondary" className="text-[10px] animate-pulse">LIVE</Badge>}
                      {b.status==='cashout' && <Badge variant="outline" className="text-[10px]">CASH</Badge>}
                    </td>
                    <td className={`py-3 px-2 text-right font-mono font-bold ${b.profit===undefined ? 'text-muted-foreground' : b.profit>0 ? 'text-green-400' : 'text-red-400'}`}>
                      {b.profit===undefined ? '—' : (b.profit>0?'+':'')+b.profit.toLocaleString('ru-RU')+' ₽'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
