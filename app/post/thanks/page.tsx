import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "掲載依頼を受け付けました｜アイドルオーディションナビ",
  description:
    "アイドルオーディションナビへの掲載依頼を受け付けました。内容確認後、掲載可否を判断いたします。",
  robots: {
    index: false,
    follow: false
  }
};

export default function ThanksPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-5 py-16">
      <section className="w-full rounded-[1.6rem] border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-10">
        <p className="text-xs font-black text-pink-600">Submitted</p>

        <h1 className="mt-3 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
          掲載依頼を受け付けました
        </h1>

        <p className="mt-5 text-sm leading-7 text-slate-600">
          ご入力いただいた内容を確認し、問題がない場合はサイト上に掲載します。
          修正や確認が必要な場合は、担当者メールアドレス宛にご連絡する場合があります。
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white hover:bg-pink-600"
          >
            トップへ戻る
          </Link>

          <Link
            href="/post"
            className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-700 hover:text-pink-600"
          >
            もう一件送る
          </Link>
        </div>
      </section>
    </main>
  );
}
