import Link from "next/link";
import { notFound } from "next/navigation";
import { updateSubmission } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/adminAuth";
import { fetchSubmission } from "@/lib/submissions";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required = true
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black text-slate-800">
        {label}
        {required ? <span className="ml-1 text-pink-600">*</span> : null}
      </span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        required={required}
        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-pink-400"
      />
    </label>
  );
}

function Textarea({
  label,
  name,
  defaultValue,
  required = true
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black text-slate-800">
        {label}
        {required ? <span className="ml-1 text-pink-600">*</span> : null}
      </span>
      <textarea
        name={name}
        defaultValue={defaultValue ?? ""}
        required={required}
        rows={5}
        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-7 outline-none focus:border-pink-400"
      />
    </label>
  );
}

function Checkbox({
  name,
  label,
  defaultChecked
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-700">
      <input name={name} type="checkbox" defaultChecked={defaultChecked} className="h-5 w-5" />
      {label}
    </label>
  );
}

export default async function EditSubmissionPage({ params }: PageProps) {
  await requireAdmin();

  const { id } = await params;
  const submission = await fetchSubmission(id);

  if (!submission) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-5 py-12">
      <Link href={`/admin/submissions/${submission.id}`} className="text-sm font-bold text-slate-500 hover:text-pink-600">
        ← 詳細へ戻る
      </Link>

      <header className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-bold text-pink-600">Edit</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950">掲載内容を編集</h1>
        <p className="mt-4 leading-8 text-slate-600">
          HIRAETH.Tokyoを含め、掲載内容・画像・URL・固定表示をここから修正できます。
        </p>
      </header>

      <form action={updateSubmission} encType="multipart/form-data" className="mt-8 grid gap-8">
        <input type="hidden" name="id" value={submission.id} />

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-black text-slate-950">管理設定</h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Field label="slug" name="slug" defaultValue={submission.slug || `submission-${submission.id}`} />
            <Field label="表示順" name="display_order" type="number" defaultValue={submission.display_order} />
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <Checkbox name="is_pinned" label="一覧の上部に固定する" defaultChecked={submission.is_pinned} />
            <Checkbox name="is_featured" label="注目表示にする" defaultChecked={submission.is_featured} />
          </div>

          <label className="mt-6 grid gap-2">
            <span className="text-sm font-black text-slate-800">掲載ステータス</span>
            <select
              name="status"
              defaultValue={submission.status}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-pink-400"
            >
              <option value="pending">審査中</option>
              <option value="approved">掲載中</option>
              <option value="rejected">非掲載</option>
              <option value="archived">掲載停止</option>
            </select>
          </label>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-black text-slate-950">掲載画像</h2>

          {submission.image_url ? (
            <div className="mt-6 overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100">
              <img src={submission.image_url} alt="" className="h-auto w-full object-cover" />
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">現在、画像は登録されていません。</p>
          )}

          <label className="mt-6 grid gap-2">
            <span className="text-sm font-black text-slate-800">画像を差し替える</span>
            <input
              name="image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none file:mr-4 file:rounded-full file:border-0 file:bg-slate-950 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-pink-600"
            />
          </label>

          <Checkbox name="remove_image" label="現在の画像を削除する" />
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-black text-slate-950">基本情報</h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Field label="グループ名・プロジェクト名" name="group_name" defaultValue={submission.group_name} />
            <Field label="募集タイトル" name="title" defaultValue={submission.title} />
            <Field label="活動地域" name="area" defaultValue={submission.area} />
            <Field label="募集締切" name="deadline" defaultValue={submission.deadline} />
            <Field label="募集年齢・対象" name="age" defaultValue={submission.age} />
          </div>

          <div className="mt-5 grid gap-5">
            <Textarea label="募集概要" name="summary" defaultValue={submission.summary} />
            <Textarea label="募集詳細" name="description" defaultValue={submission.description} />
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-black text-slate-950">募集条件</h2>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <Checkbox name="is_beginner_ok" label="未経験OK" defaultChecked={submission.is_beginner_ok} />
            <Checkbox name="is_high_school_ok" label="高校生・学生相談可" defaultChecked={submission.is_high_school_ok} />
            <Checkbox name="is_no_cost" label="費用なし・費用負担少なめ" defaultChecked={submission.is_no_cost} />
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Textarea label="費用" name="cost" defaultValue={submission.cost} />
            <Textarea label="報酬" name="reward" defaultValue={submission.reward} />
            <Textarea label="経験条件" name="experience" defaultValue={submission.experience} />
            <Textarea label="学生・仕事との両立" name="student" defaultValue={submission.student} />
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-black text-slate-950">活動内容・選考</h2>
          <div className="mt-6 grid gap-5">
            <Textarea label="活動内容" name="activity_content" defaultValue={submission.activity_content} />
            <Textarea label="選考フロー" name="selection_flow" defaultValue={submission.selection_flow} />
            <Textarea label="応募方法" name="application_method" defaultValue={submission.application_method} />
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-black text-slate-950">応募URL・公式SNS</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Field label="LINE応募URL" name="line_url" defaultValue={submission.line_url} required={false} />
            <Field label="フォーム応募URL" name="form_url" defaultValue={submission.form_url} required={false} />
            <Field label="公式サイトURL" name="official_site_url" defaultValue={submission.official_site_url} required={false} />
            <Field label="公式X URL" name="official_x_url" defaultValue={submission.official_x_url} required={false} />
            <Field label="公式Instagram URL" name="official_instagram_url" defaultValue={submission.official_instagram_url} required={false} />
            <Field label="公式TikTok URL" name="official_tiktok_url" defaultValue={submission.official_tiktok_url} required={false} />
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-black text-slate-950">担当者情報</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Field label="担当者名" name="organizer_name" defaultValue={submission.organizer_name} />
            <Field label="担当者メール" name="organizer_email" type="email" defaultValue={submission.organizer_email} />
            <Field label="担当者電話番号" name="organizer_phone" defaultValue={submission.organizer_phone} required={false} />
          </div>
        </section>

        <button
          type="submit"
          className="rounded-full bg-slate-950 px-8 py-4 text-sm font-black text-white transition hover:bg-pink-600"
        >
          更新する
        </button>
      </form>
    </main>
  );
}
