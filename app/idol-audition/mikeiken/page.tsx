import type { Metadata } from "next";
import Link from "next/link";
import { AuditionCard } from "@/components/AuditionCard";
import { FeaturedHiraeth } from "@/components/FeaturedHiraeth";
import { auditions } from "@/lib/auditions";
import { siteConfig } from "@/lib/site";
import { getAllAuditions } from "@/lib/auditionData";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "未経験OKのアイドルオーディション一覧｜初心者でも応募できる募集",
  description:
    "未経験OKのアイドルオーディションを探せます。歌やダンスが初めてでも応募しやすい募集、受かるために見られるポイント、応募前の注意点を解説します。",
  alternates: {
    canonical: "/idol-audition/mikeiken"
  },
  openGraph: {
    title: "未経験OKのアイドルオーディション一覧｜初心者でも応募できる募集",
    description:
      "未経験OKのアイドルオーディション、初心者が応募前に確認すべきポイントを解説します。",
    url: `${siteConfig.url}/idol-audition/mikeiken`,
    type: "article"
  }
};

const importantPoints = [
  {
    title: "歌やダンスの経験よりも、継続力を見られる",
    text: "未経験OKの募集では、最初から完璧に歌える・踊れることよりも、レッスンを続けられるか、注意されたことを改善できるか、活動に前向きに取り組めるかが見られます。"
  },
  {
    title: "SNS発信への意欲があるか",
    text: "アイドル活動ではライブだけでなく、X、TikTok、Instagramなどでの発信も重要です。未経験でも、発信を続ける意欲がある人は評価されやすいです。"
  },
  {
    title: "礼儀や連絡の早さも大事",
    text: "挨拶ができる、返信が早い、約束を守れる、時間を守れるといった基本的な部分は、運営側がかなり見ています。未経験でも信頼できる人は活動を始めやすいです。"
  },
  {
    title: "活動条件を理解しているか",
    text: "ライブ、レッスン、撮影、SNS、特典会など、アイドル活動には複数の仕事があります。応募前に活動内容を理解していると、面接でも話しやすくなります。"
  },
  {
    title: "自分の強みを言葉にできるか",
    text: "歌やダンス以外にも、笑顔、雰囲気、声、話し方、SNS、被写体経験、配信経験、継続してきたことなどは強みになります。未経験でも伝え方次第で印象は変わります。"
  }
];

const checks = [
  "未経験OKと明記されているか",
  "レッスン体制があるか",
  "費用やレッスン費の有無が確認できるか",
  "活動地域と活動頻度が自分に合っているか",
  "学業や仕事との両立が可能か",
  "応募後の選考フローが分かるか",
  "運営会社や公式SNSが確認できるか",
  "合格後に何をするのか説明があるか"
];

const faq = [
  {
    question: "未経験でもアイドルオーディションに受かりますか？",
    answer:
      "未経験でも受かる可能性はあります。特に新規グループや地下アイドルの募集では、歌やダンスの経験よりも、やる気、継続力、発信力、礼儀、活動への理解を重視することがあります。"
  },
  {
    question: "歌やダンスができなくても応募していいですか？",
    answer:
      "未経験OKと書かれている募集であれば応募できます。ただし、合格後にレッスンへ真剣に取り組む姿勢は必要です。経験がないことよりも、学ぶ気持ちがあるかが大切です。"
  },
  {
    question: "未経験OKの募集は怪しくないですか？",
    answer:
      "未経験OKだから怪しいとは限りません。ただし、高額なレッスン費や登録料を請求される場合は注意が必要です。費用、契約、運営情報を確認しましょう。"
  },
  {
    question: "未経験者が応募文に書くべきことは？",
    answer:
      "なぜアイドルをやりたいのか、なぜそのグループに応募したのか、活動を続けられる理由、自分の強み、SNS発信への意欲を書くと伝わりやすいです。"
  },
  {
    question: "高校生でも未経験から応募できますか？",
    answer:
      "高校生OKの募集であれば応募できる場合があります。未成年の場合は保護者同意、活動時間、費用、学校との両立を確認しましょう。"
  }
];

export default async function MikeikenAuditionPage() {
  const allAuditions = await getAllAuditions();
  const allAuditions = await getAllAuditions();
  const mikeikenAuditions = allAuditions.filter((audition) =>
    audition.experience.includes("未経験") || audition.features.includes("未経験OK")
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
    headline: "未経験OKのアイドルオーディション一覧｜初心者でも応募できる募集",
    description:
      "未経験OKのアイドルオーディション、初心者が応募前に確認すべきポイントを解説します。",
    mainEntityOfPage: `${siteConfig.url}/idol-audition/mikeiken`,
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
        <p className="text-sm font-bold text-pink-600">Beginner Friendly</p>
        <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950">
          未経験OKのアイドルオーディション一覧
        </h1>
        <p className="mt-4 max-w-3xl leading-8 text-slate-600">
          歌やダンスが初めてでも応募しやすい、未経験OKのアイドルオーディションをまとめています。
          初心者が応募前に確認したいポイントや、運営側が見ている部分も解説します。
        </p>
      </header>

      <FeaturedHiraeth />

      <section className="mb-16">
        <div className="mb-6">
          <p className="text-sm font-bold text-pink-600">Audition List</p>
          <h2 className="mt-1 text-3xl font-black text-slate-950">
            未経験OKの募集
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {mikeikenAuditions.map((audition) => (
            <AuditionCard key={audition.slug} audition={audition} />
          ))}
        </div>
      </section>

      <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <h2 className="text-3xl font-black leading-tight text-slate-950">
          未経験でもアイドルオーディションに応募できる？
        </h2>

        <p className="mt-6 leading-8 text-slate-600">
          結論から言うと、未経験でもアイドルオーディションに応募できます。
          特に地下アイドル、ライブアイドル、新規グループの初期メンバー募集では、歌やダンスの経験よりも、やる気や継続力、雰囲気、発信力を重視することがあります。
        </p>

        <p className="mt-4 leading-8 text-slate-600">
          もちろん、経験がある方が有利になる場面もあります。
          しかし、未経験だから必ず不利というわけではありません。
          大切なのは、活動を続けられる環境があるか、レッスンに前向きか、ファンに向けて発信できるか、グループ活動に向いているかです。
        </p>

        <div className="mt-8 rounded-3xl bg-pink-50 p-6">
          <h2 className="text-xl font-black text-slate-950">
            まず結論：未経験者は「伸びしろ」と「継続力」を見られる
          </h2>
          <p className="mt-3 leading-8 text-slate-700">
            未経験OKのオーディションで見られるのは、今の完成度だけではありません。
            これから成長できるか、活動を続けられるか、グループに前向きに関われるかが重要です。
          </p>
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            未経験者が見られやすいポイント
          </h2>
          <div className="mt-5 grid gap-4">
            {importantPoints.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-black text-slate-950">✨ {item.title}</h3>
                <p className="mt-3 leading-8 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            未経験OKの募集を選ぶときのチェックリスト
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
            未経験OKでも費用は確認する
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            未経験OKのオーディションでは、合格後にレッスンを受けることが多いです。
            そのレッスン費が無料なのか、月額でかかるのか、衣装代や撮影費があるのかは応募前に確認しましょう。
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
            を確認してください。
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            応募文では「未経験ですが」だけで終わらせない
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            未経験者の応募文で大切なのは、経験がないことを言い訳にしないことです。
            「未経験ですが頑張ります」だけではなく、なぜアイドルをやりたいのか、なぜそのグループに応募したのか、活動を続けられる理由を書きましょう。
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            応募文に不安がある方は、
            <Link href="/idol-audition/how-to-apply" className="font-bold text-pink-600 hover:underline">
              アイドルオーディションの応募文の書き方
            </Link>
            も参考にしてください。
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            未経験OKの募集は怪しくない？
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            未経験OKと書かれているから怪しい、というわけではありません。
            実際に、未経験からアイドル活動を始める人は多くいます。
            ただし、未経験者を対象に高額な登録料やレッスン費を請求する募集には注意が必要です。
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            不安な場合は、
            <Link href="/idol-audition/suspicious" className="font-bold text-pink-600 hover:underline">
              怪しいアイドルオーディションの見分け方
            </Link>
            を確認し、費用・運営会社・契約内容・面接場所をチェックしましょう。
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
            未経験OKのアイドルオーディションを探す
          </h2>
          <p className="mt-3 leading-8 text-slate-200">
            アイドルオーディションナビでは、未経験OK、費用なし、東京、学生相談可などの条件で募集情報を探せます。
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
