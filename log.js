export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;

    try {
      // Отправка в Telegram
      await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.CHAT_ID,
          text: message || "пустое сообщение"
        })
      });

      res.status(200).json({ ok: true });
    } catch (err) {
      console.error("Ошибка при отправке в Telegram:", err);
      res.status(500).json({ error: "Ошибка телеграма" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
