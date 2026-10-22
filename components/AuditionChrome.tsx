"use client";

import { usePathname } from "next/navigation";

/** Keep the audition chrome server-rendered, but omit it for the separate journal. */
export function AuditionChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/for-organizers" || pathname.startsWith("/for-organizers/")) return null;
  return children;
}
