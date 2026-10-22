import assert from 'node:assert/strict';
import { createJournalTracker } from '../lib/journalTracking.ts';

const events = [];
const tracker = createJournalTracker(event => events.push(event));
tracker.view(); tracker.view(); tracker.reach(); tracker.reach(); tracker.click(); tracker.click();
assert.deepEqual(events, ['journal_article_view', 'journal_note_reached', 'journal_note_click']);
const fastClick = [];
createJournalTracker(event => fastClick.push(event)).click();
assert.deepEqual(fastClick, events, 'A quick click must also count as an article view and CTA reach');
const failed = createJournalTracker(() => { throw new Error('blocked analytics'); });
assert.doesNotThrow(() => failed.click(), 'Blocked analytics must not block the note link');
const reopened = [];
createJournalTracker(event => reopened.push(event)).view();
assert.deepEqual(reopened, ['journal_article_view'], 'A newly opened article has its own counters');
console.log('Journal event ordering, deduplication and failure isolation passed.');
