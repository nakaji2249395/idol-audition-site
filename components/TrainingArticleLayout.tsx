import Link from "next/link";
import { siteConfig } from "@/lib/site";

type TrainingArticleLayoutProps = {
  eyebrow: string;
  title: string;
  lead: string;
  canonical: string;
  children: React.ReactNode;
};

export function TrainingArticleLayout({
  eyebrow,
  title,
  lead,
  canonical,
  children
}: TrainingArticleLayoutProps) {
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
      { "@type": "ListItem", position: 3, name: title, item: `${siteConfig.url}${canonical}` }
    ]
  };

  return (
    <main className="mx-auto max-w-[960px] px-4 py-10 sm:px-6 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }}
      />
      <nav className="text-sm font-bold text-slate-500" aria-label="パンくずリスト">
        <Link href="/" className="hover:text-pink-700">トップ</Link>
        <span className="mx-2">/</span>
        <Link href="/idol-audition" className="hover:text-pink-700">募集一覧</Link>
        <span className="mx-2">/</span>
        <span>審査対策</span>
      </nav>

      <article className="mt-8">
        <header className="border-b border-slate-200 pb-10">
          <p className="editorial-kicker">{eyebrow}</p>
          <h1 className="mt-3 text-4xl font-black leading-[1.08] tracking-[-0.05em] text-slate-950 sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">{lead}</p>
          <p className="mt-4 text-xs font-bold text-slate-500">2026年10月更新</p>
          <p className="mt-2 text-[11px] leading-5 text-slate-400">PR：本ページには広告が含まれます。</p>
        </header>

        <div className="mt-10 space-y-12">{children}</div>

        <div className="mt-14 grid gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2">
          <Link
            href="/idol-audition"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:bg-pink-700"
          >
            募集中のオーディションを見る
          </Link>
          <Link
            href="/idol-audition/how-to-apply"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-black text-slate-800 transition hover:border-pink-400 hover:text-pink-700"
          >
            自己PR・応募文の書き方
          </Link>
        </div>
      </article>
    </main>
  );
}
