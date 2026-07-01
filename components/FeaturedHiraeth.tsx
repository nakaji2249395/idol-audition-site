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
    <section className="mb-10 overflow-hidden rounded-[1.6rem] border border-pink-200 bg-white shadow-sm">
      <div className="grid gap-0 md:grid-cols-[0.85fr_1.15fr]">
        <div className="relative aspect-[16/9] bg-gradient-to-br from-pink-100 via-white to-slate-100 md:aspect-auto md:min-h-56">
          {audition.imageUrl ? (
            <img
              src={audition.imageUrl}
              alt={`${audition.title}の画像`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-4 text-center">
              <div>
                <p className="text-xs font-black text-pink-600">FEATURED</p>
                <p className="mt-1 text-xl font-black text-slate-950">
                  {audition.group}
                </p>
              </div>
            </div>
          )}

          <div className="absolute left-3 top-3 rounded-full bg-pink-600 px-3 py-1.5 text-[11px] font-black text-white shadow-sm">
            注目
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <p className="text-xs font-black text-pink-600">注目オーディション</p>

          <h2 className="mt-1.5 line-clamp-2 text-xl font-black leading-snug text-slate-950 sm:text-2xl">
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

          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="line-clamp-1 text-xs font-bold text-slate-500">
              {audition.area} / {audition.deadline}
            </p>

            <Link
              href={`/idol-audition/${audition.slug}`}
              className="shrink-0 rounded-full bg-slate-950 px-4 py-2.5 text-xs font-black text-white transition hover:bg-pink-600"
            >
              詳細
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
