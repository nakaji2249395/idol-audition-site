import Link from "next/link";

export function DirectoryLink() {
  return <aside className="my-7 border-y border-slate-200 py-5">
    <p className="text-sm leading-7 text-slate-600">ほかの地域や年齢条件でも比較したい方へ。全国の募集中情報を、地域・年齢・未経験・費用から絞り込めます。</p>
    <Link href="/idol-audition" className="mt-2 inline-flex min-h-11 items-center text-sm font-bold text-pink-700 hover:underline">全国のアイドルオーディション一覧で探す →</Link>
  </aside>;
}
