import { AffiliateLink } from "@/components/AffiliateLink";
import { AffiliateImpression } from "@/components/AffiliateImpression";

type AffiliateOfferProps = {
  name: string;
  summary: string;
  points: string[];
  note: string;
  href: string;
  trackingPixel: string;
  offer: string;
  placement: string;
  cta: string;
  featured?: boolean;
};

export function AffiliateOffer({
  name,
  summary,
  points,
  note,
  href,
  trackingPixel,
  offer,
  placement,
  cta,
  featured = false
}: AffiliateOfferProps) {
  return (
    <AffiliateImpression offer={offer} placement={placement} className={`border p-6 sm:p-8 ${featured ? "border-slate-950 bg-white shadow-[4px_4px_0_#241b24]" : "border-slate-200 bg-white"}`}>
      {featured ? <p className="text-xs font-black text-slate-500">最初に比較したい候補</p> : null}
      <h3 className={`${featured ? "mt-4" : ""} text-2xl font-black leading-tight text-slate-950`}>{name}</h3>
      <p className="mt-4 leading-8 text-slate-600">{summary}</p>
      <ul className="mt-5 grid gap-3 text-sm leading-7 text-slate-700">
        {points.map((point) => (
          <li key={point} className="flex gap-3 border-t border-slate-200 pt-3">
            <span className="font-black text-pink-700" aria-hidden="true">●</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-xs leading-6 text-slate-500">{note}</p>
      <AffiliateLink
        href={href}
        offer={offer}
        placement={placement}
        label={cta}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-pink-600 px-6 py-3 text-center text-sm font-black text-white transition hover:bg-pink-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-950 sm:w-auto"
      />
      {/* A8.net conversion measurement pixel supplied with the selected creative. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={trackingPixel} width="1" height="1" alt="" aria-hidden="true" className="absolute h-px w-px opacity-0" />
    </AffiliateImpression>
  );
}
