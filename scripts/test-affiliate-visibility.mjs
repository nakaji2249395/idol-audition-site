import { test } from 'node:test';
import assert from 'node:assert/strict';
import { observeAffiliateVisibility } from '../lib/affiliateVisibility.ts';

test('viewability: continuous time, hidden tab, once only, cleanup, unsupported browser', t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  let callback;
  let disconnects = 0;
  const events = new EventTarget();
  const document = Object.assign(events, { visibilityState: 'visible' });
  t.mock.method(globalThis, 'setTimeout', globalThis.setTimeout);
  const oldDocument = globalThis.document;
  const oldObserver = globalThis.IntersectionObserver;
  globalThis.document = document;
  globalThis.IntersectionObserver = class {
    constructor(cb) { callback = cb; }
    observe() {}
    disconnect() { disconnects++; }
  };
  try {
    let views = 0;
    const emit = ratio => callback([{ isIntersecting: ratio > 0, intersectionRatio: ratio }]);
    const stop = observeAffiliateVisibility({}, () => views++);
    emit(0.49); t.mock.timers.tick(2000); assert.equal(views,0);
    emit(0.5); t.mock.timers.tick(999); assert.equal(views,0);
    emit(0); t.mock.timers.tick(1); assert.equal(views,0);
    emit(1); t.mock.timers.tick(600);
    document.visibilityState='hidden'; document.dispatchEvent(new Event('visibilitychange'));
    t.mock.timers.tick(1000); assert.equal(views,0);
    document.visibilityState='visible'; document.dispatchEvent(new Event('visibilitychange'));
    t.mock.timers.tick(999); assert.equal(views,0);
    t.mock.timers.tick(1); assert.equal(views,1);
    emit(0); emit(1); t.mock.timers.tick(5000); assert.equal(views,1);
    stop(); assert.ok(disconnects >= 1);
    const stop2=observeAffiliateVisibility({},()=>views++);
    emit(1); stop2(); t.mock.timers.tick(1000); assert.equal(views,1);
    globalThis.IntersectionObserver=undefined;
    observeAffiliateVisibility({},()=>views++)(); assert.equal(views,1);
  } finally {
    globalThis.document=oldDocument;
    globalThis.IntersectionObserver=oldObserver;
  }
});
