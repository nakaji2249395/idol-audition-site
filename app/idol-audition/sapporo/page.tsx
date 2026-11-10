import type { Metadata } from "next";
import { RegionalAuditionPage } from "@/components/RegionalAuditionPage";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "札幌のアイドルオーディション一覧｜未経験・高校生OKの募集を比較",
  description: "札幌を拠点に活動するアイドルの新メンバー募集を掲載。現在募集中の案件を、年齢・未経験可否・レッスン費・交通費・選考方法で比較できます。北海道内から通う場合の活動条件も確認できます。",
  alternates: { canonical: "/idol-audition/sapporo" },
  openGraph: {
    title: "札幌のアイドルオーディション一覧",
    description: "札幌で募集中のアイドルオーディションを年齢・経験・費用で比較。",
    url: `${siteConfig.url}/idol-audition/sapporo`,
    type: "article"
  }
};

export default function SapporoAuditionPage() {
  return <RegionalAuditionPage content={{
    region: "sapporo",
    eyebrow: "Sapporo Audition",
    title: "札幌のアイドルオーディション一覧",
    lead: "札幌を拠点に活動するアイドルグループの新メンバー募集をまとめています。未経験からの挑戦、高校生の応募、学業や仕事との両立など、自分の条件に合う募集を年齢・費用・選考方法から比較できます。",
    listTitle: "札幌で現在募集中のアイドルオーディション",
    showConditionStats: true,
    guideTitle: "札幌でアイドル活動を始める前に",
    guideParagraphs: [
      "札幌の募集でも、参加する曜日や活動頻度はグループによって異なります。ライブだけでなく、レッスン・撮影・配信の条件を含めて比較しましょう。市外から応募する場合も、札幌へ継続して通えることが条件になる募集があります。",
      "冬季は移動時間や交通機関の運行状況も考慮して活動計画を立てましょう。所属費・レッスン費が無料でも、交通費・食費・一部の衣装代は自己負担になる場合があります。費用欄では無料になる項目と自己負担の項目を分けて確認できます。"
    ],
    areas: ["札幌市内", "札幌近郊からの通学・通勤圏"],
    checks: [
      "レッスン・ライブの場所へ継続して通えるか",
      "学校や仕事の予定と活動曜日・配信頻度を両立できるか",
      "未成年者の応募に保護者の同意が必要か",
      "交通費・衣装代・遠征費の自己負担範囲を確認したか",
      "冬季や終演後の帰宅手段を確保できるか",
      "選考課題とデビューまでの準備内容を確認したか"
    ],
    faq: [
      { question: "札幌のアイドルオーディションは未経験でも応募できますか？", answer: "経験不問と明記された募集があります。The HAREとSTAND BY MEは過去の経験を問わない募集です。経験不問でも選考がないわけではないため、各募集の書類・面接・歌唱審査の内容を確認してください。" },
      { question: "高校生でも応募できますか？", answer: "高校生以上を対象にした募集や、中学生以上を対象にした募集があります。年齢の上限や保護者同意の条件は募集ごとに異なります。学業と活動時間を両立できるかも確認しましょう。" },
      { question: "札幌市外や北海道の他の地域から応募できますか？", answer: "札幌での活動に参加できることを条件にした募集があります。居住地だけでなく、レッスンやライブに通える頻度・移動費・帰宅時間を確認してください。移住相談が可能かどうかも各募集の条件によります。" },
      { question: "仕事をしながら活動できますか？", answer: "Pirka_Dolceの募集では、学生や本業がある方にも週1〜2回以上の活動参加と毎日配信を求めています。仕事との両立が保証されるわけではないため、活動予定と勤務時間が合うか応募先に確認してください。" }
    ]
  }} />;
}
