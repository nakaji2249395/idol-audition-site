export type ApplicationMethod = {
  label: string;
  url: string;
  note?: string;
};

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
  applicationMethods: ApplicationMethod[];
  recruitmentTypes?: string[];
  highlights?: string[];
  selectionFlow?: string[];
  afterPassingFlow?: string[];
  eligibility?: string[];
  faq?: {
    question: string;
    answer: string;
  }[];
};

export const auditions: Audition[] = [
  {
    slug: "hiraeth-tokyo-new-member",
    title: "HIRAETH.Tokyo 新体制メンバーオーディション",
    group: "HIRAETH.Tokyo",
    summary:
      "東京を中心に活動するアイドルグループ HIRAETH.Tokyo の新体制メンバー募集。新グループ初期メンバー、既存グループ追加メンバーの両方を募集しています。",
    area: "東京・関東近郊",
    deadline: "2026年9月18日",
    age: "都内・関東近郊で活動できる方",
    features: ["東京", "未経験OK", "費用なし", "レッスン無料", "高校生相談可", "新体制"],
    safetyScore: 5,
    cost: "オーディション参加費なし・合格後費用なし",
    reward: "所定の報酬あり",
    experience: "未経験OK。歌・ダンス経験者も歓迎",
    student: "学業・仕事との両立相談可",
    description:
      "HIRAETH.Tokyoでは、新体制に向けて本気でアイドル活動に取り組めるメンバーを募集しています。都内を中心としたライブ活動、レッスン、SNS発信を通じて、ステージで成長したい方を歓迎します。直近の新メンバーはZepp Shinjukuでのワンマンライブにてデビューしており、大きなステージを目指したい方にも向いたオーディションです。",
    recruitmentTypes: [
      "新グループ初期メンバー",
      "既存グループの追加メンバー"
    ],
    highlights: [
      "東京ドーム、幕張メッセ、Zepp各会場、さいたまスーパーアリーナなど大型会場での出演実績あり",
      "業界経験のあるプロデューサー陣によるプロデュース体制",
      "1グループに対して複数のプロデューサー・運営スタッフが関わるサポート体制",
      "アイドル活動だけでなく、俳優・声優など次のキャリアも見据えたサポート",
      "学業や仕事との両立も相談可能。未経験からデビューしたメンバーも多数",
      "費用負担なしで活動を始められる募集内容",
      "楽曲・衣装・映像制作にも力を入れたグループ運営"
    ],
    selectionFlow: [
      "LINE応募による一次選考",
      "書類審査",
      "都内での面接。状況により1回〜2回実施",
      "合格後、活動条件・スケジュールを確認"
    ],
    afterPassingFlow: [
      "専任スタッフが学校・アルバイト・仕事などの状況をヒアリング",
      "本人の状況に合わせて、デビューまでのスケジュールを作成",
      "契約内容を確認しながら契約を締結",
      "既存メンバーとの顔合わせ、レッスン開始",
      "楽曲習得、芸名決定、アイドル活動用SNSの準備",
      "ステージデビュー"
    ],
    eligibility: [
      "本気でアイドル活動に取り組みたい方",
      "歌やダンスに前向きに取り組める方",
      "愛嬌があり、人前に立つことを楽しめる方",
      "約束を守れる方",
      "礼儀礼節や挨拶を大切にできる方",
      "都内・関東近郊に住んでいる方",
      "特定の事務所に所属しておらず、専属契約がない方"
    ],
    faq: [
      {
        question: "未経験でも応募できますか？",
        answer:
          "未経験でも応募可能です。歌やダンスの経験だけでなく、継続力、やる気、発信力、礼儀を重視します。"
      },
      {
        question: "費用はかかりますか？",
        answer:
          "オーディション参加費、合格後にかかる費用はいずれもありません。応募前に不安な点があればLINEで確認できます。"
      },
      {
        question: "学生でも応募できますか？",
        answer:
          "学業との両立は相談可能です。10代の方は、面接時に保護者の同席を推奨しています。"
      },
      {
        question: "面接はオンラインですか？",
        answer:
          "面接は都内で実施予定です。オンライン面接は実施していません。"
      }
    ],
    applicationMethods: [
      {
        label: "LINE友だち追加で応募",
        url: "https://lin.ee/NgGvMjx",
        note:
          "下記リンクからLINE友だち追加をしてください。エントリーのための必要事項をお送りします。ご不明な点がある場合もお気軽にお問い合わせください。"
      }
    ]
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
      "都内を中心に活動予定の新規アイドルグループです。歌やダンスの経験よりも、継続力や発信力を重視します。",
    applicationMethods: [
      {
        label: "掲載元の応募フォームより応募",
        url: "/post",
        note: "現在、応募先情報を確認中です。"
      }
    ]
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
      "週末を中心に活動するアイドル企画です。平日は学校や仕事をしながら、無理なく活動したい方に向いています。",
    applicationMethods: [
      {
        label: "掲載元の応募フォームより応募",
        url: "/post",
        note: "現在、応募先情報を確認中です。"
      }
    ]
  }
];
