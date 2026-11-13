import type { Metadata } from "next";
import Link from "next/link";
import { AuditionCard } from "@/components/AuditionCard";
import { AuditionDirectory } from "@/components/AuditionDirectory";
import { getAllAuditions } from "@/lib/auditionData";
import { isOpenAudition, parseAuditionDeadline, sortByPublishedAt } from "@/lib/auditionFreshness";
import { auditionRegions, isAuditionInRegion, type AuditionRegion } from "@/lib/auditionDiscovery";
import { isAgeLimitNoneAudition, isBeginnerFriendlyAudition, isHighSchoolFriendlyAudition, isNoCostAudition, isThirtiesAudition, isTwentiesAudition } from "@/lib/auditionAudience";
import { siteConfig } from "@/lib/site";
import { getAuditionListingSummary } from "@/lib/auditionListingSummary";
import { getAuditionStyles } from "@/lib/auditionStyles";

export const metadata: Metadata = {
  title: "アイドルオーディション一覧【2026年】地域・年齢・未経験から募集を比較",
  description:
    "女性向けアイドルオーディション一覧。未経験OK、東京・大阪・名古屋、費用なし、高校生相談可、新規グループ初期メンバーなど、2026年募集中の情報を比較できます。",
  alternates: {
    canonical: "/idol-audition"
  },
  openGraph: {
    title: "女性アイドルオーディション一覧｜2026年最新・未経験OKの募集",
    description:
      "女性向けの募集中アイドルオーディションを、地域・年齢・費用・未経験可否で比較できます。",
    url: `${siteConfig.url}/idol-audition`,
    type: "article"
  }
};

const guideLinks = [
  { href: "/idol-audition/new-members", title: "新規グループ・追加メンバー募集", text: "立ち上げから参加するか、既存グループに加入するかで比較" },
  {
    href: "/idol-audition/major",
    title: "大手・注目募集を比較",
    text: "プロデューサー・出演実績と応募条件から選ぶ"
  },
  {
    href: "/idol-audition/photos",
    title: "応募写真の撮り方",
    text: "全身・バストアップ・服装と加工の確認"
  },
  {
    href: "/idol-audition/new",
    title: "新着アイドルオーディション",
    text: "最近掲載された募集中の情報を新しい順に確認"
  },
  {
    href: "/idol-audition/deadline-this-month",
    title: "今月締切のアイドルオーディション",
    text: "今月中に応募が必要な募集を締切順に確認"
  },
  {
    href: "/idol-audition/deadline-soon",
    title: "締切7日以内のアイドルオーディション",
    text: "応募期限が近い募集を優先して確認"
  },
  {
    href: "/idol-audition/tokyo",
    title: "東京のアイドルオーディション",
    text: "都内・関東近郊で活動できる募集"
  },
  {
    href: "/idol-audition/kanagawa",
    title: "神奈川・横浜のアイドルオーディション",
    text: "神奈川・横浜・川崎から活動できる募集"
  },
  {
    href: "/idol-audition/osaka",
    title: "大阪のアイドルオーディション",
    text: "大阪・関西で活動できる新メンバー募集"
  },
  {
    href: "/idol-audition/nagoya",
    title: "名古屋のアイドルオーディション",
    text: "名古屋・愛知・東海で活動できる募集"
  },
  {
    href: "/idol-audition/fukuoka",
    title: "福岡のアイドルオーディション",
    text: "福岡・九州で活動できる募集"
  },
  {
    href: "/idol-audition/sapporo",
    title: "札幌のアイドルオーディション",
    text: "札幌を拠点に活動する新メンバー募集"
  },
  {
    href: "/idol-audition/nationwide",
    title: "全国から応募できるオーディション",
    text: "全国から応募できる募集"
  },
  {
    href: "/idol-audition/mikeiken",
    title: "未経験・初心者OKのアイドルオーディション",
    text: "歌やダンスを習ったことがなくても応募しやすい募集"
  },
  {
    href: "/idol-audition/free",
    title: "費用なしのアイドルオーディション",
    text: "登録料なし・レッスン無料など費用面で比較"
  },
  {
    href: "/idol-audition/high-school",
    title: "高校生OKのアイドルオーディション",
    text: "未成年・学生が応募前に確認したい募集"
  },
  {
    href: "/idol-audition/teens",
    title: "10代のアイドルオーディション",
    text: "中学生・高校生・未経験向けの募集を比較"
  },
  {
    href: "/idol-audition/university-student",
    title: "大学生・専門学生のアイドルオーディション",
    text: "学業と両立しながら応募できる募集"
  },
  {
    href: "/idol-audition/age",
    title: "年齢からアイドルオーディションを探す",
    text: "高校生・20代・30代・年齢不問で比較"
  },
  {
    href: "/idol-audition/20s",
    title: "20代のアイドルオーディション",
    text: "20代前半・後半から応募できる募集"
  },
  {
    href: "/idol-audition/30s",
    title: "30代のアイドルオーディション",
    text: "30歳以上でも応募条件に入る募集"
  },
  {
    href: "/idol-audition/25-plus",
    title: "25歳以上のアイドルオーディション",
    text: "20代後半・社会人・未経験から応募できる募集"
  },
  {
    href: "/idol-audition/age-limit-none",
    title: "年齢制限なしのアイドルオーディション",
    text: "年齢不問・上限なしと明記された募集"
  },
  {
    href: "/idol-audition/working-adult",
    title: "社会人OKのアイドルオーディション",
    text: "仕事やダブルワークとの両立で探す"
  },
  {
    href: "/idol-audition/agency-guide",
    title: "アイドル事務所の選び方",
    text: "アイドルになりたい人が所属先を比較するポイント"
  },
  {
    href: "/idol-audition/suspicious",
    title: "怪しい募集の見分け方",
    text: "費用・契約・運営情報の確認ポイント"
  },
  {
    href: "/idol-audition/how-to-apply",
    title: "応募文・自己PRの書き方",
    text: "志望動機や写真の準備を確認"
  }
];

const faq = [
  {
    question: "アイドルオーディションはどう選べばいいですか？",
    answer:
      "活動地域、費用、未経験可否、応募条件、運営会社、活動実績、選考フローを確認しましょう。募集文の雰囲気だけでなく、条件を比較することが大切です。"
  },
  {
    question: "地下アイドルのオーディションも掲載していますか？",
    answer:
      "東京・大阪・名古屋など各地のライブアイドル、地下アイドル、新規グループ初期メンバー、既存グループ追加メンバーなどの募集を掲載しています。"
  },
  {
    question: "掲載されている募集はすべて費用なしですか？",
    answer:
      "すべてが費用なしとは限りません。募集ごとに登録料、レッスン費、衣装代、交通費などの費用項目を確認してください。"
  },
  {
    question: "応募方法はどこで確認できますか？",
    answer:
      "各オーディションの詳細ページに、LINE応募、フォーム応募、メール応募などの応募方法を掲載しています。"
  },
  {
    question: "女性向けのアイドルオーディションを掲載していますか？",
    answer:
      "はい。女性メンバーを募集するアイドルオーディションを中心に掲載しています。対象年齢、活動地域、費用、未経験可否は募集ごとに異なるため、詳細ページで確認してください。"
  }
];

export const dynamic = "force-dynamic";

export default async function IdolAuditionPage() {
  const now = new Date();
  const allAuditions = sortByPublishedAt((await getAllAuditions()).filter(item => isOpenAudition(item, now)));
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "全国のアイドルオーディション一覧",
    numberOfItems: allAuditions.length,
    itemListElement: allAuditions.map((audition, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: audition.title,
      url: `${siteConfig.url}/idol-audition/${audition.slug}`
    }))
  };

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

  return (
    <main className="mx-auto max-w-[1180px] px-4 py-10 sm:px-6 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Link href="/" className="text-xs font-black text-slate-500 hover:text-pink-600">
        ← トップへ戻る
      </Link>

      <header className="mb-6 mt-6 border-b border-slate-200 pb-6">
        <div>
        <p className="editorial-kicker">Audition directory</p>
        <h1 className="mt-3 text-3xl font-black leading-tight tracking-[-0.035em] text-slate-950 sm:text-5xl">
          アイドルオーディション一覧
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
          東京・大阪・名古屋など全国の募集を、地域・年齢・未経験・費用で比較。女性メンバーを募集する新規グループや追加メンバーのオーディションを探せます。
        </p>
        </div>
        <p className="mt-4 text-sm font-bold">現在募集中 <strong className="text-2xl text-pink-700">{allAuditions.length}</strong> 件 <span className="font-normal text-slate-500">（締切未設定・随時募集を含む）</span></p>
      </header>

      <AuditionDirectory items={allAuditions.map(item => {
        const regions = (Object.keys(auditionRegions) as AuditionRegion[]).filter(region => isAuditionInRegion(item, region));
        return {
          slug: item.slug, search: `${item.title} ${item.group} ${item.area}`,
          title: item.title, ...getAuditionListingSummary(item), deadlineLabel: item.deadline,
          styles: getAuditionStyles(item),
          recruitmentTypes: item.sourceRecruitmentTypes ?? [],
          regions: regions.length ? regions : ["other"],
          ages: [isHighSchoolFriendlyAudition(item) ? "high-school" : "", isTwentiesAudition(item) ? "20s" : "", isThirtiesAudition(item) ? "30s" : "", isAgeLimitNoneAudition(item) ? "none" : ""].filter(Boolean),
          beginner: isBeginnerFriendlyAudition(item), free: isNoCostAudition(item),
          published: item.publishedAt ? Date.parse(item.publishedAt) || 0 : 0,
          deadline: parseAuditionDeadline(item.deadline)?.dayNumber ?? null,
          card: <AuditionCard audition={item} compare />
        };
      })} />
      <section id="find-by-condition" aria-labelledby="directory-guides" className="mt-12 border-t border-slate-200 pt-6">
        <h2 id="directory-guides" className="text-lg font-bold">条件別の募集・応募ガイド</h2>
        <nav aria-label="条件別の募集と応募準備" className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {[
            { title: "地域から探す", slugs: ["tokyo", "kanagawa", "osaka", "nagoya", "fukuoka", "sapporo", "nationwide"] },
            { title: "年齢・応募条件から探す", slugs: ["mikeiken", "free", "high-school", "teens", "university-student", "age", "20s", "30s", "25-plus", "age-limit-none", "working-adult"] },
            { title: "新着・締切・注目募集", slugs: ["new", "deadline-this-month", "deadline-soon", "major"] },
            { title: "応募の準備", slugs: ["photos", "agency-guide", "suspicious", "how-to-apply"] }
          ].map(group => (
            <div key={group.title}>
              <h3 className="text-sm font-bold text-slate-600">{group.title}</h3>
              <ul className="mt-2 flex flex-wrap gap-x-5">
                {group.slugs.map(slug => {
                  const guide = guideLinks.find(item => item.href === `/idol-audition/${slug}`)!;
                  return <li key={slug}><Link href={guide.href} className="inline-flex min-h-11 items-center text-sm underline underline-offset-4 hover:text-pink-700">{guide.title}</Link></li>;
                })}
              </ul>
            </div>
          ))}
        </nav>
        <p className="mt-5 text-xs leading-6 text-slate-600">
          年齢・活動地域・費用と選考内容は各募集の詳細でご確認ください。当サイトのLINE友だち追加だけでは応募完了になりません。
        </p>
        <details className="mt-3 border-t border-slate-200 py-2 text-xs leading-6 text-slate-600">
          <summary className="min-h-11 cursor-pointer py-3 font-bold">この一覧の掲載範囲・条件表示について</summary>
          <p>女性メンバーの募集を中心に、新規グループ・追加メンバーなどを掲載しています。登録されている締切が過ぎた募集は一覧から除外し、締切未設定・随時募集は含めています。募集終了や条件変更がある場合は、募集主の最新案内もご確認ください。</p>
          <p className="mt-2">絞り込みは募集要項の記載をもとにしています。「無料」の対象や年齢の例外は募集ごとに異なり、すべての費用が無料であることや合格を保証するものではありません。<Link href="/about" className="underline">運営情報</Link></p>
        </details>
      </section>

      <section aria-labelledby="directory-faq" className="mt-8 border-t border-slate-200 pt-6">
        <h2 id="directory-faq" className="text-lg font-bold">女性アイドルオーディションのよくある質問</h2>
        <div className="mt-3 divide-y divide-slate-200">
          {faq.map(item => (
            <details key={item.question} className="py-2">
              <summary className="min-h-11 cursor-pointer py-3 text-sm font-bold">{item.question}</summary>
              <p className="pb-3 text-sm leading-7 text-slate-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
