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

// Official calendars take precedence; X-only archives remain where no calendar was verified.
// Announced events, not a verified attendance/working-day count. Never infer days off.
const event = (date: string, group: string, title: string, venue: string, account: string, post: string, performanceTime?: string): ActivityEvent => ({
  date: `2026-10-${date}`, group, title, venue,
  sourceUrl: `https://x.com/${account}/status/${post}`,
  ...(performanceTime ? { performanceTime } : {}),
});

const octoberEvents: Record<string, ActivityEvent[]> = {
  "osaka-mousou-heroine-new-member-2026": [
    { date: "2026-10-06", group: "妄想ヒロイン", title: "メディアプラス -Media Plus-", venue: "心斎橋KuRaGe", performanceTime: "20:40–21:00", sourceUrl: "https://timetreeapp.com/public_calendars/melucharm/events/3051638103281109982?monthly=2026-10-01", kind: "live" },
    event("29", "妄想ヒロイン", "せんぱに！vol.1", "Fairytales OSAKA", "MSHIROINE", "2115655297759101117", "19:00–19:20"),
    event("31", "妄想ヒロイン", "IDOL TRIBE", "うえほんまちハイハイタウン", "MSHIROINE", "2115801433241182474"),
  ],
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
  const events = (calendarEvents as Record<string, ActivityEvent[]>)[slug] ?? octoberEvents[slug];
  if (!events?.length) return undefined;
  return { month: "2026-10", events: [...events].sort((a, b) => a.date.localeCompare(b.date)) };
}

export function activityDateLabel(date: string): string {
  return new Intl.DateTimeFormat("ja-JP", { month: "numeric", day: "numeric", weekday: "short", timeZone: "Asia/Tokyo" }).format(new Date(`${date}T12:00:00+09:00`));
}
