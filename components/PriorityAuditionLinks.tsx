import Link from "next/link";
import type { Audition } from "@/lib/auditions";

const prioritySlugs = [
  "audition-plus-2026091260",
  "audition-plus-2026091261",
  "audition-plus-2026091156",
  "audition-plus-2026091159",
  "audition-plus-2026091158",
  "bellicism-art-factory-new-member-2026",
  "blue-music-kawaii-idol-audition-2026",
  "buddha-tokyo-new-member-2026",
  "goodbye-my-ghost-new-member-2026",
  "heroine-journey-additional-member-2026",
  "kyuntahi-new-member-2026",
  "mofu-comet-new-member-2026",
  "nagoya-kamen-gakuen-new-member-2026",
  "nagoya-lonlium-new-member-2026",
  "nagoya-maycry-liz-new-member-2026",
  "novastrum-loud-rock-member-2026",
  "osaka-fille-mimi-melucharm-audition-2026",
  "osaka-frontier-new-formation-member-2026",
  "panic-spoon-new-group-member-2026",
  "submission-1418328a-d8c4-4fa4-bebb-035cc756efeb",
  "audition-plus-2026081361"
];

export function PriorityAuditionLinks({ auditions }: { auditions: Audition[] }) {
  const auditionBySlug = new Map(auditions.map((audition) => [audition.slug, audition]));
  const priorityAuditions = prioritySlugs
    .map((slug) => auditionBySlug.get(slug))
    .filter((audition): audition is Audition => Boolean(audition));

  if (priorityAuditions.length === 0) return null;

  return (
    <nav className="mb-16 border-y border-slate-200 py-9" aria-label="新着・注目の募集中オーディション">
      <p className="editorial-kicker">Fresh & featured</p>
      <h2 className="section-heading mt-2">新着・注目の募集をすぐ確認</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
        最近追加された募集と、地域・条件別に注目されている募集中のオーディションです。
      </p>
      <div className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
        {priorityAuditions.map((audition) => (
          <Link
            key={audition.slug}
            href={`/idol-audition/${audition.slug}`}
            className="group flex min-h-14 items-center justify-between gap-4 border-t border-slate-200 py-3 text-sm font-black leading-6 text-slate-900 transition hover:text-pink-700"
          >
            <span>{audition.title}</span>
            <span className="shrink-0 transition group-hover:translate-x-1" aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
