create table if not exists public.visits (
  id bigint generated always as identity primary key,
  instagram_username text not null check (char_length(instagram_username) between 1 and 30),
  created_at timestamptz not null default now()
);
alter table public.visits enable row level security;
-- Do not create public read/insert policies. The Vercel serverless functions
-- access this table with the service-role key, which must remain server-side.
