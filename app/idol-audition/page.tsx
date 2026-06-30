import type { Metadata } from "next";
import Link from "next/link";
import { AuditionCard } from "@/components/AuditionCard";
import { FeaturedHiraeth } from "@/components/FeaturedHiraeth";
import { auditions } from "@/lib/auditions";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "アイドルオーディション一覧｜未経験OK・東京・費用なしのアイドル募集",
  description:
    "アイドルオーディション一覧。未経験OK、東京、費用なし、高校生相談可、新規グループ初期メンバー、地下アイドル募集など、アイドルになりたい方に向けた募集情報を比較できます。",
  alternates: {
    canonical: "/idol-audition"
  },
  openGraph: {
    title: "アイドルオーディション一覧｜未経験OK・東京・費用なしのアイドル募集",
    description:
      "未経験OK、東京、費用なし、高校生相談可などのアイドルオーディションを比較できます。",
    url: `${siteConfig.url}/idol-audition`,
    type: "article"
  }
};

const guideLinks = [
  {
    href: "/idol-audition/tokyo",
    title: "東京のアイドルオーディション",
    text: "都内・関東近郊で活動できる募集"
  },
  {
    href: "/idol-audition/mikeiken",
    title: "未経験OKのアイドルオーディション",
    text: "歌やダンスが初めてでも応募しやすい募集"
  },
  {
    href: "/idol-audition/free",
    title: "費用なしのアイドルオーディション",
    text: "登録料なし・レッスン無料など費用面で比較"
  },
  {
    href: "/idol-audition/high-school",
    title: "高校生OKのアイドルオーディション",
    text: "未成年・学生が応募前に確認したい募集"
  },
  {
    href: "/idol-audition/suspicious",
    title: "怪しい募集の見分け方",
    text: "費用・契約・運営情報の確認ポイント"
  },
  {
    href: "/idol-audition/how-to-apply",
    title: "応募文・自己PRの書き方",
    text: "志望動機や写真の準備を確認"
  }
];

const checks = [
  "活動地域は通える範囲か",
  "未経験OKか、経験者向けか",
  "登録料・レッスン費・衣装代などの費用が明記されているか",
  "高校生・未成年の場合、保護者同意が必要か",
  "応募方法がLINE・フォーム・メールなどで明確か",
  "運営会社や公式SNS、活動実績が確認できるか",
  "合格後の活動内容や選考フローが分かるか",
  "報酬や物販バックの考え方が説明されているか"
];

const faq = [
  {
    question: "アイドルオーディションはどう選べばいいですか？",
    answer:
      "活動地域、費用、未経験可否、応募条件、運営会社、活動実績、選考フローを確認しましょう。募集文の雰囲気だけでなく、条件を比較することが大切です。"
  },
  {
    question: "地下アイドルのオーディションも掲載していますか？",
    answer:
      "東京・関東近郊のライブアイドル、地下アイドル、新規グループ初期メンバー、既存グループ追加メンバーなどの募集を掲載していきます。"
  },
  {
    question: "掲載されている募集はすべて費用なしですか？",
    answer:
      "すべてが費用なしとは限りません。募集ごとに登録料、レッスン費、衣装代、交通費などの費用項目を確認してください。"
  },
  {
    question: "応募方法はどこで確認できますか？",
    answer:
      "各オーディションの詳細ページに、LINE応募、フォーム応募、メール応募などの応募方法を掲載しています。"
  }
];

export default function IdolAuditionPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "アイドルオーディション一覧",
    itemListElement: auditions.map((audition, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: audition.title,
      url: `${siteConfig.url}/idol-audition/${audition.slug}`
    }))
  };

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

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Link href="/" className="text-sm font-bold text-slate-500 hover:text-pink-600">
        ← トップへ戻る
      </Link>

      <header className="mt-8 mb-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-bold text-pink-600">Audition List</p>
        <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950">
          アイドルオーディション一覧
        </h1>
        <p className="mt-4 max-w-3xl leading-8 text-slate-600">
          募集中のアイドルオーディションを、活動地域、費用、未経験可否、高校生相談可、応募方法で比較できます。
          東京・関東近郊の地下アイドル募集、新規グループ初期メンバー、既存グループ追加メンバーを探している方に向けた一覧ページです。
        </p>
      </header>

      <FeaturedHiraeth />

      <section className="mb-16">
        <div className="mb-6">
          <p className="text-sm font-bold text-pink-600">Now Recruiting</p>
          <h2 className="mt-1 text-3xl font-black text-slate-950">
            募集中のアイドルオーディション
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {auditions.map((audition) => (
            <AuditionCard key={audition.slug} audition={audition} />
          ))}
        </div>
      </section>

      <section className="mb-16 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-bold text-pink-600">Guide</p>
        <h2 className="mt-2 text-3xl font-black text-slate-950">
          条件別にアイドルオーディションを探す
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {guideLinks.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="text-lg font-black text-slate-950">{guide.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{guide.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <article className="mb-16 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <h2 className="text-3xl font-black leading-tight text-slate-950">
          アイドルオーディションを選ぶときのチェックポイント
        </h2>

        <p className="mt-6 leading-8 text-slate-600">
          アイドルオーディションを選ぶときは、募集タイトルだけで判断せず、活動地域、費用、応募条件、運営会社、選考フローを確認することが大切です。
          特に未経験者、高校生、未成年の方は、合格後にどのような活動があるのか、費用や保護者同意が必要かを確認しましょう。
        </p>

        <div className="mt-6 grid gap-3">
          {checks.map((check) => (
            <div key={check} className="rounded-2xl bg-slate-50 p-4 leading-8 text-slate-700">
              ✅ {check}
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl bg-pink-50 p-6">
          <h3 className="text-xl font-black text-slate-950">
            迷ったら「費用・運営情報・活動地域」を先に確認
          </h3>
          <p className="mt-3 leading-8 text-slate-700">
            どのオーディションに応募するか迷ったら、まずは費用の有無、運営会社や公式SNS、活動地域を確認しましょう。
            条件が明確な募集ほど、応募前に判断しやすくなります。
          </p>
        </div>
      </article>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-bold text-pink-600">FAQ</p>
        <h2 className="mt-2 text-3xl font-black text-slate-950">
          アイドルオーディション一覧のよくある質問
        </h2>
        <div className="mt-6 grid gap-4">
          {faq.map((item) => (
            <div key={item.question} className="rounded-2xl bg-slate-50 p-5">
              <h3 className="font-black text-slate-950">Q. {item.question}</h3>
              <p className="mt-3 leading-8 text-slate-600">A. {item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
