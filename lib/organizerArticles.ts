export const organizerArticles = [
  {
    slug: "start-idol-group", number: "02", category: "立ち上げの準備",
    title: "アイドルグループの立ち上げ方。準備の順番と初期費用で、最初に考えたいこと",
    description: "アイドルグループの作り方を、元エンジニアの運営者が振り返る。活動条件、初期費用と継続費用、メンバー募集、面談までの順番と、最初に整理したいこと。",
    excerpt: "サイトは作れた。でも、活動内容が書けなかった。募集に進む前に、一枚のメモで整理したこと。",
    noteHeading: "項目は埋まった。でも、送れる文章にならなかった。",
    noteParagraphs: ["何を決めるかは分かった。それでも「実績もない自分が、これを送っていいのか」で手が止まった。noteには、最初の企画メモと問い合わせ文、その前後で迷ったことを残した。", "この先は、準備の項目を自分の言葉にするところから。無料掲載で問い合わせが来て、面談を重ね、グループを立ち上げるまでの続きを書いている。"],
    related: ["recruit-idol-members", "idol-management-beginner"],
  },
  {
    slug: "idol-management-beginner", number: "03", category: "未経験からの運営",
    title: "アイドル運営の始め方。未経験から考える仕事内容と、最初の一歩",
    description: "アイドル運営をやってみたい未経験の人へ。募集・制作・告知・現場対応などの仕事内容と、自分で立ち上げる準備の順番を、元エンジニアが体験から整理する。",
    excerpt: "芸能の経験はなかった。でも、前の仕事までゼロになったわけではない。得意なことに助けられ、遠回りもした話。",
    noteHeading: "サイトはできた。なのに、誰にも連絡していなかった。",
    noteParagraphs: ["準備しているつもりで、得意な作業に逃げていた。そこから何を後回しにして、最初の相談と募集に進んだのか。noteでは、その遠回りと実際に動く順番を振り返った。", "今やり直すなら、最初の一週間をどう使うかも。昔の自分が知りたかったのは、そういう具体的な順番だった。"],
    related: ["start-idol-group", "idol-management-recruitment"],
  },
  {
    slug: "idol-management-recruitment", number: "04", category: "運営に関わる入口",
    title: "「アイドル運営 募集」を探す人へ。スタッフになる道と、自分で立ち上げる道",
    description: "アイドル運営の募集を探している人へ。スタッフ求人で確認する仕事内容と条件、自分でグループを立ち上げる場合の違いを整理。求人告知ではなく始め方の記事。",
    excerpt: "スタッフとして参加するか、自分で作るか。「運営をやってみたい」の中身を整理すると、次に探すものが変わる。",
    noteHeading: "自分で作るほうが、気になったなら。",
    noteParagraphs: ["僕には最初、メンバーの知り合いも運営実績もなかった。その状態から、誰に何を伝えて募集を始めたのか。自分で立ち上げた道の続きをnoteに書いた。", "企画メモ、問い合わせ文、面談の準備。そして、もうすぐ2周年を迎えるグループになるまでの話だ。"],
    related: ["idol-management-beginner", "start-idol-group"],
    source: { label: "ホワイトスター公式・採用情報（募集条件は公式ページで確認）", url: "https://www.ws-pro.net/recruitment/" },
  },
  {
    slug: "recruit-idol-members", number: "05", category: "最初のメンバー募集",
    title: "アイドルメンバーの募集方法。人脈のない僕にも、問い合わせは来た",
    description: "アイドルメンバーはどう募集する？ 複数のオーディションサイトに無料掲載した体験から、募集条件の書き方、問い合わせ後の面談準備までを整理。",
    excerpt: "実績のない募集に、反応はあるのか。無料で掲載したあとの意外な反応と、面談の前に考えたかったこと。",
    noteHeading: "応募してくれた人に、自分をどう説明したのか。",
    noteParagraphs: ["問い合わせが来たのは嬉しかった。でも、運営経験がないことは変わっていなかった。「この人に任せて大丈夫か」と見られる側にもなる。noteには、実績のない自分をどう説明し、面談前に何を準備したのかを書いた。", "掲載して終わりではなく、面談を重ね、グループを立ち上げるところまで。もうすぐ2周年を迎える今から、最初の動きを振り返っている。"],
    related: ["start-idol-group", "idol-management-beginner"],
  },
];

export const journalArticleIndex = [
  { slug: "no-connections", title: "アイドル運営は人脈なしでも始められる？ 元エンジニアの立ち上げ体験" },
  ...organizerArticles.map(({ slug, title }) => ({ slug, title })),
];
