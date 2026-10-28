import type { Metadata } from "next";
import Link from "next/link";
import { AuditionCard } from "@/components/AuditionCard";
import { AuditionDirectory } from "@/components/AuditionDirectory";
import { FeaturedHiraeth } from "@/components/FeaturedHiraeth";
import { PriorityAuditionLinks } from "@/components/PriorityAuditionLinks";
import { FreshnessLinks } from "@/components/FreshnessLinks";
import { getAllAuditions } from "@/lib/auditionData";
import { isOpenAudition, parseAuditionDeadline, sortByPublishedAt } from "@/lib/auditionFreshness";
import { auditionRegions, isAuditionInRegion, type AuditionRegion } from "@/lib/auditionDiscovery";
import { isAgeLimitNoneAudition, isBeginnerFriendlyAudition, isHighSchoolFriendlyAudition, isNoCostAudition, isThirtiesAudition, isTwentiesAudition } from "@/lib/auditionAudience";
import { siteConfig } from "@/lib/site";

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

const checks = [
  "活動地域は通える範囲か",
  "未経験OKか、経験者向けか",
  "登録料・レッスン費・衣装代などの費用が明記されているか",
  "高校生・未成年の場合、保護者同意が必要か",
  "応募方法がLINE・フォーム・メールなどで明確か",
  "運営会社や公式SNS、活動実績が確認できるか",
  "合格後の活動内容や選考フローが分かるか",
  "報酬や物販バックの考え方が説明されているか"
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
        <nav aria-label="新着・締切から探す" className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
          <Link href="/idol-audition/new" className="inline-flex min-h-11 items-center text-sm font-bold underline">新着募集</Link>
          <Link href="/idol-audition/deadline-soon" className="inline-flex min-h-11 items-center text-sm font-bold underline">締切7日以内</Link>
          <Link href="/idol-audition/deadline-this-month" className="inline-flex min-h-11 items-center text-sm font-bold underline">今月締切</Link>
          <a href="#find-by-condition" className="inline-flex min-h-11 items-center text-sm font-bold underline">条件別の探し方</a>
        </nav>
      </header>

      <nav aria-label="地域・応募条件別の募集一覧" className="mb-6 flex flex-wrap gap-x-5 gap-y-1 border-b border-slate-200 pb-5">
        {[
          ["tokyo", "東京・関東"], ["osaka", "大阪・関西"], ["nagoya", "名古屋・東海"],
          ["mikeiken", "未経験・初心者OK"], ["high-school", "高校生"], ["20s", "20代"], ["free", "費用条件から探す"]
        ].map(([slug, label]) => <Link key={slug} href={`/idol-audition/${slug}`} className="inline-flex min-h-11 items-center text-sm font-bold underline">{label}</Link>)}
      </nav>
      <section aria-labelledby="women-audition-guide" className="mb-7 max-w-3xl">
        <h2 id="women-audition-guide" className="text-lg font-bold">2026年の女性・女子向けアイドル募集を比較</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">高校生・学生から社会人まで、応募できる年齢は募集ごとに異なります。まず年齢と通える地域を選び、応募費用と合格後のレッスン費・衣装代を分けて確認しましょう。</p>
        <p className="mt-2 text-sm leading-7 text-slate-600">歌やダンスが初めての方は、下の「未経験歓迎の記載あり」で絞り込めます。<Link href="/idol-audition/mikeiken" className="font-bold underline">未経験のアイドルオーディション一覧と応募準備</Link>では、経験不問の募集と自己PRの考え方を確認できます。未経験歓迎でも、年齢・活動時間・費用の条件は別途確認が必要です。</p>
      </section>

      <AuditionDirectory items={allAuditions.map(item => {
        const regions = (Object.keys(auditionRegions) as AuditionRegion[]).filter(region => isAuditionInRegion(item, region));
        return {
          slug: item.slug, search: `${item.title} ${item.group} ${item.area}`,
          regions: regions.length ? regions : ["other"],
          ages: [isHighSchoolFriendlyAudition(item) ? "high-school" : "", isTwentiesAudition(item) ? "20s" : "", isThirtiesAudition(item) ? "30s" : "", isAgeLimitNoneAudition(item) ? "none" : ""].filter(Boolean),
          beginner: isBeginnerFriendlyAudition(item), free: isNoCostAudition(item),
          published: item.publishedAt ? Date.parse(item.publishedAt) || 0 : 0,
          deadline: parseAuditionDeadline(item.deadline)?.dayNumber ?? null,
          card: <AuditionCard audition={item} compare />
        };
      })} />
      <div className="mt-12" />
      <FeaturedHiraeth />

      <FreshnessLinks className="mb-10" />

      <PriorityAuditionLinks auditions={allAuditions} />

      <aside className="mb-14 grid gap-5 border-y border-slate-200 bg-white px-5 py-6 sm:grid-cols-[1fr_auto] sm:items-center sm:px-7" aria-label="女性向けオーディションの案内">
        <div>
          <p className="text-sm font-black text-slate-950">女性向けの募集条件を確認してから応募しましょう</p>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            募集ごとに対象年齢、活動地域、レッスン費、所属条件が異なります。事務所や運営会社まで比較したい方は、選び方ガイドも確認できます。
          </p>
        </div>
        <Link href="/idol-audition/agency-guide" className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-950 px-5 py-3 text-xs font-black text-slate-950 transition hover:bg-pink-50">
          アイドル事務所の選び方 →
        </Link>
      </aside>

      <section id="find-by-condition" className="mb-20 scroll-mt-24 border-y border-slate-200 py-12 sm:py-16">
        <p className="editorial-kicker">Find by condition</p>
        <h2 className="section-heading mt-2">
          条件別にアイドルオーディションを探す
        </h2>
        <div className="mt-7 grid gap-px overflow-hidden rounded-[18px] border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-3">
          {guideLinks.map((guide, index) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group bg-white p-6 transition hover:bg-pink-50"
            >
              <span className="text-[10px] font-black tracking-[0.16em] text-pink-600">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="text-lg font-black text-slate-950">{guide.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{guide.text}</p>
              <span className="mt-4 inline-block font-black transition group-hover:translate-x-1">→</span>
            </Link>
          ))}
        </div>
      </section>

      <article className="paper-panel mb-16 p-6 sm:p-10">
        <p className="editorial-kicker">Before you apply</p>
        <h2 className="section-heading mt-3">
          アイドルオーディションを選ぶときのチェックポイント
        </h2>

        <p className="mt-6 leading-8 text-slate-600">
          アイドルオーディションを選ぶときは、募集タイトルだけで判断せず、活動地域、費用、応募条件、運営会社、選考フローを確認することが大切です。
          特に未経験者、高校生、未成年の方は、合格後にどのような活動があるのか、費用や保護者同意が必要かを確認しましょう。
        </p>

        <div className="mt-6 grid gap-3">
          {checks.map((check) => (
            <div key={check} className="flex gap-3 border-t border-slate-200 py-4 leading-8 text-slate-700">
              <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-pink-100 text-xs font-black text-pink-700">✓</span>
              {check}
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl bg-pink-50 p-6">
          <h3 className="text-xl font-black text-slate-950">
            迷ったら「費用・運営情報・活動地域」を先に確認
          </h3>
          <p className="mt-3 leading-8 text-slate-700">
            どのオーディションに応募するか迷ったら、まずは費用の有無、運営会社や公式SNS、活動地域を確認しましょう。
            条件が明確な募集ほど、応募前に判断しやすくなります。
          </p>
        </div>
      </article>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-bold text-pink-600">FAQ</p>
        <h2 className="mt-2 text-3xl font-black text-slate-950">
          女性アイドルオーディションのよくある質問
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
    </main>
  );
}
