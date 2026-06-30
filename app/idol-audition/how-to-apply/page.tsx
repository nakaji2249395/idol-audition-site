import type { Metadata } from "next";
import Link from "next/link";
import { FeaturedHiraeth } from "@/components/FeaturedHiraeth";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "アイドルオーディションの応募文・自己PRの書き方｜未経験でも伝わる例文つき",
  description:
    "アイドルオーディションの応募文、志望動機、自己PRの書き方を解説。未経験でも運営に伝わりやすい応募内容、写真、SNS、面接前に準備することを紹介します。",
  alternates: {
    canonical: "/idol-audition/how-to-apply"
  },
  openGraph: {
    title: "アイドルオーディションの応募文・自己PRの書き方｜未経験でも伝わる例文つき",
    description:
      "アイドルオーディションの応募文、志望動機、自己PRの書き方を未経験向けに解説します。",
    url: `${siteConfig.url}/idol-audition/how-to-apply`,
    type: "article"
  }
};

const importantPoints = [
  {
    title: "なぜアイドルをやりたいのか",
    text: "ただ「有名になりたい」だけではなく、ステージに立ちたい理由、ファンに届けたいもの、アイドル活動で挑戦したいことを書きましょう。"
  },
  {
    title: "なぜそのグループに応募したのか",
    text: "どの募集にも使い回せる文章ではなく、楽曲、雰囲気、活動方針、メンバー、ライブを見た印象など、そのグループに応募した理由を書くと伝わりやすくなります。"
  },
  {
    title: "活動を続けられる理由",
    text: "アイドル活動は継続が大切です。学校や仕事との両立、通える地域、レッスンやライブに参加できる環境があることを伝えましょう。"
  },
  {
    title: "自分の強み",
    text: "歌、ダンス、配信、SNS、被写体、接客、継続してきたこと、笑顔、声、雰囲気など、自分の強みを具体的に書きましょう。未経験でも強みは作れます。"
  },
  {
    title: "SNS発信への意欲",
    text: "今のアイドル活動ではSNS発信も重要です。X、TikTok、Instagram、配信などを頑張れることは、運営側にとって大きな判断材料になります。"
  }
];

const badExamples = [
  "有名になりたいです。よろしくお願いします。",
  "友達にすすめられたので応募しました。",
  "歌もダンスもできませんが、たぶん頑張れます。",
  "条件はよく見ていませんが応募します。",
  "とにかく受かりたいです。何でもできます。"
];

const checks = [
  "名前・年齢・居住地など基本情報が分かる",
  "連絡先やSNSアカウントが正しく書かれている",
  "志望動機がそのグループ向けになっている",
  "未経験の場合でも、頑張れる理由が書かれている",
  "学校や仕事との両立について触れている",
  "写真が本人確認しやすい",
  "過度な加工写真だけになっていない",
  "文章が長すぎず、読みやすい",
  "応募条件を満たしている",
  "送信前に誤字脱字を確認している"
];

const faq = [
  {
    question: "未経験の場合、応募文には何を書けばいいですか？",
    answer:
      "なぜアイドルをやりたいのか、なぜそのグループに応募したのか、活動を続けられる理由、自分の強み、SNS発信への意欲を書くと伝わりやすいです。"
  },
  {
    question: "自己PRに書ける実績がありません。どうすればいいですか？",
    answer:
      "実績がなくても、継続してきたこと、得意な雰囲気、笑顔、声、人と話すこと、SNS発信、被写体経験、配信経験などを書けます。未経験の場合は伸びしろや継続力も大切です。"
  },
  {
    question: "応募写真はどんな写真がいいですか？",
    answer:
      "顔が分かる写真と全身の雰囲気が分かる写真があると判断しやすいです。過度な加工、顔が隠れている写真、暗すぎる写真だけにならないようにしましょう。"
  },
  {
    question: "志望動機は長い方がいいですか？",
    answer:
      "長ければ良いわけではありません。読みやすく、具体的で、そのグループに応募した理由が伝わる文章が大切です。短くても内容が具体的なら問題ありません。"
  },
  {
    question: "SNSのフォロワーが少なくても応募できますか？",
    answer:
      "フォロワー数だけで決まるわけではありません。ただし、SNSを頑張る意欲があることはプラスになります。投稿を継続できる姿勢を伝えましょう。"
  }
];

export default function HowToApplyPage() {
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
    headline: "アイドルオーディションの応募文・自己PRの書き方｜未経験でも伝わる例文つき",
    description:
      "アイドルオーディションの応募文、志望動機、自己PRの書き方を未経験向けに解説します。",
    mainEntityOfPage: `${siteConfig.url}/idol-audition/how-to-apply`,
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
        <p className="text-sm font-bold text-pink-600">How to Apply</p>
        <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950">
          アイドルオーディションの応募文・自己PRの書き方
        </h1>

        <p className="mt-6 leading-8 text-slate-600">
          アイドルオーディションに応募するとき、応募文や自己PRで何を書けばいいか悩む人は多いです。
          特に未経験の場合、「実績がない」「歌やダンスができない」「何をアピールすればいいか分からない」と不安になることがあります。
        </p>

        <p className="mt-4 leading-8 text-slate-600">
          しかし、未経験でも応募文の書き方で印象は変わります。
          大切なのは、熱量だけではなく、なぜ応募したのか、活動を続けられるのか、自分の強みは何かを具体的に伝えることです。
        </p>

        <div className="mt-8 rounded-3xl bg-pink-50 p-6">
          <h2 className="text-xl font-black text-slate-950">
            まず結論：応募文は「熱量＋具体性＋継続できる理由」が大事
          </h2>
          <p className="mt-3 leading-8 text-slate-700">
            「頑張ります」だけではなく、なぜアイドルをやりたいのか、なぜそのグループなのか、活動を続けられる環境があるのかを書きましょう。
            運営側は、今の完成度だけでなく、今後一緒に活動できるかを見ています。
          </p>
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            応募文・自己PRで見られやすいポイント
          </h2>
          <div className="mt-5 grid gap-4">
            {importantPoints.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-black text-slate-950">📝 {item.title}</h3>
                <p className="mt-3 leading-8 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            未経験者向けの応募文例
          </h2>
          <div className="mt-5 rounded-2xl bg-slate-50 p-5 leading-8 text-slate-700">
            <p>
              未経験ですが、アイドルとしてステージに立ち、見てくれる人の気持ちを動かせる存在になりたいと思い応募しました。
              貴グループの楽曲やライブの雰囲気に惹かれ、自分もこの場所で成長したいと感じています。
            </p>
            <p className="mt-4">
              歌やダンスはこれから本格的に学ぶ段階ですが、レッスンやSNS発信を継続して取り組む覚悟があります。
              学校や仕事とのスケジュールも調整し、活動に前向きに参加できます。
              未経験だからこそ吸収する姿勢を大切にし、グループに貢献できるよう努力します。
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            経験者向けの応募文例
          </h2>
          <div className="mt-5 rounded-2xl bg-slate-50 p-5 leading-8 text-slate-700">
            <p>
              これまでダンス経験があり、人前で表現することが好きです。
              アイドル活動では、パフォーマンスだけでなく、SNS発信やファンの方とのコミュニケーションも大切にしたいと考えています。
            </p>
            <p className="mt-4">
              貴グループのライブ映像を見て、楽曲の世界観やステージの熱量に惹かれました。
              これまでの経験を活かしながら、グループの一員として成長し、より多くの方に知ってもらえる存在になりたいです。
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            避けた方がいい応募文
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            熱意があっても、内容が抽象的すぎると伝わりにくくなります。
            次のような応募文は、できるだけ具体的な内容に直しましょう。
          </p>
          <div className="mt-5 grid gap-3">
            {badExamples.map((example) => (
              <div key={example} className="rounded-2xl bg-slate-50 p-4 leading-8 text-slate-700">
                ⚠️ {example}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            応募写真で気をつけること
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            応募写真は、運営側が雰囲気や本人確認をするために重要です。
            顔が分かる写真、全身の雰囲気が分かる写真、自然な表情の写真があると判断しやすくなります。
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            過度に加工された写真、顔が隠れている写真、暗すぎる写真だけだと、実際の雰囲気が分かりにくくなります。
            盛れている写真も大切ですが、本人らしさが伝わる写真も用意しましょう。
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            応募前チェックリスト
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
            応募前に募集条件も確認する
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            応募文が良くても、募集条件に合っていないと選考が進みにくいことがあります。
            活動地域、年齢条件、未経験可否、費用、活動頻度、保護者同意の有無は応募前に確認しましょう。
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            未経験から探す場合は
            <Link href="/idol-audition/mikeiken" className="mx-1 font-bold text-pink-600 hover:underline">
              未経験OKのアイドルオーディション一覧
            </Link>
            、費用面が不安な場合は
            <Link href="/idol-audition/free" className="mx-1 font-bold text-pink-600 hover:underline">
              費用なしのアイドルオーディション一覧
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
            応募文を準備してオーディションを探す
          </h2>
          <p className="mt-3 leading-8 text-slate-200">
            アイドルオーディションナビでは、未経験OK、費用なし、東京、高校生相談可などの条件で募集情報を探せます。
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
