import Link from "next/link";

export type SearchIntentLink = {
  href: string;
  label: string;
  description: string;
};

export function SearchIntentLinks({
  title = "条件を組み合わせて探す",
  description,
  links
}: {
  title?: string;
  description?: string;
  links: SearchIntentLink[];
}) {
  return (
    <section className="border-y border-slate-200 py-9" aria-labelledby="search-intent-links-title">
      <p className="editorial-kicker">Find your match</p>
      <h2 id="search-intent-links-title" className="mt-2 text-2xl font-black tracking-[-0.035em] text-slate-950">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{description}</p>
      ) : null}

      <div className="mt-6 grid gap-px overflow-hidden rounded-[18px] border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <Link
            key={`${link.href}-${link.label}`}
            href={link.href}
            className="group min-h-36 bg-white p-5 transition hover:bg-pink-50"
          >
            <h3 className="font-black leading-7 text-slate-950">{link.label}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{link.description}</p>
            <span className="mt-4 inline-block text-sm font-black text-pink-700 transition group-hover:translate-x-1">
              見る →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
