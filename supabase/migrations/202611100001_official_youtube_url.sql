-- Optional official channel; existing submissions remain unchanged.
alter table public.audition_submissions
  add column if not exists official_youtube_url text;
