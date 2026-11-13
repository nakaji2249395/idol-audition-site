import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { fetchApprovedAuditionBySlug } from "@/lib/submissions";
import { getApplyUrl } from "@/lib/applyUrl";
import { isOpenAudition } from "@/lib/auditionFreshness";
import { TrackedApplyLink } from "@/components/TrackedApplyLink";
import styles from "../mens.module.css";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };
const getAudition = cache(async (slug: string) => {
  const a = await fetchApprovedAuditionBySlug(slug);
  return a?.category === "mens" ? a : null;
});
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = await getAudition((await params).slug);
  if (!a) return { title: "募集が見つかりません" };
  return { title: a.title, description: a.summary, alternates: { canonical: `/mens-idol-audition/${a.slug}` }, openGraph: { title: a.title, description: a.summary, images: a.imageUrl ? [a.imageUrl] : [] } };
}
export default async function MensDetail({ params }: Props) {
  const a = await getAudition((await params).slug);
  if (!a) notFound();
  const open = isOpenAudition(a);
  const sections = [
    ["募集内容", a.description], ["応募資格", a.age],
    ["オーディションの流れ", a.selectionFlow?.join("\n\n")],
    ["合格後の活動", a.highlights?.join("\n")], ["費用", a.cost], ["報酬", a.reward],
    ["応募方法", a.faq?.find(f => f.question === "応募方法はどこで確認できますか？")?.answer],
  ].filter(([, body]) => body?.trim());
  const official = [["公式サイト", a.officialSiteUrl], ["X", a.officialXUrl], ["Instagram", a.officialInstagramUrl], ["TikTok", a.officialTiktokUrl], ["YouTube", a.officialYoutubeUrl]].filter(([, url]) => url && /^https?:\/\//.test(url));
  return <main className={styles.main}>
    <Link className={styles.back} href="/mens-idol-audition">← メンズアイドルの募集一覧</Link>
    <div className={styles.detailHeading}><p className={styles.eyebrow}>MEN’S AUDITION</p><h1>{a.title}</h1><p>{a.group}</p><div className={styles.tags}>{a.area ? <span>{a.area}</span> : null}<span>締切 {a.deadline}</span></div></div>
    <div className={styles.detailGrid}><article>
      {a.imageUrl ? <img className={styles.mainImage} src={a.imageUrl} alt={a.title} /> : null}
      {sections.map(([heading, body]) => <section className={styles.section} key={heading}><h2>{heading}</h2><p>{body}</p></section>)}
      {official.length ? <section className={styles.section}><h2>公式リンク</h2><div className={styles.official}>{official.map(([label, url]) => <a href={url!} key={label} target="_blank" rel="noopener noreferrer">{label} ↗</a>)}</div></section> : null}
    </article><aside className={styles.sidebar}><div className={styles.applyBox}><p className={styles.eyebrow}>{open ? "NEXT STEP" : "CLOSED"}</p><h2>{open ? "応募案内を受け取る" : "募集期間が終了しました"}</h2>{open ? <><p>ナビ公式LINEで応募先をご案内します。友だち追加だけでは応募は完了しません。</p><TrackedApplyLink href={getApplyUrl(a.slug)} auditionSlug={a.slug} surface="detail_sidebar" className={styles.lineButton}>この募集にLINEで応募する →</TrackedApplyLink></> : <Link href="/mens-idol-audition">募集中のオーディションを見る →</Link>}</div></aside></div>
  </main>;
}
