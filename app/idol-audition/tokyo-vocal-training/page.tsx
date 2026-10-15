import type { Metadata } from "next";
import Link from "next/link";
import { AffiliateOffer } from "@/components/AffiliateOffer";
import { TrainingArticleLayout } from "@/components/TrainingArticleLayout";
import { affiliateOffers } from "@/lib/affiliateOffers";
import { siteConfig } from "@/lib/site";

const canonical = "/idol-audition/tokyo-vocal-training";

export const metadata: Metadata = {
  title: "東京でアイドルを目指す人向けボイトレ｜無料体験の選び方",
  description:
    "東京でアイドルオーディションの歌唱審査を準備する人向けに、ボイトレの選び方を解説。銀座などの通学場所、マンツーマン、録音対応、費用、無料体験の確認項目を比較します。",
  alternates: { canonical },
  openGraph: {
    title: "東京でアイドルを目指す人向けボイトレ｜無料体験の選び方",
    description: "東京で歌唱審査対策を始める際の、校舎・講師・費用・レッスン内容の比較方法を紹介します。",
    url: `${siteConfig.url}${canonical}`,
    type: "article"
  }
};

export default function TokyoVocalTrainingPage() {
  return (
    <TrainingArticleLayout
      eyebrow="Tokyo vocal training / PR"
      title="東京でアイドルを目指す人向けボイトレ"
      lead="東京のボイトレは選択肢が多いため、知名度だけで選ばず、オーディションまでの期間、通学経路、マンツーマン指導、録音環境、総額を比較しましょう。"
      canonical={canonical}
    >
      <aside className="border-l-4 border-pink-600 bg-pink-50 p-5 text-sm leading-7 text-slate-700 sm:p-6">
        <strong className="font-black text-slate-950">PR：</strong>
        このページにはアフィリエイト広告が含まれます。リンク経由で入会した場合、当サイトに報酬が発生することがあります。
      </aside>

      <section>
        <p className="editorial-kicker">Tokyo checklist</p>
        <h2 className="section-heading mt-2">校舎は「自宅」より普段の移動経路で選ぶ</h2>
        <p className="mt-5 leading-8 text-slate-600">
          学校や仕事の後に通うなら、自宅からの距離だけでなく、普段使う駅からの乗換回数と最終レッスン時間を確認します。オーディション直前だけ詰め込むより、週単位で継続できる場所の方が練習量を確保しやすくなります。
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {["通学に片道何分かかるか", "振替はいつまで可能か", "希望ジャンルを教えられる講師がいるか", "録音・動画撮影に対応しているか", "月謝以外の設備費や教材費", "退会・休会の締切と条件"].map((item) => (
            <li key={item} className="border-t border-slate-200 py-4 leading-7 text-slate-700">{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <p className="editorial-kicker">PR / Tokyo & nationwide</p>
        <h2 className="section-heading mt-2">全国展開のスクールを東京で比較する</h2>
        <div className="mt-7">
          <AffiliateOffer
            {...affiliateOffers.nayutasVocal}
            placement="tokyo_vocal_nayutas"
            featured
            summary="東京を含む全国の校舎から選べるマンツーマンのボイストレーニングです。転居や生活圏の変化も考えつつ、校舎の選択肢を広く持ちたい人に向いています。"
            points={["個人の目的に合わせたマンツーマン指導", "オーディション用の歌唱や録音について相談できる", "無料体験で校舎と講師の雰囲気を確認できる"]}
            note="広告主を初めて利用する方が対象です。18歳未満は保護者同意が必要です。希望校舎のコース・料金・空き状況は公式サイトで確認してください。"
            cta="東京の校舎・無料体験を確認する"
          />
        </div>
      </section>

      <section>
        <p className="editorial-kicker">PR / Ginza</p>
        <h2 className="section-heading mt-2">銀座・有楽町・東京駅周辺で探す</h2>
        <div className="mt-7">
          <AffiliateOffer
            {...affiliateOffers.wacca}
            placement="tokyo_vocal_wacca"
            summary="銀座一丁目駅から近く、東京駅・有楽町駅からも通えるボイストレーニングスクールです。歌唱だけでなく、K-POPやミュージカルなど幅広い目的を相談できます。"
            points={["銀座一丁目駅から徒歩圏内", "大学生・社会人も通いやすい都心立地", "作品づくりや発信まで含めて相談したい人の比較候補"]}
            note="広告主を初めて利用する方が対象です。成果対象はWebから無料体験または問い合わせ後、30日以内に入会・入金した場合です。電話・LINE経由は対象外のため、公式Web申込みを利用してください。"
            cta="WACCAの無料体験を確認する"
          />
        </div>
      </section>

      <section className="border-t border-slate-200 pt-10">
        <h2 className="section-heading">体験当日に契約を決めなくてよい</h2>
        <p className="mt-5 leading-8 text-slate-600">
          無料体験では、講師との相性と改善点が具体的になったかを確認します。見積りや規約を持ち帰り、月額の総額、通学時間、振替条件を比較してから決めましょう。広告リンクからの申込みでも、入会するかどうかは体験後に判断できます。
        </p>
        <p className="mt-5 text-sm leading-7 text-slate-600">
          審査の練習順序は<Link href="/idol-audition/vocal-training" className="font-black text-pink-700 hover:underline">歌唱審査対策ガイド</Link>、現在募集中の情報は<Link href="/idol-audition/tokyo" className="font-black text-pink-700 hover:underline">東京のアイドルオーディション一覧</Link>で確認できます。
        </p>
      </section>
    </TrainingArticleLayout>
  );
}
