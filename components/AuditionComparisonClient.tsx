"use client";

import { useEffect, useId, useState, useSyncExternalStore } from "react";
import Link from "next/link";

type Row = {
  slug: string; title: string; area: string; age: string; cost: string;
  student: string; deadline: string; beginner: boolean; working: boolean;
  group: string; highSchool: boolean; noCost: boolean;
};

type Props = { rows: Row[]; title: string; initialBeginner: boolean; regional?: boolean; showGroup?: boolean };
const conditions = ["beginner", "high-school", "working", "free"];
function subscribeHash(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}
function getCondition() {
  if (!window.location.hash.startsWith("#regional-")) return "";
  const condition = window.location.hash.replace(/^#regional-/, "");
  return conditions.includes(condition) ? condition : "";
}
const serverCondition = () => "";

export function AuditionComparisonClient(props: Props) {
  const condition = useSyncExternalStore(subscribeHash, getCondition, serverCondition);
  const selected = props.regional ? condition : "";
  const [resetVersion, setResetVersion] = useState(0);
  useEffect(() => {
    if (!props.regional) return;
    // Re-selecting the same anchor should restore its filter after manual edits too.
    const onClick = (event: MouseEvent) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
      const anchor = event.target instanceof Element ? event.target.closest("a") : null;
      if (getCondition() && anchor?.getAttribute("href") === window.location.hash) {
        setResetVersion((value) => value + 1);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [props.regional]);
  return <ComparisonContent key={`${selected}:${resetVersion}`} {...props} condition={selected} />;
}

function ComparisonContent({ rows, title, initialBeginner, regional, showGroup, condition }: Props & { condition: string }) {
  const id = useId();
  const [query, setQuery] = useState("");
  const [beginner, setBeginner] = useState(initialBeginner || condition === "beginner");
  const [working, setWorking] = useState(condition === "working");
  const [highSchool, setHighSchool] = useState(condition === "high-school");
  const [noCost, setNoCost] = useState(condition === "free");
  const [expanded, setExpanded] = useState(false);
  const filtered = rows.filter((row) => (!beginner || row.beginner) && (!working || row.working)
    && (!highSchool || row.highSchool) && (!noCost || row.noCost)
    && `${row.title} ${showGroup ? row.group : ""} ${row.area} ${row.age}`.normalize("NFKC").toLowerCase().includes(query.trim().normalize("NFKC").toLowerCase()));
  return (
    <section className="my-8 border-y border-slate-200 py-7" aria-labelledby={`${id}-title`}>
      {regional ? conditions.map((value) => <span key={value} id={`regional-${value}`} className="block scroll-mt-24" />) : null}
      <h2 id={`${id}-title`} className="text-2xl font-black text-slate-950">{title}</h2>
      {showGroup ? <p className="mt-3 text-sm leading-7 text-slate-600">現在募集中の掲載グループ・プロジェクトを、名前・活動地域・応募年齢で探せます。名古屋のすべてのアイドルグループを網羅した一覧ではありません。</p> : null}
      <p className="mt-3 text-sm leading-7 text-slate-600">募集要項の活動地域・対象年齢・費用を並べて確認できます。費用欄では、参加費だけでなく交通費や合格後の負担も確認してください。</p>
      <div className="mt-5 flex flex-wrap items-end gap-x-6 gap-y-3">
        <label className="grid gap-2 text-sm font-bold" htmlFor={`${id}-query`}>
          {showGroup ? "グループ名・活動地域・年齢条件で探す" : "地域・年齢条件・募集名で探す"}
          <input id={`${id}-query`} value={query} onChange={(event) => { setQuery(event.target.value); setExpanded(false); }} placeholder={showGroup ? "例：グループ名、地域名、25歳" : "例：地域名、25歳、年齢制限なし"} className="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 sm:w-80" />
        </label>
        <label className="flex min-h-11 items-center gap-2 text-sm font-bold"><input type="checkbox" checked={beginner} onChange={(event) => setBeginner(event.target.checked)} className="h-5 w-5 accent-pink-600" />未経験OKの記載あり</label>
        <label className="flex min-h-11 items-center gap-2 text-sm font-bold"><input type="checkbox" checked={working} onChange={(event) => setWorking(event.target.checked)} className="h-5 w-5 accent-pink-600" />社会人・仕事との両立の記載あり</label>
        {regional ? <>
          <label className="flex min-h-11 items-center gap-2 text-sm font-bold"><input type="checkbox" checked={highSchool} onChange={(event) => setHighSchool(event.target.checked)} className="h-5 w-5 accent-pink-600" />高校生の応募・相談の記載あり</label>
          <label className="flex min-h-11 items-center gap-2 text-sm font-bold"><input type="checkbox" checked={noCost} onChange={(event) => setNoCost(event.target.checked)} className="h-5 w-5 accent-pink-600" />費用なし・無料の記載あり</label>
          <button type="button" onClick={() => { setQuery(""); setBeginner(false); setWorking(false); setHighSchool(false); setNoCost(false); setExpanded(false); window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search); window.dispatchEvent(new HashChangeEvent("hashchange")); }} className="min-h-11 text-sm underline">条件を解除</button>
        </> : null}
      </div>
      <p role="status" className="mt-4 text-sm font-bold">条件に一致する募集：{filtered.length}件{!expanded && filtered.length > 6 ? "（先頭6件を表示）" : ""}</p>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {(expanded ? filtered : filtered.slice(0, 6)).map((row) => (
          <article key={row.slug} className="rounded-2xl border border-slate-200 bg-white p-5">
            {showGroup ? <p className="mb-2 text-sm font-bold text-slate-600">募集グループ・主催：{row.group || "詳細で確認"}</p> : null}
            <h3 className="font-black leading-7"><Link href={`/idol-audition/${row.slug}`} className="hover:text-pink-700 hover:underline">{row.title} →</Link></h3>
            <dl className="mt-3 grid grid-cols-[4rem_1fr] gap-x-3 gap-y-2 text-sm leading-6">
              <dt className="text-slate-500">活動地域</dt><dd>{row.area || "詳細で確認"}</dd>
              <dt className="text-slate-500">対象年齢</dt><dd>{row.age || "詳細で確認"}</dd>
              <dt className="text-slate-500">費用</dt><dd className="whitespace-pre-line">{row.cost || "詳細で確認"}</dd>
              <dt className="text-slate-500">両立条件</dt><dd>{row.student || "主催者へ確認"}</dd>
              <dt className="text-slate-500">締切</dt><dd>{row.deadline || "詳細で確認"}</dd>
            </dl>
          </article>
        ))}
      </div>
      {filtered.length === 0 ? <p className="mt-4 leading-7">一致する募集はありません。検索語やチェック条件を減らしてお探しください。</p> : null}
      {filtered.length > 6 ? <button type="button" onClick={() => setExpanded(!expanded)} aria-expanded={expanded} className="mt-5 min-h-11 rounded-full border border-slate-300 px-5 py-3 text-sm font-bold hover:bg-pink-50">{expanded ? "先頭6件に戻す" : `一致する${filtered.length}件をすべて比較する`}</button> : null}
    </section>
  );
}
