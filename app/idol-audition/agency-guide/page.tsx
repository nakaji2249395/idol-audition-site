import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { getAllAuditions } from "@/lib/auditionData";
import { getAuditionListingSummary } from "@/lib/auditionListingSummary";
import { becomeIdolGuideUpdated, getBeginnerGuideExamples } from "@/lib/becomeIdolGuide";

export const dynamic = "force-dynamic";

const canonical = "/idol-audition/agency-guide";

export const metadata: Metadata = {
  title: "アイドルになりたい人へ｜未経験から始める方法・年齢・費用・応募準備",
  description:
    "アイドルになりたいけれど自信がない、親に言えない、何から始める？未経験・年齢・費用・学業や仕事との両立の疑問に答え、現在応募できる募集の比較から写真・自己PRの準備まで案内します。",
  alternates: { canonical },
  openGraph: {
    title: "アイドルになりたい人へ｜未経験から始める方法・年齢・費用・応募準備",
    description:
      "未経験・年齢・費用の不安を整理し、現在募集中の案件を比べて、最初の応募へ。",
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
  { question: "未経験でもアイドル事務所に所属できますか？", answer: "未経験可と明記され、年齢や活動地域などの応募資格を満たす募集には応募できます。合格を保証するものではなく、選考基準や合格後の育成体制は募集ごとに異なります。" },
  { question: "大手アイドル事務所を選べば安心ですか？", answer: "知名度だけで自分に合うとは限りません。活動内容、費用、契約、育成体制、求めるアイドル像を比較し、不明点を応募前または契約前に確認することが大切です。" },
  { question: "所属するのにお金はかかりますか？", answer: "事務所や募集によって異なります。所属費がなくても、交通費などが自己負担の場合があります。応募料、所属費、レッスン費、衣装代、撮影費、交通費を分けて確認してください。" },
  { question: "複数のオーディションに応募してもいいですか？", answer: "応募先の規約で禁止されていなければ可能な場合があります。ただし、選考中や合格後の専属条件、回答期限を確認し、契約を重ねないよう注意してください。" }
];

const concerns = [
  { id: "experience", title: "歌・ダンスが未経験でも大丈夫？", text: "未経験歓迎の募集はあります。ただし、経験不問と実技審査なしは別です。応募資格と提出する歌・ダンス動画の指定を確認しましょう。まず必要な課題を知り、練習できることから始められます。", href: "/idol-audition/mikeiken", label: "未経験歓迎の募集を見る" },
  { id: "confidence", title: "容姿に自信がない。向いていない？", text: "自分の見た目だけで合否を決めつける必要はありません。一方で、誰でも合格できるとは言えず、求める雰囲気や選考基準は運営ごとに違います。写真の加工で取り繕うより、指定に沿った写真と自分の言葉で準備しましょう。", href: "/idol-audition/photos", label: "応募写真の準備を見る" },
  { id: "age", title: "高校生・20代・30代からでも目指せる？", text: "応募できる年齢は募集ごとに異なります。年齢上限のない募集もありますが、活動場所や日程など他の条件も確認が必要です。年齢だけで可能・不可能を判断せず、自分の年齢を含む募集を探しましょう。", href: "/idol-audition/age", label: "自分の年齢から募集を探す" },
  { id: "parents", title: "親に言えない。反対されそうで不安", text: "気持ちがまだ固まっていなくても、応募前に相談するための情報は集められます。活動場所・帰宅時間・費用・学校への影響を一緒に確認できるよう整理しましょう。未成年の応募は保護者同意の条件を確認し、秘密で契約を進めないことが大切です。", href: "/idol-audition/parents", label: "保護者に説明する項目を見る" },
  { id: "balance", title: "学校・仕事や、地方での生活と両立できる？", text: "学生歓迎・社会人相談可でも、毎回都合が合うとは限りません。平日のレッスン、土日のライブ、遠征、終演後の帰宅まで確認します。「全国から応募可能」は、地元に住んだまま活動できるという意味ではありません。", href: "/idol-audition/working-adult", label: "仕事との両立条件から探す" },
  { id: "cost", title: "お金はどれくらい必要？", text: "全国共通の料金はありません。応募料、所属費、レッスン費、衣装・撮影費、交通費を分けて確認します。「参加無料」と「合格後も自己負担なし」は別です。無料と書かれた項目以外の負担も比較しましょう。", href: "/idol-audition/cost", label: "費用の確認ポイントを見る" },
] as const;

const relatedLinks = [
  ["/idol-audition/major", "大手・注目募集を比較", "主催・グループの実績と応募条件を分けて確認する"],
  ["/idol-audition", "女性アイドルオーディション一覧", "現在募集中の案件を比較する"],
  ["/idol-audition/mikeiken", "未経験OKの募集", "経験不問の募集から探す"],
  ["/idol-audition/free", "費用なしの募集", "費用条件が明記された募集を確認する"],
  ["/idol-audition/suspicious", "怪しい募集の見分け方", "安全面のチェックポイントを読む"],
  ["/idol-audition/how-to-apply", "応募文・自己PRの書き方", "応募前の準備を進める"],
  ["/idol-audition/parents", "保護者への説明", "未成年・高校生の確認事項を整理する"]
] as const;

export default async function AgencyGuidePage() {
  const examples = getBeginnerGuideExamples(await getAllAuditions());
  const jsonLd = JSON.stringify([
    { "@context": "https://schema.org", "@type": "Article", headline: "アイドルになりたい人へ：未経験から始める方法・年齢・費用・応募準備", dateModified: becomeIdolGuideUpdated, description: metadata.description, mainEntityOfPage: `${siteConfig.url}${canonical}`, author: { "@type": "Organization", name: "アイドルオーディションナビ", url: `${siteConfig.url}/about` }, publisher: { "@type": "Organization", name: "アイドルオーディションナビ" } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "トップ", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "女性アイドルオーディション一覧", item: `${siteConfig.url}/idol-audition` },
      { "@type": "ListItem", position: 3, name: "アイドルになりたい人へ", item: `${siteConfig.url}${canonical}` }
    ] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }
  ]).replace(/</g, "\\u003c");

  return (
    <main className="mx-auto max-w-[980px] px-4 py-10 sm:px-6 sm:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <nav className="text-sm font-bold text-slate-500" aria-label="パンくずリスト">
        <Link href="/" className="hover:text-pink-600">トップ</Link><span className="mx-2">/</span>
        <Link href="/idol-audition" className="hover:text-pink-600">募集一覧</Link><span className="mx-2">/</span>
        <span aria-current="page">アイドルになりたい人へ</span>
      </nav>

      <article className="mt-8">
        <header className="border-b border-slate-200 pb-10 sm:pb-12">
          <p className="editorial-kicker">Your first step</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black leading-[1.08] tracking-[-0.05em] text-slate-950 sm:text-6xl">
            アイドルになりたい。<br />その気持ちから、<br className="sm:hidden" />最初の一歩へ。
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            未経験でも応募できる募集はあります。まずは、年齢・地域・費用・続けられる日程から、自分の選択肢を知ること。「何から始める？」を、募集選びと応募準備まで順番に案内します。
          </p>
          <p className="mt-4 text-sm text-slate-600">編集：<Link href="/about" className="underline">アイドルオーディションナビ</Link> ／ 記事更新：<time dateTime={becomeIdolGuideUpdated}>2026年11月15日</time></p>
          <div className="mt-7 flex flex-wrap gap-4"><a href="#concerns" className="inline-flex min-h-12 items-center rounded-full bg-pink-500 px-6 py-3 font-bold text-white hover:bg-pink-700">気になることから読む</a><a href="#open-auditions" className="inline-flex min-h-12 items-center px-2 font-bold underline">今応募できる募集を見る →</a></div>
          <nav aria-label="始め方ガイドの目次" className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold underline">{[["#routes", "目指すルート"], ["#first-steps", "応募までの準備"], ["#debut-flow", "合格後の流れ"], ["#agency-checks", "事務所選び"]].map(([href, label]) => <a key={href} href={href} className="inline-flex min-h-11 items-center">{label}</a>)}</nav>
        </header>

        <section id="concerns" className="mt-12 scroll-mt-24" aria-labelledby="concerns-heading">
          <h2 id="concerns-heading" className="section-heading">アイドルになりたいけれど、ここが不安</h2>
          <p className="mt-4 leading-8 text-slate-600">まだ応募を決めていなくても大丈夫。自分に関係するところから、確かめてみてください。</p>
          <div className="mt-6 divide-y divide-slate-200 border-y border-slate-200">{concerns.map(item => <details key={item.id} className="group py-1"><summary className="min-h-14 cursor-pointer py-4 text-lg font-bold">{item.title}</summary><div className="max-w-3xl pb-6"><p className="leading-8 text-slate-600">{item.text}</p><Link href={item.href} className="mt-3 inline-flex min-h-11 items-center font-bold underline">{item.label} →</Link></div></details>)}</div>
          <p className="mt-5 leading-8 text-slate-600">「なりたい」と思うことと、今すぐ所属を決めることは別です。急いで退学・退職や転居を決めず、活動条件を知ってから考えても遅くありません。</p>
        </section>

        <section id="routes" className="mt-14 scroll-mt-24" aria-labelledby="routes-heading">
          <h2 id="routes-heading" className="section-heading">アイドルになるには？目指し方を比較</h2>
          <p className="mt-4 leading-8 text-slate-600">どのルートも所属やデビューを保証するものではありません。やりたい活動と、自分が参加できる条件で選びましょう。</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">{[
            ["グループの募集に応募する", "新規グループの初期メンバーか、活動中のグループの追加募集かを選べます。活動内容と合格後のレッスン・デビュー時期を確認します。", "/idol-audition/new-members", "新規・追加メンバー募集"],
            ["事務所の所属募集に応募する", "所属後に配属先や育成方針が決まる場合があります。合格が特定のグループへの加入を意味するか、所属条件と合わせて確認します。", "/idol-audition/major", "大手・注目募集の比較"],
            ["スクールで学びながら準備する", "歌やダンスを習ってから挑戦する選択肢です。ただし通学は一律の応募条件ではありません。費用、学ぶ内容、紹介制度とデビュー保証の違いを確認します。", "/idol-audition/training-school", "スクール選びの確認事項"],
            ["SNS・動画で表現を始める", "歌やダンスを発信し、自分の表現を試す方法もあります。投稿やフォロワー数だけで所属は決まりません。住所・学校などの個人情報を出さず、勧誘元は公式窓口で確認します。", "/idol-audition/suspicious", "勧誘・募集の確認ポイント"],
          ].map(([title, text, href, label]) => <div key={title} className="border-t border-slate-200 pt-5"><h3 className="text-lg font-bold">{title}</h3><p className="mt-3 leading-8 text-slate-600">{text}</p><Link href={href} className="mt-3 inline-flex min-h-11 items-center font-bold underline">{label} →</Link></div>)}</div>
        </section>

        <section id="open-auditions" className="mt-14 scroll-mt-24" aria-labelledby="open-auditions-heading">
          <h2 id="open-auditions-heading" className="section-heading">未経験から応募できる、現在の募集例</h2>
          <p className="mt-4 leading-8 text-slate-600">未経験歓迎の記載があり、掲載上の受付期間内にある女性向け募集を最大4件紹介します。合格しやすさの順位ではありません。追加条件や最新の受付状況は募集詳細・公式案内で確認してください。</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">{examples.map(audition => {
            const summary = getAuditionListingSummary(audition);
            return <article key={audition.slug} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"><p className="text-sm font-bold text-pink-600">{summary.experience}</p><h3 className="mt-2 text-xl font-black leading-relaxed"><Link href={`/idol-audition/${audition.slug}`} className="underline decoration-slate-300 underline-offset-4 hover:decoration-pink-500">{audition.title}</Link></h3><dl className="mt-4 space-y-3 text-sm leading-7">{[["活動地域", summary.area], ["年齢", summary.age], ["活動日程", summary.activity], ["締切", audition.deadline]].filter(([, value]) => value).map(([label, value]) => <div key={label} className="grid grid-cols-[5rem_1fr] gap-2"><dt className="text-slate-500">{label}</dt><dd>{value}</dd></div>)}</dl>{audition.cost && !/^(要確認|不明|記載なし|-)$/u.test(audition.cost.trim()) ? <details className="mt-4 border-t border-slate-200 pt-2"><summary className="min-h-11 cursor-pointer py-2 text-sm font-bold">費用・自己負担の記載を見る</summary><p className="mt-2 whitespace-pre-line text-sm leading-7">{audition.cost}</p></details> : null}<Link href={`/idol-audition/${audition.slug}`} className="mt-3 inline-flex min-h-11 items-center font-bold underline">応募条件・合格後の流れを見る →</Link></article>;
          })}</div>
          {examples.length === 0 ? <p className="mt-6 leading-8">この条件で紹介できる募集は現在ありません。地域や年齢を変えて、募集一覧から探せます。</p> : null}
          <nav aria-label="自分に合う募集を探す" className="mt-6 flex flex-wrap gap-x-6 gap-y-2">{[["/idol-audition", "女性アイドルの募集一覧"], ["/mens-idol-audition", "メンズアイドルの募集一覧"], ["/idol-audition/high-school", "高校生"], ["/idol-audition/20s", "20代"], ["/idol-audition/30s", "30代"], ["/idol-audition/free", "費用なしの条件"]].map(([href, label]) => <Link key={href} href={href} className="inline-flex min-h-11 items-center font-bold underline">{label} →</Link>)}</nav>
        </section>

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

        <section className="mt-14 border-y border-slate-200 py-12">
          <p className="editorial-kicker">Related guides</p><h2 className="section-heading mt-2">条件と不安から次に読む</h2>
          <div className="mt-7 grid gap-px overflow-hidden rounded-[18px] border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
            {relatedLinks.map(([href, label, text]) => <Link key={href} href={href} className="group bg-white p-5 transition hover:bg-pink-50"><h3 className="font-black text-slate-950">{label}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p><span className="mt-4 inline-block text-sm font-black transition group-hover:translate-x-1">→</span></Link>)}
          </div>
        </section>

        <section className="mt-14">
          <p className="editorial-kicker">FAQ</p><h2 className="section-heading mt-2">アイドルになりたい人のよくある質問</h2>
          <div className="mt-7 grid gap-4">{faq.map((item) => <section key={item.question} className="border border-slate-200 bg-white p-5 sm:p-6"><h3 className="font-black text-slate-950">Q. {item.question}</h3><p className="mt-3 leading-8 text-slate-600">A. {item.answer}</p></section>)}</div>
        </section>

        <section className="mt-12 border-t border-slate-200 pt-6 text-sm leading-7 text-slate-600" aria-labelledby="sources-heading">
          <h2 id="sources-heading" className="font-bold text-slate-950">掲載情報と編集方針</h2>
          <p className="mt-3">募集例は当サイトの掲載情報、合格後の流れの具体例は下記の募集要項に基づきます。一般的な準備手順は編集部の提案であり、全募集共通の審査基準や合格保証ではありません。募集条件が不明な項目は推測で補っていません。</p>
          <ul className="mt-3 list-disc space-y-2 pl-5"><li><a href="https://audition.nerim.info/audition-202704/audition-2026110544.html" className="underline">オーディションプラス：J-BEANS募集要項</a></li><li><Link href="/about" className="underline">運営情報・お問い合わせ</Link></li></ul>
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
