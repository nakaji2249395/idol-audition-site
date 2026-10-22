import type { Metadata } from "next";
import { OrganizerNote } from "@/components/OrganizerNote";
import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { organizerJournal } from "@/lib/organizerJournal";
import styles from "../organizers.module.css";

export const metadata: Metadata = {
  alternates: { canonical: "/for-organizers/no-connections" },
  openGraph: { title: "アイドルグループを作りたい。でも、業界に知り合いが一人もいなかった", description: organizerJournal.description, url: "/for-organizers/no-connections", type: "article", siteName: organizerJournal.name },
  title: { absolute: "アイドルグループを作りたい。でも、業界に知り合いが一人もいなかった｜BACKSTAGE" },
};

export default async function NoConnectionsArticle() {
  const source = await readFile(path.join(process.cwd(), "content/organizers/drafts/no-connections-free.md"), "utf8");
  const [title, ...blocks] = source.trim().split(/\n\s*\n/);
  return (
    <main id="journal-main" className={styles.article}>
      <Link className={styles.back} href="/for-organizers">← 運営をはじめるノート</Link>
      <article>
        <header className={styles.articleHeader}>
          <p className={styles.eyebrow}>01 / 人脈がない · 無料記事</p>
          <h1>{title.replace(/^# /, "")}</h1>
          <p className={styles.byline}>元エンジニアの運営記録 / BACKSTAGE JOURNAL</p>
        </header>
        <div className={styles.body}>
          {blocks.map((block, index) => block.startsWith("## ")
            ? <h2 key={index}>{block.slice(3)}</h2>
            : <p key={index}>{block}</p>)}
        </div>
        <OrganizerNote article="no-connections" heading="あのあと、何をしたのか。" paragraphs={[
          "募集を出して、問い合わせが来て、面談を重ねて。グループを立ち上げ、もうすぐ2周年を迎えるまでの続きを、noteに書いた。",
          "最初に準備したメモや送った文章、遠回りしたことも、もう少し具体的に。",
        ]} />
      </article>
      <Link className={styles.back} href="/for-organizers">← 運営者向けの入口に戻る</Link>
    </main>
  );
}
