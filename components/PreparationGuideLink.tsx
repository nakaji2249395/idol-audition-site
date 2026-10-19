"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";

export function PreparationGuideLink({ topic, placement, children }: {
  topic: "voice" | "dance" | "checklist";
  placement: string;
  children: React.ReactNode;
}) {
  return <Link href={`/idol-audition/training-school#${topic}`}
    className="inline-flex min-h-11 items-center text-sm text-slate-600 underline underline-offset-4 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4"
    onClick={() => track("preparation_guide_click", { topic, placement })}>{children}</Link>;
}
