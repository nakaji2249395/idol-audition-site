import Link from "next/link";
import { AuditionCard } from "@/components/AuditionCard";
import { SearchIntentLinks, type SearchIntentLink } from "@/components/SearchIntentLinks";
import type { Audition } from "@/lib/auditions";
import { siteConfig } from "@/lib/site";

export type AudiencePageContent = {
  canonical: string;
  eyebrow: string;
  title: string;
  lead: string;
  listTitle: string;
  guideTitle: string;
  guideParagraphs: string[];
  checks: string[];
  faq: { question: string; answer: string }[];
  relatedLinks?: SearchIntentLink[];
  guideSections?: {
    title: string;
    paragraphs: string[];
    exampleTitle?: string;
    example?: string;
  }[];
};

export type AudiencePageStat = {
  value: number;
  label: string;
  href?: string;
};

const ageLinks = [
  { href: "/idol-audition/high-school", label: "高校生OK" },
  { href: "/idol-audition/20s", label: "20代" },
  { href: "/idol-audition/30s", label: "30代" },
  { href: "/idol-audition/age-limit-none", label: "年齢制限なし" },
  { href: "/idol-audition/working-adult", label: "社会人向け" }
];

export function AudienceAuditionPage({
  content,
  auditions,
  stats = []
}: {
  content: AudiencePageContent;
  auditions: Audition[];
  stats?: AudiencePageStat[];
}) {
  const pageUrl = `${siteConfig.url}${content.canonical}`;
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: content.listTitle,
    numberOfItems: auditions.length,
    itemListElement: auditions.map((audition, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: audition.title,
      url: `${siteConfig.url}/idol-audition/${audition.slug}`
    }))
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "トップ", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "アイドルオーディション一覧",
        item: `${siteConfig.url}/idol-audition`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "年齢・生活条件から探す",
        item: `${siteConfig.url}/idol-audition/age`
      },
      { "@type": "ListItem", position: 4, name: content.title, item: pageUrl }
    ]
  };

  return (
    <main className="mx-auto max-w-[1180px] px-4 py-10 sm:px-6 sm:py-14">
      {[itemListJsonLd, faqJsonLd, breadcrumbJsonLd].map((jsonLd, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ))}

      <nav className="text-sm font-bold text-slate-500" aria-label="パンくずリスト">
        <Link href="/" className="hover:text-pink-600">トップ</Link>
        <span className="mx-2">/</span>
        <Link href="/idol-audition" className="hover:text-pink-600">募集一覧</Link>
        <span className="mx-2">/</span>
        <Link href="/idol-audition/age" className="hover:text-pink-600">年齢別</Link>
      </nav>

      <header className="mt-8 grid gap-8 border-b border-slate-200 pb-12 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="editorial-kicker">{content.eyebrow}</p>
          <h1 className="mt-3 break-words text-4xl font-black leading-[1.08] tracking-[-0.055em] text-slate-950 sm:break-keep sm:text-5xl lg:text-6xl">
            {content.title}
          </h1>
          <p className="mt-5 max-w-3xl leading-8 text-slate-600">{content.lead}</p>
          <p className="mt-4 text-xs font-bold text-slate-500">2026年9月更新・募集中の掲載情報を集計</p>
        </div>
        <div className="w-fit rotate-[2deg] rounded-lg border border-slate-950 bg-pink-500 px-5 py-3 text-center text-white shadow-[3px_3px_0_#241b24]">
          <span className="block text-3xl font-black">{auditions.length}</span>
          <span className="text-[10px] font-black tracking-wider">MATCHES</span>
        </div>
      </header>

      {stats.length ? (
        <dl className={`grid border-b border-slate-200 ${stats.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
          {stats.map((stat) => (
            <div key={stat.label} className="border-t border-slate-200 px-1 py-5 sm:border-l sm:px-6 first:sm:border-l-0 first:sm:pl-0">
              <dt className="text-2xl font-black text-slate-950">
                {stat.href ? (
                  <Link href={stat.href} className="transition hover:text-pink-700">
                    {stat.value}<span className="ml-1 text-xs">件</span>
                  </Link>
                ) : (
                  <>{stat.value}<span className="ml-1 text-xs">件</span></>
                )}
              </dt>
              <dd className="mt-1 text-xs font-bold text-slate-500">{stat.label}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      <nav aria-label="年齢・生活条件" className="mt-7 flex flex-wrap gap-2">
        {ageLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-full border px-4 py-2 text-xs font-black transition ${
              link.href === content.canonical
                ? "border-pink-500 bg-pink-500 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-pink-300 hover:text-pink-700"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <section className="mb-16 mt-12">
        <p className="editorial-kicker">Now recruiting</p>
        <h2 className="section-heading mt-2">{content.listTitle}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          各募集の年齢条件は、必ず詳細ページと主催者の最新案内で確認してください。
        </p>
        {auditions.length > 0 ? (
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {auditions.map((audition) => (
              <AuditionCard key={audition.slug} audition={audition} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 text-slate-600">
            現在、条件に一致する募集を確認中です。
          </div>
        )}
      </section>

      {content.relatedLinks?.length ? (
        <SearchIntentLinks
          title={`${content.title.replace(/\s+/g, " ")}を条件別に探す`}
          description="経験、費用、地域など、応募前に気になる条件を組み合わせて比較できます。"
          links={content.relatedLinks}
        />
      ) : null}

      <article className={`paper-panel p-6 sm:p-10 ${content.relatedLinks?.length ? "mt-16" : ""}`}>
        <p className="editorial-kicker">Age guide</p>
        <h2 className="section-heading mt-3">{content.guideTitle}</h2>
        {content.guideParagraphs.map((paragraph) => (
          <p key={paragraph} className="mt-5 leading-8 text-slate-600">{paragraph}</p>
        ))}

        {content.guideSections?.map((section, index) => (
          <section key={section.title} className="mt-10 border-t border-slate-200 pt-8">
            <div className="grid gap-5 lg:grid-cols-[3rem_1fr]">
              <span className="text-sm font-black text-pink-700">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="text-2xl font-black leading-tight text-slate-950">{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-4 leading-8 text-slate-600">{paragraph}</p>
                ))}
                {section.example ? (
                  <div className="mt-6 border-l-4 border-pink-500 bg-pink-50 p-5 sm:p-6">
                    <h3 className="text-sm font-black text-slate-950">{section.exampleTitle ?? "回答例"}</h3>
                    <p className="mt-3 whitespace-pre-line leading-8 text-slate-700">{section.example}</p>
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        ))}

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">応募前のチェックポイント</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {content.checks.map((check) => (
              <div key={check} className="flex gap-3 border-t border-slate-200 py-4 leading-7 text-slate-700">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-pink-100 text-xs font-black text-pink-700">✓</span>
                {check}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">よくある質問</h2>
          <div className="mt-5 grid gap-4">
            {content.faq.map((item) => (
              <div key={item.question} className="rounded-2xl border border-slate-200 p-5">
                <h3 className="font-black text-slate-950">Q. {item.question}</h3>
                <p className="mt-3 leading-8 text-slate-600">A. {item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/idol-audition/age" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-pink-600">
            年齢・生活条件から探す
          </Link>
          <Link href="/idol-audition" className="rounded-full border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 hover:text-pink-600">
            募集をすべて見る
          </Link>
        </div>
      </article>
    </main>
  );
}
