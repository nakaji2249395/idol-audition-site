import { createClient } from "@supabase/supabase-js";

const CATEGORY_URL = "https://audition.nerim.info/idol.html";
const SOURCE_LABEL = "オーディションプラス提携掲載";
const IMPORT_EMAIL = "partner-import@idol-audition-navi.jp";
const TARGET_COUNT = Number(process.argv.find((arg) => arg.startsWith("--count="))?.split("=")[1] ?? 100);
const SHOULD_COMMIT = process.argv.includes("--commit");
const CONCURRENCY = 4;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Supabase environment variables are missing");
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false }
});

function decodeHtml(value = "") {
  const named = {
    amp: "&",
    apos: "'",
    gt: ">",
    hellip: "…",
    ldquo: "“",
    lt: "<",
    nbsp: " ",
    quot: '"',
    rdquo: "”"
  };

  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&([a-z]+);/gi, (entity, name) => named[name.toLowerCase()] ?? entity);
}

function htmlToText(value = "") {
  return decodeHtml(
    value
      .replace(/<script\b[\s\S]*?<\/script>/gi, "")
      .replace(/<style\b[\s\S]*?<\/style>/gi, "")
      .replace(/<br\s*\/?\s*>/gi, "\n")
      .replace(/<\/(p|div|li|ul|ol)>/gi, "\n")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractSection(html, heading) {
  const pattern = new RegExp(
    `<h[45][^>]*>\\s*${escapeRegExp(heading)}\\s*</h[45]>([\\s\\S]*?)(?=<h[45][^>]*>|<p[^>]*class=["']borderdot2|$)`,
    "i"
  );
  return pattern.exec(html)?.[1] ?? "";
}

function extractLinks(html, baseUrl) {
  return [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)]
    .map((match) => decodeHtml(match[1]).trim())
    .filter((href) => href && !href.startsWith("javascript:"))
    .map((href) => {
      if (href.startsWith("mailto:")) return href;
      try {
        return new URL(href, baseUrl).href;
      } catch {
        return href;
      }
    });
}

function normalize(value = "") {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/\[[^\]]+\]|【[^】]+】/g, "")
    .replace(/[\s\p{P}\p{S}]/gu, "");
}

function bigrams(value) {
  const normalized = normalize(value);
  const values = new Set();
  for (let index = 0; index < normalized.length - 1; index += 1) {
    values.add(normalized.slice(index, index + 2));
  }
  return values;
}

function similarity(left, right) {
  const a = bigrams(left);
  const b = bigrams(right);
  if (a.size === 0 || b.size === 0) return normalize(left) === normalize(right) ? 1 : 0;
  let intersection = 0;
  for (const value of a) {
    if (b.has(value)) intersection += 1;
  }
  return (2 * intersection) / (a.size + b.size);
}

function parseDeadline(value) {
  if (/随時|定員|決まり次第|なし|未定/.test(value)) {
    return { active: true, date: null };
  }

  const match = value.match(/(20\d{2})\s*[/.年-]\s*(\d{1,2})\s*[/.月-]\s*(\d{1,2})/);
  if (!match) return { active: true, date: null };

  const deadline = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]), 23, 59, 59);
  return { active: deadline >= new Date(), date: deadline };
}

function inferArea(title, content) {
  const titleRules = [
    [/大阪|関西|京都|兵庫|神戸|奈良|滋賀|和歌山/, "大阪・関西"],
    [/名古屋|愛知|東海|岐阜|三重|静岡/, "名古屋・愛知・東海"],
    [/福岡|九州|熊本|鹿児島|佐賀|長崎|宮崎|大分/, "福岡・九州"],
    [/札幌|北海道/, "北海道・札幌"],
    [/仙台|東北|宮城|福島|青森|岩手|秋田|山形/, "仙台・東北"],
    [/広島|山口|岡山|山陽/, "広島・中国地方"],
    [/東京|関東|神奈川|横浜|埼玉|千葉|栃木|群馬|茨城/, "東京・関東近郊"]
  ];

  for (const [pattern, area] of titleRules) {
    if (pattern.test(title)) return area;
  }

  for (const [pattern, area] of titleRules) {
    if (pattern.test(content)) return area;
  }

  return /全国|オンライン|地方在住/.test(content) ? "全国" : "東京・関東近郊";
}

function firstMatchingLines(value, pattern, fallback) {
  const lines = value.split("\n").map((line) => line.trim()).filter(Boolean);
  const matches = lines.filter((line) => pattern.test(line));
  return matches.length > 0 ? matches.slice(0, 4).join("\n") : fallback;
}

function isFreeText(value) {
  const compact = value.replace(/\s/g, "");
  return /^(なし|無料|0円)|費用(は|が)?かかりません|費用負担(は)?ありません/.test(compact);
}

function chooseApplicationLink(links, organizerLink) {
  const line = links.find((url) => /https?:\/\/(lin\.ee|line\.me)\//i.test(url));
  if (line) return { url: line, label: "公式LINEで応募する" };

  const form = links.find(
    (url) =>
      /^https?:/i.test(url) &&
      !/(x\.com|twitter\.com|instagram\.com|tiktok\.com|audition\.nerim\.info)/i.test(url)
  );
  if (form) return { url: form, label: "公式フォームで応募する" };

  const social = links.find((url) => /(x\.com|twitter\.com|instagram\.com)/i.test(url));
  if (social) return { url: social, label: "公式SNSから応募する" };

  const email = links.find((url) => url.startsWith("mailto:"));
  if (email) return { url: email, label: "メールで応募する" };

  if (organizerLink) return { url: organizerLink, label: "公式サイトで応募方法を確認する" };
  return { url: null, label: "応募方法を確認する" };
}

function parseListing(html, sourceUrl, rank) {
  const title = htmlToText(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "")
    .replace(/｜オーディションプラス.*$/, "")
    .trim();
  const organizerMatch = html.match(/<div[^>]*class=["'][^"']*rbox3[^"']*["'][^>]*>[\s\S]*?主催：([^、<]+)、カテゴリ：([^<]+)<\/div>/i);
  const organizerName = htmlToText(organizerMatch?.[1] ?? "");
  const category = htmlToText(organizerMatch?.[2] ?? "");
  const organizerHtml = extractSection(html, "主催");
  const organizerLinks = extractLinks(organizerHtml, sourceUrl).filter((url) => /^https?:/i.test(url));
  const organizerLink = organizerLinks[0] ?? null;
  const deadline = htmlToText(extractSection(html, "募集締切"));
  const description = htmlToText(extractSection(html, "募集内容"));
  const selectionFlow = htmlToText(extractSection(html, "オーディションのスケジュール"));
  const afterPassing = htmlToText(extractSection(html, "合格後のスケジュール"));
  const auditionCost = htmlToText(extractSection(html, "オーディション参加費"));
  const afterCost = htmlToText(extractSection(html, "合格後にかかる費用"));
  const reward = htmlToText(extractSection(html, "報酬や給与、賞金や賞品、手当など"));
  const eligibility = htmlToText(extractSection(html, "応募資格"));
  const applicationHtml = extractSection(html, "応募方法");
  const applicationMethod = htmlToText(applicationHtml);
  const inquiryHtml = extractSection(html, "お問い合わせ");
  const applicationLinks = extractLinks(`${applicationHtml}\n${inquiryHtml}`, sourceUrl);
  const application = chooseApplicationLink(applicationLinks, organizerLink);
  const metaDescription = decodeHtml(
    html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i)?.[1] ?? ""
  )
    .replace(/\s*主催：.*$/, "")
    .trim();
  const imageUrl = decodeHtml(
    html.match(/<img\b[^>]*src=["']([^"']*\/img\/audition\/[^"']+)["']/i)?.[1] ?? ""
  );
  const emails = htmlToText(`${applicationHtml}\n${inquiryHtml}`).match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) ?? [];
  const allText = `${title}\n${description}\n${eligibility}\n${applicationMethod}`;
  const ageMatch = eligibility.match(/(\d{1,2})\s*歳/);
  const officialXUrl = [organizerLink, ...applicationLinks].find((url) => /(x\.com|twitter\.com)/i.test(url ?? "")) ?? null;
  const officialInstagramUrl = [organizerLink, ...applicationLinks].find((url) => /instagram\.com/i.test(url ?? "")) ?? null;
  const officialTikTokUrl = [organizerLink, ...applicationLinks].find((url) => /tiktok\.com/i.test(url ?? "")) ?? null;
  const officialSiteUrl = organizerLink && !/(x\.com|twitter\.com|instagram\.com|tiktok\.com)/i.test(organizerLink)
    ? organizerLink
    : null;
  const lineUrl = applicationLinks.find((url) => /https?:\/\/(lin\.ee|line\.me)\//i.test(url)) ?? null;
  const formUrl = application.url && !lineUrl ? application.url : null;
  const sourceId = sourceUrl.match(/audition-(\d+)\.html/)?.[1];
  const summary = metaDescription || description.replace(/\n+/g, " ").slice(0, 180);

  if (!sourceId) throw new Error(`Source ID not found: ${sourceUrl}`);

  return {
    sourceUrl,
    sourceId,
    rank,
    active: parseDeadline(deadline).active,
    row: {
      status: "approved",
      slug: `audition-plus-${sourceId}`,
      is_pinned: false,
      is_featured: false,
      display_order: 1000 + rank,
      archived_at: null,
      group_name: organizerName || title,
      title,
      summary,
      description,
      area: inferArea(title, allText),
      deadline: deadline || "随時募集",
      age: eligibility || "募集要項をご確認ください。",
      is_beginner_ok: /未経験|経験不問|初心者/.test(allText),
      is_high_school_ok: /高校生|中学生/.test(eligibility) || (ageMatch ? Number(ageMatch[1]) <= 18 : false),
      is_no_cost: isFreeText(auditionCost) && isFreeText(afterCost),
      cost: `オーディション参加費\n${auditionCost || "募集要項をご確認ください。"}\n\n合格後にかかる費用\n${afterCost || "募集要項をご確認ください。"}`,
      reward: reward || "募集要項をご確認ください。",
      experience: firstMatchingLines(allText, /未経験|経験不問|初心者|経験者/, "経験条件は募集要項をご確認ください。"),
      student: firstMatchingLines(eligibility, /学生|高校|中学|学業|学校|未成年/, "学業との両立条件は募集要項をご確認ください。"),
      activity_content: afterPassing || description,
      selection_flow: selectionFlow || "選考方法は募集要項をご確認ください。",
      application_method: applicationMethod || "掲載元の募集要項をご確認ください。",
      line_url: lineUrl,
      form_url: formUrl,
      official_site_url: officialSiteUrl,
      official_x_url: officialXUrl,
      official_instagram_url: officialInstagramUrl,
      official_tiktok_url: officialTikTokUrl,
      organizer_name: organizerName || title,
      organizer_email: emails[0]?.toLowerCase() ?? IMPORT_EMAIL,
      organizer_phone: null,
      admin_note: `${SOURCE_LABEL}\n掲載元: ${sourceUrl}\n掲載元カテゴリ: ${category}\n掲載元順位: ${rank}`,
      image_url: imageUrl || null,
      image_path: null,
      application_reply_message: `${title}への応募案内です。\n\n${applicationMethod || "掲載元の募集要項をご確認ください。"}`,
      application_external_url: application.url,
      application_cta_label: application.label
    }
  };
}

function findDuplicate(parsed, existingRows, selectedRows) {
  const candidates = [...existingRows, ...selectedRows.map((item) => item.row)];
  const normalizedTitle = normalize(parsed.row.title);
  const normalizedGroup = normalize(parsed.row.group_name);

  return candidates.find((existing) => {
    if (existing.admin_note?.includes(parsed.sourceUrl)) return true;
    if (existing.slug === parsed.row.slug) return true;
    if (normalize(existing.title) === normalizedTitle) return true;

    const sameOrganizer = normalizedGroup.length >= 3 && normalize(existing.group_name) === normalizedGroup;
    return sameOrganizer && similarity(existing.title, parsed.row.title) >= 0.86;
  });
}

async function fetchHtml(url) {
  let lastError;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { "User-Agent": "IdolAuditionNaviPartnerImport/1.0" }
      });
      if (!response.ok) throw new Error(`${response.status} ${url}`);
      return await response.text();
    } catch (error) {
      lastError = error;
      if (attempt < 3) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 400));
      }
    }
  }

  throw lastError;
}

async function insertRows(rows) {
  let inserted = 0;
  for (let index = 0; index < rows.length; index += 20) {
    const chunk = rows.slice(index, index + 20).map((item) => item.row);
    const { data, error } = await supabase
      .from("audition_submissions")
      .insert(chunk)
      .select("id, slug, title");
    if (error) throw error;
    inserted += data?.length ?? 0;
    console.log(`Inserted ${inserted}/${rows.length}`);
  }
  return inserted;
}

async function main() {
  const [{ data: existingRows, error }, categoryHtml] = await Promise.all([
    supabase.from("audition_submissions").select("slug,title,group_name,admin_note,status"),
    fetchHtml(CATEGORY_URL)
  ]);
  if (error) throw error;

  const sourceLinks = [...categoryHtml.matchAll(/<a\b[^>]*href=["']([^"']*audition-[^"']+\.html)["']/gi)]
    .map((match) => new URL(decodeHtml(match[1]), CATEGORY_URL).href);
  const uniqueSourceLinks = [...new Set(sourceLinks)];
  const selected = [];
  const skipped = { expired: 0, duplicate: 0, invalid: 0 };
  const duplicateMatches = [];
  const failures = [];

  for (let offset = 0; offset < uniqueSourceLinks.length && selected.length < TARGET_COUNT; offset += CONCURRENCY) {
    const urls = uniqueSourceLinks.slice(offset, offset + CONCURRENCY);
    const results = await Promise.allSettled(
      urls.map(async (url, batchIndex) => parseListing(await fetchHtml(url), url, offset + batchIndex + 1))
    );

    for (const result of results) {
      if (result.status === "rejected") {
        skipped.invalid += 1;
        failures.push(String(result.reason));
        continue;
      }

      const parsed = result.value;
      if (!parsed.active) {
        skipped.expired += 1;
        continue;
      }

      const duplicate = findDuplicate(parsed, existingRows ?? [], selected);
      if (duplicate) {
        skipped.duplicate += 1;
        duplicateMatches.push({
          sourceRank: parsed.rank,
          sourceTitle: parsed.row.title,
          existingTitle: duplicate.title,
          existingSlug: duplicate.slug
        });
        continue;
      }

      selected.push(parsed);
      if (selected.length >= TARGET_COUNT) break;
    }

    if ((offset + CONCURRENCY) % 25 === 0 || selected.length >= TARGET_COUNT) {
      console.log(`Checked ${Math.min(offset + CONCURRENCY, uniqueSourceLinks.length)}/${uniqueSourceLinks.length}; selected ${selected.length}/${TARGET_COUNT}`);
    }
  }

  const missing = selected.flatMap((item) => {
    const required = ["title", "group_name", "description", "deadline", "application_method", "application_external_url"];
    const fields = required.filter((field) => !item.row[field]);
    return fields.length > 0 ? [{ rank: item.rank, title: item.row.title, fields }] : [];
  });

  console.log(JSON.stringify({
    mode: SHOULD_COMMIT ? "commit" : "dry-run",
    sourceListings: uniqueSourceLinks.length,
    existingListings: existingRows?.length ?? 0,
    selected: selected.length,
    skipped,
    duplicateMatches,
    missingRequiredForPublishing: missing,
    failures: failures.slice(0, 10),
    sample: selected.slice(0, 5).map((item) => ({
      rank: item.rank,
      title: item.row.title,
      organizer: item.row.group_name,
      area: item.row.area,
      deadline: item.row.deadline,
      apply: item.row.application_external_url,
      source: item.sourceUrl
    }))
  }, null, 2));

  if (selected.length !== TARGET_COUNT) {
    throw new Error(`Only ${selected.length} eligible listings were found; expected ${TARGET_COUNT}`);
  }
  if (missing.length > 0) {
    throw new Error(`${missing.length} listings are missing publishing fields`);
  }

  if (SHOULD_COMMIT) {
    const inserted = await insertRows(selected);
    console.log(`Import complete: ${inserted} listings inserted`);
  } else {
    console.log("Dry run complete. Re-run with --commit to insert these listings.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
