// Authorized partner listings: dry run by default; --commit inserts only non-duplicates.
import assert from 'node:assert/strict';
import { createClient } from '@supabase/supabase-js';
import { fetchHtml, parseListing, findDuplicate } from './import-audition-plus.mjs';

const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const { data: existing, error } = await db.from('audition_submissions').select('slug,title,group_name,admin_note,status');
if (error) throw error;
const sources = [
  { url: 'https://audition.nerim.info/audition-202512/audition-2025110621.html', name: 'Losi Forte', area: '北海道・札幌', summary: '札幌を拠点に活動するLosi Forteの追加メンバー募集。18〜26歳ぐらいまでの女性が対象（年齢応相談）。経験不問で、土日祝日を優先的に空けられる方を募集しています。' },
  { url: 'https://audition.nerim.info/audition-202612/audition-2026090831.html', name: 'Kirka Dolce', area: '北海道・釧路', summary: '釧路を拠点に活動するKirka Dolceの新メンバー募集。中学生（12歳）〜25歳くらいまで、未経験歓迎。週1回程度の練習、土日中心のライブ・イベント、継続した配信活動への参加が条件です。' }
];
const plan = [];
for (const [index, source] of sources.entries()) {
  const parsed = parseListing(await fetchHtml(source.url), source.url, index + 1);
  assert.ok(parsed.active && parsed.row.application_external_url);
  assert.equal(parsed.row.deadline, '2026/12/31');
  Object.assign(parsed.row, { group_name: source.name, area: source.area, summary: source.summary, is_beginner_ok: true });
  const duplicate = findDuplicate(parsed, existing, plan);
  if (duplicate) { console.log(JSON.stringify({ skipped: duplicate.slug })); continue; }
  plan.push(parsed);
  console.log(JSON.stringify({ planned: source.name, slug: parsed.row.slug, area: source.area, deadline: parsed.row.deadline }));
}
if (process.argv.includes('--commit')) {
  for (const { row } of plan) {
    const { data, error } = await db.from('audition_submissions').insert(row).select('*').single();
    if (error) throw error;
    for (const [key, value] of Object.entries(row)) assert.deepEqual(data[key], value, key);
    console.log(JSON.stringify({ saved: data.slug, title: data.title }));
  }
}
