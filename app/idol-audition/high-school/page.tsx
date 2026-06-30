import type { Metadata } from "next";
import Link from "next/link";
import { AuditionCard } from "@/components/AuditionCard";
import { auditions } from "@/lib/auditions";

export const metadata: Metadata = {
  title: "高校生OKのアイドルオーディション一覧",
  description:
    "高校生OKのアイドルオーディションを探せます。未成年が応募前に確認すべき保護者同意、費用、活動時間、学業との両立も解説します。"
};

export default function HighSchoolAuditionPage() {
  const highSchoolAuditions = auditions.filter((audition) =>
    `${audition.features.join(" ")} ${audition.student}`.includes("高校生")
  );

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <Link href="/" className="text-sm font-bold text-slate-500 hover:text-pink-600">
        ← トップへ戻る
      </Link>

      <header className="mt-8 mb-10">
        <p className="text-sm font-bold text-pink-600">High School Student</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950">
          高校生OKのアイドルオーディション
        </h1>
        <p className="mt-4 max-w-3xl leading-8 text-slate-600">
          高校生がアイドルオーディションを受ける場合は、保護者同意、活動時間、費用、学校との両立を必ず確認しましょう。
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-3">
        {highSchoolAuditions.map((audition) => (
          <AuditionCard key={audition.slug} audition={audition} />
        ))}
      </div>
    </main>
  );
}
