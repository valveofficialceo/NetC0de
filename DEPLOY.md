# NetPredict AI — Деплой без боли

Текущая сборка: **dist/index.html (780 KB / gzip 226 KB)** — single-file, готов для любого хостинга и Telegram Mini App.

---

## ВАРИАНТ 0 — Самый быстрый: Netlify Drop (БЕЗ GitHub, 20 секунд)

1. Скачайте готовый `dist/index.html` из сборки (если работаете в Arena — нажмите Download / скачайте архив проекта и выполните `npm run build` локально).
2. Откройте https://app.netlify.com/drop
3. Перетащите файл `dist/index.html` в окно.
   Netlify сам создаст сайт: `https://random-name-123.netlify.app`
4. Готово. Это Ваш URL для Telegram Mini App.

> Если у Вас single-file сборка — просто переименуйте `dist/index.html` в `index.html` и закидывайте.

---

## ВАРИАНТ A — Vercel (рекомендуется)

### Через браузер, без git:
1. https://vercel.com → Sign up (через email / GitHub / Google)
2. Add New → Project → **Browse** → выберите папку проекта целиком (zip разархивируйте).
   Или просто перетащите папку в окно Vercel.
3. Framework: Vite
   Build Command: `npm run build`
   Output: `dist`
4. Deploy.

### Через CLI (если git не работает):
```bash
npm i -g vercel
vercel login
vercel --prod
# отвечаете: Set up? Y, scope: personal, link existing? N
# build command по умолчанию
```
Получите URL сразу в терминале.

---

## ВАРИАНТ B — Cloudflare Pages (безлимитный трафик)

https://pages.cloudflare.com
1. Create project → Upload assets
2. Загрузите папку `dist`
3. Получаете `netpredict.pages.dev`

---

## Если ОБЯЗАТЕЛЬНО нужен GitHub

### Частая ошибка #1: authentication failed
GitHub больше НЕ принимает пароль. Нужен **Personal Access Token**.

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   → Generate new token
   ✅ repo (все галочки)
   Скопируйте токен: `ghp_xxxxxxxxxxxxxxxx`

2. Команды:
```bash
git init
git add .
git commit -m "NetPredict AI v10.4.8"
git branch -M main
git remote add origin https://github.com/ВАШ_ЛОГИН/netpredict-ai.git
# при push логин = ВАШ_ЛОГИН, пароль = ВАШ_ТОКЕН ghp_...
git push -u origin main
```

Если удаленный репозиторий уже существует с README:
```bash
git pull origin main --allow-unrelated-histories
# разрешите конфликты, затем
git push -u origin main
```

### Частая ошибка #2: remote origin already exists
```bash
git remote remove origin
git remote add origin https://ВАШ_ТОКЕН@github.com/ВАШ_ЛОГИН/netpredict-ai.git
git push -u origin main --force
```

### Частая ошибка #3: large files / node_modules
Убедитесь что есть `.gitignore`:
```
node_modules
dist
.env
```
Если уже закоммитили node_modules:
```bash
git rm -r --cached node_modules
git rm -r --cached dist
git commit -m "clean"
git push
```

### Самый простой способ — через GitHub Web:
1. github.com/new → Create repository `netpredict-ai` (БЕЗ README, пустой)
2. На странице репозитория: **Add file → Upload files**
3. Перетащите ВСЕ файлы проекта КРОМЕ `node_modules` и `dist`
4. Commit directly
Готово.

---

## Telegram Mini App подключение

После того как получили URL (например `https://netpredict-ai.vercel.app`):

1. Откройте @BotFather в Telegram
```
/newbot
Name: NetPredict AI
Username: netpredict_ai_bot (уникальный)
```
Скопируйте токен бота.

```
/setmenubutton
→ @netpredict_ai_bot
→ Вставьте URL: https://ваш-домен.vercel.app
→ Текст кнопки: Открыть NetPredict AI
```

ИЛИ полноценный Mini App:
```
/newapp
→ выберите @netpredict_ai_bot
Short name: netpredict
Title: NetPredict AI
Description: Квантовое прогнозирование тенниса. PARI / FONBET / BETBOOM / WINLINE
Photo: загрузите 640x360 (можно скриншот дашборда)
Web App URL: https://ваш-домен.vercel.app
```

Готово. Команда для теста бота:
```
/setdomain
→ ваш-домен.vercel.app
```

Откройте бота — появится синяя кнопка **Open / Открыть**.
Внутри:
- Авто-определение имени и аватара из Telegram
- Haptic feedback
- Нативный MainButton «💎 Показать валуи»
- Адаптивный bottom-navigation для мобильных

---

## Локальный запуск

```bash
npm install
npm run dev
# http://localhost:5173

npm run build
# dist/index.html
```

---

## Подключение реальных коэффициентов PARI / FONBET

Проект сейчас использует MOCK данные из `src/lib/api.ts`.
Для реальных данных:

1. Создайте `src/lib/liveOdds.ts`
2. Подключите WebSocket / REST:
   - PARI: `https://www.pari.ru/api/...` (нужен российский IP)
   - FONBET: `https://clientsapi01.fonbet.ru/...`
   - BETBOOM: публичный API закрыт, используйте парсинг
3. В `MOCK_MATCHES` замените на fetch.

Готовый бэкенд-прокси могу выдать (Node + Express на Render бесплатно).

Нужна помощь? Пишите какую именно ошибку выдает GitHub — скину точную команду.
