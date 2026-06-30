import Link from "next/link";

export function FeaturedHiraeth() {
  return (
    <section className="my-10 rounded-[2rem] border border-pink-200 bg-pink-50 p-6 sm:p-8">
      <p className="text-sm font-black text-pink-600">注目オーディション</p>
      <h2 className="mt-2 text-2xl font-black leading-tight text-slate-950">
        HIRAETH.Tokyo 新体制メンバーオーディション
      </h2>
      <p className="mt-4 leading-8 text-slate-700">
        東京・関東近郊で活動できる新メンバーを募集中。未経験OK、オーディション参加費なし、合格後費用なし。
        新グループ初期メンバー、既存グループ追加メンバーの両方を募集しています。
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {["東京", "未経験OK", "費用なし", "レッスン無料", "新体制"].map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-white px-3 py-1 text-xs font-bold text-pink-700"
          >
            {tag}
          </span>
        ))}
      </div>
      <Link
        href="/idol-audition/hiraeth-tokyo-new-member"
        className="mt-6 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white hover:bg-pink-600"
      >
        HIRAETH.Tokyoの募集詳細を見る
      </Link>
    </section>
  );
}
