export function getApplyUrl(slug: string) {
  const liffId = process.env.NEXT_PUBLIC_LINE_LIFF_ID;

  if (!liffId) {
    return `/apply?slug=${encodeURIComponent(slug)}`;
  }

  return `https://liff.line.me/${liffId}?slug=${encodeURIComponent(slug)}`;
}
