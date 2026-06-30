import type { Metadata } from "next";
import { ArticlePage } from "@/components/ArticlePage";

export const metadata: Metadata = {
  title: "親にアイドルオーディションを説明するには？確認すべきポイント",
  description:
    "アイドルオーディションを親に説明する前に、運営会社、費用、契約、活動時間、学業との両立、安全面で確認すべきポイントを解説します。"
};

export default function ParentsPage() {
  return (
    <ArticlePage
      label="For Parents"
      title="親にアイドルオーディションを説明するには？"
      description="未成年や学生がアイドル活動を始める場合、本人の気持ちだけでなく、保護者が安心できる情報を整理して伝えることが大切です。"
    >
      <h2>まず伝えるべきこと</h2>
      <p>
        親に説明するときは、「アイドルになりたい」という気持ちだけではなく、どこの運営が募集しているのか、どこで活動するのか、費用はかかるのか、学校生活と両立できるのかを具体的に伝えると話が進みやすくなります。
      </p>

      <h2>確認しておきたい項目</h2>
      <ul>
        <li>運営会社名、所在地、公式サイト、公式SNS</li>
        <li>登録料、レッスン費、衣装代、撮影費の有無</li>
        <li>契約期間、報酬、物販バック、禁止事項</li>
        <li>活動場所、活動頻度、帰宅時間</li>
        <li>未成年の場合の保護者同意の流れ</li>
      </ul>

      <h2>不安を減らすコツ</h2>
      <p>
        募集ページのスクリーンショット、公式SNS、過去のライブ実績、費用項目、応募後の流れをまとめて見せると、保護者も判断しやすくなります。
      </p>
    </ArticlePage>
  );
}
