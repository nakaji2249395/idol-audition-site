import { createDailyReport, reportPeriods } from "@/lib/dailyReport";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return Response.json({ error: "Cron not configured" }, { status: 503 });
  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const to = process.env.ADMIN_LINE_USER_ID;
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!to || !token) return Response.json({ error: "LINE not configured" }, { status: 503 });
  const date = reportPeriods().date;
  const dryRun = new URL(request.url).searchParams.get("dryRun") === "1";
  try {
    if (dryRun) return Response.json(await createDailyReport(), { headers: { "Cache-Control": "no-store" } });
    const existing = await supabaseAdmin.from("daily_reports").select("*").eq("report_date", date).maybeSingle();
    if (existing.error) throw new Error("Report ledger unavailable");
    if (!existing.data) {
      const report = await createDailyReport();
      const inserted = await supabaseAdmin.from("daily_reports").upsert({ report_date: date, body: report.text, recipient: to }, { onConflict: "report_date", ignoreDuplicates: true });
      if (inserted.error) throw new Error("Report save failed");
    }
    const { data: row, error } = await supabaseAdmin.from("daily_reports").select("*").eq("report_date", date).single();
    if (error || !row) throw new Error("Report load failed");
    if (row.sent_at) return Response.json({ ok: true, skipped: "already_sent", date });
    // LINE retry keys expire after 24h. Never retry an old ambiguous delivery.
    if (Date.now() - Date.parse(row.created_at) > 23 * 60 * 60 * 1000) throw new Error("Delivery requires manual review");
    if (row.lease_at && Date.now() - Date.parse(row.lease_at) < 5 * 60 * 1000) {
      return Response.json({ ok: true, skipped: "in_progress", date });
    }
    const lease = new Date().toISOString();
    let claim = supabaseAdmin.from("daily_reports").update({ lease_at: lease }).eq("report_date", date).is("sent_at", null);
    claim = row.lease_at ? claim.eq("lease_at", row.lease_at) : claim.is("lease_at", null);
    const claimed = await claim.select("report_date").maybeSingle();
    if (claimed.error) throw new Error("Report claim failed");
    if (!claimed.data) return Response.json({ ok: true, skipped: "claimed_elsewhere", date });
    const response = await fetch("https://api.line.me/v2/bot/message/push", {
      method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", "X-Line-Retry-Key": row.retry_key },
      body: JSON.stringify({ to: row.recipient, messages: [{ type: "text", text: row.body }] }),
      signal: AbortSignal.timeout(20_000)
    });
    const accepted = response.ok || (response.status === 409 && response.headers.has("x-line-accepted-request-id"));
    if (!accepted) throw new Error(`LINE HTTP ${response.status}`);
    const saved = await supabaseAdmin.from("daily_reports").update({ sent_at: new Date().toISOString(), last_error: null }).eq("report_date", date).eq("lease_at", lease);
    if (saved.error) throw new Error("Delivery accepted but ledger update failed");
    console.log(JSON.stringify({ event: "daily_report_sent", date }));
    return Response.json({ ok: true, date });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Daily report failed";
    console.error(JSON.stringify({ event: "daily_report_failed", date, message }));
    if (!dryRun) await supabaseAdmin.from("daily_reports").update({ last_error: message }).eq("report_date", date).is("sent_at", null);
    return Response.json({ error: message }, { status: 500 });
  }
}
