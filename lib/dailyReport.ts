const DAY = 86_400_000;
const JST = 9 * 60 * 60 * 1000;
export type Period = { since: string; until: string };
export type MetricRow = Record<string, string | number | null>;
export type Result = { rows: MetricRow[]; error?: never } | { rows?: never; error: string };

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
  const [yesterday, sameWeekday, week, previousWeek, month, previousMonth, pages, sources, events, offers] = await Promise.all([
    analytics(p.yesterday, "environment"), analytics(p.sameWeekday, "environment"),
    analytics(p.week, "environment"), analytics(p.previousWeek, "environment"),
    analytics(p.month, "environment"), analytics(p.previousMonth, "environment"),
    analytics(p.week, "requestPath"), analytics(p.week, "referrerHostname"),
    analytics(p.yesterday, "eventName", "events"),
    analytics(p.week, "eventData/offer", "events", "eventName eq 'affiliate_click'")
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
    "【6. Google検索】\nSearch Console：未取得（API認証未設定）。検索語・表示回数・CTR・順位は未評価。検索データには反映遅延があるため、接続後もアクセスの昨日値とは期間を分けます。",
    `【7. 次の優先事項】\n① Search ConsoleとA8のデータ連携を完成させ、検索と成果の未取得を解消する。\n② ${current !== null && previous !== null && current < previous ? "上位ページの検索表示・CTRと流入元の減少を確認する。" : "集客上位ページの募集中情報・応募条件を保ち、2〜4週間単位で効果を見る。"}\n③ ${affiliateClicks !== null && affiliateClicks < 30 ? "広告クリックはまだ少数。広告の増設より掲載位置と案件の適合性を確認する。" : "広告表示数と案件別成果をそろえてから導線の良し悪しを判断する。"}\n※施策との因果関係は、この集計だけでは断定できません。`,
    "参照先\nhttps://vercel.com/nakajima2000/idol-audition-site/analytics\nhttps://search.google.com/search-console?resource_id=sc-domain:idol-audition-navi.jp\nhttps://media-console.a8.net/report/program/summary"
  ].join("\n\n");
  if (text.length > 5000) throw new Error("Report exceeds LINE text limit");
  return { date: p.date, text, analyticsAvailable: Boolean(yesterday.rows), sources: { yesterday, sameWeekday, week, previousWeek, month, previousMonth, pages, sources, events, offers } };
}
