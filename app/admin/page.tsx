import { loginAdmin } from "@/app/admin/actions";

type AdminPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;
  const hasError = params?.error === "1";

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md items-center px-5 py-16">
      <section className="w-full rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-bold text-pink-600">Admin</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950">
          管理画面ログイン
        </h1>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          掲載依頼の確認・承認を行う管理画面です。
        </p>

        {hasError ? (
          <div className="mt-5 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-600">
            パスワードが違います。
          </div>
        ) : null}

        <form action={loginAdmin} className="mt-6 grid gap-4">
          <input
            name="password"
            type="password"
            required
            placeholder="管理パスワード"
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-pink-400"
          />
          <button
            type="submit"
            className="rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white hover:bg-pink-600"
          >
            ログイン
          </button>
        </form>
      </section>
    </main>
  );
}
