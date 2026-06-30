import type { Metadata } from "next";
import Link from "next/link";
import { AuditionCard } from "@/components/AuditionCard";
import { auditions } from "@/lib/auditions";
import { FeaturedHiraeth } from "@/components/FeaturedHiraeth";

export const metadata: Metadata = {
  title: "未経験OKのアイドルオーディション一覧",
  description:
    "未経験OKのアイドルオーディション一覧。歌やダンスが初めてでも応募しやすい募集情報を比較できます。"
};

export default function MikeikenAuditionPage() {
  const mikeikenAuditions = auditions.filter((audition) =>
    audition.experience.includes("未経験")
  );

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <Link href="/" className="text-sm font-bold text-slate-500 hover:text-pink-600">
        ← トップへ戻る
      </Link>
      <header className="mt-8 mb-10">
        <p className="text-sm font-bold text-pink-600">Beginner Friendly</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950">
          未経験OKのアイドルオーディション
        </h1>
        <p className="mt-4 max-w-3xl leading-8 text-slate-600">
          歌やダンスの経験よりも、やる気・継続力・発信力を重視する募集をまとめています。
        </p>
      </header>

      <FeaturedHiraeth />

      <div className="grid gap-5 md:grid-cols-3">
        {mikeikenAuditions.map((audition) => (
          <AuditionCard key={audition.slug} audition={audition} />
        ))}
      </div>
    </main>
  );
}
