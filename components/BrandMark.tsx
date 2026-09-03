export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3">
      <span
        aria-hidden="true"
        className="relative grid h-9 w-9 shrink-0 rotate-[-6deg] place-items-center rounded-[11px] border border-slate-950 bg-pink-500 text-base font-black text-white shadow-[2px_2px_0_#241b24]"
      >
        ✦
      </span>
      <span className="leading-none">
        <span className="block text-sm font-black tracking-[-0.04em] text-slate-950 sm:text-base">
          アイドルオーディションナビ
        </span>
        {!compact ? (
          <span className="mt-1 hidden text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500 sm:block">
            Idol Audition Navi
          </span>
        ) : null}
      </span>
    </span>
  );
}
