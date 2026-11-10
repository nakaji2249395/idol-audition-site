// Partner-authorized Sapporo listings reviewed on 2026-11-10.
import assert from 'node:assert/strict';
import { createClient } from '@supabase/supabase-js';
import { fetchHtml, parseListing, findDuplicate } from './import-audition-plus.mjs';

const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const { data: existing, error } = await db.from('audition_submissions').select('*');
if (error) throw error;
const listings = [['2026092342', 'The HARE'], ['2026092341', 'STAND BY ME'], ['2026021966', 'Pirka_Dolce']];
const plan = [];
for (const [index, [id, name]] of listings.entries()) {
  const url = `https://audition.nerim.info/audition-202612/audition-${id}.html`;
  const parsed = parseListing(await fetchHtml(url), url, index + 1);
  assert.ok(parsed.active && parsed.row.application_method);
  assert.match(parsed.row.title, /札幌/);
  parsed.row.group_name = name;
  const duplicate = findDuplicate(parsed, existing, plan);
  if (duplicate) { console.log(JSON.stringify({ skippedDuplicate: duplicate.slug, name })); continue; }
  const row = parsed.row;
  row.area = '北海道・札幌';
  if (id !== '2026021966') {
    row.is_beginner_ok = true;
    row.experience = '過去の経験は問いません。';
  } else {
    row.summary = '札幌を拠点に活動するPirka_Dolceの6期生募集。12歳（中学生以上）〜25歳くらいまでの女性が対象（相談可）。週1〜2回以上の活動参加と毎日配信が条件です。';
    row.experience = '';
  }
  plan.push(parsed);
  console.log(JSON.stringify({ planned: name, deadline: row.deadline, destination: row.application_external_url }));
}
if (process.argv.includes('--commit')) {
  for (const { row } of plan) {
    const { data, error } = await db.from('audition_submissions').insert(row).select('*').single();
    if (error) throw error;
    for (const [key, value] of Object.entries(row)) assert.deepEqual(data[key], value, key);
    console.log(JSON.stringify({ saved: data.slug, title: data.title }));
  }
}
