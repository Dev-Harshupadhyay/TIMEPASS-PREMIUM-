# ⚡ Timepass Premium — Aurora Glass UI

Market se sasta OTT subscription page — Movies, Web Series, Adult aur Combo plans ke saath instant UPI + Razorpay payment flow.

## ✨ Design
- **Aurora Glass** — animated aurora background + glassmorphism cards
- **Fully responsive** — 320px se 1440px+ tak tested, zero horizontal overflow
- Mobile-first, smooth micro-interactions, `prefers-reduced-motion` support

## 🚀 Features
- 3 pricing packs (Movies / Adult / Combo) with animated border-beam buy buttons
- 2-step checkout: plan select → payment (UPI QR + UPI intent + Razorpay buttons + Razorpay.me universal link)
- Screenshot verification CTA → Telegram DM with prefilled message
- Visitor analytics → Telegram notifications (server-side) + local logs
- Password-protected **Admin panel** (server-side auth, visitor logs, export/clear)
- Dev drawer (portfolio/contact), FAQ, purchase guide, toast notifications

## 🛠 Tech
- Single-file frontend: HTML + CSS + vanilla JS (no framework)
- Serverless functions for secrets:
  - `api/*.js` → **Vercel** (`/api/telegram-notify`, `/api/admin-auth`)
  - `netlify/functions/*.js` → **Netlify** (`/.netlify/functions/...`)
  - Frontend automatically tries **both** endpoints — deploy anywhere, no code change needed.

## 🔐 Environment Variables (server-side only — token browser mein kabhi nahi)

| Variable | Kaam |
|---|---|
| `TELEGRAM_BOT_TOKEN` | Bot token (BotFather se) |
| `TELEGRAM_CHAT_ID` | Jahan notifications bhejni hain |
| `ADMIN_PASSWORD` | Admin panel ka password |

**Vercel:** Project Settings → Environment Variables
**Netlify:** Site configuration → Environment variables

> ⚠️ Purana bot token browser code mein expose ho chuka tha — BotFather se **revoke karke naya token** banao aur sirf env variable mein daalo. Details: `TELEGRAM_SECURITY.md`
