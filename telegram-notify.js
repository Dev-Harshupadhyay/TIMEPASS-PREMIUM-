exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const text = typeof body.text === "string" ? body.text.trim() : "";

    if (!text) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Missing text" })
      };
    }

    if (text.length > 6000) {
      return {
        statusCode: 413,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Message too long" })
      };
    }

    // Netlify Environment Variables:
    // TELEGRAM_BOT_TOKEN = your Telegram bot token
    // TELEGRAM_CHAT_ID   = your Telegram chat/channel ID
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Telegram server configuration missing" })
      };
    }

    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true
      })
    });

    const result = await response.json().catch(() => ({}));

    return {
      statusCode: response.ok && result.ok ? 200 : 502,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: Boolean(response.ok && result.ok) })
    };
  } catch (error) {
    console.error("telegram-notify error:", error);
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Invalid request" })
    };
  }
};
