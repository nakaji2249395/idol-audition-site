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
    <section className="mb-16 overflow-hidden rounded-[2rem] border border-pink-200 bg-white shadow-sm">
      <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-64 bg-gradient-to-br from-pink-100 via-white to-slate-100">
          {audition.imageUrl ? (
            <img
              src={audition.imageUrl}
              alt={`${audition.title}の画像`}
              className="h-full min-h-64 w-full object-cover"
            />
          ) : (
            <div className="flex h-full min-h-64 items-center justify-center px-6 text-center">
              <div>
                <p className="text-sm font-black text-pink-600">FEATURED AUDITION</p>
                <p className="mt-3 text-3xl font-black text-slate-950">
                  {audition.group}
                </p>
              </div>
            </div>
          )}

          <div className="absolute left-5 top-5 rounded-full bg-pink-600 px-4 py-2 text-xs font-black text-white shadow-sm">
            注目オーディション
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-sm font-black text-pink-600">{audition.group}</p>

          <h2 className="mt-3 text-3xl font-black leading-tight text-slate-950">
            {audition.title}
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            {audition.summary}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {audition.features.slice(0, 6).map((feature) => (
              <span
                key={feature}
                className="rounded-full bg-pink-50 px-3 py-1 text-xs font-black text-pink-700"
              >
                {feature}
              </span>
            ))}
          </div>

          <div className="mt-6 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <span className="font-black text-slate-500">活動地域</span>
              <p className="mt-1 font-black text-slate-950">{audition.area}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <span className="font-black text-slate-500">費用</span>
              <p className="mt-1 font-black text-slate-950">{audition.cost}</p>
            </div>
          </div>

          <Link
            href={`/idol-audition/${audition.slug}`}
            className="mt-7 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:bg-pink-600"
          >
            詳細を見る
          </Link>
        </div>
      </div>
    </section>
  );
}
