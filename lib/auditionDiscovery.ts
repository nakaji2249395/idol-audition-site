import type { Audition } from "@/lib/auditions";

export type AuditionRegion = "tokyo" | "osaka" | "nagoya" | "fukuoka" | "nationwide";

export const auditionRegions: Record<
  AuditionRegion,
  { href: string; label: string; keywords: string[] }
> = {
  tokyo: {
    href: "/idol-audition/tokyo",
    label: "東京・関東",
    keywords: ["東京", "都内", "関東", "神奈川", "横浜", "埼玉", "千葉"]
  },
  osaka: {
    href: "/idol-audition/osaka",
    label: "大阪・関西",
    keywords: ["大阪", "関西", "兵庫", "神戸", "京都", "奈良", "滋賀", "和歌山"]
  },
  nagoya: {
    href: "/idol-audition/nagoya",
    label: "名古屋・東海",
    keywords: ["名古屋", "愛知", "東海", "岐阜", "三重", "静岡"]
  },
  fukuoka: {
    href: "/idol-audition/fukuoka",
    label: "福岡・九州",
    keywords: ["福岡", "九州", "博多", "天神", "北九州", "熊本", "佐賀", "長崎", "大分", "宮崎", "鹿児島"]
  },
  nationwide: {
    href: "/idol-audition/nationwide",
    label: "全国・オンライン",
    keywords: ["全国", "オンライン", "全国各地"]
  }
};

function getSearchableText(audition: Audition) {
  return [
    audition.title,
    audition.group,
    audition.area,
    audition.features.join(" ")
  ]
    .join(" ")
    .replaceAll("東京都", "東京");
}

export function isAuditionInRegion(audition: Audition, region: AuditionRegion) {
  const text = getSearchableText(audition);
  return auditionRegions[region].keywords.some((keyword) => text.includes(keyword));
}

export function getAuditionRegion(audition: Audition): AuditionRegion | null {
  return (Object.keys(auditionRegions) as AuditionRegion[]).find((region) =>
    isAuditionInRegion(audition, region)
  ) ?? null;
}

function similarityScore(current: Audition, candidate: Audition) {
  let score = 0;
  const currentRegion = getAuditionRegion(current);

  if (currentRegion && isAuditionInRegion(candidate, currentRegion)) {
    score += 20;
  }

  const candidateFeatures = new Set(candidate.features);
  score += current.features.filter((feature) => candidateFeatures.has(feature)).length * 2;

  if (
    current.experience.includes("未経験") &&
    candidate.experience.includes("未経験")
  ) {
    score += 2;
  }

  if (
    /無料|費用なし/.test(current.cost) &&
    /無料|費用なし/.test(candidate.cost)
  ) {
    score += 2;
  }

  return score;
}

export function getRelatedAuditions(
  current: Audition,
  auditions: Audition[],
  limit = 3
) {
  return auditions
    .filter((candidate) => candidate.slug !== current.slug)
    .map((candidate, index) => ({
      audition: candidate,
      index,
      score: similarityScore(current, candidate)
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .map(({ audition }) => audition);
}
