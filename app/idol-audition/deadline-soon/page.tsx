import type { Metadata } from "next";
import { FreshAuditionPage } from "@/components/FreshAuditionPage";
import { getAllAuditions } from "@/lib/auditionData";
import { isClosingWithinDays, sortByDeadline } from "@/lib/auditionFreshness";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const auditions = sortByDeadline(
    (await getAllAuditions()).filter((audition) => isClosingWithinDays(audition, 7))
  );
  const title = `締切7日以内のアイドルオーディション${auditions.length}件【2026年最新】`;
  const description = `応募締切まで7日以内の女性アイドルオーディション${auditions.length}件。締切が近い順に、未経験OK・高校生・社会人・費用なしの募集を確認できます。`;

  return {
    title,
    description,
    alternates: { canonical: "/idol-audition/deadline-soon" },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/idol-audition/deadline-soon`,
      type: "article"
    }
  };
}

export default async function DeadlineSoonPage() {
  const auditions = sortByDeadline(
    (await getAllAuditions()).filter((audition) => isClosingWithinDays(audition, 7))
  );

  return (
    <FreshAuditionPage
      canonical="/idol-audition/deadline-soon"
      eyebrow="Closing soon"
      title="締切7日以内のアイドルオーディション"
      lead="応募締切まで7日以内の女性アイドルオーディションを、締切が早い順に確認できます。公式LINE追加だけで応募完了にならない募集もあるため、必要事項の送信まで終わったか確認しましょう。"
      listTitle="応募締切まで7日以内の募集"
      emptyMessage="現在、7日以内に締切を迎える募集は確認できません。"
      auditions={auditions}
      guideTitle="締切直前でも応募漏れを防ぐ準備"
      guideParagraphs={[
        "応募ボタンを押しただけ、または公式LINEを追加しただけでは応募が完了していない場合があります。トーク画面の案内に沿って、写真やプロフィールなどの必要事項を送信してください。",
        "急いでいるときも、募集年齢、活動地域、費用、契約条件を飛ばさず確認します。写真や文章を送る前に誤字、連絡先、SNSアカウントの公開範囲を見直しましょう。"
      ]}
    />
  );
}
