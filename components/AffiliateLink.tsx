"use client";

import { track } from "@vercel/analytics";

type AffiliateLinkProps = {
  href: string;
  label: string;
  offer: string;
  placement: string;
  className?: string;
};

export function AffiliateLink({
  href,
  label,
  offer,
  placement,
  className
}: AffiliateLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored nofollow noopener"
      className={className}
      onClick={() => track("affiliate_click", { offer, placement })}
    >
      {label}
    </a>
  );
}
