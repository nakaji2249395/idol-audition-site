"use client";

import { useState, type ReactNode } from "react";
import type { AgeLimitKind } from "@/lib/auditionAgeLimit";

export function AgeLimitAuditionList({ items }: {
  items: { slug: string; kind: AgeLimitKind; card: ReactNode }[];
}) {
  const [selected, setSelected] = useState<"all" | "none" | "limited">("all");
  const visible = items.filter(item => selected === "all" || item.kind === selected);
  return <>
    <div role="group" aria-label="年齢上限で絞り込む" className="mt-6 flex flex-wrap gap-2">
      {([['all', 'すべて'], ['none', '年齢上限なし'], ['limited', '年齢上限あり']] as const).map(([value, label]) =>
        <button key={value} type="button" aria-pressed={selected === value} onClick={() => setSelected(value)}
          className={`min-h-11 rounded-full border px-4 text-sm font-bold transition ${selected === value ? "border-slate-950 bg-slate-950 text-white" : "border-slate-300 bg-white hover:bg-pink-50"}`}>
          {selected === value ? "✓ " : ""}{label}<span className="ml-2 text-xs">{items.filter(item => value === "all" || item.kind === value).length}件</span>
        </button>
      )}
    </div>
    <p className="mt-3 text-sm text-slate-600" role="status" aria-live="polite">{visible.length}件の募集</p>
    {visible.length ? <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{visible.map(item => <div key={item.slug}>{item.card}</div>)}</div>
      : <p className="mt-6 border-t border-slate-200 py-6 text-slate-600">現在、この条件に一致する募集はありません。</p>}
  </>;
}
