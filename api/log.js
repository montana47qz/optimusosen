export default async function handler(req, res) {
  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    return res.status(500).json({ error: "BOT_TOKEN или CHAT_ID не заданы" });
  }

  try {
    const { message } = req.body || {};

    const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message || "Тестовое сообщение от Vercel"
      }),
    });

    const data = await tgRes.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("Ошибка при запросе в Telegram:", err);
    return res.status(500).json({ error: "Не удалось отправить" });
  }
}

