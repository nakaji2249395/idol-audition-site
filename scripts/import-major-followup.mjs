import assert from 'node:assert/strict';
import { createClient } from '@supabase/supabase-js';
import { fetchHtml, parseListing, findDuplicate } from './import-audition-plus.mjs';

const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const { data: existing, error } = await db.from('audition_submissions')
  .select('id,slug,title,group_name,admin_note,status,application_external_url,updated_at')
  .or('title.ilike.%ROCKS%,title.ilike.%GREAT MONKEYS%,title.ilike.%天空音%,slug.eq.audition-plus-2026110980,slug.eq.audition-plus-2026090148');
if (error) throw error;
const sources = [
  { month: '202703', id: '2026110980', area: '東京・関西', group: 'ROCKS IDOL AUDITION 2027', deadline: '2027/3/31' },
  { month: '202612', id: '2026111102', area: '大阪', group: '天空音パレード', deadline: '2026/12/31', existingSlug: 'audition-plus-2026090148' },
];
const fields = ['title', 'summary', 'description', 'area', 'deadline', 'age', 'cost', 'reward', 'experience', 'student', 'activity_content', 'selection_flow', 'application_method', 'application_reply_message', 'is_beginner_ok', 'is_high_school_ok', 'is_no_cost'];
for (const source of sources) {
  const url = `https://audition.nerim.info/audition-${source.month}/audition-${source.id}.html`;
  const parsed = parseListing(await fetchHtml(url), url, 1);
  assert.ok(parsed.active);
  assert.equal(parsed.row.deadline, source.deadline);
  parsed.row.area = source.area;
  parsed.row.group_name = source.group;
  parsed.row.is_beginner_ok = true;
  parsed.row.is_no_cost = true;
  parsed.row.experience = '未経験者も応募可能';
  // The source explicitly requests applications by email, not its homepage.
  if (source.existingSlug) {
    parsed.row.application_external_url = 'mailto:info@tenkuonparade.jp';
    parsed.row.application_cta_label = 'メールで応募する';
  }
  const old = source.existingSlug ? existing.find(row => row.slug === source.existingSlug) : findDuplicate(parsed, existing, []);
  if (source.existingSlug) assert.ok(old);
  if (old) {
    assert.equal(old.status, 'approved');
    assert.equal(old.application_external_url, parsed.row.application_external_url);
  }
  const changes = old ? Object.fromEntries(fields.map(key => [key, parsed.row[key]])) : parsed.row;
  if (old) changes.admin_note = old.admin_note?.includes(url) ? old.admin_note : `${old.admin_note ?? ''}\n最新募集要項: ${url}`;
  console.log(JSON.stringify({ action: old ? 'update' : 'insert', slug: old?.slug ?? parsed.row.slug, title: changes.title, deadline: changes.deadline, age: changes.age, cost: changes.cost, destination: parsed.row.application_external_url }));
  if (!process.argv.includes('--commit')) continue;
  const query = old ? db.from('audition_submissions').update(changes).eq('id', old.id).eq('updated_at', old.updated_at) : db.from('audition_submissions').insert(changes);
  const { data, error: saveError } = await query.select(Object.keys(changes).concat('slug').filter((key, index, keys) => keys.indexOf(key) === index).join(',')).single();
  if (saveError) throw saveError;
  for (const [key, value] of Object.entries(changes)) assert.deepEqual(data[key], value, key);
  existing.push(data);
  console.log(JSON.stringify({ verified: data.slug }));
}
