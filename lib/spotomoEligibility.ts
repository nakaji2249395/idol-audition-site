import type { Audition } from "@/lib/auditions";
import { isBeginnerFriendlyAudition } from "@/lib/auditionAudience";
import { preparationRegion } from "@/lib/preparationRegion";

/** Match the site's existing explicit beginner and local-area classification. */
export function spotomoDetailRegion(audition: Audition): "osaka" | "nagoya" | "osaka-nagoya" | null {
  if (!isBeginnerFriendlyAudition(audition)) return null;
  const { label } = preparationRegion(audition.area);
  if (label === "大阪") return "osaka";
  if (label === "名古屋") return "nagoya";
  if (label === "大阪・名古屋") return "osaka-nagoya";
  return null;
}
