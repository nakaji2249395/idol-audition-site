/** Multiline submissions use one activity per line; preserve punctuation within it. */
export function splitSubmissionHighlights(value: string): string[] {
  return value
    .split(value.includes("\n") ? /\r?\n/ : /、|,|・/)
    .map((item) => item.trim())
    .filter(Boolean);
}
