// Read-only by default; --apply persists only reviewed classification metadata.
import { createClient } from '@supabase/supabase-js';
import { writeFile, readFile } from 'node:fs/promises';
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const reportPath = '/tmp/audition-recruitment-review.json';
const text = html => html.replace(/<script\b[\s\S]*?<\/script>/gi, '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/\s+/g, ' ').trim();
const normalize = s => text(s).normalize('NFKC').replace(/[\s\p{P}\p{S}]/gu, '');
async function fetchHtml(url) {
  const r = await fetch(url, {signal: AbortSignal.timeout(20000)});
  if (!r.ok) throw Error(`HTTP ${r.status}`);
  const html = await r.text();
  if (/404error/.test(html)) throw Error('Source unavailable');
  return html;
}
const {data: rows, error} = await db.from('audition_submissions').select('id,slug,title,admin_note,deadline').eq('status','approved');
if (error) throw error;
if (process.argv.includes('--apply')) {
  const report = JSON.parse(await readFile(reportPath,'utf8'));
  let updated = 0;
  for (const record of report.filter(r => r.reviewed && r.source && r.types.length)) {
    const row = rows.find(r => r.id === record.id);
    if (!row || row.admin_note !== record.originalNote) throw Error('Concurrent change: '+record.slug);
    const marker = '[audition-plus-recruitment]'+JSON.stringify({types:record.types,source:record.source,evidence:record.evidence});
    const note = ((row.admin_note || '').replace(/^\[audition-plus-recruitment\].*\n?/gm,'').trim()+'\n'+marker).trim();
    let q = db.from('audition_submissions').update({admin_note:note}).eq('id',row.id);
    q = row.admin_note === null ? q.is('admin_note',null) : q.eq('admin_note',row.admin_note);
    const {data,error} = await q.select('id');
    if (error || data?.length !== 1) throw Error('Update failed: '+record.slug);
    updated++;
  }
  console.log({updated});
} else {
  const index = await fetchHtml('https://audition.nerim.info/idol.html');
  const entries = [...index.matchAll(/<a\b[^>]*href=["']([^"']*audition-\d+\.html)["'][^>]*>([\s\S]*?)<\/a>/g)].map(m=>({url:new URL(m[1],'https://audition.nerim.info/').href,title:text(m[2])}));
  const report=[];
  for (let i=0;i<rows.length;i+=4) {
    await Promise.all(rows.slice(i,i+4).map(async row=>{
      const urls = row.admin_note?.match(/https:\/\/audition\.nerim\.info\/audition-\d+\/audition-\d+\.html/g)||[];
      const knownId = (urls.at(-1)||row.slug||'').match(/(?:audition-|plus-)(\d+)(?:\.html|$)/)?.[1];
      const entry = entries.find(e=>normalize(e.title)===normalize(row.title)) || entries.find(e=>knownId && e.url.endsWith(`audition-${knownId}.html`));
      const source = entry?.url || urls.at(-1);
      const record={id:row.id,slug:row.slug,title:row.title,source,originalNote:row.admin_note,types:[],evidence:[],reviewed:false};
      if(source) try {
        const html=await fetchHtml(source);
        const title=text(html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i)?.[1]||'');
        const body=text(html.match(/<h[45][^>]*>\s*募集内容\s*<\/h[45]>([\s\S]*?)(?=<h[45][^>]*>|$)/i)?.[1]||'');
        record.sourceTitle=title; record.body=body;
        const sentences=(title+'。'+body).normalize('NFKC').split(/[。！!\n]/);
        for(const sentence of sentences) {
          if(/新規.{0,12}(?:グループ|アイドル)|新(?:アイドル)?グループ|初期メンバー|(?:第)?[一1]期生/.test(sentence)) {
            if(!record.types.includes('new-group')) record.types.push('new-group');
            record.evidence.push(sentence.slice(0,350));
          }
          if(/追加メンバー|結成.{0,12}(?:年|周年)|デビュー(?:から|して|以来)|(?:活動中|活動している|活動を行っている).{0,40}(?:募集|オーディション)/.test(sentence)) {
            if(!record.types.includes('additional')) record.types.push('additional');
            record.evidence.push(sentence.slice(0,350));
          }
        }
      } catch(e) {record.error=e.message;}
      report.push(record);
    }));
  }
  await writeFile(reportPath,JSON.stringify(report,null,2));
  console.log(JSON.stringify(report.map(({slug,title,types,evidence,error})=>({slug,title,types,evidence,error})),null,2));
}
