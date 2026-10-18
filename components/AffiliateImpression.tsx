"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";
import { observeAffiliateVisibility } from "@/lib/affiliateVisibility";

export function AffiliateImpression({ children, offer, placement, className, as: Tag = "section", labelledBy }: {
  children: ReactNode;
  offer: string;
  placement: string;
  className?: string;
  as?: "section" | "aside";
  labelledBy?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (!ref.current) return;
    return observeAffiliateVisibility(ref.current, () => {
      track("affiliate_view", { offer, placement, definition: "50pct_1s" });
    });
  }, [offer, placement, pathname]);
  return <Tag ref={ref} className={className} aria-labelledby={labelledBy}>{children}</Tag>;
}
