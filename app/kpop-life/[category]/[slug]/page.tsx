import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles, categories, articlePath, published } from '@/lib/kpop-life/content';
import { LessonOffer, lifeMetadata } from '../../ui';
import s from '../../life.module.css';
export function generateStaticParams() { return articles.map(a => ({ category: a.category, slug: a.slug })); }
export const dynamicParams = false;
async function getArticle(params: Promise<{
    category: string;
    slug: string;
}>) { const p = await params; const a = articles.find(a => a.category === p.category && a.slug === p.slug); if (!a)
    notFound(); return a; }
export async function generateMetadata({ params }: {
    params: Promise<{
        category: string;
        slug: string;
    }>;
}) { const a = await getArticle(params); const m = lifeMetadata(a.title, a.description, articlePath(a)); return { ...m, openGraph: { ...m.openGraph, type: 'article', publishedTime: `${published}T04:20:00+09:00`, modifiedTime: `${published}T04:20:00+09:00` } }; }
export default async function Page({ params }: {
    params: Promise<{
        category: string;
        slug: string;
    }>;
}) { const a = await getArticle(params); const c = categories[a.category]; const path = articlePath(a); const related = articles.filter(b => b.slug !== a.slug && b.category === a.category); const base = 'https://idol-audition-navi.jp'; const jsonLd = [{ '@context': 'https://schema.org', '@type': 'Article', headline: a.title, description: a.description, datePublished: `${published}T04:20:00+09:00`, dateModified: `${published}T04:20:00+09:00`, author: { '@type': 'Organization', name: '推しのとなり編集部', url: `${base}/kpop-life/editorial-policy` }, publisher: { '@type': 'Organization', name: 'アイドルオーディションナビ', url: base }, mainEntityOfPage: `${base}${path}` }, { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ name: '推しのとなり', item: `${base}/kpop-life` }, { name: c.name, item: `${base}/kpop-life/${a.category}` }, { name: a.title, item: `${base}${path}` }].map((v, i) => ({ '@type': 'ListItem', position: i + 1, ...v })) }]; return <main id="life-main" className={s.wrap}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}/><nav className={s.breadcrumbs} aria-label="パンくず"><Link href="/kpop-life">推しのとなり</Link><span>/</span><Link href={`/kpop-life/${a.category}`}>{c.name}</Link><span>/</span><span>ガイド</span></nav><div className={s.articleGrid}><article className={s.article}><p className={s.eyebrow}>{c.english} / FIRST STEP GUIDE</p><h1>{a.title}</h1><div className={s.meta}>2026.10.27 公開・情報確認 ／ <Link href="/kpop-life/editorial-policy">推しのとなり編集部</Link></div><p>{a.lead}</p><div className={s.takeaway}><strong>最初に、ここだけ。</strong><p>{a.takeaway}</p></div><nav className={s.toc} aria-label="この記事の目次"><strong>この記事でわかること</strong><ol>{a.sections.map((section, i) => <li key={section.title}><a href={`#section-${i + 1}`}>{section.title}</a></li>)}</ol></nav>{a.sections.map((section, i) => <section key={section.title}><h2 id={`section-${i + 1}`}>{section.title}</h2>{section.paragraphs.map(p => <p key={p}>{p}</p>)}{section.checklist && <ul className={s.checklist}>{section.checklist.map(item => <li key={item}>{item}</li>)}</ul>}</section>)}<h2>よくある疑問</h2>{a.questions.map(q => <details className={s.faq} key={q.q}><summary>{q.q}</summary><p>{q.a}</p></details>)}<LessonOffer category={a.category} slug={a.slug}/><div className={s.sources}><strong>参照した公式情報</strong><p>2026年10月27日確認。料金・コース・募集状況は変更される場合があります。この記事は公表情報を基にした編集記事で、受講体験や上達の保証ではありません。</p><ul>{a.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a></li>)}</ul></div></article><aside className={s.aside}><p className={s.eyebrow}>READ NEXT</p><h2>もう少し、知りたい。</h2>{related.map(b => <Link key={b.slug} href={articlePath(b)}>{b.title} ↗</Link>)}<Link href={`/kpop-life/${a.category}`}>{c.name}の記事一覧へ</Link><Link href="/kpop-life">ほかの「やってみたい」を探す</Link></aside></div></main>; }
