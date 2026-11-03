# Frames — consent-based Instagram handle demo

This is an independent creative-profile landing page. It is not affiliated with VSCO or Instagram. It does **not** identify visitors automatically, access Instagram accounts, capture camera images, or collect passwords. A visitor must voluntarily enter a username and tick the consent checkbox.

## Deploy on Vercel

1. Create a free Supabase project at https://supabase.com.
2. In Supabase SQL Editor, run the contents of `schema.sql`.
3. In Supabase Project Settings → API, copy the Project URL and `service_role` key. Keep the service-role key secret.
4. Upload this project to a new GitHub repository.
5. Import that repository at https://vercel.com/new.
6. In Vercel → Project → Settings → Environment Variables, add:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_PASSWORD` (use a long, unique password)
7. Redeploy after adding the variables.
8. Public page: your Vercel project URL.
9. Owner dashboard: append `/admin.html` to that URL and enter `ADMIN_PASSWORD`.

## Notes
- The dashboard lists only usernames visitors deliberately submit after seeing the consent notice.
- Do not share the admin password or service-role key.
- This starter does not record IP addresses, device fingerprints, or hidden identifiers.
- For privacy, delete submissions you no longer need from the `visits` table in Supabase.
