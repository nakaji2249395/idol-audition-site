import { AffiliateLink } from "@/components/AffiliateLink";
import { AffiliateImpression } from "@/components/AffiliateImpression";
import type { Audition } from "@/lib/auditions";
import { affiliateOffers } from "@/lib/affiliateOffers";
import { PreparationGuideLink } from "@/components/PreparationGuideLink";

const DANCE_SIGNALS = /ダンス審査|ダンス実技|ダンス経験|振付|振り付け|踊れる|K-?POP/i;
const TOKYO_SIGNALS = /東京|都内|関東|埼玉|千葉|神奈川/;

type PreparationOffer = {
  name: string;
  href: string;
  trackingPixel: string;
  offer: string;
  lead: string;
  cta: string;
};

function selectPreparationOffer(audition: Audition): PreparationOffer {
  const auditionText = [
    audition.title,
    audition.summary,
    audition.area,
    audition.experience,
    audition.description,
    ...(audition.selectionFlow ?? []),
    ...(audition.highlights ?? [])
  ].join(" ");

  if (DANCE_SIGNALS.test(auditionText)) {
    return {
      ...affiliateOffers.nayutasDance,
      lead: "ダンス審査やステージに向けて、未経験から基礎を確認したい方の比較候補です。",
      cta: "ダンスの無料体験を確認する"
    };
  }

  if (TOKYO_SIGNALS.test(audition.area)) {
    return {
      ...affiliateOffers.wacca,
      lead: "東京で活動を始める前に、歌唱の課題を整理したい方の比較候補です。",
      cta: "ボイトレの無料体験を確認する"
    };
  }

  return {
    ...affiliateOffers.nayutasVocal,
    lead: "歌唱審査に向けて、自分では気づきにくい発声や音程の課題を確認したい方の比較候補です。",
    cta: "ボイトレの無料体験を確認する"
  };
}

export function AuditionPreparationOffer({ audition }: { audition: Audition }) {
  const selectedOffer = selectPreparationOffer(audition);

  return (
    <AffiliateImpression as="aside" offer={selectedOffer.offer} placement={`audition_detail_end_${audition.slug}`} className="mt-9 border-y border-slate-200 py-6" labelledBy="audition-preparation-title">
      <h2 id="audition-preparation-title" className="text-lg font-black text-slate-950">
        応募前に少し準備しておきたい方へ
      </h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">{selectedOffer.lead}</p>
      <p className="mt-2 text-xs leading-6 text-slate-500">
        スクールの利用は応募条件ではありません。料金・校舎・対象条件は公式サイトでご確認ください。
      </p>
      <div className="mt-2">
        <PreparationGuideLink topic={selectedOffer.offer === "nayutas_dance" ? "dance" : "voice"} placement={`audition_detail_${audition.slug}`}>
          まずは練習方法と体験レッスンの選び方を見る
        </PreparationGuideLink>
      </div>
      <AffiliateLink
        href={selectedOffer.href}
        offer={selectedOffer.offer}
        placement={`audition_detail_end_${audition.slug}`}
        label={selectedOffer.cta}
        className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full border border-slate-950 bg-white px-5 py-2.5 text-xs font-black text-slate-950 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-950"
      />
      {/* A8.net conversion measurement pixel supplied with the selected creative. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={selectedOffer.trackingPixel}
        width="1"
        height="1"
        alt=""
        aria-hidden="true"
        className="absolute h-px w-px opacity-0"
      />
    </AffiliateImpression>
  );
}
