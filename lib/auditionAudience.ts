import type { Audition } from "@/lib/auditions";

function normalizeAgeText(value: string) {
  return value
    .normalize("NFKC")
    .replace(/[〜～~‐‑–—ー]/g, "-")
    .replace(/\s+/g, " ");
}

function ageRanges(value: string) {
  return Array.from(
    normalizeAgeText(value).matchAll(
      /(1[0-9]|2[0-9]|3[0-9])\s*(?:歳|才)?\s*-\s*(1[0-9]|2[0-9]|3[0-9])\s*(?:歳|才)?/g
    ),
    (match) => ({ min: Number(match[1]), max: Number(match[2]) })
  );
}

export function isAgeLimitNoneAudition(audition: Audition) {
  return /年齢(?:制限)?不問|年齢制限なし|年齢上限なし|上限なし/.test(
    normalizeAgeText(audition.age)
  );
}

export function isBeginnerFriendlyAudition(audition: Audition) {
  return /未経験(?:者)?(?:OK|可|歓迎)|経験不問|初心者歓迎/.test(
    `${audition.experience} ${audition.features.join(" ")} ${audition.description}`
  );
}

export function isTwentiesAudition(audition: Audition) {
  const age = normalizeAgeText(audition.age);

  if (isAgeLimitNoneAudition(audition)) return true;
  if (ageRanges(age).some(({ min, max }) => min <= 29 && max >= 20)) return true;
  if (/(?:1[89]|2[0-9])\s*(?:歳|才)\s*以上/.test(age)) return true;
  if (/20代|成人/.test(age)) return true;

  return false;
}

export function isThirtiesAudition(audition: Audition) {
  const age = normalizeAgeText(audition.age);

  if (isAgeLimitNoneAudition(audition)) return true;
  if (ageRanges(age).some(({ max }) => max >= 30)) return true;
  if (/(?:30|31|32|33|34|35|36|37|38|39)\s*(?:歳|才)(?!\s*未満)/.test(age)) return true;
  if (/(?:18|19|20|21|22|23|24|25|26|27|28|29|30)\s*(?:歳|才)\s*以上(?![^。\n]*(?:未満|以下|まで))/.test(age)) {
    return true;
  }

  return false;
}

export function isWorkingAdultAudition(audition: Audition) {
  const text = [audition.age, audition.student, audition.description].join(" ");

  return /社会人|会社員|ダブルワーク|仕事.{0,8}両立|就業者|フルタイム勤務者.{0,5}OK|アルバイト.{0,8}両立/.test(
    text
  );
}

export type AudienceLink = {
  href: string;
  label: string;
};

export function getAudienceLinks(audition: Audition): AudienceLink[] {
  const links: AudienceLink[] = [];

  if (
    isBeginnerFriendlyAudition(audition)
  ) {
    links.push({
      href: "/idol-audition/mikeiken",
      label: "未経験・初心者OKの募集"
    });
  }

  if (
    /費用なし|無料|かかりません|掛かりません/.test(
      `${audition.cost} ${audition.features.join(" ")}`
    )
  ) {
    links.push({ href: "/idol-audition/free", label: "費用なしの募集" });
  }

  if (`${audition.features.join(" ")} ${audition.student}`.match(/高校生|学生/)) {
    links.push({ href: "/idol-audition/high-school", label: "高校生OK" });
  }
  if (isTwentiesAudition(audition)) {
    links.push({ href: "/idol-audition/20s", label: "20代から探す" });
  }
  if (isThirtiesAudition(audition)) {
    links.push({ href: "/idol-audition/30s", label: "30代から探す" });
  }
  if (isAgeLimitNoneAudition(audition)) {
    links.push({ href: "/idol-audition/age-limit-none", label: "年齢制限なし" });
  }
  if (isWorkingAdultAudition(audition)) {
    links.push({ href: "/idol-audition/working-adult", label: "社会人向け" });
  }

  return links;
}
