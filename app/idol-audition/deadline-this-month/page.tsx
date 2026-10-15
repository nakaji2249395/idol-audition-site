import type { Metadata } from "next";
import { FreshAuditionPage } from "@/components/FreshAuditionPage";
import { getAllAuditions } from "@/lib/auditionData";
import {
  formatJapanYearMonth,
  isClosingThisMonth,
  sortByDeadline
} from "@/lib/auditionFreshness";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const month = formatJapanYearMonth();
  const auditions = sortByDeadline(
    (await getAllAuditions()).filter((audition) => isClosingThisMonth(audition))
  );
  const title = `今月締切のアイドルオーディション${auditions.length}件【${month}】`;
  const description = `${month}に応募締切を迎える女性アイドルオーディション${auditions.length}件。締切が早い順に、未経験OK・高校生・社会人・費用なしの募集を比較できます。`;

  return {
    title,
    description,
    alternates: { canonical: "/idol-audition/deadline-this-month" },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/idol-audition/deadline-this-month`,
      type: "article"
    }
  };
}

export default async function DeadlineThisMonthPage() {
  const month = formatJapanYearMonth();
  const auditions = sortByDeadline(
    (await getAllAuditions()).filter((audition) => isClosingThisMonth(audition))
  );

  return (
    <FreshAuditionPage
      canonical="/idol-audition/deadline-this-month"
      eyebrow="Closing this month"
      title="今月締切のアイドルオーディション"
      lead={`${month}に応募締切を迎える女性アイドルオーディションを、締切が早い順に掲載しています。写真・自己PR・応募フォームの準備に必要な時間も考えて、余裕を持って応募しましょう。`}
      listTitle={`${month}締切の募集中オーディション`}
      emptyMessage="現在、今月中に締切を迎える募集は確認できません。"
      auditions={auditions}
      guideTitle="今月締切の募集へ応募する前に"
      guideParagraphs={[
        "締切日が同じでも、書類送信の締切時刻や、公式LINEの友だち追加後に必要事項を送る手順は募集ごとに異なります。締切当日ではなく、できれば数日前までに応募を完了してください。",
        "写真は直近3か月以内、無加工に近いバストアップと全身写真を求められることがあります。応募先の必要事項を先に確認し、名前・年齢・居住地・活動歴・志望動機をメモしておくとスムーズです。"
      ]}
    />
  );
}
