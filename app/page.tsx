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
    title: "大阪のアイドルオーディション",
    href: "/idol-audition/osaka",
    text: "大阪・関西で活動するアイドル募集を探す"
  },
  {
    title: "名古屋のアイドルオーディション",
    href: "/idol-audition/nagoya",
    text: "名古屋・愛知・東海で活動する募集を探す"
  },
  {
    title: "福岡のアイドルオーディション",
    href: "/idol-audition/fukuoka",
    text: "福岡・九州で活動するアイドル募集を探す"
  },
  {
    title: "全国のアイドルオーディション",
    href: "/idol-audition/nationwide",
    text: "居住地を問わず応募しやすい全国募集を探す"
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
    title: "年齢からオーディションを探す",
    href: "/idol-audition/age",
    text: "高校生・20代・30代・年齢制限なしで比較"
  },
  {
    title: "20代のオーディション",
    href: "/idol-audition/20s",
    text: "20代前半・後半から応募できる募集"
  },
  {
    title: "30代のオーディション",
    href: "/idol-audition/30s",
    text: "30歳以上が応募条件に入る募集"
  },
  {
    title: "年齢制限なしのオーディション",
    href: "/idol-audition/age-limit-none",
    text: "年齢不問・上限なしと明記された募集"
  },
  {
    title: "社会人OKのオーディション",
    href: "/idol-audition/working-adult",
    text: "仕事・会社員・ダブルワークとの両立で探す"
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
  const approvedSlugs = new Set(approvedAuditions.map((audition) => audition.slug));
  const staticAuditions = auditions.filter((audition) => !approvedSlugs.has(audition.slug));
  const allAuditions = [...approvedAuditions, ...staticAuditions];
  const heroAudition = allAuditions.find((audition) => audition.imageUrl) ?? allAuditions[0];
  const previewAuditions = allAuditions
    .filter((audition) => audition.slug !== "hiraeth-tokyo-new-member")
    .slice(0, 9);
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

      <section className="mx-auto max-w-[1180px] px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
        <header className="grid items-center gap-10 border-b border-slate-200 pb-16 pt-6 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16 lg:pb-20 lg:pt-12">
          <div>
            <p className="editorial-kicker">Find your next stage</p>
            <h1 className="display-heading mt-5">
              アイドルに
              <br />
              なりたい。その一歩を、
              <br />
              <span className="border-b-[6px] border-pink-200 text-pink-500">ちゃんと選ぶ。</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              募集中のアイドルオーディションを、地域・費用・年齢・未経験可否で比較。
              応募前に知りたい条件を整理して、あなたに合う募集を見つけられます。
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/idol-audition"
                className="min-h-12 rounded-full bg-pink-500 px-7 py-4 text-center text-sm font-black text-white transition hover:bg-pink-700"
              >
                募集中のオーディションを見る →
              </Link>
              <Link
                href="/idol-audition/suspicious"
                className="min-h-12 rounded-full border border-slate-950 bg-transparent px-7 py-4 text-center text-sm font-black text-slate-950 transition hover:bg-white"
              >
                安心できる募集の選び方
              </Link>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 border-y border-slate-200 py-5">
              <div>
                <dt className="text-2xl font-black tracking-[-0.05em] text-slate-950">{allAuditions.length}</dt>
                <dd className="mt-1 text-[10px] font-bold text-slate-500">掲載中</dd>
              </div>
              <div className="border-l border-slate-200 pl-5">
                <dt className="text-2xl font-black tracking-[-0.05em] text-slate-950">5</dt>
                <dd className="mt-1 text-[10px] font-bold text-slate-500">主要エリア</dd>
              </div>
              <div className="border-l border-slate-200 pl-5">
                <dt className="text-2xl font-black tracking-[-0.05em] text-slate-950">無料</dt>
                <dd className="mt-1 text-[10px] font-bold text-slate-500">検索・応募</dd>
              </div>
            </dl>
          </div>

          {heroAudition ? (
            <Link
              href={`/idol-audition/${heroAudition.slug}`}
              className="group relative mx-auto block w-full max-w-lg pb-7 pl-4 pr-2 pt-3 lg:max-w-none"
              aria-label={`${heroAudition.title}の詳細を見る`}
            >
              <span className="absolute right-0 top-0 z-10 rotate-[5deg] rounded-lg border border-slate-950 bg-[#fffefd] px-4 py-2 text-[11px] font-black text-pink-700 shadow-[2px_2px_0_#241b24]">
                NEW AUDITION
              </span>
              <div className="overflow-hidden rounded-[18px] border border-slate-950 bg-pink-50 shadow-[7px_8px_0_#241b24]">
                <div className="aspect-[4/3] overflow-hidden border-b border-slate-950">
                  {heroAudition.imageUrl ? (
                    <img
                      src={heroAudition.imageUrl}
                      alt={`${heroAudition.title}の画像`}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="grid h-full place-items-center text-7xl text-pink-500" aria-hidden="true">✦</div>
                  )}
                </div>
                <div className="bg-white p-5 sm:p-6">
                  <p className="text-[11px] font-black uppercase tracking-[0.1em] text-pink-700">{heroAudition.group}</p>
                  <p className="mt-2 text-xl font-black leading-snug tracking-[-0.035em] text-slate-950 sm:text-2xl">
                    {heroAudition.title}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4 text-xs font-bold text-slate-600">
                    <span>{heroAudition.area}</span>
                    <span className="text-pink-700">詳しく見る →</span>
                  </div>
                </div>
              </div>
            </Link>
          ) : null}
        </header>

        <nav aria-label="条件から探す" className="hide-scrollbar -mx-4 flex gap-2 overflow-x-auto border-b border-slate-200 px-4 py-5 sm:mx-0 sm:flex-wrap sm:px-0">
          {categories.map((category) => (
            <Link key={category.href} href={category.href} className="shrink-0 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs font-black text-slate-700 transition hover:border-pink-300 hover:text-pink-700">
              {category.title.replace("のアイドルオーディション", "").replace("のオーディション", "")}
            </Link>
          ))}
        </nav>

        <div className="pt-16 sm:pt-20">
          <FeaturedHiraeth />
        </div>

        <section className="mb-20">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-5 border-b border-slate-200 pb-5">
            <div>
              <p className="editorial-kicker">Latest files</p>
              <h2 className="section-heading mt-2">新着オーディション</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">応募条件を見比べて、自分に合う募集を選べます。</p>
            </div>
            <Link href="/idol-audition" className="rounded-full border border-slate-950 px-5 py-3 text-xs font-black text-slate-950 transition hover:bg-white">
              全{allAuditions.length}件を見る →
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {previewAuditions.map((audition) => (
              <AuditionCard key={audition.slug} audition={audition} />
            ))}
          </div>
        </section>

        <section className="mb-20 grid gap-10 border-y border-slate-200 py-14 lg:grid-cols-[0.75fr_1.25fr] lg:py-16">
          <div>
            <p className="editorial-kicker">Choose your way</p>
            <h2 className="section-heading mt-3">条件から探す</h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600">
              住んでいる場所や経験、費用の条件から、無理なく続けられる募集を探しましょう。
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[18px] border border-slate-200 bg-slate-200 sm:grid-cols-2">
            {categories.map((category, index) => (
              <Link
                key={category.href}
                href={category.href}
                className="group bg-white p-5 transition hover:bg-pink-50 sm:p-6"
              >
                <span className="text-[10px] font-black tracking-[0.16em] text-pink-600">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-base font-black tracking-[-0.025em] text-slate-950">{category.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{category.text}</p>
                <span className="mt-4 inline-block text-sm font-black text-slate-950 transition group-hover:translate-x-1">→</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-20 grid gap-10 lg:grid-cols-2">
          <div className="rounded-[20px] bg-slate-950 p-7 text-white sm:p-9">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-pink-300">For you</p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.045em]">こんな「なりたい」に応えます</h2>
            <div className="mt-7 grid gap-0">
              {searchIntents.map((intent, index) => (
                <div key={intent} className="flex gap-4 border-t border-white/15 py-4 text-sm leading-7 text-slate-200">
                  <span className="font-black text-pink-300">{String(index + 1).padStart(2, "0")}</span>
                  <span>{intent}</span>
                </div>
              ))}
            </div>
          </div>

          <section className="paper-panel p-7 sm:p-9">
            <p className="editorial-kicker">FAQ</p>
            <h2 className="section-heading mt-3">応募前のよくある質問</h2>
            <div className="mt-7 divide-y divide-slate-200 border-y border-slate-200">
              {faq.map((item) => (
                <div key={item.question} className="py-5">
                  <h3 className="flex gap-3 font-black leading-7 text-slate-950">
                    <span className="text-pink-600">Q.</span>
                    {item.question}
                  </h3>
                  <p className="mt-3 pl-8 text-sm leading-7 text-slate-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </section>
      </section>
    </main>
  );
}
