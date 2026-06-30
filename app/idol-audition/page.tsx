import type { Metadata } from "next";
import Link from "next/link";
import { AuditionCard } from "@/components/AuditionCard";
import { auditions } from "@/lib/auditions";

export const metadata: Metadata = {
  title: "アイドルオーディション一覧",
  description:
    "アイドルオーディション一覧。東京、未経験OK、高校生OK、費用なし、レッスン無料などの条件で募集情報を比較できます。"
};

export default function IdolAuditionPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <Link href="/" className="text-sm font-bold text-slate-500 hover:text-pink-600">
        ← トップへ戻る
      </Link>
      <header className="mt-8 mb-10">
        <p className="text-sm font-bold text-pink-600">Audition List</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950">
          アイドルオーディション一覧
        </h1>
        <p className="mt-4 max-w-3xl leading-8 text-slate-600">
          募集中のアイドルオーディションを、費用・活動地域・未経験可否・安心度で比較できます。
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-3">
        {auditions.map((audition) => (
          <AuditionCard key={audition.slug} audition={audition} />
        ))}
      </div>
    </main>
  );
}
