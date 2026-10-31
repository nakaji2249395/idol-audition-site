import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { organizerPostSlot } from '../lib/organizerPostSchedule.ts';
const queue = JSON.parse(await readFile(new URL('../content/organizer-posts/2026-10-22.json', import.meta.url)));
assert.equal(queue.batches.length, 67);
assert.equal(new Set(queue.batches.flat()).size, 201);
assert.ok(queue.batches.every(b => b.length === 3 && b.every(s => s.length > 10 && s.length <= 140)));
for (const [utc, index] of [['00',0],['03',1],['09',2],['12',3]]) {
  assert.equal(organizerPostSlot(queue.startDate,new Date(`2026-10-22T${utc}:00:00Z`)).index,index);
}
assert.equal(organizerPostSlot(queue.startDate,new Date('2026-10-21T12:00:00Z')),null);
assert.equal(organizerPostSlot(queue.startDate,new Date('2026-10-22T23:00:00Z')),null);
assert.equal(organizerPostSlot(queue.startDate,new Date('2026-10-28T12:00:00Z')).index,27);
assert.equal(organizerPostSlot(queue.startDate,new Date('2026-10-29T00:00:00Z')).index,28);
console.log('201 unique drafts; JST schedule and queue boundary checks passed');

assert.ok(queue.batches.slice(28).flat().every(s => s.length >= 40 && s.length <= 140));
assert.equal(organizerPostSlot(queue.startDate,new Date('2026-11-03T00:00:00Z')).index,48);
assert.equal(organizerPostSlot(queue.startDate,new Date('2026-11-03T03:00:00Z')).index,49);
// Exercise idempotent delivery without contacting LINE or the database.
import ts from 'typescript';
import {randomUUID} from 'node:crypto';
const source=await readFile(new URL('../lib/organizerPostDelivery.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
const records=new Map();
const bucket={
  async download(path){return records.has(path)?{data:new Blob([records.get(path)]),error:null}:{data:null,error:{message:'Object not found'}};},
  async upload(path,body){if(records.has(path))return {error:{message:'exists'}};records.set(path,body);return {error:null};}
};
const fakeDb={storage:{from:()=>bucket,getBucket:async()=>({data:{public:false},error:null})}};
let requests=0;const keys=new Set();let accepted=0;
const fakeFetch=async(_url,init)=>{requests++;const key=init.headers['X-Line-Retry-Key'];if(keys.has(key))return new Response('',{status:409,headers:{'x-line-accepted-request-id':'test'}});keys.add(key);accepted++;return new Response('{}',{status:200});};
const deps={'node:crypto':{randomUUID},'@/lib/supabaseAdmin':{supabaseAdmin:fakeDb},'@/lib/organizerPostSchedule':{organizerPostSlot},'@/content/organizer-posts/2026-10-22.json':queue};
const module={exports:{}};
new Function('require','module','exports','fetch','process',compiled)(name=>{assert.ok(name in deps);return deps[name]},module,module.exports,fakeFetch,{env:{ADMIN_LINE_USER_ID:'test-recipient',LINE_CHANNEL_ACCESS_TOKEN:'test-token'}});
const deliver=module.exports.deliverOrganizerPosts;
await deliver(true,new Date('2026-10-22T00:00:00Z'));assert.equal(requests,0);
await deliver(false,new Date('2026-10-22T01:00:00Z'));assert.equal(requests,0);
await Promise.all([deliver(false,new Date('2026-10-22T00:00:00Z')),deliver(false,new Date('2026-10-22T00:00:00Z'))]);assert.equal(accepted,1);
await deliver(false,new Date('2026-10-22T00:10:00Z'));assert.equal(accepted,1);
await deliver(false,new Date('2026-11-07T12:00:00Z'));
await deliver(false,new Date('2026-11-08T00:00:00Z'));assert.equal(accepted,2);
console.log('Dry run, off-schedule, concurrent deduplication, and single exhaustion notice passed');

assert.ok(queue.batches[49]);
assert.equal(organizerPostSlot(queue.startDate,new Date('2026-11-07T09:00:00Z')).index,66);
assert.ok(queue.batches[66]);
assert.equal(organizerPostSlot(queue.startDate,new Date('2026-11-07T12:00:00Z')).index,67);
assert.equal(queue.batches[67],undefined);
