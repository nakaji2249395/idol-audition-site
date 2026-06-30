import type { Metadata } from "next";
import Link from "next/link";
import { AuditionCard } from "@/components/AuditionCard";
import { FeaturedHiraeth } from "@/components/FeaturedHiraeth";
import { auditions } from "@/lib/auditions";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "高校生OKのアイドルオーディション一覧｜未成年が応募前に確認すること",
  description:
    "高校生OKのアイドルオーディションを探せます。未成年が応募前に確認すべき保護者同意、費用、活動時間、学業との両立、面接時の注意点を解説します。",
  alternates: {
    canonical: "/idol-audition/high-school"
  },
  openGraph: {
    title: "高校生OKのアイドルオーディション一覧｜未成年が応募前に確認すること",
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

export default function HighSchoolAuditionPage() {
  const highSchoolAuditions = auditions.filter((audition) =>
    `${audition.features.join(" ")} ${audition.student}`.includes("高校生") ||
    `${audition.features.join(" ")} ${audition.student}`.includes("学生")
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
    headline: "高校生OKのアイドルオーディション一覧｜未成年が応募前に確認すること",
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
        <p className="text-sm font-bold text-pink-600">High School Student</p>
        <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950">
          高校生OKのアイドルオーディション一覧
        </h1>
        <p className="mt-4 max-w-3xl leading-8 text-slate-600">
          高校生や未成年でも応募しやすいアイドルオーディションをまとめています。
          応募前に確認したい保護者同意、費用、活動時間、学業との両立についても解説します。
        </p>
      </header>

      <FeaturedHiraeth />

      <section className="mb-16">
        <div className="mb-6">
          <p className="text-sm font-bold text-pink-600">Audition List</p>
          <h2 className="mt-1 text-3xl font-black text-slate-950">
            高校生・学生相談可の募集
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {highSchoolAuditions.map((audition) => (
            <AuditionCard key={audition.slug} audition={audition} />
          ))}
        </div>
      </section>

      <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
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
