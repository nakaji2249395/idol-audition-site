import type { Metadata } from "next";
import { RegionalAuditionPage } from "@/components/RegionalAuditionPage";
import { getAllAuditions } from "@/lib/auditionData";
import { isAuditionInRegion } from "@/lib/auditionDiscovery";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const count = (await getAllAuditions()).filter((audition) =>
    isAuditionInRegion(audition, "osaka")
  ).length;
  const title = `大阪のアイドルオーディション${count}件【2026年10月】未経験OK`;
  const description = `大阪・関西で現在応募できるアイドルオーディション${count}件。未経験・高校生・社会人OK、費用なし、初期メンバーなどを締切や条件で比較できます。`;

  return {
    title,
    description,
    alternates: { canonical: "/idol-audition/osaka" },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/idol-audition/osaka`,
      type: "article"
    }
  };
}

export default function OsakaAuditionPage() {
  return (
    <RegionalAuditionPage
      content={{
        region: "osaka",
        eyebrow: "Osaka / Kansai Audition",
        title: "大阪のアイドルオーディション 最新募集",
        lead:
          "大阪・関西で現在応募できるアイドルオーディションを掲載しています。未経験・高校生・社会人OK、費用なし、新規グループ初期メンバー、追加メンバーなどを、締切・年齢・活動地域・報酬で比較できます。",
        listTitle: "大阪・関西で募集中のアイドルオーディション",
        guideTitle: "大阪・関西でアイドルオーディションを探すポイント",
        guideParagraphs: [
          "大阪は梅田、心斎橋、難波、日本橋などにライブハウスやレッスン環境が集まり、関西発の新規グループや既存グループの追加メンバー募集が継続的に行われています。",
          "募集を選ぶときは、ライブ会場だけでなくレッスン場所へ無理なく通えるか、終演後に帰宅できるかも確認しましょう。応募無料でも交通費や活動費が自己負担になる場合があります。"
        ],
        showConditionStats: true,
        relatedLinks: [
          {
            href: "/idol-audition/mikeiken",
            label: "大阪で未経験から応募しやすい募集",
            description: "経験不問・初心者歓迎の募集とレッスン体制を比較する"
          },
          {
            href: "/idol-audition/high-school",
            label: "高校生が応募できるアイドル募集",
            description: "保護者同意、帰宅時間、学業との両立条件を確認する"
          },
          {
            href: "/idol-audition/working-adult",
            label: "社会人から応募できるオーディション",
            description: "平日夜・土日中心、仕事との両立条件で探す"
          },
          {
            href: "/idol-audition/free",
            label: "費用なし・負担が少ない募集",
            description: "応募費、レッスン費、衣装代などの負担範囲を比べる"
          }
        ],
        guideSections: [
          {
            title: "大阪の募集は活動場所と締切から絞る",
            paragraphs: [
              "まず応募締切と年齢条件を確認し、次にレッスン場所とライブ会場を見ます。梅田・心斎橋・難波を中心に複数会場を移動する募集もあるため、学校や仕事の後に到着できるか、終演後に帰宅できるかまで想定しましょう。",
              "兵庫・京都・奈良から応募する場合は、交通費だけでなく終電時刻も重要です。募集文に活動頻度がなければ、面談前に月のライブ・レッスン回数を確認するとミスマッチを減らせます。"
            ]
          },
          {
            title: "未経験者は経験より継続性を伝える",
            paragraphs: [
              "歌やダンスが未経験でも、参加できる曜日、練習を続けた経験、接客やSNSで活かせる強みを具体的にすると、活動する姿を想像してもらいやすくなります。"
            ],
            exampleTitle: "大阪・未経験者の自己PR例",
            example: "歌とダンスは未経験ですが、週3日の自主練習時間を確保できます。接客の仕事で身につけた明るい応対と、決めたことを継続する力を活かし、大阪を拠点に長く活動したいです。"
          },
          {
            title: "無料の範囲と合格後の費用を分けて見る",
            paragraphs: [
              "応募無料でも、合格後の交通費、レッスン費、衣装代、撮影費が自己負担の場合があります。『費用なし』の募集も、遠征時の交通・宿泊費や物販衣装まで含むとは限らないため、契約前に項目ごとに確認してください。"
            ]
          }
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
          },
          {
            question: "大阪で現在応募できる募集はどこで確認できますか？",
            answer: "このページ上部の一覧には、募集期限内で大阪・関西に該当する掲載を表示しています。件数と条件は更新されるため、詳細ページで締切と主催者の最新案内も確認してください。"
          }
        ]
      }}
    />
  );
}
