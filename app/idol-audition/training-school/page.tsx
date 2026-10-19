import type { Metadata } from "next";
import Link from "next/link";
import { AffiliateOffer } from "@/components/AffiliateOffer";
import { TrainingArticleLayout } from "@/components/TrainingArticleLayout";
import { affiliateOffers } from "@/lib/affiliateOffers";
import { siteConfig } from "@/lib/site";

const canonical = "/idol-audition/training-school";

export const metadata: Metadata = {
  title: "アイドルを目指す人向けボイトレ・ダンススクールの選び方",
  description:
    "アイドルオーディションを目指す人向けに、ボイトレとダンススクールの選び方を解説。未経験者が先に習う内容、無料体験の確認項目、費用や通いやすさを比較します。",
  alternates: { canonical },
  openGraph: {
    title: "アイドルを目指す人向けボイトレ・ダンススクールの選び方",
    description: "未経験から歌とダンスを準備するときの優先順位と、スクール比較の基準を紹介します。",
    url: `${siteConfig.url}${canonical}`,
    type: "article"
  }
};

const comparisonRows = [
  ["向いている課題", "音程・発声・声量・歌詞の伝え方", "リズム・振付・姿勢・見せ方"],
  ["自宅練習", "録音しやすく一人でも反復しやすい", "鏡や撮影スペースがあると進めやすい"],
  ["審査での使い方", "歌唱審査、自己紹介、配信", "実技審査、ライブパフォーマンス"],
  ["最初の目標", "1曲を安定して最後まで歌う", "短い振付をリズムに合わせて踊る"]
];

export default function TrainingSchoolPage() {
  return (
    <TrainingArticleLayout
      eyebrow="School comparison"
      title="アイドルを目指す人向け ボイトレ・ダンススクールの選び方"
      lead="スクールへ通うこと自体が合格を保証するわけではありません。今の課題、審査までの期間、通える場所、毎月の費用を基準に、必要な練習だけを選びましょう。"
      canonical={canonical}
    >
      <section id="checklist" className="scroll-mt-24 border-b border-slate-200 pb-8">
        <h2 className="text-2xl font-bold text-slate-950">体験を予約する前に、3つだけ確認</h2>
        <p className="mt-4 leading-8 text-slate-600">録音や撮影で自分の課題を確認できるなら、まず自主練習からで構いません。以下は、一人では改善点が分からず、指導を検討したい方のための比較情報です。</p>
        <ul className="mt-4 list-disc space-y-3 pl-5 leading-8 text-slate-600">
          <li><strong>場所・時間：</strong>大阪・名古屋など希望地域の校舎で、希望コースと通える曜日に対応しているか。全国展開でも校舎ごとに確認が必要です。</li>
          <li><strong>年齢・同意：</strong>高校生や未成年の受講条件、保護者の同意・同席が必要かを確認する。</li>
          <li><strong>費用：</strong>無料なのは体験のどの範囲か。入会後の月謝・入会金・設備費・交通費と、退会や振替の条件を確認する。</li>
        </ul>
        <p className="mt-4 text-sm leading-7 text-slate-600">体験だけで入会を決める必要はありません。スクールの受講はオーディション合格を保証しません。</p>
      </section>

      <section>
        <p className="editorial-kicker">Choose your priority</p>
        <h2 className="section-heading mt-2">歌とダンス、どちらから始める？</h2>
        <p className="mt-5 leading-8 text-slate-600">
          応募予定の募集に課題曲や実技審査がある場合は、その内容を優先します。まだ応募先が決まっていないなら、録音して最も弱点が分かりやすい方から始め、週に数回続けられる練習量に絞るのがおすすめです。
        </p>
        <div className="mt-6 overflow-x-auto border border-slate-200">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead className="bg-slate-950 text-white">
              <tr><th className="p-4">比較項目</th><th className="p-4">ボイトレ</th><th className="p-4">ダンス</th></tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row[0]} className="border-t border-slate-200 bg-white align-top">
                  {row.map((cell, index) => <td key={cell} className={`p-4 leading-7 ${index === 0 ? "font-black text-slate-950" : "text-slate-600"}`}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="voice" className="scroll-mt-24">
        <p className="editorial-kicker">Voice training</p>
        <h2 className="section-heading mt-2">歌唱審査を優先する人の比較候補</h2>
        <p className="mt-4 leading-8 text-slate-600">まず1曲を録音し、歌詞やリズムを確認しましょう。体験では「この部分の音程が安定しない」など、気になる箇所と審査内容を伝えると相談しやすくなります。課題曲の指導が可能かは予約前に確認してください。</p>
        <div className="mt-7">
          <AffiliateOffer
            {...affiliateOffers.nayutasVocal}
            placement="training_school_vocal"
            summary="全国に校舎があり、マンツーマンで歌唱の課題を相談できます。学校や仕事と両立しながら、自分の目的に合わせて練習したい人の比較候補です。"
            points={["一人ひとりの目的に合わせた個人レッスン", "振替制度があり、生活予定と調整しやすい", "オーディション用の歌唱や録音素材について相談できる"]}
            note="広告主を初めて利用する方が対象です。18歳未満は保護者の同意が必要です。最新の料金・校舎・条件は公式サイトで確認してください。"
            cta="ボイトレの無料体験を確認する"
          />
        </div>
      </section>

      <section id="dance" className="scroll-mt-24">
        <p className="editorial-kicker">Dance training</p>
        <h2 className="section-heading mt-2">ダンス審査を優先する人の比較候補</h2>
        <p className="mt-4 leading-8 text-slate-600">まず短い振付をゆっくり練習し、全身を撮影してリズムや姿勢を確認します。体験では、初心者対応、希望ジャンル、課題の振付を相談できるかを確認しましょう。</p>
        <div className="mt-7">
          <AffiliateOffer
            {...affiliateOffers.nayutasDance}
            placement="training_school_dance"
            summary="完全マンツーマンで、未経験者も自分のペースで振付や身体の使い方を練習できるダンススクールです。集団レッスンについていけるか不安な人にも比較しやすい候補です。"
            points={["周囲の進度を気にせず練習できる個人レッスン", "K-POPなど目標に合わせたジャンルを相談できる", "全国の校舎から通いやすい場所を探せる"]}
            note="広告主を初めて利用する方が対象です。無料体験後に入会を検討できます。最新の料金・校舎・条件は公式サイトで確認してください。"
            cta="ダンスの無料体験を確認する"
          />
        </div>
      </section>

      <section>
        <h2 className="section-heading">無料体験で比較するポイント</h2>
        <div className="mt-6 grid gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-2">
          {[
            ["目的", "『上手くなりたい』だけでなく、応募予定日と審査内容を伝える。"],
            ["講師", "説明が理解しやすく、質問しやすいかを確認する。"],
            ["練習", "レッスン外で何をすればよいか具体的に聞く。"],
            ["費用", "月謝、入会金、設備費、教材費、解約条件を合計で確認する。"],
            ["通学", "学校・職場からの所要時間と最終レッスン時間を見る。"],
            ["契約", "体験当日に即決せず、規約を持ち帰って比較する。"]
          ].map(([title, text]) => (
            <div key={title} className="bg-white p-6"><h3 className="font-black text-slate-950">{title}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{text}</p></div>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 pt-10">
        <h2 className="section-heading">スクールへ通わない選択もある</h2>
        <p className="mt-5 leading-8 text-slate-600">
          独学でも応募できます。予算が限られる場合は、まず1か月間、週3回の録音・撮影を続けてみましょう。課題が分からない、練習しても同じ箇所で止まる、審査日まで時間が少ないときに体験レッスンを利用すると、目的が曖昧なまま契約しにくくなります。
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/idol-audition/vocal-training" className="rounded-full border border-slate-300 px-5 py-3 text-sm font-black text-slate-800 hover:text-pink-700">歌唱審査対策を詳しく見る</Link>
          <Link href="/idol-audition/mikeiken" className="rounded-full border border-slate-300 px-5 py-3 text-sm font-black text-slate-800 hover:text-pink-700">未経験OKの募集を見る</Link>
        </div>
      </section>
    </TrainingArticleLayout>
  );
}
