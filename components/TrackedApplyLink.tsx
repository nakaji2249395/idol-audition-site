"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";

export function TrackedApplyLink({
  href,
  auditionSlug,
  surface,
  className,
  children
}: {
  href: string;
  auditionSlug: string;
  surface: "detail_sidebar" | "detail_mobile";
  className: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        track("Audition apply start", {
          audition_slug: auditionSlug,
          surface
        });
      }}
    >
      {children}
    </Link>
  );
}
