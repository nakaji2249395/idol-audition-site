import type { Metadata } from "next";
import { RegionalAuditionPage } from "@/components/RegionalAuditionPage";
import { getAllAuditions } from "@/lib/auditionData";
import { isAuditionInRegion } from "@/lib/auditionDiscovery";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const count = (await getAllAuditions()).filter((audition) =>
    isAuditionInRegion(audition, "nagoya")
  ).length;
  const title = `名古屋のアイドルオーディション${count}件【2026年10月】未経験OK`;
  const description = `名古屋・愛知・東海で現在応募できるアイドルオーディション${count}件。未経験・高校生・社会人OK、費用なし、新規・追加メンバー募集を比較できます。`;

  return {
    title,
    description,
    alternates: { canonical: "/idol-audition/nagoya" },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/idol-audition/nagoya`,
      type: "article"
    }
  };
}

export default function NagoyaAuditionPage() {
  return (
    <RegionalAuditionPage
      content={{
        region: "nagoya",
        eyebrow: "Nagoya / Tokai Audition",
        title: "名古屋のアイドルオーディション 最新募集",
        lead:
          "名古屋・愛知・東海で現在応募できるアイドルオーディションを掲載しています。未経験・高校生・社会人OK、費用なし、新規グループや追加メンバー募集を、締切・年齢・活動時間で比較できます。",
        listTitle: "名古屋・愛知で募集中のアイドルオーディション",
        guideTitle: "名古屋・東海でアイドルオーディションを探すポイント",
        guideParagraphs: [
          "名古屋は栄、大須、新栄、金山、今池などを中心にライブアイドルの活動が盛んで、地域密着型グループから全国展開を目指すグループまで幅広い募集があります。",
          "愛知県外から応募する場合は、レッスンや平日夜のライブへ通えるかを確認しましょう。岐阜・三重・静岡から通う場合も、終演時間と交通費を事前に計算しておくと安心です。"
        ],
        showConditionStats: true,
        relatedLinks: [
          {
            href: "/idol-audition/mikeiken",
            label: "名古屋で未経験から応募しやすい募集",
            description: "経験不問・初心者歓迎の募集と育成条件を比較する"
          },
          {
            href: "/idol-audition/high-school",
            label: "高校生が応募できるアイドル募集",
            description: "保護者同意、学業、帰宅時間の条件を確認する"
          },
          {
            href: "/idol-audition/working-adult",
            label: "社会人から応募できるオーディション",
            description: "仕事と両立できる活動曜日・時間から探す"
          },
          {
            href: "/idol-audition/free",
            label: "費用なし・負担が少ない募集",
            description: "レッスン費、衣装代、交通費の負担範囲を比べる"
          }
        ],
        guideSections: [
          {
            title: "名古屋の募集は活動時間と通いやすさで選ぶ",
            paragraphs: [
              "栄・大須・新栄・金山を中心に、レッスン場所とライブ会場が異なる募集もあります。応募前に週の活動回数、平日昼の稼働、終演予定時刻を確認し、学校や仕事と無理なく両立できるか判断しましょう。",
              "岐阜・三重・静岡から通う場合は、終電と毎月の交通費を計算します。合格後に名古屋近郊への転居が必要かどうかも、募集要項や面談で確認してください。"
            ]
          },
          {
            title: "未経験の自己PRは活動に使える強みに変える",
            paragraphs: [
              "未経験歓迎の募集では、完成された技術だけでなく、練習を続ける姿勢やチームで動けるかも見られます。接客、部活動、配信、SNS、仕事の経験を、ライブやファン対応にどう活かすかまで伝えましょう。"
            ],
            exampleTitle: "名古屋・未経験者の自己PR例",
            example: "アイドル活動は未経験ですが、部活動を3年間続けた継続力があります。平日夜と土日は名古屋市内で活動でき、歌とダンスの基礎を毎日練習して、ライブで成長を見せられるメンバーを目指します。"
          },
          {
            title: "研修生期間・費用・正規昇格条件を確認する",
            paragraphs: [
              "研修生として活動を始める募集では、正規メンバーになる基準と目安期間を確認します。応募無料と合格後費用は別なので、レッスン費、衣装代、撮影費、交通費の負担も項目ごとに見ましょう。"
            ]
          }
        ],
        areas: ["栄", "大須", "新栄", "金山", "今池", "名駅", "岐阜", "三重", "静岡"],
        checks: [
          "名古屋市内へ継続的に通えるか",
          "平日夕方以降や土日祝のライブに参加できるか",
          "研修生期間と正規デビューの条件が明確か",
          "交通費、レッスン費、衣装代の負担範囲を確認したか",
          "学校や仕事との両立について相談できるか",
          "運営元と公式SNS、過去のライブ実績を確認できるか"
        ],
        faq: [
          {
            question: "名古屋のアイドルオーディションは未経験でも応募できますか？",
            answer: "未経験歓迎の募集があります。基礎レッスンや研修生期間を設けているグループもあるため、デビューまでのサポート内容を比較しましょう。"
          },
          {
            question: "高校生でも名古屋の募集に応募できますか？",
            answer: "高校生可または15歳以上を対象とする募集があります。未成年の場合は、保護者の同意や帰宅時間、学業との両立条件を確認してください。"
          },
          {
            question: "岐阜や三重からでも応募できますか？",
            answer: "名古屋市内の活動へ継続して通える場合は応募できることがあります。レッスン頻度、終演時間、交通費を募集元へ確認しましょう。"
          },
          {
            question: "名古屋で現在応募できる募集はどこで確認できますか？",
            answer: "このページ上部の一覧には、募集期限内で名古屋・愛知・東海に該当する掲載を表示しています。詳細ページで締切と主催者の最新案内も確認してください。"
          }
        ]
      }}
    />
  );
}
