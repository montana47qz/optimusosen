export default function handler(req, res) {
  const url = process.env.REDIRECT_URL || "https://example.com"; // запасной вариант
  res.writeHead(302, { Location: url });
  res.end();
}
