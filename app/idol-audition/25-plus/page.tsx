import type { Metadata } from "next";
import { AudienceAuditionPage } from "@/components/AudienceAuditionPage";
import { getAllAuditions } from "@/lib/auditionData";
import {
  isBeginnerFriendlyAudition,
  isNoCostAudition,
  isTwentyFivePlusAudition,
  isWorkingAdultAudition
} from "@/lib/auditionAudience";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "25歳以上のアイドルオーディション【2026年】20代後半・未経験OK",
  description:
    "25歳以上・20代後半が応募できるアイドルオーディション一覧。未経験、社会人、費用なし、年齢制限なしの募集中情報を比較できます。",
  alternates: { canonical: "/idol-audition/25-plus" },
  openGraph: {
    title: "25歳以上のアイドルオーディション｜20代後半・未経験OK",
    description: "25〜29歳、30歳以上が応募条件に入る募集を比較できます。",
    url: `${siteConfig.url}/idol-audition/25-plus`,
    type: "article"
  }
};

export default async function TwentyFivePlusAuditionPage() {
  const auditions = (await getAllAuditions()).filter(isTwentyFivePlusAudition);
  const beginnerCount = auditions.filter(isBeginnerFriendlyAudition).length;
  const workingAdultCount = auditions.filter(isWorkingAdultAudition).length;
  const noCostCount = auditions.filter(isNoCostAudition).length;

  return (
    <AudienceAuditionPage
      content={{
        canonical: "/idol-audition/25-plus",
        eyebrow: "Auditions for 25+",
        title: "25歳以上のアイドルオーディション 未経験・社会人OK",
        lead: `現在、25歳以上が応募条件に入る募集を${auditions.length}件掲載しています。20代後半、30歳以上、未経験、社会人から応募できる募集を、年齢上限と活動条件で比較できます。`,
        listTitle: "25歳以上・20代後半が応募できるオーディション",
        guideTitle: "25歳以上からアイドルを目指す応募先の選び方",
        guideParagraphs: [
          "25歳以上では、年齢上限が29歳・30歳までの募集と、年齢制限なしの募集を優先して確認しましょう。応募時点とデビュー時点のどちらを基準にするかも重要です。",
          "社会人経験、継続力、接客、発信、スケジュール管理はアイドル活動に活かせる強みです。年齢を弱点として扱うのではなく、グループへどう貢献できるか具体的に伝えましょう。"
        ],
        guideSections: [
          {
            title: "25歳以上の自己PRで伝えること",
            paragraphs: ["活動可能な曜日、継続できる生活環境、社会人経験で身につけた強みを具体的に伝えます。応募先のコンセプトを理解していることも重要です。"],
            exampleTitle: "自己PR例",
            example: "接客の仕事で身につけたコミュニケーション力と、目標に向けて継続する力があります。平日夜と土日の活動時間を確保でき、20代後半だからこその責任感をグループ活動に活かします。"
          }
        ],
        checks: [
          "応募時点・デビュー時点の年齢上限を確認する",
          "25歳以上が対象に含まれるか確認する",
          "仕事と両立できる活動頻度か確認する",
          "未経験者向けのレッスンがあるか確認する",
          "費用・報酬・契約期間を確認する",
          "年齢に合うグループコンセプトか確認する"
        ],
        faq: [
          { question: "25歳を過ぎてもアイドルになれますか？", answer: "25歳以上、30歳まで、年齢不問などの募集があります。年齢条件とグループのコンセプトを比較しましょう。" },
          { question: "20代後半・未経験でも応募できますか？", answer: "未経験OKで年齢条件を満たす募集なら応募できます。仕事や生活との両立条件も確認してください。" },
          { question: "社会人経験は自己PRになりますか？", answer: "責任感、接客、発信、スケジュール管理、継続力などを具体的に伝えると強みになります。" }
        ],
        relatedLinks: [
          { href: "/idol-audition/20s", label: "20代後半の募集", description: "25〜29歳を含む20代向け募集を確認する" },
          { href: "/idol-audition/30s", label: "30代が応募できる募集", description: "30歳以上・年齢上限なしの募集を比較する" },
          { href: "/idol-audition/working-adult", label: "社会人OKの募集", description: "仕事やダブルワークとの両立条件で探す" },
          { href: "/idol-audition/age-limit-none", label: "年齢制限なしの募集", description: "年齢不問・上限なしの募集を確認する" }
        ]
      }}
      auditions={auditions}
      stats={[
        { value: beginnerCount, label: "25歳以上・未経験OK" },
        { value: workingAdultCount, label: "社会人・両立相談" },
        { value: noCostCount, label: "費用負担が少ない" }
      ]}
    />
  );
}
