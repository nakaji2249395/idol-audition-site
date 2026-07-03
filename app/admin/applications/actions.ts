"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/adminAuth";
import { pushLineTextMessage } from "@/lib/line";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function sendLineMessageToApplicant(formData: FormData) {
  await requireAdmin();

  const applicationId = String(formData.get("application_id") ?? "").trim();
  const lineUserId = String(formData.get("line_user_id") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();

  if (!applicationId || !lineUserId || !body) {
    throw new Error("必要項目が不足しています");
  }

  let status = "sent";
  let errorMessage: string | null = null;

  try {
    await pushLineTextMessage({
      to: lineUserId,
      text: body
    });
  } catch (error) {
    console.error(error);
    status = "failed";
    errorMessage =
      error instanceof Error
        ? error.message
        : "LINE送信に失敗しました";
  }

  await supabaseAdmin.from("line_messages").insert({
    line_user_id: lineUserId,
    application_id: applicationId,
    body,
    status,
    error_message: errorMessage,
    sent_by: "admin"
  });

  revalidatePath(`/admin/applications/${applicationId}`);

  if (status === "failed") {
    redirect(`/admin/applications/${applicationId}?error=send`);
  }

  redirect(`/admin/applications/${applicationId}?sent=1`);
}
