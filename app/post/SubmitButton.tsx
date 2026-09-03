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
      <p
        role="status"
        aria-live="polite"
        className="min-h-6 text-center text-sm font-bold text-slate-600"
      >
        {pending
          ? "画像のアップロードを含むため、完了画面に切り替わるまでそのままお待ちください。"
          : "送信は1回だけ押してください。完了すると受付完了画面に切り替わります。"}
      </p>
    </div>
  );
}
