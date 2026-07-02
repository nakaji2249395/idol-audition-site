import { auditions } from "@/lib/auditions";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import type { SubmissionRow } from "@/lib/submissions";

export type ApplyAuditionData = {
  slug: string;
  title: string;
  group: string;
  summary: string;
  imageUrl?: string;
  applicationReplyMessage: string;
  applicationExternalUrl?: string | null;
  applicationCtaLabel?: string | null;
};

export async function fetchApplyAuditionBySlug(slug: string): Promise<ApplyAuditionData | null> {
  const { data } = await supabaseAdmin
    .from("audition_submissions")
    .select("*")
    .eq("slug", slug)
    .eq("status", "approved")
    .single();

  if (data) {
    const row = data as SubmissionRow & {
      application_reply_message?: string | null;
      application_external_url?: string | null;
      application_cta_label?: string | null;
    };

    const externalUrl =
      row.application_external_url ||
      row.line_url ||
      row.form_url ||
      row.official_site_url ||
      null;

    return {
      slug: row.slug || `submission-${row.id}`,
      title: row.title,
      group: row.group_name,
      summary: row.summary,
      imageUrl: row.image_url ?? undefined,
      applicationExternalUrl: externalUrl,
      applicationCtaLabel: row.application_cta_label || "応募案内を見る",
      applicationReplyMessage:
        row.application_reply_message ||
        `${row.title}への応募案内です。下記の案内に沿って応募してください。`
    };
  }

  const staticAudition = auditions.find((item) => item.slug === slug);

  if (!staticAudition) {
    return null;
  }

  const firstMethod = staticAudition.applicationMethods[0];

  return {
    slug: staticAudition.slug,
    title: staticAudition.title,
    group: staticAudition.group,
    summary: staticAudition.summary,
    imageUrl: staticAudition.imageUrl,
    applicationExternalUrl: firstMethod?.url ?? null,
    applicationCtaLabel: firstMethod?.label ?? "応募案内を見る",
    applicationReplyMessage:
      `${staticAudition.title}への応募案内です。下記リンクから応募手続きを進めてください。`
  };
}

export async function fetchApplicationRows() {
  const { data: applications, error } = await supabaseAdmin
    .from("audition_applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  const lineUserIds = [...new Set((applications ?? []).map((item) => item.line_user_id))];

  const { data: users } = await supabaseAdmin
    .from("line_users")
    .select("*")
    .in("line_user_id", lineUserIds.length > 0 ? lineUserIds : ["__none__"]);

  const userMap = new Map((users ?? []).map((user) => [user.line_user_id, user]));

  return (applications ?? []).map((application) => ({
    ...application,
    line_user: userMap.get(application.line_user_id) ?? null
  }));
}
