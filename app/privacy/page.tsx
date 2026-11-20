import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "広告・アクセス解析とプライバシー",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <main className="mx-auto max-w-3xl px-5 py-12 text-sm leading-8">
    <h1 className="section-heading text-3xl">広告・アクセス解析とプライバシー</h1>
    <section className="mt-10">
      <h2 className="text-xl font-bold">Google AdSenseについて</h2>
      <p className="mt-4">当サイトでは第三者配信の広告サービス「Google AdSense」を利用します。Googleなどの第三者配信事業者は、Cookie等を使用して、当サイトや他のサイトへの過去のアクセス情報に基づく広告を配信する場合があります。広告配信に伴い、IPアドレス、ブラウザ・端末情報、閲覧情報等がGoogle等に送信される場合があります。</p>
      <p className="mt-4">Googleの広告Cookieにより、Googleやそのパートナーは、当サイトや他のサイトへのアクセスに基づく広告を表示できます。パーソナライズ広告は<a className="underline" href="https://myadcenter.google.com/">Googleのマイアドセンター</a>で設定できます。詳しくは<a className="underline" href="https://policies.google.com/technologies/partner-sites?hl=ja">Googleによるパートナーサイトの情報利用</a>と<a className="underline" href="https://policies.google.com/privacy?hl=ja">Googleのプライバシーポリシー</a>をご覧ください。</p>
    </section>
    <section className="mt-10">
      <h2 className="text-xl font-bold">アフィリエイト広告・アクセス解析</h2>
      <p className="mt-4">A8.net等のアフィリエイト広告を掲載しています。広告リンク経由の申し込み等により運営者に報酬が発生する場合があります。広告先での情報の取り扱いは各サービスのプライバシーポリシーをご確認ください。</p>
      <p className="mt-4">Vercel Analyticsを利用して、閲覧状況、応募導線の利用、アフィリエイト広告の表示・クリックを集計し、サイト改善に利用しています。応募先へのリンククリックは応募完了を意味しません。</p>
    </section>
    <p className="mt-10"><Link className="underline" href="/about">このサイトについて</Link></p>
  </main>;
}
