import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { organizerReplySlot } from '../lib/organizerReplySchedule.ts';
const queue = JSON.parse(await readFile(new URL('../content/organizer-posts/replies-2026-10-23.json', import.meta.url)));
assert.equal(queue.batches.length,8);
assert.equal(new Set(queue.sources.map(s=>s.postId)).size,8);
assert.ok(!queue.sources.some(s=>s.account==='Mirai_FandL'));
assert.ok(queue.batches.every(b=>b.length===2 && b[0].includes('https://x.com/') && b[1].length<=140));
for (const [index,date] of ['2026-10-22T15:00:00Z','2026-10-23T00:00:00Z','2026-10-23T03:00:00Z','2026-10-23T05:00:00Z','2026-10-23T07:00:00Z','2026-10-23T09:00:00Z','2026-10-23T11:00:00Z','2026-10-23T13:00:00Z'].entries()) {
 assert.equal(organizerReplySlot(queue.startDate,new Date(date)).index,index);
}
assert.equal(organizerReplySlot(queue.startDate,new Date('2026-10-22T13:00:00Z')),null);
assert.equal(organizerReplySlot(queue.startDate,new Date('2026-10-23T12:00:00Z')),null);
assert.equal(organizerReplySlot(queue.startDate,new Date('2026-10-23T15:00:00Z')).index,8);
console.log('8 unique targets; JST midnight and schedule boundaries passed');
// Exercise idempotent delivery without contacting LINE or the database.
import ts from 'typescript';
import {randomUUID} from 'node:crypto';
const source=await readFile(new URL('../lib/organizerReplyDelivery.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
const records=new Map();
const bucket={
  async download(path){return records.has(path)?{data:new Blob([records.get(path)]),error:null}:{data:null,error:{message:'Object not found'}};},
  async upload(path,body){if(records.has(path))return {error:{message:'exists'}};records.set(path,body);return {error:null};}
};
const fakeDb={storage:{from:()=>bucket,getBucket:async()=>({data:{public:false},error:null})}};
let requests=0;const keys=new Set();let accepted=0;
const fakeFetch=async(_url,init)=>{requests++;const body=JSON.parse(init.body);assert.equal(body.to,'test-recipient');assert.ok(body.messages.length<=2);const key=init.headers['X-Line-Retry-Key'];if(keys.has(key))return new Response('',{status:409,headers:{'x-line-accepted-request-id':'test'}});keys.add(key);accepted++;return new Response('{}',{status:200});};
const deps={'node:crypto':{randomUUID},'@/lib/supabaseAdmin':{supabaseAdmin:fakeDb},'@/lib/organizerReplySchedule':{organizerReplySlot},'@/content/organizer-posts/replies-2026-10-23.json':queue};
const module={exports:{}};
new Function('require','module','exports','fetch','process',compiled)(name=>{assert.ok(name in deps);return deps[name]},module,module.exports,fakeFetch,{env:{ADMIN_LINE_USER_ID:'test-recipient',LINE_CHANNEL_ACCESS_TOKEN:'test-token'}});
const deliver=module.exports.deliverOrganizerReplies;
await deliver(true,new Date('2026-10-22T15:00:00Z'));assert.equal(requests,0);
await deliver(false,new Date('2026-10-22T01:00:00Z'));assert.equal(requests,0);
await Promise.all([deliver(false,new Date('2026-10-22T15:00:00Z')),deliver(false,new Date('2026-10-22T15:00:00Z'))]);assert.equal(accepted,1);
await deliver(false,new Date('2026-10-22T15:10:00Z'));assert.equal(accepted,1);
await deliver(false,new Date('2026-10-29T00:00:00Z'));
await deliver(false,new Date('2026-10-29T03:00:00Z'));assert.equal(accepted,2);
console.log('Dry run, off-schedule, concurrent deduplication, and single exhaustion notice passed');
