import Link from "next/link";
import { logoutAdmin, testApprovalEmail } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/adminAuth";
import { fetchAllSubmissions } from "@/lib/submissions";
import { formatJstDateTime } from "@/lib/dateTime";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ approvalEmail?: string }>;
};

const approvalEmailMessages: Record<string, { text: string; style: string }> = {
  sent: {
    text: "掲載を承認し、担当者へ掲載完了メールを送信しました。",
    style: "border-green-200 bg-green-50 text-green-800"
  },
  "not-configured": {
    text: "掲載は承認しました。メールサービスが未設定のため、掲載完了メールは送信していません。",
    style: "border-amber-200 bg-amber-50 text-amber-800"
  },
  "missing-email": {
    text: "掲載は承認しましたが、担当者メールアドレスがないためメールは送信していません。",
    style: "border-amber-200 bg-amber-50 text-amber-800"
  },
  failed: {
    text: "掲載は承認しましたが、掲載完了メールの送信に失敗しました。送信設定を確認してください。",
    style: "border-red-200 bg-red-50 text-red-800"
  },
  "already-approved": {
    text: "この募集はすでに掲載中です。重複メールは送信していません。",
    style: "border-slate-200 bg-slate-50 text-slate-700"
  },
  "test-sent": {
    text: "Customer.ioの接続テストメールを返信先アドレスへ送信しました。",
    style: "border-green-200 bg-green-50 text-green-800"
  },
  "test-not-configured": {
    text: "Customer.ioの環境変数が不足しているため、テストメールを送信できませんでした。",
    style: "border-amber-200 bg-amber-50 text-amber-800"
  },
  "test-missing-email": {
    text: "返信先メールアドレスが未設定のため、テストメールを送信できませんでした。",
    style: "border-amber-200 bg-amber-50 text-amber-800"
  },
  "test-failed": {
    text: "Customer.ioの接続テストに失敗しました。APIキー、送信元ドメイン、リージョンを確認してください。",
    style: "border-red-200 bg-red-50 text-red-800"
  }
};

function StatusBadge({ status }: { status: string }) {
  const style =
    status === "approved"
      ? "bg-green-50 text-green-700"
      : status === "rejected"
        ? "bg-red-50 text-red-700"
        : status === "archived"
          ? "bg-slate-100 text-slate-600"
          : "bg-amber-50 text-amber-700";

  const label =
    status === "approved"
      ? "掲載中"
      : status === "rejected"
        ? "非掲載"
        : status === "archived"
          ? "掲載停止"
          : "審査中";

  return <span className={`rounded-full px-3 py-1 text-xs font-black ${style}`}>{label}</span>;
}

export default async function AdminSubmissionsPage({ searchParams }: PageProps) {
  await requireAdmin();

  const { approvalEmail } = await searchParams;
  const approvalEmailMessage = approvalEmail
    ? approvalEmailMessages[approvalEmail]
    : undefined;
  const submissions = await fetchAllSubmissions();

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-pink-600">Admin</p>
          <h1 className="mt-2 text-4xl font-black text-slate-950">掲載依頼一覧</h1>
        </div>

        <div className="flex flex-wrap gap-3">
          <form action={testApprovalEmail}>
            <button className="rounded-full border border-pink-300 bg-pink-50 px-5 py-3 text-sm font-bold text-pink-700 hover:bg-pink-100">
              メール接続テスト
            </button>
          </form>

          <Link
            href="/admin/applications"
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-pink-600"
          >
            応募者一覧
          </Link>

          <form action={logoutAdmin}>
            <button className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:text-pink-600">
              ログアウト
            </button>
          </form>
        </div>
      </div>

      {approvalEmailMessage ? (
        <p
          role="status"
          className={`mt-6 rounded-2xl border px-5 py-4 text-sm font-bold ${approvalEmailMessage.style}`}
        >
          {approvalEmailMessage.text}
        </p>
      ) : null}

      <section className="mt-8 grid gap-4">
        {submissions.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-600">
            まだ掲載依頼はありません。
          </div>
        ) : (
          submissions.map((submission) => (
            <div
              key={submission.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <StatusBadge status={submission.status} />
                    {submission.is_pinned ? (
                      <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-black text-pink-700">
                        固定
                      </span>
                    ) : null}
                    <p className="text-sm font-bold text-slate-500">
                      {formatJstDateTime(submission.created_at)}（日本時間）
                    </p>
                  </div>

                  <h2 className="mt-3 text-2xl font-black text-slate-950">{submission.title}</h2>
                  <p className="mt-2 text-sm font-bold text-pink-600">{submission.group_name}</p>
                  <p className="mt-2 text-sm text-slate-600">
                    担当：{submission.organizer_name || "未入力"} /{" "}
                    {submission.organizer_email ? (
                      <a
                        href={`mailto:${submission.organizer_email}`}
                        className="font-bold text-slate-900 hover:text-pink-600 hover:underline"
                      >
                        {submission.organizer_email}
                      </a>
                    ) : (
                      "メール未入力"
                    )}
                  </p>
                  <p className="mt-3 max-w-3xl leading-8 text-slate-600">{submission.summary}</p>
                </div>

                {submission.image_url ? (
                  <img
                    src={submission.image_url}
                    alt=""
                    className="h-28 w-44 rounded-2xl object-cover"
                  />
                ) : null}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`/admin/submissions/${submission.id}`}
                  className="rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-pink-600"
                >
                  詳細を見る
                </Link>
                <Link
                  href={`/admin/submissions/${submission.id}/edit`}
                  className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:text-pink-600"
                >
                  編集する
                </Link>
                {submission.status === "approved" && submission.slug ? (
                  <Link
                    href={`/idol-audition/${submission.slug}`}
                    target="_blank"
                    className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:text-pink-600"
                  >
                    公開ページ
                  </Link>
                ) : null}
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
