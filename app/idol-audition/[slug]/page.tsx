import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auditions } from "@/lib/auditions";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return auditions.map((audition) => ({
    slug: audition.slug
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const audition = auditions.find((item) => item.slug === slug);

  if (!audition) {
    return {
      title: "オーディションが見つかりません"
    };
  }

  return {
    title: audition.title,
    description: audition.summary
  };
}

export default async function AuditionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const audition = auditions.find((item) => item.slug === slug);

  if (!audition) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <Link href="/idol-audition" className="text-sm font-bold text-slate-500 hover:text-pink-600">
        ← オーディション一覧へ戻る
      </Link>

      <article className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <div className="mb-5 flex flex-wrap gap-2">
          {audition.features.map((feature) => (
            <span
              key={feature}
              className="rounded-full bg-pink-50 px-3 py-1 text-xs font-bold text-pink-700"
            >
              {feature}
            </span>
          ))}
        </div>

        <p className="text-sm font-bold text-pink-600">{audition.group}</p>
        <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950">
          {audition.title}
        </h1>
        <p className="mt-6 leading-8 text-slate-600">{audition.description}</p>

        <dl className="mt-10 grid gap-4">
          {[
            ["活動地域", audition.area],
            ["締切", audition.deadline],
            ["募集年齢", audition.age],
            ["費用", audition.cost],
            ["報酬", audition.reward],
            ["経験", audition.experience],
            ["学生との両立", audition.student]
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-slate-50 p-5 sm:flex sm:justify-between sm:gap-8">
              <dt className="font-bold text-slate-500">{label}</dt>
              <dd className="mt-2 font-bold text-slate-950 sm:mt-0">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 rounded-3xl bg-slate-950 p-6 text-white">
          <h2 className="text-xl font-black">応募前に確認したいこと</h2>
          <p className="mt-3 leading-8 text-slate-200">
            実際に応募する前に、費用、契約期間、活動頻度、報酬、未成年の場合の保護者同意について確認しましょう。
          </p>
          <button className="mt-5 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-950">
            応募フォームは準備中
          </button>
        </div>
      </article>
    </main>
  );
}
