import type { Metadata } from "next";
import Link from "next/link";
import { createSubmission } from "@/app/post/actions";

export const metadata: Metadata = {
  title: "アイドルオーディション掲載依頼フォーム",
  description:
    "アイドルオーディションナビへの掲載依頼フォームです。アイドル運営者・事務所・プロジェクト担当者向けに、募集情報を送信できます。"
};

function Field({
  label,
  name,
  placeholder,
  type = "text",
  required = true
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black text-slate-800">
        {label}
        {required ? <span className="ml-1 text-pink-600">*</span> : null}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-pink-400"
      />
    </label>
  );
}

function Textarea({
  label,
  name,
  placeholder,
  required = true
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black text-slate-800">
        {label}
        {required ? <span className="ml-1 text-pink-600">*</span> : null}
      </span>
      <textarea
        name={name}
        placeholder={placeholder}
        required={required}
        rows={5}
        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-7 outline-none focus:border-pink-400"
      />
    </label>
  );
}

function Checkbox({ name, label }: { name: string; label: string }) {
  return (
    <label className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-700">
      <input name={name} type="checkbox" className="h-5 w-5" />
      {label}
    </label>
  );
}

export default function PostPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-12">
      <Link href="/" className="text-sm font-bold text-slate-500 hover:text-pink-600">
        ← トップへ戻る
      </Link>

      <header className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <p className="text-sm font-bold text-pink-600">For Organizers</p>
        <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950">
          アイドルオーディション掲載依頼フォーム
        </h1>
        <p className="mt-6 leading-8 text-slate-600">
          アイドルオーディションナビへの掲載を希望する運営者・事務所・プロジェクト担当者向けフォームです。
          応募者が安心して比較できるよう、費用・活動地域・応募方法・運営情報の入力をお願いします。
        </p>
      </header>

      <form action={createSubmission} className="mt-8 grid gap-8">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-black text-slate-950">基本情報</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Field label="グループ名・プロジェクト名" name="group_name" placeholder="例：HIRAETH.Tokyo" />
            <Field label="募集タイトル" name="title" placeholder="例：新体制メンバーオーディション" />
            <Field label="活動地域" name="area" placeholder="例：東京・関東近郊" />
            <Field label="募集締切" name="deadline" placeholder="例：2026年9月18日 / 随時募集" />
            <Field label="募集年齢・対象" name="age" placeholder="例：15歳〜24歳 / 都内で活動できる方" />
          </div>

          <div className="mt-5 grid gap-5">
            <Textarea
              label="募集概要"
              name="summary"
              placeholder="一覧カードに表示される短めの説明文を入力してください。"
            />
            <Textarea
              label="募集詳細"
              name="description"
              placeholder="どのようなグループか、どんな人を募集しているかを入力してください。"
            />
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-black text-slate-950">募集条件</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <Checkbox name="is_beginner_ok" label="未経験OK" />
            <Checkbox name="is_high_school_ok" label="高校生・学生相談可" />
            <Checkbox name="is_no_cost" label="費用なし・費用負担少なめ" />
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Textarea label="費用" name="cost" placeholder="例：オーディション参加費なし・合格後費用なし" />
            <Textarea label="報酬" name="reward" placeholder="例：所定の報酬あり / 物販バックあり" />
            <Textarea label="経験条件" name="experience" placeholder="例：未経験OK。歌・ダンス経験者歓迎" />
            <Textarea label="学生・仕事との両立" name="student" placeholder="例：学業・仕事との両立相談可" />
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-black text-slate-950">活動内容・選考</h2>
          <div className="mt-6 grid gap-5">
            <Textarea
              label="活動内容"
              name="activity_content"
              placeholder="例：都内ライブ、レッスン、SNS発信、撮影、特典会など"
            />
            <Textarea
              label="選考フロー"
              name="selection_flow"
              placeholder="例：LINE応募 → 書類審査 → 都内面接 → 合格連絡"
            />
            <Textarea
              label="応募方法"
              name="application_method"
              placeholder="例：LINE友だち追加後、エントリーに必要な情報を送信"
            />
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-black text-slate-950">応募URL・公式SNS</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Field label="LINE応募URL" name="line_url" placeholder="https://lin.ee/..." required={false} />
            <Field label="フォーム応募URL" name="form_url" placeholder="https://..." required={false} />
            <Field label="公式サイトURL" name="official_site_url" placeholder="https://..." required={false} />
            <Field label="公式X URL" name="official_x_url" placeholder="https://x.com/..." required={false} />
            <Field label="公式Instagram URL" name="official_instagram_url" placeholder="https://instagram.com/..." required={false} />
            <Field label="公式TikTok URL" name="official_tiktok_url" placeholder="https://tiktok.com/..." required={false} />
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-black text-slate-950">掲載担当者情報</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            この情報は掲載内容の確認用です。公開ページには原則表示しません。
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Field label="担当者名" name="organizer_name" placeholder="例：山田 太郎" />
            <Field label="担当者メールアドレス" name="organizer_email" type="email" placeholder="example@example.com" />
            <Field label="担当者電話番号" name="organizer_phone" placeholder="任意" required={false} />
          </div>
        </section>

        <section className="rounded-[2rem] border border-pink-200 bg-pink-50 p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-black text-slate-950">掲載前の確認</h2>
          <p className="mt-3 leading-8 text-slate-700">
            送信された内容は一度審査し、問題がないと判断した募集のみ掲載します。
            費用・応募方法・運営情報が不明確な場合、掲載できないことがあります。
          </p>

          <label className="mt-5 flex items-start gap-3 rounded-2xl bg-white p-4 text-sm font-bold leading-7 text-slate-700">
            <input name="agreement" type="checkbox" required className="mt-1 h-5 w-5" />
            入力内容に虚偽がなく、掲載可否はアイドルオーディションナビ側の判断に委ねることに同意します。
          </label>
        </section>

        <button
          type="submit"
          className="rounded-full bg-slate-950 px-8 py-4 text-sm font-black text-white transition hover:bg-pink-600"
        >
          掲載依頼を送信する
        </button>
      </form>
    </main>
  );
}
