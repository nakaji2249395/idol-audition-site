import { AffiliateImpression } from "@/components/AffiliateImpression";
import { AffiliateLink } from "@/components/AffiliateLink";
import { affiliateOffers } from "@/lib/affiliateOffers";

export function BeginnerDanceOffer({ region }: { region: "osaka" | "nagoya" }) {
  const offer = affiliateOffers.spotomoDance;
  const placement = `regional_${region}_beginner`;
  return (
    <AffiliateImpression as="aside" offer={offer.offer} placement={placement}
      className="relative mt-6 border-t border-slate-200 pt-5" labelledBy="beginner-dance-title">
      <p className="text-xs text-slate-500">PR</p>
      <h3 id="beginner-dance-title" className="mt-2 text-base font-bold text-slate-800">
        ダンスが不安で、応募前に少し練習したい方へ
      </h3>
      <p className="mt-2 text-sm leading-7 text-slate-600">
        まずは好きな曲の短い部分を練習し、全身を撮影して動きを確認してみましょう。
        一人では身体の使い方が分からないときは、講師に相談する方法もあります。
        スポともダンスは、{region === "osaka" ? "大阪" : "名古屋"}の自宅から受けられるオンラインのマンツーマンレッスンです。
      </p>
      <AffiliateLink href={offer.href} offer={offer.offer} placement={placement}
        label="オンライン&マンツーマン形式のダンスレッスン【スポともダンス】"
        className="mt-2 inline-flex min-h-11 items-center text-sm text-slate-700 underline decoration-slate-400 underline-offset-4 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4" />
      <p className="mt-1 text-xs leading-6 text-slate-500">
        無料体験の内容はリンク先でご確認ください。スクールの利用はオーディションの応募条件ではありません。
        未成年の方のカウンセリングには保護者の同席が必要です。継続受講は有料です。
      </p>
      {/* A8 impression pixel from text creative 001; not a conversion event. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={offer.trackingPixel} width="1" height="1" alt="" aria-hidden="true" className="absolute h-px w-px opacity-0" />
    </AffiliateImpression>
  );
}
