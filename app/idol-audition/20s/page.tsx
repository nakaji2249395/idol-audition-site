import type { Metadata } from "next";
import { AudienceAuditionPage } from "@/components/AudienceAuditionPage";
import { getAllAuditions } from "@/lib/auditionData";
import {
  isBeginnerFriendlyAudition,
  isEligibleAtAge,
  isTwentiesAudition
} from "@/lib/auditionAudience";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "20代のアイドルオーディション【2026年】未経験・20代後半・社会人OK",
  description:
    "20代未経験・20代後半・25歳以上・社会人から応募できるアイドルオーディションを掲載。費用なし、レッスン無料、歌手デビューを目指せる2026年の募集を比較できます。",
  alternates: { canonical: "/idol-audition/20s" },
  openGraph: {
    title: "20代のアイドルオーディション【2026年】未経験・社会人OK",
    description: "20代前半・後半、25歳以上、未経験・社会人から応募できる募集を比較できます。",
    url: `${siteConfig.url}/idol-audition/20s`,
    type: "article"
  }
};

const baseContent = {
  canonical: "/idol-audition/20s",
  eyebrow: "Auditions for 20s",
  title: "20代のアイドルオーディション 未経験・社会人OKの募集",
  listTitle: "20代未経験・社会人が応募できる募集中のオーディション",
  guideTitle: "20代後半・未経験からアイドルや歌手を目指す方法",
  guideParagraphs: [
    "20代は多くのアイドルオーディションで応募対象になりますが、募集によって上限が24歳、25歳、28歳、30歳など異なります。現在の年齢だけでなく、デビュー予定時期に条件を満たすかも確認しましょう。",
    "20代後半や社会人から挑戦する場合は、活動頻度、平日昼の稼働、遠征、仕事との両立条件が重要です。応募文では、活動に使える時間や継続できる理由を具体的に伝えると判断してもらいやすくなります。",
    "未経験歓迎の募集も多くあります。歌やダンス以外にも、接客、配信、SNS、撮影、仕事で身につけたコミュニケーション力はアイドル活動に活かせます。"
  ],
  guideSections: [
    {
      title: "20代未経験から応募先を選ぶ",
      paragraphs: [
        "未経験OK・経験不問と明記された募集を優先し、基礎レッスンの有無やデビューまでの期間を確認しましょう。未経験から歌手デビューを目指す場合も、歌唱審査の内容、楽曲制作やレコーディングの予定まで見ると、自分の目標に近い募集を選びやすくなります。"
      ]
    },
    {
      title: "25歳以上・20代後半で確認したい条件",
      paragraphs: [
        "25〜29歳は、応募時点では条件内でもデビュー時点で上限を超える場合があります。『25歳まで』『29歳以下』『年齢制限なし』などの表記と、応募時点・契約時点のどちらを基準にするかを確認してください。",
        "20代後半だから不利と決まっているわけではありません。社会人経験、継続力、スケジュール管理、接客や発信の経験を、グループ活動にどう活かせるか具体的に伝えることが重要です。"
      ]
    },
    {
      title: "社会人からアイドルを目指す場合",
      paragraphs: [
        "平日夜・土日の活動で両立できるのか、平日昼の撮影や遠征があるのかを確認しましょう。応募時には勤務形態と参加可能な曜日を正直に伝え、合格後に条件が合わなくなることを防ぎます。"
      ]
    },
    {
      title: "費用なし・レッスン無料の範囲を確認する",
      paragraphs: [
        "応募無料と、合格後の費用なしは別の条件です。レッスン費、衣装代、撮影費、登録料、交通費のどこまで運営負担かを募集詳細で確認してください。『レッスン無料』でも交通費は自己負担となる募集があります。"
      ]
    }
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
    },
    {
      question: "未経験から歌手デビューも目指せますか？",
      answer: "歌唱未経験者を受け入れる募集や、合格後にボイストレーニング・レコーディングを行う募集があります。楽曲制作体制とレッスン費用もあわせて確認しましょう。"
    },
    {
      question: "費用なし・レッスン無料の募集はありますか？",
      answer: "あります。ただし、衣装代や交通費など一部が自己負担になる場合があるため、応募費用と合格後費用を分けて確認してください。"
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
    },
    {
      href: "/idol-audition/30s",
      label: "30代まで応募できるアイドル募集",
      description: "30歳以上を含む年齢条件や社会人向け募集を確認する"
    },
    {
      href: "/idol-audition/how-to-apply",
      label: "20代・未経験者向け自己PRの書き方",
      description: "志望動機、活動可能日、経験の伝え方を確認する"
    }
  ]
};

export default async function TwentiesAuditionPage() {
  const auditions = (await getAllAuditions()).filter(isTwentiesAudition);
  const earlyTwenties = auditions.filter((audition) => isEligibleAtAge(audition, 22));
  const lateTwenties = auditions.filter((audition) => isEligibleAtAge(audition, 27));
  const beginnerAuditions = auditions.filter(isBeginnerFriendlyAudition);
  const noCostAuditions = auditions.filter((audition) =>
    /費用なし|無料|かかりません|掛かりません/.test(`${audition.cost} ${audition.features.join(" ")}`)
  );
  const freeLessonAuditions = auditions.filter((audition) =>
    /レッスン(?:費)?(?:は|が)?(?:無料|なし|かかりません)|レッスン無料/.test(
      `${audition.cost} ${audition.features.join(" ")}`
    )
  );
  const content = {
    ...baseContent,
    lead: `現在、20代が応募条件に入る募集を${auditions.length}件掲載しています。20代未経験、20代後半、25歳以上、社会人から応募できる募集を、費用なし・レッスン無料などの条件と一緒に比較できます。`
  };

  return (
    <AudienceAuditionPage
      content={content}
      auditions={auditions}
      stats={[
        { value: beginnerAuditions.length, label: "20代・未経験OK" },
        { value: lateTwenties.length, label: "25歳以上・20代後半" },
        { value: noCostAuditions.length, label: `費用負担が少ない（レッスン無料 ${freeLessonAuditions.length}件）` }
      ]}
      segments={[
        {
          id: "age-20-24",
          title: "20〜24歳が応募できる募集",
          description: "20代前半・未経験から挑戦しやすい募集を確認できます。",
          auditions: earlyTwenties
        },
        {
          id: "age-25-29",
          title: "25〜29歳が応募できる募集",
          description: "25歳以上・20代後半・社会人から応募できる募集を確認できます。",
          auditions: lateTwenties
        }
      ]}
    />
  );
}
