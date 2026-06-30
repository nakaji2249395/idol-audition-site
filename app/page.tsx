import type { Metadata } from "next";
import Link from "next/link";
import { AuditionCard } from "@/components/AuditionCard";
import { FeaturedHiraeth } from "@/components/FeaturedHiraeth";
import { auditions } from "@/lib/auditions";
import { siteConfig } from "@/lib/site";
import { fetchApprovedAuditions } from "@/lib/submissions";

export const metadata: Metadata = {
  title: "アイドルオーディションナビ｜未経験OK・東京・費用なしのアイドル募集情報",
  description:
    "アイドルオーディションを安心して比較。未経験OK、東京、費用なし、高校生相談可、新規グループ初期メンバー、地下アイドル募集など、アイドルになりたい方向けの募集情報を掲載。",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "アイドルオーディションナビ｜未経験OK・東京・費用なしのアイドル募集情報",
    description:
      "アイドルオーディションを安心して比較。未経験OK、東京、費用なし、高校生相談可の募集情報を探せます。",
    url: siteConfig.url,
    type: "website"
  }
};

const categories = [
  {
    title: "東京のアイドルオーディション",
    href: "/idol-audition/tokyo",
    text: "都内・関東近郊で活動できる募集を探す"
  },
  {
    title: "未経験OKのオーディション",
    href: "/idol-audition/mikeiken",
    text: "歌やダンスが初めてでも応募しやすい募集"
  },
  {
    title: "費用なしのオーディション",
    href: "/idol-audition/free",
    text: "登録料なし・レッスン無料など費用面で探す"
  },
  {
    title: "高校生OKのオーディション",
    href: "/idol-audition/high-school",
    text: "未成年・学生が応募前に確認したい募集"
  },
  {
    title: "怪しい募集の見分け方",
    href: "/idol-audition/suspicious",
    text: "費用・契約・運営情報の確認ポイント"
  },
  {
    title: "応募文の書き方",
    href: "/idol-audition/how-to-apply",
    text: "志望動機・自己PR・写真の準備"
  }
];

const searchIntents = [
  "未経験からアイドルになりたい",
  "東京で活動できるグループを探したい",
  "費用なし・レッスン無料の募集を探したい",
  "高校生でも応募できるオーディションを探したい",
  "怪しくないアイドルオーディションを見分けたい",
  "新規グループの初期メンバーになりたい"
];

const faq = [
  {
    question: "アイドルオーディションは未経験でも応募できますか？",
    answer:
      "未経験OKと書かれている募集であれば応募できます。歌やダンスの経験だけでなく、やる気、継続力、礼儀、SNS発信への意欲なども見られます。"
  },
  {
    question: "アイドルオーディションで費用はかかりますか？",
    answer:
      "募集によって異なります。応募無料でも、合格後にレッスン費、衣装代、撮影費、交通費などが発生する場合があるため、費用項目を確認しましょう。"
  },
  {
    question: "高校生でもアイドルオーディションに応募できますか？",
    answer:
      "高校生OK、未成年応募可の募集であれば応募できる場合があります。未成年の場合は保護者同意、活動時間、費用、学業との両立を確認しましょう。"
  },
  {
    question: "怪しいアイドルオーディションはどう見分けますか？",
    answer:
      "運営会社、公式SNS、活動実績、費用、契約内容、面接場所、選考フローが明確かを確認しましょう。高額な費用を急に求められる場合は注意が必要です。"
  }
];

export const dynamic = "force-dynamic";

export default async function Home() {
  const approvedAuditions = await fetchApprovedAuditions();
  const allAuditions = [...auditions, ...approvedAuditions];
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "注目のアイドルオーディション",
    itemListElement: allAuditions.map((audition, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: audition.title,
      url: `${siteConfig.url}/idol-audition/${audition.slug}`
    }))
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <section className="mx-auto max-w-6xl px-5 pb-16 pt-10 sm:pt-16">
        <header className="mb-14 rounded-[2rem] border border-white/70 bg-white/85 px-6 py-12 shadow-sm backdrop-blur sm:px-10 sm:py-16">
          <p className="mb-4 inline-flex rounded-full bg-pink-100 px-4 py-2 text-sm font-bold text-pink-700">
            アイドルオーディションを、安心して比較。
          </p>

          <h1 className="max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
            アイドルオーディション・
            <span className="text-pink-600">アイドル募集</span>を探すなら
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            アイドルオーディションナビは、アイドルになりたい方が募集情報を比較できるサイトです。
            未経験OK、東京、費用なし、高校生相談可、新規グループ初期メンバー、地下アイドル募集など、
            応募前に知りたい条件を分かりやすく整理しています。
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/idol-audition"
              className="rounded-full bg-slate-950 px-6 py-4 text-center text-sm font-bold text-white transition hover:bg-pink-600"
            >
              募集中のアイドルオーディションを見る
            </Link>
            <Link
              href="/idol-audition/suspicious"
              className="rounded-full border border-slate-300 bg-white px-6 py-4 text-center text-sm font-bold text-slate-950 transition hover:border-pink-300 hover:text-pink-600"
            >
              怪しい募集の見分け方を見る
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {["未経験OK", "東京・関東近郊", "費用なし"].map((label) => (
              <div key={label} className="rounded-2xl bg-slate-50 p-4 text-center text-sm font-black text-slate-800">
                {label}
              </div>
            ))}
          </div>
        </header>

        <section className="mb-14 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-bold text-pink-600">Search Intent</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">
            こんな人に向けたアイドルオーディション情報サイトです
          </h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {searchIntents.map((intent) => (
              <div key={intent} className="rounded-2xl bg-slate-50 p-4 leading-8 text-slate-700">
                ✅ {intent}
              </div>
            ))}
          </div>
        </section>

        <FeaturedHiraeth />

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
            {allAuditions.map((audition) => (
              <AuditionCard key={audition.slug} audition={audition} />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <p className="text-sm font-bold text-pink-600">Category</p>
          <h2 className="mt-1 text-3xl font-black text-slate-950">
            条件からアイドルオーディションを探す
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
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
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-bold text-pink-600">FAQ</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">
            アイドルオーディションのよくある質問
          </h2>
          <div className="mt-6 grid gap-4">
            {faq.map((item) => (
              <div key={item.question} className="rounded-2xl bg-slate-50 p-5">
                <h3 className="font-black text-slate-950">Q. {item.question}</h3>
                <p className="mt-3 leading-8 text-slate-600">A. {item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
