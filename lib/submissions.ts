import type { Audition, ApplicationMethod } from "@/lib/auditions";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export type SubmissionRow = {
  id: string;
  created_at: string;
  updated_at: string;
  status: "pending" | "approved" | "rejected" | "archived" | string;

  slug: string | null;
  is_pinned: boolean;
  is_featured: boolean;
  display_order: number;
  archived_at: string | null;

  group_name: string;
  title: string;
  summary: string;
  description: string;

  area: string;
  deadline: string;
  age: string;

  is_beginner_ok: boolean;
  is_high_school_ok: boolean;
  is_no_cost: boolean;

  cost: string;
  reward: string;
  experience: string;
  student: string;

  activity_content: string;
  selection_flow: string;
  application_method: string;

  line_url: string | null;
  form_url: string | null;
  official_site_url: string | null;
  official_x_url: string | null;
  official_instagram_url: string | null;
  official_tiktok_url: string | null;

  organizer_name: string;
  organizer_email: string;
  organizer_phone: string | null;

  admin_note: string | null;

  image_url: string | null;
  image_path: string | null;
};

function splitLines(value: string) {
  return value
    .split(/\n|、|,|・/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function buildApplicationMethods(row: SubmissionRow): ApplicationMethod[] {
  const methods: ApplicationMethod[] = [];

  if (row.line_url) {
    methods.push({
      label: "LINEにて応募",
      url: row.line_url,
      note: "LINE追加後、掲載元の案内に沿ってエントリーしてください。"
    });
  }

  if (row.form_url) {
    methods.push({
      label: "フォームより応募",
      url: row.form_url,
      note: "応募フォームに必要事項を入力して送信してください。"
    });
  }

  if (row.official_site_url && methods.length === 0) {
    methods.push({
      label: "公式サイトより応募",
      url: row.official_site_url,
      note: "公式サイトの案内に沿って応募してください。"
    });
  }

  return methods;
}

function buildAudienceFeatures(row: SubmissionRow) {
  const features: string[] = [];
  const hasNoAgeLimit = /年齢(?:制限)?不問|年齢制限なし|年齢上限なし|上限なし/.test(row.age);

  if (hasNoAgeLimit) {
    features.push("年齢制限なし", "30代OK");
  }

  if (/社会人|会社員|仕事.{0,8}両立|ダブルワーク/.test(row.student)) {
    features.push("社会人OK");
  }

  return features;
}

export function submissionToAudition(row: SubmissionRow): Audition {
  const features = [
    row.area.includes("東京") ? "東京" : row.area,
    ...buildAudienceFeatures(row),
    row.is_beginner_ok ? "未経験OK" : "",
    row.is_high_school_ok ? "高校生相談可" : "",
    row.is_no_cost ? "費用なし" : "",
    row.cost.includes("無料") ? "レッスン無料" : ""
  ].filter(Boolean);

  return {
    slug: row.slug || `submission-${row.id}`,
    title: row.title,
    group: row.group_name,
    imageUrl: row.image_url ?? undefined,
    officialSiteUrl: row.official_site_url ?? undefined,
    officialXUrl: row.official_x_url ?? undefined,
    summary: row.summary,
    area: row.area,
    deadline: row.deadline,
    age: row.age,
    features,
    safetyScore: row.is_pinned ? 5 : 4,
    cost: row.cost,
    reward: row.reward,
    experience: row.experience,
    student: row.student,
    description: row.description,
    applicationMethods: buildApplicationMethods(row),
    highlights: splitLines(row.activity_content),
    selectionFlow: row.selection_flow ? [row.selection_flow] : [],
    recruitmentTypes: row.is_pinned
      ? ["注目オーディション", "公式掲載"]
      : ["掲載依頼による募集情報"],
    faq: [
      {
        question: "応募方法はどこで確認できますか？",
        answer: row.application_method || "掲載元の応募方法に従ってエントリーしてください。"
      },
      {
        question: "費用はかかりますか？",
        answer: row.cost
      },
      {
        question: "未経験でも応募できますか？",
        answer: row.experience
      }
    ]
  };
}

export async function fetchApprovedAuditions(): Promise<Audition[]> {
  const { data, error } = await supabaseAdmin
    .from("audition_submissions")
    .select("*")
    .eq("status", "approved")
    .order("is_pinned", { ascending: false })
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return ((data ?? []) as SubmissionRow[]).map(submissionToAudition);
}

export type ApprovedSitemapEntry = {
  slug: string;
  updated_at: string;
  image_url: string | null;
};

export async function fetchApprovedSitemapEntries(): Promise<ApprovedSitemapEntry[]> {
  const { data, error } = await supabaseAdmin
    .from("audition_submissions")
    .select("slug, updated_at, image_url")
    .eq("status", "approved")
    .not("slug", "is", null)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []).filter(
    (entry): entry is ApprovedSitemapEntry => Boolean(entry.slug)
  );
}

export async function fetchApprovedAuditionBySlug(slug: string): Promise<Audition | null> {
  const { data, error } = await supabaseAdmin
    .from("audition_submissions")
    .select("*")
    .eq("slug", slug)
    .eq("status", "approved")
    .single();

  if (error || !data) {
    return null;
  }

  return submissionToAudition(data as SubmissionRow);
}

export async function fetchAllSubmissions(): Promise<SubmissionRow[]> {
  const { data, error } = await supabaseAdmin
    .from("audition_submissions")
    .select("*")
    .order("is_pinned", { ascending: false })
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []) as SubmissionRow[];
}

export async function fetchSubmission(id: string): Promise<SubmissionRow | null> {
  const { data, error } = await supabaseAdmin
    .from("audition_submissions")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  return data as SubmissionRow;
}
