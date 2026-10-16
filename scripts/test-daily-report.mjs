import assert from "node:assert/strict";
import { reportPeriods, change, parseRows, createDailyReport } from "../lib/dailyReport.ts";

const p = reportPeriods(new Date("2026-10-16T00:00:00Z"));
assert.equal(p.date, "2026-10-15");
assert.equal(p.yesterday.since, "2026-10-14T15:00:00.000Z");
assert.equal(p.yesterday.until, "2026-10-15T14:59:59.999Z");
assert.equal(reportPeriods(new Date("2026-10-15T14:59:59Z")).date, "2026-10-14");
assert.equal(reportPeriods(new Date("2027-01-01T00:00:00Z")).date, "2026-12-31");
assert.equal(change(10, 5), "+100.0%");
assert.equal(change(1, 0), "前期間0のため増減率なし");
assert.throws(() => parseRows({data: [{visitors: 1}]}, "visits"));
assert.throws(() => parseRows({data: [{visitors: 1, pageviews: -1}]}, "visits"));
assert.deepEqual(parseRows({data: []}, "visits"), []);
const oldFetch = globalThis.fetch;
const oldToken = process.env.REPORT_VERCEL_TOKEN;
try {
  process.env.REPORT_VERCEL_TOKEN = "test-only";
  globalThis.fetch = async url => Response.json({ data: String(url).includes("/events/") ? [{visitors: 2, count: 2, eventName: "affiliate_click"}] : [{visitors: 111, pageviews: 484}] });
  const report = await createDailyReport(new Date("2026-10-16T00:00:00Z"));
  assert.ok(report.analyticsAvailable);
  assert.ok(report.text.includes("111訪問者／484PV"));
  assert.ok(report.text.includes("未取得（自動取得元が未連携）"));
  assert.ok(report.text.length < 5000);
  globalThis.fetch = async () => new Response("forbidden", {status:403});
  const unavailable = await createDailyReport();
  assert.equal(unavailable.analyticsAvailable, false);
  assert.ok(unavailable.text.includes("未取得（集計API HTTP 403）"));
  assert.ok(!unavailable.text.includes("0訪問者"));
} finally {
  globalThis.fetch = oldFetch;
  if (oldToken === undefined) delete process.env.REPORT_VERCEL_TOKEN;
  else process.env.REPORT_VERCEL_TOKEN = oldToken;
}
console.log("Daily report tests passed");
