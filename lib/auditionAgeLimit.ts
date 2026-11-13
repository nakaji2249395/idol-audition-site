export type AgeLimitKind = "none" | "limited" | "unspecified";

/** A missing upper age is not evidence that no upper limit exists. */
export function ageLimitKind(age: string): AgeLimitKind {
  const value = age.normalize("NFKC").replace(/[〜～~‐‑–—ー]/g, "-");
  const none = /年齢(?:制限)?不問|年齢(?:制限|上限)(?:は|が)?なし|上限(?:は|が)?なし/.test(value);
  const limited = /\d{2}\s*(?:歳|才)?\s*(?:-|から)\s*\d{2}|\d{2}\s*(?:歳|才)?\s*(?:以下|まで|未満)|20代|30代/.test(value);
  // Mixed/conditional requirements must remain visible only in the unfiltered list.
  if (none && limited) return "unspecified";
  return none ? "none" : limited ? "limited" : "unspecified";
}
