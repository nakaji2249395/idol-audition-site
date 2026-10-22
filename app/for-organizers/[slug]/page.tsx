import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { organizerArticles } from "@/lib/organizerArticles";
import { organizerJournal } from "@/lib/organizerJournal";
import { OrganizerNote } from "@/components/OrganizerNote";
import styles from "../organizers.module.css";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return organizerArticles.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = organizerArticles.find(article => article.slug === slug);
  if (!article) notFound();
  return {
    title: { absolute: `${article.title}｜BACKSTAGE` }, description: article.description,
    alternates: { canonical: `/for-organizers/${slug}` },
    openGraph: { title: article.title, description: article.description, url: `/for-organizers/${slug}`, type: "article", siteName: organizerJournal.name },
    twitter: { card: "summary", title: article.title, description: article.description },
  };
}

export default async function JournalArticle({ params }: Props) {
  const { slug } = await params;
  const article = organizerArticles.find(article => article.slug === slug);
  if (!article) notFound();
  const source = await readFile(path.join(process.cwd(), "content/organizers/articles", `${article.slug}.md`), "utf8");
  const blocks = source.trim().split(/\n\s*\n/).slice(1);
  return (
    <main id="journal-main" className={styles.article}>
      <Link className={styles.back} href="/for-organizers">← 運営をはじめるノート</Link>
      <article>
        <header className={styles.articleHeader}>
          <p className={styles.eyebrow}>{article.number} / {article.category}</p>
          <h1>{article.title}</h1>
          <p className={styles.byline}>元エンジニアの運営記録 / BACKSTAGE JOURNAL</p>
        </header>
        <div className={styles.body}>
          {blocks.map((block, index) => block.startsWith("## ") ? <h2 key={index}>{block.slice(3)}</h2> : <p key={index}>{block}</p>)}
          {article.source && <p><a className={styles.sourceLink} href={article.source.url} target="_blank" rel="noopener noreferrer">{article.source.label} ↗</a></p>}
        </div>
        <OrganizerNote key={slug} article={slug} heading={article.noteHeading} paragraphs={article.noteParagraphs} />
      </article>
      <nav className={styles.related} aria-label="関連する運営記事">
        <p className={styles.eyebrow}>あわせて読む</p>
        {article.related.map(slug => { const related = organizerArticles.find(item => item.slug === slug)!; return <Link key={slug} href={`/for-organizers/${slug}`}>{related.title} →</Link>; })}
      </nav>
      <Link className={styles.back} href="/for-organizers">← 運営者向けの入口に戻る</Link>
    </main>
  );
}
