"use client";

import { useId, useState, type ReactNode } from "react";
import Link from "next/link";
import { auditionStyles, type AuditionStyle } from "@/lib/auditionStyles";

export type DirectoryItem = {
  slug: string;
  search: string;
  regions: string[];
  ages: string[];
  beginner: boolean;
  free: boolean;
  published: number;
  deadline: number | null;
  card: ReactNode;
  title: string;
  area: string;
  age: string;
  experience: string;
  activity: string;
  deadlineLabel: string;
  recruitmentTypes?: string[];
  styles: AuditionStyle[];
};

const regions = [["tokyo", "東京・関東"], ["kanagawa", "神奈川・横浜"], ["osaka", "大阪・関西"], ["nagoya", "名古屋・東海"], ["fukuoka", "福岡・九州"], ["sapporo", "札幌"], ["nationwide", "全国・オンライン"], ["other", "その他の地域"]];
const ages = [["high-school", "高校生の記載あり"], ["20s", "20代の条件に該当"], ["30s", "30代の条件に該当"], ["none", "年齢制限なしの記載あり"]];
const normalize = (value: string) => value.normalize("NFKC").trim().toLowerCase();

export function AuditionDirectory({ items }: { items: DirectoryItem[] }) {
  const id = useId();
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("");
  const [age, setAge] = useState("");
  const [recruitmentType, setRecruitmentType] = useState("");
  const [style, setStyle] = useState<AuditionStyle | "">("");
  const [beginner, setBeginner] = useState(false);
  const [free, setFree] = useState(false);
  const [sort, setSort] = useState("new");
  const [view, setView] = useState<"list" | "cards">("list");
  const matchingConditions = items.filter(item => (!region || item.regions.includes(region))
    && (!recruitmentType || item.recruitmentTypes?.includes(recruitmentType))
    && (!age || item.ages.includes(age)) && (!beginner || item.beginner) && (!free || item.free)
    && normalize(item.search).includes(normalize(query)));
  const filtered = matchingConditions.filter(item => !style || item.styles.includes(style))
    .sort((a, b) => sort === "deadline"
      ? (a.deadline ?? Infinity) - (b.deadline ?? Infinity) || b.published - a.published
      : b.published - a.published);
  function reset() {
    setQuery(""); setRegion(""); setAge(""); setRecruitmentType(""); setStyle(""); setBeginner(false); setFree(false); setSort("new");
  }
  const control = "min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm";
  return <section id="audition-directory" className="scroll-mt-24" aria-labelledby={`${id}-heading`}>
    <h2 id={`${id}-heading`} className="text-2xl font-black">募集中のアイドルオーディションを探す</h2>
    <fieldset aria-label="募集の分類で絞り込む" className="mt-5 border-y border-slate-200 py-4">
      <div className="flex flex-wrap gap-2">
        <button type="button" aria-pressed={!style} onClick={() => setStyle("")} className={`min-h-11 rounded-full border px-4 text-sm font-bold transition ${!style ? "border-slate-950 bg-slate-950 text-white" : "border-slate-300 bg-white"}`}>{!style ? "✓ " : ""}すべて <span className="ml-1 text-xs">{matchingConditions.length}</span></button>
        {auditionStyles.map(option => {
          const count = matchingConditions.filter(item => item.styles.includes(option.id)).length;
          const selected = style === option.id;
          return <button key={option.id} type="button" aria-pressed={selected} onClick={() => setStyle(selected ? "" : option.id)} className={`min-h-11 rounded-full border px-4 text-sm font-bold transition ${selected ? "border-slate-950 bg-slate-950 text-white" : "border-slate-300 bg-white hover:bg-pink-50"}`}>
            {selected ? "✓ " : ""}{option.label}<span className="ml-2 text-xs">{count}</span>
          </button>;
        })}
      </div>
    </fieldset>
    <div role="group" aria-label="募集形態で絞り込む" className="mt-4 flex flex-wrap gap-2">
      {[["", "すべての募集"], ["new-group", "新規・初期メンバーの記載あり"], ["additional", "追加・新メンバーの記載あり"]].map(([value, label]) => <button key={value} type="button" aria-pressed={recruitmentType === value} onClick={() => setRecruitmentType(value)} className={`min-h-11 rounded-lg border px-3 text-sm font-bold ${recruitmentType === value ? "border-slate-950 bg-slate-950 text-white" : "border-slate-300 bg-white"}`}>{label}</button>)}
    </div>
    <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="grid gap-2 text-sm font-bold">募集名・地域のキーワード
          <input className={control} type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="例：グループ名、北海道" />
        </label>
        <label className="grid gap-2 text-sm font-bold">活動地域
          <select className={control} value={region} onChange={e => setRegion(e.target.value)}><option value="">すべての地域</option>{regions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
        </label>
        <label className="grid gap-2 text-sm font-bold">年齢・学生条件
          <select className={control} value={age} onChange={e => setAge(e.target.value)}><option value="">すべての年齢条件</option>{ages.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
        </label>
        <label className="grid gap-2 text-sm font-bold">並び順
          <select className={control} value={sort} onChange={e => setSort(e.target.value)}><option value="new">新着順</option><option value="deadline">締切が近い順</option></select>
        </label>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-1">
        <label className="flex min-h-11 items-center gap-2 text-sm font-bold"><input type="checkbox" checked={beginner} onChange={e => setBeginner(e.target.checked)} className="h-5 w-5 accent-pink-600" />未経験歓迎の記載あり</label>
        <label className="flex min-h-11 items-center gap-2 text-sm font-bold"><input type="checkbox" checked={free} onChange={e => setFree(e.target.checked)} className="h-5 w-5 accent-pink-600" />費用なし・無料の記載あり</label>
        <button type="button" onClick={reset} className="min-h-11 px-2 text-sm font-bold underline hover:text-pink-700">条件を解除</button>
      </div>
      <p className="mt-2 text-xs leading-6 text-slate-600">募集形態はタイトルに明記されたものを表示します。判別できない募集は「すべての募集」に含まれます。年齢の上限・例外、無料になる費用の範囲、交通費などの自己負担は各募集の詳細でご確認ください。</p>
    </div>
    <div className="my-5 flex flex-wrap items-center justify-between gap-3">
      <p role="status" aria-live="polite" aria-atomic="true" className="text-sm font-bold">{style ? `${auditionStyles.find(option => option.id === style)?.label} · ` : ""}{items.length}件中 {filtered.length}件を表示 · {sort === "new" ? "新着順" : "締切が近い順"}</p>
      <div role="group" aria-label="募集の表示方法" className="flex gap-2">
        {([["list", "条件を一覧で見る"], ["cards", "写真付きで見る"]] as const).map(([value, label]) => <button key={value} type="button" aria-pressed={view === value} onClick={() => setView(value)} className={`min-h-11 rounded-lg border px-3 text-sm font-bold ${view === value ? "border-slate-950 bg-slate-950 text-white" : "border-slate-300 bg-white text-slate-700"}`}>{label}</button>)}
      </div>
    </div>
    {filtered.length ? view === "cards" ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filtered.map(item => <div key={item.slug}>{item.card}</div>)}</div>
      : <ul className="divide-y divide-slate-200 border-y border-slate-200">
        {filtered.map(item => <li key={item.slug}>
          <Link href={`/idol-audition/${item.slug}`} className="group grid min-h-11 gap-3 py-5 transition hover:bg-pink-50 sm:grid-cols-[minmax(0,1fr)_10rem] sm:gap-6">
            <div className="min-w-0">
              <h3 className="font-bold leading-7 text-slate-950 group-hover:text-pink-700">{item.title}</h3>
              {item.styles.length ? <p className="mt-1 text-xs leading-6 text-slate-500">{auditionStyles.filter(option => item.styles.includes(option.id)).map(option => option.label).join(" / ")}</p> : null}
              {[item.area, item.age, item.experience].some(Boolean) ? <p className="mt-2 text-sm leading-7 text-slate-600">
                {[item.area, item.age, item.experience].filter(Boolean).join(" ｜ ")}
              </p> : null}
              {item.activity ? <p className="mt-1 text-sm leading-7 text-slate-600">{item.activity}</p> : null}
            </div>
            <div className="flex items-center justify-between gap-3 text-sm sm:block">
              {item.deadlineLabel && !/^(詳細で確認|要確認|不明|未設定|記載なし)$/.test(item.deadlineLabel) ? <p className="leading-6"><span className="mr-2 font-bold">締切</span>{item.deadlineLabel}</p> : null}
              <span className="inline-flex min-h-11 items-center font-bold underline">募集条件を見る →</span>
            </div>
          </Link>
        </li>)}
      </ul>
      : <div className="border-y border-slate-200 py-8"><p>条件に一致する募集はありません。地域や年齢条件を広げてお探しください。</p><button type="button" className="mt-3 min-h-11 font-bold underline" onClick={reset}>すべての募集に戻す</button></div>}
  </section>;
}
