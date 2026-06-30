"use server";

import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function getNullableString(formData: FormData, key: string) {
  const value = getString(formData, key);
  return value.length > 0 ? value : null;
}

function getBoolean(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

export async function createSubmission(formData: FormData) {
  const payload = {
    status: "pending",

    group_name: getString(formData, "group_name"),
    title: getString(formData, "title"),
    summary: getString(formData, "summary"),
    description: getString(formData, "description"),

    area: getString(formData, "area"),
    deadline: getString(formData, "deadline"),
    age: getString(formData, "age"),

    is_beginner_ok: getBoolean(formData, "is_beginner_ok"),
    is_high_school_ok: getBoolean(formData, "is_high_school_ok"),
    is_no_cost: getBoolean(formData, "is_no_cost"),

    cost: getString(formData, "cost"),
    reward: getString(formData, "reward"),
    experience: getString(formData, "experience"),
    student: getString(formData, "student"),

    activity_content: getString(formData, "activity_content"),
    selection_flow: getString(formData, "selection_flow"),
    application_method: getString(formData, "application_method"),

    line_url: getNullableString(formData, "line_url"),
    form_url: getNullableString(formData, "form_url"),
    official_site_url: getNullableString(formData, "official_site_url"),
    official_x_url: getNullableString(formData, "official_x_url"),
    official_instagram_url: getNullableString(formData, "official_instagram_url"),
    official_tiktok_url: getNullableString(formData, "official_tiktok_url"),

    organizer_name: getString(formData, "organizer_name"),
    organizer_email: getString(formData, "organizer_email"),
    organizer_phone: getNullableString(formData, "organizer_phone")
  };

  const requiredKeys = [
    "group_name",
    "title",
    "summary",
    "description",
    "area",
    "deadline",
    "age",
    "cost",
    "reward",
    "experience",
    "student",
    "activity_content",
    "selection_flow",
    "application_method",
    "organizer_name",
    "organizer_email"
  ] as const;

  for (const key of requiredKeys) {
    if (!payload[key]) {
      throw new Error(`必須項目が未入力です: ${key}`);
    }
  }

  const agreed = formData.get("agreement") === "on";

  if (!agreed) {
    throw new Error("掲載条件への同意が必要です");
  }

  const { error } = await supabaseAdmin
    .from("audition_submissions")
    .insert(payload);

  if (error) {
    console.error(error);
    throw new Error("掲載依頼の送信に失敗しました");
  }

  redirect("/post/thanks");
}
