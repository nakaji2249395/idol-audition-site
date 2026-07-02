import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchApplyAuditionBySlug } from "@/lib/applicationData";
import { ApplyClient } from "@/app/apply/[slug]/ApplyClient";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const audition = await fetchApplyAuditionBySlug(slug);

  if (!audition) {
    return {
      title: "応募ページが見つかりません"
    };
  }

  return {
    title: `${audition.title}にLINEで応募｜アイドルオーディションナビ`,
    description: `${audition.title}への応募案内をアイドルオーディションナビ公式LINEで受け取れます。`,
    robots: {
      index: false,
      follow: false
    }
  };
}

export default async function ApplyPage({ params }: PageProps) {
  const { slug } = await params;
  const audition = await fetchApplyAuditionBySlug(slug);

  if (!audition) {
    notFound();
  }

  return (
    <ApplyClient
      auditionSlug={audition.slug}
      auditionTitle={audition.title}
      auditionGroup={audition.group}
      auditionSummary={audition.summary}
      auditionImageUrl={audition.imageUrl}
      officialLineUrl={process.env.NEXT_PUBLIC_LINE_OFFICIAL_URL}
    />
  );
}
