"use client";

import { useId, useState } from "react";
import Link from "next/link";

type Row = {
  slug: string; title: string; area: string; age: string; cost: string;
  student: string; deadline: string; beginner: boolean; working: boolean;
};

export function AuditionComparisonClient({ rows, title, initialBeginner }: { rows: Row[]; title: string; initialBeginner: boolean }) {
  const id = useId();
  const [query, setQuery] = useState("");
  const [beginner, setBeginner] = useState(initialBeginner);
  const [working, setWorking] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const filtered = rows.filter((row) => (!beginner || row.beginner) && (!working || row.working)
    && `${row.title} ${row.area} ${row.age}`.normalize("NFKC").toLowerCase().includes(query.trim().normalize("NFKC").toLowerCase()));
  return (
    <section className="my-8 border-y border-slate-200 py-7" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="text-2xl font-black text-slate-950">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">募集要項の活動地域・対象年齢・費用を並べて確認できます。費用欄では、参加費だけでなく交通費や合格後の負担も確認してください。</p>
      <div className="mt-5 flex flex-wrap items-end gap-x-6 gap-y-3">
        <label className="grid gap-2 text-sm font-bold" htmlFor={`${id}-query`}>
          地域・年齢条件・募集名で探す
          <input id={`${id}-query`} value={query} onChange={(event) => { setQuery(event.target.value); setExpanded(false); }} placeholder="例：大阪、25歳、年齢制限なし" className="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 sm:w-80" />
        </label>
        <label className="flex min-h-11 items-center gap-2 text-sm font-bold"><input type="checkbox" checked={beginner} onChange={(event) => setBeginner(event.target.checked)} className="h-5 w-5 accent-pink-600" />未経験OKの記載あり</label>
        <label className="flex min-h-11 items-center gap-2 text-sm font-bold"><input type="checkbox" checked={working} onChange={(event) => setWorking(event.target.checked)} className="h-5 w-5 accent-pink-600" />社会人・仕事との両立の記載あり</label>
      </div>
      <p role="status" className="mt-4 text-sm font-bold">条件に一致する募集：{filtered.length}件{!expanded && filtered.length > 6 ? "（先頭6件を表示）" : ""}</p>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {(expanded ? filtered : filtered.slice(0, 6)).map((row) => (
          <article key={row.slug} className="rounded-2xl border border-slate-200 bg-white p-5">
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
