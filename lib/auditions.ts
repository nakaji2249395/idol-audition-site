export type Audition = {
  slug: string;
  title: string;
  group: string;
  summary: string;
  area: string;
  deadline: string;
  age: string;
  features: string[];
  safetyScore: number;
  cost: string;
  reward: string;
  experience: string;
  student: string;
  description: string;
};

export const auditions: Audition[] = [
  {
    slug: "hiraeth-tokyo-new-member",
    title: "HIRAETH.Tokyo 新メンバーオーディション",
    group: "HIRAETH.Tokyo",
    summary: "東京を中心に活動するアイドルグループの新メンバー募集。未経験から本気でステージを目指したい方へ。",
    area: "東京",
    deadline: "随時募集",
    age: "15歳〜24歳目安",
    features: ["東京", "未経験OK", "費用なし", "レッスン無料", "高校生OK"],
    safetyScore: 5,
    cost: "登録料・レッスン費なし",
    reward: "活動内容に応じて報酬あり",
    experience: "未経験OK",
    student: "学業との両立相談可",
    description:
      "HIRAETH.Tokyoの新メンバーを募集しています。ライブ活動、レッスン、SNS発信などを通じて、アイドルとして本気で成長したい方を歓迎します。"
  },
  {
    slug: "tokyo-new-idol-project",
    title: "東京 新規アイドルグループ 初期メンバー募集",
    group: "新規アイドルプロジェクト",
    summary: "初期メンバーとしてグループ作りから参加したい方向け。都内ライブハウスを中心に活動予定。",
    area: "東京",
    deadline: "2026年8月31日",
    age: "16歳〜25歳",
    features: ["東京", "初期メンバー", "未経験OK", "週末活動", "費用要確認"],
    safetyScore: 4,
    cost: "詳細確認中",
    reward: "歩合あり",
    experience: "未経験OK",
    student: "高校生・大学生相談可",
    description:
      "都内を中心に活動予定の新規アイドルグループです。歌やダンスの経験よりも、継続力や発信力を重視します。"
  },
  {
    slug: "weekend-idol-audition",
    title: "週末活動中心 アイドルメンバー募集",
    group: "週末アイドル企画",
    summary: "学校や仕事と両立しながら活動したい方向けのアイドルオーディション。",
    area: "東京・神奈川",
    deadline: "2026年9月30日",
    age: "18歳〜28歳",
    features: ["週末中心", "未経験OK", "社会人OK", "東京近郊", "費用要確認"],
    safetyScore: 4,
    cost: "一部自己負担の可能性あり",
    reward: "ライブ・物販実績に応じて報酬あり",
    experience: "未経験OK",
    student: "社会人・学生どちらも可",
    description:
      "週末を中心に活動するアイドル企画です。平日は学校や仕事をしながら、無理なく活動したい方に向いています。"
  }
];
