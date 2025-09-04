export default async function handler(req, res) {
  const BOT_TOKEN = "8099430341:AAEzfX7LCh5xFbNHAo1CeGA-L1fEEFTDVPA";
  const CHAT_ID = "-1002729269078"; // подставь свой реальный ID группы или свой личный

  const testMessage = "🔥 Проверка связи с ботом!";

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: testMessage
      })
    });

    const data = await tgRes.json();
    console.log("Ответ Telegram:", data);

    res.status(200).json(data);
  } catch (err) {
    console.error("Ошибка:", err);
    res.status(500).json({ error: "Ошибка при отправке" });
  }
}
