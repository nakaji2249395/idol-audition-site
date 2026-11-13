import { cache } from "react";
import type { Audition } from "@/lib/auditions";
import { auditions } from "@/lib/auditions";
import { fetchApprovedAuditions } from "@/lib/submissions";

const getInventory = cache(async (): Promise<Audition[]> => {
  const approvedAuditions = await fetchApprovedAuditions();
  const approvedSlugs = new Set(approvedAuditions.map((audition) => audition.slug));
  const staticAuditions = auditions.filter((audition) => !approvedSlugs.has(audition.slug));

  return [...approvedAuditions, ...staticAuditions];
});

/** Existing discovery pages remain dedicated to women's auditions. */
export const getAllAuditions = cache(async () => (await getInventory()).filter(a => a.category !== "mens"));
export const getMensAuditions = cache(async () => (await getInventory()).filter(a => a.category === "mens"));
