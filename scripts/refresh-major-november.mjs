// Partner-authorized refresh. Preserve existing URLs, approval, contacts and ordering.
// Run without --commit first; both entries already exist, so never insert duplicates.
import assert from 'node:assert/strict';
import { createClient } from '@supabase/supabase-js';
import { fetchHtml, parseListing } from './import-audition-plus.mjs';

const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const sources = [
  ['audition-plus-2026080824', '202612', '2026110867', '2026/12/25'],
  ['audition-plus-2026032565', '202604', '2026032565', '2026/11/30'],
];
const fields = ['title', 'summary', 'description', 'deadline', 'age', 'cost', 'reward', 'experience', 'student', 'activity_content', 'selection_flow', 'application_method', 'application_reply_message', 'is_beginner_ok', 'is_high_school_ok', 'is_no_cost'];
for (const [slug, month, id, deadline] of sources) {
  const url = `https://audition.nerim.info/audition-${month}/audition-${id}.html`;
  const parsed = parseListing(await fetchHtml(url), url, 1);
  assert.ok(parsed.active);
  assert.equal(parsed.row.deadline, deadline);
  const { data: old, error } = await db.from('audition_submissions').select('*').eq('slug', slug).single();
  if (error) throw error;
  assert.equal(old.status, 'approved');
  // Stop rather than silently changing an admin-approved application destination.
  assert.equal(old.application_external_url, parsed.row.application_external_url);
  const changes = Object.fromEntries(fields.map(key => [key, parsed.row[key]]));
  changes.area = '東京・関東'; // Both eligibility sections explicitly require Tokyo activities.
  changes.is_beginner_ok = true;
  changes.is_no_cost = true;
  changes.admin_note = old.admin_note?.includes(url) ? old.admin_note : `${old.admin_note ?? ''}\n最新募集要項: ${url}`;
  console.log(JSON.stringify({ slug, title: changes.title, deadline, age: changes.age, cost: changes.cost }));
  if (!process.argv.includes('--commit')) continue;
  const { data, error: saveError } = await db.from('audition_submissions').update(changes).eq('id', old.id).eq('updated_at', old.updated_at).select('*').single();
  if (saveError) throw saveError;
  for (const [key, value] of Object.entries(changes)) assert.deepEqual(data[key], value, key);
  for (const key of ['slug', 'status', 'organizer_email', 'image_url', 'application_external_url', 'is_pinned', 'display_order']) assert.deepEqual(data[key], old[key], key);
  console.log(JSON.stringify({ verified: data.slug }));
}
