export const organizerArticles = [
  {
    slug: "start-idol-group", number: "02", category: "立ち上げの準備",
    title: "アイドルグループを立ち上げたい。最初に決めるのは、名前より活動の条件だった",
    description: "アイドルグループを立ち上げたい人へ。元エンジニアの運営者が、活動地域・頻度・担当・予算・未定事項の整理と、メンバー募集前の準備を振り返る。",
    excerpt: "サイトは作れた。でも、活動内容が書けなかった。募集に進む前に、一枚のメモで整理したこと。",
    noteHeading: "その一枚を、どう人に見せたのか。",
    noteParagraphs: ["項目が分かっても、実際に文章にすると手が止まる。僕もそこからだった。企画メモに何を書き、最初の問い合わせをどう短くしたのか。その続きをnoteに書いた。", "募集を出し、面談を重ね、グループを立ち上げるまで。考えていただけの企画が動き出したところまで残している。"],
    related: ["recruit-idol-members", "idol-management-beginner"],
  },
  {
    slug: "idol-management-beginner", number: "03", category: "未経験からの運営",
    title: "アイドル運営をやってみたい。未経験の僕に、何ができたのか",
    description: "アイドル運営をやってみたいけれど未経験。元エンジニアが、前の仕事の経験をどう活かし、できないことをどう分け、募集へ進んだかを振り返る。",
    excerpt: "芸能の経験はなかった。でも、前の仕事までゼロになったわけではない。得意なことに助けられ、遠回りもした話。",
    noteHeading: "できることはあった。使う順番で迷った。",
    noteParagraphs: ["サイトを作っているのに、誰にも連絡できていなかった。そこから何を変えて、募集に進んだのか。問い合わせ文や面談前の準備を、noteに書いた。", "今やり直すなら、最初の一週間をどう使うかも。昔の自分が知りたかったのは、そういう具体的な順番だった。"],
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
    noteHeading: "問い合わせが来た。その先で、何を話したか。",
    noteParagraphs: ["募集を出すまでの準備と、応募者に聞かれることへの準備は、つながっていた。自分をどう説明し、どんな回答を用意したのか。noteには、その具体的な中身を書いた。", "掲載して終わりではなく、面談を重ね、グループを立ち上げるところまで。もうすぐ2周年を迎える今から、最初の動きを振り返っている。"],
    related: ["start-idol-group", "idol-management-beginner"],
  },
];

export const journalArticleIndex = [
  { slug: "no-connections", title: "アイドルグループを作りたい。でも、業界に知り合いが一人もいなかった" },
  ...organizerArticles.map(({ slug, title }) => ({ slug, title })),
];
