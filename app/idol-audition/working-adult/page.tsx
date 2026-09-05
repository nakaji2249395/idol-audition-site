import type { Metadata } from "next";
import { AudienceAuditionPage } from "@/components/AudienceAuditionPage";
import { getAllAuditions } from "@/lib/auditionData";
import { isWorkingAdultAudition } from "@/lib/auditionAudience";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "社会人OKのアイドルオーディション一覧【2026年】仕事と両立できる募集",
  description:
    "社会人・会社員・ダブルワークでも相談できるアイドルオーディションを掲載。平日夜・土日の活動、年齢、費用などを比較できます。",
  alternates: { canonical: "/idol-audition/working-adult" },
  openGraph: {
    title: "社会人OKのアイドルオーディション一覧【2026年】",
    description: "仕事とアイドル活動の両立を相談できる募集を比較できます。",
    url: `${siteConfig.url}/idol-audition/working-adult`,
    type: "article"
  }
};

const content = {
  canonical: "/idol-audition/working-adult",
  eyebrow: "Working adult",
  title: "社会人OKの アイドルオーディション",
  lead:
    "社会人、会社員、ダブルワーク、仕事との両立について募集要項で触れているアイドルオーディションをまとめています。活動曜日や時間を確認して比較できます。",
  listTitle: "社会人・仕事との両立を相談できる募集",
  guideTitle: "社会人がアイドル活動と仕事を両立するには",
  guideParagraphs: [
    "社会人が応募するときは、ライブ本数だけでなく、レッスン、撮影、レコーディング、SNS配信、遠征を含めた拘束時間を確認しましょう。平日夜・土日中心でも、デビュー前だけ集中的な準備が必要な場合があります。",
    "現在の仕事を続けられるか、合格後に退職や勤務時間の変更が必要かは募集によって異なります。面接では勤務形態、休みを調整できる範囲、終電時間を正直に伝えることが大切です。",
    "この一覧は、社会人可、仕事との両立、ダブルワークなどが募集情報に記載されたものを掲載しています。単に18歳以上というだけでは社会人向けとして扱っていません。"
  ],
  checks: [
    "平日昼の活動が必須か、平日夜・土日中心か",
    "月のライブ・レッスン日数と拘束時間を確認する",
    "地方遠征や宿泊を伴う活動の頻度を確認する",
    "勤務先の副業・芸能活動ルールを確認する",
    "交通費やレッスン費など毎月の負担を確認する",
    "合格後に仕事を辞める必要があるか確認する"
  ],
  faq: [
    {
      question: "会社員でもアイドルオーディションに応募できますか？",
      answer: "社会人可、仕事との両立相談可の募集であれば応募できます。勤務先の副業規定も確認してください。"
    },
    {
      question: "平日夜と土日だけでも活動できますか？",
      answer: "募集によります。平日夜・土日中心のグループもありますが、撮影や遠征で平日昼の調整が必要な場合もあります。"
    },
    {
      question: "社会人未経験でも応募できますか？",
      answer: "未経験OKの条件も満たす募集なら応募可能です。仕事で培った責任感や連絡の早さも強みになります。"
    },
    {
      question: "面接で仕事について伝えるべきですか？",
      answer: "伝えましょう。勤務時間、休みの調整範囲、活動可能日を具体的に共有すると、両立できるか判断しやすくなります。"
    }
  ],
  relatedLinks: [
    {
      href: "/idol-audition/mikeiken",
      label: "社会人・未経験OKのアイドル募集",
      description: "初めてでも応募しやすい募集とレッスン条件を比較する"
    },
    {
      href: "/idol-audition/20s",
      label: "20代から応募できるオーディション",
      description: "20代前半・後半の年齢上限と活動条件から探す"
    },
    {
      href: "/idol-audition/30s",
      label: "30代から応募できるオーディション",
      description: "30歳以上、仕事との両立、未経験条件で比較する"
    },
    {
      href: "/idol-audition/age-limit-none",
      label: "年齢制限なしのアイドル募集",
      description: "年齢不問・上限なしの募集を確認する"
    },
    {
      href: "/idol-audition/how-to-apply",
      label: "社会人経験を活かす自己PR",
      description: "責任感、継続力、活動可能日の伝え方を見る"
    }
  ]
};

export default async function WorkingAdultAuditionPage() {
  const auditions = (await getAllAuditions()).filter(isWorkingAdultAudition);
  return <AudienceAuditionPage content={content} auditions={auditions} />;
}
