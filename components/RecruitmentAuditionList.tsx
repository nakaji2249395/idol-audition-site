"use client";
import { useState, type ReactNode } from "react";
import { recruitmentOptions, type RecruitmentKind } from "@/lib/auditionRecruitment";

export function RecruitmentAuditionList({ items }: { items: { slug: string; types: RecruitmentKind[]; card: ReactNode }[] }) {
  const [selected, setSelected] = useState<RecruitmentKind | "">("");
  const visible = items.filter(item => !selected || item.types.includes(selected));
  return <section className="mt-8" aria-label="募集形態別のオーディション一覧">
    <div className="flex flex-wrap gap-2" role="group" aria-label="募集形態で絞り込む">
      {[{id: "", label: "すべて"}, ...recruitmentOptions].map(option => <button key={option.id} type="button" aria-pressed={selected === option.id}
        onClick={() => setSelected(option.id as RecruitmentKind | "")}
        className={`min-h-11 rounded-full border px-4 text-sm font-bold transition ${selected === option.id ? "border-slate-950 bg-slate-950 text-white" : "border-slate-300 bg-white hover:bg-pink-50"}`}>
        {selected === option.id ? "✓ " : ""}{option.label} <span className="ml-1 text-xs">{items.filter(item => !option.id || item.types.includes(option.id as RecruitmentKind)).length}件</span>
      </button>)}
    </div>
    <p role="status" aria-live="polite" className="mt-4 text-sm text-slate-600">{visible.length}件の募集</p>
    <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{visible.map(item => <div key={item.slug}>
      <p className="mb-2 text-xs font-bold text-slate-600">{recruitmentOptions.filter(option => item.types.includes(option.id)).map(option => option.label).join(" / ")}</p>
      {item.card}
    </div>)}</div>
    {!visible.length ? <p className="py-8 text-slate-600">現在、この条件に一致する募集はありません。</p> : null}
  </section>;
}
