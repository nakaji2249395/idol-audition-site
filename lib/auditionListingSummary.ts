type SummarySource = {
  area: string;
  age: string;
  experience: string;
  description: string;
  eligibility?: string[];
  afterPassingFlow?: string[];
};

const unknown = /^(?:詳細で確認|要確認|不明|未設定|記載なし|未記載|-)$/;
const clean = (text: string) => text.trim().replace(/^[・●■★\s]+/, "").trim();
const sentences = (text: string) => text.split(/[\n。！？!?]+/).map(clean).filter(Boolean);

/** Display-only excerpts: never overwrite the original eligibility or infer missing conditions. */
export function getAuditionListingSummary(source: SummarySource) {
  const ageText = source.age.normalize("NFKC");
  const ageLines = sentences(ageText);
  const ageCandidates = ageLines.filter(line => /\d+\s*歳|年齢[不問制限上限]|高校生以上|中学生以上/.test(line));
  // Multiple ranges, group-specific eligibility, or separate exceptions cannot safely
  // be collapsed into a single age label. Leave those to the full detail page.
  const complexAge = /【|\d{4}年|生まれ|※/.test(ageText)
    || ageLines.some(line => /例外|上限不問|応相談|経験者.*(?:不問|相談|上限)/.test(line) && !ageCandidates.includes(line))
    || ageCandidates.length !== 1;
  const age = !complexAge && ageCandidates[0].length <= 65
    ? ageCandidates[0].replace(/^(?:対象年齢|年齢)\s*[:：]\s*/, "").replace(/~/g, "〜")
    : "";

  const experienceLines = sentences(source.experience);
  const experience = experienceLines.find(line =>
    line.length <= 45 && /未経験|経験不問/.test(line)
    && /歓迎|OK|不問|応募可|応募可能/.test(line)
    && !/不可|対象外|経験者のみ|ません|ではない|未経験.*(?:除く|以外)/.test(line)
  ) || "";

  const activityLines = [source.age, ...(source.eligibility || []), source.description, ...(source.afterPassingFlow || [])]
    .flatMap(sentences);
  const activity = activityLines.find(line => line.length <= 100
    && /レッスン|ライブ|活動/.test(line)
    && /週\s*\d|月\s*\d|平日|土日|曜日|[月火水木金土日]曜/.test(line)
    && !/審査|面接|オーディション|選考/.test(line)
  ) || "";

  const area = clean(source.area);
  return {
    area: unknown.test(area) ? "" : area,
    age,
    experience,
    activity
  };
}
