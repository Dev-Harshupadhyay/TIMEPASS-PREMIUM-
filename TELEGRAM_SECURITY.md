# Telegram bot secrets

The Telegram bot token must NEVER be placed in `index.html` or any other browser-delivered file. Environment variables on the hosting platform are the correct place for it.

## Endpoints

The frontend `notifyBot()` helper tries **both** endpoints automatically (Vercel first, then Netlify), so the same `index.html` works on either host:

- Vercel: `POST /api/telegram-notify` (from `api/telegram-notify.js`)
- Netlify: `POST /.netlify/functions/telegram-notify` (from `netlify/functions/telegram-notify.js`)

Admin auth works the same way (`/api/admin-auth` and `/.netlify/functions/admin-auth`).

## Required environment variables

**Vercel** (Project → Settings → Environment Variables) or **Netlify** (Site configuration → Environment variables):

- `TELEGRAM_BOT_TOKEN` = your bot token
- `TELEGRAM_CHAT_ID` = your chat/channel ID
- `ADMIN_PASSWORD` = admin panel password

## If the old token leaked

The previous version of this file briefly contained a browser-side token. Since it was public:

1. Open @BotFather → `/revoke` the old token
2. Create a fresh token
3. Set it ONLY as `TELEGRAM_BOT_TOKEN` on the host
4. Redeploy
