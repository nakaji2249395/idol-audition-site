import type { Metadata } from "next";
import { getMensAuditions } from "@/lib/auditionData";
import { isOpenAudition, parseAuditionDeadline } from "@/lib/auditionFreshness";
import { getAuditionListingSummary } from "@/lib/auditionListingSummary";
import MensDirectory from "./MensDirectory";
import styles from "./mens.module.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "メンズアイドルオーディション・男性メンバー募集一覧",
  description: "メンズアイドル・メン地下・男性ダンスボーカルのオーディションを探す。地域、未経験歓迎、新規グループ・追加メンバーの条件から、募集中の情報を比較できます。",
  alternates: { canonical: "/mens-idol-audition" },
};

export default async function MensPage() {
  const auditions = (await getMensAuditions()).filter(a => isOpenAudition(a));
  const items = auditions.map(a => ({
    slug: a.slug, title: a.title, group: a.group, image: a.imageUrl,
    summary: a.summary, ...getAuditionListingSummary(a), deadline: a.deadline,
    deadlineDay: parseAuditionDeadline(a.deadline)?.dayNumber ?? Number.MAX_SAFE_INTEGER,
    beginner: a.features.includes("未経験OK"),
    // Classify only explicit recruitment wording, not a group's music style or history.
    kind: /新規|新グループ|新メンズ/.test(a.title) ? "new" : /新メンバー|追加メンバー/.test(a.title) ? "additional" : "",
  }));
  return <main className={styles.main}>
    <section className={styles.hero}>
      <p className={styles.eyebrow}>FIND YOUR STAGE</p>
      <h1>メンズアイドル<br />オーディション</h1>
      <p>地域や応募条件から、自分に合うステージを探そう。</p>
      <div className={styles.inventory}>募集中 <strong>{items.length}</strong> 件</div>
    </section>
    <MensDirectory items={items} />
  </main>;
}
