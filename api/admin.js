export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  const supplied = req.headers.authorization || "";
  const expected = `Bearer ${process.env.ADMIN_PASSWORD || ""}`;
  if (!process.env.ADMIN_PASSWORD || supplied !== expected)
    return res.status(401).json({ error: "Unauthorized" });

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return res.status(503).json({ error: "Storage is not configured." });

  const response = await fetch(`${url}/rest/v1/visits?select=id,instagram_username,created_at&order=created_at.desc&limit=200`, {
    headers: { "apikey": key, "Authorization": `Bearer ${key}` }
  });
  if (!response.ok) return res.status(502).json({ error: "Could not load entries." });
  return res.status(200).json(await response.json());
}
