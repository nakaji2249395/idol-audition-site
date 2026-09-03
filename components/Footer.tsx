import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";

export function Footer() {
  return (
    <footer className="mt-20 overflow-hidden rounded-t-[36px] bg-slate-950 text-white sm:rounded-t-[56px]">
      <div className="h-2 bg-pink-500" />
      <div className="mx-auto grid max-w-[1180px] gap-10 px-5 py-12 md:grid-cols-[1.4fr_1fr_1fr_0.8fr]">
        <div className="max-w-sm">
          <div className="rounded-xl bg-white p-3 text-slate-950">
            <BrandMark compact />
          </div>
          <p className="mt-5 text-sm leading-7 text-slate-200">
            アイドルになりたい方が、安心して募集情報を比較できるサイトを目指しています。
          </p>
        </div>

        <div>
          <p className="text-sm font-black text-white">探す</p>
          <div className="mt-4 grid gap-2.5 text-sm font-semibold text-slate-300">
            <Link href="/idol-audition" className="hover:text-pink-300">オーディション一覧</Link>
            <Link href="/idol-audition/tokyo" className="hover:text-pink-300">東京の募集</Link>
            <Link href="/idol-audition/osaka" className="hover:text-pink-300">大阪の募集</Link>
            <Link href="/idol-audition/nagoya" className="hover:text-pink-300">名古屋の募集</Link>
            <Link href="/idol-audition/mikeiken" className="hover:text-pink-300">未経験OK</Link>
            <Link href="/idol-audition/free" className="hover:text-pink-300">費用なし</Link>
            <Link href="/idol-audition/high-school" className="hover:text-pink-300">高校生OK</Link>
            <Link href="/idol-audition/age" className="hover:text-pink-300">年齢から探す</Link>
            <Link href="/idol-audition/20s" className="hover:text-pink-300">20代の募集</Link>
            <Link href="/idol-audition/30s" className="hover:text-pink-300">30代の募集</Link>
            <Link href="/idol-audition/age-limit-none" className="hover:text-pink-300">年齢制限なし</Link>
            <Link href="/idol-audition/working-adult" className="hover:text-pink-300">社会人OK</Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-black text-white">応募前ガイド</p>
          <div className="mt-4 grid gap-2.5 text-sm font-semibold text-slate-300">
            <Link href="/idol-audition/suspicious" className="hover:text-pink-300">怪しい募集の見分け方</Link>
            <Link href="/idol-audition/cost" className="hover:text-pink-300">費用の注意点</Link>
            <Link href="/idol-audition/parents" className="hover:text-pink-300">親への説明</Link>
            <Link href="/idol-audition/how-to-apply" className="hover:text-pink-300">応募文の書き方</Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-black text-white">運営者向け</p>
          <div className="mt-4 grid gap-2.5 text-sm font-semibold text-slate-300">
            <Link href="/post" className="hover:text-pink-300">無料で掲載する</Link>
            <Link href="/about" className="hover:text-pink-300">このサイトについて</Link>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1180px] border-t border-white/15 px-5 py-6 text-[11px] font-bold tracking-wide text-slate-400">
        © IDOL AUDITION NAVI
      </div>
    </footer>
  );
}
