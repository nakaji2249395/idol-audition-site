// Partner-authorized sources. Run without --commit to review the plan first.
import assert from 'node:assert/strict';
import { createClient } from '@supabase/supabase-js';
import { fetchHtml, parseListing, findDuplicate } from './import-audition-plus.mjs';

const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const { data: existing, error } = await db.from('audition_submissions').select('*');
if (error) throw error;
const sources = [
  ['202612', '2026110866', 'つんく♂完全プロデュース 新グループ', ''],
  ['202609', '2026070391', '虹色幻想曲／新姉妹グループ', '東京・関東'],
  ['202608', '2026072047', 'Panic Monster !n Wonderland', '東京・関東'],
  ['202608', '2026071844', 'KABUKIMONO’DOGs 新規清楚系グループ', '東京・関東'],
];
// Never replace approval state, sort order, manually selected application URLs,
// uploaded images or organizer contacts when refreshing an existing submission.
const refreshFields = ['title', 'summary', 'description', 'area', 'deadline', 'age', 'is_beginner_ok', 'is_high_school_ok', 'is_no_cost', 'cost', 'reward', 'experience', 'student', 'activity_content', 'selection_flow', 'application_method', 'application_reply_message'];
for (const [index, [month, id, name, area]] of sources.entries()) {
  const url = `https://audition.nerim.info/audition-${month}/audition-${id}.html`;
  const parsed = parseListing(await fetchHtml(url), url, index + 1);
  assert.ok(parsed.active && parsed.row.application_external_url);
  parsed.row.group_name = name;
  parsed.row.area = area;
  if (id === '2026110866') {
    assert.equal(parsed.row.deadline, '2026/12/6');
    parsed.row.experience = '';
    parsed.row.is_beginner_ok = false;
  }
  if (id === '2026070391') {
    parsed.row.is_high_school_ok = true;
    parsed.row.is_no_cost = true;
  }
  const duplicate = findDuplicate(parsed, existing, []);
  const changes = duplicate ? Object.fromEntries(refreshFields.map(key => [key, parsed.row[key]])) : parsed.row;
  console.log(JSON.stringify({ action: duplicate ? 'update' : 'insert', slug: duplicate?.slug ?? parsed.row.slug, title: parsed.row.title, deadline: changes.deadline }));
  if (!process.argv.includes('--commit')) continue;
  let query = duplicate
    ? db.from('audition_submissions').update(changes).eq('id', duplicate.id).eq('updated_at', duplicate.updated_at)
    : db.from('audition_submissions').insert(changes);
  const { data, error: saveError } = await query.select('*').single();
  if (saveError) throw saveError;
  for (const [key, value] of Object.entries(changes)) assert.deepEqual(data[key], value, key);
  existing.push(data);
  console.log(JSON.stringify({ saved: data.slug }));
}
