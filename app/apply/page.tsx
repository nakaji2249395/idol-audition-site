import type { Metadata } from "next";
import Link from "next/link";
import { fetchApplyAuditionBySlug } from "@/lib/applicationData";
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
  const slug = params?.slug;

  if (!slug) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-5 py-16">
        <section className="w-full rounded-[1.6rem] border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-10">
          <p className="text-xs font-black text-pink-600">LINE応募</p>
          <h1 className="mt-3 text-3xl font-black leading-tight text-slate-950">
            応募するオーディションが見つかりません
          </h1>
          <p className="mt-5 text-sm leading-7 text-slate-600">
            オーディション詳細ページから、もう一度「LINEで応募する」を押してください。
          </p>
          <Link
            href="/idol-audition"
            className="mt-8 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white hover:bg-pink-600"
          >
            オーディション一覧へ
          </Link>
        </section>
      </main>
    );
  }

  const audition = await fetchApplyAuditionBySlug(slug);

  if (!audition) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-5 py-16">
        <section className="w-full rounded-[1.6rem] border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-10">
          <p className="text-xs font-black text-pink-600">LINE応募</p>
          <h1 className="mt-3 text-3xl font-black leading-tight text-slate-950">
            応募ページが見つかりません
          </h1>
          <p className="mt-5 text-sm leading-7 text-slate-600">
            募集が終了したか、URLが変更された可能性があります。
          </p>
          <Link
            href="/idol-audition"
            className="mt-8 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white hover:bg-pink-600"
          >
            オーディション一覧へ
          </Link>
        </section>
      </main>
    );
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
