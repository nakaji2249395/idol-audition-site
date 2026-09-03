import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";

const navItems = [
  { href: "/idol-audition", label: "募集一覧" },
  { href: "/idol-audition/tokyo", label: "東京" },
  { href: "/idol-audition/osaka", label: "大阪" },
  { href: "/idol-audition/nagoya", label: "名古屋" },
  { href: "/idol-audition/mikeiken", label: "未経験OK" },
  { href: "/idol-audition/suspicious", label: "応募前ガイド" }
];

const mobileNavItems = [
  ...navItems,
  { href: "/idol-audition/free", label: "費用なし" },
  { href: "/idol-audition/high-school", label: "高校生OK" },
  { href: "/post", label: "掲載希望" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-[#fffaf7]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-5 px-4 py-3.5 sm:px-6">
        <Link href="/" aria-label="アイドルオーディションナビ トップ">
          <BrandMark />
        </Link>

        <nav className="hidden items-center gap-6 text-[13px] font-bold text-slate-700 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-pink-600">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/idol-audition"
          className="min-h-11 shrink-0 rounded-full bg-pink-500 px-5 py-3 text-xs font-black text-white transition hover:bg-pink-700"
        >
          募集を探す
        </Link>
      </div>

      <nav
        aria-label="スマートフォン用カテゴリーナビゲーション"
        className="hide-scrollbar mx-auto flex max-w-[1180px] gap-2 overflow-x-auto border-t border-slate-200/70 px-4 py-2.5 lg:hidden"
      >
        {mobileNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-[11px] font-bold text-slate-700"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
