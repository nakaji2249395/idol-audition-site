import type { Metadata } from "next";
import Link from "next/link";
import { FeaturedHiraeth } from "@/components/FeaturedHiraeth";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "親にアイドルオーディションを説明するには？保護者同意・費用・安全面の伝え方",
  description:
    "アイドルオーディションを親に説明する方法を解説。未成年・高校生が応募前に確認すべき保護者同意、費用、契約、活動時間、安全面、学業との両立をまとめています。",
  alternates: {
    canonical: "/idol-audition/parents"
  },
  openGraph: {
    title: "親にアイドルオーディションを説明するには？保護者同意・費用・安全面の伝え方",
    description:
      "未成年・高校生がアイドルオーディションを親に説明するときに確認すべきポイントを解説します。",
    url: `${siteConfig.url}/idol-audition/parents`,
    type: "article"
  }
};

const explainPoints = [
  {
    title: "どこの運営が募集しているのか",
    text: "親が一番不安に思いやすいのは、どこの誰が募集しているのか分からないことです。運営会社名、公式サイト、公式SNS、過去のライブ実績を見せられるようにしておきましょう。"
  },
  {
    title: "費用はかかるのか",
    text: "応募料、登録料、レッスン費、衣装代、撮影費、交通費、ライブノルマなど、費用に関わる項目を整理して伝えましょう。費用なしの募集でも、交通費など自己負担があるか確認が必要です。"
  },
  {
    title: "活動場所と活動時間",
    text: "どこでレッスンするのか、ライブはどのエリアが多いのか、帰宅時間は遅くなりすぎないかを説明しましょう。高校生の場合、学校生活との両立も重要です。"
  },
  {
    title: "保護者同意が必要か",
    text: "未成年がアイドルオーディションに応募する場合、面接時や契約時に保護者同意が必要になることが多いです。応募前に保護者同席が可能かも確認しましょう。"
  },
  {
    title: "合格後に何をするのか",
    text: "レッスン、ライブ、撮影、SNS発信、特典会など、合格後の活動内容を説明できると安心されやすくなります。活動頻度やスケジュール感も伝えましょう。"
  }
];

const parentConcerns = [
  {
    title: "怪しい事務所ではないか",
    text: "公式サイト、公式SNS、過去のライブ出演、所属メンバーの活動実績、運営会社情報を見せることで不安を減らせます。"
  },
  {
    title: "お金を請求されないか",
    text: "費用項目を一覧にして、無料なのか自己負担なのかを明確にしましょう。分からない項目は応募前に運営へ確認するのが大切です。"
  },
  {
    title: "学校に影響しないか",
    text: "テスト期間、学校行事、部活動、アルバイトと両立できるかを話し合いましょう。無理なスケジュールでは続けにくくなります。"
  },
  {
    title: "帰宅時間や安全面が心配",
    text: "レッスン場所、ライブ会場、終演時間、帰宅ルートを確認しましょう。未成年の場合は保護者同席や送迎についても相談できます。"
  },
  {
    title: "契約内容が心配",
    text: "契約期間、報酬、物販バック、禁止事項、退所時の条件などは、本人だけでなく保護者も確認するのがおすすめです。"
  }
];

const checklist = [
  "運営会社名・公式サイト・公式SNSを確認した",
  "募集ページや応募URLを親に見せられる",
  "応募料・登録料・レッスン費・衣装代を確認した",
  "活動地域と帰宅時間を説明できる",
  "レッスン・ライブの頻度を確認した",
  "学校や仕事との両立について考えた",
  "未成年の場合の保護者同意の流れを確認した",
  "面接場所と選考フローを確認した",
  "契約内容を親と一緒に確認するつもりでいる",
  "不安な点を運営に質問できる状態にしている"
];

const faq = [
  {
    question: "アイドルオーディションは親に言うべきですか？",
    answer:
      "未成年や高校生の場合は、できるだけ早い段階で親に説明するのがおすすめです。合格後の契約や活動には保護者同意が必要になることが多いため、後から話すよりも応募前に相談した方が安心です。"
  },
  {
    question: "親に反対されたらどうすればいいですか？",
    answer:
      "まずは反対されている理由を聞きましょう。費用、安全面、学校との両立、運営会社への不安など、理由を分けて整理し、一つずつ情報を集めて説明すると話し合いやすくなります。"
  },
  {
    question: "未成年の応募には保護者同意が必要ですか？",
    answer:
      "必要になることが多いです。応募段階では不要でも、面接時や契約時に保護者同意が必要になる場合があります。募集ページや応募先で確認しましょう。"
  },
  {
    question: "親に説明するとき、何を見せればいいですか？",
    answer:
      "募集ページ、公式サイト、公式SNS、運営会社情報、費用項目、活動地域、選考フロー、合格後の活動内容を見せると説明しやすくなります。"
  },
  {
    question: "親が安全面を心配しています。どう説明すればいいですか？",
    answer:
      "面接場所、活動場所、帰宅時間、保護者同席の可否、運営会社の実績を確認して伝えましょう。不安が残る場合は、面接時に保護者同席が可能か相談するのがおすすめです。"
  }
];

export default function ParentsPage() {
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
    headline: "親にアイドルオーディションを説明するには？保護者同意・費用・安全面の伝え方",
    description:
      "未成年・高校生がアイドルオーディションを親に説明するときに確認すべきポイントを解説します。",
    mainEntityOfPage: `${siteConfig.url}/idol-audition/parents`,
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
        <p className="text-sm font-bold text-pink-600">For Parents</p>
        <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950">
          親にアイドルオーディションを説明するには？
        </h1>

        <p className="mt-6 leading-8 text-slate-600">
          アイドルオーディションに応募したいと思っても、親にどう説明すればいいか悩む人は多いです。
          特に高校生や未成年の場合、保護者同意、費用、安全面、学校との両立などをきちんと説明する必要があります。
        </p>

        <p className="mt-4 leading-8 text-slate-600">
          親が心配するのは、「夢を否定したいから」ではなく、危ない募集ではないか、お金を請求されないか、学校生活に影響しないか、契約でトラブルにならないかという点です。
          その不安に答えられる情報を整理してから話すと、理解してもらいやすくなります。
        </p>

        <div className="mt-8 rounded-3xl bg-pink-50 p-6">
          <h2 className="text-xl font-black text-slate-950">
            まず結論：親には「運営・費用・安全面・学業との両立」を説明する
          </h2>
          <p className="mt-3 leading-8 text-slate-700">
            「アイドルをやりたい」という気持ちだけでなく、どこの運営なのか、費用はいくらか、活動場所はどこか、学校と両立できるかを説明しましょう。
            募集ページや公式SNSを一緒に見せると話しやすくなります。
          </p>
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            親に説明するときに伝えるべきこと
          </h2>
          <div className="mt-5 grid gap-4">
            {explainPoints.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-black text-slate-950">👪 {item.title}</h3>
                <p className="mt-3 leading-8 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            親が心配しやすいポイントと答え方
          </h2>
          <div className="mt-5 grid gap-4">
            {parentConcerns.map((item) => (
              <div key={item.title} className="rounded-2xl bg-slate-50 p-5">
                <h3 className="font-black text-slate-950">不安：{item.title}</h3>
                <p className="mt-3 leading-8 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            親に見せる前のチェックリスト
          </h2>
          <div className="mt-5 grid gap-3">
            {checklist.map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 p-4 leading-8 text-slate-700">
                ✅ {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            親に説明するときの例文
          </h2>
          <div className="mt-5 rounded-2xl bg-slate-50 p-5 leading-8 text-slate-700">
            <p>
              アイドルオーディションに応募したいと思っています。
              募集している運営や活動内容を調べたので、一緒に確認してほしいです。
              応募前に、費用、活動場所、活動時間、契約内容、学校との両立についても確認します。
            </p>
            <p className="mt-4">
              未成年の場合は保護者同意が必要になることも分かっているので、勝手に契約したり、親に内緒で進めたりするつもりはありません。
              不安な点があれば、面接前に運営へ質問します。
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            費用について親に説明する
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            親が特に気にしやすいのは費用です。
            応募無料なのか、合格後に登録料やレッスン費がかかるのか、衣装代や交通費は自己負担なのかを整理して伝えましょう。
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            費用面を詳しく確認したい場合は、
            <Link href="/idol-audition/cost" className="font-bold text-pink-600 hover:underline">
              アイドルオーディションの費用の見方
            </Link>
            や
            <Link href="/idol-audition/free" className="ml-1 font-bold text-pink-600 hover:underline">
              費用なしのアイドルオーディション一覧
            </Link>
            も参考にしてください。
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            親に内緒で応募するのは避けた方がいい？
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            未成年の場合、親に内緒で応募や契約を進めるのはおすすめしません。
            応募時は本人だけで進められても、合格後の契約や活動開始時に保護者同意が必要になることが多いからです。
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            親に言いにくい場合でも、まずは募集ページを見せて「一緒に確認してほしい」と伝える形にすると、話し合いを始めやすくなります。
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            怪しい募集ではないか不安な場合
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            親が不安に感じる場合は、運営会社、公式SNS、過去のライブ実績、費用、契約内容、面接場所を一緒に確認しましょう。
            すぐにお金を払うよう求められる、親に言わなくていいと言われる、面接場所が曖昧などの場合は注意が必要です。
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            不安がある場合は、
            <Link href="/idol-audition/suspicious" className="font-bold text-pink-600 hover:underline">
              怪しいアイドルオーディションの見分け方
            </Link>
            も確認してください。
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
            親に説明しやすいアイドルオーディションを探す
          </h2>
          <p className="mt-3 leading-8 text-slate-200">
            アイドルオーディションナビでは、費用、活動地域、未経験可否、応募方法を確認しながら募集情報を探せます。
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
