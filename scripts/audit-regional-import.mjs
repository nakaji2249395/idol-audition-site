// Read-only source/DB audit. Output contains public listing data only.
import { createClient } from '@supabase/supabase-js';
import { writeFile } from 'node:fs/promises';
import { fetchHtml, parseListing, findDuplicate } from './import-audition-plus.mjs';

const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const { data: existing, error } = await db.from('audition_submissions').select('slug,title,group_name,admin_note,status,area,deadline,age,student,cost,experience,archived_at');
if (error) throw error;
const base = 'https://audition.nerim.info/idol.html';
const html = await fetchHtml(base);
const links = [...new Map([...html.matchAll(/<a\b[^>]*href=["']([^"']*audition-[^"']+\.html)["'][^>]*>([\s\S]*?)<\/a>/gi)]
  .filter(m => /大阪|関西|名古屋|愛知|東海/.test(m[2]))
  .map(m => [new URL(m[1], base).href, m[2]])).keys()];
const candidates = [];
for (let i = 0; i < links.length; i += 4) {
  for (const item of await Promise.all(links.slice(i,i+4).map(async (url, j) => parseListing(await fetchHtml(url), url, i+j+1)))) {
    const duplicate = findDuplicate(item, existing, candidates);
    if (item.active && !duplicate) candidates.push(item);
  }
}
await writeFile('/tmp/regional-candidates.json', JSON.stringify(candidates,null,2));
console.log(JSON.stringify({ existing: existing.filter(r=>/大阪|関西|名古屋|愛知|東海/.test(r.area)), candidates: candidates.map(c=>({title:c.row.title,deadline:c.row.deadline,age:c.row.age,cost:c.row.cost,source:c.sourceUrl,slug:c.row.slug})), scanned:links.length },null,2));
