import type { Metadata } from "next";
import { RegionalAuditionPage } from "@/components/RegionalAuditionPage";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "名古屋のアイドルオーディション一覧｜愛知・東海の募集",
  description:
    "名古屋・愛知・東海で活動できるアイドルオーディション一覧。未経験OK、費用なし、新規グループや追加メンバー募集を比較できます。",
  alternates: { canonical: "/idol-audition/nagoya" },
  openGraph: {
    title: "名古屋のアイドルオーディション一覧｜愛知・東海の募集",
    description: "名古屋・愛知・東海で募集中のアイドルオーディションを条件別に比較できます。",
    url: `${siteConfig.url}/idol-audition/nagoya`,
    type: "article"
  }
};

export default function NagoyaAuditionPage() {
  return (
    <RegionalAuditionPage
      content={{
        region: "nagoya",
        eyebrow: "Nagoya / Tokai Audition",
        title: "名古屋のアイドルオーディション一覧",
        lead:
          "名古屋・愛知・東海を拠点に活動するアイドルグループの新メンバー募集をまとめています。年齢、未経験可否、費用、報酬、活動スケジュールを比較できます。",
        listTitle: "名古屋・愛知で募集中のアイドルオーディション",
        guideTitle: "名古屋・東海でアイドルオーディションを探すポイント",
        guideParagraphs: [
          "名古屋は栄、大須、新栄、金山、今池などを中心にライブアイドルの活動が盛んで、地域密着型グループから全国展開を目指すグループまで幅広い募集があります。",
          "愛知県外から応募する場合は、レッスンや平日夜のライブへ通えるかを確認しましょう。岐阜・三重・静岡から通う場合も、終演時間と交通費を事前に計算しておくと安心です。"
        ],
        areas: ["栄", "大須", "新栄", "金山", "今池", "名駅", "岐阜", "三重", "静岡"],
        checks: [
          "名古屋市内へ継続的に通えるか",
          "平日夕方以降や土日祝のライブに参加できるか",
          "研修生期間と正規デビューの条件が明確か",
          "交通費、レッスン費、衣装代の負担範囲を確認したか",
          "学校や仕事との両立について相談できるか",
          "運営元と公式SNS、過去のライブ実績を確認できるか"
        ],
        faq: [
          {
            question: "名古屋のアイドルオーディションは未経験でも応募できますか？",
            answer: "未経験歓迎の募集があります。基礎レッスンや研修生期間を設けているグループもあるため、デビューまでのサポート内容を比較しましょう。"
          },
          {
            question: "高校生でも名古屋の募集に応募できますか？",
            answer: "高校生可または15歳以上を対象とする募集があります。未成年の場合は、保護者の同意や帰宅時間、学業との両立条件を確認してください。"
          },
          {
            question: "岐阜や三重からでも応募できますか？",
            answer: "名古屋市内の活動へ継続して通える場合は応募できることがあります。レッスン頻度、終演時間、交通費を募集元へ確認しましょう。"
          }
        ]
      }}
    />
  );
}
