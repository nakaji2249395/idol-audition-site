import { cache } from "react";
import type { Audition } from "@/lib/auditions";
import { auditions } from "@/lib/auditions";
import { fetchApprovedAuditions } from "@/lib/submissions";

export const getAllAuditions = cache(async (): Promise<Audition[]> => {
  const approvedAuditions = await fetchApprovedAuditions();
  const approvedSlugs = new Set(approvedAuditions.map((audition) => audition.slug));
  const staticAuditions = auditions.filter((audition) => !approvedSlugs.has(audition.slug));

  return [...approvedAuditions, ...staticAuditions];
});
