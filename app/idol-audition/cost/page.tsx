import type { Metadata } from "next";
import Link from "next/link";
import { FeaturedHiraeth } from "@/components/FeaturedHiraeth";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "アイドルオーディションの費用｜登録料・レッスン費・衣装代の注意点",
  description:
    "アイドルオーディションでお金はかかる？登録料、レッスン費、衣装代、撮影費、交通費、ライブノルマ、合格後費用など応募前に確認すべき費用項目を解説します。",
  alternates: {
    canonical: "/idol-audition/cost"
  },
  openGraph: {
    title: "アイドルオーディションの費用｜登録料・レッスン費・衣装代の注意点",
    description:
      "アイドルオーディションでお金はかかるのか、応募前に確認すべき費用項目を解説します。",
    url: `${siteConfig.url}/idol-audition/cost`,
    type: "article"
  }
};

const costItems = [
  {
    title: "応募料・オーディション参加費",
    text: "応募そのものに費用がかかるかどうかです。多くのアイドルオーディションでは応募無料ですが、まれに審査料や参加費が発生するケースもあるため確認しましょう。"
  },
  {
    title: "登録料・入所金",
    text: "合格後に事務所やスクールへ所属するための登録料・入所金が必要になる場合があります。高額な請求がある場合は、内訳と契約内容を必ず確認してください。"
  },
  {
    title: "レッスン費",
    text: "歌やダンスのレッスン費が無料なのか、月額で自己負担なのかは重要です。未経験OKの募集でも、合格後にレッスン費が発生する場合があります。"
  },
  {
    title: "衣装代",
    text: "衣装を運営側が用意するのか、一部自己負担なのかを確認しましょう。グループによっては、活動初期の衣装や靴、小物などが自己負担になることがあります。"
  },
  {
    title: "宣材写真・撮影費",
    text: "プロフィール写真やアーティスト写真の撮影費が自己負担になる場合があります。撮影費が必要な場合は、金額と撮影内容を確認しましょう。"
  },
  {
    title: "交通費",
    text: "レッスン、ライブ、撮影、面接などの交通費が支給されるかどうかです。特に学生や遠方から通う場合は、月の負担額を事前に考えておく必要があります。"
  },
  {
    title: "ライブノルマ",
    text: "チケット販売ノルマや集客ノルマがあるかどうかも確認しましょう。ノルマ未達時に自己負担が発生する条件がある場合は慎重に判断してください。"
  },
  {
    title: "物販・チェキのバック率",
    text: "報酬に関わる部分です。チェキ、グッズ、チケット、配信などの売上に対して、どのように報酬が発生するのか確認しておきましょう。"
  }
];

const checkList = [
  "応募時に費用がかかるか",
  "合格後に登録料・入所金があるか",
  "レッスン費は無料か、月額負担か",
  "衣装代や撮影費は誰が負担するか",
  "交通費は支給されるか、自己負担か",
  "ライブノルマやチケットノルマがあるか",
  "報酬や物販バックの条件が説明されるか",
  "費用について契約書や説明資料で確認できるか"
];

const faq = [
  {
    question: "アイドルオーディションはお金がかかりますか？",
    answer:
      "応募無料のオーディションも多いですが、合格後にレッスン費、衣装代、撮影費、交通費などが発生する場合があります。応募前に、合格後の費用まで確認することが大切です。"
  },
  {
    question: "レッスン費無料のオーディションはありますか？",
    answer:
      "あります。運営側がレッスン費を負担する募集もあります。ただし、無料と書かれていても、衣装代や交通費など別の費用が発生する場合があるため、費用項目を分けて確認しましょう。"
  },
  {
    question: "高額な登録料を請求されたらどうすればいいですか？",
    answer:
      "その場ですぐ支払わず、金額の内訳、契約内容、返金条件、活動内容を確認しましょう。不安がある場合は、保護者や信頼できる人に相談してから判断してください。"
  },
  {
    question: "費用なしの募集なら安心ですか？",
    answer:
      "費用なしは安心材料の一つですが、それだけで判断するのは危険です。運営会社、活動実績、契約内容、報酬、選考フローも確認しましょう。"
  },
  {
    question: "高校生が費用面で気をつけることは？",
    answer:
      "保護者に費用項目を見せて、登録料、レッスン費、衣装代、交通費、ライブノルマの有無を一緒に確認しましょう。未成年の場合は保護者同意が必要になることが多いです。"
  }
];

export default function CostPage() {
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
    headline: "アイドルオーディションの費用｜登録料・レッスン費・衣装代の注意点",
    description:
      "アイドルオーディションでお金はかかるのか、応募前に確認すべき費用項目を解説します。",
    mainEntityOfPage: `${siteConfig.url}/idol-audition/cost`,
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
    <main className="mx-auto max-w-4xl px-5 py-12">
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

      <article className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <p className="text-sm font-bold text-pink-600">Cost Guide</p>
        <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950">
          アイドルオーディションでお金はかかる？費用の見方を解説
        </h1>

        <p className="mt-6 leading-8 text-slate-600">
          アイドルオーディションを受けるときに、多くの人が不安に感じるのが費用です。
          「応募は無料なのか」「合格後にお金がかかるのか」「レッスン費や衣装代は誰が負担するのか」は、応募前に必ず確認したいポイントです。
        </p>

        <p className="mt-4 leading-8 text-slate-600">
          特に未経験OKのオーディションや新規グループの募集では、活動内容だけでなく、費用負担のルールを理解しておくことが大切です。
          費用がかかること自体が必ず悪いわけではありませんが、金額や内訳が不明確なまま応募・契約するのは避けましょう。
        </p>

        <div className="mt-8 rounded-3xl bg-pink-50 p-6">
          <h2 className="text-xl font-black text-slate-950">
            まず結論：応募無料でも「合格後費用」を確認する
          </h2>
          <p className="mt-3 leading-8 text-slate-700">
            「応募無料」と書かれていても、合格後に登録料、レッスン費、衣装代、撮影費、交通費などが発生する場合があります。
            応募時の費用だけでなく、活動開始後に何が自己負担になるのかを確認しましょう。
          </p>
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            アイドルオーディションで確認したい費用項目
          </h2>

          <div className="mt-5 grid gap-4">
            {costItems.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-black text-slate-950">💰 {item.title}</h3>
                <p className="mt-3 leading-8 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            応募前の費用チェックリスト
          </h2>
          <div className="mt-5 grid gap-3">
            {checkList.map((check) => (
              <div key={check} className="rounded-2xl bg-slate-50 p-4 leading-8 text-slate-700">
                ✅ {check}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            「費用なし」と「応募無料」は同じではない
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            応募無料とは、オーディションを受ける段階で費用がかからないという意味です。
            一方で、費用なしという場合は、合格後のレッスン費や活動費も含めて負担がない、または少ないという意味で使われることがあります。
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            ただし、募集文によって表現が違うため、「応募無料」と書かれているだけで安心せず、合格後にかかる費用まで確認するのがおすすめです。
            費用負担が少ない募集を探す場合は、
            <Link href="/idol-audition/free" className="font-bold text-pink-600 hover:underline">
              費用なしのアイドルオーディション一覧
            </Link>
            も参考にしてください。
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            レッスン費がかかる募集は怪しい？
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            レッスン費がかかるからといって、必ず怪しいわけではありません。
            スクール型や育成型のプロジェクトでは、レッスン費が発生することもあります。
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            ただし、アイドルグループのメンバー募集として応募したのに、実態が高額スクールへの勧誘になっている場合は注意が必要です。
            不安な場合は、
            <Link href="/idol-audition/suspicious" className="font-bold text-pink-600 hover:underline">
              怪しいアイドルオーディションの見分け方
            </Link>
            も確認してください。
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            報酬やバック率も確認する
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            費用だけでなく、報酬の仕組みも確認しましょう。
            地下アイドルやライブアイドルの場合、チェキ、グッズ、チケット、配信などの売上に応じて報酬が発生することがあります。
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            固定給があるのか、歩合制なのか、交通費は出るのか、物販バックは何に対して発生するのかを確認しておくと、活動後の認識違いを減らせます。
          </p>
        </section>

        <FeaturedHiraeth />

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
            費用を確認しながらアイドルオーディションを探す
          </h2>
          <p className="mt-3 leading-8 text-slate-200">
            アイドルオーディションナビでは、登録料、レッスン費、活動地域、未経験可否、応募方法をできるだけ分かりやすく整理しています。
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
