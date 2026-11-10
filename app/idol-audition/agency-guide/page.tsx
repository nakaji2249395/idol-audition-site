import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

const canonical = "/idol-audition/agency-guide";

export const metadata: Metadata = {
  title: "アイドルになりたい人へ｜未経験からの始め方・事務所選び・応募準備",
  description:
    "アイドルになりたいけれど何から始める？未経験からの募集探し、年齢・学業・仕事との両立、自己PRと写真の準備、選考からデビューまでを解説。実際の募集例と事務所選びの確認事項も紹介。",
  alternates: { canonical },
  openGraph: {
    title: "アイドルになりたい人へ｜未経験からの始め方・事務所選び・応募準備",
    description:
      "アイドル事務所を選ぶときに確認したい費用、契約、活動条件、運営実績を分かりやすく整理します。",
    url: `${siteConfig.url}${canonical}`,
    type: "article"
  }
};

const comparisonPoints = [
  ["運営者と活動実績", "会社名や代表者、公式サイト・公式SNS、所属グループ、ライブ実績を確認します。法人か個人かだけで良し悪しを決めず、誰がどのように運営しているかを見ます。"],
  ["活動地域とスケジュール", "レッスン場所、ライブの多い曜日、終演時間、遠征の頻度を確認します。学校や仕事と両立できても、継続して通えなければ活動は難しくなります。"],
  ["応募後・合格後の費用", "応募料だけでなく、所属費、レッスン費、衣装代、撮影費、交通費、チケットノルマの有無まで確認します。無料と書かれている範囲も確かめましょう。"],
  ["報酬と精算方法", "ライブ、物販、撮影会、配信など、何が報酬の対象になるかを確認します。分配率だけでなく、締め日、支払日、経費の扱いも大切です。"],
  ["契約期間と退所条件", "専属契約の期間、更新方法、退所の申し出期限、活動名やSNS・写真・楽曲の扱いを、契約前に書面で確認します。分からない箇所はその場で質問します。"],
  ["育成とサポート体制", "歌・ダンスのレッスン、SNS運用、体調不良時の連絡、トラブル相談の担当者がいるかを確認します。未経験者は特に、合格後の流れが具体的な募集を比較しましょう。"]
] as const;

const questions = [
  "合格後に本人が負担する費用は、月額・初期費用を含めて何がありますか？",
  "レッスンとライブは、主に何曜日・何時・どの地域で行われますか？",
  "報酬が発生する活動と、支払いの時期を教えてください。",
  "契約期間、更新、途中退所について書面で確認できますか？",
  "学校や仕事、別の活動との両立は可能ですか？",
  "未成年の場合、保護者への説明や面談はありますか？"
];

const faq = [
  { question: "アイドルになりたいけれど、何から始めればよいですか？", answer: "まず活動できる地域・曜日、応募できる年齢条件、負担できる費用を整理します。その条件に合う募集を比べ、指定された自己PR・写真などを準備して応募窓口へ提出しましょう。" },
  { question: "歌やダンスのスクールに通ってから応募するべきですか？", answer: "スクール受講がすべての募集で必要なわけではありません。未経験歓迎や合格後のレッスンを明記した募集もあります。応募先の選考方法と提出課題を確認し、受講を理由に締切を逃さないように準備します。" },
  { question: "合格すればすぐデビューできますか？", answer: "合格とデビューは別の段階です。契約や顔合わせ、レッスン、楽曲・衣装などの準備を経る募集があり、期間は運営や本人の準備状況によって異なります。具体的なスケジュールは募集ごとに確認してください。" },
  { question: "アイドルになりたい場合、まず事務所を探すべきですか？", answer: "事務所名だけで探す方法に加え、現在メンバーを募集しているグループから探す方法があります。活動地域や方向性が合う募集を見つけ、その運営会社や所属条件を確認すると比較しやすくなります。" },
  { question: "未経験でもアイドル事務所に所属できますか？", answer: "未経験可と明記された募集であれば応募できます。現在の技術だけでなく、継続して活動できるか、学ぶ姿勢、連絡や時間を守れるかなども見られます。" },
  { question: "大手アイドル事務所を選べば安心ですか？", answer: "知名度だけで自分に合うとは限りません。活動内容、費用、契約、育成体制、求めるアイドル像を比較し、不明点を応募前または契約前に確認することが大切です。" },
  { question: "所属するのにお金はかかりますか？", answer: "事務所や募集によって異なります。所属費がなくても、交通費などが自己負担の場合があります。応募料、所属費、レッスン費、衣装代、撮影費、交通費を分けて確認してください。" },
  { question: "複数のオーディションに応募してもいいですか？", answer: "応募先の規約で禁止されていなければ可能な場合があります。ただし、選考中や合格後の専属条件、回答期限を確認し、契約を重ねないよう注意してください。" }
];

const relatedLinks = [
  ["/idol-audition/major", "大手・注目募集を比較", "主催・グループの実績と応募条件を分けて確認する"],
  ["/idol-audition", "女性アイドルオーディション一覧", "現在募集中の案件を比較する"],
  ["/idol-audition/mikeiken", "未経験OKの募集", "経験不問の募集から探す"],
  ["/idol-audition/free", "費用なしの募集", "費用条件が明記された募集を確認する"],
  ["/idol-audition/suspicious", "怪しい募集の見分け方", "安全面のチェックポイントを読む"],
  ["/idol-audition/how-to-apply", "応募文・自己PRの書き方", "応募前の準備を進める"],
  ["/idol-audition/parents", "保護者への説明", "未成年・高校生の確認事項を整理する"]
] as const;

export default function AgencyGuidePage() {
  const jsonLd = JSON.stringify([
    { "@context": "https://schema.org", "@type": "Article", headline: "アイドルになりたい人へ：未経験からの始め方と事務所の選び方", description: metadata.description, mainEntityOfPage: `${siteConfig.url}${canonical}`, author: { "@type": "Organization", name: "アイドルオーディションナビ" }, publisher: { "@type": "Organization", name: "アイドルオーディションナビ" } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "トップ", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "女性アイドルオーディション一覧", item: `${siteConfig.url}/idol-audition` },
      { "@type": "ListItem", position: 3, name: "アイドル事務所の選び方", item: `${siteConfig.url}${canonical}` }
    ] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }
  ]).replace(/</g, "\\u003c");

  return (
    <main className="mx-auto max-w-[980px] px-4 py-10 sm:px-6 sm:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <nav className="text-sm font-bold text-slate-500" aria-label="パンくずリスト">
        <Link href="/" className="hover:text-pink-600">トップ</Link><span className="mx-2">/</span>
        <Link href="/idol-audition" className="hover:text-pink-600">募集一覧</Link><span className="mx-2">/</span>
        <span aria-current="page">事務所の選び方</span>
      </nav>

      <article className="mt-8">
        <header className="border-b border-slate-200 pb-10 sm:pb-12">
          <p className="editorial-kicker">Agency guide</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black leading-[1.08] tracking-[-0.05em] text-slate-950 sm:text-6xl">
            アイドルになりたい人へ<br className="hidden sm:block" />未経験からの始め方と事務所の選び方
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            最初の一歩は、自分が活動できる条件を整理し、今応募できる募集を見つけること。経験や知名度だけで判断せず、応募準備・選考・デビューまでに必要なことを順番に確認しましょう。
          </p>
          <nav aria-label="始め方ガイドの目次" className="mt-5 flex flex-wrap gap-4 text-sm font-bold underline"><a href="#first-steps">最初にすること</a><a href="#debut-flow">デビューまでの流れ</a><a href="#agency-checks">事務所選び</a><Link href="/idol-audition">募集中の一覧</Link></nav>
        </header>

        <section id="first-steps" className="mt-12 scroll-mt-24">
          <h2 className="section-heading">アイドルになりたいと思ったら、最初にする4つのこと</h2>
          <p className="mt-4 leading-8 text-slate-600">以下は編集部による準備の手順です。全募集共通の審査基準ではなく、提出物や参加条件は応募先の要項を優先します。</p>
          <ol className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
            <li className="py-5"><h3 className="text-lg font-bold">1. 通える場所と参加できる曜日を書き出す</h3><p className="mt-2 leading-8 text-slate-600">学校や仕事が終わる時間、平日のレッスン、土日のライブ、終演後の帰宅手段まで考えます。「学生歓迎」でも、すべての日程を学業優先で調整できるとは限りません。未成年の方は、保護者と活動条件を一緒に確認しましょう。</p><p className="mt-2 text-sm font-bold"><Link href="/idol-audition/high-school" className="underline">高校生の募集</Link> ／ <Link href="/idol-audition/working-adult" className="underline">社会人の募集</Link> ／ <Link href="/idol-audition/age" className="underline">年齢別の募集</Link></p></li>
            <li className="py-5"><h3 className="text-lg font-bold">2. 条件に合う募集を2〜3件比べる</h3><p className="mt-2 leading-8 text-slate-600">新規グループの初期メンバー、既存グループへの加入、事務所所属募集では、合格後の活動が異なります。音楽性やライブ映像に加え、費用と選考内容を比較します。年齢条件に合う募集がなければ、年齢を偽らず条件の合う機会を探しましょう。</p><Link href="/idol-audition/major" className="mt-2 inline-block font-bold underline">実績・応募条件で注目募集を比較 →</Link></li>
            <li className="py-5"><h3 className="text-lg font-bold">3. 写真と自己PRを、指定どおりに用意する</h3><p className="mt-2 leading-8 text-slate-600">芸能経験がなくても、実際に続けてきたことや応募した理由を伝えられます。写真の構図・枚数・加工の可否、自己PRの文字数を確認し、過去の実績を作り足さないことが大切です。</p><p className="mt-2 font-bold"><Link href="/idol-audition/how-to-apply" className="underline">自己PRの例文</Link> ／ <Link href="/idol-audition/photos" className="underline">応募写真の撮り方</Link></p></li>
            <li className="py-5"><h3 className="text-lg font-bold">4. 応募先へ必要事項を送る</h3><p className="mt-2 leading-8 text-slate-600">当サイトのLINE友だち追加だけでは応募完了になりません。届いた案内から募集先へ進み、指定の写真やプロフィールを提出します。合否連絡の方法・期日も控えておきましょう。</p></li>
          </ol>
        </section>

        <section id="debut-flow" className="mt-12 scroll-mt-24">
          <h2 className="section-heading">応募からデビューまでは、何をする？</h2>
          <ol className="mt-6 grid gap-5 sm:grid-cols-2">{[
            ["応募・書類選考", "募集先の指定するプロフィール・写真・自己PRを送信。追加フォームや動画課題の案内がある場合は、それにも対応します。"],
            ["面談・実技などの選考", "活動条件や応募理由を確認し、必要に応じて歌・ダンス等の審査を受けます。選考回数や実技の有無は募集によって異なります。"],
            ["合格・条件説明・契約", "費用、報酬、活動時間、契約内容を確認してから所属を決めます。合格した段階で、すべての条件が自動的に確定するわけではありません。"],
            ["レッスン・制作・デビュー準備", "顔合わせ、練習、衣装・楽曲・写真の準備などを進めます。デビュー日が決まっている募集も、準備状況に合わせる募集もあります。"],
          ].map(([title, text], index) => <li key={title} className="border-t border-slate-200 pt-4"><p className="text-sm font-bold text-pink-600">STEP {index + 1}</p><h3 className="mt-2 text-lg font-bold">{title}</h3><p className="mt-2 leading-8 text-slate-600">{text}</p></li>)}</ol>
          <div className="mt-7 border-l-2 border-pink-500 pl-5">
            <h3 className="font-bold">実際の募集例：J-BEANSの新規グループ</h3>
            <p className="mt-3 leading-8 text-slate-600">募集要項では、合格後に顔合わせ・活動方針の説明を行い、平日週1回程度の歌唱・ダンスレッスンやリハーサルを経て、準備が整い次第ライブデビューと案内されています。所属費やレッスン費などは不要ですが、交通費はグループの売上が一定水準に達するまで原則自己負担です。</p>
            <p className="mt-3 text-sm leading-7">出典：<a href="https://audition.nerim.info/audition-202704/audition-2026110544.html" className="underline">オーディションプラス・J-BEANS募集要項</a>。個別募集の例であり、他の募集にも同じ条件が適用されるものではありません。</p>
          </div>
          <h3 className="mt-7 text-xl font-bold">未経験だから、スクールが先とは限らない</h3>
          <p className="mt-3 leading-8 text-slate-600">J-BEANSのように未経験歓迎と合格後のレッスンを明記する募集もあります。応募のために必ず有料スクールへ通う必要があるとは限りません。まず選考課題を確認し、今できる練習と提出準備から始めましょう。</p>
          <Link href="/idol-audition/mikeiken" className="mt-3 inline-block font-bold underline">未経験歓迎の募集を探す →</Link>
        </section>

        <section className="mt-10 grid gap-7 border border-slate-200 bg-white p-6 sm:grid-cols-[0.7fr_1.3fr] sm:p-8">
          <div><p className="editorial-kicker">First answer</p><h2 className="mt-2 text-2xl font-black leading-tight text-slate-950">まず、募集中のグループから探しても大丈夫</h2></div>
          <div className="space-y-4 leading-8 text-slate-600">
            <p>「事務所に入ってからグループを決める」募集だけでなく、「新グループの初期メンバー」「既存グループの追加メンバー」として応募し、合格後に運営会社へ所属する募集もあります。</p>
            <p>最初に活動したい地域や音楽性に合う募集を絞り、その主催者、所属条件、費用、契約を確認すると、自分に合う候補を見つけやすくなります。</p>
            <Link href="/idol-audition" className="inline-flex min-h-11 items-center rounded-full bg-pink-500 px-6 py-3 text-sm font-black text-white transition hover:bg-pink-700">募集中の女性アイドルオーディションを見る →</Link>
          </div>
        </section>

        <section className="mt-14">
          <p className="editorial-kicker">What is different?</p><h2 className="section-heading mt-2">事務所・運営会社・グループ募集の違い</h2>
          <div className="mt-7 overflow-x-auto border-y border-slate-200">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm leading-7">
              <thead><tr className="bg-[#f8f2ef] text-slate-950"><th className="p-4 font-black">探し方</th><th className="p-4 font-black">特徴</th><th className="p-4 font-black">先に確認すること</th></tr></thead>
              <tbody className="text-slate-600">
                <tr className="border-t border-slate-200"><th className="p-4 align-top font-black text-slate-950">事務所所属募集</th><td className="p-4 align-top">所属後に活動先や育成方針が決まる場合がある</td><td className="p-4 align-top">所属タレント、育成内容、仕事の種類</td></tr>
                <tr className="border-t border-slate-200"><th className="p-4 align-top font-black text-slate-950">新グループ募集</th><td className="p-4 align-top">初期メンバーとしてデビュー準備から参加する</td><td className="p-4 align-top">デビュー時期、楽曲、運営実績、準備期間</td></tr>
                <tr className="border-t border-slate-200"><th className="p-4 align-top font-black text-slate-950">既存グループ募集</th><td className="p-4 align-top">活動中のグループへ追加メンバーとして参加する</td><td className="p-4 align-top">ライブやSNS、既存メンバー、活動頻度</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="agency-checks" className="mt-14 scroll-mt-24">
          <p className="editorial-kicker">Six checks</p><h2 className="section-heading mt-2">アイドル事務所を選ぶ6つのポイント</h2>
          <div className="mt-7 grid gap-px overflow-hidden rounded-[18px] border border-slate-200 bg-slate-200 sm:grid-cols-2">
            {comparisonPoints.map(([title, text], index) => (
              <section key={title} className="bg-white p-6"><span className="text-[10px] font-black tracking-[0.16em] text-pink-600">{String(index + 1).padStart(2, "0")}</span><h3 className="mt-2 text-lg font-black text-slate-950">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{text}</p></section>
            ))}
          </div>
        </section>

        <section className="paper-panel mt-14 p-6 sm:p-9">
          <p className="editorial-kicker">Before signing</p><h2 className="section-heading mt-2">面談・契約前に聞いておきたい質問</h2>
          <p className="mt-5 leading-8 text-slate-600">聞きにくい内容ほど、所属を決める前に確認する必要があります。口頭の説明だけで判断せず、重要な条件は契約書や案内文でも確認しましょう。</p>
          <ol className="mt-6 grid gap-0">{questions.map((question, index) => <li key={question} className="flex gap-4 border-t border-slate-200 py-4 leading-7 text-slate-700"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-pink-100 text-xs font-black text-pink-700">{index + 1}</span>{question}</li>)}</ol>
          <p className="mt-3 text-sm leading-7 text-slate-500">未成年の場合は、契約内容を保護者と一緒に確認してください。不明点が残る場合は、その場で契約せず持ち帰って確認しましょう。</p>
        </section>

        <section className="mt-14">
          <p className="editorial-kicker">Next step</p><h2 className="section-heading mt-2">アイドルになるまでの進め方</h2>
          <ol className="mt-7 grid gap-4 sm:grid-cols-2">
            {[
              ["条件を決める", "通える地域、年齢、学校・仕事との両立、負担できる費用を整理します。"],
              ["募集を比較する", "一つだけで決めず、活動内容や費用が異なる募集を見比べます。"],
              ["公式情報を確認する", "主催者の公式サイト・SNS、ライブ実績、所属グループを確認します。"],
              ["応募・面談で質問する", "応募文を準備し、合格後の費用や契約など不明点を確認します。"]
            ].map(([title, text], index) => <li key={title} className="border-l-2 border-pink-400 bg-white p-5"><span className="text-xs font-black text-pink-600">STEP {index + 1}</span><h3 className="mt-2 text-lg font-black text-slate-950">{title}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{text}</p></li>)}
          </ol>
        </section>

        <section className="mt-14 border-y border-slate-200 py-12">
          <p className="editorial-kicker">Related guides</p><h2 className="section-heading mt-2">条件と不安から次に読む</h2>
          <div className="mt-7 grid gap-px overflow-hidden rounded-[18px] border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
            {relatedLinks.map(([href, label, text]) => <Link key={href} href={href} className="group bg-white p-5 transition hover:bg-pink-50"><h3 className="font-black text-slate-950">{label}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p><span className="mt-4 inline-block text-sm font-black transition group-hover:translate-x-1">→</span></Link>)}
          </div>
        </section>

        <section className="mt-14">
          <p className="editorial-kicker">FAQ</p><h2 className="section-heading mt-2">アイドルと事務所選びのよくある質問</h2>
          <div className="mt-7 grid gap-4">{faq.map((item) => <section key={item.question} className="border border-slate-200 bg-white p-5 sm:p-6"><h3 className="font-black text-slate-950">Q. {item.question}</h3><p className="mt-3 leading-8 text-slate-600">A. {item.answer}</p></section>)}</div>
        </section>

        <section className="mt-14 bg-slate-950 p-7 text-white sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-pink-300">Find your audition</p><h2 className="mt-3 text-2xl font-black sm:text-3xl">自分の条件に合う募集を見つける</h2>
          <p className="mt-4 max-w-2xl leading-8 text-slate-200">女性向けの募集中オーディションを、地域・年齢・費用・未経験可否から比較できます。</p>
          <Link href="/idol-audition" className="mt-6 inline-flex min-h-12 items-center rounded-full bg-pink-500 px-6 py-3 text-sm font-black text-white transition hover:bg-pink-700">女性アイドルオーディション一覧へ →</Link>
        </section>
      </article>
    </main>
  );
}
