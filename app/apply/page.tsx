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
  }>;
};

export default async function ApplyPage({ searchParams }: ApplyPageProps) {
  const params = await searchParams;

  return (
    <ApplyClient
      initialAuditionSlug={params?.slug || ""}
      officialLineUrl={process.env.NEXT_PUBLIC_LINE_OFFICIAL_URL}
    />
  );
}
