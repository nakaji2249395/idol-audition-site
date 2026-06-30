import Link from "next/link";
import { AuditionCard } from "@/components/AuditionCard";
import { auditions } from "@/lib/auditions";

const categories = [
  {
    title: "東京のオーディション",
    href: "/idol-audition/tokyo",
    text: "都内ライブハウスを中心に活動したい方へ"
  },
  {
    title: "未経験OK",
    href: "/idol-audition/mikeiken",
    text: "歌やダンスが未経験でも応募しやすい募集"
  },
  {
    title: "怪しい募集の見分け方",
    href: "/idol-audition/suspicious",
    text: "費用・契約・運営情報を応募前に確認"
  },
  {
    title: "費用の注意点",
    href: "/idol-audition/cost",
    text: "登録料・レッスン費・衣装代の見方"
  }
];

export default function Home() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-10 sm:pt-16">
        <header className="mb-16 rounded-[2rem] border border-white/70 bg-white/80 px-6 py-12 shadow-sm backdrop-blur sm:px-10 sm:py-16">
          <p className="mb-4 inline-flex rounded-full bg-pink-100 px-4 py-2 text-sm font-bold text-pink-700">
            アイドルオーディションを、安心して比較。
          </p>
          <h1 className="max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
            東京・未経験・高校生OK・費用なしの
            <span className="text-pink-600">アイドル募集</span>を探せる。
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            アイドルになりたい方が、怪しい募集を避けながら、自分に合ったオーディションを探せるサイトです。
            費用、活動地域、未経験可否、運営情報をわかりやすく整理します。
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/idol-audition"
              className="rounded-full bg-slate-950 px-6 py-4 text-center text-sm font-bold text-white transition hover:bg-pink-600"
            >
              募集中のオーディションを見る
            </Link>
            <Link
              href="/idol-audition/suspicious"
              className="rounded-full border border-slate-300 bg-white px-6 py-4 text-center text-sm font-bold text-slate-950 transition hover:border-pink-300 hover:text-pink-600"
            >
              怪しい募集の見分け方
            </Link>
          </div>
        </header>

        <section className="mb-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-pink-600">New Auditions</p>
              <h2 className="mt-1 text-3xl font-black text-slate-950">
                注目のアイドルオーディション
              </h2>
            </div>
            <Link href="/idol-audition" className="text-sm font-bold text-slate-700 hover:text-pink-600">
              すべて見る →
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {auditions.map((audition) => (
              <AuditionCard key={audition.slug} audition={audition} />
            ))}
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="text-lg font-black text-slate-950">{category.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{category.text}</p>
            </Link>
          ))}
        </section>
      </section>
    </main>
  );
}
