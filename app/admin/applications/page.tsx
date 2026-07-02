import Link from "next/link";
import { requireAdmin } from "@/lib/adminAuth";
import { fetchApplicationRows } from "@/lib/applicationData";

export const dynamic = "force-dynamic";

export default async function AdminApplicationsPage() {
  await requireAdmin();

  const applications = await fetchApplicationRows();

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <Link href="/admin/submissions" className="text-sm font-bold text-slate-500 hover:text-pink-600">
        ← 掲載依頼一覧へ戻る
      </Link>

      <header className="mt-6">
        <p className="text-sm font-bold text-pink-600">Applications</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950">
          LINE応募者一覧
        </h1>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          オーディションナビ公式LINEを通過した応募者を確認できます。
        </p>
      </header>

      <section className="mt-8 grid gap-4">
        {applications.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-600">
            まだLINE応募者はいません。
          </div>
        ) : (
          applications.map((application) => (
            <div
              key={application.id}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-start gap-4">
                {application.line_user?.picture_url ? (
                  <img
                    src={application.line_user.picture_url}
                    alt=""
                    className="h-14 w-14 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-14 w-14 rounded-full bg-slate-100" />
                )}

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-black text-pink-600">
                    {application.audition_title || application.audition_slug}
                  </p>
                  <h2 className="mt-1 text-xl font-black text-slate-950">
                    {application.line_user?.display_name || "名前未取得"}
                  </h2>
                  <p className="mt-2 break-all text-xs text-slate-500">
                    LINE userId: {application.line_user_id}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    応募日時: {new Date(application.created_at).toLocaleString("ja-JP")}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
