import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getAuditionActivity, activityDateLabel } from '../lib/auditionActivity.ts';

const slugs = ['hiraeth-tokyo-new-member', 'osaka-fille-mimi-melucharm-audition-2026', 'osaka-mousou-heroine-new-member-2026', 'nagoya-lonlium-new-member-2026'];
test('archives contain only October 2026 events with official provenance and no duplicate events', () => {
  for (const slug of slugs) {
    const archive = getAuditionActivity(slug);
    assert.equal(archive.month, '2026-10');
    const seen = new Set();
    for (const event of archive.events) {
      assert.match(event.date, /^2026-10-(0[1-9]|[12]\d|3[01])$/);
      assert.ok(['x.com', 'hiraeth.tokyo', 'timetreeapp.com'].includes(new URL(event.sourceUrl).hostname));
      assert.ok(event.group && event.title);
      const key = [event.date, event.group, event.title, event.venue].join('|');
      assert.ok(!seen.has(key), key);
      seen.add(key);
    }
    assert.deepEqual(archive.events.map(e => e.date), archive.events.map(e => e.date).sort());
  }
});
test('official monthly calendars replace sparse X samples without counting extra photo slots', () => {
  const hiraeth = getAuditionActivity('hiraeth-tokyo-new-member').events;
  assert.equal(hiraeth.length, 27);
  assert.equal(hiraeth.filter(e => e.date === '2026-10-11' && e.kind === 'photo').length, 1);
  assert.equal(hiraeth.filter(e => e.kind === 'solo').length, 1);
  assert.ok(hiraeth.some(e => e.date === '2026-10-28' && e.venue === '川崎駅東口駅前広場'));
  const osaka = getAuditionActivity('osaka-fille-mimi-melucharm-audition-2026').events;
  assert.equal(osaka.filter(e => e.group === 'Fille mimi').length, 26);
  assert.equal(osaka.filter(e => e.group === 'MeluCharm').length, 26);
});
test('no unverified placeholder archive is displayed', () => {
  for (const slug of ['unknown', 'culvert-wo-hashiru-shonen-member-2026', 'nagoya-maycry-liz-new-member-2026', 'submission-8969f0c7-f928-41dd-8b74-530210fb222a']) assert.equal(getAuditionActivity(slug), undefined);
});
test('JST date labels and multiple events on one day are preserved', () => {
  assert.equal(activityDateLabel('2026-10-01'), '10/1(木)');
  assert.equal(activityDateLabel('2026-10-31'), '10/31(土)');
  assert.equal(getAuditionActivity('nagoya-lonlium-new-member-2026').events.filter(e => e.date === '2026-10-24').length, 2);
});
