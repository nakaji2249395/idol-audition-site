import type { Metadata } from "next";
import { RegionalAuditionPage } from "@/components/RegionalAuditionPage";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "神奈川・横浜のアイドルオーディション一覧｜未経験OKの募集",
  description:
    "神奈川・横浜・川崎で活動できるアイドルオーディション一覧。未経験OK、高校生・大学生、社会人、費用なしの新メンバー募集を比較できます。",
  alternates: { canonical: "/idol-audition/kanagawa" },
  openGraph: {
    title: "神奈川・横浜のアイドルオーディション一覧",
    description: "神奈川・横浜・川崎で募集中のアイドルオーディションを条件別に比較できます。",
    url: `${siteConfig.url}/idol-audition/kanagawa`,
    type: "article"
  }
};

export default function KanagawaAuditionPage() {
  return (
    <RegionalAuditionPage
      content={{
        region: "kanagawa",
        eyebrow: "Kanagawa / Yokohama Audition",
        title: "神奈川・横浜のアイドルオーディション一覧",
        lead:
          "神奈川・横浜・川崎などで活動できるアイドルグループの募集をまとめています。都内との合同活動も含め、年齢、未経験可否、費用、レッスン場所、終演後の帰宅時間を比較できます。",
        listTitle: "神奈川・横浜で募集中のアイドルオーディション",
        guideTitle: "神奈川からアイドル活動を始めるときの確認ポイント",
        guideParagraphs: [
          "神奈川県内を拠点とする募集に加え、横浜・川崎から東京都内へ通える方を対象にした募集もあります。活動地域が『関東』の場合は、主なライブ会場とレッスン場所を確認しましょう。",
          "平日夜のレッスンや週末ライブが多いため、終演後の帰宅手段、交通費、学校や仕事との両立条件まで確認すると、長く続けられる募集を選びやすくなります。"
        ],
        areas: ["横浜", "川崎", "湘南", "藤沢", "相模原", "神奈川県内", "東京都内", "関東近郊"],
        checks: [
          "主なライブ会場が神奈川か東京都内か確認したか",
          "レッスン場所と最寄り駅を確認したか",
          "終演後に無理なく帰宅できる時間か",
          "交通費・遠征費の負担範囲が明記されているか",
          "未経験者向けのレッスン体制があるか",
          "学校や仕事との両立を相談できるか"
        ],
        faq: [
          {
            question: "神奈川在住でも東京のアイドルオーディションへ応募できますか？",
            answer: "都内・関東近郊へ継続して通えることを条件にした募集なら応募できます。レッスン頻度と終演後の帰宅時間を確認してください。"
          },
          {
            question: "横浜だけで活動できる募集はありますか？",
            answer: "横浜・神奈川を主な活動地域にする募集があります。東京でのライブや遠征を含む場合もあるため、詳細を確認しましょう。"
          },
          {
            question: "未経験でも応募できますか？",
            answer: "未経験OK・経験不問と記載された募集なら応募できます。合格後のレッスン内容と費用も比較してください。"
          }
        ],
        showConditionStats: true,
        relatedLinks: [
          {
            href: "/idol-audition/tokyo",
            label: "東京・関東の募集も見る",
            description: "神奈川から通える都内・関東近郊の募集を比較する"
          },
          {
            href: "/idol-audition/mikeiken",
            label: "神奈川から応募できる未経験OK募集",
            description: "歌やダンスが初めてでも応募しやすい募集を探す"
          },
          {
            href: "/idol-audition/university-student",
            label: "大学生・専門学生向けの募集",
            description: "学業と活動を両立しやすい条件を確認する"
          }
        ]
      }}
    />
  );
}
