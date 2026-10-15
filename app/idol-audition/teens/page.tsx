import type { Metadata } from "next";
import { AudienceAuditionPage } from "@/components/AudienceAuditionPage";
import { getAllAuditions } from "@/lib/auditionData";
import {
  isBeginnerFriendlyAudition,
  isHighSchoolFriendlyAudition,
  isNoCostAudition,
  isTeenAudition
} from "@/lib/auditionAudience";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "10代のアイドルオーディション【2026年】中学生・高校生・未経験OK",
  description:
    "10代が応募できる女性アイドルオーディション一覧。中学生・高校生、未経験、費用なしの募集を、保護者同意や学業との両立条件と一緒に比較できます。",
  alternates: { canonical: "/idol-audition/teens" },
  openGraph: {
    title: "10代のアイドルオーディション｜中学生・高校生・未経験OK",
    description: "10代が応募できる募集中のアイドルオーディションを比較できます。",
    url: `${siteConfig.url}/idol-audition/teens`,
    type: "article"
  }
};

export default async function TeensAuditionPage() {
  const auditions = (await getAllAuditions()).filter(isTeenAudition);
  const beginnerCount = auditions.filter(isBeginnerFriendlyAudition).length;
  const highSchoolCount = auditions.filter(isHighSchoolFriendlyAudition).length;
  const noCostCount = auditions.filter(isNoCostAudition).length;

  return (
    <AudienceAuditionPage
      content={{
        canonical: "/idol-audition/teens",
        eyebrow: "Auditions for teens",
        title: "10代のアイドルオーディション 中学生・高校生・未経験OK",
        lead: `現在、10代が応募条件に入る募集を${auditions.length}件掲載しています。中学生・高校生、未経験者向けの募集を、保護者同意、活動時間、費用、学業との両立条件で比較できます。`,
        listTitle: "10代が応募できる募集中のアイドルオーディション",
        guideTitle: "10代でアイドルオーディションを受ける前に",
        guideParagraphs: [
          "10代向けの募集では、年齢条件だけでなく、保護者同意、学校の許可、レッスンやライブの終了時間を確認することが大切です。応募前に募集要項を保護者と一緒に読みましょう。",
          "未経験の場合は、基礎レッスンの内容と費用、デビューまでの期間を確認してください。現在の完成度だけでなく、継続力や素直に学ぶ姿勢も強みになります。"
        ],
        checks: [
          "応募年齢を満たしているか",
          "保護者同意・面談同席の条件を確認したか",
          "学校や部活動と両立できる活動時間か",
          "夜遅いライブ後の帰宅手段を確認したか",
          "登録料・レッスン費・衣装代を確認したか",
          "運営会社と公式SNSを保護者と確認したか"
        ],
        faq: [
          { question: "中学生でも応募できますか？", answer: "中学生を年齢条件に含む募集であれば応募できます。保護者同意や活動時間の条件を必ず確認してください。" },
          { question: "高校生で未経験でも合格できますか？", answer: "未経験歓迎の募集では可能性があります。志望理由、継続できる環境、学ぶ姿勢を具体的に伝えましょう。" },
          { question: "保護者にどう説明すればよいですか？", answer: "運営会社、費用、活動場所、帰宅時間、契約内容を整理し、募集ページと公式情報を一緒に確認してください。" }
        ],
        relatedLinks: [
          { href: "/idol-audition/high-school", label: "高校生OKの募集", description: "学業・保護者同意・帰宅時間も含めて比較する" },
          { href: "/idol-audition/mikeiken", label: "10代・未経験OKの募集", description: "歌やダンスが初めてでも応募しやすい募集を探す" },
          { href: "/idol-audition/free", label: "費用なしの募集", description: "応募料・レッスン費・衣装代の条件を確認する" },
          { href: "/idol-audition/parents", label: "保護者への説明ガイド", description: "安全性、費用、活動時間の伝え方を確認する" }
        ]
      }}
      auditions={auditions}
      stats={[
        { value: beginnerCount, label: "10代・未経験OK" },
        { value: highSchoolCount, label: "高校生・学生相談可" },
        { value: noCostCount, label: "費用負担が少ない" }
      ]}
    />
  );
}
