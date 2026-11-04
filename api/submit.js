export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { username, consent } = req.body || {};
  if (consent !== true) return res.status(400).json({ error: "Consent is required." });

  const clean = String(username || "").trim().replace(/^@/, "");
  if (!/^[A-Za-z0-9._]{1,30}$/.test(clean))
    return res.status(400).json({ error: "Enter a valid Instagram username." });

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return res.status(503).json({ error: "The site owner has not configured storage yet." });

  const response = await fetch(`${url}/rest/v1/visits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": key,
      "Authorization": `Bearer ${key}`,
      "Prefer": "return=minimal"
    },
    body: JSON.stringify({ instagram_username: clean })
  });
  if (!response.ok) return res.status(502).json({ error: "Could not save the submission." });
  return res.status(200).json({ ok: true });
}
