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
    <div className="rounded-2xl bg-slate-50 p-4">
      <dt className="text-xs font-black text-slate-500">{label}</dt>
      <dd className="mt-1 whitespace-pre-wrap text-sm font-black leading-6 text-slate-950">
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
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-5">
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

      <article className="mx-auto mt-5 max-w-4xl overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-sm">
        {audition.imageUrl ? (
          <div className="relative w-full overflow-hidden bg-slate-100">
            <img
              src={audition.imageUrl}
              alt={`${audition.title}のメイン画像`}
              className="max-h-[360px] w-full object-cover"
            />
          </div>
        ) : null}

        <div className="p-5 sm:p-7">
          <div className="flex flex-wrap gap-1.5">
            {audition.features.slice(0, 6).map((feature) => (
              <span
                key={feature}
                className="rounded-full bg-pink-50 px-2.5 py-1 text-[11px] font-black text-pink-700"
              >
                {feature}
              </span>
            ))}
          </div>

          <p className="mt-4 text-xs font-black text-pink-600">
            {audition.group}
          </p>

          <h1 className="mt-2 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
            {audition.title}
          </h1>

          <section className="mt-5 rounded-[1.4rem] bg-slate-50 p-4">
            <h2 className="text-sm font-black text-slate-950">募集概要</h2>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-700">
              {audition.summary}
            </p>
          </section>

          <section className="mt-5">
            <dl className="grid gap-3 sm:grid-cols-2">
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
            <h2 className="text-lg font-black text-slate-950">募集詳細</h2>
            <div className="mt-3 whitespace-pre-wrap rounded-[1.4rem] border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-700">
              {audition.description}
            </div>
          </section>

          {audition.officialSiteUrl || audition.officialXUrl ? (
            <section className="mt-6 rounded-[1.4rem] border border-slate-200 bg-white p-4">
              <h2 className="text-lg font-black text-slate-950">公式リンク</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {audition.officialSiteUrl ? (
                  <a
                    href={audition.officialSiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-slate-300 bg-white px-4 py-2.5 text-xs font-black text-slate-700 hover:text-pink-600"
                  >
                    公式サイト
                  </a>
                ) : null}

                {audition.officialXUrl ? (
                  <a
                    href={audition.officialXUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-slate-300 bg-white px-4 py-2.5 text-xs font-black text-slate-700 hover:text-pink-600"
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
                  <div key={item} className="whitespace-pre-wrap rounded-2xl bg-slate-50 p-3 text-sm leading-6 text-slate-700">
                    ✅ {item}
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {audition.selectionFlow && audition.selectionFlow.length > 0 ? (
            <section className="mt-6">
              <h2 className="text-lg font-black text-slate-950">選考フロー</h2>
              <div className="mt-3 whitespace-pre-wrap rounded-[1.4rem] bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                {audition.selectionFlow.join("\n")}
              </div>
            </section>
          ) : null}

          <section className="mt-6 rounded-[1.4rem] bg-pink-50 p-4">
            <h2 className="text-lg font-black text-slate-950">応募方法</h2>
            <p className="mt-2 text-xs leading-6 text-slate-700">
              応募にはアイドルオーディションナビ公式LINEを使用します。
              追加後、選択したオーディションの応募案内をLINEでお送りします。
            </p>

            <Link
              href={getApplyUrl(audition.slug)}
              className="mt-4 inline-flex rounded-full bg-slate-950 px-5 py-3 text-xs font-black text-white transition hover:bg-pink-600"
            >
              LINEで応募する
            </Link>
          </section>

          {audition.faq && audition.faq.length > 0 ? (
            <section className="mt-6">
              <h2 className="text-lg font-black text-slate-950">よくある質問</h2>
              <div className="mt-3 grid gap-3">
                {audition.faq.map((item) => (
                  <div key={item.question} className="rounded-2xl border border-slate-200 bg-white p-4">
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
      </article>

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
