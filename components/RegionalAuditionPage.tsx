import Link from "next/link";
import { AuditionCard } from "@/components/AuditionCard";
import { getAllAuditions } from "@/lib/auditionData";
import {
  auditionRegions,
  isAuditionInRegion,
  type AuditionRegion
} from "@/lib/auditionDiscovery";
import { siteConfig } from "@/lib/site";

type RegionPageContent = {
  region: AuditionRegion;
  eyebrow: string;
  title: string;
  lead: string;
  listTitle: string;
  guideTitle: string;
  guideParagraphs: string[];
  areas: string[];
  checks: string[];
  faq: { question: string; answer: string }[];
};

export async function RegionalAuditionPage({ content }: { content: RegionPageContent }) {
  const allAuditions = await getAllAuditions();
  const regionalAuditions = allAuditions.filter((audition) =>
    isAuditionInRegion(audition, content.region)
  );
  const region = auditionRegions[content.region];
  const pageUrl = `${siteConfig.url}${region.href}`;
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: content.listTitle,
    itemListElement: regionalAuditions.map((audition, index) => ({
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
      { "@type": "ListItem", position: 3, name: content.title, item: pageUrl }
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
        <span>{region.label}</span>
      </nav>

      <header className="mt-8 grid gap-8 border-b border-slate-200 pb-12 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
        <p className="editorial-kicker">{content.eyebrow}</p>
        <h1 className="mt-3 text-5xl font-black leading-[1.05] tracking-[-0.055em] text-slate-950 sm:text-6xl">
          {content.title}
        </h1>
        <p className="mt-5 max-w-3xl leading-8 text-slate-600">{content.lead}</p>
        </div>
        <p className="w-fit rotate-[2deg] rounded-lg border border-slate-950 bg-pink-500 px-5 py-3 text-center font-black text-white shadow-[3px_3px_0_#241b24]">
          <span className="block text-3xl">{regionalAuditions.length}</span>
          <span className="text-[10px] tracking-wider">LISTINGS</span>
        </p>
      </header>

      <section className="mt-12 mb-16">
        <p className="editorial-kicker">Now recruiting</p>
        <h2 className="section-heading mt-2">{content.listTitle}</h2>
        {regionalAuditions.length > 0 ? (
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {regionalAuditions.map((audition) => (
              <AuditionCard key={audition.slug} audition={audition} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 text-slate-600">
            現在この地域の募集を確認中です。最新情報は
            <Link href="/idol-audition" className="font-bold text-pink-600 hover:underline">
              オーディション一覧
            </Link>
            からご確認ください。
          </div>
        )}
      </section>

      <article className="paper-panel p-6 sm:p-10">
        <p className="editorial-kicker">Area guide</p>
        <h2 className="section-heading mt-3">{content.guideTitle}</h2>
        {content.guideParagraphs.map((paragraph) => (
          <p key={paragraph} className="mt-5 leading-8 text-slate-600">{paragraph}</p>
        ))}

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">主な活動エリア</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {content.areas.map((area) => (
              <span key={area} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
                {area}
              </span>
            ))}
          </div>
        </section>

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
          <Link href="/idol-audition/mikeiken" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-pink-600">
            未経験OKの募集を見る
          </Link>
          <Link href="/idol-audition/free" className="rounded-full border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 hover:text-pink-600">
            費用なしの募集を見る
          </Link>
        </div>
      </article>
    </main>
  );
}
