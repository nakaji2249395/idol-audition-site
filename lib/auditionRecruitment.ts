// Only classify explicit title wording, not every occurrence in long descriptions.
export function recruitmentTypesFromTitle(title: string): string[] {
  const normalized = title.normalize("NFKC");
  const isNew = /新規|新グループ|新姉妹グループ|初期メンバー|(?:^|[^\d])1期生/.test(normalized);
  const isAdditional = /追加メンバー/.test(normalized) || (!isNew && /新メンバー/.test(normalized));
  return [...(isNew ? ["new-group"] : []), ...(isAdditional ? ["additional"] : [])];
}
