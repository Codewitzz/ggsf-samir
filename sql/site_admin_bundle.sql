create table if not exists public.site_admin_bundle (
  id text primary key default 'default',
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now()
);

alter table public.site_admin_bundle enable row level security;

drop policy if exists "Public read site_admin_bundle" on public.site_admin_bundle;
create policy "Public read site_admin_bundle"
  on public.site_admin_bundle
  for select
  using (true);

grant usage on schema public to anon, authenticated;
grant select on table public.site_admin_bundle to anon, authenticated;

notify pgrst, 'reload schema';

-- To save from the app without Netlify, also run: sql/site_admin_bundle_write_rpc.sql
