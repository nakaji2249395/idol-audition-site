import Link from "next/link";
import { notFound } from "next/navigation";
import { sendLineMessageToApplicant } from "@/app/admin/applications/actions";
import { requireAdmin } from "@/lib/adminAuth";
import {
  fetchApplicationById,
  fetchApplicationsByLineUserId,
  fetchLineMessages
} from "@/lib/applicationData";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<{
    sent?: string;
    error?: string;
  }>;
};

export default async function AdminApplicationDetailPage({
  params,
  searchParams
}: PageProps) {
  await requireAdmin();

  const { id } = await params;
  const query = await searchParams;
  const application = await fetchApplicationById(id);

  if (!application) {
    notFound();
  }

  const userApplications = await fetchApplicationsByLineUserId(application.line_user_id);
  const messages = await fetchLineMessages(application.line_user_id);

  return (
    <main className="mx-auto max-w-5xl px-5 py-12">
      <Link href="/admin/applications" className="text-sm font-bold text-slate-500 hover:text-pink-600">
        ← 応募者一覧へ戻る
      </Link>

      <section className="mt-8 rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-bold text-pink-600">Applicant</p>

        <div className="mt-4 flex flex-wrap items-start gap-4">
          {application.line_user?.picture_url ? (
            <img
              src={application.line_user.picture_url}
              alt=""
              className="h-20 w-20 rounded-full object-cover"
            />
          ) : (
            <div className="h-20 w-20 rounded-full bg-slate-100" />
          )}

          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-black text-slate-950">
              {application.line_user?.display_name || "名前未取得"}
            </h1>
            <p className="mt-2 break-all text-xs text-slate-500">
              LINE userId: {application.line_user_id}
            </p>
            <p className="mt-3 text-sm font-bold text-pink-600">
              最新応募: {application.audition_title || application.audition_slug}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              応募日時: {new Date(application.created_at).toLocaleString("ja-JP")}
            </p>
          </div>
        </div>

        {query?.sent === "1" ? (
          <div className="mt-6 rounded-2xl bg-green-50 p-4 text-sm font-bold text-green-700">
            LINEメッセージを送信しました。
          </div>
        ) : null}

        {query?.error === "send" ? (
          <div className="mt-6 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-600">
            LINEメッセージ送信に失敗しました。相手が公式LINEをブロックしている、または友だち追加が完了していない可能性があります。
          </div>
        ) : null}
      </section>

      <section className="mt-6 rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-black text-slate-950">
          個別LINEメッセージ送信
        </h2>

        <form action={sendLineMessageToApplicant} className="mt-5 grid gap-4">
          <input type="hidden" name="application_id" value={application.id} />
          <input type="hidden" name="line_user_id" value={application.line_user_id} />

          <textarea
            name="body"
            required
            rows={6}
            placeholder="送信するメッセージを入力してください。"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-7 outline-none focus:border-pink-400"
          />

          <button
            type="submit"
            className="rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white hover:bg-pink-600"
          >
            この応募者にLINE送信
          </button>
        </form>
      </section>

      <section className="mt-6 rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-black text-slate-950">
          応募履歴
        </h2>

        <div className="mt-5 grid gap-3">
          {userApplications.map((item) => (
            <div key={item.id} className="rounded-2xl bg-slate-50 p-4">
              <p className="font-black text-slate-950">
                {item.audition_title || item.audition_slug}
              </p>
              <p className="mt-2 text-xs text-slate-500">
                {new Date(item.created_at).toLocaleString("ja-JP")}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-black text-slate-950">
          送信履歴
        </h2>

        <div className="mt-5 grid gap-3">
          {messages.length === 0 ? (
            <p className="text-sm text-slate-500">まだ送信履歴はありません。</p>
          ) : (
            messages.map((message) => (
              <div key={message.id} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-black text-slate-500">
                    {new Date(message.created_at).toLocaleString("ja-JP")}
                  </p>
                  <span
                    className={
                      message.status === "sent"
                        ? "rounded-full bg-green-50 px-3 py-1 text-xs font-black text-green-700"
                        : "rounded-full bg-red-50 px-3 py-1 text-xs font-black text-red-600"
                    }
                  >
                    {message.status === "sent" ? "送信済み" : "失敗"}
                  </span>
                </div>

                <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700">
                  {message.body}
                </p>

                {message.error_message ? (
                  <p className="mt-3 break-all text-xs text-red-600">
                    {message.error_message}
                  </p>
                ) : null}
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
