import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';

registerHooks({ resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('@/lib/')) {
    return nextResolve(new URL(`../lib/${specifier.slice(6)}.ts`, import.meta.url).href, context);
  }
  return nextResolve(specifier, context);
} });
const { getBeginnerGuideExamples } = await import('../lib/becomeIdolGuide.ts');
const today = new Date('2026-11-15T12:00:00+09:00');
const base = { category: 'women', area: '東京', age: '18〜29歳', experience: '未経験歓迎', description: '', deadline: '2026年11月15日' };
const row = (slug, extra = {}) => ({ ...base, slug, ...extra });
const inventory = [row('other'), row('expired', { deadline: '2026年11月14日' }), row('mens', { category: 'mens' }), row('unknown', { deadline: '要確認' }), row('experienced', { experience: '経験者のみ' }), row('hiraeth-tokyo-new-member'), row('rolling', { deadline: '随時募集' }), row('fourth'), row('fifth')];
assert.deepEqual(getBeginnerGuideExamples(inventory, today).map(a => a.slug), ['hiraeth-tokyo-new-member', 'other', 'rolling', 'fourth']);
assert.equal(inventory[0].slug, 'other', 'Does not mutate inventory');
assert.deepEqual(getBeginnerGuideExamples([], today), []);
assert.deepEqual(getBeginnerGuideExamples([row('negative', { experience: '未経験は応募不可' })], today), []);
assert.equal(getBeginnerGuideExamples([row('last-day')], new Date('2026-11-15T14:59:59Z')).length, 1);
assert.equal(getBeginnerGuideExamples([row('expired-jst')], new Date('2026-11-15T15:00:00Z')).length, 0);
console.log('Beginner guide: eligibility, deadlines/JST, unknown exclusion, priority, limit and empty state passed');
