"use client";

import { useId, useState, type ReactNode } from "react";

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
};

const regions = [["tokyo", "東京・関東"], ["kanagawa", "神奈川・横浜"], ["osaka", "大阪・関西"], ["nagoya", "名古屋・東海"], ["fukuoka", "福岡・九州"], ["nationwide", "全国・オンライン"], ["other", "その他の地域"]];
const ages = [["high-school", "高校生の記載あり"], ["20s", "20代の条件に該当"], ["30s", "30代の条件に該当"], ["none", "年齢制限なしの記載あり"]];
const normalize = (value: string) => value.normalize("NFKC").trim().toLowerCase();

export function AuditionDirectory({ items }: { items: DirectoryItem[] }) {
  const id = useId();
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("");
  const [age, setAge] = useState("");
  const [beginner, setBeginner] = useState(false);
  const [free, setFree] = useState(false);
  const [sort, setSort] = useState("new");
  const filtered = items.filter(item => (!region || item.regions.includes(region))
    && (!age || item.ages.includes(age)) && (!beginner || item.beginner) && (!free || item.free)
    && normalize(item.search).includes(normalize(query)))
    .sort((a, b) => sort === "deadline"
      ? (a.deadline ?? Infinity) - (b.deadline ?? Infinity) || b.published - a.published
      : b.published - a.published);
  function reset() {
    setQuery(""); setRegion(""); setAge(""); setBeginner(false); setFree(false); setSort("new");
  }
  const control = "min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm";
  return <section id="audition-directory" className="scroll-mt-24" aria-labelledby={`${id}-heading`}>
    <h2 id={`${id}-heading`} className="text-2xl font-black">募集中のアイドルオーディションを探す</h2>
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
      <p className="mt-2 text-xs leading-6 text-slate-600">募集要項の記載をもとに絞り込みます。年齢の上限・例外、無料になる費用の範囲、交通費などの自己負担は各募集の詳細でご確認ください。</p>
    </div>
    <p role="status" aria-live="polite" aria-atomic="true" className="my-5 text-sm font-bold">{items.length}件中 {filtered.length}件を表示 · {sort === "new" ? "新着順" : "締切が近い順"}</p>
    {filtered.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filtered.map(item => <div key={item.slug}>{item.card}</div>)}</div>
      : <div className="border-y border-slate-200 py-8"><p>条件に一致する募集はありません。地域や年齢条件を広げてお探しください。</p><button type="button" className="mt-3 min-h-11 font-bold underline" onClick={reset}>すべての募集に戻す</button></div>}
  </section>;
}
