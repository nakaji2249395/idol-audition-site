-- Private delivery ledger. No browser client may read the report or recipient.
create table if not exists public.daily_reports (
  report_date date primary key,
  body text not null,
  recipient text not null,
  retry_key uuid not null default gen_random_uuid(),
  created_at timestamptz not null default now(),
  lease_at timestamptz,
  sent_at timestamptz,
  last_error text
);
alter table public.daily_reports enable row level security;
revoke all on public.daily_reports from anon, authenticated;
grant all on public.daily_reports to service_role;
