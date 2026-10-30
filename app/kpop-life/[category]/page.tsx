import { notFound } from 'next/navigation';
import Link from 'next/link';
import { categories, articles, type Category } from '@/lib/kpop-life/content';
import { ArticleCard, lifeMetadata } from '../ui';
import s from '../life.module.css';
export function generateStaticParams() { return Object.keys(categories).map(category => ({ category })); }
export const dynamicParams = false;
export async function generateMetadata({ params }: {
    params: Promise<{
        category: string;
    }>;
}) { const { category } = await params; if (!(category in categories))
    notFound(); const c = categories[category as Category]; return lifeMetadata(category === 'dance' ? 'K-POPダンス初心者ガイド・スクール選び' : `${c.name}の始め方・レッスン選び`, c.intro, `/kpop-life/${category}`); }
export default async function Page({ params }: {
    params: Promise<{
        category: string;
    }>;
}) { const { category } = await params; if (!(category in categories))
    notFound(); const c = categories[category as Category]; return <main id="life-main" className={s.wrap}><nav className={s.breadcrumbs} aria-label="パンくず"><Link href="/kpop-life">推しのとなり</Link><span>/</span><span>{c.name}</span></nav><div className={s.intro}><p className={s.eyebrow}>{c.english} / START HERE</p><h1>{category === 'dance' ? 'K-POPダンスの始め方・スクール選び' : `${c.verb}。`}</h1><p>{c.intro}</p></div><section className={s.section}><h2 className={s.sectionTitle}>{c.name}のガイド</h2><div className={s.grid}>{articles.filter(a => a.category === category).map(a => <ArticleCard key={a.slug} article={a}/>)}</div></section></main>; }
