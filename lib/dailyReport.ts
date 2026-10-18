import { createSign } from "node:crypto";

const DAY = 86_400_000;
const JST = 9 * 60 * 60 * 1000;
export type Period = { since: string; until: string };
export type MetricRow = Record<string, string | number | null>;
export type Result = { rows: MetricRow[]; error?: never } | { rows?: never; error: string };

type SearchRow = { keys?: string[]; clicks: number; impressions: number; ctr: number; position: number };
export function parseSearchRows(body: unknown): SearchRow[] {
  if (!body || typeof body !== "object") throw new Error("Invalid search response");
  const rows = (body as { rows?: unknown }).rows;
  if (rows === undefined && "responseAggregationType" in body) return [];
  if (!Array.isArray(rows)) throw new Error("Invalid search rows");
  for (const row of rows) {
    if (!row || !["clicks", "impressions", "ctr", "position"].every(k => typeof row[k] === "number" && Number.isFinite(row[k]) && row[k] >= 0)
      || row.ctr > 1 || (row.keys !== undefined && (!Array.isArray(row.keys) || !row.keys.every((k: unknown) => typeof k === "string")))) throw new Error("Invalid search metrics");
  }
  return rows;
}

export function shiftSearchDate(date: string, days: number) {
  return new Date(Date.parse(`${date}T12:00:00Z`) + days * DAY).toISOString().slice(0, 10);
}

export async function searchConsoleReport(now = new Date()): Promise<{ text: string; available: boolean }> {
  const raw = process.env.REPORT_GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) return { available: false, text: "Search Console：未取得（API認証未設定）" };
  try {
    const key = JSON.parse(raw);
    if (typeof key.client_email !== "string" || typeof key.private_key !== "string") throw new Error("Invalid credential");
    const issued = Math.floor(Date.now() / 1000);
    const encode = (value: object) => Buffer.from(JSON.stringify(value)).toString("base64url");
    const unsigned = `${encode({ alg: "RS256", typ: "JWT" })}.${encode({ iss: key.client_email, scope: "https://www.googleapis.com/auth/webmasters.readonly", aud: "https://oauth2.googleapis.com/token", iat: issued, exp: issued + 3600 })}`;
    const signature = createSign("RSA-SHA256").update(unsigned).sign(key.private_key, "base64url");
    const auth = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST", body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${signature}` }),
      cache: "no-store", signal: AbortSignal.timeout(10_000)
    });
    if (!auth.ok) return { available: false, text: `Search Console：未取得（Google認証 HTTP ${auth.status}）` };
    const token = (await auth.json()).access_token;
    if (typeof token !== "string" || !token) throw new Error("Invalid token response");
    const query = async (startDate: string, endDate: string, dimensions: string[] = [], rowLimit = 10) => {
      const response = await fetch("https://www.googleapis.com/webmasters/v3/sites/sc-domain%3Aidol-audition-navi.jp/searchAnalytics/query", {
        method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ startDate, endDate, dimensions, rowLimit, type: "web", dataState: "final" }),
        cache: "no-store", signal: AbortSignal.timeout(15_000)
      });
      if (!response.ok) throw new Error(`Search API HTTP ${response.status}`);
      return parseSearchRows(await response.json());
    };
    // Google search dates use Pacific Time, not the JST access-report dates.
    const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Los_Angeles", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
    const days = await query(shiftSearchDate(today, -14), shiftSearchDate(today, -1), ["date"], 20);
    const latest = days.map(row => row.keys?.[0]).filter((d): d is string => !!d && /^\d{4}-\d{2}-\d{2}$/.test(d)).sort().at(-1);
    if (!latest) return { available: false, text: "Search Console：直近14日間に確定データなし（0件とは判定しません）" };
    const [week, previousWeek, month, previousMonth, queries, pages] = await Promise.all([
      query(shiftSearchDate(latest, -6), latest), query(shiftSearchDate(latest, -13), shiftSearchDate(latest, -7)),
      query(shiftSearchDate(latest, -27), latest), query(shiftSearchDate(latest, -55), shiftSearchDate(latest, -28)),
      query(shiftSearchDate(latest, -6), latest, ["query"], 5), query(shiftSearchDate(latest, -6), latest, ["page"], 5)
    ]);
    const stats = (rows: SearchRow[]) => rows[0]
      ? `${rows[0].clicks}クリック／${rows[0].impressions}表示／CTR ${(rows[0].ctr * 100).toFixed(1)}%／平均${rows[0].position.toFixed(1)}位` : "データなし";
    const compare = (a: SearchRow[], b: SearchRow[]) => a[0] && b[0] ? `前期間比：クリック${change(a[0].clicks, b[0].clicks)}・表示${change(a[0].impressions, b[0].impressions)}・CTR ${((a[0].ctr - b[0].ctr) * 100).toFixed(1)}ポイント` : "比較データ不足";
    const ranking = (rows: SearchRow[]) => rows.map(row => `${(row.keys?.[0] || "不明").replace("https://idol-audition-navi.jp", "").slice(0, 90)}：${row.clicks}クリック／${row.impressions}表示／${row.position.toFixed(1)}位`).join("\n") || "データなし";
    return { available: true, text: [
      `確定データの最新記録日：${latest}（Google集計・米国太平洋時間）`,
      `直近7日：${shiftSearchDate(latest, -6)}〜${latest}\n${stats(week)}\n${compare(week, previousWeek)}`,
      `直近28日：${shiftSearchDate(latest, -27)}〜${latest}\n${stats(month)}\n${compare(month, previousMonth)}`,
      `検索語 上位5件（7日）\n${ranking(queries)}`, `検索流入ページ 上位5件（7日）\n${ranking(pages)}`,
      "※反映遅延があるため昨日のアクセスとは期間・時差が異なります。検索語は匿名化等で全件ではなく、合計とも一致しません。"
    ].join("\n\n") };
  } catch (error) {
    const safe = error instanceof Error && /^Search API HTTP \d{3}$/.test(error.message) ? error.message : "認証・通信・データ形式エラー";
    return { available: false, text: `Search Console：未取得（${safe}）。0件とは判断できません。` };
  }
}

export function reportPeriods(now = new Date()) {
  const today = new Date(now.getTime() + JST).toISOString().slice(0, 10);
  const end = Date.parse(`${today}T00:00:00+09:00`);
  const period = (days: number, offset = 0): Period => ({
    since: new Date(end - (days + offset) * DAY).toISOString(),
    until: new Date(end - offset * DAY - 1).toISOString()
  });
  return {
    date: new Date(end - DAY + JST).toISOString().slice(0, 10),
    yesterday: period(1), sameWeekday: period(1, 7),
    week: period(7), previousWeek: period(7, 7),
    month: period(30), previousMonth: period(30, 30)
  };
}

export function parseRows(body: unknown, kind: "visits" | "events"): MetricRow[] {
  if (!body || typeof body !== "object" || !("data" in body) || !Array.isArray(body.data)) {
    throw new Error("Unexpected analytics response");
  }
  const metric = kind === "visits" ? "pageviews" : "count";
  for (const row of body.data) {
    if (!row || typeof row !== "object" ||
      ![metric, "visitors"].every(key => typeof row[key] === "number" && Number.isFinite(row[key]) && row[key] >= 0)) {
      throw new Error("Unexpected analytics metrics");
    }
  }
  return body.data;
}

export async function analytics(period: Period, by: string, kind: "visits" | "events" = "visits", filter?: string): Promise<Result> {
  const token = process.env.REPORT_VERCEL_TOKEN;
  if (!token) return { error: "集計用トークン未設定" };
  const params = new URLSearchParams({
    projectId: "prj_ApWL1xe922Eg7cbaHAkB9C2jDqhJ",
    teamId: "team_bJZerZQfycUkUD666qYQSZnu",
    by, since: period.since, until: period.until, limit: "10",
    filter: filter ? `environment eq 'production' and (${filter})` : "environment eq 'production'"
  });
  try {
    const response = await fetch(`https://api.vercel.com/v1/query/web-analytics/${kind}/aggregate?${params}`, {
      headers: { Authorization: `Bearer ${token}` }, cache: "no-store", signal: AbortSignal.timeout(20_000)
    });
    if (!response.ok) return { error: `集計API HTTP ${response.status}` };
    return { rows: parseRows(await response.json(), kind) };
  } catch {
    return { error: "集計APIの通信またはデータ形式エラー" };
  }
}

export function change(current: number, previous: number) {
  if (previous === 0) return current === 0 ? "増減なし" : "前期間0のため増減率なし";
  const percent = ((current - previous) / previous) * 100;
  return `${percent > 0 ? "+" : ""}${percent.toFixed(1)}%`;
}
function total(result: Result, key: string): number | null {
  if (!result.rows) return null;
  return result.rows.reduce((sum, row) => sum + Number(row[key] ?? 0), 0);
}
function comparison(label: string, current: Result, previous: Result) {
  if (current.error) return `${label}：未取得（${current.error}）`;
  const visitors = total(current, "visitors")!;
  const pv = total(current, "pageviews")!;
  const prevVisitors = total(previous, "visitors");
  const prevPv = total(previous, "pageviews");
  return `${label}：${visitors.toLocaleString("ja-JP")}訪問者／${pv.toLocaleString("ja-JP")}PV\n比較：訪問者 ${prevVisitors === null ? "未取得" : change(visitors, prevVisitors)}・PV ${prevPv === null ? "未取得" : change(pv, prevPv)}`;
}
function ranking(result: Result, dimension: string, metric = "visitors") {
  if (result.error) return `未取得（${result.error}）`;
  if (!result.rows?.length) return "記録なし";
  const labels: Record<string, string> = {
    "/idol-audition/nagoya": "名古屋", "/idol-audition/osaka": "大阪",
    "/idol-audition/30s": "30代", "/idol-audition/high-school": "高校生",
    "/idol-audition/working-adult": "社会人", "/idol-audition/mikeiken": "未経験",
    "/idol-audition": "募集一覧", "/idol-audition/hiraeth-tokyo-new-member": "HIRAETH.Tokyo",
    "Audition apply start": "LINE応募開始", "Application guide result": "応募案内の処理結果イベント",
    affiliate_click: "広告クリック", nayutas_dance: "ナユタス・ダンス", wacca_music: "WACCA MUSIC SCHOOL", nayutas_vocal: "ナユタス・ボイトレ"
  };
  return result.rows.filter(row => row[dimension] !== "Others")
    .sort((a, b) => Number(b[metric]) - Number(a[metric])).slice(0, 7)
    .map(row => {
      const name = String(row[dimension] || "参照元なし／不明");
      return `${(labels[name] || name).slice(0, 110)}：${row[metric]}`;
    }).join("\n") || "個別項目なし";
}

export async function createDailyReport(now = new Date()) {
  const p = reportPeriods(now);
  const [yesterday, sameWeekday, week, previousWeek, month, previousMonth, pages, sources, events, offers, search] = await Promise.all([
    analytics(p.yesterday, "environment"), analytics(p.sameWeekday, "environment"),
    analytics(p.week, "environment"), analytics(p.previousWeek, "environment"),
    analytics(p.month, "environment"), analytics(p.previousMonth, "environment"),
    analytics(p.week, "requestPath"), analytics(p.week, "referrerHostname"),
    analytics(p.yesterday, "eventName", "events"),
    analytics(p.week, "eventData/offer", "events", "eventName eq 'affiliate_click'"), searchConsoleReport(now)
  ]);
  const current = total(week, "visitors");
  const previous = total(previousWeek, "visitors");
  const assessment = current === null || previous === null
    ? "アクセスの増減は集計不足のため判定できません。"
    : current > previous ? "直近7日間の訪問者数は前の7日間より増えています。単日の上下ではなく、この比較を継続して見ます。"
    : current < previous ? "直近7日間の訪問者数は前の7日間より減っています。検索表示・CTR・流入元を分けて原因確認が必要です。"
    : "直近7日間の訪問者数は前の7日間と同水準です。";
  const affiliateClicks = total(offers, "count");
  const text = [
    `📊 アイドルオーディションナビ 日次レポート\n対象日：${p.date}（日本時間）`,
    `【総評】\n${assessment}\nA8の成果データは未連携のため、収益性は判定していません。`,
    `【1. アクセス】\n${comparison("昨日／前週同曜日比", yesterday, sameWeekday)}\n\n${comparison("直近7日／前7日比", week, previousWeek)}\n\n${comparison("直近30日／前30日比", month, previousMonth)}\n※全て昨日までの完了日。期間内訪問者数は日別の単純合計ではありません。`,
    `【2. 集客ページ 上位7件】\n直近7日・ページ別訪問者数\n${ranking(pages, "requestPath")}\n※ページ間の重複あり。`,
    `【3. 参照元】\n直近7日・訪問者数\n${ranking(sources, "referrerHostname")}\n※参照元間の重複あり。「参照元なし」は新規の直接流入だけを意味しません。`,
    `【4. 応募・広告のサイト内行動】\n昨日のイベント回数\n${ranking(events, "eventName", "count")}\n※応募開始・案内のイベントは、募集主側への応募完了を意味しません。`,
    `【5. アフィリエイト】\nサイト計測の直近7日クリック：${affiliateClicks === null ? "未取得" : `${affiliateClicks}回`}\n案件別クリック\n${ranking(offers, "eventData/offer", "count")}\nA8側クリック・発生成果・発生報酬・確定報酬：未取得（自動取得元が未連携）。0円とは判断できません。\nサイト計測とA8計測は集計条件が異なります。`,
    `【6. Google検索】\n${search.text}`,
    `【7. 次の優先事項】\n① ${search.available ? "検索語・ページ別の表示とクリックを継続比較する。A8成果の自動取得は引き続き未連携。" : "Search Consoleの取得設定を確認し、A8成果の連携を進める。"}\n② ${current !== null && previous !== null && current < previous ? "上位ページの検索表示・CTRと流入元の減少を確認する。" : "集客上位ページの募集中情報・応募条件を保ち、2〜4週間単位で効果を見る。"}\n③ ${affiliateClicks !== null && affiliateClicks < 30 ? "広告クリックはまだ少数。広告の増設より掲載位置と案件の適合性を確認する。" : "広告表示数と案件別成果をそろえてから導線の良し悪しを判断する。"}\n※施策との因果関係は、この集計だけでは断定できません。`,
    "参照先\nhttps://vercel.com/nakajima2000/idol-audition-site/analytics\nhttps://search.google.com/search-console?resource_id=sc-domain:idol-audition-navi.jp\nhttps://media-console.a8.net/report/program/summary"
  ].join("\n\n");
  if (text.length > 5000) throw new Error("Report exceeds LINE text limit");
  return { date: p.date, text, analyticsAvailable: Boolean(yesterday.rows), searchAvailable: search.available, sources: { yesterday, sameWeekday, week, previousWeek, month, previousMonth, pages, sources, events, offers } };
}
