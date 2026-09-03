import type { Metadata } from "next";
import { RegionalAuditionPage } from "@/components/RegionalAuditionPage";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "全国のアイドルオーディション一覧｜全国から応募できる募集",
  description:
    "全国から応募できるアイドルオーディション一覧。オンライン審査、上京支援、地方在住者向けの募集条件や費用を比較できます。",
  alternates: { canonical: "/idol-audition/nationwide" },
  openGraph: {
    title: "全国のアイドルオーディション一覧｜全国から応募できる募集",
    description: "居住地を問わず応募しやすい全国募集の条件や選考方法を比較できます。",
    url: `${siteConfig.url}/idol-audition/nationwide`,
    type: "article"
  }
};

export default function NationwideAuditionPage() {
  return (
    <RegionalAuditionPage
      content={{
        region: "nationwide",
        eyebrow: "Nationwide Audition",
        title: "全国のアイドルオーディション一覧",
        lead:
          "全国から応募できるアイドルオーディションをまとめています。オンライン審査の有無、合格後の活動地域、上京や転居の条件、費用を比較して、自分に合う募集を探せます。",
        listTitle: "全国から応募できるアイドルオーディション",
        guideTitle: "全国募集のアイドルオーディションを選ぶポイント",
        guideParagraphs: [
          "全国募集でも、合格後の活動拠点やレッスン場所は東京・大阪など特定の地域に決まっていることがあります。応募前に、転居の必要性や活動開始時期を確認しましょう。",
          "一次審査や面談がオンラインでも、最終審査は対面の場合があります。審査会場までの交通費、合格後の住居、生活費、上京支援の範囲まで確認すると比較しやすくなります。"
        ],
        areas: ["全国", "オンライン審査", "東京", "大阪", "名古屋", "福岡", "札幌", "地方在住者応募可"],
        checks: [
          "合格後の主な活動拠点が明記されているか",
          "オンラインで受けられる審査の範囲を確認したか",
          "最終審査会場への交通費負担が明確か",
          "上京・転居が必要になる時期を確認したか",
          "住居や引っ越しに関する支援の有無を確認したか",
          "活動開始後の交通費、レッスン費、衣装代を確認したか"
        ],
        faq: [
          {
            question: "地方に住んだまま全国募集へ応募できますか？",
            answer: "全国応募可の募集であれば応募できます。ただし合格後は指定地域への転居や定期的な通所が必要な場合があるため、活動条件を確認してください。"
          },
          {
            question: "審査はすべてオンラインで受けられますか？",
            answer: "募集によって異なります。書類審査や一次面談はオンラインでも、実技審査や最終審査は対面で行われる場合があります。"
          },
          {
            question: "上京費用や住居は運営が負担しますか？",
            answer: "支援内容は募集ごとに異なります。上京支援と書かれている場合も、対象範囲や返済条件を応募前に確認しましょう。"
          }
        ]
      }}
    />
  );
}
