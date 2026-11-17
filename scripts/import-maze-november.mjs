import assert from 'node:assert/strict';
import { createClient } from '@supabase/supabase-js';
import { fetchHtml, parseListing, findDuplicate } from './import-audition-plus.mjs';

const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const url = 'https://audition.nerim.info/audition-202611/audition-2026110652.html';
const parsed = parseListing(await fetchHtml(url), url, 44);
assert.ok(parsed.active);
assert.equal(parsed.row.deadline, '2026/11/30');
assert.equal(parsed.row.application_external_url, 'https://line.me/ti/p/YX9OkKTPx9');
Object.assign(parsed.row, {
  group_name: 'MAZE', area: '東京・関東',
  is_beginner_ok: true, is_high_school_ok: false, is_no_cost: false,
  experience: '経験不問・未経験者も応募可能',
  student: '学生も応募可能。月約20日、平日16時以降と土日・休日の昼夜に活動できる方',
  summary: '国内外でライブ活動を行うMAZEの追加メンバー募集。18〜29歳の女性・経験不問。都内中心に月約20日活動できる方が対象です。',
});
// Check all existing rows, including archived/pending records, before inserting.
const existing = [];
for (let start = 0; ; start += 500) {
  const { data, error } = await db.from('audition_submissions').select('id,slug,title,group_name,admin_note').range(start, start + 499);
  if (error) throw error;
  existing.push(...data);
  if (data.length < 500) break;
}
const duplicate = findDuplicate(parsed, existing, []);
if (duplicate) {
  console.log(JSON.stringify({ skippedDuplicate: duplicate.slug }));
} else {
  console.log(JSON.stringify({ action: 'insert', slug: parsed.row.slug, title: parsed.row.title, deadline: parsed.row.deadline, destination: parsed.row.application_external_url }));
  if (process.argv.includes('--commit')) {
    const { data, error } = await db.from('audition_submissions').insert(parsed.row).select().single();
    if (error) throw error;
    for (const [key, value] of Object.entries(parsed.row)) assert.deepEqual(data[key], value, key);
    console.log(JSON.stringify({ verified: data.slug }));
  }
}
