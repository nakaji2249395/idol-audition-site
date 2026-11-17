import type { Metadata } from "next";
import Link from "next/link";
import { getAllAuditions } from "@/lib/auditionData";
import { isOpenAudition } from "@/lib/auditionFreshness";
import { getAuditionListingSummary } from "@/lib/auditionListingSummary";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "大手・注目アイドルオーディションを探す｜実績・年齢・費用で比較",
  description: "大手や実績のある運営のアイドルオーディションを探している方へ。プロデューサー・ライブ出演実績のある注目募集を、年齢条件・費用・選考の流れで比較。新規グループと既存グループの違いも解説します。",
  alternates: { canonical: "/idol-audition/major" },
};

const selections = [
  { slug: "audition-plus-2026110652", source: "202611/audition-2026110652", point: "MAZEはタイ公演、中国・台湾でのワンマンライブなど国内外で活動する既存グループ。月約20日の活動と、平日16時以降・土日休日のスケジュール確保が条件です。", kind: "既存グループの追加募集", scope: "募集グループ自身の活動実績" },
  { slug: "audition-plus-2026110980", source: "202703/audition-2026110980", point: "アイドルファッション誌「IDOL FILE」の出版やイベント事業を展開する運営。既存グループGREAT MONKEYSと新規グループなどのメンバーを募集しています。Zepp・アリーナ公演は今後の目標です。", kind: "既存グループ＋新規グループ", scope: "主催会社の出版・イベント事業" },
  { slug: "audition-plus-2026090148", source: "202612/audition-2026111102", point: "大阪・梅田の常設イベント会場「アイドルテラス」で定期公演・レッスンを実施。2027年1〜2月の新体制始動に向けてメンバーを募集しています。", kind: "既存グループの新体制募集", scope: "募集グループの定期公演・活動基盤" },
  { slug: "audition-plus-2026080824", source: "202612/audition-2026110867", point: "元NMB48の石塚朱莉がプロデュースする新規グループ。2027年4月のデビューを予定しています。NMB48のメンバー募集ではありません。", kind: "新規グループ", scope: "プロデューサーの経歴" },
  { slug: "audition-plus-2026032565", source: "202604/audition-2026032565", point: "Zepp・武道館を経験したプロデューサーが在籍。TIF出演・武道館・メジャーデビューは今後の目標であり、新グループの達成済み実績ではありません。", kind: "新規グループ", scope: "在籍プロデューサーの実績" },
  { slug: "audition-plus-2026110544", source: "202704/audition-2026110544", point: "J-BEANSは所属グループTA女子のオリコンデイリー1位・豊洲PITやZepp新宿での公演実績を掲載。新グループ自身の実績ではありません。平日週1回程度のレッスンと土日中心のライブ活動を予定しています。", kind: "新規グループ", scope: "所属する他グループの実績" },
  { slug: "audition-plus-2026101552", source: "202611/audition-2026101552", point: "TIFにデビュー年から6年連続出演し、Zepp Shinjuku・品川ステラボールで単独公演を開催。全国12都市の単独ツアー実績を掲載する既存グループです。", kind: "既存グループの追加募集", scope: "募集グループ自身の活動実績" },
  { slug: "audition-plus-2026110866", source: "202612/audition-2026110866", point: "つんく♂完全プロデュース。TNX株式会社の創立20年プロジェクトとして募集する新グループです。", kind: "新規グループ", scope: "プロデューサー・主催の実績" },
  { slug: "audition-plus-2026070391", source: "202609/audition-2026070391", point: "虹色幻想曲はTIF・@JAMへの出演やLIQUIDROOM・新宿BLAZEでのワンマン実績を掲載。既存グループと新姉妹グループでは年齢条件が異なります。", kind: "既存グループ＋新姉妹グループ", scope: "虹色幻想曲の活動実績" },
  { slug: "audition-plus-2026072047", source: "202608/audition-2026072047", point: "ZeppでのワンマンやSUMMER SONIC出演実績を掲載するグループ。月間20日程度の活動に参加できることが応募条件です。", kind: "既存グループの追加募集", scope: "募集グループ自身の活動実績" },
  { slug: "audition-plus-2026071844", source: "202608/audition-2026071844", point: "武道館公演を行ったグループやTIF出演グループを手がけるKABUKIMONO’DOGsの新規募集。これらは運営の他グループの実績で、新グループ自身の実績ではありません。", kind: "新規グループ", scope: "運営が手がけた他グループの実績" },
];

// Company size is not inferred from venues, famous collaborators or group history.
const evidence: Record<string, { organizer: string; track: string; group: "production" | "live" }> = {
  "audition-plus-2026110652": { organizer: "MAZE", track: "タイ公演、中国・台湾でのワンマンライブ", group: "live" },
  "audition-plus-2026110980": { organizer: "ロックスエンタテインメント合同会社", track: "IDOL FILEの出版・イベント事業、the mishmashのプロデュース", group: "production" },
  "audition-plus-2026090148": { organizer: "天空音パレード事務局", track: "大阪・梅田の常設会場「アイドルテラス」で定期公演", group: "live" },
  "audition-plus-2026080824": { organizer: "株式会社B.Ambi", track: "元NMB48・石塚朱莉プロデュース", group: "production" },
  "audition-plus-2026032565": { organizer: "株式会社Funnyepoch", track: "Zepp・武道館を経験したプロデューサーが在籍", group: "production" },
  "audition-plus-2026110544": { organizer: "J-beans", track: "所属TA女子：オリコンデイリー1位・豊洲PIT公演", group: "production" },
  "audition-plus-2026110866": { organizer: "TNX株式会社", track: "つんく♂完全プロデュース・TNX創立20年企画", group: "production" },
  "audition-plus-2026071844": { organizer: "KABUKIMONO’DOGs", track: "他の所属グループ：武道館公演・TIF出演", group: "production" },
  "audition-plus-2026101552": { organizer: "株式会社エイトワン", track: "透色ドロップ：TIFに6年連続出演", group: "live" },
  "audition-plus-2026070391": { organizer: "ASProduction&Co", track: "虹色幻想曲：TIF・@JAM出演、LIQUIDROOM公演", group: "live" },
  "audition-plus-2026072047": { organizer: "KABUKIMONO’DOGs", track: "Panic Monster !n Wonderland：Zepp公演・SUMMER SONIC出演", group: "live" },
};
const groups = [
  { id: "production", label: "プロデューサー・運営に実績のある注目募集" },
  { id: "live", label: "募集グループに出演・公演実績のある注目募集" },
] as const;

// Editorial excerpts checked against each linked listing; the full terms remain below.
const costSummaries: Record<string, string> = {
  "audition-plus-2026110652": "参加・レッスン費無料。面接交通費、関東圏の活動交通費、消耗品・食費は自己負担。制作費・遠征交通費と宿泊費は運営負担。",
  "audition-plus-2026110980": "参加料なし。審査交通費等は自己負担。合格後のレッスン・衣装・遠征・活動交通費は事務所負担。",
  "audition-plus-2026090148": "参加費なし。合格後の衣装代・楽曲代等の負担なし。",
  "audition-plus-2026080824": "参加・所属・レッスン・宣材撮影費なし。交通費は自己負担。",
  "audition-plus-2026032565": "参加・レッスン・衣装・登録費なし。",
  "audition-plus-2026110544": "所属・衣装・レッスン等は無料。売上が一定水準に達するまで交通費は原則自己負担。",
  "audition-plus-2026101552": "所属・レッスン費なし。審査会場までの交通費は自己負担。",
  "audition-plus-2026110866": "合格後費用なし。審査の交通費は自己負担、活動交通費は支給。",
  "audition-plus-2026070391": "参加・所属・レッスン等は無料。面接交通費は自己負担。活動交通費は原則支給（一部例外あり）。",
  "audition-plus-2026072047": "衣装・レッスン等は無料。面接・関東圏の活動交通費、消耗品・食費・上京生活費は自己負担。",
  "audition-plus-2026071844": "衣装・レッスン等は無料。面接・関東圏の活動交通費、消耗品・食費・上京生活費は自己負担。",
};

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
      <p className="mt-6 leading-8">主催者・実績・年齢・費用から、現在応募できる募集を比較できます。</p>
      <p className="mt-4 font-bold">現在募集中の比較対象：{entries.length}件</p>
    </header>
    <nav aria-label="比較ページの目次" className="my-8 flex flex-wrap gap-4 text-sm font-bold underline">
      <a href="#comparison">条件比較表</a><a href="#list">募集・実績を見る</a><a href="#choose">大手・注目募集の選び方</a><Link href="/idol-audition/how-to-apply">自己PRを準備</Link><Link href="/idol-audition/photos">応募写真を準備</Link>
    </nav>
    <section aria-labelledby="major-scope" className="mb-8 border-y border-[var(--line)] py-5">
      <h2 id="major-scope" className="text-lg font-bold">大手事務所の募集と、実績のある注目募集は別です</h2>
      <p className="mt-2 text-sm leading-7 text-[var(--muted-ink)]">今回の比較対象は、掲載元でプロデューサーや所属グループの実績が紹介されている「注目募集」です。大手事務所の直接募集と確認できた案件は含まれていません。</p>
      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold">{groups.map(group => <a key={group.id} href={`#${group.id}`} className="inline-flex min-h-11 items-center underline">{group.label}（{entries.filter(entry => evidence[entry.slug].group === group.id).length}件）</a>)}</div>
    </section>
    {entries.length > 0 ? <section id="comparison" className="mb-12 scroll-mt-24" aria-labelledby="comparison-heading">
      <h2 id="comparison-heading" className="text-2xl font-black">主催者・実績・応募条件を比較</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">スマートフォンでは表を横にスクロールできます。年齢は要項からの抜粋です。姉妹グループとの違い・契約などの条件は詳細で確認してください。</p>
      <div role="region" aria-label="注目募集の比較表（横スクロール）" tabIndex={0} className="mt-5 overflow-x-auto border-y border-slate-200">
        <table className="w-full min-w-[900px] text-left text-sm leading-7">
          <caption className="sr-only">現在募集中の注目アイドルオーディションの比較</caption>
          <thead className="bg-[#f8f2ef]"><tr>{["募集・募集形態", "主催者・実績の対象", "年齢条件", "活動地域・日程", "締切", "費用・自己負担"].map(label => <th key={label} scope="col" className="p-4">{label}</th>)}</tr></thead>
          {groups.map(group => <tbody key={group.id}>
            <tr id={group.id} className="scroll-mt-24 bg-[var(--paper-tint)]"><th colSpan={6} scope="rowgroup" className="p-4">{group.label}</th></tr>
            {entries.filter(entry => evidence[entry.slug].group === group.id).map(({ audition, kind, scope }) => {
            const summary = getAuditionListingSummary(audition);
            const ageLines = audition.age.split(/\n/).filter(line => /\d.*[歳才]|年齢制限なし/.test(line));
            const ageExcerpt = summary.age || (ageLines.length === 1 ? ageLines[0].replace(/^[・\s]+/, "") : "");
            return <tr key={audition.slug} className="border-t border-slate-200 align-top">
              <th scope="row" className="min-w-56 p-4"><a href={`#${audition.slug}`} className="underline">{audition.title}</a><p className="mt-2 font-normal text-slate-600">{kind}</p></th>
              <td className="min-w-64 p-4"><p className="font-bold">{evidence[audition.slug].organizer}</p><p className="mt-2">{evidence[audition.slug].track}</p><p className="mt-2 text-xs text-[var(--muted-ink)]">対象：{scope}</p></td>
              <td className="min-w-48 p-4">{ageExcerpt || <a href={`#${audition.slug}`} className="underline">募集別の年齢条件を見る</a>}</td>
              <td className="min-w-48 p-4">{audition.area}{summary.activity ? <p className="mt-2 text-slate-600">{summary.activity}</p> : null}</td><td className="whitespace-nowrap p-4">{audition.deadline}</td>
              <td className="min-w-60 p-4"><p>{costSummaries[audition.slug]}</p><details className="mt-3"><summary className="min-h-11 cursor-pointer font-bold underline">費用条件の全文</summary><p className="mt-3 whitespace-pre-line">{audition.cost}</p></details></td>
            </tr>;
          })}</tbody>)}
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
          <p className="mt-3 text-sm font-bold">主催：{evidence[audition.slug].organizer}</p>
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
