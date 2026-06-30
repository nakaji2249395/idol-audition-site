import Link from "next/link";

const navItems = [
  { href: "/idol-audition", label: "募集一覧" },
  { href: "/idol-audition/tokyo", label: "東京" },
  { href: "/idol-audition/mikeiken", label: "未経験OK" },
  { href: "/idol-audition/free", label: "費用なし" },
  { href: "/idol-audition/suspicious", label: "怪しい？" },
  { href: "/post", label: "掲載希望" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link href="/" className="text-base font-black tracking-tight text-slate-950">
          アイドルオーディションナビ
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-bold text-slate-600 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-pink-600">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/idol-audition"
          className="rounded-full bg-slate-950 px-4 py-2 text-xs font-bold text-white hover:bg-pink-600"
        >
          探す
        </Link>
      </div>
    </header>
  );
}
