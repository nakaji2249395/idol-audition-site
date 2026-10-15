import Link from "next/link";

export function TrainingGuidePromo({ className = "" }: { className?: string }) {
  return (
    <aside
      className={`grid gap-6 border-y border-slate-200 py-8 md:grid-cols-[1fr_auto] md:items-center ${className}`}
      aria-labelledby="training-guide-title"
    >
      <div>
        <p className="editorial-kicker">Audition preparation</p>
        <h2 id="training-guide-title" className="mt-2 text-2xl font-black leading-tight text-slate-950">
          歌唱・ダンス審査の準備を始めたい方へ
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          未経験者が練習を始める順番、独学とスクールの違い、無料体験で確認したいポイントを整理しました。
        </p>
      </div>
      <Link
        href="/idol-audition/training-school"
        className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-950 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-pink-50"
      >
        審査対策ガイドを読む
      </Link>
    </aside>
  );
}
