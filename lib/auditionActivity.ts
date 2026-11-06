import calendarEvents from "../content/activity-calendar-2026-10.json" with { type: "json" };

export type ActivityEvent = {
  date: string;
  group: string;
  title: string;
  venue: string;
  performanceTime?: string;
  sourceUrl: string;
  kind?: string;
};

export type ActivityArchive = {
  month: string;
  events: ActivityEvent[];
};

// Official calendars supply the month; detailed X announcements supplement lonlium's placeholders.
// Announced events, not a verified attendance/working-day count. Never infer days off.
const event = (date: string, group: string, title: string, venue: string, account: string, post: string, performanceTime?: string): ActivityEvent => ({
  date: `2026-10-${date}`, group, title, venue,
  sourceUrl: `https://x.com/${account}/status/${post}`,
  ...(performanceTime ? { performanceTime } : {}),
});

const octoberEvents: Record<string, ActivityEvent[]> = {
  "nagoya-lonlium-new-member-2026": [
    event("22", "lonlium", "フェノメナPre.『超常現象』", "名古屋RAD HALL", "lonlium_", "2112855605690143040"),
    event("23", "lonlium", "Finally LIVE Tour2026『TAKEtoGIVE』", "名古屋HeartLand", "lonlium_", "2112855605690143040"),
    event("24", "lonlium", "LiVS presents『Don't Blink』", "NAGOYA MUJICA", "lonlium_", "2113619940486082730"),
    event("24", "lonlium", "Road To RAD JAM", "Zepp Nagoya", "lonlium_", "2113619940486082730"),
    event("25", "lonlium", "lonlium VS TRAST — PROMISE 2MAN TOUR", "名古屋Party'z", "lonlium_", "2113972214135681278"),
    event("28", "lonlium", "LONELY KIDS -HALLOWEEN SP-", "名古屋RADHALL", "lonlium_", "2114369337025069185"),
  ],
};

export function getAuditionActivity(slug: string): ActivityArchive | undefined {
  const events = [...((calendarEvents as Record<string, ActivityEvent[]>)[slug] ?? []), ...(slug === "nagoya-lonlium-new-member-2026" ? octoberEvents[slug] : [])];
  if (!events?.length) return undefined;
  return { month: "2026-10", events: [...events].sort((a, b) => a.date.localeCompare(b.date)) };
}

export function activityDateLabel(date: string): string {
  return new Intl.DateTimeFormat("ja-JP", { month: "numeric", day: "numeric", weekday: "short", timeZone: "Asia/Tokyo" }).format(new Date(`${date}T12:00:00+09:00`));
}
