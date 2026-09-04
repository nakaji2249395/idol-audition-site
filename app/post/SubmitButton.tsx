"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <div className="grid gap-3">
      <button
        type="submit"
        disabled={pending}
        aria-disabled={pending}
        aria-busy={pending}
        data-pending-managed="true"
        className="flex min-h-14 items-center justify-center gap-3 rounded-full bg-pink-500 px-8 py-4 text-sm font-black text-white transition hover:bg-pink-700 disabled:cursor-wait disabled:bg-pink-300"
      >
        {pending ? (
          <>
            <span
              aria-hidden="true"
              className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white motion-reduce:animate-none"
            />
            送信中です…
          </>
        ) : (
          "掲載依頼を送信する"
        )}
      </button>
      {pending ? (
        <p
          role="status"
          aria-live="polite"
          className="text-center text-sm font-bold text-slate-600"
        >
          画像のアップロードを含むため、完了画面に切り替わるまでそのままお待ちください。
        </p>
      ) : null}
    </div>
  );
}
