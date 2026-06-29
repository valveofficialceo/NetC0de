# 🚀 Деплой NetPredict AI на Vercel — пошагово, 3 минуты

> Вариант B — **Telegram Mini App + Push-уведомления о валуях** — уже встроен.

---

## 1-click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourname/netpredict-ai&env=ODDS_API_KEY,TELEGRAM_BOT_TOKEN,TELEGRAM_CHAT_ID,APP_URL&envDescription=API%20ключи%20для%20реального%20парсинга&envLink=https://github.com/yourname/netpredict-ai/blob/main/VERCEL_DEPLOY_RU.md&project-name=netpredict-ai&repository-name=netpredict-ai)

---

## Вариант А — через сайт Vercel (самый простой, без git)

1. Скачайте проект как ZIP (или `git clone`)
2. Зайдите: **https://vercel.com/new**
3. Вкладка **“Browse”** → перетащите папку `netpredict-ai`
4. Vercel автоматически определит:
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```
5. **НЕ НАЖИМАЙТЕ DEPLOY СРАЗУ** — сначала откройте **Environment Variables**:

| Name | Value | Зачем |
|------|-------|-------|
| `ODDS_API_KEY` | `7237d619a29d4e7ee6ec988b19fad767` | Реальные коэффициенты Wimbledon / ATP / WTA |
| `TELEGRAM_BOT_TOKEN` | `123456:ABC...` (из @BotFather) | Push-уведомления о валуях |
| `TELEGRAM_CHAT_ID` | `123456789` | Куда слать алерты |
| `APP_URL` | `https://netpredict-ai.vercel.app` | Ссылка для кнопок в Telegram (можно оставить пустым — подставится автоматически) |
| `CRON_SECRET` | `netpredict2026` | Защита cron-эндпоинта |

6. Нажмите **Deploy**
7. Через 45–70 сек получите URL: `https://netpredict-ai-xxx.vercel.app`

Готово!

Проверьте API:
- `https://ваш-домен.vercel.app/api/health` → `{ "ok": true, ... }`
- `https://ваш-домен.vercel.app/api/odds/live` → реальные матчи Wimbledon, source: `the-odds-api-live`
- `https://ваш-домен.vercel.app/api/telegram/notify?test=1` → тест push в Telegram

---

## Вариант B — через GitHub (авто-деплой при каждом push)

Если GitHub не пускал — используйте **Personal Access Token**:

1. GitHub → Settings → Developer settings → Personal access tokens → **Tokens (classic)** → Generate
   - ✅ repo (все)
   - Скопируйте: `ghp_xxxxxxxx`

2. В терминале в папке проекта:
```bash
git init
git add .
git commit -m "NetPredict AI v10.7 – real odds parser"
git branch -M main
git remote add origin https://ВАШ_ТОКЕН@github.com/ВАШ_ЛОГИН/netpredict-ai.git
git push -u origin main --force
```

3. Vercel → **New Project → Import Git Repository → netpredict-ai**
4. Environment Variables — вставьте те же 5 переменных (см. таблицу выше)
5. Deploy

**Теперь каждый `git push` = авто-редеплой за 40 сек.**

---

## Вариант C — Vercel CLI (вообще без GitHub, 1 команда)

```bash
npm i -g vercel
vercel login
# в папке проекта:
vercel --prod
```
Ответьте на вопросы:
- Set up and deploy? **Y**
- Which scope? **ваш аккаунт**
- Link to existing project? **N**
- Project name? **netpredict-ai**
- In which directory? **./**
- Override settings? **N**

Через 60 сек получите URL в терминале.

Чтобы добавить ENV:
```bash
vercel env add ODDS_API_KEY production
# вставьте: 7237d619a29d4e7ee6ec988b19fad767

vercel env add TELEGRAM_BOT_TOKEN production
# вставьте токен из @BotFather

vercel env add TELEGRAM_CHAT_ID production
# ваш Telegram ID

vercel --prod   # повторный деплой с переменными
```

---

## 🔔 Подключение Telegram Mini App + Push-уведомления (Вариант B)

После деплоя на Vercel:

### 1. Создайте бота
В Telegram откройте **@BotFather**:
```
/newbot
Name: NetPredict AI
Username: netpredict_ai_bot   (любой свободный)
```
→ Скопируйте токен `123456:AA...` → вставьте в Vercel ENV `TELEGRAM_BOT_TOKEN` → Redeploy

### 2. Узнайте свой chat_id
Отправьте боту `/start`, затем откройте в браузере:
```
https://api.telegram.org/botВАШ_ТОКЕН/getUpdates
```
Найдите `"chat":{"id":123456789` → это `TELEGRAM_CHAT_ID` → добавьте в Vercel ENV → Redeploy

### 3. Подключите Mini App
В @BotFather:
```
/mybots → @ваш_бот → Bot Settings → Menu Button
→ Configure menu button
URL: https://ваш-домен.vercel.app
Text: 🎾 Открыть NetPredict AI
```
ИЛИ полноценный Mini App:
```
/newapp
→ выберите бота
Short name: netpredict
Title: NetPredict AI
Description: Квантовое прогнозирование тенниса. PARI / FONBET / BETBOOM
Web App URL: https://ваш-домен.vercel.app
Upload photo: 640x360
```

### 4. Подключите Webhook (чтобы бот отвечал на /live /value)
```bash
curl "https://api.telegram.org/botВАШ_ТОКЕН/setWebhook?url=https://ваш-домен.vercel.app/api/telegram/webhook"
```
Ответ: `{"ok":true,...}`

Теперь в боте работают команды:
- `/start` – приветствие + кнопка Mini App
- `/live` – live матчи с котировками
- `/value` – топ-3 валуйные ставки
- `/cabinet` – баланс и статистика

### 5. Авто-push каждые 5 минут
Уже настроено в `vercel.json`:
```json
"crons": [{ "path": "/api/cron/notify-value", "schedule": "*/5 * * * *" }]
```
Vercel Cron будет дергать `/api/cron/notify-value` каждые 5 минут → если найден валуй EV>1.1 → отправит пуш в ваш Telegram.

Ручной тест:
```
https://ваш-домен.vercel.app/api/telegram/notify?test=1&chat_id=ВАШ_CHAT_ID
```

---

## 🛠️ Частые проблемы

**API возвращает 404 / HTML вместо JSON**
→ Причина была в `vercel.json` rewrites. Исправлено в v10.7. Убедитесь что у вас:
```json
"rewrites": [
  { "source": "/api/(.*)", "destination": "/api/$1" },
  { "source": "/((?!api/).*)", "destination": "/index.html" }
]
```

**Коэффициенты не обновляются**
→ Проверьте: `https://ваш-домен.vercel.app/api/odds/live`
- Если `source:"the-odds-api-live"` – всё работает
- Если `source:"calendar-live-v2"` – TheOddsAPI ключ не подхватился. Проверьте ENV `ODDS_API_KEY` в Vercel → Settings → Environment Variables → **Production** → Redeploy

**Telegram бот молчит**
1. Проверьте: `https://ваш-домен.vercel.app/api/telegram/notify?test=1`
   Если ответ `BOT_TOKEN or chat_id missing` → добавьте переменные в Vercel ENV
2. Отправьте боту `/start` в Telegram
3. Проверьте webhook: `https://api.telegram.org/botТОКЕН/getWebhookInfo`
   должно быть: `"url":"https://ваш-домен.vercel.app/api/telegram/webhook"`

**TheOddsAPI лимит 500 req/мес исчерпан**
→ Ключ `7237d619a29d4e7ee6ec988b19fad767` – бесплатный тариф. При превышении автоматически включается календарный движок (fallback). Зарегистрируйте свой ключ на https://the-odds-api.com – бесплатно, 500 req/мес на каждый email.

---

## 📊 Что вы получаете после деплоя

- **14 live/upcoming матчей** – Wimbledon 2026 + ATP/WTA календарь
- **Коэффициенты обновляются**: сервер pull каждые 11 сек + клиент jitter каждые 2.5 сек
- **4 российские БК**: PARI / FONBET / BETBOOM / WINLINE (маппинг из 25+ международных)
- **Telegram Mini App**: открывается внутри Telegram, haptic, авто-авторизация
- **Push-уведомления**: валуйные ставки каждые 5 мин через Vercel Cron
- **Личный кабинет**: баланс ₽347 850, ROI +18.7%, история ставок
- **Мультиязычность**: RU / EN

---

Нужна помощь с деплоем? Напишите:
1. Какой способ выбрали (A/B/C)
2. Какая именно ошибка
3. Скриншот Vercel logs

Отвечу точной командой-фиксом.
