"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { clearAdminCookie, setAdminCookie } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function loginAdmin(formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (password !== process.env.ADMIN_PASSWORD) {
    redirect("/admin?error=1");
  }

  await setAdminCookie();
  redirect("/admin/submissions");
}

export async function logoutAdmin() {
  await clearAdminCookie();
  redirect("/admin");
}

export async function approveSubmission(formData: FormData) {
  const id = String(formData.get("id") ?? "");

  if (!id) {
    throw new Error("id is required");
  }

  const { error } = await supabaseAdmin
    .from("audition_submissions")
    .update({
      status: "approved",
      updated_at: new Date().toISOString()
    })
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("承認に失敗しました");
  }

  revalidatePath("/");
  revalidatePath("/idol-audition");
  revalidatePath(`/idol-audition/submission-${id}`);
  redirect("/admin/submissions");
}

export async function rejectSubmission(formData: FormData) {
  const id = String(formData.get("id") ?? "");

  if (!id) {
    throw new Error("id is required");
  }

  const { error } = await supabaseAdmin
    .from("audition_submissions")
    .update({
      status: "rejected",
      updated_at: new Date().toISOString()
    })
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("却下に失敗しました");
  }

  revalidatePath("/");
  revalidatePath("/idol-audition");
  redirect("/admin/submissions");
}
