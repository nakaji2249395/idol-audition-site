import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "アイドルオーディション写真の撮り方｜全身・バストアップ・服装と加工",
  description: "アイドルオーディションの応募写真をスマホで準備する方法。全身・バストアップの構図、服装、背景、加工、提出前チェックを解説。実際の募集要項を例に、必要枚数が異なる点も紹介します。",
  alternates: { canonical: "/idol-audition/photos" },
};

export default function PhotosPage() {
  return <main className="mx-auto max-w-4xl px-5 py-12">
    <Link href="/idol-audition" className="text-sm font-bold underline">← アイドルオーディション一覧</Link>
    <article className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-10">
      <p className="font-bold text-pink-600">応募前の写真準備</p>
      <h1 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">アイドルオーディション写真の撮り方</h1>
      <p className="mt-6 leading-8">大切なのは、写真だけを特別に「盛る」ことではなく、今の自分の顔立ち・表情・全身の雰囲気が伝わること。最初に募集要項の枚数・構図・撮影時期・加工の指定を確認しましょう。以下は編集部の一般的な準備ガイドで、全募集共通の審査基準ではありません。</p>
      <nav aria-label="写真ガイドの目次" className="my-7 flex flex-wrap gap-4 text-sm font-bold underline"><a href="#requirements">必要な写真</a><a href="#shoot">撮り方</a><a href="#clothes">服装・加工</a><a href="#check">送信前チェック</a></nav>
      <section id="requirements" className="mt-10 scroll-mt-24">
        <h2 className="text-2xl font-black">写真は何枚？募集ごとの指定を優先</h2>
        <p className="mt-4 leading-8">全身とバストアップを求める募集もありますが、必ず2枚とは限りません。虹色幻想曲・新姉妹グループの募集では、応募時の提出事項に「本人のバストアップ写真1枚」と記載されています。指定のない写真や個人情報を大量に送る必要はありません。</p>
        <p className="mt-3 text-sm leading-7">出典：<a href="https://audition.nerim.info/audition-202609/audition-2026070391.html" className="underline">オーディションプラス「虹色幻想曲」＆新姉妹グループ募集</a>。提出前には応募先の最新の案内を確認してください。</p>
      </section>
      <section id="shoot" className="mt-10 scroll-mt-24">
        <h2 className="text-2xl font-black">バストアップと全身の撮り方</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {[{ title: "バストアップ", frame: "頭の上〜胸元", points: ["頭が切れないように余白をとる", "カメラを顔の高さに置く", "目や顔の輪郭が髪で隠れないようにする", "自然な表情で正面から撮る"] }, { title: "全身", frame: "頭の上〜つま先", points: ["足先まで画面に入れる", "カメラを傾けず、離れて撮る", "身体のラインが極端に隠れない服装にする", "無理なポーズより自然な立ち姿にする"] }].map(item => <div key={item.title} className="rounded-2xl border border-slate-200 p-5"><p className="text-sm font-bold text-pink-600">写す範囲：{item.frame}</p><h3 className="mt-2 text-xl font-bold">{item.title}</h3><ul className="mt-4 list-disc space-y-2 pl-5 leading-7">{item.points.map(point => <li key={point}>{point}</li>)}</ul></div>)}
        </div>
        <h3 className="mt-6 text-lg font-bold">スマホで撮るなら</h3><p className="mt-3 leading-8">レンズを拭き、窓からの自然光などで顔に影が強く出ない位置を探します。無地に近い壁を背景に、家族や友人に撮影を頼むか、スマホを固定してタイマーを使うと構図を整えやすくなります。超広角や極端な上・下からの撮影は避け、写真を拡大してピントを確認しましょう。</p>
      </section>
      <section id="clothes" className="mt-10 scroll-mt-24">
        <h2 className="text-2xl font-black">服装・メイク・加工はどうする？</h2>
        <dl className="mt-4 divide-y divide-slate-200">{[
          ["服装", "募集側に指定がなければ、清潔感があり顔や身体が隠れすぎない服で十分です。高価な衣装や露出の多い服を用意する必要はありません。"],
          ["メイク", "指定がない場合は、普段の顔立ちが伝わる程度を目安に。すっぴん必須と決めつけず、応募先の条件に従いましょう。"],
          ["加工", "顔や体型を変える加工、強い美肌フィルター、スタンプで顔を隠す加工は避けます。加工禁止の指定があれば、撮影アプリの自動補正設定も確認してください。"],
          ["撮影スタジオ", "プロ撮影の指定がないなら、まず手元のスマホで準備できます。スタジオ利用やレッスン受講が、応募や合格の必須条件になるわけではありません。"],
        ].map(([label, text]) => <div key={label} className="py-4"><dt className="font-bold">{label}</dt><dd className="mt-2 leading-8">{text}</dd></div>)}</dl>
      </section>
      <section id="check" className="mt-10 scroll-mt-24">
        <h2 className="text-2xl font-black">送る前のチェック</h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 leading-8">{["必要枚数・全身／バストアップの指定に合っている", "募集が指定する撮影時期の範囲内で、現在の姿と大きく違わない", "ピントが合い、暗すぎず、顔と身体が見える", "写真のサイズ・ファイル形式が応募フォームの指定に合っている", "学校名、住所、家族の写真などが背景に写り込んでいない", "公式の応募窓口であることを確認してから送信する"].map(text => <li key={text}>{text}</li>)}</ul>
      </section>
      <section className="mt-10 border-t border-slate-200 pt-7"><h2 className="text-xl font-black">写真と一緒に自己PRを整える</h2><p className="mt-3 leading-8">写真で伝わるのは見た目や雰囲気。続けてきたことや応募理由は、自分の言葉で補いましょう。</p><div className="mt-5 flex flex-wrap gap-5 font-bold underline"><Link href="/idol-audition/how-to-apply">自己PR・志望動機の例文を見る</Link><Link href="/idol-audition/major">注目募集の条件を比較</Link><Link href="/idol-audition/mikeiken">未経験歓迎の募集を探す</Link></div></section>
    </article>
  </main>;
}
