import type { Metadata } from "next";
import { AudienceAuditionPage } from "@/components/AudienceAuditionPage";
import { getAllAuditions } from "@/lib/auditionData";
import {
  isAgeLimitNoneAudition,
  isBeginnerFriendlyAudition,
  isNoCostAudition,
  isWorkingAdultAudition
} from "@/lib/auditionAudience";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "社会人OKのアイドルオーディション【2026年10月】未経験・仕事と両立",
  description:
    "社会人・会社員・ダブルワークでも相談できるアイドルオーディションを掲載。平日夜・土日の活動、年齢、費用などを比較できます。",
  alternates: { canonical: "/idol-audition/working-adult" },
  openGraph: {
    title: "社会人OKのアイドルオーディション【2026年10月】未経験・仕事と両立",
    description: "社会人・会社員・未経験から、仕事とアイドル活動の両立を相談できる募集を比較できます。",
    url: `${siteConfig.url}/idol-audition/working-adult`,
    type: "article"
  }
};

const content = {
  canonical: "/idol-audition/working-adult",
  eyebrow: "Working adult",
  title: "社会人OKのアイドルオーディション 未経験・仕事と両立できる募集",
  listTitle: "社会人・仕事との両立を相談できる募集",
  guideTitle: "社会人がアイドル活動と仕事を両立するには",
  guideParagraphs: [
    "社会人が応募するときは、ライブ本数だけでなく、レッスン、撮影、レコーディング、SNS配信、遠征を含めた拘束時間を確認しましょう。平日夜・土日中心でも、デビュー前だけ集中的な準備が必要な場合があります。",
    "現在の仕事を続けられるか、合格後に退職や勤務時間の変更が必要かは募集によって異なります。面接では勤務形態、休みを調整できる範囲、終電時間を正直に伝えることが大切です。",
    "この一覧は、社会人可、仕事との両立、ダブルワークなどが募集情報に記載されたものを掲載しています。単に18歳以上というだけでは社会人向けとして扱っていません。"
  ],
  segmentsEyebrow: "Compare working styles",
  segmentsTitle: "経験・費用・年齢条件から募集を比較",
  guideSections: [
    {
      title: "応募前に1週間の活動可能時間を整理する",
      paragraphs: [
        "勤務時間、通勤時間、残業の頻度、休みを調整できる曜日を整理し、レッスン・ライブ・撮影へ参加できる時間を具体的にします。『仕事と両立したい』だけでなく、平日19時以降と土日終日など数字で伝えると、運営側も活動可能か判断しやすくなります。"
      ],
      exampleTitle: "活動可能日の伝え方",
      example: "平日は18時まで勤務のため、都内であれば19時30分以降に参加できます。土日祝は原則終日活動でき、月2回程度なら事前申請で平日昼の撮影や遠征にも対応可能です。"
    },
    {
      title: "社会人経験をアイドル活動の強みに変える",
      paragraphs: [
        "接客、営業、事務、制作などの経験は、ファン対応、告知、チーム内の連絡、時間管理に活かせます。職種名だけで終わらせず、どの行動を活動に活かせるかまで自己PRに書きましょう。"
      ],
      exampleTitle: "社会人・未経験者の自己PR例",
      example: "アイドル活動は未経験ですが、接客業で相手に合わせて明るく会話する力を培いました。遅刻や連絡漏れなく3年間勤務を続けた責任感を、ライブ準備やチーム活動にも活かします。"
    },
    {
      title: "副業規定と契約条件を先に確認する",
      paragraphs: [
        "勤務先が芸能活動や報酬のある副業を認めているか確認します。合格後すぐの退職を求められるのか、売上や報酬の分配率、活動名義、契約期間も、現在の生活と両立できるか判断する材料です。"
      ]
    }
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
    },
    {
      question: "30代の社会人でも応募できますか？",
      answer: "30歳以上または年齢制限なしの条件を満たし、仕事との両立を相談できる募集であれば応募可能です。年齢条件と活動時間の両方を確認してください。"
    },
    {
      question: "副業禁止の会社に勤めながら応募できますか？",
      answer: "応募前に勤務先の就業規則を確認してください。報酬が発生する活動やSNSでの顔出しが副業・兼業に該当する場合があります。"
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
  const beginnerAuditions = auditions.filter(isBeginnerFriendlyAudition);
  const noCostAuditions = auditions.filter(isNoCostAudition);
  const noAgeLimitAuditions = auditions.filter(isAgeLimitNoneAudition);
  const pageContent = {
    ...content,
    lead: `現在、社会人・会社員・ダブルワークが相談できる募集を${auditions.length}件掲載しています。未経験、仕事との両立、平日夜・土日の活動、年齢、費用を比較できます。`
  };

  return (
    <AudienceAuditionPage
      content={pageContent}
      auditions={auditions}
      stats={[
        { value: beginnerAuditions.length, label: "社会人・未経験OK", href: "/idol-audition/mikeiken" },
        { value: noCostAuditions.length, label: "費用負担が少ない", href: "/idol-audition/free" },
        { value: noAgeLimitAuditions.length, label: "年齢制限なし", href: "/idol-audition/age-limit-none" }
      ]}
      segments={[
        {
          id: "working-beginner",
          title: "社会人・未経験から応募できる募集",
          description: "仕事を続けながら初めて挑戦しやすい募集を確認できます。",
          auditions: beginnerAuditions
        },
        {
          id: "working-low-cost",
          title: "費用負担を抑えて応募できる募集",
          description: "応募費や合格後費用の負担が少ない募集を確認できます。",
          auditions: noCostAuditions
        }
      ]}
    />
  );
}
