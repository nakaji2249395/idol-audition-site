import assert from 'node:assert/strict';
import { articles, articlePath, categories } from '../lib/kpop-life/content.ts';
const base = process.env.TEST_BASE_URL || 'http://localhost:3012';
const paths = ['/kpop-life', '/kpop-life/editorial-policy', ...Object.keys(categories).map(c=>`/kpop-life/${c}`), ...articles.map(articlePath)];
assert.equal(new Set(paths).size,13);
for(const path of paths){
 const response=await fetch(base+path);assert.equal(response.status,200,path);
 const html=await response.text();
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`one h1: ${path}`);
 assert.ok(html.includes(`rel="canonical" href="https://idol-audition-navi.jp${path}"`),`canonical ${path}`);
 assert.ok(!html.includes('name="robots" content="noindex'),`indexable ${path}`);
 assert.ok(html.includes('アフィリエイト広告'),`disclosure ${path}`);
 const a=articles.find(a=>articlePath(a)===path);
 if(a){
  assert.ok(html.includes('sponsored nofollow'),`affiliate rel ${path}`);
  assert.ok(html.includes(a.category==='korean'?'4BEQHQ+F4RVSA+51XQ+5Z6WY':a.category==='dance'?'4BCA7F+4496WA+4GDM+1BMW42':'4BCA7F+4D6OYY+4GDM+C0YF6'),`correct offer ${path}`);
  assert.ok(html.includes('application/ld+json'),`structured data ${path}`);
  assert.ok(html.includes(`kpop-life/${a.category}/${a.slug}/end`),`tracking placement ${path}`);
  const text=JSON.stringify(a.sections);assert.ok(text.length>700,`substantive article ${path}`);
 }
 console.log('PASS',path);
}
for(const path of ['/kpop-life/dance/missing','/kpop-life/unknown','/kpop-life/dance/oshikatsu-start'])assert.equal((await fetch(base+path)).status,404,path);
const sitemap=await (await fetch(base+'/sitemap.xml')).text();
for(const path of paths)assert.ok(sitemap.includes(`https://idol-audition-navi.jp${path}</loc>`),`sitemap ${path}`);
console.log('PASS missing routes, category isolation, and sitemap');
