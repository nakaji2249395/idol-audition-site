import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white/70">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-3">
        <div>
          <p className="text-lg font-black text-slate-950">アイドルオーディションナビ</p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            アイドルになりたい方が、安心して募集情報を比較できるサイトを目指しています。
          </p>
        </div>

        <div>
          <p className="font-bold text-slate-950">探す</p>
          <div className="mt-3 grid gap-2 text-sm font-semibold text-slate-600">
            <Link href="/idol-audition" className="hover:text-pink-600">アイドルオーディション一覧</Link>
            <Link href="/idol-audition/tokyo" className="hover:text-pink-600">東京のオーディション</Link>
            <Link href="/idol-audition/mikeiken" className="hover:text-pink-600">未経験OK</Link>
          </div>
        </div>

        <div>
          <p className="font-bold text-slate-950">応募前ガイド</p>
          <div className="mt-3 grid gap-2 text-sm font-semibold text-slate-600">
            <Link href="/idol-audition/suspicious" className="hover:text-pink-600">怪しい募集の見分け方</Link>
            <Link href="/idol-audition/cost" className="hover:text-pink-600">費用の注意点</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
