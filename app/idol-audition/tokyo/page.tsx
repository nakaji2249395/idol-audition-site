import type { Metadata } from "next";
import Link from "next/link";
import { AuditionCard } from "@/components/AuditionCard";
import { auditions } from "@/lib/auditions";
import { FeaturedHiraeth } from "@/components/FeaturedHiraeth";

export const metadata: Metadata = {
  title: "東京のアイドルオーディション一覧",
  description:
    "東京で活動できるアイドルオーディション一覧。未経験OK、費用なし、高校生OKなどの募集情報を比較できます。"
};

export default function TokyoAuditionPage() {
  const tokyoAuditions = auditions.filter((audition) => audition.area.includes("東京"));

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <Link href="/" className="text-sm font-bold text-slate-500 hover:text-pink-600">
        ← トップへ戻る
      </Link>
      <header className="mt-8 mb-10">
        <p className="text-sm font-bold text-pink-600">Tokyo</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950">
          東京のアイドルオーディション
        </h1>
        <p className="mt-4 max-w-3xl leading-8 text-slate-600">
          都内ライブハウスや東京近郊で活動したい方向けのアイドル募集情報です。
        </p>
      </header>

      <FeaturedHiraeth />

      <div className="grid gap-5 md:grid-cols-3">
        {tokyoAuditions.map((audition) => (
          <AuditionCard key={audition.slug} audition={audition} />
        ))}
      </div>
    </main>
  );
}
