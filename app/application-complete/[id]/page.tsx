import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { markApplicationComplete } from "@/app/application-complete/[id]/actions";
import { verifyApplicationTrackingSignature } from "@/lib/applicationTracking";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "応募完了の確認｜アイドルオーディションナビ",
  robots: { index: false, follow: false }
};

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ signature?: string; completed?: string; error?: string }>;
};

export default async function ApplicationCompletePage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const query = await searchParams;
  const signature = query.signature ?? "";

  if (!signature || !verifyApplicationTrackingSignature(id, signature)) notFound();

  const { data: application } = await supabaseAdmin
    .from("audition_applications")
    .select("audition_title, completed_at")
    .eq("id", id)
    .single();

  if (!application) notFound();

  const isCompleted = Boolean(application.completed_at) || query.completed === "1";

  return (
    <main className="mx-auto max-w-2xl px-5 py-12 sm:py-20">
      <Link href="/idol-audition" className="text-sm font-bold text-slate-500 hover:text-pink-700">
        ← 募集一覧へ戻る
      </Link>

      <section className="paper-panel mt-7 p-6 sm:p-9">
        <p className="editorial-kicker">Application status</p>
        <h1 className="mt-3 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
          応募手続きの完了を記録
        </h1>
        <p className="mt-5 leading-8 text-slate-600">
          「{application.audition_title}」の応募先へ、写真や必要事項の送信まで完了した場合に記録してください。
        </p>

        {isCompleted ? (
          <div className="mt-7 border-l-4 border-emerald-700 bg-emerald-50 p-5">
            <p className="font-black text-emerald-800">応募完了として記録しました。</p>
            <p className="mt-2 text-sm leading-7 text-emerald-800">
              選考結果や今後の案内は、応募先の公式LINE・メール・SNSをご確認ください。
            </p>
          </div>
        ) : (
          <form action={markApplicationComplete} className="mt-7">
            <input type="hidden" name="application_id" value={id} />
            <input type="hidden" name="signature" value={signature} />
            <button
              type="submit"
              className="min-h-14 w-full rounded-full bg-pink-500 px-6 py-4 text-sm font-black text-white transition hover:bg-pink-700"
            >
              必要事項を送信し、応募を完了しました
            </button>
          </form>
        )}

        {query.error === "1" ? (
          <p className="mt-4 text-sm font-bold text-red-700">記録に失敗しました。時間をおいてもう一度お試しください。</p>
        ) : null}

        <p className="mt-5 text-xs leading-6 text-slate-500">
          この記録は応募状況の確認用です。選考結果を保証するものではありません。
        </p>
      </section>
    </main>
  );
}
