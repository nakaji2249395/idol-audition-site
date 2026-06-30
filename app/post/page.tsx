import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "アイドルオーディション掲載希望の方へ",
  description:
    "アイドルオーディションナビへの掲載を希望する運営者・事務所向けページです。募集条件、費用、応募方法、運営情報を明記して掲載できます。"
};

const requiredItems = [
  "グループ名・プロジェクト名",
  "募集タイトル",
  "活動地域",
  "募集年齢",
  "未経験可否",
  "費用の有無",
  "報酬・バック率",
  "レッスン内容",
  "選考フロー",
  "応募方法 URL",
  "運営会社・公式SNS",
  "未成年応募時の保護者同意"
];

export default function PostPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <Link href="/" className="text-sm font-bold text-slate-500 hover:text-pink-600">
        ← トップへ戻る
      </Link>

      <article className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <p className="text-sm font-bold text-pink-600">For Organizers</p>
        <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950">
          アイドルオーディション掲載希望の方へ
        </h1>
        <p className="mt-6 leading-8 text-slate-600">
          アイドルオーディションナビでは、応募者が安心して比較できるように、費用・活動地域・応募方法・運営情報が分かる募集情報の掲載を目指しています。
        </p>

        <h2 className="mt-10 text-2xl font-black text-slate-950">掲載時に必要な情報</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {requiredItems.map((item) => (
            <div key={item} className="rounded-2xl bg-slate-50 p-4 font-bold text-slate-800">
              {item}
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl bg-pink-50 p-6">
          <h2 className="text-xl font-black text-slate-950">応募方法の記載例</h2>
          <p className="mt-3 leading-8 text-slate-700">
            次のいずれかの方法でご応募ください。
          </p>
          <div className="mt-4 rounded-2xl bg-white p-5 text-sm leading-8 text-slate-700">
            <p>①LINEにて応募</p>
            <p>②フォームより応募</p>
            <p>③メールにて応募</p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl bg-slate-950 p-6 text-white">
          <h2 className="text-xl font-black">掲載受付フォームは準備中です</h2>
          <p className="mt-3 leading-8 text-slate-200">
            現在、掲載希望フォームを準備しています。先行掲載をご希望の場合は、運営者まで直接お問い合わせください。
          </p>
        </div>
      </article>
    </main>
  );
}
