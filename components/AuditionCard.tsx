import Link from "next/link";
import type { Audition } from "@/lib/auditions";

function SafetyStars({ score }: { score: number }) {
  return (
    <span aria-label={`安心度 ${score} / 5`}>
      {"★".repeat(score)}
      <span className="text-slate-300">{"★".repeat(5 - score)}</span>
    </span>
  );
}

export function AuditionCard({ audition }: { audition: Audition }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 flex flex-wrap gap-2">
        {audition.features.map((feature) => (
          <span
            key={feature}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
          >
            {feature}
          </span>
        ))}
      </div>

      <p className="text-sm font-semibold text-pink-600">{audition.group}</p>
      <h3 className="mt-1 text-xl font-bold tracking-tight text-slate-950">
        {audition.title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{audition.summary}</p>

      <dl className="mt-5 grid gap-3 text-sm">
        <div className="flex justify-between gap-4 border-t border-slate-100 pt-3">
          <dt className="text-slate-500">活動地域</dt>
          <dd className="font-semibold text-slate-900">{audition.area}</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-slate-100 pt-3">
          <dt className="text-slate-500">費用</dt>
          <dd className="font-semibold text-slate-900">{audition.cost}</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-slate-100 pt-3">
          <dt className="text-slate-500">安心度</dt>
          <dd className="font-semibold text-amber-500">
            <SafetyStars score={audition.safetyScore} />
          </dd>
        </div>
      </dl>

      <Link
        href={`/idol-audition/${audition.slug}`}
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-pink-600"
      >
        詳細を見る
      </Link>
    </article>
  );
}
