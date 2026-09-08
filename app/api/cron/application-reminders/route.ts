import { NextResponse } from "next/server";
import { buildApplicationTrackingUrl } from "@/lib/applicationTracking";
import { pushLineTextMessage } from "@/lib/line";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

type ReminderCandidate = {
  id: string;
  audition_slug: string;
  audition_title: string;
  line_user_id: string;
};

function deadlineHasPassed(value: string) {
  const match = value.match(/(20\d{2})[\/年-](\d{1,2})[\/月-](\d{1,2})/);
  if (!match) return false;

  const [, year, month, day] = match;
  const deadline = new Date(
    `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T23:59:59+09:00`
  );

  return deadline.getTime() < Date.now();
}

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    console.error("CRON_SECRET is not set");
    return NextResponse.json({ ok: false, message: "Cron is not configured" }, { status: 503 });
  }

  if (request.headers.get("authorization") !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { data, error } = await supabaseAdmin
    .from("audition_applications")
    .select("id, audition_slug, audition_title, line_user_id")
    .not("application_external_url", "is", null)
    .not("guide_sent_at", "is", null)
    .lte("guide_sent_at", cutoff)
    .is("external_clicked_at", null)
    .is("reminder_attempted_at", null)
    .order("guide_sent_at", { ascending: true })
    .limit(50);

  if (error) {
    console.error("Application reminder candidates lookup failed", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const candidates = (data ?? []) as ReminderCandidate[];
  const slugs = [...new Set(candidates.map((candidate) => candidate.audition_slug))];
  const { data: submissions, error: submissionsError } = await supabaseAdmin
    .from("audition_submissions")
    .select("slug, status, deadline")
    .in("slug", slugs.length > 0 ? slugs : ["__none__"]);

  if (submissionsError) {
    console.error("Application reminder submissions lookup failed", submissionsError);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const submissionMap = new Map((submissions ?? []).map((item) => [item.slug, item]));
  let sent = 0;
  let failed = 0;
  let skipped = 0;

  for (const candidate of candidates) {
    const submission = submissionMap.get(candidate.audition_slug);

    if (!submission || submission.status !== "approved" || deadlineHasPassed(submission.deadline)) {
      skipped += 1;
      continue;
    }

    const attemptedAt = new Date().toISOString();
    const { data: claimed, error: claimError } = await supabaseAdmin
      .from("audition_applications")
      .update({ reminder_attempted_at: attemptedAt })
      .eq("id", candidate.id)
      .is("external_clicked_at", null)
      .is("reminder_attempted_at", null)
      .select("id")
      .maybeSingle();

    if (claimError || !claimed) {
      if (claimError) console.error("Application reminder claim failed", claimError);
      skipped += 1;
      continue;
    }

    const trackingUrl = buildApplicationTrackingUrl(candidate.id);
    const message = [
      "⏰ 応募手続きはお済みですか？",
      "",
      `「${candidate.audition_title}」について、アイドルオーディションナビからお送りした応募先リンクがまだ開かれていないようです👀`,
      "",
      "募集期限前に、応募先への必要事項の送信をお忘れなく✨",
      "👇応募手続きを続ける",
      trackingUrl
    ].join("\n");

    try {
      await pushLineTextMessage({ to: candidate.line_user_id, text: message });

      const sentAt = new Date().toISOString();
      await Promise.all([
        supabaseAdmin
          .from("audition_applications")
          .update({ reminder_sent_at: sentAt, reminder_error: null })
          .eq("id", candidate.id),
        supabaseAdmin.from("line_messages").insert({
          line_user_id: candidate.line_user_id,
          application_id: candidate.id,
          body: message,
          status: "sent",
          error_message: null,
          sent_by: "reminder_cron"
        })
      ]);
      sent += 1;
    } catch (sendError) {
      const errorMessage =
        sendError instanceof Error ? sendError.message : "LINE reminder send failed";
      await Promise.all([
        supabaseAdmin
          .from("audition_applications")
          .update({ reminder_error: errorMessage })
          .eq("id", candidate.id),
        supabaseAdmin.from("line_messages").insert({
          line_user_id: candidate.line_user_id,
          application_id: candidate.id,
          body: message,
          status: "failed",
          error_message: errorMessage,
          sent_by: "reminder_cron"
        })
      ]);
      failed += 1;
    }
  }

  console.log(JSON.stringify({
    level: "info",
    message: "Application reminder cron completed",
    candidates: candidates.length,
    sent,
    failed,
    skipped
  }));

  return NextResponse.json({ ok: true, candidates: candidates.length, sent, failed, skipped });
}
