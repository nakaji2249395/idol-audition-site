import type { Metadata } from "next";
import Link from "next/link";
import { AuditionCard } from "@/components/AuditionCard";
import { FeaturedHiraeth } from "@/components/FeaturedHiraeth";
import { auditions } from "@/lib/auditions";
import { siteConfig } from "@/lib/site";
import { getAllAuditions } from "@/lib/auditionData";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "費用なしのアイドルオーディション一覧｜レッスン無料・合格後費用なしの募集",
  description:
    "費用なしのアイドルオーディションを探せます。応募無料、レッスン無料、合格後費用なし、登録料なしの募集を比較。費用面で応募前に確認すべきポイントも解説します。",
  alternates: {
    canonical: "/idol-audition/free"
  },
  openGraph: {
    title: "費用なしのアイドルオーディション一覧｜レッスン無料・合格後費用なしの募集",
    description:
      "応募無料、レッスン無料、合格後費用なしのアイドルオーディションを探せます。",
    url: `${siteConfig.url}/idol-audition/free`,
    type: "article"
  }
};

const freePoints = [
  {
    title: "応募無料と合格後費用なしは意味が違う",
    text: "応募無料は、オーディションを受ける時点でお金がかからないという意味です。一方で、合格後費用なしは、活動開始後の登録料、レッスン費、衣装代などもかからない、または運営側が負担するという意味で使われることがあります。"
  },
  {
    title: "レッスン無料かどうかを確認する",
    text: "未経験からアイドル活動を始める場合、歌やダンスのレッスンが必要になることがあります。そのレッスン費が無料なのか、月額でかかるのかは応募前に確認しましょう。"
  },
  {
    title: "衣装代・撮影費・交通費も見る",
    text: "登録料やレッスン費が無料でも、衣装代、宣材写真の撮影費、ライブやレッスンへの交通費が自己負担になる場合があります。費用項目は分けて確認することが大切です。"
  },
  {
    title: "無料でも契約内容は確認する",
    text: "費用がかからない募集でも、活動期間、報酬、物販バック、禁止事項、退所時の条件などは確認しましょう。費用なしだから何も確認しなくていい、というわけではありません。"
  },
  {
    title: "高額請求がないかを見極める",
    text: "応募後に高額な登録料やスクール費用を請求される場合は慎重に判断しましょう。金額、内訳、契約内容、返金条件を確認し、不安があればすぐに支払わないことが大切です。"
  }
];

const checks = [
  "応募時に費用がかからないか",
  "合格後に登録料・入所金がないか",
  "レッスン費が無料か",
  "衣装代が自己負担か運営負担か",
  "宣材写真・撮影費がかかるか",
  "交通費は自己負担か支給ありか",
  "ライブノルマやチケットノルマがあるか",
  "報酬や物販バックの仕組みが説明されるか",
  "契約内容を事前に確認できるか",
  "未成年の場合、保護者にも説明できる内容か"
];

const faq = [
  {
    question: "費用なしのアイドルオーディションは本当にありますか？",
    answer:
      "あります。応募無料、レッスン費無料、合格後費用なしの募集も存在します。ただし、交通費や一部活動費が自己負担になる場合もあるため、費用項目を分けて確認しましょう。"
  },
  {
    question: "応募無料なら安全ですか？",
    answer:
      "応募無料は安心材料の一つですが、それだけで安全とは限りません。合格後にレッスン費、登録料、衣装代などが発生する場合もあるため、合格後費用まで確認することが大切です。"
  },
  {
    question: "レッスン無料の募集は怪しくないですか？",
    answer:
      "レッスン無料だから怪しいというわけではありません。運営側が育成費用を負担する募集もあります。ただし、運営会社、活動実績、契約内容、報酬条件は確認しましょう。"
  },
  {
    question: "高校生でも費用なしの募集に応募できますか？",
    answer:
      "高校生OK、未成年応募可の募集であれば応募できる場合があります。未成年の場合は保護者同意が必要になることが多いため、費用や契約内容を保護者と一緒に確認しましょう。"
  },
  {
    question: "費用なしの募集を選ぶときの注意点は？",
    answer:
      "費用がかからないかだけでなく、活動地域、活動頻度、契約期間、報酬、面接場所、運営会社の情報も確認しましょう。無料でも条件が自分に合わない場合は無理に応募しないことが大切です。"
  }
];

export default async function FreeAuditionPage() {
  const allAuditions = await getAllAuditions();
  const allAuditions = await getAllAuditions();
  const freeAuditions = allAuditions.filter((audition) =>
    `${audition.cost} ${audition.features.join(" ")}`.includes("なし") ||
    `${audition.cost} ${audition.features.join(" ")}`.includes("無料")
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
    headline: "費用なしのアイドルオーディション一覧｜レッスン無料・合格後費用なしの募集",
    description:
      "応募無料、レッスン無料、合格後費用なしのアイドルオーディションを探せます。",
    mainEntityOfPage: `${siteConfig.url}/idol-audition/free`,
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
        <p className="text-sm font-bold text-pink-600">No Cost / Free Lesson</p>
        <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950">
          費用なしのアイドルオーディション一覧
        </h1>
        <p className="mt-4 max-w-3xl leading-8 text-slate-600">
          応募無料、レッスン無料、合格後費用なし、登録料なしなど、費用負担を確認しやすいアイドルオーディションをまとめています。
          費用面で不安がある方は、応募前に必ず各項目を確認しましょう。
        </p>
      </header>

      <FeaturedHiraeth />

      <section className="mb-16">
        <div className="mb-6">
          <p className="text-sm font-bold text-pink-600">Audition List</p>
          <h2 className="mt-1 text-3xl font-black text-slate-950">
            費用負担が少ない募集
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {freeAuditions.map((audition) => (
            <AuditionCard key={audition.slug} audition={audition} />
          ))}
        </div>
      </section>

      <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <h2 className="text-3xl font-black leading-tight text-slate-950">
          費用なしのアイドルオーディションとは？
        </h2>

        <p className="mt-6 leading-8 text-slate-600">
          費用なしのアイドルオーディションとは、応募時や合格後にかかる費用負担が少ない募集のことです。
          たとえば、応募無料、登録料なし、レッスン費無料、衣装代の運営負担などが明記されている募集は、費用面で比較しやすいと言えます。
        </p>

        <p className="mt-4 leading-8 text-slate-600">
          ただし、「無料」と書かれている範囲は募集によって違います。
          応募だけが無料なのか、合格後の活動費用も無料なのか、交通費や撮影費は自己負担なのかを確認することが大切です。
        </p>

        <div className="mt-8 rounded-3xl bg-pink-50 p-6">
          <h2 className="text-xl font-black text-slate-950">
            まず結論：「応募無料」だけで判断しない
          </h2>
          <p className="mt-3 leading-8 text-slate-700">
            費用なしの募集を探すときは、応募時の費用だけでなく、合格後のレッスン費、衣装代、撮影費、交通費、ライブノルマまで確認しましょう。
            費用項目が明確な募集ほど、応募前に判断しやすくなります。
          </p>
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            費用なしの募集で確認したいポイント
          </h2>
          <div className="mt-5 grid gap-4">
            {freePoints.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-black text-slate-950">💡 {item.title}</h3>
                <p className="mt-3 leading-8 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            費用なしオーディションのチェックリスト
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
            「レッスン無料」の意味を確認する
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            未経験からアイドルを始める場合、歌やダンスのレッスンが必要になることがあります。
            レッスン無料と書かれている場合でも、どの範囲が無料なのか、追加レッスンや外部レッスンが有料になるのかは確認しておきましょう。
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            未経験から応募したい方は、
            <Link href="/idol-audition/mikeiken" className="font-bold text-pink-600 hover:underline">
              未経験OKのアイドルオーディション一覧
            </Link>
            も確認してください。
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            費用なしでも怪しい募集には注意
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            費用なしと書かれていても、運営会社や活動実績が確認できない、面接場所が不明確、契約内容が説明されない場合は注意が必要です。
            費用の有無だけでなく、運営情報や選考フローも確認しましょう。
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            不安がある場合は、
            <Link href="/idol-audition/suspicious" className="font-bold text-pink-600 hover:underline">
              怪しいアイドルオーディションの見分け方
            </Link>
            も参考にしてください。
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            高校生・未成年は保護者にも費用を説明する
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            高校生や未成年が応募する場合、費用なしと書かれていても保護者に説明しておくことが大切です。
            応募費用、合格後費用、交通費、契約内容、活動時間を一緒に確認しましょう。
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            高校生向けの注意点は、
            <Link href="/idol-audition/high-school" className="font-bold text-pink-600 hover:underline">
              高校生OKのアイドルオーディション一覧
            </Link>
            でも解説しています。
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
            費用なしのアイドルオーディションを探す
          </h2>
          <p className="mt-3 leading-8 text-slate-200">
            アイドルオーディションナビでは、費用なし、レッスン無料、未経験OK、東京、高校生相談可などの条件で募集情報を探せます。
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
