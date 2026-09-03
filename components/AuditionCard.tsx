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
      aria-label={`${displayAudition.title}の詳細を見る`}
      className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-[0_8px_24px_rgba(36,27,36,0.05)] transition duration-200 hover:-translate-y-[3px] hover:border-slate-300 hover:shadow-[0_14px_34px_rgba(36,27,36,0.09)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-slate-200 bg-pink-50">
        {displayAudition.imageUrl ? (
          <img
            src={displayAudition.imageUrl}
            alt={`${displayAudition.title}の画像`}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-4 text-center">
            <div>
              <span aria-hidden="true" className="text-4xl text-pink-500">✦</span>
              <p className="mt-3 text-[10px] font-black uppercase tracking-[0.2em] text-pink-700">Audition File</p>
              <p className="mt-2 text-lg font-black text-slate-950">
                {displayAudition.group}
              </p>
            </div>
          </div>
        )}

        <div className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)] truncate rounded-full border border-slate-200 bg-[#fffefd]/95 px-3 py-1.5 text-[11px] font-black text-slate-900">
          {displayAudition.area}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap gap-1.5">
          {displayAudition.features.slice(0, 3).map((feature) => (
            <span
              key={feature}
              className="rounded-full bg-pink-50 px-2.5 py-1 text-[10px] font-bold text-pink-700"
            >
              {feature}
            </span>
          ))}
        </div>

        <p className="mt-5 text-[11px] font-black uppercase tracking-[0.08em] text-pink-700">
          {displayAudition.group}
        </p>

        <h3 className="mt-2 line-clamp-2 text-xl font-black leading-snug tracking-[-0.035em] text-slate-950">
          {displayAudition.title}
        </h3>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
          {displayAudition.summary}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-slate-200 pt-5 text-xs">
          <p className="min-w-0 line-clamp-1 text-slate-600">
            <span className="font-black text-slate-900">締切</span> {displayAudition.deadline}
          </p>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-slate-950 bg-white text-base font-black text-slate-950 transition group-hover:bg-pink-500 group-hover:text-white">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
