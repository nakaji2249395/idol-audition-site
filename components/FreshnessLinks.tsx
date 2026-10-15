import Link from "next/link";

const links = [
  { href: "/idol-audition/new", label: "新着募集" },
  { href: "/idol-audition/deadline-this-month", label: "今月締切" },
  { href: "/idol-audition/deadline-soon", label: "締切7日以内" }
];

export function FreshnessLinks({ className = "" }: { className?: string }) {
  return (
    <nav
      aria-label="掲載時期・応募締切から探す"
      className={`flex flex-wrap gap-2 ${className}`.trim()}
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="inline-flex min-h-11 items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-700 transition hover:border-pink-300 hover:text-pink-700"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
