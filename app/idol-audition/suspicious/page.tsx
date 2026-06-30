import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "アイドルオーディションは怪しい？見分け方を解説",
  description:
    "アイドルオーディションが怪しいか不安な方へ。登録料、レッスン費、契約書、運営会社、面接場所など応募前に確認すべきポイントを解説します。"
};

const checks = [
  "登録料・レッスン費・撮影費など、合格後にかかる費用が明記されているか",
  "運営会社名、所在地、代表者、公式SNS、過去の活動実績が確認できるか",
  "契約期間、報酬、物販バック、禁止事項が書面で確認できるか",
  "面接場所が不自然ではないか。未成年の場合は保護者同意の案内があるか",
  "応募を急かしすぎたり、高額な費用をすぐ求めたりしていないか"
];

export default function SuspiciousPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <Link href="/" className="text-sm font-bold text-slate-500 hover:text-pink-600">
        ← トップへ戻る
      </Link>

      <article className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <p className="text-sm font-bold text-pink-600">Safety Guide</p>
        <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950">
          アイドルオーディションは怪しい？応募前に見るべきポイント
        </h1>
        <p className="mt-6 leading-8 text-slate-600">
          アイドルオーディションを探すときに大事なのは、募集文の華やかさだけで判断しないことです。
          費用、契約、運営会社、活動実績がきちんと確認できるかを見ましょう。
        </p>

        <h2 className="mt-10 text-2xl font-black text-slate-950">
          怪しい募集を避けるチェックリスト
        </h2>
        <ul className="mt-5 grid gap-4">
          {checks.map((check) => (
            <li key={check} className="rounded-2xl bg-slate-50 p-4 leading-8 text-slate-700">
              ✅ {check}
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-3xl bg-pink-50 p-6">
          <h2 className="text-xl font-black text-slate-950">
            安心して探すなら、費用と運営情報が見える募集を選ぶ
          </h2>
          <p className="mt-3 leading-8 text-slate-700">
            当サイトでは、登録料・レッスン費・活動地域・未経験可否などをできるだけ明記し、
            応募者が比較しやすい形で掲載していきます。
          </p>
          <Link
            href="/idol-audition"
            className="mt-5 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white hover:bg-pink-600"
          >
            募集中のオーディションを見る
          </Link>
        </div>
      </article>
    </main>
  );
}
