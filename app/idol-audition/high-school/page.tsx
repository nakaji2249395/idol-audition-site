import type { Metadata } from "next";
import Link from "next/link";
import { AuditionCard } from "@/components/AuditionCard";
import { FeaturedHiraeth } from "@/components/FeaturedHiraeth";
import { FreshnessLinks } from "@/components/FreshnessLinks";
import { TrainingGuidePromo } from "@/components/TrainingGuidePromo";
import { SearchIntentLinks } from "@/components/SearchIntentLinks";
import { siteConfig } from "@/lib/site";
import { getAllAuditions } from "@/lib/auditionData";
import { isBeginnerFriendlyAudition, isNoCostAudition } from "@/lib/auditionAudience";
import { isClosingThisMonth, isOpenAudition } from "@/lib/auditionFreshness";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "高校生のアイドルオーディション一覧【2026年最新】未経験OK・募集中",
  description:
    "高校生が応募できるアイドルオーディションを掲載。2026年現在募集中の情報を、未経験、費用、地域、保護者同意、学業との両立条件で比較できます。",
  alternates: {
    canonical: "/idol-audition/high-school"
  },
  openGraph: {
    title: "高校生のアイドルオーディション一覧【2026年最新】",
    description:
      "高校生OKのアイドルオーディション、未成年が応募前に確認すべきポイントを解説します。",
    url: `${siteConfig.url}/idol-audition/high-school`,
    type: "article"
  }
};

const importantPoints = [
  {
    title: "保護者同意が必要か確認する",
    text: "高校生や未成年がアイドルオーディションに応募する場合、保護者同意が必要になることが多いです。応募前、面接時、契約時のどの段階で同意が必要か確認しましょう。"
  },
  {
    title: "活動時間と帰宅時間を確認する",
    text: "アイドル活動では、レッスンやライブが夜になることもあります。学校生活や家庭のルールと両立できるか、帰宅時間に無理がないかを確認しましょう。"
  },
  {
    title: "費用がかかるか確認する",
    text: "応募無料でも、合格後にレッスン費、衣装代、撮影費、交通費が発生する場合があります。高校生の場合は、保護者にも費用項目を見せて相談するのがおすすめです。"
  },
  {
    title: "学業との両立ができるか確認する",
    text: "テスト期間、学校行事、部活動、アルバイトなどと両立できるかは重要です。活動頻度やレッスン曜日を事前に確認しましょう。"
  },
  {
    title: "面接場所と選考フローを確認する",
    text: "面接場所が都内事務所なのか、スタジオなのか、オンラインなのかを確認しましょう。未成年の場合は、保護者同席が可能か聞いておくと安心です。"
  }
];

const checks = [
  "高校生OK・未成年応募可と明記されているか",
  "保護者同意の案内があるか",
  "活動地域と帰宅時間に無理がないか",
  "レッスンやライブの頻度が学校生活と両立できるか",
  "登録料・レッスン費・衣装代などの費用が明記されているか",
  "面接場所と選考フローが分かるか",
  "運営会社や公式SNSが確認できるか",
  "合格後の契約内容を保護者と確認できるか"
];

const faq = [
  {
    question: "高校生でアイドルになるには、まず何をすればいいですか？",
    answer: "まず通える地域と活動できる曜日を決め、高校生可・未経験可の募集を比較します。次に保護者と学校のルール、合格後の費用を確認し、写真と自己PRを準備して募集先指定の方法で応募してください。当サイトのLINE追加だけでは応募は完了しません。"
  },
  {
    question: "初心者の高校生は、どんなアイドル事務所を選べばいいですか？",
    answer: "知名度だけでなく、未経験者へのレッスン内容、費用負担、活動場所、学校との両立、契約条件を比較しましょう。高校生可でもテスト期間の休みや部活動との両立まで認められるとは限りません。不明な条件は応募先に確認してください。"
  },
  {
    question: "高校生でもアイドルオーディションに応募できますか？",
    answer:
      "高校生OK、未成年応募可と書かれている募集であれば応募できる場合があります。ただし、保護者同意が必要になることが多いため、応募前に確認しましょう。"
  },
  {
    question: "親に内緒で応募してもいいですか？",
    answer:
      "未成年の場合、合格後の契約や活動には保護者同意が必要になることが多いです。後からトラブルにならないよう、できるだけ早い段階で保護者に説明することをおすすめします。"
  },
  {
    question: "高校生が応募するときに費用はかかりますか？",
    answer:
      "募集によって異なります。応募無料でも、合格後にレッスン費、衣装代、交通費などがかかる場合があります。費用項目は保護者と一緒に確認しましょう。"
  },
  {
    question: "学校とアイドル活動は両立できますか？",
    answer:
      "活動頻度やグループ方針によります。週末中心の活動や、学業との両立を相談できる募集もあります。応募前にレッスン曜日、ライブ頻度、帰宅時間を確認しましょう。"
  },
  {
    question: "高校生で未経験でも受かりますか？",
    answer:
      "未経験OKの募集であれば可能性はあります。歌やダンスの経験だけでなく、やる気、継続力、礼儀、SNS発信への意欲、活動への理解が見られます。"
  }
];

const relatedLinks = [
  {
    href: "/idol-audition/mikeiken",
    label: "高校生・未経験OKのアイドルオーディション",
    description: "歌やダンスが初めてでも応募しやすい募集を探す"
  },
  {
    href: "/idol-audition/free",
    label: "高校生が確認したい費用なしの募集",
    description: "応募料、レッスン費、衣装代などの条件で比較する"
  },
  {
    href: "/idol-audition/parents",
    label: "親への説明と保護者同意のポイント",
    description: "応募前に費用、活動時間、契約について相談する"
  },
  {
    href: "/idol-audition/how-to-apply",
    label: "高校生の自己PR・志望動機の書き方",
    description: "未経験でも伝えられる強みと応募写真の準備を確認する"
  },
  {
    href: "/idol-audition/suspicious",
    label: "怪しいアイドル募集の見分け方",
    description: "運営情報、費用、契約、面接場所の確認ポイントを見る"
  }
];

export default async function HighSchoolAuditionPage() {
  const allAuditions = await getAllAuditions();
  const highSchoolAuditions = allAuditions.filter((audition) =>
    isOpenAudition(audition) && `${audition.features.join(" ")} ${audition.student} ${audition.age}`.match(
      /高校生|中高生|未成年応募可|高校生相談可/
    )
  );
  const beginnerCount = highSchoolAuditions.filter(isBeginnerFriendlyAudition).length;
  const noCostCount = highSchoolAuditions.filter(isNoCostAudition).length;
  const thisMonthCount = highSchoolAuditions.filter((audition) =>
    isClosingThisMonth(audition)
  ).length;

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

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "高校生のアイドルオーディション一覧【2026年最新】未経験OK・募集中",
    description:
      "高校生OKのアイドルオーディション、未成年が応募前に確認すべき保護者同意、費用、活動時間、学業との両立を解説します。",
    mainEntityOfPage: `${siteConfig.url}/idol-audition/high-school`,
    author: {
      "@type": "Organization",
      name: "アイドルオーディションナビ"
    },
    publisher: {
      "@type": "Organization",
      name: "アイドルオーディションナビ"
    }
  };
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "高校生が応募できるアイドルオーディション",
    numberOfItems: highSchoolAuditions.length,
    itemListElement: highSchoolAuditions.map((audition, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: audition.title,
      url: `${siteConfig.url}/idol-audition/${audition.slug}`
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
        name: "高校生のアイドルオーディション",
        item: `${siteConfig.url}/idol-audition/high-school`
      }
    ]
  };

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav className="text-sm font-bold text-slate-500" aria-label="パンくずリスト">
        <Link href="/" className="hover:text-pink-600">トップ</Link>
        <span className="mx-2">/</span>
        <Link href="/idol-audition" className="hover:text-pink-600">募集一覧</Link>
        <span className="mx-2">/</span>
        <Link href="/idol-audition/age" className="hover:text-pink-600">年齢別</Link>
      </nav>

      <header className="mt-8 mb-10">
        <p className="text-sm font-bold text-pink-600">High School Student</p>
        <h1 className="mt-2 break-words text-4xl font-black leading-tight text-slate-950 sm:break-keep sm:text-5xl">
          高校生の アイドルオーディション一覧【2026年最新】
        </h1>
        <p className="mt-4 max-w-3xl leading-8 text-slate-600">
          高校生や未成年でも応募しやすいアイドルオーディションをまとめています。
          応募前に確認したい保護者同意、費用、活動時間、学業との両立についても解説します。
        </p>
        <p className="mt-4 text-xs font-bold text-slate-500">
          2026年10月更新・現在{highSchoolAuditions.length}件掲載
        </p>
      </header>

      <FreshnessLinks className="mb-8" />
      <TrainingGuidePromo className="mb-10" />

      <dl className="mb-8 grid border-y border-slate-200 sm:grid-cols-3">
        {[
          [beginnerCount, "高校生・未経験OK"],
          [noCostCount, "費用負担が少ない"],
          [thisMonthCount, "今月締切"]
        ].map(([count, label], index) => (
          <div key={label} className="px-1 py-5 sm:border-l sm:px-6 first:sm:border-l-0 first:sm:pl-0">
            <dt className="text-2xl font-black text-slate-950">
              {index === 2 ? (
                <Link href="/idol-audition/deadline-this-month" className="transition hover:text-pink-700">
                  {count}<span className="ml-1 text-xs">件</span>
                </Link>
              ) : (
                <>{count}<span className="ml-1 text-xs">件</span></>
              )}
            </dt>
            <dd className="mt-1 text-xs font-bold text-slate-500">{label}</dd>
          </div>
        ))}
      </dl>

      <nav aria-label="年齢・生活条件" className="mb-10 flex flex-wrap gap-2">
        <Link href="/idol-audition/high-school" className="rounded-full bg-pink-500 px-4 py-2 text-xs font-black text-white">高校生OK</Link>
        <Link href="/idol-audition/20s" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-700 hover:text-pink-700">20代</Link>
        <Link href="/idol-audition/30s" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-700 hover:text-pink-700">30代</Link>
        <Link href="/idol-audition/age-limit-none" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-700 hover:text-pink-700">年齢制限なし</Link>
        <Link href="/idol-audition/working-adult" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-700 hover:text-pink-700">社会人OK</Link>
      </nav>

      <FeaturedHiraeth />

      <nav aria-label="高校生の応募準備" className="mb-8 border-y border-slate-200 py-5">
        <p className="font-bold text-slate-950">アイドルになりたい高校生へ：気になることから確認</p>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-pink-700">
          <a href="#student-list" className="inline-flex min-h-11 items-center hover:underline">募集中の一覧</a>
          <a href="#first-steps" className="inline-flex min-h-11 items-center hover:underline">初心者の応募手順</a>
          <a href="#school-balance" className="inline-flex min-h-11 items-center hover:underline">学業・部活との両立</a>
          <a href="#parent-cost" className="inline-flex min-h-11 items-center hover:underline">保護者同意と費用</a>
        </div>
      </nav>

      <section id="student-list" className="mb-16 scroll-mt-24">
        <div className="mb-6">
          <p className="text-sm font-bold text-pink-600">Audition List</p>
          <h2 className="mt-1 text-3xl font-black text-slate-950">
            高校生・学生相談可の募集
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            募集要項に高校生・未成年の応募可否が記載された情報です。年齢条件は応募前に必ず最新の公式案内でも確認してください。
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {highSchoolAuditions.map((audition) => (
            <AuditionCard key={audition.slug} audition={audition} />
          ))}
        </div>
      </section>

      <SearchIntentLinks
        title="高校生のアイドル応募を条件別に確認する"
        description="未経験、費用、保護者同意など、応募前に気になる条件をまとめて確認できます。"
        links={relatedLinks}
      />

      <article className="paper-panel mt-16 p-6 sm:p-10">
        <section id="first-steps" className="mb-12 scroll-mt-24 border-b border-slate-200 pb-10">
          <h2 className="text-2xl font-black text-slate-950">アイドルになるには？高校生・初心者の応募手順</h2>
          <p className="mt-4 leading-8 text-slate-600">特別な学校や有料スクールに入ることが、すべての募集の応募条件ではありません。まずは高校生可・未経験可の募集要項を読み、自分が続けられる活動条件かを確認しましょう。</p>
          <ol className="mt-6 space-y-5 leading-8 text-slate-700">
            <li><strong>1. 通える場所と曜日を決める。</strong>学校からの移動時間と帰宅時刻まで考え、平日夜・土日・テスト期間の予定を書き出します。</li>
            <li><strong>2. 事務所・グループを比較する。</strong>年齢だけでなく、初心者向けの指導、ライブ頻度、費用、契約期間を確認。活動を最優先とする募集は、学校や部活との両立が可能か個別に聞きます。</li>
            <li><strong>3. 保護者・学校の条件を確認する。</strong>同意書の提出時期、面接への保護者同席、校則や芸能活動の許可について、応募前に整理します。</li>
            <li><strong>4. 写真・自己PRを準備して応募する。</strong>募集先指定の写真と必要事項を送信します。当サイトの公式LINEを追加するだけでは応募完了ではありません。届いた応募先の案内に沿って手続きを進めてください。</li>
          </ol>
          <p className="mt-5 text-sm leading-7 text-slate-600">事務所選びは<Link href="/idol-audition/agency-guide" className="font-bold text-pink-700 hover:underline">アイドル事務所の選び方</Link>、写真・自己PRは<Link href="/idol-audition/how-to-apply" className="font-bold text-pink-700 hover:underline">応募準備ガイド</Link>で詳しく確認できます。</p>
        </section>

        <section id="school-balance" className="mb-12 scroll-mt-24 border-b border-slate-200 pb-10">
          <h2 className="text-2xl font-black text-slate-950">学業・部活・受験と両立できる募集の確認方法</h2>
          <p className="mt-4 leading-8 text-slate-600">「高校生OK」は、テスト休みや部活動との両立を保証する表示ではありません。通学を続ける前提で、次の点を募集先に確認しましょう。</p>
          <dl className="mt-6 divide-y divide-slate-200">
            {[
              ["平日の活動", "開始時刻・終了時刻・週あたりの日数。学校から移動して間に合うか、帰りの電車に間に合うか。"],
              ["土日・遠征", "毎週参加が必須か、宿泊遠征があるか。部活の大会や学校行事と重なった場合の相談方法。"],
              ["テスト・受験", "試験前の休みや受験期の活動調整が可能か。いつまでに予定を伝える必要があるか。"],
              ["レッスン", "曜日・場所・振替の可否。自主練やSNS配信を含め、学校外で必要な時間はどのくらいか。"]
            ].map(([title, text]) => <div key={title} className="py-4"><dt className="font-black text-slate-950">{title}</dt><dd className="mt-2 leading-8 text-slate-600">{text}</dd></div>)}
          </dl>
          <blockquote className="mt-5 border-l-2 border-pink-600 pl-5 text-sm leading-8 text-slate-700">問い合わせ例：「高校に通いながらの活動を希望しています。平日は○時以降、土日は○曜日に参加できます。定期テスト前と学校行事の日程は事前に相談できますか？」</blockquote>
        </section>

        <section id="parent-cost" className="mb-12 scroll-mt-24 border-b border-slate-200 pb-10">
          <h2 className="text-2xl font-black text-slate-950">保護者同意と費用を、応募前に一緒に確認する</h2>
          <p className="mt-4 leading-8 text-slate-600">保護者には募集ページを見せて、運営者・活動場所・時間・費用・契約条件を共有してください。同意が必要な段階や書式は募集ごとに異なります。18歳の高校生も、募集側が指定する同意条件や学校のルールを確認しましょう。</p>
          <ul className="mt-5 list-disc space-y-3 pl-5 leading-8 text-slate-700">
            <li>応募時：応募料・審査料、面接までの交通費、写真の準備費用。</li>
            <li>合格後：登録料・所属料、通常レッスン費、衣装・撮影・遠征費。</li>
            <li>毎月の自己負担：通学とは別の交通費、食費、必要な消耗品。無料の対象に含まれない費用がないか。</li>
          </ul>
          <p className="mt-4 leading-8 text-slate-600">「応募無料」と「合格後も費用なし」は別です。例えば往復交通費が800円で月8回通う場合、交通費だけで月6,400円になります。これは計算例で、実際の費用は通う場所と活動頻度によって変わります。</p>
          <p className="mt-4 text-sm leading-7 text-slate-600"><Link href="/idol-audition/parents" className="font-bold text-pink-700 hover:underline">保護者への説明ガイド</Link>と<Link href="/idol-audition/cost" className="font-bold text-pink-700 hover:underline">応募・活動にかかる費用の確認ガイド</Link>も参考にしてください。</p>
        </section>

        <h2 className="text-3xl font-black leading-tight text-slate-950">
          高校生でもアイドルオーディションに応募できる？
        </h2>

        <p className="mt-6 leading-8 text-slate-600">
          結論から言うと、高校生でも応募できるアイドルオーディションはあります。
          特に地下アイドル、ライブアイドル、新規アイドルグループの募集では、高校生や学生の応募を受け付けているケースがあります。
        </p>

        <p className="mt-4 leading-8 text-slate-600">
          ただし、未成年の場合は保護者同意が必要になることが多く、活動時間や費用、契約内容についても慎重に確認する必要があります。
          「応募できるか」だけではなく、「安全に活動を続けられるか」を考えることが大切です。
        </p>

        <div className="mt-8 rounded-3xl bg-pink-50 p-6">
          <h2 className="text-xl font-black text-slate-950">
            まず結論：高校生は「保護者同意・費用・活動時間」を必ず確認
          </h2>
          <p className="mt-3 leading-8 text-slate-700">
            高校生がアイドル活動を始める場合、本人のやる気だけでなく、保護者が安心できる情報を整理することが大切です。
            運営会社、費用、契約、面接場所、帰宅時間を確認しましょう。
          </p>
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            高校生が応募前に確認すべきポイント
          </h2>
          <div className="mt-5 grid gap-4">
            {importantPoints.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-black text-slate-950">🎒 {item.title}</h3>
                <p className="mt-3 leading-8 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            高校生OKの募集を選ぶチェックリスト
          </h2>
          <div className="mt-5 grid gap-3">
            {checks.map((check) => (
              <div key={check} className="rounded-2xl bg-slate-50 p-4 leading-8 text-slate-700">
                ✅ {check}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            親にどう説明すればいい？
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            親に説明するときは、「アイドルになりたい」という気持ちだけでなく、どこの運営が募集しているのか、活動場所はどこか、費用はかかるのか、学校と両立できるのかを整理して伝えましょう。
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            親への説明に不安がある方は、
            <Link href="/idol-audition/parents" className="font-bold text-pink-600 hover:underline">
              親にアイドルオーディションを説明する方法
            </Link>
            も参考にしてください。
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            高校生でも未経験から応募できる？
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            未経験OKの募集であれば、高校生でも応募できる可能性があります。
            歌やダンスの経験よりも、レッスンに前向きに取り組めるか、活動を継続できるか、SNS発信を続けられるかが見られることもあります。
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            未経験から探したい方は、
            <Link href="/idol-audition/mikeiken" className="font-bold text-pink-600 hover:underline">
              未経験OKのアイドルオーディション一覧
            </Link>
            も確認してください。
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            高校生が注意したい怪しい募集
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            「親に言わなくていい」「今すぐお金を払って」「今日中に契約して」など、急かすような募集には注意が必要です。
            運営会社、費用、契約内容、面接場所が不明確な場合は、すぐに応募や支払いをせず、信頼できる人に相談しましょう。
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            不安な場合は、
            <Link href="/idol-audition/suspicious" className="font-bold text-pink-600 hover:underline">
              怪しいアイドルオーディションの見分け方
            </Link>
            を確認してください。
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            よくある質問
          </h2>
          <div className="mt-5 grid gap-4">
            {faq.map((item) => (
              <div key={item.question} className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-black text-slate-950">Q. {item.question}</h3>
                <p className="mt-3 leading-8 text-slate-600">A. {item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-10 rounded-3xl bg-slate-950 p-6 text-white">
          <h2 className="text-xl font-black">
            高校生OKのアイドルオーディションを探す
          </h2>
          <p className="mt-3 leading-8 text-slate-200">
            アイドルオーディションナビでは、高校生相談可、未経験OK、費用なし、東京などの条件で募集情報を探せます。
          </p>
          <Link
            href="/idol-audition"
            className="mt-5 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-950 hover:text-pink-600"
          >
            オーディション一覧を見る
          </Link>
        </div>
      </article>
    </main>
  );
}
