export function getApplyUrl(slug: string) {
  const liffId = process.env.NEXT_PUBLIC_LINE_LIFF_ID;
  const encodedSlug = encodeURIComponent(slug);

  if (!liffId) {
    return `/apply/${encodedSlug}`;
  }

  return `https://liff.line.me/${liffId}/${encodedSlug}`;
}
