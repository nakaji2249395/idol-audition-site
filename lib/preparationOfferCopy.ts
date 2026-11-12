// Limited to placements with observed views and no recorded clicks (2026-11-12 review).
// Keep offer selection, affiliate URLs and analytics placement IDs unchanged.
const dancePreparationPlacements = new Set([
  "audition_detail_end_osaka-fille-mimi-melucharm-audition-2026",
  "audition_detail_end_nagoya-lonlium-new-member-2026",
]);

export function usesFocusedDanceCopy(placement: string) {
  return dancePreparationPlacements.has(placement);
}

export function usesFocusedVocalCopy(slug: string, offer: string) {
  return slug === "rockets-new-group-member-2026" && offer === "nayutas_vocal";
}
