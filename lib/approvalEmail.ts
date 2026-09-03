import { siteConfig } from "@/lib/site";

type ApprovalEmailInput = {
  submissionId: string;
  organizerEmail: string;
  organizerName: string;
  groupName: string;
  title: string;
  slug: string;
};

export type ApprovalEmailResult = "sent" | "not-configured" | "missing-email" | "failed";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function sendApprovalEmail({
  submissionId,
  organizerEmail,
  organizerName,
  groupName,
  title,
  slug
}: ApprovalEmailInput): Promise<ApprovalEmailResult> {
  if (!organizerEmail) {
    return "missing-email";
  }

  const apiKey = process.env.CUSTOMERIO_APP_API_KEY;
  const from = process.env.CUSTOMERIO_EMAIL_FROM;

  if (!apiKey || !from) {
    console.warn(
      "Approval email skipped: CUSTOMERIO_APP_API_KEY or CUSTOMERIO_EMAIL_FROM is not set"
    );
    return "not-configured";
  }

  const apiBaseUrl =
    process.env.CUSTOMERIO_REGION?.toLowerCase() === "eu"
      ? "https://api-eu.customer.io"
      : "https://api.customer.io";

  const publicUrl = `${siteConfig.url}/idol-audition/${encodeURIComponent(slug)}`;
  const safeName = escapeHtml(organizerName || `${groupName} ご担当者`);
  const safeGroupName = escapeHtml(groupName);
  const safeTitle = escapeHtml(title);

  const text = `${organizerName || `${groupName} ご担当者`} 様

アイドルオーディションナビへの掲載が完了しました。

掲載募集：${title}
掲載URL：${publicUrl}

公式サイトや公式Xのプロフィール・募集投稿などで、掲載ページをご紹介いただけますと幸いです。

今後ともアイドルオーディションナビをよろしくお願いいたします。`;

  const html = `
    <div style="background:#f8fafc;padding:32px 16px;color:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:1.8">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:18px;padding:32px">
        <p>${safeName} 様</p>
        <h1 style="font-size:24px;line-height:1.4;margin:24px 0 12px">アイドルオーディションナビへの掲載が完了しました</h1>
        <p style="color:#475569">以下の募集を公開しました。</p>
        <div style="background:#fdf2f8;border-radius:14px;padding:18px;margin:20px 0">
          <p style="margin:0;color:#9d174d;font-size:13px;font-weight:700">${safeGroupName}</p>
          <p style="margin:6px 0 0;font-weight:700">${safeTitle}</p>
        </div>
        <p style="margin:24px 0">
          <a href="${publicUrl}" style="display:inline-block;background:#ec4899;color:#ffffff;text-decoration:none;font-weight:700;border-radius:999px;padding:14px 24px">掲載ページを確認する</a>
        </p>
        <p>公式サイトや公式Xのプロフィール・募集投稿などで、掲載ページをご紹介いただけますと幸いです。</p>
        <p style="word-break:break-all;color:#475569">掲載URL：<a href="${publicUrl}" style="color:#db2777">${publicUrl}</a></p>
        <p style="margin-top:28px;color:#64748b;font-size:13px">今後ともアイドルオーディションナビをよろしくお願いいたします。</p>
      </div>
    </div>`;

  try {
    const response = await fetch(`${apiBaseUrl}/v1/send/email`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        transactional_message_id: "audition_listing_approved",
        auto_create: true,
        from,
        to: organizerEmail,
        identifiers: { email: organizerEmail },
        reply_to: process.env.CUSTOMERIO_EMAIL_REPLY_TO || undefined,
        subject: `【掲載完了】${title}｜アイドルオーディションナビ`,
        body: html,
        body_plain: text,
        message_data: {
          submission_id: submissionId,
          organizer_name: organizerName,
          group_name: groupName,
          audition_title: title,
          public_url: publicUrl
        },
        send_to_unsubscribed: true,
        tracked: true,
        queue_draft: false
      })
    });

    if (!response.ok) {
      console.error("Approval email failed", response.status, await response.text());
      return "failed";
    }

    return "sent";
  } catch (error) {
    console.error("Approval email failed", error);
    return "failed";
  }
}
