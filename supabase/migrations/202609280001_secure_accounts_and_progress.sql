-- Run from Supabase SQL Editor or with `supabase db push`.
-- Entitlements are read-only to browser clients and must be granted by a trusted operator/payment webhook.

create table if not exists public.account_entitlements (
  user_id uuid primary key references auth.users(id) on delete cascade,
  tier text not null default 'free' check (tier in ('free', 'standard', 'premium')),
  updated_at timestamptz not null default now()
);

create table if not exists public.account_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  progress jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.purchase_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete restrict,
  tier text not null check (tier in ('standard', 'premium')),
  amount numeric(10,2) not null check (amount >= 0),
  currency text not null default 'EUR',
  provider text not null,
  provider_reference text unique,
  status text not null check (status in ('pending', 'paid', 'refunded', 'cancelled')),
  created_at timestamptz not null default now()
);

alter table public.account_entitlements enable row level security;
alter table public.account_progress enable row level security;
alter table public.purchase_records enable row level security;

revoke all on public.account_entitlements from anon, authenticated;
revoke all on public.account_progress from anon, authenticated;
revoke all on public.purchase_records from anon, authenticated;
grant select on public.account_entitlements to authenticated;
grant select, insert, update on public.account_progress to authenticated;
grant select on public.purchase_records to authenticated;
grant all on public.account_entitlements, public.account_progress, public.purchase_records to service_role;

drop policy if exists "account_entitlements_read_own" on public.account_entitlements;
create policy "account_entitlements_read_own" on public.account_entitlements
  for select to authenticated using (user_id = (select auth.uid()));

drop policy if exists "account_progress_read_own" on public.account_progress;
create policy "account_progress_read_own" on public.account_progress
  for select to authenticated using (user_id = (select auth.uid()));
drop policy if exists "account_progress_insert_own" on public.account_progress;
create policy "account_progress_insert_own" on public.account_progress
  for insert to authenticated with check (user_id = (select auth.uid()));
drop policy if exists "account_progress_update_own" on public.account_progress;
create policy "account_progress_update_own" on public.account_progress
  for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

drop policy if exists "purchase_records_read_own" on public.purchase_records;
create policy "purchase_records_read_own" on public.purchase_records
  for select to authenticated using (user_id = (select auth.uid()));

create or replace function public.create_account_defaults()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.account_entitlements (user_id, tier)
  values (new.id, 'free')
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_account_defaults on auth.users;
create trigger on_auth_user_created_account_defaults
  after insert on auth.users
  for each row execute procedure public.create_account_defaults();

insert into public.account_entitlements (user_id, tier)
select id, 'free' from auth.users
on conflict (user_id) do nothing;

-- The old client-generated records are not a verified payment ledger. Close the
-- legacy tables completely; only the new account-scoped tables are used by app code.
do $$
declare policy_row record;
begin
  if to_regclass('public.subscriptions') is not null then
    execute 'alter table public.subscriptions enable row level security';
    for policy_row in
      select policyname from pg_policies where schemaname = 'public' and tablename = 'subscriptions'
    loop
      execute format('drop policy if exists %I on public.subscriptions', policy_row.policyname);
    end loop;
  end if;
  if to_regclass('public.user_progress') is not null then
    execute 'alter table public.user_progress enable row level security';
    for policy_row in
      select policyname from pg_policies where schemaname = 'public' and tablename = 'user_progress'
    loop
      execute format('drop policy if exists %I on public.user_progress', policy_row.policyname);
    end loop;
  end if;
end;
$$;

revoke all on function public.create_account_defaults() from public;
