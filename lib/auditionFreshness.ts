import type { Audition } from "@/lib/auditions";

const DATE_PATTERN = /(20\d{2})\D{0,3}(1[0-2]|0?[1-9])\D{0,3}(3[01]|[12]\d|0?[1-9])/u;

function toDayNumber(year: number, month: number, day: number) {
  return Math.floor(Date.UTC(year, month - 1, day) / 86_400_000);
}

export function getJapanToday(reference = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(reference);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day)
  };
}

export function parseAuditionDeadline(value: string) {
  const match = value.match(DATE_PATTERN);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() + 1 !== month ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return { year, month, day, dayNumber: toDayNumber(year, month, day) };
}

export function daysUntilDeadline(audition: Audition, reference = new Date()) {
  const deadline = parseAuditionDeadline(audition.deadline);
  if (!deadline) return null;

  const today = getJapanToday(reference);
  return deadline.dayNumber - toDayNumber(today.year, today.month, today.day);
}

export function isOpenAudition(audition: Audition, reference = new Date()) {
  const days = daysUntilDeadline(audition, reference);
  return days === null || days >= 0;
}

export function isClosingThisMonth(audition: Audition, reference = new Date()) {
  const deadline = parseAuditionDeadline(audition.deadline);
  if (!deadline || !isOpenAudition(audition, reference)) return false;

  const today = getJapanToday(reference);
  return deadline.year === today.year && deadline.month === today.month;
}

export function isClosingWithinDays(
  audition: Audition,
  days: number,
  reference = new Date()
) {
  const remaining = daysUntilDeadline(audition, reference);
  return remaining !== null && remaining >= 0 && remaining <= days;
}

export function sortByDeadline(auditions: Audition[]) {
  return [...auditions].sort((left, right) => {
    const leftDeadline = parseAuditionDeadline(left.deadline)?.dayNumber ?? Number.MAX_SAFE_INTEGER;
    const rightDeadline = parseAuditionDeadline(right.deadline)?.dayNumber ?? Number.MAX_SAFE_INTEGER;
    return leftDeadline - rightDeadline;
  });
}

export function sortByPublishedAt(auditions: Audition[]) {
  return [...auditions].sort((left, right) => {
    const leftTime = left.publishedAt ? Date.parse(left.publishedAt) : 0;
    const rightTime = right.publishedAt ? Date.parse(right.publishedAt) : 0;
    return rightTime - leftTime;
  });
}

export function formatJapanYearMonth(reference = new Date()) {
  const today = getJapanToday(reference);
  return `${today.year}年${today.month}月`;
}

export function formatJapanDate(reference = new Date()) {
  const today = getJapanToday(reference);
  return `${today.year}年${today.month}月${today.day}日`;
}
