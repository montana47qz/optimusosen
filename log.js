// log.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "No message" });

    const token = "8099430341:AAEzfX7LCh5xFbNHAo1CeGA-L1fEEFTDVPA"; // сюда твой токен бота
    const chat_id = "1946463409";  // сюда ID чата

    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id, text: message })
      });
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Telegram send failed" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
