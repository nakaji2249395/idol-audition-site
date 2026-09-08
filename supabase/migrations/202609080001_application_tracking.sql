alter table public.audition_applications
  add column if not exists application_external_url text,
  add column if not exists guide_sent_at timestamptz,
  add column if not exists external_clicked_at timestamptz,
  add column if not exists reminder_attempted_at timestamptz,
  add column if not exists reminder_sent_at timestamptz,
  add column if not exists reminder_error text;

create index if not exists audition_applications_reminder_due_idx
  on public.audition_applications (guide_sent_at)
  where external_clicked_at is null
    and reminder_attempted_at is null
    and application_external_url is not null;

comment on column public.audition_applications.application_external_url is
  'Snapshot of the organizer-approved external application destination.';
comment on column public.audition_applications.guide_sent_at is
  'Timestamp when the initial LINE application guide was successfully sent.';
comment on column public.audition_applications.external_clicked_at is
  'Timestamp when the applicant first opened the tracked external application link.';
comment on column public.audition_applications.reminder_attempted_at is
  'Timestamp used as an idempotency claim so the 24-hour reminder is attempted only once.';
comment on column public.audition_applications.reminder_sent_at is
  'Timestamp when the 24-hour LINE reminder was successfully sent.';
