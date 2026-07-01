"use server";

import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const IMAGE_BUCKET = "audition-images";
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

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

function getExtension(file: File) {
  const fromName = file.name.split(".").pop()?.toLowerCase();

  if (fromName && ["jpg", "jpeg", "png", "webp"].includes(fromName)) {
    return fromName === "jpeg" ? "jpg" : fromName;
  }

  if (file.type === "image/png") return "png";
  if (file.type === "image/webp") return "webp";
  return "jpg";
}

async function uploadImageIfExists(formData: FormData) {
  const image = formData.get("image");

  if (!(image instanceof File) || image.size === 0) {
    return {
      image_url: null,
      image_path: null
    };
  }

  if (!image.type.startsWith("image/")) {
    throw new Error("画像ファイルを選択してください");
  }

  if (!["image/jpeg", "image/png", "image/webp"].includes(image.type)) {
    throw new Error("画像はjpg、png、webpのみ対応しています");
  }

  if (image.size > MAX_IMAGE_SIZE) {
    throw new Error("画像サイズは5MB以内にしてください");
  }

  const extension = getExtension(image);
  const imagePath = `submissions/${new Date().toISOString().slice(0, 10)}/${randomUUID()}.${extension}`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from(IMAGE_BUCKET)
    .upload(imagePath, image, {
      contentType: image.type,
      cacheControl: "31536000",
      upsert: false
    });

  if (uploadError) {
    console.error(uploadError);
    throw new Error("画像のアップロードに失敗しました");
  }

  const { data } = supabaseAdmin.storage
    .from(IMAGE_BUCKET)
    .getPublicUrl(imagePath);

  return {
    image_url: data.publicUrl,
    image_path: imagePath
  };
}

export async function createSubmission(formData: FormData) {
  const uploadedImage = await uploadImageIfExists(formData);

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
    organizer_phone: getNullableString(formData, "organizer_phone"),

    image_url: uploadedImage.image_url,
    image_path: uploadedImage.image_path
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
