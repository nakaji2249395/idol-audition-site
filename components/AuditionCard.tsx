import Link from "next/link";
import type { Audition } from "@/lib/auditions";
import { fetchApprovedAuditionBySlug } from "@/lib/submissions";

async function getDisplayAudition(audition: Audition) {
  if (audition.imageUrl) {
    return audition;
  }

  const dbAudition = await fetchApprovedAuditionBySlug(audition.slug);

  return dbAudition ?? audition;
}

export async function AuditionCard({ audition }: { audition: Audition }) {
  const displayAudition = await getDisplayAudition(audition);

  return (
    <Link
      href={`/idol-audition/${displayAudition.slug}`}
      className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-pink-100 via-white to-slate-100">
        {displayAudition.imageUrl ? (
          <img
            src={displayAudition.imageUrl}
            alt={`${displayAudition.title}の画像`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center">
            <div>
              <p className="text-sm font-black text-pink-600">AUDITION</p>
              <p className="mt-2 text-xl font-black text-slate-950">
                {displayAudition.group}
              </p>
            </div>
          </div>
        )}

        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-slate-900 shadow-sm backdrop-blur">
          {displayAudition.area}
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2">
          {displayAudition.features.slice(0, 4).map((feature) => (
            <span
              key={feature}
              className="rounded-full bg-pink-50 px-3 py-1 text-xs font-bold text-pink-700"
            >
              {feature}
            </span>
          ))}
        </div>

        <p className="mt-5 text-sm font-bold text-pink-600">
          {displayAudition.group}
        </p>

        <h3 className="mt-2 text-xl font-black leading-snug text-slate-950">
          {displayAudition.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
          {displayAudition.summary}
        </p>

        <div className="mt-5 grid gap-2 text-sm text-slate-600">
          <p>
            <span className="font-bold text-slate-900">締切：</span>
            {displayAudition.deadline}
          </p>
          <p>
            <span className="font-bold text-slate-900">費用：</span>
            {displayAudition.cost}
          </p>
        </div>

        <div className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white transition group-hover:bg-pink-600">
          詳細を見る
        </div>
      </div>
    </Link>
  );
}
