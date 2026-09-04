import type { Metadata } from "next";
import { RegionalAuditionPage } from "@/components/RegionalAuditionPage";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "大阪・関西のアイドルオーディション一覧【2026年】未経験OKの募集",
  description:
    "大阪・関西のアイドルオーディション・メンバー募集一覧。2026年現在募集中の情報を、未経験、年齢、費用、新規グループ初期メンバー、追加メンバーなどの条件で比較できます。",
  alternates: { canonical: "/idol-audition/osaka" },
  openGraph: {
    title: "大阪・関西のアイドルオーディション一覧【2026年】",
    description: "大阪のアイドル募集を、未経験、年齢、費用などの条件別に比較できます。",
    url: `${siteConfig.url}/idol-audition/osaka`,
    type: "article"
  }
};

export default function OsakaAuditionPage() {
  return (
    <RegionalAuditionPage
      content={{
        region: "osaka",
        eyebrow: "Osaka / Kansai Audition",
        title: "大阪・関西のアイドルオーディション一覧",
        lead:
          "大阪・関西を拠点に活動するアイドルグループのオーディション・新メンバー募集をまとめています。未経験OK、新規グループ初期メンバー、追加メンバーなどを、活動地域、年齢、費用、報酬、選考方法で比較できます。",
        listTitle: "大阪・関西で募集中のアイドルオーディション",
        guideTitle: "大阪・関西でアイドルオーディションを探すポイント",
        guideParagraphs: [
          "大阪は梅田、心斎橋、難波、日本橋などにライブハウスやレッスン環境が集まり、関西発の新規グループや既存グループの追加メンバー募集が継続的に行われています。",
          "募集を選ぶときは、ライブ会場だけでなくレッスン場所へ無理なく通えるか、終演後に帰宅できるかも確認しましょう。応募無料でも交通費や活動費が自己負担になる場合があります。"
        ],
        areas: ["梅田", "心斎橋", "難波", "日本橋", "堀江", "天王寺", "神戸", "京都", "奈良"],
        checks: [
          "大阪市内のレッスン・ライブへ継続して通えるか",
          "平日夜や土日祝の活動に参加できるか",
          "応募費用と合格後の費用が分けて説明されているか",
          "交通費、衣装代、レッスン費の負担範囲が明確か",
          "未経験者向けのレッスン体制があるか",
          "運営会社、公式SNS、活動実績を確認できるか"
        ],
        faq: [
          {
            question: "大阪のアイドルオーディションは未経験でも応募できますか？",
            answer: "未経験OKと記載された募集であれば応募できます。歌やダンスの経験だけでなく、継続して活動できることや協調性を重視する募集もあります。"
          },
          {
            question: "大阪府外からでも応募できますか？",
            answer: "兵庫、京都、奈良、滋賀などから大阪市内へ通える場合は応募できる募集があります。活動時間と終電、毎月の交通費を確認してください。"
          },
          {
            question: "大阪のアイドル活動には費用がかかりますか？",
            answer: "募集によって異なります。レッスン費や衣装代を運営が負担する場合もあれば、交通費などが自己負担になる場合もあります。各募集の費用欄を確認しましょう。"
          }
        ]
      }}
    />
  );
}
