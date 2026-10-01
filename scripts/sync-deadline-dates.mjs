import { createClient } from "@supabase/supabase-js";

const SHOULD_COMMIT = process.argv.includes("--commit");
const VISIBLE_TEXT_FIELDS = [
  "summary",
  "description",
  "activity_content",
  "selection_flow",
  "application_method",
  "application_reply_message",
  "age",
  "cost",
  "reward",
  "experience",
  "student"
];

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Supabase environment variables are missing");
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false }
});

const FULL_DATE_PATTERN = /(20\d{2})\s*([/.年-])\s*(\d{1,2})\s*([/.月-])\s*(\d{1,2})(\s*日)?/g;
const PARTIAL_DATE_PATTERN = /(\d{1,2})\s*([/.月])\s*(\d{1,2})(\s*日)?/g;
const DEADLINE_WORD_PATTERN = /締切|〆切|応募期限|募集期限|受付期限|受付終了/;
const PERIOD_WORD_PATTERN = /応募期間|募集期間|受付期間/;
const END_SUFFIX_PATTERN = /^\s*(?:\([^)]*\)|（[^）]*）)?\s*(?:まで|迄|締切|〆切|受付終了)/;
const START_SUFFIX_PATTERN = /^\s*(?:\([^)]*\)|（[^）]*）)?\s*(?:から|より)?\s*(?:応募)?受付開始/;

function toDateValue(year, month, day) {
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return {
    year,
    month,
    day,
    key: year * 10000 + month * 100 + day
  };
}

function overlaps(match, ranges) {
  const start = match.index;
  const end = start + match[0].length;
  return ranges.some((range) => start < range.end && end > range.start);
}

function extractDates(line, fallbackYear) {
  const dates = [];
  const occupied = [];

  for (const match of line.matchAll(FULL_DATE_PATTERN)) {
    const value = toDateValue(Number(match[1]), Number(match[3]), Number(match[5]));
    if (!value) continue;

    const entry = {
      ...value,
      index: match.index,
      length: match[0].length,
      raw: match[0],
      format: match[2] === "年" ? "ja-full" : match[2] === "-" ? "dash-full" : "slash-full"
    };
    dates.push(entry);
    occupied.push({ start: entry.index, end: entry.index + entry.length });
  }

  for (const match of line.matchAll(PARTIAL_DATE_PATTERN)) {
    if (overlaps(match, occupied)) continue;

    const previousFullDate = [...dates]
      .filter((date) => date.index < match.index)
      .sort((left, right) => right.index - left.index)[0];
    const year = previousFullDate?.year ?? fallbackYear;
    if (!year) continue;

    const value = toDateValue(year, Number(match[1]), Number(match[3]));
    if (!value) continue;

    dates.push({
      ...value,
      index: match.index,
      length: match[0].length,
      raw: match[0],
      format: match[2] === "月" ? "ja-partial" : "slash-partial"
    });
  }

  return dates.sort((left, right) => left.index - right.index);
}

function isDeadlineDate(line, date, dates) {
  const before = line.slice(Math.max(0, date.index - 45), date.index);
  const after = line.slice(date.index + date.length, date.index + date.length + 30);

  if (START_SUFFIX_PATTERN.test(after) && !END_SUFFIX_PATTERN.test(after)) return false;
  if (END_SUFFIX_PATTERN.test(after)) return true;
  if (DEADLINE_WORD_PATTERN.test(before)) return true;

  if (PERIOD_WORD_PATTERN.test(line) && dates.length >= 2) {
    return date.key === Math.max(...dates.map((item) => item.key));
  }

  return false;
}

function parseStructuredDeadline(value) {
  const dates = extractDates(String(value ?? ""), null);
  return dates.reduce(
    (latest, date) => (!latest || date.key > latest.key ? date : latest),
    null
  );
}

function collectDeadlineMentions(row) {
  const structured = parseStructuredDeadline(row.deadline);
  const mentions = [];

  if (structured) {
    for (const date of extractDates(String(row.deadline ?? ""), structured.year)) {
      mentions.push({ field: "deadline", lineIndex: 0, line: row.deadline, date });
    }
  }

  for (const field of VISIBLE_TEXT_FIELDS) {
    const lines = String(row[field] ?? "").split("\n");
    for (const [lineIndex, line] of lines.entries()) {
      const dates = extractDates(line, structured?.year ?? null);
      for (const date of dates) {
        if (isDeadlineDate(line, date, dates)) {
          mentions.push({ field, lineIndex, line, date });
        }
      }
    }
  }

  return mentions;
}

function formatDate(date, format) {
  if (format === "ja-full") return `${date.year}年${date.month}月${date.day}日`;
  if (format === "dash-full") {
    return `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;
  }
  if (format === "ja-partial") return `${date.month}月${date.day}日`;
  if (format === "slash-partial") return `${date.month}/${date.day}`;
  return `${date.year}/${date.month}/${date.day}`;
}

function replaceMention(line, mention, target) {
  return `${line.slice(0, mention.date.index)}${formatDate(target, mention.date.format)}${line.slice(mention.date.index + mention.date.length)}`;
}

function buildUpdates(row, mentions, target) {
  const updates = {};

  if (parseStructuredDeadline(row.deadline)?.key !== target.key) {
    updates.deadline = `${target.year}/${target.month}/${target.day}`;
  }

  for (const field of VISIBLE_TEXT_FIELDS) {
    const fieldMentions = mentions.filter(
      (mention) => mention.field === field && mention.date.key !== target.key
    );
    if (fieldMentions.length === 0) continue;

    const lines = String(row[field] ?? "").split("\n");
    const byLine = new Map();
    for (const mention of fieldMentions) {
      const values = byLine.get(mention.lineIndex) ?? [];
      values.push(mention);
      byLine.set(mention.lineIndex, values);
    }

    for (const [lineIndex, lineMentions] of byLine) {
      let line = lines[lineIndex];
      for (const mention of lineMentions.sort((left, right) => right.date.index - left.date.index)) {
        line = replaceMention(line, mention, target);
      }
      lines[lineIndex] = line;
    }
    updates[field] = lines.join("\n");
  }

  return updates;
}

async function main() {
  const selectFields = ["id", "slug", "title", "status", "deadline", ...VISIBLE_TEXT_FIELDS];
  const { data, error } = await supabase.from("audition_submissions").select(selectFields.join(","));
  if (error) throw error;

  const changes = [];
  for (const row of data ?? []) {
    const mentions = collectDeadlineMentions(row);
    const distinctDates = [...new Set(mentions.map((mention) => mention.date.key))];
    if (distinctDates.length < 2) continue;

    const target = mentions.reduce((latest, mention) =>
      mention.date.key > latest.key ? mention.date : latest
    , mentions[0].date);
    const updates = buildUpdates(row, mentions, target);
    if (Object.keys(updates).length === 0) continue;

    changes.push({
      id: row.id,
      slug: row.slug,
      title: row.title,
      status: row.status,
      target: `${target.year}-${String(target.month).padStart(2, "0")}-${String(target.day).padStart(2, "0")}`,
      fields: Object.keys(updates),
      evidence: mentions.map((mention) => ({
        field: mention.field,
        date: `${mention.date.year}-${String(mention.date.month).padStart(2, "0")}-${String(mention.date.day).padStart(2, "0")}`,
        line: mention.line
      })),
      before: Object.fromEntries(Object.keys(updates).map((field) => [field, row[field]])),
      after: updates
    });
  }

  console.log(JSON.stringify({
    mode: SHOULD_COMMIT ? "commit" : "dry-run",
    scanned: data?.length ?? 0,
    changed: changes.length,
    changes
  }, null, 2));

  if (!SHOULD_COMMIT) return;

  for (const change of changes) {
    const { error: updateError } = await supabase
      .from("audition_submissions")
      .update(change.after)
      .eq("id", change.id);
    if (updateError) throw updateError;
  }

  console.log(`Updated ${changes.length} listings.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
