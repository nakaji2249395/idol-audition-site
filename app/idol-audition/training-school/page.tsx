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
      eyebrow="School comparison / PR"
      title="アイドルを目指す人向け ボイトレ・ダンススクールの選び方"
      lead="スクールへ通うこと自体が合格を保証するわけではありません。今の課題、審査までの期間、通える場所、毎月の費用を基準に、必要な練習だけを選びましょう。"
      canonical={canonical}
    >
      <aside className="border-l-4 border-pink-600 bg-pink-50 p-5 text-sm leading-7 text-slate-700 sm:p-6">
        <strong className="font-black text-slate-950">広告について：</strong>
        このページにはアフィリエイト広告が含まれます。リンク経由で入会した場合、当サイトに報酬が発生することがあります。掲載順は報酬額だけで決めず、対象地域と審査対策への使いやすさを基準にしています。
      </aside>

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

      <section>
        <p className="editorial-kicker">PR / Voice training</p>
        <h2 className="section-heading mt-2">歌唱審査を優先する人の比較候補</h2>
        <div className="mt-7">
          <AffiliateOffer
            {...affiliateOffers.nayutasVocal}
            placement="training_school_vocal"
            featured
            summary="全国に校舎があり、マンツーマンで歌唱の課題を相談できます。学校や仕事と両立しながら、自分の目的に合わせて練習したい人の比較候補です。"
            points={["一人ひとりの目的に合わせた個人レッスン", "振替制度があり、生活予定と調整しやすい", "オーディション用の歌唱や録音素材について相談できる"]}
            note="広告主を初めて利用する方が対象です。18歳未満は保護者の同意が必要です。最新の料金・校舎・条件は公式サイトで確認してください。"
            cta="ボイトレの無料体験を確認する"
          />
        </div>
      </section>

      <section>
        <p className="editorial-kicker">PR / Dance training</p>
        <h2 className="section-heading mt-2">ダンス審査を優先する人の比較候補</h2>
        <div className="mt-7">
          <AffiliateOffer
            {...affiliateOffers.nayutasDance}
            placement="training_school_dance"
            summary="完全マンツーマンで、未経験者も自分のペースで振付や身体の使い方を練習できるダンススクールです。集団レッスンについていけるか不安な人にも比較しやすい候補です。"
            points={["周囲の進度を気にせず練習できる個人レッスン", "K-POPなど目標に合わせたジャンルを相談できる", "全国の校舎から通いやすい場所を探せる"]}
            note="広告主を初めて利用する方が対象です。Web申込み後、無料体験と入会まで進んだ場合に当サイトへ報酬が発生します。最新条件は公式サイトで確認してください。"
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
