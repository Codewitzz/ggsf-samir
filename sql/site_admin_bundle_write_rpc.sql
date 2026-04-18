-- Run this in Supabase SQL Editor AFTER sql/site_admin_bundle.sql
-- Lets the browser save the site bundle WITHOUT Netlify (uses anon key + shared secret).
--
-- 1) Change the secret in INSERT below to match VITE_SITE_SYNC_SECRET in your .env
-- 2) Run the whole script

create schema if not exists private;

create table if not exists private.site_sync_secret (
  id int primary key default 1,
  secret text not null,
  constraint single_row check (id = 1)
);

-- TODO: use the SAME value as VITE_SITE_SYNC_SECRET
insert into private.site_sync_secret (id, secret)
values (1, 'ggsf_sync_change_this_to_a_long_random_secret')
on conflict (id) do update set secret = excluded.secret;

revoke all on schema private from public;
revoke all on table private.site_sync_secret from public;

create or replace function public.upsert_site_bundle(p_secret text, p_bundle jsonb)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  expected text;
begin
  select s.secret into expected from private.site_sync_secret s where s.id = 1;
  if expected is null or p_secret is distinct from expected then
    raise exception 'Unauthorized';
  end if;

  insert into public.site_admin_bundle (id, data, updated_at)
  values ('default', p_bundle, now())
  on conflict (id) do update
    set data = excluded.data,
        updated_at = now();
end;
$$;

revoke all on function public.upsert_site_bundle(text, jsonb) from public;
grant execute on function public.upsert_site_bundle(text, jsonb) to anon, authenticated;

notify pgrst, 'reload schema';
