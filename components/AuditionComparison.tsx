import type { Audition } from "@/lib/auditions";
import { isBeginnerFriendlyAudition, isWorkingAdultAudition } from "@/lib/auditionAudience";
import { AuditionComparisonClient } from "@/components/AuditionComparisonClient";

export function AuditionComparison({ auditions, title, initialBeginner = false }: { auditions: Audition[]; title: string; initialBeginner?: boolean }) {
  return <AuditionComparisonClient title={title} initialBeginner={initialBeginner} rows={auditions.map((item) => ({
    slug: item.slug, title: item.title, area: item.area, age: item.age,
    cost: item.cost, student: item.student, deadline: item.deadline,
    beginner: isBeginnerFriendlyAudition(item), working: isWorkingAdultAudition(item)
  }))} />;
}
