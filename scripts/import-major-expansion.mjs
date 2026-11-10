import assert from 'node:assert/strict';
import { createClient } from '@supabase/supabase-js';
import { fetchHtml, parseListing, findDuplicate } from './import-audition-plus.mjs';

const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const { data: existing, error } = await db.from('audition_submissions').select('slug,title,group_name,admin_note');
if (error) throw error;
for (const [month, id, group] of [['202704', '2026110544', 'J-BEANS 新規アイドルグループ'], ['202611', '2026101552', '透色ドロップ']]) {
  const url = `https://audition.nerim.info/audition-${month}/audition-${id}.html`;
  const parsed = parseListing(await fetchHtml(url), url, 1);
  assert.ok(parsed.active && parsed.row.application_external_url);
  const duplicate = findDuplicate(parsed, existing, []);
  if (duplicate) { console.log(JSON.stringify({ duplicate: duplicate.slug })); continue; }
  const row = parsed.row;
  row.area = '東京・関東'; // Both sources explicitly require Tokyo activities/residency.
  row.group_name = group;
  if (id === '2026110544') {
    row.is_beginner_ok = true;
    row.experience = '経験不問・未経験者歓迎';
    row.is_no_cost = true;
  } else {
    row.experience = '';
    row.is_beginner_ok = false; // Do not infer permission absent an explicit source condition.
  }
  console.log(JSON.stringify({ planned: row.title, deadline: row.deadline, destination: row.application_external_url }));
  if (!process.argv.includes('--commit')) continue;
  const { data, error: saveError } = await db.from('audition_submissions').insert(row).select('*').single();
  if (saveError) throw saveError;
  for (const [key, value] of Object.entries(row)) assert.deepEqual(data[key], value, key);
  console.log(JSON.stringify({ saved: data.slug }));
}
