import Link from "next/link";
import { notFound } from "next/navigation";
import {
  approveSubmission,
  archiveSubmission,
  deleteSubmission,
  rejectSubmission
} from "@/app/admin/actions";
import { requireAdmin } from "@/lib/adminAuth";
import { buildApplicationUrlCandidates } from "@/lib/applicationTracking";
import { fetchSubmission } from "@/lib/submissions";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

function Row({ label, value }: { label: string; value: string | number | boolean | null }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5">
      <dt className="text-sm font-black text-slate-500">{label}</dt>
      <dd className="mt-2 whitespace-pre-wrap break-words leading-8 text-slate-900">
        {typeof value === "boolean" ? (value ? "はい" : "いいえ") : value || "未入力"}
      </dd>
    </div>
  );
}

export default async function SubmissionDetailPage({ params }: PageProps) {
  await requireAdmin();

  const { id } = await params;
  const submission = await fetchSubmission(id);

  if (!submission) {
    notFound();
  }

  const applicationUrlCandidates = buildApplicationUrlCandidates({
    applicationMethod: submission.application_method,
    applicationExternalUrl: submission.application_external_url,
    lineUrl: submission.line_url,
    formUrl: submission.form_url,
    officialSiteUrl: submission.official_site_url,
    officialXUrl: submission.official_x_url
  });

  return (
    <main className="mx-auto max-w-5xl px-5 py-12">
      <Link href="/admin/submissions" className="text-sm font-bold text-slate-500 hover:text-pink-600">
        ← 掲載依頼一覧へ戻る
      </Link>

      <article className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-pink-600">{submission.status}</p>
            <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950">
              {submission.title}
            </h1>
            <p className="mt-3 text-lg font-bold text-slate-700">{submission.group_name}</p>
            <p className="mt-2 text-sm text-slate-500">slug: {submission.slug || "未設定"}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/admin/submissions/${submission.id}/edit`}
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-pink-600"
            >
              編集する
            </Link>

            {submission.status === "approved" && submission.slug ? (
              <Link
                href={`/idol-audition/${submission.slug}`}
                target="_blank"
                className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:text-pink-600"
              >
                公開ページを見る
              </Link>
            ) : null}
          </div>
        </div>

        {submission.image_url ? (
          <div className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100">
            <img
              src={submission.image_url}
              alt={`${submission.title}の画像`}
              className="h-auto w-full object-cover"
            />
          </div>
        ) : null}

        {submission.status !== "approved" ? (
          <section className="mt-8 rounded-[18px] border border-slate-300 bg-[var(--paper-tint)] p-5 sm:p-6">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-pink-600">
              Application destination
            </p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">
              応募先URLを選んで掲載する
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              選択したURLを応募者へ送り、クリック状況を記録します。すべての掲載承認で選択が必要です。
            </p>

            <form action={approveSubmission} className="mt-5 grid gap-4">
              <input type="hidden" name="id" value={submission.id} />

              <fieldset className="grid gap-3">
                <legend className="sr-only">応募先URL</legend>
                {applicationUrlCandidates.map((candidate) => (
                  <label
                    key={candidate.url}
                    className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-pink-300"
                  >
                    <input
                      type="radio"
                      name="application_external_url_choice"
                      value={candidate.url}
                      required
                      className="mt-1 h-5 w-5 accent-pink-600"
                    />
                    <span className="min-w-0">
                      <span className="block text-xs font-black text-slate-500">
                        {candidate.source}
                      </span>
                      <span className="mt-1 block break-all text-sm font-bold text-slate-900">
                        {candidate.url}
                      </span>
                    </span>
                  </label>
                ))}

                <label className="rounded-2xl border border-slate-200 bg-white p-4">
                  <span className="flex items-center gap-3 text-sm font-black text-slate-800">
                    <input
                      type="radio"
                      name="application_external_url_choice"
                      value="__custom__"
                      required
                      defaultChecked={applicationUrlCandidates.length === 0}
                      className="h-5 w-5 accent-pink-600"
                    />
                    その他の応募先URLを入力
                  </span>
                  <input
                    type="url"
                    name="custom_application_external_url"
                    placeholder="https://..."
                    className="mt-3 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
                  />
                </label>
              </fieldset>

              <button className="min-h-11 rounded-full bg-green-700 px-6 py-3 text-sm font-black text-white transition hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950">
                このURLを応募先にして掲載する
              </button>
            </form>
          </section>
        ) : (
          <section className="mt-8 rounded-[18px] border border-emerald-200 bg-emerald-50 p-5">
            <p className="text-sm font-black text-emerald-800">設定済みの応募先URL</p>
            <p className="mt-2 break-all text-sm text-emerald-900">
              {submission.application_external_url || "未設定"}
            </p>
          </section>
        )}

        <div className="mt-5 flex flex-wrap gap-3">

          <form action={archiveSubmission}>
            <input type="hidden" name="id" value={submission.id} />
            <button className="rounded-full bg-slate-600 px-6 py-3 text-sm font-black text-white hover:bg-slate-700">
              掲載停止
            </button>
          </form>

          <form action={rejectSubmission}>
            <input type="hidden" name="id" value={submission.id} />
            <button className="rounded-full bg-red-600 px-6 py-3 text-sm font-black text-white hover:bg-red-700">
              却下する
            </button>
          </form>

          <form action={deleteSubmission}>
            <input type="hidden" name="id" value={submission.id} />
            <button className="rounded-full border border-red-300 bg-white px-6 py-3 text-sm font-black text-red-600 hover:bg-red-50">
              完全削除
            </button>
          </form>
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">管理設定</h2>
          <dl className="mt-5 grid gap-4 md:grid-cols-2">
            <Row label="固定表示" value={submission.is_pinned} />
            <Row label="注目表示" value={submission.is_featured} />
            <Row label="表示順" value={submission.display_order} />
            <Row label="掲載停止日時" value={submission.archived_at} />
          </dl>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">掲載担当者情報</h2>
          <dl className="mt-5 grid gap-4 md:grid-cols-2">
            <Row label="担当者名" value={submission.organizer_name} />
            <div className="rounded-2xl bg-slate-50 p-5">
              <dt className="text-sm font-black text-slate-500">担当者メールアドレス</dt>
              <dd className="mt-2 break-words leading-8 text-slate-900">
                {submission.organizer_email ? (
                  <a
                    href={`mailto:${submission.organizer_email}`}
                    className="font-bold text-pink-600 hover:underline"
                  >
                    {submission.organizer_email}
                  </a>
                ) : (
                  "未入力"
                )}
              </dd>
            </div>
            <Row label="担当者電話番号" value={submission.organizer_phone} />
          </dl>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">掲載内容</h2>
          <dl className="mt-5 grid gap-4 md:grid-cols-2">
            <Row label="募集概要" value={submission.summary} />
            <Row label="募集詳細" value={submission.description} />
            <Row label="活動地域" value={submission.area} />
            <Row label="募集締切" value={submission.deadline} />
            <Row label="募集年齢・対象" value={submission.age} />
            <Row label="未経験OK" value={submission.is_beginner_ok} />
            <Row label="高校生・学生相談可" value={submission.is_high_school_ok} />
            <Row label="費用なし" value={submission.is_no_cost} />
            <Row label="費用" value={submission.cost} />
            <Row label="報酬" value={submission.reward} />
            <Row label="経験条件" value={submission.experience} />
            <Row label="学生・仕事との両立" value={submission.student} />
            <Row label="活動内容" value={submission.activity_content} />
            <Row label="選考フロー" value={submission.selection_flow} />
            <Row label="応募方法" value={submission.application_method} />
          </dl>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">URL</h2>
          <dl className="mt-5 grid gap-4 md:grid-cols-2">
            <Row label="LINE応募URL" value={submission.line_url} />
            <Row label="フォーム応募URL" value={submission.form_url} />
            <Row label="公式サイトURL" value={submission.official_site_url} />
            <Row label="公式X URL" value={submission.official_x_url} />
            <Row label="公式Instagram URL" value={submission.official_instagram_url} />
            <Row label="公式TikTok URL" value={submission.official_tiktok_url} />
          </dl>
        </section>
      </article>
    </main>
  );
}
