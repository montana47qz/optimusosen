import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;

    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;

    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
      });
      res.status(200).json({ status: "ok" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: "error", error: err.toString() });
    }
  } else {
    res.status(405).json({ status: "Method Not Allowed" });
  }
}
