import type { Metadata } from "next";
import { AudienceAuditionPage } from "@/components/AudienceAuditionPage";
import { getAllAuditions } from "@/lib/auditionData";
import {
  isAgeLimitNoneAudition,
  isBeginnerFriendlyAudition,
  isThirtiesAudition,
  isWorkingAdultAudition
} from "@/lib/auditionAudience";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "30代で応募できるアイドルオーディション一覧【2026年】未経験・社会人OK",
  description:
    "30代で応募できるアイドルオーディションを掲載。未経験・社会人OK、30歳・32歳・35歳まで、年齢不問などの条件を比較。自己PRと年齢質問の回答例も紹介します。",
  alternates: { canonical: "/idol-audition/30s" },
  openGraph: {
    title: "30代で応募できるアイドルオーディション一覧【2026年】",
    description: "30代から応募できる募集を年齢上限・活動地域・費用で比較できます。",
    url: `${siteConfig.url}/idol-audition/30s`,
    type: "article"
  }
};

const content = {
  canonical: "/idol-audition/30s",
  eyebrow: "Auditions for 30s",
  title: "30代で応募できる アイドルオーディション",
  lead:
    "30歳以上でも応募条件に入るアイドルオーディションをまとめました。年齢不問・上限なしの募集に加え、30歳、32歳、35歳まで応募できる募集を掲載しています。",
  listTitle: "30代が応募条件に入る募集中のオーディション",
  guideTitle: "30代からアイドルオーディションを探す方法",
  guideParagraphs: [
    "30代でアイドルを目指す場合は、募集要項の上限年齢だけでなく、グループのコンセプト、活動頻度、求める人物像を確認することが重要です。「30歳まで」は30歳を含みますが、「30歳未満」は29歳までです。表記の違いにも注意してください。",
    "大人かわいい、楽曲派、ロック系、セルフプロデュース型、年齢非公開など、経験や人生経験を強みにできるグループもあります。応募文では年齢を不利と捉えず、継続力、社会人経験、発信力、活動に使える時間を具体的に伝えましょう。",
    "掲載一覧は募集要項に30歳以上が含まれる、上限が30歳以上、または年齢不問と明記された情報から抽出しています。条件は更新される場合があるため、応募前に主催者の公式案内も確認してください。"
  ],
  checks: [
    "上限が「30歳まで」か「30歳未満」かを確認する",
    "年齢不問でも求めるコンセプトや雰囲気が合うか確認する",
    "平日夜・土日・遠征を含む活動頻度を確認する",
    "仕事や家庭と両立できるスケジュールか確認する",
    "レッスン費・衣装代・交通費などの負担を確認する",
    "契約期間、報酬、退所条件を契約前に確認する"
  ],
  faq: [
    {
      question: "30代でもアイドルオーディションに応募できますか？",
      answer: "応募できます。年齢上限が30歳以上の募集、年齢不問、上限なしの募集を選び、募集要項を確認してください。"
    },
    {
      question: "30歳までの募集に30歳は応募できますか？",
      answer: "通常は30歳を含みます。一方、30歳未満は29歳までを意味します。判断が難しい表記は主催者へ確認しましょう。"
    },
    {
      question: "未経験の30代でも応募できますか？",
      answer: "未経験OKかつ年齢条件を満たす募集なら応募可能です。継続力、仕事で得た経験、SNS発信への意欲なども自己PRになります。"
    },
    {
      question: "社会人を続けながら活動できますか？",
      answer: "募集によります。平日夜や土日中心の活動もありますが、月間活動日数や遠征の有無を応募前に確認してください。"
    }
  ],
  relatedLinks: [
    {
      href: "/idol-audition/mikeiken",
      label: "30代・未経験OKのアイドル募集",
      description: "歌やダンスが初めてでも応募しやすい募集を比較する"
    },
    {
      href: "/idol-audition/working-adult",
      label: "社会人から応募できるオーディション",
      description: "仕事、平日夜、土日の活動条件から探す"
    },
    {
      href: "/idol-audition/age-limit-none",
      label: "年齢制限なしのアイドル募集",
      description: "年齢不問・上限なしと明記された募集を見る"
    },
    {
      href: "/idol-audition/how-to-apply",
      label: "自己PR・志望動機の書き方",
      description: "応募文の組み立て方と写真の準備を確認する"
    }
  ],
  guideSections: [
    {
      title: "30代で応募するときの自己PRの作り方",
      paragraphs: [
        "30代の自己PRでは、年齢を弁解するよりも、これまで続けてきたことと、アイドル活動へ転用できる力を具体的に伝えます。仕事で身につけた責任感、接客力、時間管理、SNS運用、チームでの経験などは、継続的な活動に直結する強みです。",
        "『未経験ですが頑張ります』だけで終わらせず、週に何日活動できるか、どのような発信を続けられるか、そのグループでどんな役割を担いたいかまで書くと、活動する姿を想像してもらいやすくなります。"
      ],
      exampleTitle: "30代・未経験者の自己PR例文",
      example:
        "接客の仕事を8年間続け、相手の様子を見ながら明るく声をかけることを大切にしてきました。アイドル活動は未経験ですが、週3日の活動時間を確保でき、SNSでは毎日発信を続けられます。貴グループの、年齢や経験に関係なく挑戦する姿を届けるという考えに惹かれました。仕事で培った責任感と継続力を活かし、ライブを重ねるたびに成長するメンバーになりたいです。"
    },
    {
      title: "年齢について聞かれたときの答え方",
      paragraphs: [
        "面接で年齢に触れられた場合は、若い応募者と比較して守りに入るのではなく、活動できる時間、体力づくり、継続する意思を事実で答えます。年齢を隠したり、根拠なく『大丈夫です』と言い切ったりせず、運営側が確認したい不安を一つずつ解消する答え方が有効です。"
      ],
      exampleTitle: "面接での回答例",
      example:
        "現在32歳ですが、募集要項の年齢条件を確認したうえで応募しました。仕事は活動日に合わせて調整でき、平日夜と土日は継続して参加できます。週3回の運動を続けており、ライブ活動に必要な体力づくりも始めています。年齢ではなく、約束を守って長く活動できることと、同世代にも挑戦するきっかけを届けられる点を強みにしたいです。"
    }
  ]
};

export default async function ThirtiesAuditionPage() {
  const auditions = (await getAllAuditions()).filter(isThirtiesAudition);
  const stats = [
    {
      value: auditions.filter(isAgeLimitNoneAudition).length,
      label: "年齢制限なし・年齢不問",
      href: "/idol-audition/age-limit-none"
    },
    {
      value: auditions.filter(isWorkingAdultAudition).length,
      label: "社会人・仕事との両立相談可",
      href: "/idol-audition/working-adult"
    },
    {
      value: auditions.filter(isBeginnerFriendlyAudition).length,
      label: "未経験・初心者歓迎",
      href: "/idol-audition/mikeiken"
    }
  ];

  return <AudienceAuditionPage content={content} auditions={auditions} stats={stats} />;
}
