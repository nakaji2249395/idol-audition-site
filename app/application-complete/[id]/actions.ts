"use server";

import { redirect } from "next/navigation";
import { verifyApplicationTrackingSignature } from "@/lib/applicationTracking";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function markApplicationComplete(formData: FormData) {
  const applicationId = String(formData.get("application_id") ?? "").trim();
  const signature = String(formData.get("signature") ?? "").trim();

  if (!applicationId || !signature || !verifyApplicationTrackingSignature(applicationId, signature)) {
    redirect("/idol-audition?application-complete=invalid");
  }

  const { error } = await supabaseAdmin
    .from("audition_applications")
    .update({
      completed_at: new Date().toISOString(),
      status: "completed"
    })
    .eq("id", applicationId);

  if (error) {
    console.error("Application completion update failed", error);
    redirect(`/application-complete/${applicationId}?signature=${encodeURIComponent(signature)}&error=1`);
  }

  redirect(`/application-complete/${applicationId}?signature=${encodeURIComponent(signature)}&completed=1`);
}
