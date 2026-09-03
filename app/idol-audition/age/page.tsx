import type { Metadata } from "next";
import Link from "next/link";
import { getAllAuditions } from "@/lib/auditionData";
import {
  isAgeLimitNoneAudition,
  isThirtiesAudition,
  isTwentiesAudition,
  isWorkingAdultAudition
} from "@/lib/auditionAudience";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "アイドルオーディションを年齢から探す【2026年】高校生・20代・30代",
  description:
    "アイドルオーディションを年齢・生活条件から探せます。高校生、20代、30代、年齢制限なし、社会人OKの募集中情報を比較できます。",
  alternates: { canonical: "/idol-audition/age" },
  openGraph: {
    title: "アイドルオーディションを年齢から探す【2026年】",
    description: "高校生・20代・30代・年齢制限なし・社会人向けの募集を探せます。",
    url: `${siteConfig.url}/idol-audition/age`,
    type: "article"
  }
};

const faq = [
  {
    question: "アイドルオーディションは何歳まで受けられますか？",
    answer:
      "募集によって異なります。10代・20代前半を対象にする募集が多い一方、30歳以上や年齢不問の募集もあります。"
  },
  {
    question: "募集年齢の『まで』と『未満』は違いますか？",
    answer:
      "違います。30歳までなら通常30歳を含み、30歳未満なら29歳までです。不明確な場合は主催者へ確認してください。"
  },
  {
    question: "年齢以外に確認する条件はありますか？",
    answer:
      "活動地域、活動頻度、費用、未経験可否、仕事や学業との両立、専属契約の条件を確認しましょう。"
  }
];

export default async function AgeDirectoryPage() {
  const auditions = await getAllAuditions();
  const categories = [
    {
      href: "/idol-audition/high-school",
      title: "高校生OK",
      count: auditions.filter((audition) =>
        `${audition.features.join(" ")} ${audition.student}`.match(/高校生|学生/)
      ).length,
      text: "保護者同意・活動時間・学業との両立を確認したい方へ"
    },
    {
      href: "/idol-audition/20s",
      title: "20代から応募",
      count: auditions.filter(isTwentiesAudition).length,
      text: "20代前半・後半、未経験や社会人から挑戦したい方へ"
    },
    {
      href: "/idol-audition/30s",
      title: "30代から応募",
      count: auditions.filter(isThirtiesAudition).length,
      text: "30歳以上が応募条件に入る募集を探している方へ"
    },
    {
      href: "/idol-audition/age-limit-none",
      title: "年齢制限なし",
      count: auditions.filter(isAgeLimitNoneAudition).length,
      text: "年齢不問・上限なしと明記された募集を探している方へ"
    },
    {
      href: "/idol-audition/working-adult",
      title: "社会人OK",
      count: auditions.filter(isWorkingAdultAudition).length,
      text: "仕事・会社員・ダブルワークとの両立を考えている方へ"
    }
  ];
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "年齢・生活条件別のアイドルオーディション",
    itemListElement: categories.map((category, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: category.title,
      url: `${siteConfig.url}${category.href}`
    }))
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "トップ", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "アイドルオーディション一覧",
        item: `${siteConfig.url}/idol-audition`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "年齢・生活条件から探す",
        item: `${siteConfig.url}/idol-audition/age`
      }
    ]
  };

  return (
    <main className="mx-auto max-w-[1180px] px-4 py-10 sm:px-6 sm:py-14">
      {[itemListJsonLd, faqJsonLd, breadcrumbJsonLd].map((jsonLd, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ))}

      <nav className="text-sm font-bold text-slate-500" aria-label="パンくずリスト">
        <Link href="/" className="hover:text-pink-600">トップ</Link>
        <span className="mx-2">/</span>
        <Link href="/idol-audition" className="hover:text-pink-600">募集一覧</Link>
      </nav>

      <header className="mt-8 border-b border-slate-200 pb-12">
        <p className="editorial-kicker">Find by age</p>
        <h1 className="mt-3 max-w-4xl text-5xl font-black leading-[1.05] tracking-[-0.055em] text-slate-950 sm:text-6xl">
          アイドルオーディションを年齢から探す
        </h1>
        <p className="mt-5 max-w-3xl leading-8 text-slate-600">
          高校生、20代、30代、年齢制限なし、社会人OKなど、現在の年齢や生活に合うアイドルオーディションを探せます。
          全{auditions.length}件の掲載情報から、募集要項の年齢・両立条件をもとに整理しています。
        </p>
        <p className="mt-4 text-xs font-bold text-slate-500">2026年9月更新</p>
      </header>

      <section className="mt-12">
        <p className="editorial-kicker">Age categories</p>
        <h2 className="section-heading mt-2">年齢・生活条件を選ぶ</h2>
        <div className="mt-7 grid gap-px overflow-hidden rounded-[18px] border border-slate-200 bg-slate-200 md:grid-cols-2">
          {categories.map((category, index) => (
            <Link key={category.href} href={category.href} className="group bg-white p-7 transition hover:bg-pink-50">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <span className="text-[10px] font-black tracking-[0.16em] text-pink-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-2 text-2xl font-black text-slate-950">{category.title}</h2>
                </div>
                <span className="rounded-full bg-slate-950 px-3 py-1.5 text-xs font-black text-white">
                  {category.count}件
                </span>
              </div>
              <p className="mt-4 leading-7 text-slate-600">{category.text}</p>
              <span className="mt-5 inline-block font-black text-pink-700 transition group-hover:translate-x-1">一覧を見る →</span>
            </Link>
          ))}
        </div>
      </section>

      <article className="paper-panel mt-16 p-6 sm:p-10">
        <p className="editorial-kicker">Before you apply</p>
        <h2 className="section-heading mt-3">年齢条件の正しい読み方</h2>
        <p className="mt-5 leading-8 text-slate-600">
          オーディションの年齢条件は「応募時点」「締切日時点」「デビュー時点」のどれを基準にするかで判断が変わることがあります。
          また、「30歳まで」は30歳を含み、「30歳未満」は29歳までです。「25歳前後」「30歳くらいまで」のような表現は、主催者へ相談できる場合があります。
        </p>
        <p className="mt-5 leading-8 text-slate-600">
          年齢を満たしていても、活動地域、稼働できる曜日、費用、専属契約など別の条件があります。気になる募集は詳細を読み、曖昧な点は応募前に公式窓口へ確認してください。
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">よくある質問</h2>
          <div className="mt-5 grid gap-4">
            {faq.map((item) => (
              <div key={item.question} className="rounded-2xl border border-slate-200 p-5">
                <h3 className="font-black text-slate-950">Q. {item.question}</h3>
                <p className="mt-3 leading-8 text-slate-600">A. {item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
