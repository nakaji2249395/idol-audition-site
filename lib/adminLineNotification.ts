import { formatJstDateTime } from "@/lib/dateTime";
import { pushLineTextMessage } from "@/lib/line";
import { siteConfig } from "@/lib/site";

async function pushAdminNotification(text: string) {
  const adminLineUserId = process.env.ADMIN_LINE_USER_ID;

  if (!adminLineUserId) {
    console.warn("ADMIN_LINE_USER_ID is not set; admin LINE notification was skipped");
    return;
  }

  await pushLineTextMessage({
    to: adminLineUserId,
    text
  });
}

export async function notifyNewApplication({
  applicationId,
  auditionTitle,
  applicantName,
  createdAt
}: {
  applicationId: string;
  auditionTitle: string;
  applicantName: string | null;
  createdAt: string;
}) {
  await pushAdminNotification(
    [
      "【新しいLINE応募】",
      `募集：${auditionTitle}`,
      `応募者：${applicantName || "名前未取得"}`,
      `応募日時：${formatJstDateTime(createdAt)}（日本時間）`,
      "",
      `${siteConfig.url}/admin/applications/${applicationId}`
    ].join("\n")
  );
}

export async function notifyNewSubmission({
  submissionId,
  title,
  groupName,
  organizerName,
  createdAt
}: {
  submissionId: string;
  title: string;
  groupName: string;
  organizerName: string;
  createdAt: string;
}) {
  await pushAdminNotification(
    [
      "【新しい掲載希望】",
      `募集：${title}`,
      `グループ：${groupName}`,
      `担当者：${organizerName}`,
      `受付日時：${formatJstDateTime(createdAt)}（日本時間）`,
      "",
      `${siteConfig.url}/admin/submissions/${submissionId}`
    ].join("\n")
  );
}
