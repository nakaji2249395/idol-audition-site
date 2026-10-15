import { createHmac, timingSafeEqual } from "crypto";
import { siteConfig } from "@/lib/site";

const HTTP_URL_PATTERN = /https?:\/\/[^\s<>"'「」『』【】]+/giu;
const TRAILING_PUNCTUATION_PATTERN = /[.,!?;:、。！？；：)）\]】}〉》]+$/u;

export type ApplicationUrlCandidate = {
  url: string;
  source: string;
};

function trimUrlPunctuation(value: string) {
  return value.replace(TRAILING_PUNCTUATION_PATTERN, "");
}

export function normalizeApplicationDestination(value: string) {
  const trimmed = trimUrlPunctuation(value.trim());

  try {
    const url = new URL(trimmed);

    if (!['http:', 'https:', 'mailto:'].includes(url.protocol)) {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}

export function extractHttpUrls(value: string | null | undefined) {
  if (!value) return [];

  return Array.from(value.matchAll(HTTP_URL_PATTERN), (match) =>
    trimUrlPunctuation(match[0])
  ).filter((url) => Boolean(normalizeApplicationDestination(url)));
}

export function buildApplicationUrlCandidates(input: {
  applicationMethod?: string | null;
  applicationExternalUrl?: string | null;
  lineUrl?: string | null;
  formUrl?: string | null;
  officialSiteUrl?: string | null;
  officialXUrl?: string | null;
}) {
  const candidates: ApplicationUrlCandidate[] = [];
  const seen = new Set<string>();

  const add = (url: string | null | undefined, source: string) => {
    if (!url) return;

    const normalized = normalizeApplicationDestination(url);
    if (!normalized || seen.has(normalized)) return;

    seen.add(normalized);
    candidates.push({ url: normalized, source });
  };

  add(input.applicationExternalUrl, "現在設定されている応募先URL");
  extractHttpUrls(input.applicationMethod).forEach((url) =>
    add(url, "応募方法に記載されたURL")
  );
  add(input.lineUrl, "LINE応募URL");
  add(input.formUrl, "フォーム応募URL");
  add(input.officialSiteUrl, "公式サイトURL");
  add(input.officialXUrl, "公式X URL");

  return candidates;
}

export function applicationCtaLabel(destination: string) {
  const normalized = normalizeApplicationDestination(destination);
  if (!normalized) return "応募手続きを続ける";

  if (normalized.startsWith("mailto:")) return "メールで応募を続ける";

  const hostname = new URL(normalized).hostname.toLowerCase();
  if (hostname === "lin.ee" || hostname.endsWith("line.me")) {
    return "公式LINEで応募を続ける";
  }
  if (hostname === "x.com" || hostname === "twitter.com") {
    return "公式Xで応募を続ける";
  }

  return "応募フォームを開く";
}

function trackingSecret() {
  const secret = process.env.APPLICATION_TRACKING_SECRET || process.env.LINE_CHANNEL_SECRET;

  if (!secret) {
    throw new Error("APPLICATION_TRACKING_SECRET or LINE_CHANNEL_SECRET is not set");
  }

  return secret;
}

export function signApplicationTrackingId(applicationId: string) {
  return createHmac("sha256", trackingSecret())
    .update(applicationId)
    .digest("base64url");
}

export function verifyApplicationTrackingSignature(applicationId: string, signature: string) {
  const expected = signApplicationTrackingId(applicationId);
  const expectedBuffer = Buffer.from(expected);
  const actualBuffer = Buffer.from(signature);

  return (
    expectedBuffer.length === actualBuffer.length &&
    timingSafeEqual(expectedBuffer, actualBuffer)
  );
}

export function buildApplicationTrackingUrl(applicationId: string) {
  const signature = signApplicationTrackingId(applicationId);
  return `${siteConfig.url}/go/application/${applicationId}?signature=${encodeURIComponent(signature)}`;
}

export function replaceSelectedApplicationUrl(
  message: string,
  selectedDestination: string,
  trackingUrl: string
) {
  const selected = normalizeApplicationDestination(selectedDestination);
  if (!selected) return message;

  return message.replace(HTTP_URL_PATTERN, (rawUrl) => {
    const cleaned = trimUrlPunctuation(rawUrl);
    const trailing = rawUrl.slice(cleaned.length);
    const normalized = normalizeApplicationDestination(cleaned);

    return normalized === selected ? `${trackingUrl}${trailing}` : rawUrl;
  });
}
