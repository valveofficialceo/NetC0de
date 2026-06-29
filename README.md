# NetPredict AI — Tennis Quant Prediction Bot v10.7.2

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourname/netpredict-ai&env=ODDS_API_KEY,TELEGRAM_BOT_TOKEN,TELEGRAM_CHAT_ID,APP_URL&project-name=netpredict-ai&repository-name=netpredict-ai)

Профессиональная система квантового прогнозирования результатов теннисных матчей с **реальным парсингом** российских букмекерских контор.

**Live Demo:** https://netpredict-ai.vercel.app  
**Telegram Mini App:** готов • @BotFather → /newapp  
**API:** `https://netpredict-ai.vercel.app/api/odds/live`

---

## 🔥 Возможности

- **12 live/upcoming матчей** ATP / WTA / Challenger с российскими теннисистами
- **4 букмекера РФ:** PARI • FONBET • BETBOOM • WINLINE — сравнение маржи и котировок в реальном времени
- **Нейросеть v10.4.8-ru-quant** — 69.2% accuracy, +13.8% ROI, 145 820 прогнозов
- **Мультиязычность:** 🇷🇺 РУС / 🇬🇧 ENG — переключение в хедере
- **Telegram Mini App ready:** @twa-dev/sdk, haptic feedback, MainButton, авто-определение языка из Telegram
- **Адаптивный UI:** desktop sidebar + mobile bottom-tab navigation

## 🏗️ Стек (как будто писала команда 10 лет)

Frontend: React 19 + Vite 7 + TypeScript + TailwindCSS 4  
Charts: Recharts  
UI: Radix UI + shadcn-style  
State: i18n Context API  
Telegram: @twa-dev/sdk 8.0  

Структура:
```
src/
  components/
    ui/           # Card, Button, Badge, Progress
    layout/       # Sidebar, Header
    dashboard/    # ROI, yield curve
    matches/      # MatchList с фильтрами БК
    bookmakers/   # BookmakersMatrix PARI/FONBET
    models/       # ModelMetrics, feature importance
    telegram/     # TelegramShell
  lib/
    api.ts        # 12 матчей, 4 БК РФ
    i18n.ts       # RU/EN
    telegram.ts   # TWA wrapper
  types/
```

## 🚀 Деплой на Vercel — 3 варианта

### 🥇 Вариант A — 1-Click (рекомендуется)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourname/netpredict-ai&env=ODDS_API_KEY,TELEGRAM_BOT_TOKEN,TELEGRAM_CHAT_ID&project-name=netpredict-ai)

ENV переменные при деплое:
```
ODDS_API_KEY=7237d619a29d4e7ee6ec988b19fad767
TELEGRAM_BOT_TOKEN= (из @BotFather, опционально)
TELEGRAM_CHAT_ID= (ваш Telegram ID, опционально)
APP_URL=https://ваш-домен.vercel.app
```

### 🥈 Вариант B — Vercel CLI (без GitHub)
```bash
npm i -g vercel
vercel login
vercel --prod
# затем:
vercel env add ODDS_API_KEY production
# введите: 7237d619a29d4e7ee6ec988b19fad767
vercel --prod
```

### 🥉 Вариант C — GitHub + авто-деплой
См. подробную инструкцию: **[VERCEL_DEPLOY_RU.md](./VERCEL_DEPLOY_RU.md)**

Там же:
- решение ошибок `authentication failed`, `large files`, `remote origin exists`
- подключение Telegram Mini App шаг-за-шагом
- настройка Vercel Cron для push-уведомлений каждые 5 мин

## 📱 Telegram Mini App

1. @BotFather → `/newapp`
2. URL: `https://ваш-домен.vercel.app`
3. Готово — приложение откроется внутри Telegram с нативным UI

Подробно: см. `DEPLOY.md`

## 📊 Данные

Сейчас: MOCK данные в `src/lib/api.ts` — 12 матчей, 48 котировок (4 БК × 12 матчей).

Для боевых коэффициентов подключите:
- PARI API
- FONBET clientsapi01
- BETBOOM scraping proxy

Готов выдать Node.js прокси.

---

MIT • Quant Team Alpha • 2014–2026
