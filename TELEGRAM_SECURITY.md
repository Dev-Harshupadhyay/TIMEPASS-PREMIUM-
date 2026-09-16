# Telegram bot secrets

The Telegram bot token must never be placed in `index.html` or any other browser-delivered file. Netlify environment variables are the correct place for it, but the browser cannot read them directly.

Set these variables in Netlify (**Site configuration → Environment variables**):

- `TELEGRAM_BOT_TOKEN` = your rotated bot token
- `TELEGRAM_CHAT_ID` = your chat ID

The server-side function is available at `/.netlify/functions/notify-bot`.

Update the frontend notification helper to call the function instead of the Telegram API directly:

```js
async function notifyBot(msg) {
  try {
    await fetch("/.netlify/functions/notify-bot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg })
    });
  } catch (err) {
    console.error("Bot Error:", err);
  }
}
```

After deploying the function and updating the frontend helper, remove `BOT_TOKEN` from `index.html`. Since the token was already public, revoke it with BotFather and create a new one before setting `TELEGRAM_BOT_TOKEN`.
