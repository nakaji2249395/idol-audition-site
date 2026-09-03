import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { AuditionCard } from "@/components/AuditionCard";
import { getAllAuditions } from "@/lib/auditionData";
import {
  auditionRegions,
  getAuditionRegion,
  getRelatedAuditions
} from "@/lib/auditionDiscovery";
import { auditions } from "@/lib/auditions";
import { siteConfig } from "@/lib/site";
import { fetchApprovedAuditionBySlug } from "@/lib/submissions";
import { getApplyUrl } from "@/lib/applyUrl";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const getAudition = cache(async (slug: string) => {
  const dbAudition = await fetchApprovedAuditionBySlug(slug);

  if (dbAudition) {
    return dbAudition;
  }

  return auditions.find((item) => item.slug === slug);
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const audition = await getAudition(slug);

  if (!audition) {
    return {
      title: "オーディションが見つかりません"
    };
  }

  return {
    title: `${audition.title}｜${audition.group}のアイドルオーディション`,
    description: audition.summary,
    alternates: {
      canonical: `/idol-audition/${audition.slug}`
    },
    openGraph: {
      title: `${audition.title}｜${audition.group}`,
      description: audition.summary,
      url: `${siteConfig.url}/idol-audition/${audition.slug}`,
      type: "article",
      images: audition.imageUrl
        ? [
            {
              url: audition.imageUrl,
              width: 1200,
              height: 630,
              alt: audition.title
            }
          ]
        : undefined
    }
  };
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-slate-200 py-4">
      <dt className="text-[11px] font-black tracking-[0.06em] text-pink-700">{label}</dt>
      <dd className="mt-1.5 whitespace-pre-wrap text-sm font-bold leading-6 text-slate-950">
        {value}
      </dd>
    </div>
  );
}

export default async function AuditionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const audition = await getAudition(slug);

  if (!audition) {
    notFound();
  }

  const allAuditions = await getAllAuditions();
  const relatedAuditions = getRelatedAuditions(audition, allAuditions);
  const auditionRegion = getAuditionRegion(audition);
  const region = auditionRegion ? auditionRegions[auditionRegion] : null;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: audition.title,
    description: audition.summary,
    image: audition.imageUrl ? [audition.imageUrl] : undefined,
    mainEntityOfPage: `${siteConfig.url}/idol-audition/${audition.slug}`,
    author: {
      "@type": "Organization",
      name: "アイドルオーディションナビ"
    },
    publisher: {
      "@type": "Organization",
      name: "アイドルオーディションナビ"
    }
  };

  return (
    <main className="mx-auto max-w-[1180px] px-4 pb-28 pt-8 sm:px-6 sm:pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <nav className="text-xs font-bold text-slate-500" aria-label="パンくずリスト">
        <Link href="/" className="hover:text-pink-600">トップ</Link>
        <span className="mx-2">/</span>
        <Link href="/idol-audition" className="hover:text-pink-600">募集一覧</Link>
        {region ? (
          <>
            <span className="mx-2">/</span>
            <Link href={region.href} className="hover:text-pink-600">{region.label}</Link>
          </>
        ) : null}
      </nav>

      <article className="mt-7 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
        <div className="min-w-0">
          {audition.imageUrl ? (
            <div className="overflow-hidden rounded-[18px] border border-slate-950 bg-white shadow-[6px_7px_0_#241b24]">
              <img
                src={audition.imageUrl}
                alt={`${audition.title}のメイン画像`}
                className="max-h-[520px] w-full object-contain"
              />
            </div>
          ) : (
            <div className="grid aspect-[16/9] place-items-center rounded-[18px] border border-slate-950 bg-pink-50 text-7xl text-pink-500 shadow-[6px_7px_0_#241b24]" aria-hidden="true">✦</div>
          )}

          <div className="mt-9">
          <div className="flex flex-wrap gap-1.5">
            {audition.features.slice(0, 6).map((feature) => (
              <span
                key={feature}
                className="rounded-full border border-pink-200 bg-pink-50 px-2.5 py-1 text-[11px] font-black text-pink-700"
              >
                {feature}
              </span>
            ))}
          </div>

          <p className="mt-5 text-xs font-black uppercase tracking-[0.08em] text-pink-700">
            {audition.group}
          </p>

          <h1 className="mt-2 text-4xl font-black leading-[1.1] tracking-[-0.045em] text-slate-950 sm:text-5xl">
            {audition.title}
          </h1>

          <section className="mt-7 border-y border-slate-200 py-6">
            <h2 className="editorial-kicker">募集概要</h2>
            <p className="mt-3 whitespace-pre-wrap text-base leading-8 text-slate-700">
              {audition.summary}
            </p>
          </section>

          <section className="mt-8 paper-panel p-5 sm:p-7">
            <h2 className="section-heading text-2xl">条件を確認</h2>
            <dl className="mt-4 grid sm:grid-cols-2 sm:gap-x-8">
              <InfoRow label="活動地域" value={audition.area} />
              <InfoRow label="募集締切" value={audition.deadline} />
              <InfoRow label="募集対象" value={audition.age} />
              <InfoRow label="費用" value={audition.cost} />
              <InfoRow label="報酬" value={audition.reward} />
              <InfoRow label="経験" value={audition.experience} />
              <InfoRow label="学生・両立" value={audition.student} />
            </dl>
          </section>

          <section className="mt-6">
            <h2 className="section-heading text-2xl">募集詳細</h2>
            <div className="mt-4 whitespace-pre-wrap border-t border-slate-200 pt-5 text-sm leading-8 text-slate-700">
              {audition.description}
            </div>
          </section>

          {audition.officialSiteUrl || audition.officialXUrl ? (
            <section className="mt-7 border-t border-slate-200 pt-6">
              <h2 className="text-lg font-black text-slate-950">公式リンク</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {audition.officialSiteUrl ? (
                  <a
                    href={audition.officialSiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-slate-950 bg-white px-4 py-2.5 text-xs font-black text-slate-950 transition hover:bg-pink-50"
                  >
                    公式サイト
                  </a>
                ) : null}

                {audition.officialXUrl ? (
                  <a
                    href={audition.officialXUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-slate-950 bg-white px-4 py-2.5 text-xs font-black text-slate-950 transition hover:bg-pink-50"
                  >
                    公式X
                  </a>
                ) : null}
              </div>
            </section>
          ) : null}

          {audition.highlights && audition.highlights.length > 0 ? (
            <section className="mt-6">
              <h2 className="text-lg font-black text-slate-950">活動内容・特徴</h2>
              <div className="mt-3 grid gap-2">
                {audition.highlights.slice(0, 8).map((item) => (
                  <div key={item} className="flex gap-3 border-t border-slate-200 py-3 text-sm leading-7 text-slate-700 first:border-0">
                    <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-pink-500 text-[10px] font-black text-white" aria-hidden="true">✓</span>
                    <span className="whitespace-pre-wrap">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {audition.selectionFlow && audition.selectionFlow.length > 0 ? (
            <section className="mt-6">
              <h2 className="text-lg font-black text-slate-950">選考フロー</h2>
              <div className="mt-3 whitespace-pre-wrap border-l-2 border-pink-500 bg-pink-50 p-5 text-sm leading-8 text-slate-700">
                {audition.selectionFlow.join("\n")}
              </div>
            </section>
          ) : null}

          {audition.faq && audition.faq.length > 0 ? (
            <section className="mt-6">
              <h2 className="text-lg font-black text-slate-950">よくある質問</h2>
              <div className="mt-3 grid gap-3">
                {audition.faq.map((item) => (
                  <div key={item.question} className="border-t border-slate-200 py-4 first:border-0">
                    <h3 className="text-sm font-black text-slate-950">Q. {item.question}</h3>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                      A. {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
          </div>
        </div>

        <aside className="paper-panel p-6 lg:sticky lg:top-28">
          <p className="editorial-kicker">Application</p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.035em] text-slate-950">この募集に応募する</h2>
          <ol className="mt-5 grid gap-4 border-y border-slate-200 py-5 text-sm leading-7 text-slate-700">
            <li className="flex gap-3"><span className="font-black text-pink-700">01</span><span>公式LINEを友だち追加</span></li>
            <li className="flex gap-3"><span className="font-black text-pink-700">02</span><span>案内に沿って応募情報を送信</span></li>
            <li className="flex gap-3"><span className="font-black text-pink-700">03</span><span>運営からの連絡をLINEで確認</span></li>
          </ol>
          <Link href={getApplyUrl(audition.slug)} className="mt-5 flex min-h-14 items-center justify-center rounded-full bg-pink-500 px-6 py-4 text-sm font-black text-white transition hover:bg-pink-700">
            LINEで応募する →
          </Link>
          <p className="mt-3 text-center text-[11px] leading-5 text-slate-500">検索・応募は無料です</p>
        </aside>
      </article>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-[#fffefd]/95 p-3 backdrop-blur lg:hidden">
        <Link href={getApplyUrl(audition.slug)} className="mx-auto flex min-h-12 max-w-md items-center justify-center rounded-full bg-pink-500 px-6 text-sm font-black text-white shadow-lg">
          この募集にLINEで応募する →
        </Link>
      </div>

      {relatedAuditions.length > 0 ? (
        <section className="mt-14" aria-labelledby="related-auditions-title">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-pink-600">Related Auditions</p>
              <h2 id="related-auditions-title" className="mt-1 text-3xl font-black text-slate-950">
                この募集に近いオーディション
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                活動地域や未経験可否、費用条件が近い募集中の情報です。
              </p>
            </div>
            {region ? (
              <Link href={region.href} className="text-sm font-black text-pink-600 hover:underline">
                {region.label}の募集をすべて見る →
              </Link>
            ) : (
              <Link href="/idol-audition" className="text-sm font-black text-pink-600 hover:underline">
                募集一覧を見る →
              </Link>
            )}
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {relatedAuditions.map((related) => (
              <AuditionCard key={related.slug} audition={related} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
