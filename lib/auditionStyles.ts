/** Audition Plus categories, including its geographic category. No title inference. */
export const auditionStyles = [
  { id: "classic", label: "正統派" },
  { id: "specialized", label: "特化系" },
  { id: "healing", label: "いやし系" },
  { id: "performance", label: "本格派" },
  { id: "music", label: "楽曲派" },
  { id: "adult", label: "大人系" },
  { id: "energetic", label: "元気系" },
  { id: "outside-tokyo", label: "東京以外" }
] as const;

export type AuditionStyle = typeof auditionStyles[number]["id"];

export function getAuditionStyles(source: { sourceStyleCategories?: string[] }): AuditionStyle[] {
  return auditionStyles.filter(style => source.sourceStyleCategories?.includes(style.label)).map(style => style.id);
}

/** Only reviewed public metadata leaves the server; the admin note stays private. */
export function sourceStylesFromNote(note: string | null | undefined): string[] {
  const value = note?.match(/^\[audition-plus-styles\](.*)$/m)?.[1];
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    if (!parsed || typeof parsed !== "object" || !("categories" in parsed) || !Array.isArray(parsed.categories)) return [];
    const categories = parsed.categories;
    return auditionStyles.filter(style => categories.includes(style.label)).map(style => style.label);
  } catch { return []; }
}
