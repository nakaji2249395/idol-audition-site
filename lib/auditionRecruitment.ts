export type RecruitmentKind = "new-group" | "additional";
export const recruitmentOptions = [
  { id: "new-group", label: "新規グループ・初期メンバー" },
  { id: "additional", label: "既存グループ・追加メンバー" }
] as const;

/** Do not infer a new group from 新メンバー, or an existing one from a producer's history. */
export function sourceRecruitmentFromNote(note: string | null | undefined): RecruitmentKind[] {
  try {
    const raw = note?.match(/^\[audition-plus-recruitment\](.*)$/m)?.[1];
    if (!raw) return [];
    const data: unknown = JSON.parse(raw);
    if (!data || typeof data !== "object" || !("types" in data) || !Array.isArray(data.types)) return [];
    if (!("source" in data) || typeof data.source !== "string" || !/^https:\/\/audition\.nerim\.info\/audition-\d+\/audition-\d+\.html$/.test(data.source)) return [];
    const types = data.types;
    return recruitmentOptions.filter(option => types.includes(option.id)).map(option => option.id);
  } catch { return []; }
}
