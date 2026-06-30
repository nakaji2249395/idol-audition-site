import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-20 text-center">
      <p className="text-sm font-bold text-pink-600">404</p>
      <h1 className="mt-3 text-4xl font-black text-slate-950">
        ページが見つかりません
      </h1>
      <p className="mt-4 leading-8 text-slate-600">
        お探しのオーディション情報は削除されたか、URLが変更された可能性があります。
      </p>
      <Link
        href="/idol-audition"
        className="mt-8 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white hover:bg-pink-600"
      >
        オーディション一覧へ
      </Link>
    </main>
  );
}
