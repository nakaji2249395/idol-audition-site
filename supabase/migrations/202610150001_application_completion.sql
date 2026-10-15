alter table public.audition_applications
  add column if not exists completed_at timestamptz;

create index if not exists audition_applications_completed_at_idx
  on public.audition_applications (completed_at)
  where completed_at is not null;

comment on column public.audition_applications.completed_at is
  'Timestamp when the applicant self-reported completing the organizer application.';
