import type { Metadata } from "next";
import { RegionalAuditionPage } from "@/components/RegionalAuditionPage";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "福岡のアイドルオーディション一覧｜九州の新メンバー募集",
  description:
    "福岡・九州で活動できるアイドルオーディション一覧。未経験OK、費用なし、新規グループ初期メンバー、既存グループ追加メンバーなどを比較できます。",
  alternates: { canonical: "/idol-audition/fukuoka" },
  openGraph: {
    title: "福岡のアイドルオーディション一覧｜九州の新メンバー募集",
    description: "福岡・九州で募集中のアイドルオーディションを条件別に比較できます。",
    url: `${siteConfig.url}/idol-audition/fukuoka`,
    type: "article"
  }
};

export default function FukuokaAuditionPage() {
  return (
    <RegionalAuditionPage
      content={{
        region: "fukuoka",
        eyebrow: "Fukuoka / Kyushu Audition",
        title: "福岡のアイドルオーディション一覧",
        lead:
          "福岡・九州を拠点に活動するアイドルグループの新メンバー募集をまとめています。活動地域、年齢、未経験可否、費用、報酬、選考方法を比較して、自分に合う募集を探せます。",
        listTitle: "福岡・九州で募集中のアイドルオーディション",
        guideTitle: "福岡・九州でアイドルオーディションを探すポイント",
        guideParagraphs: [
          "福岡では天神、博多、中洲などを中心にライブやイベントが行われ、地域密着型グループから全国展開を目指すグループまで募集があります。",
          "九州各県から応募する場合は、レッスン場所と活動頻度、終演後の移動手段を確認しましょう。応募無料でも交通費や宿泊費が自己負担になる場合があります。"
        ],
        areas: ["天神", "博多", "中洲", "北九州", "久留米", "佐賀", "熊本", "長崎", "大分", "宮崎", "鹿児島"],
        checks: [
          "福岡市内のレッスンやライブへ継続して通えるか",
          "平日夜や土日祝の活動に参加できるか",
          "県外遠征の頻度と費用負担が明確か",
          "交通費、衣装代、レッスン費の負担範囲を確認したか",
          "未経験者向けのレッスン体制があるか",
          "運営会社、公式SNS、活動実績を確認できるか"
        ],
        faq: [
          {
            question: "福岡のアイドルオーディションは未経験でも応募できますか？",
            answer: "未経験OKと記載された募集であれば応募できます。レッスン内容やデビューまでの流れも比較して選びましょう。"
          },
          {
            question: "福岡県外からでも応募できますか？",
            answer: "福岡市内などの活動場所へ継続して通える場合は応募できる募集があります。移動時間、交通費、終演後の帰宅手段を確認してください。"
          },
          {
            question: "福岡のアイドル活動には費用がかかりますか？",
            answer: "募集によって異なります。レッスン費や衣装代が無料でも、交通費や遠征費が自己負担になる場合があるため、募集ごとの費用欄を確認しましょう。"
          }
        ]
      }}
    />
  );
}
