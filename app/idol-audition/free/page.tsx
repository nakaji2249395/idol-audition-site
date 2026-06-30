import type { Metadata } from "next";
import Link from "next/link";
import { AuditionCard } from "@/components/AuditionCard";
import { auditions } from "@/lib/auditions";

export const metadata: Metadata = {
  title: "費用なしのアイドルオーディション一覧",
  description:
    "費用なし・登録料なし・レッスン費無料のアイドルオーディションを探せます。応募前に確認したい費用項目も解説します。"
};

export default function FreeAuditionPage() {
  const freeAuditions = auditions.filter((audition) =>
    `${audition.cost} ${audition.features.join(" ")}`.includes("なし") ||
    `${audition.cost} ${audition.features.join(" ")}`.includes("無料")
  );

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <Link href="/" className="text-sm font-bold text-slate-500 hover:text-pink-600">
        ← トップへ戻る
      </Link>

      <header className="mt-8 mb-10">
        <p className="text-sm font-bold text-pink-600">No Cost / Free Lesson</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950">
          費用なしのアイドルオーディション
        </h1>
        <p className="mt-4 max-w-3xl leading-8 text-slate-600">
          登録料なし、レッスン費無料、費用負担が明記されているアイドル募集を探せます。
          応募無料でも、合格後の費用が発生する場合があるため、詳細ページで確認しましょう。
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-3">
        {freeAuditions.map((audition) => (
          <AuditionCard key={audition.slug} audition={audition} />
        ))}
      </div>
    </main>
  );
}
