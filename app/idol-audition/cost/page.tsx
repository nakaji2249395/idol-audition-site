import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "アイドルオーディションの費用｜レッスン費・衣装代の注意点",
  description:
    "アイドルオーディションでお金はかかる？登録料、レッスン費、衣装代、撮影費、交通費など応募前に確認すべき費用項目を解説します。"
};

const costItems = [
  "登録料・入所金",
  "レッスン費",
  "衣装代",
  "宣材写真・撮影費",
  "交通費",
  "ライブノルマ",
  "物販・チェキのバック率"
];

export default function CostPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <Link href="/" className="text-sm font-bold text-slate-500 hover:text-pink-600">
        ← トップへ戻る
      </Link>

      <article className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <p className="text-sm font-bold text-pink-600">Cost Guide</p>
        <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950">
          アイドルオーディションでお金はかかる？費用の見方
        </h1>
        <p className="mt-6 leading-8 text-slate-600">
          アイドル活動では、募集によって費用負担の考え方が大きく違います。
          応募前に「何が無料で、何が自己負担なのか」を確認することが大切です。
        </p>

        <h2 className="mt-10 text-2xl font-black text-slate-950">
          応募前に確認したい費用項目
        </h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {costItems.map((item) => (
            <div key={item} className="rounded-2xl bg-slate-50 p-4 font-bold text-slate-800">
              {item}
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl bg-slate-950 p-6 text-white">
          <h2 className="text-xl font-black">
            「無料」と書かれていても、合格後の費用を確認
          </h2>
          <p className="mt-3 leading-8 text-slate-200">
            応募無料でも、合格後にレッスン費・衣装代・撮影費が発生する場合があります。
            募集ページだけで分からない場合は、面談時に必ず確認しましょう。
          </p>
          <Link
            href="/idol-audition"
            className="mt-5 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-950 hover:text-pink-600"
          >
            費用を比較して探す
          </Link>
        </div>
      </article>
    </main>
  );
}
