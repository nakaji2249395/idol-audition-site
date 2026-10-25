import type { Audition } from "@/lib/auditions";
import { isBeginnerFriendlyAudition, isWorkingAdultAudition, isHighSchoolFriendlyAudition, isNoCostAudition } from "@/lib/auditionAudience";
import { AuditionComparisonClient } from "@/components/AuditionComparisonClient";

export function AuditionComparison({ auditions, title, initialBeginner = false, regional = false, showGroup = false }: { auditions: Audition[]; title: string; initialBeginner?: boolean; regional?: boolean; showGroup?: boolean }) {
  return <AuditionComparisonClient title={title} initialBeginner={initialBeginner} regional={regional} showGroup={showGroup} rows={auditions.map((item) => ({
    slug: item.slug, title: item.title, area: item.area, age: item.age,
    cost: item.cost, student: item.student, deadline: item.deadline,
    group: item.group, beginner: isBeginnerFriendlyAudition(item), working: isWorkingAdultAudition(item),
    highSchool: isHighSchoolFriendlyAudition(item), noCost: isNoCostAudition(item)
  }))} />;
}
