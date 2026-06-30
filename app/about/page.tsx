import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "アイドルオーディションナビについて",
  description:
    "アイドルオーディションナビは、アイドルになりたい方が安心して募集情報を比較できることを目指したオーディション検索サイトです。"
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <Link href="/" className="text-sm font-bold text-slate-500 hover:text-pink-600">
        ← トップへ戻る
      </Link>

      <article className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <p className="text-sm font-bold text-pink-600">About</p>
        <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950">
          アイドルオーディションナビについて
        </h1>
        <p className="mt-6 leading-8 text-slate-600">
          アイドルオーディションナビは、アイドルになりたい方が安心して募集情報を比較できることを目指したサイトです。
        </p>

        <h2 className="mt-10 text-2xl font-black text-slate-950">大切にしていること</h2>
        <div className="mt-5 grid gap-4">
          {[
            "費用が分かりやすいこと",
            "活動地域が分かりやすいこと",
            "未経験でも応募できるか分かること",
            "応募方法が明確であること",
            "怪しい募集を避けるための情報があること"
          ].map((item) => (
            <div key={item} className="rounded-2xl bg-slate-50 p-4 font-bold text-slate-800">
              {item}
            </div>
          ))}
        </div>

        <p className="mt-10 leading-8 text-slate-600">
          掲載内容は、応募者が判断しやすいように、費用・報酬・活動条件・応募方法などをできる限り整理して掲載していきます。
        </p>
      </article>
    </main>
  );
}
