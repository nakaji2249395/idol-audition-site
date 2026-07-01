import type { Metadata } from "next";
import Link from "next/link";
import { AuditionCard } from "@/components/AuditionCard";
import { FeaturedHiraeth } from "@/components/FeaturedHiraeth";
import { auditions } from "@/lib/auditions";
import { siteConfig } from "@/lib/site";
import { getAllAuditions } from "@/lib/auditionData";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "東京のアイドルオーディション一覧｜未経験OK・費用なしの募集",
  description:
    "東京のアイドルオーディションを探せます。未経験OK、費用なし、高校生相談可、新規グループ初期メンバー、地下アイドル募集など、都内・関東近郊で活動できる募集を掲載。",
  alternates: {
    canonical: "/idol-audition/tokyo"
  },
  openGraph: {
    title: "東京のアイドルオーディション一覧｜未経験OK・費用なしの募集",
    description:
      "東京・関東近郊で活動できるアイドルオーディション、地下アイドル募集、新規グループメンバー募集を探せます。",
    url: `${siteConfig.url}/idol-audition/tokyo`,
    type: "article"
  }
};

const tokyoPoints = [
  {
    title: "都内ライブハウスでの活動が多い",
    text: "東京のアイドルオーディションでは、渋谷、新宿、池袋、秋葉原、下北沢、恵比寿など、都内ライブハウスを中心に活動する募集が多くあります。"
  },
  {
    title: "地下アイドル・ライブアイドルの募集が多い",
    text: "東京はアイドルグループの数が多く、新規グループ初期メンバーや既存グループ追加メンバーの募集も多い地域です。未経験から活動を始めたい人にも選択肢があります。"
  },
  {
    title: "学校や仕事と両立できる募集もある",
    text: "週末中心、平日夜レッスン、学業相談可、社会人相談可など、生活に合わせて応募しやすい募集もあります。活動頻度は応募前に必ず確認しましょう。"
  },
  {
    title: "交通費・移動時間を確認しやすい",
    text: "東京近郊に住んでいる場合、レッスンやライブに通いやすいのがメリットです。ただし、終演後の帰宅時間や交通費負担は事前に確認しておきましょう。"
  },
  {
    title: "競争も多いがチャンスも多い",
    text: "東京は応募者も多い一方で、グループ数やライブ本数も多いため、アイドル活動を始めるチャンスが多い地域です。自分に合う募集を比較して選びましょう。"
  }
];

const checks = [
  "活動地域が東京・関東近郊と明記されているか",
  "主なライブ会場や活動エリアが分かるか",
  "レッスン場所・面接場所が都内のどこか確認できるか",
  "活動頻度が学校や仕事と両立できるか",
  "終演後の帰宅時間に無理がないか",
  "登録料・レッスン費・衣装代などの費用が明記されているか",
  "未経験OKか、経験者向けかが分かるか",
  "運営会社や公式SNS、過去の活動実績が確認できるか"
];

const areas = [
  "新宿",
  "渋谷",
  "池袋",
  "秋葉原",
  "下北沢",
  "恵比寿",
  "原宿",
  "代官山",
  "高円寺",
  "上野",
  "横浜",
  "川崎",
  "埼玉",
  "千葉"
];

const faq = [
  {
    question: "東京のアイドルオーディションは未経験でも応募できますか？",
    answer:
      "未経験OKの募集であれば応募できます。東京では新規グループや地下アイドルの募集も多く、歌やダンスの経験よりも、やる気、継続力、発信力を重視する募集もあります。"
  },
  {
    question: "東京の地下アイドル募集は怪しくないですか？",
    answer:
      "すべてが怪しいわけではありません。ただし、運営会社、活動実績、費用、契約内容、面接場所を確認することが大切です。不安がある場合は、応募前に詳細を確認しましょう。"
  },
  {
    question: "東京以外に住んでいても応募できますか？",
    answer:
      "関東近郊で都内のレッスンやライブに通える場合は応募できる募集もあります。移動時間、交通費、終演後の帰宅時間を確認しましょう。"
  },
  {
    question: "高校生でも東京のアイドルオーディションに応募できますか？",
    answer:
      "高校生OK、学生相談可の募集であれば応募できる場合があります。未成年の場合は保護者同意、活動時間、費用、学業との両立を確認しましょう。"
  },
  {
    question: "東京のアイドルオーディションで費用はかかりますか？",
    answer:
      "募集によって異なります。応募無料、合格後費用なしの募集もありますが、レッスン費、衣装代、撮影費、交通費などが自己負担になる場合もあるため確認が必要です。"
  }
];

export default async function TokyoAuditionPage() {
  const allAuditions = await getAllAuditions();
  const allAuditions = await getAllAuditions();
  const tokyoAuditions = allAuditions.filter((audition) =>
    `${audition.area} ${audition.features.join(" ")}`.includes("東京") ||
    `${audition.area} ${audition.features.join(" ")}`.includes("関東")
  );

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
    headline: "東京のアイドルオーディション一覧｜未経験OK・費用なしの募集",
    description:
      "東京・関東近郊で活動できるアイドルオーディション、地下アイドル募集、新規グループメンバー募集を探せます。",
    mainEntityOfPage: `${siteConfig.url}/idol-audition/tokyo`,
    author: {
      "@type": "Organization",
      name: "アイドルオーディションナビ"
    },
    publisher: {
      "@type": "Organization",
      name: "アイドルオーディションナビ"
    }
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

      <Link href="/" className="text-sm font-bold text-slate-500 hover:text-pink-600">
        ← トップへ戻る
      </Link>

      <header className="mt-8 mb-10">
        <p className="text-sm font-bold text-pink-600">Tokyo Audition</p>
        <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950">
          東京のアイドルオーディション一覧
        </h1>
        <p className="mt-4 max-w-3xl leading-8 text-slate-600">
          東京・関東近郊で活動できるアイドルオーディションをまとめています。
          未経験OK、費用なし、高校生相談可、新規グループ初期メンバー、地下アイドル募集などを比較できます。
        </p>
      </header>

      <FeaturedHiraeth />

      <section className="mb-16">
        <div className="mb-6">
          <p className="text-sm font-bold text-pink-600">Audition List</p>
          <h2 className="mt-1 text-3xl font-black text-slate-950">
            東京・関東近郊の募集
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {tokyoAuditions.map((audition) => (
            <AuditionCard key={audition.slug} audition={audition} />
          ))}
        </div>
      </section>

      <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <h2 className="text-3xl font-black leading-tight text-slate-950">
          東京でアイドルオーディションを探すときのポイント
        </h2>

        <p className="mt-6 leading-8 text-slate-600">
          東京は、アイドルオーディションや地下アイドルのメンバー募集が多い地域です。
          都内にはライブハウス、レッスンスタジオ、撮影場所、事務所が多く、アイドル活動を始める環境が整いやすい一方で、募集の数が多いぶん比較も重要になります。
        </p>

        <p className="mt-4 leading-8 text-slate-600">
          「東京で活動したい」「未経験からアイドルを始めたい」「新規グループの初期メンバーになりたい」と考えている方は、活動地域、費用、活動頻度、運営情報を確認しながら、自分に合う募集を選びましょう。
        </p>

        <div className="mt-8 rounded-3xl bg-pink-50 p-6">
          <h2 className="text-xl font-black text-slate-950">
            まず結論：東京の募集は多いからこそ「条件比較」が大事
          </h2>
          <p className="mt-3 leading-8 text-slate-700">
            東京にはアイドル募集が多くありますが、すべてが自分に合うとは限りません。
            未経験OKか、費用がかかるか、活動場所に通えるか、学校や仕事と両立できるかを確認しましょう。
          </p>
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            東京のアイドルオーディションの特徴
          </h2>
          <div className="mt-5 grid gap-4">
            {tokyoPoints.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-black text-slate-950">📍 {item.title}</h3>
                <p className="mt-3 leading-8 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            東京の募集を選ぶチェックリスト
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
            東京で活動するアイドルの主なエリア
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            東京のアイドル活動では、ライブハウスやスタジオの場所によって通いやすさが変わります。
            募集ページに活動エリアが書かれている場合は、自宅や学校、職場から通えるか確認しましょう。
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {areas.map((area) => (
              <span
                key={area}
                className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700"
              >
                {area}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            東京のアイドルオーディションは未経験でも応募できる？
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            未経験OKの募集であれば、歌やダンスが初めてでも応募できます。
            東京では新規グループや地下アイドルの募集も多く、経験よりも雰囲気、やる気、発信力、継続力を重視する募集もあります。
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            未経験から探す場合は、
            <Link href="/idol-audition/mikeiken" className="font-bold text-pink-600 hover:underline">
              未経験OKのアイドルオーディション一覧
            </Link>
            も確認してください。
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            東京の募集で費用面を見るポイント
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            東京で活動する場合、レッスン費や衣装代だけでなく、交通費も考える必要があります。
            応募無料でも、合格後に交通費、撮影費、衣装代などが自己負担になる場合があります。
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            費用面が不安な場合は、
            <Link href="/idol-audition/cost" className="font-bold text-pink-600 hover:underline">
              アイドルオーディションの費用の見方
            </Link>
            や
            <Link href="/idol-audition/free" className="ml-1 font-bold text-pink-600 hover:underline">
              費用なしのアイドルオーディション一覧
            </Link>
            を確認しましょう。
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            東京の地下アイドル募集は怪しい？
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            地下アイドルやライブアイドルの募集だからといって、すべてが怪しいわけではありません。
            ただし、募集数が多いぶん、費用や契約、運営情報を確認することが大切です。
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
            東京のアイドルオーディションを探す
          </h2>
          <p className="mt-3 leading-8 text-slate-200">
            アイドルオーディションナビでは、東京、未経験OK、費用なし、高校生相談可などの条件で募集情報を探せます。
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
