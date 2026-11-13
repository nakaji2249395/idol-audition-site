// Partner-authorized import. Stage first; publish only after the isolated men's routes are live.
import { writeFile, readFile } from 'node:fs/promises';
import { createClient } from '@supabase/supabase-js';
import { fetchHtml, parseListing, findDuplicate } from './import-audition-plus.mjs';
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const report = '/tmp/mens-audition-import.json';
if (process.argv.includes('--publish')) {
  const { saved } = JSON.parse(await readFile(report, 'utf8'));
  if (!saved?.length) throw new Error('No staged records');
  for (const item of saved) {
    const { data, error } = await db.from('audition_submissions').update({status:'approved'}).eq('id',item.id).eq('status','pending').like('slug','mens-plus-%').select('id');
    if(error) throw error;
    console.log(JSON.stringify({published:item.slug, count:data.length}));
  }
} else {
  const url='https://audition.nerim.info/mens_idol.html';
  const html=await fetchHtml(url);
  const urls=[...new Set([...html.matchAll(/href=["']([^"']*audition-\d+\.html)["']/g)].map(m=>new URL(m[1],url).href))];
  const {data:existing,error}=await db.from('audition_submissions').select('id,slug,title,group_name,admin_note,status');
  if(error) throw error;
  const plan=[], skipped=[];
  for (const [i,source] of urls.entries()) {
    if(plan.length>=100) break;
    const p=parseListing(await fetchHtml(source),source,i+1);
    if(!/掲載元カテゴリ: メンズアイドル/.test(p.row.admin_note)||!p.active||!p.row.description||!p.row.application_method||/【[^】]*を記入/.test(p.row.age)){skipped.push({source,reason:'inactive or incomplete'});continue;}
    p.row.slug=`mens-plus-${p.sourceId}`;
    const duplicate=findDuplicate(p,existing,plan);
    if(duplicate){skipped.push({source,reason:'duplicate',slug:duplicate.slug});continue;}
    p.row.status='pending';
    // The source explicitly requests X DM, not the organizer's landing page.
    if(p.sourceId === '2026082580') {
      p.row.application_external_url='https://x.com/IRIZEproduction';
      p.row.application_cta_label='公式Xで応募を続ける';
    }
    p.row.admin_note+='\n[audition-category:mens]';
    // Never invent a location when the source does not specify one.
    const body=[p.row.title,p.row.age,p.row.description].join('\n');
    const places=['東京','大阪','名古屋','愛知','福岡','札幌','北海道','関西','関東','兵庫','神戸','千葉','埼玉','神奈川','横浜'];
    const locationEvidence=[p.row.title,p.row.age].join('\n').replaceAll('都内','東京都内');
    p.row.area=places.filter(place=>locationEvidence.includes(place)).join('・')||(/首都圏/.test(locationEvidence)?'首都圏':'');
    p.row.is_beginner_ok=/未経験(?:者)?(?:も|でも)?(?:大)?歓迎|経験不問|経験は問いません|未経験OK/.test(body);
    // Omit unknown sections rather than displaying boilerplate.
    for(const key of ['reward','experience','student','selection_flow']) if(/^(募集要項をご確認|経験条件は募集要項|学業との両立条件は募集要項|選考方法は募集要項)/.test(p.row[key])) p.row[key]='';
    plan.push(p);
    console.log(JSON.stringify({rank:i+1,title:p.row.title,deadline:p.row.deadline,area:p.row.area,source,application:p.row.application_external_url}));
  }
  const saved=[];
  if(process.argv.includes('--stage')) for(const p of plan){
    const {data,error}=await db.from('audition_submissions').insert(p.row).select('id,slug').single();
    if(error)throw error;
    saved.push(data);
  }
  await writeFile(report,JSON.stringify({sourceCount:urls.length,plan,skipped,saved},null,2));
  console.log(JSON.stringify({sourceCount:urls.length,planned:plan.length,skipped,saved:saved.length}));
}
