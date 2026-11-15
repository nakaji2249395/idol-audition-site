import assert from 'node:assert/strict';
import {compareAuditionPriority, prioritizeAuditions} from '../lib/auditionPriority.ts';

const hiraeth = {slug: 'hiraeth-tokyo-new-member', published: 1, deadline: 100, area: 'tokyo'};
const newest = {slug: 'newest', published: 3, deadline: 10, area: 'osaka'};
const other = {slug: 'other', published: 2, deadline: 20, area: 'tokyo'};
const rows = [newest, other, hiraeth];
assert.deepEqual(prioritizeAuditions(rows), [hiraeth, newest, other]);
assert.deepEqual(rows, [newest, other, hiraeth], 'Do not mutate input');
for (const secondary of [(a, b) => b.published - a.published, (a, b) => a.deadline - b.deadline]) {
  assert.deepEqual([...rows].sort((a, b) => compareAuditionPriority(a, b) || secondary(a, b)), [hiraeth, newest, other]);
}
assert.deepEqual(prioritizeAuditions(rows.filter(row => row.area === 'osaka')), [newest]);
assert.deepEqual(prioritizeAuditions([]), []);
assert.deepEqual(prioritizeAuditions([hiraeth]), [hiraeth]);
console.log('Audition priority checks passed: stable, non-mutating, both sorts, filtering, empty inventory');
