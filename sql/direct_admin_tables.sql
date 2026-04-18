-- Direct per-feature admin storage (no bundle RPC).

create table if not exists public.site_notices_state (
  id text primary key default 'default',
  items jsonb not null default '[]'::jsonb,
  settings jsonb not null default '{"homepageAdminWidgetEnabled": true}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.site_downloads_state (
  id text primary key default 'default',
  items jsonb not null default '[]'::jsonb,
  default_overrides jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.site_images_state (
  id text primary key default 'default',
  overrides jsonb not null default '{}'::jsonb,
  gallery jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.site_gallery_state (
  id text primary key default 'default',
  folders jsonb not null default '[]'::jsonb,
  section_overrides jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.site_admin_accounts (
  username text primary key,
  password_hash text not null,
  is_main_admin boolean not null default false,
  created_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_alumni_state (
  id text primary key default 'default',
  registrations jsonb not null default '[]'::jsonb,
  stories jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_notices_state enable row level security;
alter table public.site_downloads_state enable row level security;
alter table public.site_images_state enable row level security;
alter table public.site_gallery_state enable row level security;
alter table public.site_admin_accounts enable row level security;
alter table public.site_alumni_state enable row level security;

drop policy if exists "public read site_notices_state" on public.site_notices_state;
drop policy if exists "public write site_notices_state" on public.site_notices_state;
create policy "public read site_notices_state" on public.site_notices_state for select using (true);
create policy "public write site_notices_state" on public.site_notices_state for all using (true) with check (true);

drop policy if exists "public read site_downloads_state" on public.site_downloads_state;
drop policy if exists "public write site_downloads_state" on public.site_downloads_state;
create policy "public read site_downloads_state" on public.site_downloads_state for select using (true);
create policy "public write site_downloads_state" on public.site_downloads_state for all using (true) with check (true);

drop policy if exists "public read site_images_state" on public.site_images_state;
drop policy if exists "public write site_images_state" on public.site_images_state;
create policy "public read site_images_state" on public.site_images_state for select using (true);
create policy "public write site_images_state" on public.site_images_state for all using (true) with check (true);

drop policy if exists "public read site_gallery_state" on public.site_gallery_state;
drop policy if exists "public write site_gallery_state" on public.site_gallery_state;
create policy "public read site_gallery_state" on public.site_gallery_state for select using (true);
create policy "public write site_gallery_state" on public.site_gallery_state for all using (true) with check (true);

drop policy if exists "public read site_admin_accounts" on public.site_admin_accounts;
drop policy if exists "public write site_admin_accounts" on public.site_admin_accounts;
create policy "public read site_admin_accounts" on public.site_admin_accounts for select using (true);
create policy "public write site_admin_accounts" on public.site_admin_accounts for all using (true) with check (true);

drop policy if exists "public read site_alumni_state" on public.site_alumni_state;
drop policy if exists "public write site_alumni_state" on public.site_alumni_state;
create policy "public read site_alumni_state" on public.site_alumni_state for select using (true);
create policy "public write site_alumni_state" on public.site_alumni_state for all using (true) with check (true);

grant usage on schema public to anon, authenticated;
grant select, insert, update on public.site_notices_state to anon, authenticated;
grant select, insert, update on public.site_downloads_state to anon, authenticated;
grant select, insert, update on public.site_images_state to anon, authenticated;
grant select, insert, update on public.site_gallery_state to anon, authenticated;
grant select, insert, update, delete on public.site_admin_accounts to anon, authenticated;
grant select, insert, update on public.site_alumni_state to anon, authenticated;

notify pgrst, 'reload schema';
