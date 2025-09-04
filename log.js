export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;

    const BOT_TOKEN = "8099430341:AAEzfX7LCh5xFbNHAo1CeGA-L1fEEFTDVPA"; // твой токен
    const CHAT_ID = "-1002729269078"; // твой chat_id

    try {
      const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message || "пустое сообщение"
        })
      });

      const data = await tgRes.json();
      console.log("Ответ Telegram:", data);

      res.status(200).json({ ok: true, telegram: data });
    } catch (err) {
      console.error("Ошибка при отправке в Telegram:", err);
      res.status(500).json({ error: "Ошибка телеграма" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
