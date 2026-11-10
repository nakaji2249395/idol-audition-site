import assert from "node:assert/strict";
import { getAuditionListingSummary } from "../lib/auditionListingSummary.ts";

const base = { area: "東京", age: "", experience: "", description: "" };
const summarize = (fields) => getAuditionListingSummary({ ...base, ...fields });
const original = {
  ...base,
  age: "・15歳～25歳の女性\n・東京都内での活動が可能な方\n・平日週1回程度のレッスン、土日を中心としたライブ活動に参加できる方",
  experience: "未経験歓迎"
};
const snapshot = JSON.stringify(original);
const result = getAuditionListingSummary(original);
assert.equal(result.age, "15歳〜25歳の女性");
assert.equal(result.experience, "未経験歓迎");
assert.equal(result.activity, "平日週1回程度のレッスン、土日を中心としたライブ活動に参加できる方");
assert.equal(JSON.stringify(original), snapshot);
assert.equal(summarize({ area: "詳細で確認" }).area, "");
assert.equal(summarize({ age: "詳しくはお問い合わせください" }).age, "");
assert.equal(summarize({ age: "【A】15歳〜25歳\n【B】18歳〜30歳" }).age, "");
assert.equal(summarize({ age: "18歳〜25歳。経験者は上限不問。" }).age, "");
assert.equal(summarize({ age: "18歳〜30歳くらいの女性（経験者は上限不問）" }).age, "18歳〜30歳くらいの女性(経験者は上限不問)");
assert.equal(summarize({ age: "年齢制限なし" }).age, "年齢制限なし");
assert.equal(summarize({ experience: "未経験者は応募不可" }).experience, "");
assert.equal(summarize({ experience: "未経験歓迎ではありません" }).experience, "");
assert.equal(summarize({ description: "土日に面接を実施。合格後にレッスンを開始。" }).activity, "");
assert.equal(summarize({ description: "平日のレッスンは応相談です。" }).activity, "平日のレッスンは応相談です");
console.log("Listing summary tests passed (14 assertions)");
