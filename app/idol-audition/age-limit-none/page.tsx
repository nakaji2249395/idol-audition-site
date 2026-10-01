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
  title: "年齢制限なしのアイドルオーディション【2026年10月】30代・40代も確認",
  description:
    "年齢不問・年齢制限なし・上限なしと明記されたアイドルオーディションを掲載。年齢だけで諦めずに応募できる募集中の情報を比較できます。",
  alternates: { canonical: "/idol-audition/age-limit-none" },
  openGraph: {
    title: "年齢制限なしのアイドルオーディション【2026年10月】30代・40代も確認",
    description: "年齢不問・上限なしと明記された募集を、未経験・社会人・費用条件から比較できます。",
    url: `${siteConfig.url}/idol-audition/age-limit-none`,
    type: "article"
  }
};

const content = {
  canonical: "/idol-audition/age-limit-none",
  eyebrow: "No age limit",
  title: "年齢制限なしのアイドルオーディション 30代・40代も確認できる募集",
  listTitle: "年齢不問・上限なしの募集中オーディション",
  guideTitle: "年齢制限なしの募集でも確認したいこと",
  guideParagraphs: [
    "年齢制限なしは、年齢だけを理由に応募対象外にしないという意味です。ただし、活動地域、稼働日数、健康状態、専属契約の有無など、別の応募条件が設定されている場合があります。",
    "年齢非公開のグループや、個性・人間性・社会性を重視する募集では、年齢そのものよりもコンセプトとの相性や継続して活動できるかが見られます。応募先の楽曲、ライブ映像、既存メンバーを確認して志望理由を具体的にしましょう。",
    "この一覧は、年齢の記載がない募集を自動的に含めず、年齢不問や上限なしと明記された募集だけを掲載しています。"
  ],
  segmentsEyebrow: "Compare conditions",
  segmentsTitle: "経験・働き方・費用条件から募集を比較",
  guideSections: [
    {
      title: "年齢不問でもコンセプトとの相性を確認する",
      paragraphs: [
        "年齢上限がなくても、楽曲、衣装、ライブの雰囲気、活動頻度にはグループごとの方針があります。公式SNSやライブ映像を確認し、自分がそのグループでどんな役割を担えるかを志望理由に落とし込みましょう。"
      ]
    },
    {
      title: "年齢を聞かれたら経験と継続性で答える",
      paragraphs: [
        "年齢だけを弁解するのではなく、生活基盤、活動可能日、これまで培った強み、挑戦を続けられる理由を具体的に伝えます。運営が確認したいのは、活動条件を満たし長く取り組めるかです。"
      ],
      exampleTitle: "年齢について聞かれた場合の回答例",
      example: "年齢を重ねた分、時間管理と責任ある連絡を徹底できます。平日夜と土日に活動時間を確保しており、接客経験で培ったコミュニケーション力をライブやファン対応に活かし、長く活動したいです。"
    },
    {
      title: "未経験なら成長計画を自己PRに入れる",
      paragraphs: [
        "『未経験ですが頑張ります』だけでなく、週に何時間練習できるか、どの経験を活動へ活かせるかを伝えます。年齢制限なしと未経験OKは別条件なので、募集詳細の経験欄も必ず確認してください。"
      ],
      exampleTitle: "年齢不問・未経験者の自己PR例",
      example: "歌とダンスは未経験ですが、毎日30分の基礎練習と週2回のレッスン時間を確保できます。仕事で身につけた継続力と発信力を活かし、成長過程も応援してもらえる存在を目指します。"
    }
  ],
  checks: [
    "年齢不問・上限なしと明記されているか",
    "グループのコンセプトや求める人物像に合うか",
    "活動地域とレッスン場所へ継続して通えるか",
    "仕事・学業・家庭と活動日数を両立できるか",
    "所属費・レッスン費・衣装代・交通費を確認したか",
    "専属契約の期間と活動ルールを確認できるか"
  ],
  faq: [
    {
      question: "年齢制限なしなら何歳でも応募できますか？",
      answer: "年齢については応募可能ですが、活動地域やスケジュールなど他の条件があります。募集要項全体を確認してください。"
    },
    {
      question: "年齢が書かれていない募集も年齢不問ですか？",
      answer: "必ずしも年齢不問とは限りません。このページでは、年齢不問・上限なしと明記された募集を掲載しています。"
    },
    {
      question: "40代でも応募できますか？",
      answer: "年齢不問と明記された募集では応募できる可能性があります。コンセプトや活動条件も確認し、不明な場合は主催者へ問い合わせてください。"
    },
    {
      question: "未経験でも応募できますか？",
      answer: "年齢条件とは別に、未経験OKかを確認してください。募集詳細には経験条件も掲載しています。"
    },
    {
      question: "社会人でも応募できますか？",
      answer: "年齢不問でも活動時間の条件は別にあります。社会人可・仕事との両立相談可の記載と、平日昼や遠征の頻度を確認してください。"
    }
  ],
  relatedLinks: [
    {
      href: "/idol-audition/30s",
      label: "30代から応募できるアイドル募集",
      description: "30歳以上を含む募集と自己PRのポイントを確認する"
    },
    {
      href: "/idol-audition/mikeiken",
      label: "年齢制限なし・未経験OKの募集",
      description: "年齢と経験の両方の条件を確認して探す"
    },
    {
      href: "/idol-audition/working-adult",
      label: "社会人から応募できるオーディション",
      description: "仕事、活動曜日、ダブルワーク条件を比較する"
    },
    {
      href: "/idol-audition/20s",
      label: "20代から応募できるオーディション",
      description: "20代前半・後半の募集を年齢上限から探す"
    }
  ]
};

export default async function AgeLimitNoneAuditionPage() {
  const auditions = (await getAllAuditions()).filter(isAgeLimitNoneAudition);
  const beginnerAuditions = auditions.filter(isBeginnerFriendlyAudition);
  const workingAdultAuditions = auditions.filter(isWorkingAdultAudition);
  const noCostAuditions = auditions.filter(isNoCostAudition);
  const pageContent = {
    ...content,
    lead: `現在、「年齢不問」「年齢制限なし」「上限なし」と明記された募集を${auditions.length}件掲載しています。30代・40代、未経験、社会人、費用など年齢以外の活動条件も比較できます。`
  };

  return (
    <AudienceAuditionPage
      content={pageContent}
      auditions={auditions}
      stats={[
        { value: beginnerAuditions.length, label: "年齢不問・未経験OK", href: "/idol-audition/mikeiken" },
        { value: workingAdultAuditions.length, label: "社会人・仕事と両立", href: "/idol-audition/working-adult" },
        { value: noCostAuditions.length, label: "費用負担が少ない", href: "/idol-audition/free" }
      ]}
      segments={[
        {
          id: "no-age-beginner",
          title: "年齢制限なし・未経験OKの募集",
          description: "年齢と経験の両方で応募条件を満たす募集を確認できます。",
          auditions: beginnerAuditions
        },
        {
          id: "no-age-working-adult",
          title: "年齢制限なし・社会人向けの募集",
          description: "仕事との両立条件にも触れている募集を確認できます。",
          auditions: workingAdultAuditions
        }
      ]}
    />
  );
}
