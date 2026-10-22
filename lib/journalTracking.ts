export type JournalEvent = "journal_article_view" | "journal_note_reached" | "journal_note_click";

// One event of each kind per mounted article, including repeated clicks and observer callbacks.
export function createJournalTracker(send: (event: JournalEvent) => void) {
  const sent = new Set<JournalEvent>();
  function emit(event: JournalEvent) {
    if (sent.has(event)) return;
    try { send(event); sent.add(event); } catch { /* Analytics must never interrupt reading or navigation. */ }
  }
  return {
    view() { emit("journal_article_view"); },
    reach() { emit("journal_article_view"); emit("journal_note_reached"); },
    click() { emit("journal_article_view"); emit("journal_note_reached"); emit("journal_note_click"); },
  };
}
