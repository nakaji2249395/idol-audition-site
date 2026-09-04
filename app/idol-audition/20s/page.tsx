import type { Metadata } from "next";
import { AudienceAuditionPage } from "@/components/AudienceAuditionPage";
import { getAllAuditions } from "@/lib/auditionData";
import { isTwentiesAudition } from "@/lib/auditionAudience";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "20代で応募できるアイドルオーディション一覧【2026年】未経験・社会人OK",
  description:
    "20代で応募できるアイドルオーディションを掲載。20代前半・後半、未経験、社会人から応募できる募集の年齢上限、地域、費用を比較できます。",
  alternates: { canonical: "/idol-audition/20s" },
  openGraph: {
    title: "20代で応募できるアイドルオーディション一覧【2026年】",
    description: "20代前半・後半から応募できるアイドル募集を比較できます。",
    url: `${siteConfig.url}/idol-audition/20s`,
    type: "article"
  }
};

const content = {
  canonical: "/idol-audition/20s",
  eyebrow: "Auditions for 20s",
  title: "20代で応募できる アイドルオーディション",
  lead:
    "20代前半・20代後半が応募条件に入るアイドルオーディションをまとめています。未経験OK、社会人相談可、年齢上限なしなどの条件と一緒に比較できます。",
  listTitle: "20代が応募できる募集中のオーディション",
  guideTitle: "20代からアイドルを目指すときの選び方",
  guideParagraphs: [
    "20代は多くのアイドルオーディションで応募対象になりますが、募集によって上限が24歳、25歳、28歳、30歳など異なります。現在の年齢だけでなく、デビュー予定時期に条件を満たすかも確認しましょう。",
    "20代後半や社会人から挑戦する場合は、活動頻度、平日昼の稼働、遠征、仕事との両立条件が重要です。応募文では、活動に使える時間や継続できる理由を具体的に伝えると判断してもらいやすくなります。",
    "未経験歓迎の募集も多くあります。歌やダンス以外にも、接客、配信、SNS、撮影、仕事で身につけたコミュニケーション力はアイドル活動に活かせます。"
  ],
  checks: [
    "応募時点とデビュー時点の年齢条件を確認する",
    "20代後半が上限に含まれるか確認する",
    "平日昼・夜、土日の活動頻度を確認する",
    "社会人の場合は仕事との両立を相談できるか確認する",
    "未経験者向けのレッスン体制があるか確認する",
    "費用、報酬、契約期間を事前に確認する"
  ],
  faq: [
    {
      question: "20代からでもアイドルになれますか？",
      answer: "20代を対象にした募集は多数あります。年齢上限、活動条件、グループのコンセプトを比較して応募先を選びましょう。"
    },
    {
      question: "20代後半でも応募できますか？",
      answer: "25歳以上、28歳、30歳まで、年齢不問などの募集があります。上限年齢の表記を確認してください。"
    },
    {
      question: "20代未経験でも大丈夫ですか？",
      answer: "未経験OKの募集なら応募できます。社会人経験や継続力、発信力も強みとして伝えられます。"
    },
    {
      question: "仕事を辞めないと応募できませんか？",
      answer: "募集によります。仕事との両立相談可の募集も、活動最優先を求める募集もあるため、稼働条件を確認してください。"
    }
  ],
  relatedLinks: [
    {
      href: "/idol-audition/mikeiken",
      label: "20代・未経験から応募できる募集",
      description: "歌やダンスが初めてでも応募しやすいオーディションを比較する"
    },
    {
      href: "/idol-audition/working-adult",
      label: "社会人から応募できるアイドル募集",
      description: "仕事やダブルワークとの両立条件で探す"
    },
    {
      href: "/idol-audition/age-limit-none",
      label: "年齢制限なしのオーディション",
      description: "年齢不問・上限なしと明記された募集を確認する"
    }
  ]
};

export default async function TwentiesAuditionPage() {
  const auditions = (await getAllAuditions()).filter(isTwentiesAudition);
  return <AudienceAuditionPage content={content} auditions={auditions} />;
}
