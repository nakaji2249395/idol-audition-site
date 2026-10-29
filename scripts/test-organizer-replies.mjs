import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { organizerReplySlot } from '../lib/organizerReplySchedule.ts';
const queue = JSON.parse(await readFile(new URL('../content/organizer-posts/replies-2026-10-24.json', import.meta.url)));
const previous = JSON.parse(await readFile(new URL('../content/organizer-posts/replies-2026-10-23.json', import.meta.url)));
assert.equal(queue.batches.length, 71);
assert.equal(new Set(queue.sources.map(s => s.postId)).size, 71);
assert.equal(new Set(queue.sources.map(s => s.account)).size, 71);
assert.ok(!queue.sources.some(s => s.account === 'Mirai_FandL' || previous.sources.some(p => p.postId === s.postId)));
queue.batches.forEach((b, i) => {
 const source = queue.sources[i];
 assert.equal(b.length, 2);
 assert.equal(b[0], `@${source.account}\nhttps://x.com/${source.account}/status/${source.postId}`);
 assert.ok(b[1].length > 10 && b[1].length <= 140 && !b[1].includes('\n\n'));
});
const slot = date => organizerReplySlot(queue.startDate, new Date(date), queue.startHour);
assert.equal(slot('2026-10-23T22:00:00+09:00'), null);
assert.equal(slot('2026-10-24T00:00:00+09:00'), null);
assert.equal(slot('2026-10-24T08:00:00+09:00'), null);
assert.equal(slot('2026-10-24T09:00:00+09:00').index, 0);
assert.equal(slot('2026-10-24T22:00:00+09:00').index, 6);
assert.equal(slot('2026-10-25T00:00:00+09:00').index, 7);
assert.equal(slot('2026-10-26T22:00:00+09:00').index, 22);
assert.equal(slot('2026-10-27T00:00:00+09:00').index, 23);
assert.equal(slot('2026-10-28T00:00:00+09:00').index, 31);
assert.equal(slot('2026-10-28T09:00:00+09:00').index, 32);
assert.equal(slot('2026-10-28T12:00:00+09:00').index, 33);
assert.equal(slot('2026-10-29T22:00:00+09:00').index,46);
assert.equal(slot('2026-10-30T00:00:00+09:00').index,47);
assert.equal(slot('2026-10-30T09:00:00+09:00').index,48);
assert.equal(queue.sources.length, queue.batches.length);
assert.equal(new Set(queue.batches.map(b => b[1])).size, 71);
assert.ok(queue.sources.slice(23).every(s => Number.isFinite(Date.parse(s.postedAt)) && Number.isFinite(Date.parse(s.verifiedAt))));
console.log('71 unique targets; initial skipped midnight, JST rollover and queue end passed');
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
const deps={'node:crypto':{randomUUID},'@/lib/supabaseAdmin':{supabaseAdmin:fakeDb},'@/lib/organizerReplySchedule':{organizerReplySlot},'@/content/organizer-posts/replies-2026-10-24.json':queue};
const module={exports:{}};
new Function('require','module','exports','fetch','process',compiled)(name=>{assert.ok(name in deps);return deps[name]},module,module.exports,fakeFetch,{env:{ADMIN_LINE_USER_ID:'test-recipient',LINE_CHANNEL_ACCESS_TOKEN:'test-token'}});
const deliver=module.exports.deliverOrganizerReplies;
const preview = await deliver(true,new Date('2026-10-23T18:00:00Z'));
assert.equal(preview.index,0);assert.equal(preview.exhausted,false);assert.equal(requests,0);
await deliver(false,new Date('2026-10-23T15:00:00Z'));assert.equal(requests,0);
await Promise.all([deliver(false,new Date('2026-10-24T00:00:00Z')),deliver(false,new Date('2026-10-24T00:00:00Z'))]);assert.equal(accepted,1);
await deliver(false,new Date('2026-10-24T00:10:00Z'));assert.equal(accepted,1);
await deliver(false,new Date('2026-11-01T15:00:00Z'));
await deliver(false,new Date('2026-11-02T00:00:00Z'));assert.equal(accepted,2);
console.log('Dry run, off-schedule, concurrent deduplication, and single exhaustion notice passed');

assert.equal(slot('2026-10-31T09:00:00+09:00').index,56);
assert.equal(slot('2026-10-31T12:00:00+09:00').index,57);
assert.ok(queue.batches.slice(48).every(b => b[1].length >= 40));

assert.equal(slot('2026-11-01T22:00:00+09:00').index,70);
assert.equal(slot('2026-11-02T00:00:00+09:00').index,71);
assert.ok(queue.batches[70]);
assert.equal(queue.batches[71],undefined);
