import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auditions } from "@/lib/auditions";
import { siteConfig } from "@/lib/site";
import { fetchApprovedAuditionBySlug } from "@/lib/submissions";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return auditions.map((audition) => ({
    slug: audition.slug
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let audition = await fetchApprovedAuditionBySlug(slug) ?? undefined;

  if (!audition) {
    audition = auditions.find((item) => item.slug === slug);
  }

  if (!audition) {
    return {
      title: "オーディションが見つかりません"
    };
  }

  return {
    title: audition.title,
    description: audition.summary,
    alternates: {
      canonical: `/idol-audition/${audition.slug}`
    },
    openGraph: {
      title: audition.title,
      description: audition.summary,
      url: `${siteConfig.url}/idol-audition/${audition.slug}`,
      type: "article"
    }
  };
}

function InfoSection({
  title,
  items
}: {
  title: string;
  items?: string[];
}) {
  if (!items || items.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-black text-slate-950">{title}</h2>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div key={item} className="rounded-2xl bg-slate-50 p-5 leading-8 text-slate-700">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function AuditionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let audition = await fetchApprovedAuditionBySlug(slug) ?? undefined;

  if (!audition) {
    audition = auditions.find((item) => item.slug === slug);
  }

  if (!audition) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: audition.title,
    description: audition.summary,
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
    <main className="mx-auto max-w-4xl px-5 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link href="/idol-audition" className="text-sm font-bold text-slate-500 hover:text-pink-600">
        ← オーディション一覧へ戻る
      </Link>

      <article className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <div className="mb-5 flex flex-wrap gap-2">
          {audition.features.map((feature) => (
            <span
              key={feature}
              className="rounded-full bg-pink-50 px-3 py-1 text-xs font-bold text-pink-700"
            >
              {feature}
            </span>
          ))}
        </div>

        <p className="text-sm font-bold text-pink-600">{audition.group}</p>
        <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950">
          {audition.title}
        </h1>
        <p className="mt-6 leading-8 text-slate-600">{audition.description}</p>

        <dl className="mt-10 grid gap-4">
          {[
            ["活動地域", audition.area],
            ["募集締切", audition.deadline],
            ["募集対象", audition.age],
            ["費用", audition.cost],
            ["報酬", audition.reward],
            ["経験", audition.experience],
            ["学生・仕事との両立", audition.student]
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-slate-50 p-5 sm:flex sm:justify-between sm:gap-8">
              <dt className="font-bold text-slate-500">{label}</dt>
              <dd className="mt-2 font-bold text-slate-950 sm:mt-0">{value}</dd>
            </div>
          ))}
        </dl>

        <InfoSection title="募集内容" items={audition.recruitmentTypes} />
        <InfoSection title="運営・プロジェクトの特徴" items={audition.highlights} />
        <InfoSection title="選考フロー" items={audition.selectionFlow} />
        <InfoSection title="合格後の流れ" items={audition.afterPassingFlow} />
        <InfoSection title="応募資格" items={audition.eligibility} />

        <section className="mt-10 rounded-3xl bg-slate-950 p-6 text-white">
          <h2 className="text-2xl font-black">応募方法</h2>
          <p className="mt-3 leading-8 text-slate-200">
            以下の応募方法からエントリーしてください。応募前に、費用・活動地域・選考フローを必ず確認してください。
          </p>

          <div className="mt-6 grid gap-4">
            {audition.applicationMethods.map((method, index) => (
              <a
                key={method.label}
                href={method.url}
                target={method.url.startsWith("http") ? "_blank" : undefined}
                rel={method.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className="rounded-2xl bg-white p-5 text-slate-950 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-sm font-black text-pink-600">
                  {index + 1}. {method.label}
                </p>
                {method.note ? (
                  <p className="mt-2 text-sm leading-7 text-slate-600">{method.note}</p>
                ) : null}
                <p className="mt-3 text-sm font-bold text-slate-950">応募ページを開く →</p>
              </a>
            ))}
          </div>
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

        <section className="mt-10 rounded-3xl bg-pink-50 p-6">
          <h2 className="text-xl font-black text-slate-950">応募前チェック</h2>
          <ul className="mt-4 grid gap-3 text-sm leading-7 text-slate-700">
            <li>✅ 登録料・レッスン費・衣装代などの費用を確認する</li>
            <li>✅ 活動地域と活動頻度を確認する</li>
            <li>✅ 未成年の場合は保護者同意の流れを確認する</li>
            <li>✅ 契約期間、報酬、物販バックの有無を確認する</li>
          </ul>
        </section>
      </article>
    </main>
  );
}
