import type { Metadata } from "next";
import Link from "next/link";
import { getAllAuditions } from "@/lib/auditionData";
import { isOpenAudition } from "@/lib/auditionFreshness";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "大手・注目アイドルオーディションを探す｜実績・年齢・費用で比較",
  description: "大手や実績のある運営のアイドルオーディションを探している方へ。プロデューサー・ライブ出演実績のある注目募集を、年齢条件・費用・選考の流れで比較。新規グループと既存グループの違いも解説します。",
  alternates: { canonical: "/idol-audition/major" },
};

const selections = [
  { slug: "audition-plus-2026110544", source: "202704/audition-2026110544", point: "J-BEANSは所属グループTA女子のオリコンデイリー1位・豊洲PITやZepp新宿での公演実績を掲載。新グループ自身の実績ではありません。平日週1回程度のレッスンと土日中心のライブ活動を予定しています。", kind: "新規グループ", scope: "所属する他グループの実績" },
  { slug: "audition-plus-2026101552", source: "202611/audition-2026101552", point: "TIFにデビュー年から6年連続出演し、Zepp Shinjuku・品川ステラボールで単独公演を開催。全国12都市の単独ツアー実績を掲載する既存グループです。", kind: "既存グループの追加募集", scope: "募集グループ自身の活動実績" },
  { slug: "audition-plus-2026110866", source: "202612/audition-2026110866", point: "つんく♂完全プロデュース。TNX株式会社の創立20年プロジェクトとして募集する新グループです。", kind: "新規グループ", scope: "プロデューサー・主催の実績" },
  { slug: "audition-plus-2026070391", source: "202609/audition-2026070391", point: "虹色幻想曲はTIF・@JAMへの出演やLIQUIDROOM・新宿BLAZEでのワンマン実績を掲載。既存グループと新姉妹グループでは年齢条件が異なります。", kind: "既存グループ＋新姉妹グループ", scope: "虹色幻想曲の活動実績" },
  { slug: "audition-plus-2026072047", source: "202608/audition-2026072047", point: "ZeppでのワンマンやSUMMER SONIC出演実績を掲載するグループ。月間20日程度の活動に参加できることが応募条件です。", kind: "既存グループの追加募集", scope: "募集グループ自身の活動実績" },
  { slug: "audition-plus-2026071844", source: "202608/audition-2026071844", point: "武道館公演を行ったグループやTIF出演グループを手がけるKABUKIMONO’DOGsの新規募集。これらは運営の他グループの実績で、新グループ自身の実績ではありません。", kind: "新規グループ", scope: "運営が手がけた他グループの実績" },
];

export default async function MajorAuditionsPage() {
  const auditions = await getAllAuditions();
  const entries = selections.flatMap(selection => {
    const audition = auditions.find(item => item.slug === selection.slug && isOpenAudition(item));
    return audition ? [{ ...selection, audition }] : [];
  });
  return <main className="mx-auto max-w-6xl px-5 py-12">
    <Link href="/idol-audition" className="text-sm font-bold underline">← アイドルオーディション一覧</Link>
    <header className="mt-8 max-w-3xl">
      <p className="font-bold text-pink-600">実績と応募条件から選ぶ</p>
      <h1 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">大手・注目アイドルオーディションを探す</h1>
      <p className="mt-6 leading-8">「有名な運営ならどこでもよい」ではなく、自分が活動できる条件から比較しましょう。このページでは、掲載元にプロデューサーや公演・出演実績が記載された注目募集を選んでいます。すべての主催者を「大手」と認定する一覧や、合格しやすさのランキングではありません。</p>
      <p className="mt-4 font-bold">現在募集中の比較対象：{entries.length}件</p>
    </header>
    <nav aria-label="比較ページの目次" className="my-8 flex flex-wrap gap-4 text-sm font-bold underline">
      <a href="#comparison">条件比較表</a><a href="#list">募集・実績を見る</a><a href="#choose">大手・注目募集の選び方</a><Link href="/idol-audition/how-to-apply">自己PRを準備</Link><Link href="/idol-audition/photos">応募写真を準備</Link>
    </nav>
    {entries.length > 0 ? <section id="comparison" className="mb-12 scroll-mt-24" aria-labelledby="comparison-heading">
      <h2 id="comparison-heading" className="text-2xl font-black">年齢・地域・締切・費用を比較</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">スマートフォンでは表を横にスクロールできます。年齢は要項からの抜粋です。姉妹グループとの違い・契約などの条件は詳細で確認してください。</p>
      <div role="region" aria-label="注目募集の比較表（横スクロール）" tabIndex={0} className="mt-5 overflow-x-auto border-y border-slate-200">
        <table className="w-full min-w-[900px] text-left text-sm leading-7">
          <caption className="sr-only">現在募集中の注目アイドルオーディションの比較</caption>
          <thead className="bg-[#f8f2ef]"><tr>{["募集・募集形態", "年齢条件の抜粋", "活動地域", "締切", "費用・自己負担"].map(label => <th key={label} scope="col" className="p-4">{label}</th>)}</tr></thead>
          <tbody>{entries.map(({ audition, kind }) => {
            const ageLines = audition.age.split(/\n/).filter(line => /\d.*[歳才]|年齢制限なし/.test(line));
            return <tr key={audition.slug} className="border-t border-slate-200 align-top">
              <th scope="row" className="min-w-56 p-4"><a href={`#${audition.slug}`} className="underline">{audition.title}</a><p className="mt-2 font-normal text-slate-600">{kind}</p></th>
              <td className="min-w-48 p-4">{ageLines.length ? ageLines.join(" ／ ") : <a href={`#${audition.slug}`} className="underline">応募資格を見る</a>}</td>
              <td className="min-w-28 p-4">{audition.area}</td><td className="whitespace-nowrap p-4">{audition.deadline}</td>
              <td className="min-w-60 p-4"><details><summary className="min-h-11 cursor-pointer font-bold underline">参加費・合格後費用を開く</summary><p className="mt-3 whitespace-pre-line">{audition.cost}</p></details></td>
            </tr>;
          })}</tbody>
        </table>
      </div>
    </section> : null}
    <section id="list" className="scroll-mt-24">
      <h2 className="text-2xl font-black">注目した理由と募集条件</h2>
      <p className="mt-3 leading-8 text-slate-600">実績は掲載元の募集情報に基づきます。知名度や出演歴だけで契約条件・待遇の良さは判断できません。締切が過ぎた募集はこの比較から外れます。</p>
      <div className="mt-6 grid gap-6">
        {entries.map(({ audition, point, kind, scope, source }) => <article id={audition.slug} key={audition.slug} className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <p className="text-sm font-bold text-pink-600">{kind}</p>
          <h3 className="mt-2 text-xl font-black"><Link href={`/idol-audition/${audition.slug}`} className="hover:underline">{audition.title}</Link></h3>
          <p className="mt-4 leading-8">{point}</p>
          <p className="mt-2 text-sm text-slate-600">実績の対象：{scope}</p>
          <dl className="mt-5 divide-y divide-slate-200">
            {[["募集締切", audition.deadline], ["活動地域", audition.area], ["応募資格・年齢", audition.age], ["費用・自己負担", audition.cost], ["経験条件", audition.experience]].filter(([, value]) => value).map(([label, value]) => <div key={label} className="grid gap-2 py-4 sm:grid-cols-[9rem_1fr]"><dt className="font-bold">{label}</dt><dd className="whitespace-pre-line leading-7">{value}</dd></div>)}
          </dl>
          <div className="mt-5 flex flex-wrap items-center gap-5">
            <Link href={`/idol-audition/${audition.slug}`} className="rounded-full bg-slate-950 px-5 py-3 font-bold text-white">選考・応募方法を見る</Link>
            <a href={`https://audition.nerim.info/audition-${source}.html`} className="text-sm underline">掲載元の募集情報</a>
          </div>
        </article>)}
      </div>
      {entries.length === 0 ? <p className="mt-6">この比較で紹介している募集は受付期間を終了しています。<Link href="/idol-audition" className="underline">現在の募集一覧</Link>をご覧ください。</p> : null}
    </section>
    <section id="choose" className="mt-14 max-w-3xl scroll-mt-24">
      <h2 className="text-2xl font-black">大手・注目募集で比べたい3つのこと</h2>
      <h3 className="mt-6 text-lg font-bold">1. 誰の実績なのか</h3><p className="mt-2 leading-8">主催会社、プロデューサー、募集グループ、姉妹グループの実績を分けて確認します。新規グループには、運営に実績があってもデビュー日や出演先がまだ確定していない場合があります。</p>
      <h3 className="mt-6 text-lg font-bold">2. 参加できる活動日数・場所か</h3><p className="mt-2 leading-8">「全国から応募可能」と「地元に住んだまま活動可能」は別です。平日昼間の参加、都内への転居、学業との調整など、応募資格を先に確認しましょう。</p>
      <h3 className="mt-6 text-lg font-bold">3. 無料になる範囲はどこまでか</h3><p className="mt-2 leading-8">参加費・レッスン費が無料でも、面接交通費や生活費が自己負担になる募集があります。報酬・契約期間・退所時の条件は契約前に書面で確認してください。</p>
      <p className="mt-6 leading-8"><Link href="/idol-audition/agency-guide" className="font-bold underline">事務所選びの確認項目</Link> ／ <Link href="/idol-audition/mikeiken" className="font-bold underline">未経験歓迎の募集を広く探す</Link></p>
    </section>
  </main>;
}
