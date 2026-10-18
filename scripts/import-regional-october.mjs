// Manually reviewed October 18 selection. Dry-run by default; never updates existing rows.
import { createClient } from '@supabase/supabase-js';
import { fetchHtml, parseListing, findDuplicate } from './import-audition-plus.mjs';

const sources = [
  ['202612','2026101771'], ['202612','2026101657'], ['202610','2026100766'],
  ['202701','2026100882'], ['202708','2026100878'], ['202610','2026100763'],
  ['202610','2026100650'], ['202611','2026100541'], ['202612','2026100537'],
  ['202703','2026100329'], ['202610','2026100107'], ['202612','2026092874'],
  ['202611','2026092764'], ['202612','2026092765'], ['202610','2026091919'],
  ['202612','2026091473'], ['202611','2026072602'], ['202610','2026070633'],
  ['202701','2026061961'], ['202701','2026061076']
];
// Application sections, not enquiry links, are authoritative.
const applicationOverrides = {
  '2026100882': ['https://audition-plus.nerim.info/f/1003dd3e82e44a924e9ec4746ad06969', '応募フォームで応募する'],
  '2026100541': ['https://x.com/twbl_tsumu', '公式XのDMで応募する']
};
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const { data: existing, error } = await db.from('audition_submissions').select('slug,title,group_name,admin_note');
if (error) throw error;
const selected = [];
for (const [month,id] of sources) {
  const source = `https://audition.nerim.info/audition-${month}/audition-${id}.html`;
  const item = parseListing(await fetchHtml(source), source, sources.findIndex(s=>s[1]===id)+1);
  if (findDuplicate(item, existing, selected)) { console.log(`Skip existing: ${item.row.title}`); continue; }
  if (!item.active || !item.row.description || !item.row.application_method) throw new Error(`Invalid listing: ${id}`);
  if (applicationOverrides[id]) {
    const [url,label] = applicationOverrides[id];
    item.row.application_external_url = url;
    item.row.application_cta_label = label;
    item.row.line_url = null;
    item.row.form_url = url;
  }
  // Preserve the source wording; normalize punctuation only for known explicit age wording.
  if (id === '2026100763') item.row.age += '\n年齢不問（掲載元：国籍、年齢は問いません）';
  // Do not infer free activity from a free audition alone. Keep all exclusions in cost.
  item.row.is_no_cost = false;
  item.row.is_high_school_ok = /学生可|学生の場合|学業との両立/.test(item.row.age)
    || /(?:13|15|16)歳?[～〜~-](?:23|25|26|27|28|30|32)歳|16歳以上|15歳以上25歳/.test(item.row.age);
  // Include complete eligibility, rather than a truncated line ending in "未成年の方は、".
  item.row.student = `${item.row.age}\n\n学業との両立、勤務予定との調整、活動時間の詳細は募集先へご確認ください。`;
  item.row.display_order = 1200 + selected.length;
  selected.push(item);
  console.log(JSON.stringify({ title:item.row.title, slug:item.row.slug, area:item.row.area, deadline:item.row.deadline, application:item.row.application_external_url }));
}
if (selected.some(c=>!c.row.application_external_url)) throw new Error('Missing application URL');
console.log(`Reviewed new listings: ${selected.length}`);
if (process.argv.includes('--commit') && selected.length) {
  const { data, error: insertError } = await db.from('audition_submissions').insert(selected.map(c=>c.row)).select('id,slug,title');
  if (insertError) throw insertError;
  console.log(JSON.stringify({ inserted:data },null,2));
}
