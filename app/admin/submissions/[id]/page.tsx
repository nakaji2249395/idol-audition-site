import Link from "next/link";
import { notFound } from "next/navigation";
import { approveSubmission, rejectSubmission } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/adminAuth";
import { fetchSubmission } from "@/lib/submissions";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

function Row({ label, value }: { label: string; value: string | boolean | null }) {
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

  return (
    <main className="mx-auto max-w-5xl px-5 py-12">
      <Link href="/admin/submissions" className="text-sm font-bold text-slate-500 hover:text-pink-600">
        ← 掲載依頼一覧へ戻る
      </Link>

      <article className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-pink-600">
              {submission.status === "approved"
                ? "掲載中"
                : submission.status === "rejected"
                  ? "非掲載"
                  : "審査中"}
            </p>
            <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950">
              {submission.title}
            </h1>
            <p className="mt-3 text-lg font-bold text-slate-700">
              {submission.group_name}
            </p>
          </div>

          {submission.status === "approved" ? (
            <Link
              href={`/idol-audition/submission-${submission.id}`}
              target="_blank"
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-pink-600"
            >
              公開ページを見る
            </Link>
          ) : null}
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

        <div className="mt-8 flex flex-wrap gap-3">
          <form action={approveSubmission}>
            <input type="hidden" name="id" value={submission.id} />
            <button className="rounded-full bg-green-600 px-6 py-3 text-sm font-black text-white hover:bg-green-700">
              掲載する
            </button>
          </form>

          <form action={rejectSubmission}>
            <input type="hidden" name="id" value={submission.id} />
            <button className="rounded-full bg-red-600 px-6 py-3 text-sm font-black text-white hover:bg-red-700">
              却下する
            </button>
          </form>
        </div>

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

        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">担当者情報</h2>
          <dl className="mt-5 grid gap-4 md:grid-cols-2">
            <Row label="担当者名" value={submission.organizer_name} />
            <Row label="担当者メール" value={submission.organizer_email} />
            <Row label="担当者電話番号" value={submission.organizer_phone} />
          </dl>
        </section>
      </article>
    </main>
  );
}
