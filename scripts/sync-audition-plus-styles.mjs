// Review-only by default. --apply updates only source-category metadata in admin_note.
import { createClient } from '@supabase/supabase-js';
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const labels = ['正統派','特化系','いやし系','本格派','楽曲派','大人系','元気系','東京以外'];
const normalize = text => text.normalize('NFKC').replace(/<[^>]+>/g, '').replace(/[\s！!「」『』]/g, '');
async function html(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw Error(`HTTP ${response.status}`);
  return response.text();
}
const index = await html('https://audition.nerim.info/idol.html');
const firstSection = index.indexOf('<h6');
const endSection = index.indexOf('<h2', firstSection);
if (firstSection < 0 || endSection < 0) throw Error('Category index structure changed');
const categoryContent = index.slice(firstSection, endSection);
const entries = new Map();
let section = '';
for (const token of categoryContent.matchAll(/<h6[^>]*>(.*?)<\/h6>|<a\s[^>]*href=["']([^"']*audition-\d+\.html)["'][^>]*>([\s\S]*?)<\/a>/g)) {
  if (token[1]) { section = labels.find(label => token[1].includes(label)) || ''; continue; }
  const url = new URL(token[2], 'https://audition.nerim.info/').href;
  const id = url.match(/audition-(\d+)\.html/)[1];
  const entry = entries.get(id) || { url, title: token[3].replace(/<[^>]+>/g, ''), categories: [] };
  if (section && !entry.categories.includes(section)) entry.categories.push(section);
  entries.set(id, entry);
}
const { data: rows, error } = await db.from('audition_submissions').select('id,slug,title,admin_note').eq('status','approved');
if (error) throw error;
const report = [];
for (let start = 0; start < rows.length; start += 4) {
  await Promise.all(rows.slice(start, start + 4).map(async row => {
    const urls = row.admin_note?.match(/https:\/\/audition\.nerim\.info\/audition-\d+\/audition-\d+\.html/g) || [];
    let url = urls.at(-1);
    const titleMatches = [...entries.values()].filter(entry => normalize(entry.title) === normalize(row.title));
    if (titleMatches.length === 1) url = titleMatches[0].url;
    const record = { id: row.id, slug: row.slug, title: row.title, source: url || null, categories: [], status: 'unmatched' };
    if (url) {
      try {
        const sourceId = url.match(/audition-(\d+)\.html/)[1];
        const entry = entries.get(sourceId);
        if (entry?.categories.length) record.categories = entry.categories;
        else {
          const page = await html(url);
          // Main listing metadata only, never related-listing categories.
          const category = page.match(/<div[^>]*class=["'][^"']*rbox3[^"']*["'][^>]*>[\s\S]*?カテゴリ：アイドル[（(]([^）)]+)[）)]/i)?.[1];
          if (labels.includes(category)) record.categories = [category];
        }
        record.status = record.categories.length ? 'verified' : 'no-category';
      } catch (error) { record.status = 'fetch-error'; record.error = error.message; }
    }
    if (process.argv.includes('--apply') && record.status === 'verified') {
      const marker = `[audition-plus-styles]${JSON.stringify({ categories: record.categories, source: record.source })}`;
      const previous = row.admin_note || '';
      const note = `${previous.replace(/^\[audition-plus-styles\].*\n?/gm, '').trim()}\n${marker}`.trim();
      let update = db.from('audition_submissions').update({admin_note:note}).eq('id',row.id);
      update = row.admin_note === null ? update.is('admin_note',null) : update.eq('admin_note',row.admin_note);
      const {data: changed, error: updateError} = await update.select('id');
      if(updateError || changed.length !== 1) throw Error(`Concurrent update or DB error: ${row.id}`);
    }
    report.push(record);
  }));
}
report.sort((a,b)=>a.slug.localeCompare(b.slug));
console.log(JSON.stringify({mode:process.argv.includes('--apply')?'applied':'review', total:report.length, verified:report.filter(r=>r.status==='verified').length, counts: labels.map(label=>({label,count:report.filter(r=>r.categories.includes(label)).length})), report: process.argv.includes('--verbose') ? report : report.filter(r=>r.status!=='verified')},null,2));
