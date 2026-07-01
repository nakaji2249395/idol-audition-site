import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auditions } from "@/lib/auditions";
import { siteConfig } from "@/lib/site";
import { fetchApprovedAuditionBySlug } from "@/lib/submissions";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function getAudition(slug: string) {
  const dbAudition = await fetchApprovedAuditionBySlug(slug);

  if (dbAudition) {
    return dbAudition;
  }

  return auditions.find((item) => item.slug === slug);
}

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
    <div className="flex flex-col gap-2 rounded-2xl bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
      <dt className="font-black text-slate-500">{label}</dt>
      <dd className="font-black text-slate-950">{value}</dd>
    </div>
  );
}

export default async function AuditionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const audition = await getAudition(slug);

  if (!audition) {
    notFound();
  }

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
    <main className="mx-auto max-w-5xl px-5 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <Link href="/idol-audition" className="text-sm font-bold text-slate-500 hover:text-pink-600">
        ← オーディション一覧へ戻る
      </Link>

      <article className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        {audition.imageUrl ? (
          <div className="relative w-full overflow-hidden bg-slate-100">
            <img
              src={audition.imageUrl}
              alt={`${audition.title}のメイン画像`}
              className="block h-auto w-full"
            />
          </div>
        ) : (
          <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-pink-100 via-white to-slate-100 px-6 text-center">
            <div>
              <p className="text-sm font-black text-pink-600">AUDITION</p>
              <p className="mt-2 text-3xl font-black text-slate-950">
                {audition.group}
              </p>
            </div>
          </div>
        )}

        <div className="p-6 sm:p-10">
          <div className="flex flex-wrap gap-2">
            {audition.features.map((feature) => (
              <span
                key={feature}
                className="rounded-full bg-pink-50 px-3 py-1 text-xs font-black text-pink-700"
              >
                {feature}
              </span>
            ))}
          </div>

          <p className="mt-6 text-sm font-black text-pink-600">
            {audition.group}
          </p>

          <h1 className="mt-3 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
            {audition.title}
          </h1>

          <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
            {audition.description}
          </p>

          <section className="mt-10">
            <dl className="grid gap-4">
              <InfoRow label="活動地域" value={audition.area} />
              <InfoRow label="募集締切" value={audition.deadline} />
              <InfoRow label="募集対象" value={audition.age} />
              <InfoRow label="費用" value={audition.cost} />
              <InfoRow label="報酬" value={audition.reward} />
              <InfoRow label="経験" value={audition.experience} />
              <InfoRow label="学生・両立" value={audition.student} />
            </dl>
          </section>

          {audition.recruitmentTypes && audition.recruitmentTypes.length > 0 ? (
            <section className="mt-10">
              <h2 className="text-2xl font-black text-slate-950">募集区分</h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {audition.recruitmentTypes.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>
          ) : null}

          {audition.highlights && audition.highlights.length > 0 ? (
            <section className="mt-10">
              <h2 className="text-2xl font-black text-slate-950">活動内容・特徴</h2>
              <div className="mt-5 grid gap-3">
                {audition.highlights.map((item) => (
                  <div key={item} className="rounded-2xl bg-slate-50 p-4 leading-8 text-slate-700">
                    ✅ {item}
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {audition.selectionFlow && audition.selectionFlow.length > 0 ? (
            <section className="mt-10">
              <h2 className="text-2xl font-black text-slate-950">選考フロー</h2>
              <div className="mt-5 grid gap-3">
                {audition.selectionFlow.map((item, index) => (
                  <div key={`${item}-${index}`} className="rounded-2xl bg-slate-50 p-4 leading-8 text-slate-700">
                    <span className="mr-2 font-black text-pink-600">STEP {index + 1}</span>
                    {item}
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <section className="mt-10 rounded-[2rem] bg-pink-50 p-6">
            <h2 className="text-2xl font-black text-slate-950">応募方法</h2>
            <p className="mt-3 leading-8 text-slate-700">
              応募前に、費用・活動地域・応募条件・保護者同意の有無を確認してください。
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {audition.applicationMethods.map((method) => (
                <a
                  key={method.url}
                  href={method.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:bg-pink-600"
                >
                  {method.label}
                </a>
              ))}
            </div>

            {audition.applicationMethods.map((method) =>
              method.note ? (
                <p key={method.label} className="mt-4 text-sm leading-7 text-slate-600">
                  {method.note}
                </p>
              ) : null
            )}
          </section>

          {audition.faq && audition.faq.length > 0 ? (
            <section className="mt-10">
              <h2 className="text-2xl font-black text-slate-950">よくある質問</h2>
              <div className="mt-5 grid gap-4">
                {audition.faq.map((item) => (
                  <div key={item.question} className="rounded-2xl border border-slate-200 bg-white p-5">
                    <h3 className="font-black text-slate-950">Q. {item.question}</h3>
                    <p className="mt-3 leading-8 text-slate-600">A. {item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </article>
    </main>
  );
}
