import type { Metadata } from "next";
import Link from "next/link";
import { FeaturedHiraeth } from "@/components/FeaturedHiraeth";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "アイドルオーディションは怪しい？安全な募集の見分け方を解説",
  description:
    "アイドルオーディションが怪しいか不安な方へ。登録料、レッスン費、契約書、運営会社、面接場所、報酬、未成年応募など、応募前に確認すべきポイントを解説します。",
  alternates: {
    canonical: "/idol-audition/suspicious"
  },
  openGraph: {
    title: "アイドルオーディションは怪しい？安全な募集の見分け方を解説",
    description:
      "登録料、レッスン費、契約書、運営会社、面接場所など、アイドルオーディション応募前に確認すべきポイントを解説します。",
    url: `${siteConfig.url}/idol-audition/suspicious`,
    type: "article"
  }
};

const dangerSigns = [
  {
    title: "合格後に高額な費用を請求される",
    text: "登録料、入所金、レッスン費、宣材写真代、衣装代などが後から出てくるケースがあります。応募前や面談時に、何が無料で何が自己負担なのかを確認しましょう。"
  },
  {
    title: "運営会社や活動実績が確認できない",
    text: "会社名、所在地、公式サイト、公式SNS、過去のライブ実績が見つからない場合は慎重に判断しましょう。実在するグループなのか、どこで活動しているのかを確認することが大切です。"
  },
  {
    title: "面接場所が不自然",
    text: "カフェや事務所での面談自体は珍しくありませんが、住所が曖昧、密室で一対一、夜遅い時間帯など不安がある場合は、事前に詳細を確認しましょう。未成年の場合は保護者同席を相談するのが安心です。"
  },
  {
    title: "契約内容が説明されない",
    text: "活動期間、報酬、物販バック、禁止事項、退所時の条件などが説明されないまま活動開始を求められる場合は注意が必要です。契約書や説明資料を確認しましょう。"
  },
  {
    title: "応募を急かされる",
    text: "今すぐ決めないと枠がなくなる、今日中に支払ってほしい、親には言わなくていい、など急かす表現がある場合は一度立ち止まりましょう。"
  }
];

const safeChecks = [
  "運営会社名・所在地・公式SNSが確認できる",
  "募集条件、年齢条件、活動地域が明記されている",
  "登録料、レッスン費、衣装代など費用の有無が分かる",
  "報酬や物販バックの考え方が説明される",
  "面接場所と選考フローが明確",
  "未成年の場合、保護者同意や同席について案内がある",
  "過去のライブ実績や所属メンバーの活動が確認できる",
  "合格後の活動内容が具体的に説明されている"
];

const faq = [
  {
    question: "アイドルオーディションは全部怪しいですか？",
    answer:
      "すべてが怪しいわけではありません。実際に多くのアイドルグループがオーディションでメンバーを募集しています。ただし、費用や契約、運営情報が不明確な募集は慎重に確認する必要があります。"
  },
  {
    question: "無料のアイドルオーディションなら安全ですか？",
    answer:
      "応募無料でも、合格後にレッスン費、撮影費、衣装代などが発生する場合があります。応募無料かどうかだけでなく、合格後にかかる費用まで確認しましょう。"
  },
  {
    question: "未経験OKの募集は本当に受かりますか？",
    answer:
      "未経験でも採用される可能性はあります。歌やダンスの経験だけでなく、継続力、礼儀、SNS発信への意欲、活動への理解を見られることが多いです。"
  },
  {
    question: "高校生が応募するときに気をつけることは？",
    answer:
      "保護者同意、活動時間、帰宅時間、費用、学業との両立を確認しましょう。面接時に保護者同席が可能かどうかも確認すると安心です。"
  },
  {
    question: "怪しいと思ったらどうすればいいですか？",
    answer:
      "すぐに応募や支払いをせず、運営情報、費用、契約内容、活動実績を確認しましょう。不安が残る場合は、保護者や信頼できる人に相談してから判断するのがおすすめです。"
  }
];

export default function SuspiciousPage() {
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
    headline: "アイドルオーディションは怪しい？安全な募集の見分け方を解説",
    description:
      "アイドルオーディションが怪しいか不安な方へ、応募前に確認すべき費用、契約、運営情報、面接場所などを解説します。",
    mainEntityOfPage: `${siteConfig.url}/idol-audition/suspicious`,
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
        <p className="text-sm font-bold text-pink-600">Safety Guide</p>
        <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950">
          アイドルオーディションは怪しい？安全な募集の見分け方を解説
        </h1>

        <p className="mt-6 leading-8 text-slate-600">
          アイドルオーディションに応募したいと思っても、「怪しくないかな」「お金を請求されないかな」「親にどう説明すればいいかな」と不安になる人は多いです。
          特に地下アイドルや新規グループの募集は、情報が少なく見えることもあります。
        </p>

        <p className="mt-4 leading-8 text-slate-600">
          大切なのは、募集文の雰囲気だけで判断しないことです。
          登録料、レッスン費、衣装代、契約内容、運営会社、活動場所、面接場所などを確認すれば、安全に応募しやすい募集かどうかを判断しやすくなります。
        </p>

        <div className="mt-8 rounded-3xl bg-pink-50 p-6">
          <h2 className="text-xl font-black text-slate-950">
            まず結論：怪しいかどうかは「費用・運営・契約・面接場所」で見る
          </h2>
          <p className="mt-3 leading-8 text-slate-700">
            アイドルオーディションで見るべきポイントは、見た目の華やかさではありません。
            どこの運営が募集しているのか、どんな費用がかかるのか、合格後に何をするのか、契約や報酬がどうなっているのかを確認しましょう。
          </p>
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            怪しいアイドルオーディションに見られやすい特徴
          </h2>
          <div className="mt-5 grid gap-4">
            {dangerSigns.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-black text-slate-950">⚠️ {item.title}</h3>
                <p className="mt-3 leading-8 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            応募前に確認したいチェックリスト
          </h2>
          <div className="mt-5 grid gap-3">
            {safeChecks.map((check) => (
              <div key={check} className="rounded-2xl bg-slate-50 p-4 leading-8 text-slate-700">
                ✅ {check}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            費用で確認すべきポイント
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            アイドルオーディションでは、「応募無料」と書かれていても、合格後に費用が発生する場合があります。
            確認したいのは、応募時の費用だけではありません。合格後にレッスン費、宣材写真代、衣装代、交通費、ライブノルマがあるかまで確認しましょう。
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            費用について詳しく知りたい場合は、
            <Link href="/idol-audition/cost" className="font-bold text-pink-600 hover:underline">
              アイドルオーディションの費用の見方
            </Link>
            も確認してください。
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            未経験OKの募集は怪しい？
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            未経験OKと書かれているから怪しい、というわけではありません。
            実際に、地下アイドルや新規アイドルグループでは未経験からスタートするメンバーも多くいます。
            ただし、未経験者に対して高額なレッスン費や登録料を請求する募集には注意が必要です。
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            未経験から探す場合は、
            <Link href="/idol-audition/mikeiken" className="font-bold text-pink-600 hover:underline">
              未経験OKのアイドルオーディション一覧
            </Link>
            も参考にしてください。
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            高校生・未成年が応募するときの注意点
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            高校生や未成年が応募する場合は、保護者同意が必要になることが多いです。
            活動時間、帰宅時間、費用、学校との両立、SNS運用についても確認しておきましょう。
            不安がある場合は、面接時に保護者同席ができるか確認すると安心です。
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            親に説明する準備をしたい方は、
            <Link href="/idol-audition/parents" className="font-bold text-pink-600 hover:underline">
              親にアイドルオーディションを説明する方法
            </Link>
            も読んでみてください。
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
            安心して応募できるアイドルオーディションを探す
          </h2>
          <p className="mt-3 leading-8 text-slate-200">
            アイドルオーディションナビでは、費用、活動地域、未経験可否、応募方法をできるだけ分かりやすく整理しています。
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
