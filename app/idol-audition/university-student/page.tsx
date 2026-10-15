import type { Metadata } from "next";
import { AudienceAuditionPage } from "@/components/AudienceAuditionPage";
import { getAllAuditions } from "@/lib/auditionData";
import {
  isBeginnerFriendlyAudition,
  isNoCostAudition,
  isUniversityStudentFriendlyAudition
} from "@/lib/auditionAudience";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "大学生のアイドルオーディション【2026年】未経験・学業両立OK",
  description:
    "大学生・短大生・専門学生が応募できるアイドルオーディション一覧。未経験OK、学業と両立、費用なし、20代向けの募集を比較できます。",
  alternates: { canonical: "/idol-audition/university-student" },
  openGraph: {
    title: "大学生のアイドルオーディション｜未経験・学業両立OK",
    description: "大学生・専門学生が応募できる募集中のアイドルオーディションを比較できます。",
    url: `${siteConfig.url}/idol-audition/university-student`,
    type: "article"
  }
};

export default async function UniversityStudentAuditionPage() {
  const auditions = (await getAllAuditions()).filter(isUniversityStudentFriendlyAudition);
  const beginnerCount = auditions.filter(isBeginnerFriendlyAudition).length;
  const noCostCount = auditions.filter(isNoCostAudition).length;

  return (
    <AudienceAuditionPage
      content={{
        canonical: "/idol-audition/university-student",
        eyebrow: "Student auditions",
        title: "大学生・専門学生のアイドルオーディション",
        lead: `現在、大学生・短大生・専門学生が応募しやすい募集を${auditions.length}件掲載しています。未経験可否、授業や試験期間との両立、活動時間、費用を比較できます。`,
        listTitle: "大学生・専門学生が応募できるオーディション",
        guideTitle: "大学生活とアイドル活動を両立するポイント",
        guideParagraphs: [
          "大学生は18〜22歳前後を対象にした募集へ応募しやすい一方、平日昼の撮影、夜のライブ、遠征が授業や試験と重なることがあります。応募前に必修授業と活動可能日を整理しましょう。",
          "未経験から始める場合は、レッスンの曜日と場所、デビューまでの期間を確認してください。サークル、アルバイト、接客、SNS運用などの経験も自己PRに活かせます。"
        ],
        checks: [
          "授業・実習・試験期間と活動を両立できるか",
          "平日昼の撮影や遠征への参加条件を確認したか",
          "キャンパスからレッスン場所へ通えるか",
          "アルバイトとの両立可否を相談できるか",
          "レッスン費、衣装代、交通費を確認したか",
          "卒業後の活動方針を考えられるか"
        ],
        faq: [
          { question: "大学に通いながらアイドル活動はできますか？", answer: "学業との両立相談可の募集なら可能です。必修授業、試験期間、活動可能な曜日を応募時に伝えましょう。" },
          { question: "大学生で未経験でも応募できますか？", answer: "未経験OKの募集なら応募できます。サークル、接客、SNSなど、これまで続けた経験も強みになります。" },
          { question: "就職活動と両立できますか？", answer: "活動頻度や契約条件によります。就職活動の予定がある場合は、応募前または面談時に相談してください。" }
        ],
        relatedLinks: [
          { href: "/idol-audition/20s", label: "20代のアイドル募集", description: "20代前半・後半の年齢条件で比較する" },
          { href: "/idol-audition/mikeiken", label: "大学生・未経験OKの募集", description: "初心者向けのレッスン体制を確認する" },
          { href: "/idol-audition/working-adult", label: "社会人との両立条件も確認", description: "卒業後や仕事との両立を見据えて比較する" },
          { href: "/idol-audition/free", label: "費用なしの募集", description: "学生でも続けやすい費用条件を確認する" }
        ]
      }}
      auditions={auditions}
      stats={[
        { value: beginnerCount, label: "大学生・未経験OK" },
        { value: noCostCount, label: "費用負担が少ない" },
        { value: auditions.length, label: "学業との両立を確認できる" }
      ]}
    />
  );
}
