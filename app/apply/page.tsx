import type { Metadata } from "next";
import { ApplyClient } from "@/app/apply/[slug]/ApplyClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "LINEで応募｜アイドルオーディションナビ",
  description: "アイドルオーディションナビ公式LINEで応募案内を受け取れます。",
  robots: {
    index: false,
    follow: false
  }
};

type ApplyPageProps = {
  searchParams?: Promise<{
    slug?: string;
    "liff.state"?: string;
  }>;
};

function extractSlugFromLiffState(liffState?: string) {
  if (!liffState) return "";

  try {
    const decoded = decodeURIComponent(liffState);

    if (decoded.startsWith("?")) {
      return new URLSearchParams(decoded).get("slug") || "";
    }

    if (decoded.includes("?")) {
      const query = decoded.split("?")[1];
      const slug = new URLSearchParams(query).get("slug");

      if (slug) return slug;
    }

    const cleaned = decoded
      .replace(/^\/apply\//, "")
      .replace(/^\/apply/, "")
      .replace(/^\//, "")
      .split("?")[0]
      .trim();

    return cleaned;
  } catch {
    return "";
  }
}

export default async function ApplyPage({ searchParams }: ApplyPageProps) {
  const params = await searchParams;
  const slug = params?.slug || extractSlugFromLiffState(params?.["liff.state"]);

  return (
    <ApplyClient
      initialAuditionSlug={slug || ""}
      officialLineUrl={process.env.NEXT_PUBLIC_LINE_OFFICIAL_URL}
    />
  );
}
