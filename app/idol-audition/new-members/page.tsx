import type { Metadata } from "next";
import Link from "next/link";
import { getAllAuditions } from "@/lib/auditionData";
import { isOpenAudition, sortByPublishedAt } from "@/lib/auditionFreshness";
import { AuditionCard } from "@/components/AuditionCard";
import { RecruitmentAuditionList } from "@/components/RecruitmentAuditionList";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "アイドル新メンバー募集｜新規グループ・初期メンバーと追加募集を比較",
  description: "募集中のアイドルオーディションを、新規グループ・初期メンバーと既存グループの追加メンバーで比較。活動地域、年齢、締切、未経験の応募条件を確認できます。",
  alternates: { canonical: "/idol-audition/new-members" }
};

export default async function NewMembersPage() {
  const auditions = sortByPublishedAt((await getAllAuditions()).filter(item => isOpenAudition(item) && item.sourceRecruitmentTypes?.length));
  const jsonLd = { "@context": "https://schema.org", "@type": "ItemList", name: "アイドル新メンバー募集", numberOfItems: auditions.length,
    itemListElement: auditions.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.title, url: `${siteConfig.url}/idol-audition/${item.slug}` })) };
  return <main className="mx-auto max-w-[1180px] px-4 py-10 sm:px-6 sm:py-14">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g,"\\u003c") }} />
    <nav aria-label="パンくずリスト" className="text-sm font-bold text-slate-600"><Link href="/">トップ</Link> / <Link href="/idol-audition">募集一覧</Link> / 新メンバー募集</nav>
    <header className="mt-8 border-b border-slate-200 pb-7">
      <p className="editorial-kicker">New & additional members</p>
      <h1 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">アイドル新メンバー募集<br /><span className="text-2xl sm:text-3xl">新規グループ・初期メンバー／既存グループの追加募集</span></h1>
    </header>
    <RecruitmentAuditionList items={auditions.map(item => ({ slug: item.slug, types: item.sourceRecruitmentTypes ?? [], card: <AuditionCard audition={item} /> }))} />
    <section className="mt-14 border-t border-slate-200 pt-8">
      <h2 className="text-2xl font-black">新規グループと追加メンバー、選ぶときの違い</h2>
      <div className="mt-5 grid gap-6 sm:grid-cols-2">
        <div><h3 className="font-black">新規グループ・初期メンバー</h3><p className="mt-2 leading-8 text-slate-600">立ち上げ段階から参加する募集です。デビュー予定、レッスンの開始時期、楽曲・衣装の制作状況を確認しましょう。「初期メンバー」でも、活動開始までの費用やスケジュールは募集によって異なります。</p></div>
        <div><h3 className="font-black">既存グループ・追加メンバー</h3><p className="mt-2 leading-8 text-slate-600">既存グループへの加入を目指す募集です。現在の楽曲やライブ、活動頻度を確認し、合流までのレッスンやお披露目の流れを比較しましょう。新体制募集も含み、未経験の応募可否は各募集条件で確認できます。</p></div>
      </div>
      <nav aria-label="関連する募集" className="mt-7 flex flex-wrap gap-5 text-sm font-bold underline underline-offset-4">
        <Link href="/idol-audition">地域・年齢・雰囲気からすべての募集を探す</Link>
        <Link href="/idol-audition/new">最近掲載された新着募集を見る</Link>
        <Link href="/idol-audition/mikeiken">未経験歓迎の募集を見る</Link>
      </nav>
    </section>
  </main>;
}
