"use server";

import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { clearAdminCookie, requireAdmin, setAdminCookie } from "@/lib/adminAuth";
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

function normalizeSlug(value: string, id: string) {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || `submission-${id}`;
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
    return null;
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

async function revalidateSubmissionPages(slug?: string | null) {
  revalidatePath("/");
  revalidatePath("/idol-audition");

  if (slug) {
    revalidatePath(`/idol-audition/${slug}`);
  }
}

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
  await requireAdmin();

  const id = String(formData.get("id") ?? "");

  if (!id) {
    throw new Error("id is required");
  }

  const { data: current } = await supabaseAdmin
    .from("audition_submissions")
    .select("slug")
    .eq("id", id)
    .single();

  const slug = current?.slug || `submission-${id}`;

  const { error } = await supabaseAdmin
    .from("audition_submissions")
    .update({
      status: "approved",
      slug,
      archived_at: null,
      updated_at: new Date().toISOString()
    })
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("承認に失敗しました");
  }

  await revalidateSubmissionPages(slug);
  redirect("/admin/submissions");
}

export async function rejectSubmission(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");

  const { data: current } = await supabaseAdmin
    .from("audition_submissions")
    .select("slug")
    .eq("id", id)
    .single();

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

  await revalidateSubmissionPages(current?.slug);
  redirect("/admin/submissions");
}

export async function archiveSubmission(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");

  const { data: current } = await supabaseAdmin
    .from("audition_submissions")
    .select("slug")
    .eq("id", id)
    .single();

  const { error } = await supabaseAdmin
    .from("audition_submissions")
    .update({
      status: "archived",
      archived_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("掲載停止に失敗しました");
  }

  await revalidateSubmissionPages(current?.slug);
  redirect("/admin/submissions");
}

export async function deleteSubmission(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");

  const { data: current } = await supabaseAdmin
    .from("audition_submissions")
    .select("slug, image_path")
    .eq("id", id)
    .single();

  if (current?.image_path) {
    await supabaseAdmin.storage
      .from(IMAGE_BUCKET)
      .remove([current.image_path]);
  }

  const { error } = await supabaseAdmin
    .from("audition_submissions")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("削除に失敗しました");
  }

  await revalidateSubmissionPages(current?.slug);
  redirect("/admin/submissions");
}

export async function updateSubmission(formData: FormData) {
  await requireAdmin();

  const id = getString(formData, "id");

  if (!id) {
    throw new Error("id is required");
  }

  const { data: current } = await supabaseAdmin
    .from("audition_submissions")
    .select("slug, image_path")
    .eq("id", id)
    .single();

  const uploadedImage = await uploadImageIfExists(formData);
  const removeImage = getBoolean(formData, "remove_image");

  const payload: Record<string, unknown> = {
    slug: normalizeSlug(getString(formData, "slug"), id),
    is_pinned: getBoolean(formData, "is_pinned"),
    is_featured: getBoolean(formData, "is_featured"),
    display_order: Number(getString(formData, "display_order")) || 100,

    status: getString(formData, "status"),

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

    updated_at: new Date().toISOString()
  };

  if (uploadedImage) {
    payload.image_url = uploadedImage.image_url;
    payload.image_path = uploadedImage.image_path;

    if (current?.image_path) {
      await supabaseAdmin.storage
        .from(IMAGE_BUCKET)
        .remove([current.image_path]);
    }
  }

  if (removeImage) {
    payload.image_url = null;
    payload.image_path = null;

    if (current?.image_path) {
      await supabaseAdmin.storage
        .from(IMAGE_BUCKET)
        .remove([current.image_path]);
    }
  }

  const { error } = await supabaseAdmin
    .from("audition_submissions")
    .update(payload)
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("更新に失敗しました。slugが重複している可能性があります。");
  }

  await revalidateSubmissionPages(String(payload.slug));
  await revalidateSubmissionPages(current?.slug);
  redirect(`/admin/submissions/${id}`);
}
