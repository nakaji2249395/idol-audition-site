import Link from "next/link";

type ArticlePageProps = {
  label: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

export function ArticlePage({ label, title, description, children }: ArticlePageProps) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <Link href="/" className="text-sm font-bold text-slate-500 hover:text-pink-600">
        ← トップへ戻る
      </Link>

      <article className="paper-panel mt-8 overflow-hidden p-6 sm:p-10">
        <p className="editorial-kicker">{label}</p>
        <h1 className="mt-3 text-4xl font-black leading-[1.08] tracking-[-0.045em] text-slate-950 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 leading-8 text-slate-600">{description}</p>

        <div className="prose prose-slate mt-10 max-w-none prose-headings:font-black prose-h2:mt-10 prose-p:leading-8 prose-li:leading-8">
          {children}
        </div>

        <div className="mt-12 border-t border-slate-200 bg-pink-50 p-6 sm:p-8">
          <h2 className="text-xl font-black">募集中のアイドルオーディションを探す</h2>
          <p className="mt-3 leading-8 text-slate-700">
            費用、活動地域、未経験可否、応募方法を確認しながら、自分に合う募集を探せます。
          </p>
          <Link
            href="/idol-audition"
            className="mt-5 inline-flex rounded-full bg-pink-500 px-6 py-3 text-sm font-black text-white transition hover:bg-pink-700"
          >
            オーディション一覧を見る
          </Link>
        </div>
      </article>
    </main>
  );
}
