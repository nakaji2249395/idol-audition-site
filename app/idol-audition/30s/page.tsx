import type { Metadata } from "next";
import { AudienceAuditionPage } from "@/components/AudienceAuditionPage";
import { getAllAuditions } from "@/lib/auditionData";
import { isThirtiesAudition } from "@/lib/auditionAudience";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "30代で応募できるアイドルオーディション一覧【2026年】年齢上限を比較",
  description:
    "30代で応募できるアイドルオーディションを掲載。30歳・32歳・35歳まで、年齢不問、上限なしなど、応募可能年齢と活動条件を比較できます。",
  alternates: { canonical: "/idol-audition/30s" },
  openGraph: {
    title: "30代で応募できるアイドルオーディション一覧【2026年】",
    description: "30代から応募できる募集を年齢上限・活動地域・費用で比較できます。",
    url: `${siteConfig.url}/idol-audition/30s`,
    type: "article"
  }
};

const content = {
  canonical: "/idol-audition/30s",
  eyebrow: "Auditions for 30s",
  title: "30代で応募できる アイドルオーディション",
  lead:
    "30歳以上でも応募条件に入るアイドルオーディションをまとめました。年齢不問・上限なしの募集に加え、30歳、32歳、35歳まで応募できる募集を掲載しています。",
  listTitle: "30代が応募条件に入る募集中のオーディション",
  guideTitle: "30代からアイドルオーディションを探す方法",
  guideParagraphs: [
    "30代でアイドルを目指す場合は、募集要項の上限年齢だけでなく、グループのコンセプト、活動頻度、求める人物像を確認することが重要です。「30歳まで」は30歳を含みますが、「30歳未満」は29歳までです。表記の違いにも注意してください。",
    "大人かわいい、楽曲派、ロック系、セルフプロデュース型、年齢非公開など、経験や人生経験を強みにできるグループもあります。応募文では年齢を不利と捉えず、継続力、社会人経験、発信力、活動に使える時間を具体的に伝えましょう。",
    "掲載一覧は募集要項に30歳以上が含まれる、上限が30歳以上、または年齢不問と明記された情報から抽出しています。条件は更新される場合があるため、応募前に主催者の公式案内も確認してください。"
  ],
  checks: [
    "上限が「30歳まで」か「30歳未満」かを確認する",
    "年齢不問でも求めるコンセプトや雰囲気が合うか確認する",
    "平日夜・土日・遠征を含む活動頻度を確認する",
    "仕事や家庭と両立できるスケジュールか確認する",
    "レッスン費・衣装代・交通費などの負担を確認する",
    "契約期間、報酬、退所条件を契約前に確認する"
  ],
  faq: [
    {
      question: "30代でもアイドルオーディションに応募できますか？",
      answer: "応募できます。年齢上限が30歳以上の募集、年齢不問、上限なしの募集を選び、募集要項を確認してください。"
    },
    {
      question: "30歳までの募集に30歳は応募できますか？",
      answer: "通常は30歳を含みます。一方、30歳未満は29歳までを意味します。判断が難しい表記は主催者へ確認しましょう。"
    },
    {
      question: "未経験の30代でも応募できますか？",
      answer: "未経験OKかつ年齢条件を満たす募集なら応募可能です。継続力、仕事で得た経験、SNS発信への意欲なども自己PRになります。"
    },
    {
      question: "社会人を続けながら活動できますか？",
      answer: "募集によります。平日夜や土日中心の活動もありますが、月間活動日数や遠征の有無を応募前に確認してください。"
    }
  ]
};

export default async function ThirtiesAuditionPage() {
  const auditions = (await getAllAuditions()).filter(isThirtiesAudition);
  return <AudienceAuditionPage content={content} auditions={auditions} />;
}
