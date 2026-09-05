import type { Metadata } from "next";
import { AudienceAuditionPage } from "@/components/AudienceAuditionPage";
import { getAllAuditions } from "@/lib/auditionData";
import { isAgeLimitNoneAudition } from "@/lib/auditionAudience";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "年齢制限なしのアイドルオーディション一覧【2026年】上限なしの募集",
  description:
    "年齢不問・年齢制限なし・上限なしと明記されたアイドルオーディションを掲載。年齢だけで諦めずに応募できる募集中の情報を比較できます。",
  alternates: { canonical: "/idol-audition/age-limit-none" },
  openGraph: {
    title: "年齢制限なしのアイドルオーディション一覧【2026年】",
    description: "年齢不問・上限なしと明記されたアイドル募集を比較できます。",
    url: `${siteConfig.url}/idol-audition/age-limit-none`,
    type: "article"
  }
};

const content = {
  canonical: "/idol-audition/age-limit-none",
  eyebrow: "No age limit",
  title: "年齢制限なしの アイドルオーディション",
  lead:
    "募集要項に「年齢不問」「年齢制限なし」「上限なし」と明記されたアイドルオーディションをまとめています。年齢以外の活動条件も比較して、自分に合う募集を探せます。",
  listTitle: "年齢不問・上限なしの募集中オーディション",
  guideTitle: "年齢制限なしの募集でも確認したいこと",
  guideParagraphs: [
    "年齢制限なしは、年齢だけを理由に応募対象外にしないという意味です。ただし、活動地域、稼働日数、健康状態、専属契約の有無など、別の応募条件が設定されている場合があります。",
    "年齢非公開のグループや、個性・人間性・社会性を重視する募集では、年齢そのものよりもコンセプトとの相性や継続して活動できるかが見られます。応募先の楽曲、ライブ映像、既存メンバーを確認して志望理由を具体的にしましょう。",
    "この一覧は、年齢の記載がない募集を自動的に含めず、年齢不問や上限なしと明記された募集だけを掲載しています。"
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
  return <AudienceAuditionPage content={content} auditions={auditions} />;
}
