import type { Audition } from "@/lib/auditions";
import { isOpenAudition, parseAuditionDeadline } from "@/lib/auditionFreshness";
import { getAuditionListingSummary } from "@/lib/auditionListingSummary";
import { prioritizeAuditions } from "@/lib/auditionPriority";

export const becomeIdolGuideUpdated = "2026-11-15T00:00:00+09:00";

/** Only explicitly beginner-friendly, dated/open-ended listings; retain site priority. */
export function getBeginnerGuideExamples(auditions: Audition[], reference = new Date()) {
  return prioritizeAuditions(auditions.filter(audition =>
    audition.category !== "mens"
    && (parseAuditionDeadline(audition.deadline) !== null || /随時|常時/.test(audition.deadline))
    && isOpenAudition(audition, reference)
    && Boolean(getAuditionListingSummary(audition).experience)
  )).slice(0, 4);
}
