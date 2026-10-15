import type { Metadata } from "next";
import Link from "next/link";
import { AffiliateOffer } from "@/components/AffiliateOffer";
import { TrainingArticleLayout } from "@/components/TrainingArticleLayout";
import { affiliateOffers } from "@/lib/affiliateOffers";
import { siteConfig } from "@/lib/site";

const canonical = "/idol-audition/vocal-training";

export const metadata: Metadata = {
  title: "アイドルオーディションの歌唱審査対策｜未経験者向けボイトレ",
  description:
    "アイドルオーディションの歌唱審査に向けた練習方法を解説。未経験者が選ぶ曲、録音で確認するポイント、独学とボイトレの違い、無料体験で確認することを紹介します。",
  alternates: { canonical },
  openGraph: {
    title: "アイドルオーディションの歌唱審査対策｜未経験者向けボイトレ",
    description: "歌唱審査の選曲、練習、録音、当日の準備を未経験者向けに整理します。",
    url: `${siteConfig.url}${canonical}`,
    type: "article"
  }
};

const faq = [
  ["歌が上手くないとアイドルオーディションには受かりませんか？", "歌唱力だけで決まるとは限りません。音程やリズムに加え、声の個性、表情、曲への理解、練習で伸びる姿勢も見られます。"],
  ["歌唱審査では何を歌えばいいですか？", "自分の声域に合い、サビまで安定して歌える曲を選びます。難易度の高さより、自分の魅力が伝わることを優先しましょう。"],
  ["ボイトレは何回受ければ効果がありますか？", "個人差があります。まず体験で課題を言語化してもらい、自宅練習を含めた計画を立てられるか確認するのが現実的です。"]
];

export default function VocalTrainingPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer }
    }))
  };

  return (
    <TrainingArticleLayout
      eyebrow="Vocal audition guide"
      title="アイドルオーディションの歌唱審査対策"
      lead="未経験からでも、選曲・録音・反復練習の順番を整えると、自分の声の魅力を伝えやすくなります。審査前に何を準備すべきかを具体的に整理します。"
      canonical={canonical}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section>
        <p className="editorial-kicker">Start here</p>
        <h2 className="section-heading mt-2">まずはスマートフォンで1曲録音する</h2>
        <p className="mt-5 leading-8 text-slate-600">
          最初から長時間歌い込むより、伴奏と自分の声が聞こえる状態で1曲録音し、音程、リズム、声量、言葉の聞き取りやすさを確認します。録音を残すと、数日後の変化も判断できます。
        </p>
        <div className="mt-6 grid gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-3">
          {[
            ["01", "声域に合う曲を選ぶ", "高音を無理に出す曲より、サビまで安定して歌える曲を選ぶ。"],
            ["02", "30秒ずつ確認する", "一度に全部直さず、Aメロ、Bメロ、サビに分けて録音する。"],
            ["03", "表情まで撮影する", "最終的には動画で、目線と表情が曲に合っているか確認する。"]
          ].map(([number, title, text]) => (
            <div key={number} className="bg-white p-6">
              <span className="text-xs font-black text-pink-700">{number}</span>
              <h3 className="mt-3 font-black text-slate-950">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <p className="editorial-kicker">Practice plan</p>
        <h2 className="section-heading mt-2">審査までの練習順序</h2>
        <ol className="mt-6 grid gap-4">
          {[
            "歌詞を音読し、誰に何を伝える曲か整理する",
            "原曲を聞きながらリズムだけを取り、入りの位置を覚える",
            "無理のないキーで音程を確認する",
            "録音を聞き、直す項目を一度に1つだけ決める",
            "立った状態で表情と振る舞いを含めて通す"
          ].map((item, index) => (
            <li key={item} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-slate-200 pt-4 leading-8 text-slate-700">
              <span className="font-black text-pink-700">{String(index + 1).padStart(2, "0")}</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-slate-200 py-10">
        <p className="editorial-kicker">PR / Training option</p>
        <h2 className="section-heading mt-2">一人で課題を判断しにくい場合の選択肢</h2>
        <p className="mt-4 leading-8 text-slate-600">
          スクールは必須ではありません。ただし、自分では気づきにくい発声やリズムの癖を短時間で把握したい場合は、無料体験で指導方法との相性を確認する方法があります。
        </p>
        <div className="mt-7">
          <AffiliateOffer
            {...affiliateOffers.nayutasVocal}
            placement="vocal_training_main"
            featured
            summary="全国に校舎があり、マンツーマンで目的に合わせた練習を相談できるボイストレーニングスクールです。オーディション用の録音素材を準備したい人にも比較候補になります。"
            points={[
              "初心者からプロ志向まで目的に合わせて相談できる",
              "個人レッスンのため、苦手な部分に時間を使いやすい",
              "Webから無料体験を申し込み、校舎や講師との相性を確認できる"
            ]}
            note="広告主を初めて利用する方が対象です。18歳未満は保護者の同意が必要です。料金・校舎・キャンペーンは申込み前に公式サイトで確認してください。"
            cta="ナユタスの無料体験を確認する"
          />
        </div>
      </section>

      <section>
        <h2 className="section-heading">無料体験で確認したい5項目</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {["自分の課題を具体的に説明してくれるか", "希望する曲や審査日程に対応できるか", "自宅練習の方法まで教えてもらえるか", "月謝以外の費用と解約条件が明確か", "通学時間と振替制度が生活に合うか"].map((item) => (
            <li key={item} className="border-t border-slate-200 py-4 leading-7 text-slate-700">{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="section-heading">よくある質問</h2>
        <div className="mt-6 grid gap-4">
          {faq.map(([question, answer]) => (
            <div key={question} className="border border-slate-200 bg-white p-6">
              <h3 className="font-black text-slate-950">Q. {question}</h3>
              <p className="mt-3 leading-8 text-slate-600">A. {answer}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm leading-7 text-slate-600">
          ダンスも含めて比較したい方は、<Link href="/idol-audition/training-school" className="font-black text-pink-700 hover:underline">アイドル向けスクール比較ガイド</Link>をご覧ください。
        </p>
      </section>
    </TrainingArticleLayout>
  );
}
