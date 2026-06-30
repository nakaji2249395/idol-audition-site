import type { Audition, ApplicationMethod } from "@/lib/auditions";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export type SubmissionRow = {
  id: string;
  created_at: string;
  updated_at: string;
  status: "pending" | "approved" | "rejected" | string;

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

export function submissionToAudition(row: SubmissionRow): Audition {
  const features = [
    row.area.includes("東京") ? "東京" : row.area,
    row.is_beginner_ok ? "未経験OK" : "",
    row.is_high_school_ok ? "高校生相談可" : "",
    row.is_no_cost ? "費用なし" : "",
    row.cost.includes("無料") ? "レッスン無料" : ""
  ].filter(Boolean);

  return {
    slug: `submission-${row.id}`,
    title: row.title,
    group: row.group_name,
    summary: row.summary,
    area: row.area,
    deadline: row.deadline,
    age: row.age,
    features,
    safetyScore: 4,
    cost: row.cost,
    reward: row.reward,
    experience: row.experience,
    student: row.student,
    description: row.description,
    applicationMethods: buildApplicationMethods(row),
    highlights: splitLines(row.activity_content),
    selectionFlow: splitLines(row.selection_flow),
    recruitmentTypes: ["掲載依頼による募集情報"],
    faq: [
      {
        question: "応募方法はどこで確認できますか？",
        answer:
          row.application_method || "掲載元の応募方法に従ってエントリーしてください。"
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
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return ((data ?? []) as SubmissionRow[]).map(submissionToAudition);
}

export async function fetchApprovedSubmissionAudition(id: string): Promise<Audition | null> {
  const { data, error } = await supabaseAdmin
    .from("audition_submissions")
    .select("*")
    .eq("id", id)
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
