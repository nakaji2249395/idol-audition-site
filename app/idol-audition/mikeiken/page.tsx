import type { Metadata } from "next";
import Link from "next/link";
import { AuditionCard } from "@/components/AuditionCard";
import { FeaturedHiraeth } from "@/components/FeaturedHiraeth";
import { SearchIntentLinks, type SearchIntentLink } from "@/components/SearchIntentLinks";
import { getAllAuditions } from "@/lib/auditionData";
import { isTwentiesAudition } from "@/lib/auditionAudience";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "未経験・初心者OKの女性アイドルオーディション一覧【2026年最新】",
  description:
    "未経験・初心者歓迎の女性アイドルオーディションを掲載。2026年現在募集中の情報を、年齢、東京・大阪などの地域、費用、レッスン、学生・社会人条件で比較できます。",
  alternates: {
    canonical: "/idol-audition/mikeiken"
  },
  openGraph: {
    title: "未経験・初心者OKの女性アイドルオーディション一覧【2026年最新】",
    description:
      "歌やダンスが初めてでも応募しやすい、未経験者歓迎のアイドルオーディションを比較できます。",
    url: `${siteConfig.url}/idol-audition/mikeiken`,
    type: "article"
  }
};

const importantPoints = [
  {
    title: "今の完成度より、伸びしろと継続力",
    text: "未経験歓迎の募集では、最初から完璧に歌える・踊れることだけが評価基準ではありません。レッスンを続けられるか、教わったことを吸収できるか、活動へ前向きに取り組めるかも見られます。"
  },
  {
    title: "そのグループを選んだ理由",
    text: "どこにでも使える志望動機より、楽曲、コンセプト、ライブ、活動方針のどこに惹かれたのかを具体的に伝える方が、応募の本気度が伝わります。"
  },
  {
    title: "活動を続けられる生活条件",
    text: "レッスンやライブへ通える地域か、学校や仕事と両立できるか、平日夜や土日に活動できるかを確認します。未経験者ほど、無理なく続けられる募集を選ぶことが大切です。"
  },
  {
    title: "連絡・挨拶・時間を守る姿勢",
    text: "返信の早さ、挨拶、約束や集合時間を守れることは、グループで活動するうえで重要です。経験がなくても、信頼して一緒に活動できる姿勢は強みになります。"
  },
  {
    title: "歌やダンス以外の自分の強み",
    text: "笑顔、声、接客、配信、SNS、写真、動画編集、語学、スポーツなども活動に活かせます。実績がない場合も、続けてきたことや人柄を具体的に伝えましょう。"
  }
];

const checks = [
  "募集要項に未経験OK・初心者歓迎と明記されているか",
  "基礎から学べるレッスンやサポート体制があるか",
  "応募費用と合格後のレッスン費・衣装代が分けて書かれているか",
  "活動地域、レッスン頻度、ライブ時間が生活に合うか",
  "高校生・未成年の場合は保護者同意の条件が分かるか",
  "仕事や学校との両立を相談できるか",
  "運営会社、公式サイト、公式SNS、所属グループを確認できるか",
  "選考の流れと合格後の活動内容が説明されているか"
];

const faq = [
  {
    question: "未経験でもアイドルオーディションに受かりますか？",
    answer:
      "未経験でも合格する可能性はあります。未経験歓迎の募集では、現在の歌やダンスの完成度だけでなく、伸びしろ、継続力、協調性、発信への意欲なども判断材料になります。"
  },
  {
    question: "歌やダンスを習ったことがなくても応募できますか？",
    answer:
      "未経験OKと明記された募集なら応募できます。合格後のレッスン内容と費用を確認し、基礎から学べる環境かを比較しましょう。"
  },
  {
    question: "20代で未経験でもアイドルを目指せますか？",
    answer:
      "20代を応募対象に含み、未経験者を歓迎する募集があります。年齢上限に加えて、仕事との両立、活動頻度、レッスン時間も確認してください。"
  },
  {
    question: "高校生で未経験でも応募できますか？",
    answer:
      "高校生・未成年の応募が可能で、未経験OKの募集なら応募できます。保護者同意、費用、帰宅時間、学業との両立条件を保護者と一緒に確認しましょう。"
  },
  {
    question: "未経験歓迎の募集なら費用も無料ですか？",
    answer:
      "未経験歓迎と費用無料は別の条件です。応募料、登録料、レッスン費、衣装代、撮影費、交通費を分けて確認してください。"
  },
  {
    question: "未経験者は自己PRに何を書けばいいですか？",
    answer:
      "アイドルを目指す理由、その募集を選んだ理由、継続できる生活環境、自分の性格や得意なこと、SNS発信への意欲を具体的に書きましょう。"
  }
];

const intentLinks: SearchIntentLink[] = [
  {
    href: "/idol-audition/high-school",
    label: "高校生・未経験のアイドルオーディション",
    description: "保護者同意、学校との両立、活動時間も含めて探す"
  },
  {
    href: "/idol-audition/20s",
    label: "20代・未経験のアイドル募集",
    description: "20代前半・後半の年齢条件や仕事との両立で比較する"
  },
  {
    href: "/idol-audition/tokyo",
    label: "東京の未経験OKオーディション",
    description: "都内・関東近郊で活動できる募集を探す"
  },
  {
    href: "/idol-audition/osaka",
    label: "大阪・関西の未経験OKアイドル募集",
    description: "大阪を中心に活動する新規・追加メンバー募集を見る"
  },
  {
    href: "/idol-audition/free",
    label: "未経験OK・費用なしのオーディション",
    description: "応募料、レッスン費、衣装代などの条件で比較する"
  },
  {
    href: "/idol-audition/how-to-apply",
    label: "未経験者向け自己PR・志望動機の例文",
    description: "応募文の組み立て方と写真の準備を確認する"
  }
];

function isBeginnerFriendly(audition: Awaited<ReturnType<typeof getAllAuditions>>[number]) {
  const text = [audition.experience, audition.features.join(" "), audition.description].join(" ");
  return /未経験(?:者)?(?:OK|可|歓迎)|経験不問|初心者歓迎/.test(text);
}

function jsonLd(value: object) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default async function MikeikenAuditionPage() {
  const allAuditions = await getAllAuditions();
  const mikeikenAuditions = allAuditions.filter(isBeginnerFriendly);
  const freeCount = mikeikenAuditions.filter((audition) =>
    /費用なし|無料|かかりません|掛かりません/.test(audition.cost)
  ).length;
  const highSchoolCount = mikeikenAuditions.filter((audition) =>
    /高校生|中高生|未成年応募可|高校生相談可/.test(
      `${audition.features.join(" ")} ${audition.student} ${audition.age}`
    )
  ).length;
  const twentiesCount = mikeikenAuditions.filter(isTwentiesAudition).length;
  const pageUrl = `${siteConfig.url}/idol-audition/mikeiken`;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  };
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "未経験・初心者歓迎の女性アイドルオーディション",
    numberOfItems: mikeikenAuditions.length,
    itemListElement: mikeikenAuditions.map((audition, index) => ({
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
        name: "女性アイドルオーディション一覧",
        item: `${siteConfig.url}/idol-audition`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "未経験・初心者OKのアイドルオーディション",
        item: pageUrl
      }
    ]
  };

  return (
    <main className="mx-auto max-w-[1180px] px-4 py-10 sm:px-6 sm:py-14">
      {[faqJsonLd, itemListJsonLd, breadcrumbJsonLd].map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(data) }}
        />
      ))}

      <nav className="text-sm font-bold text-slate-500" aria-label="パンくずリスト">
        <Link href="/" className="hover:text-pink-600">トップ</Link>
        <span className="mx-2">/</span>
        <Link href="/idol-audition" className="hover:text-pink-600">募集一覧</Link>
        <span className="mx-2">/</span>
        <span>未経験・初心者OK</span>
      </nav>

      <header className="mt-8 grid gap-8 border-b border-slate-200 pb-12 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="editorial-kicker">Beginner friendly</p>
          <h1 className="mt-3 break-words text-4xl font-black leading-[1.08] tracking-[-0.055em] text-slate-950 sm:break-keep sm:text-5xl lg:text-6xl">
            未経験・初心者OKの<br className="hidden sm:block" />女性アイドルオーディション
          </h1>
          <p className="mt-5 max-w-3xl leading-8 text-slate-600">
            歌やダンスを習ったことがない初心者でも応募しやすい、未経験歓迎の女性アイドルオーディションをまとめています。年齢、地域、費用、レッスン、学校・仕事との両立条件を比較して、自分に合う募集を探せます。
          </p>
          <p className="mt-4 text-xs font-bold text-slate-500">2026年9月更新・募集中の掲載情報を集計</p>
        </div>
        <div className="w-fit rotate-[2deg] rounded-lg border border-slate-950 bg-pink-500 px-5 py-3 text-center text-white shadow-[3px_3px_0_#241b24]">
          <span className="block text-3xl font-black">{mikeikenAuditions.length}</span>
          <span className="text-[10px] font-black tracking-wider">BEGINNER OK</span>
        </div>
      </header>

      <dl className="grid border-b border-slate-200 sm:grid-cols-3">
        {[
          [freeCount, "費用負担が少ない募集"],
          [highSchoolCount, "高校生・未成年相談可"],
          [twentiesCount, "20代が年齢条件に入る募集"]
        ].map(([count, label]) => (
          <div key={label} className="border-t border-slate-200 px-1 py-5 sm:border-t-0 sm:border-l sm:px-6 first:sm:border-l-0 first:sm:pl-0">
            <dt className="text-2xl font-black text-slate-950">{count}<span className="ml-1 text-xs">件</span></dt>
            <dd className="mt-1 text-xs font-bold text-slate-500">{label}</dd>
          </div>
        ))}
      </dl>

      <div className="pt-12">
        <FeaturedHiraeth />
      </div>

      <section className="mb-16">
        <p className="editorial-kicker">Now recruiting</p>
        <h2 className="section-heading mt-2">未経験者を歓迎している募集中のオーディション</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          募集要項に未経験OK、未経験歓迎、経験不問などの記載がある情報です。応募前に、各詳細ページで年齢、活動地域、費用と合格後のレッスン条件を確認してください。
        </p>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mikeikenAuditions.map((audition) => (
            <AuditionCard key={audition.slug} audition={audition} />
          ))}
        </div>
      </section>

      <SearchIntentLinks
        description="年齢や地域、費用を組み合わせて探すと、活動を続けやすい募集を絞り込めます。"
        links={intentLinks}
      />

      <article className="paper-panel mt-16 p-6 sm:p-10">
        <p className="editorial-kicker">Beginner guide</p>
        <h2 className="section-heading mt-3">未経験からアイドルオーディションを受ける前に</h2>
        <p className="mt-6 leading-8 text-slate-600">
          未経験でも応募できるアイドルオーディションはあります。特に新規グループの初期メンバーや既存グループの追加メンバー募集では、歌やダンスの経験だけでなく、人柄、成長する意欲、継続力、グループとの相性を含めて選考する場合があります。
        </p>
        <p className="mt-4 leading-8 text-slate-600">
          「未経験だから受からない」と決めつける必要はありません。ただし、未経験歓迎という言葉だけで応募先を決めず、レッスン体制、費用、活動時間、運営情報、契約条件まで確認しましょう。
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">未経験者が見られやすい5つのポイント</h2>
          <div className="mt-5 grid gap-0 border-y border-slate-200">
            {importantPoints.map((item, index) => (
              <div key={item.title} className="grid gap-3 border-t border-slate-200 py-5 first:border-t-0 sm:grid-cols-[3rem_1fr]">
                <span className="text-sm font-black text-pink-700">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-black text-slate-950">{item.title}</h3>
                  <p className="mt-2 leading-8 text-slate-600">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">未経験OKの募集を選ぶチェックリスト</h2>
          <div className="mt-5 grid gap-x-8 md:grid-cols-2">
            {checks.map((check) => (
              <div key={check} className="flex gap-3 border-t border-slate-200 py-4 leading-7 text-slate-700">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-pink-100 text-xs font-black text-pink-700">✓</span>
                {check}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="border-l-4 border-pink-500 bg-pink-50 p-6">
            <h2 className="text-xl font-black text-slate-950">未経験と費用無料は別の条件</h2>
            <p className="mt-3 leading-8 text-slate-700">
              未経験歓迎でも、合格後にレッスン費や衣装代がかかる場合があります。応募料、登録料、レッスン費、衣装代、撮影費、交通費を分けて確認しましょう。
            </p>
            <Link href="/idol-audition/free" className="mt-4 inline-block font-black text-pink-700 hover:underline">
              費用なしのアイドルオーディションを見る →
            </Link>
          </div>
          <div className="border-l-4 border-slate-950 bg-slate-50 p-6">
            <h2 className="text-xl font-black text-slate-950">自己PRは経験のなさで終わらせない</h2>
            <p className="mt-3 leading-8 text-slate-700">
              なぜアイドルになりたいか、なぜその募集を選んだか、活動を続けられる理由、自分の強みを具体的に伝えることが大切です。
            </p>
            <Link href="/idol-audition/how-to-apply" className="mt-4 inline-block font-black text-pink-700 hover:underline">
              未経験者向け自己PR例文を見る →
            </Link>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">よくある質問</h2>
          <div className="mt-5 divide-y divide-slate-200 border-y border-slate-200">
            {faq.map((item) => (
              <div key={item.question} className="py-5">
                <h3 className="font-black leading-7 text-slate-950">Q. {item.question}</h3>
                <p className="mt-3 leading-8 text-slate-600">A. {item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/idol-audition" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-pink-600">
            募集中のオーディションをすべて見る
          </Link>
          <Link href="/idol-audition/suspicious" className="rounded-full border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 hover:text-pink-600">
            怪しい募集の見分け方
          </Link>
        </div>
      </article>
    </main>
  );
}
