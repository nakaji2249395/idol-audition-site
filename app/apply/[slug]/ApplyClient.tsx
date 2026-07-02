"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import liff from "@line/liff";

type ApplyClientProps = {
  auditionSlug: string;
  auditionTitle: string;
  auditionGroup: string;
  auditionSummary: string;
  auditionImageUrl?: string;
  officialLineUrl?: string;
};

type ApplyState =
  | "initializing"
  | "logging_in"
  | "requesting_friendship"
  | "saving"
  | "done"
  | "error";

export function ApplyClient({
  auditionSlug,
  auditionTitle,
  auditionGroup,
  auditionSummary,
  auditionImageUrl,
  officialLineUrl
}: ApplyClientProps) {
  const [state, setState] = useState<ApplyState>("initializing");
  const [message, setMessage] = useState("LINE応募の準備をしています。");
  const [externalUrl, setExternalUrl] = useState<string | null>(null);
  const [pushMessageError, setPushMessageError] = useState<string | null>(null);

  const liffId = process.env.NEXT_PUBLIC_LINE_LIFF_ID;

  const canStart = useMemo(() => Boolean(liffId), [liffId]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        if (!liffId) {
          throw new Error("NEXT_PUBLIC_LINE_LIFF_ID is not set");
        }

        setState("initializing");
        setMessage("LINE連携を初期化しています。");

        await liff.init({ liffId });

        if (cancelled) return;

        if (!liff.isLoggedIn()) {
          setState("logging_in");
          setMessage("LINEログインへ移動します。");
          liff.login({
            redirectUri: window.location.href
          });
          return;
        }

        try {
          setState("requesting_friendship");
          setMessage("公式LINEの友だち追加を確認しています。");

          const requestFriendship = (liff as unknown as {
            requestFriendship?: () => Promise<unknown>;
          }).requestFriendship;

          if (typeof requestFriendship === "function") {
            await requestFriendship();
          }
        } catch (friendshipError) {
          console.warn(friendshipError);
        }

        const idToken = liff.getIDToken();

        if (!idToken) {
          throw new Error("LINE IDトークンを取得できませんでした");
        }

        setState("saving");
        setMessage("応募情報を保存し、応募案内をLINEに送信しています。");

        const response = await fetch("/api/line/apply", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            idToken,
            auditionSlug,
            sourceUrl: window.location.href
          })
        });

        const result = await response.json();

        if (!response.ok || !result.ok) {
          throw new Error(result.message || "応募処理に失敗しました");
        }

        if (cancelled) return;

        setExternalUrl(result.audition?.applicationExternalUrl ?? null);
        setPushMessageError(result.pushMessageError ?? null);
        setState("done");
        setMessage("応募案内を受け付けました。公式LINEをご確認ください。");
      } catch (error) {
        console.error(error);

        if (cancelled) return;

        setState("error");
        setMessage(
          error instanceof Error
            ? error.message
            : "応募処理に失敗しました。時間をおいて再度お試しください。"
        );
      }
    }

    if (canStart) {
      run();
    }

    return () => {
      cancelled = true;
    };
  }, [auditionSlug, canStart, liffId]);

  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <Link href={`/idol-audition/${auditionSlug}`} className="text-sm font-bold text-slate-500 hover:text-pink-600">
        ← オーディション詳細へ戻る
      </Link>

      <section className="mt-6 overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-sm">
        {auditionImageUrl ? (
          <img
            src={auditionImageUrl}
            alt={`${auditionTitle}の画像`}
            className="h-auto w-full"
          />
        ) : null}

        <div className="p-5 sm:p-7">
          <p className="text-xs font-black text-pink-600">LINE応募</p>
          <h1 className="mt-2 text-2xl font-black leading-tight text-slate-950 sm:text-3xl">
            {auditionTitle}
          </h1>
          <p className="mt-2 text-sm font-bold text-pink-600">{auditionGroup}</p>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            {auditionSummary}
          </p>

          <div className="mt-6 rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-black text-slate-950">{message}</p>

            <p className="mt-3 text-xs leading-6 text-slate-500">
              応募にはアイドルオーディションナビ公式LINEの追加が必要です。
              追加後、選択したオーディションの応募案内をLINEでお送りします。
            </p>
          </div>

          {state !== "done" && state !== "error" ? (
            <div className="mt-6 rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-black text-white">
              処理中...
            </div>
          ) : null}

          {state === "done" ? (
            <div className="mt-6 grid gap-3">
              {pushMessageError ? (
                <div className="rounded-2xl bg-amber-50 p-4 text-sm font-bold leading-7 text-amber-700">
                  {pushMessageError}
                </div>
              ) : (
                <div className="rounded-2xl bg-green-50 p-4 text-sm font-bold leading-7 text-green-700">
                  公式LINEに応募案内を送信しました。
                </div>
              )}

              {officialLineUrl ? (
                <a
                  href={officialLineUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-green-600 px-5 py-3 text-center text-sm font-black text-white"
                >
                  オーディションナビ公式LINEを追加する
                </a>
              ) : null}

              {externalUrl ? (
                <a
                  href={externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-black text-white"
                >
                  応募案内を開く
                </a>
              ) : null}

              <Link
                href="/idol-audition"
                className="rounded-full border border-slate-300 bg-white px-5 py-3 text-center text-sm font-bold text-slate-700"
              >
                他のオーディションも見る
              </Link>
            </div>
          ) : null}

          {state === "error" ? (
            <div className="mt-6 grid gap-3">
              <div className="rounded-2xl bg-red-50 p-4 text-sm font-bold leading-7 text-red-600">
                {message}
              </div>

              {officialLineUrl ? (
                <a
                  href={officialLineUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-green-600 px-5 py-3 text-center text-sm font-black text-white"
                >
                  公式LINEを追加して問い合わせる
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
