exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }

  try {
    const { password } = JSON.parse(event.body || "{}");
    const expected = process.env.ADMIN_PASSWORD;
    const ok = Boolean(expected && password && password === expected);

    return {
      statusCode: ok ? 200 : 401,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok })
    };
  } catch {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Invalid request" })
    };
  }
};
