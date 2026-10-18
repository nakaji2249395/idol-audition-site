import assert from "node:assert/strict";
import { generateKeyPairSync } from "node:crypto";
import { reportPeriods, change, parseRows, createDailyReport, searchConsoleReport, parseSearchRows, shiftSearchDate } from "../lib/dailyReport.ts";

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
const oldGoogle = process.env.REPORT_GOOGLE_SERVICE_ACCOUNT_JSON;
try {
  delete process.env.REPORT_GOOGLE_SERVICE_ACCOUNT_JSON;
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
  assert.equal(shiftSearchDate("2027-01-01", -1), "2026-12-31");
  assert.throws(() => parseSearchRows({ rows: [{ clicks: 1 }] }));
  assert.throws(() => parseSearchRows({}));
  assert.deepEqual(parseSearchRows({ responseAggregationType: "byProperty" }), []);
  const { privateKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
  process.env.REPORT_GOOGLE_SERVICE_ACCOUNT_JSON = JSON.stringify({ client_email: "test@example.invalid", private_key: privateKey.export({ type: "pkcs8", format: "pem" }) });
  const requests = [];
  globalThis.fetch = async (url, options) => {
    if (String(url).includes("oauth2.googleapis.com")) {
      const claims = JSON.parse(Buffer.from(options.body.get("assertion").split(".")[1], "base64url"));
      assert.equal(claims.scope, "https://www.googleapis.com/auth/webmasters.readonly");
      return Response.json({ access_token: "test-only" });
    }
    const body = JSON.parse(options.body);
    requests.push(body);
    assert.equal(body.dataState, "final");
    return Response.json({ rows: [{ keys: body.dimensions[0] === "date" ? ["2026-10-14"] : body.dimensions.length ? ["アイドルオーディション 30代"] : undefined, clicks: 10, impressions: 100, ctr: 0.1, position: 5 }] });
  };
  const search = await searchConsoleReport(new Date("2026-10-18T00:00:00Z"));
  assert.equal(search.available, true);
  assert.ok(search.text.includes("2026-10-08〜2026-10-14"));
  assert.ok(search.text.includes("CTR 10.0%"));
  assert.ok(requests.some(r => r.startDate === "2026-08-20" && r.endDate === "2026-09-16"));
  globalThis.fetch = async url => String(url).includes("oauth2.googleapis.com") ? Response.json({ access_token: "test-only" }) : new Response("secret error body", { status: 403 });
  const failed = await searchConsoleReport();
  assert.equal(failed.available, false);
  assert.ok(failed.text.includes("HTTP 403"));
  assert.ok(!failed.text.includes("secret error body"));
} finally {
  globalThis.fetch = oldFetch;
  if (oldToken === undefined) delete process.env.REPORT_VERCEL_TOKEN;
  else process.env.REPORT_VERCEL_TOKEN = oldToken;
  if (oldGoogle === undefined) delete process.env.REPORT_GOOGLE_SERVICE_ACCOUNT_JSON;
  else process.env.REPORT_GOOGLE_SERVICE_ACCOUNT_JSON = oldGoogle;
}
console.log("Daily report tests passed");
