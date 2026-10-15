import type { Metadata } from "next";
import { FreshAuditionPage } from "@/components/FreshAuditionPage";
import { getAllAuditions } from "@/lib/auditionData";
import { isOpenAudition, sortByPublishedAt } from "@/lib/auditionFreshness";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const auditions = sortByPublishedAt(
    (await getAllAuditions()).filter((audition) => isOpenAudition(audition))
  ).slice(0, 24);
  const title = `新着アイドルオーディション${auditions.length}件【2026年最新】`;
  const description = `最近掲載された女性アイドルオーディション${auditions.length}件。未経験、高校生、20代・30代、東京・大阪・名古屋、費用なしなどの新着募集を確認できます。`;

  return {
    title,
    description,
    alternates: { canonical: "/idol-audition/new" },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/idol-audition/new`,
      type: "article"
    }
  };
}

export default async function NewAuditionsPage() {
  const auditions = sortByPublishedAt(
    (await getAllAuditions()).filter((audition) => isOpenAudition(audition))
  ).slice(0, 24);

  return (
    <FreshAuditionPage
      canonical="/idol-audition/new"
      eyebrow="New auditions"
      title="新着アイドルオーディション"
      lead="最近掲載された女性アイドルオーディションを新しい順に確認できます。募集を探し始めたばかりの方も、前回の確認以降に追加された情報だけ見たい方も、まずここから比較できます。"
      listTitle="最近掲載された募集中のオーディション"
      emptyMessage="現在、新着募集を確認しています。"
      auditions={auditions}
      guideTitle="新着募集を確認するときのポイント"
      guideParagraphs={[
        "掲載されたばかりの募集でも、応募順に選考を進め、定員に達すると締切前に終了する場合があります。気になる募集は年齢・地域・活動時間を先に確認し、写真や自己PRを準備しましょう。",
        "新着であることだけで応募先を決めず、運営情報、費用、報酬、契約条件、公式SNSの活動実績も確認してください。未経験者は、合格後のレッスン内容と費用の負担範囲まで比較すると安心です。"
      ]}
    />
  );
}
