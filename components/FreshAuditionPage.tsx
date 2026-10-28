import Link from "next/link";
import { AuditionCard } from "@/components/AuditionCard";
import { SearchIntentLinks } from "@/components/SearchIntentLinks";
import type { Audition } from "@/lib/auditions";
import { formatJapanDate } from "@/lib/auditionFreshness";
import { siteConfig } from "@/lib/site";

type FreshAuditionPageProps = {
  canonical: string;
  eyebrow: string;
  title: string;
  lead: string;
  listTitle: string;
  emptyMessage: string;
  auditions: Audition[];
  guideTitle: string;
  guideParagraphs: string[];
};

const relatedLinks = [
  {
    href: "/idol-audition/new",
    label: "新着オーディション",
    description: "最近掲載された募集から確認する"
  },
  {
    href: "/idol-audition/deadline-this-month",
    label: "今月締切の募集",
    description: "今月中に応募が必要な募集を確認する"
  },
  {
    href: "/idol-audition/deadline-soon",
    label: "締切7日以内の募集",
    description: "応募期限が近い募集を優先して確認する"
  },
  {
    href: "/idol-audition/mikeiken",
    label: "未経験・初心者OK",
    description: "歌やダンスが初めてでも応募しやすい募集を探す"
  },
  {
    href: "/idol-audition/high-school",
    label: "高校生OK",
    description: "保護者同意や学業との両立条件も確認する"
  },
  {
    href: "/idol-audition/free",
    label: "費用なし・負担が少ない募集",
    description: "応募費やレッスン費の条件で比較する"
  }
];

function safeJson(value: object) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function FreshAuditionPage({
  canonical,
  eyebrow,
  title,
  lead,
  listTitle,
  emptyMessage,
  auditions,
  guideTitle,
  guideParagraphs
}: FreshAuditionPageProps) {
  const pageUrl = `${siteConfig.url}${canonical}`;
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listTitle,
    numberOfItems: auditions.length,
    itemListElement: auditions.map((audition, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: audition.title,
      url: `${siteConfig.url}/idol-audition/${audition.slug}`
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
      { "@type": "ListItem", position: 3, name: title, item: pageUrl }
    ]
  };

  return (
    <main className="mx-auto max-w-[1180px] px-4 py-10 sm:px-6 sm:py-14">
      {[itemListJsonLd, breadcrumbJsonLd].map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJson(data) }}
        />
      ))}

      <nav className="text-sm font-bold text-slate-500" aria-label="パンくずリスト">
        <Link href="/" className="hover:text-pink-600">トップ</Link>
        <span className="mx-2">/</span>
        <Link href="/idol-audition" className="hover:text-pink-600">募集一覧</Link>
        <span className="mx-2">/</span>
        <span>{title}</span>
      </nav>

      <header className="mt-8 grid gap-8 border-b border-slate-200 pb-12 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="editorial-kicker">{eyebrow}</p>
          <h1 className="mt-3 break-words text-4xl font-black leading-[1.08] tracking-[-0.055em] text-slate-950 sm:break-keep sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl leading-8 text-slate-600">{lead}</p>
          <Link href="/idol-audition" className="mt-3 inline-flex min-h-11 items-center text-sm font-bold underline">全国の募集中アイドルオーディションを地域・年齢で比較 →</Link>
          <p className="mt-4 text-xs font-bold text-slate-500">{formatJapanDate()}更新・掲載情報を毎日確認</p>
        </div>
        <p className="w-fit rotate-[2deg] rounded-lg border border-slate-950 bg-pink-500 px-5 py-3 text-center font-black text-white shadow-[3px_3px_0_#241b24]">
          <span className="block text-3xl">{auditions.length}</span>
          <span className="text-[10px] tracking-wider">LISTINGS</span>
        </p>
      </header>

      <section className="mb-16 mt-12">
        <p className="editorial-kicker">Current listings</p>
        <h2 className="section-heading mt-2">{listTitle}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          締切や応募条件は変更される場合があります。詳細ページと主催者の最新案内を確認してから応募してください。
        </p>
        {auditions.length ? (
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {auditions.map((audition) => (
              <AuditionCard key={audition.slug} audition={audition} />
            ))}
          </div>
        ) : (
          <div className="mt-7 border-y border-slate-200 bg-white px-5 py-8 text-sm leading-7 text-slate-600">
            {emptyMessage} 新しい募集が追加され次第、このページへ自動で反映します。
          </div>
        )}
      </section>

      <SearchIntentLinks
        title="応募時期・条件から募集を探す"
        description="新着、締切、経験、年齢、費用など、今の状況に合う入口から比較できます。"
        links={relatedLinks.filter((link) => link.href !== canonical)}
      />

      <article className="paper-panel mt-16 p-6 sm:p-10">
        <p className="editorial-kicker">Application guide</p>
        <h2 className="section-heading mt-3">{guideTitle}</h2>
        {guideParagraphs.map((paragraph) => (
          <p key={paragraph} className="mt-5 max-w-4xl leading-8 text-slate-600">{paragraph}</p>
        ))}
        <div className="mt-8 flex flex-wrap gap-3 border-t border-slate-200 pt-7">
          <Link href="/idol-audition" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-pink-600">
            募集中の情報をすべて見る
          </Link>
          <Link href="/idol-audition/how-to-apply" className="rounded-full border border-slate-300 px-5 py-3 text-sm font-black text-slate-700 transition hover:text-pink-700">
            応募文・自己PRの準備
          </Link>
        </div>
      </article>
    </main>
  );
}
