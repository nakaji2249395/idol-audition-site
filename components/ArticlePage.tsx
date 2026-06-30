import Link from "next/link";

type ArticlePageProps = {
  label: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

export function ArticlePage({ label, title, description, children }: ArticlePageProps) {
  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <Link href="/" className="text-sm font-bold text-slate-500 hover:text-pink-600">
        ← トップへ戻る
      </Link>

      <article className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <p className="text-sm font-bold text-pink-600">{label}</p>
        <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950">
          {title}
        </h1>
        <p className="mt-6 leading-8 text-slate-600">{description}</p>

        <div className="prose prose-slate mt-10 max-w-none prose-headings:font-black prose-h2:mt-10 prose-p:leading-8 prose-li:leading-8">
          {children}
        </div>

        <div className="mt-10 rounded-3xl bg-slate-950 p-6 text-white">
          <h2 className="text-xl font-black">募集中のアイドルオーディションを探す</h2>
          <p className="mt-3 leading-8 text-slate-200">
            費用、活動地域、未経験可否、応募方法を確認しながら、自分に合う募集を探せます。
          </p>
          <Link
            href="/idol-audition"
            className="mt-5 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-950 hover:text-pink-600"
          >
            オーディション一覧を見る
          </Link>
        </div>
      </article>
    </main>
  );
}
