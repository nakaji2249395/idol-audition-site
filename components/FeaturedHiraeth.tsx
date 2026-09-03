import Link from "next/link";
import { auditions } from "@/lib/auditions";
import { fetchApprovedAuditionBySlug } from "@/lib/submissions";

export async function FeaturedHiraeth() {
  const dbAudition = await fetchApprovedAuditionBySlug("hiraeth-tokyo-new-member");
  const staticAudition = auditions.find((item) => item.slug === "hiraeth-tokyo-new-member");
  const audition = dbAudition ?? staticAudition;

  if (!audition) {
    return null;
  }

  return (
    <section className="mb-14 overflow-hidden rounded-[20px] border border-slate-950 bg-white shadow-[4px_5px_0_#241b24]">
      <div className="grid gap-0 md:grid-cols-[1.05fr_0.95fr]">
        <div className="relative aspect-[16/10] border-b border-slate-950 bg-pink-50 md:aspect-auto md:min-h-72 md:border-b-0 md:border-r">
          {audition.imageUrl ? (
            <img
              src={audition.imageUrl}
              alt={`${audition.title}の画像`}
            className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-4 text-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-pink-600">Featured</p>
                <p className="mt-1 text-xl font-black text-slate-950">
                  {audition.group}
                </p>
              </div>
            </div>
          )}

          <div className="absolute left-4 top-4 rotate-[-3deg] rounded-lg border border-slate-950 bg-pink-500 px-3 py-2 text-[11px] font-black text-white shadow-[2px_2px_0_#241b24]">
            編集部ピックアップ
          </div>
        </div>

        <div className="flex flex-col p-6 sm:p-8">
          <p className="editorial-kicker">Featured audition</p>

          <h2 className="mt-3 text-2xl font-black leading-tight tracking-[-0.04em] text-slate-950 sm:text-3xl">
            {audition.title}
          </h2>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
            {audition.summary}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {audition.features.slice(0, 5).map((feature) => (
              <span
                key={feature}
                className="rounded-full bg-pink-50 px-2.5 py-1 text-[11px] font-black text-pink-700"
              >
                {feature}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-end justify-between gap-4 border-t border-slate-200 pt-5">
            <p className="line-clamp-1 text-xs font-bold text-slate-500">
              {audition.area} / {audition.deadline}
            </p>

            <Link
              href={`/idol-audition/${audition.slug}`}
              className="shrink-0 rounded-full bg-pink-500 px-5 py-3 text-xs font-black text-white transition hover:bg-pink-700"
            >
              詳細を見る →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
