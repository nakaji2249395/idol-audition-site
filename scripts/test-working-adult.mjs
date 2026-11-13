import assert from 'node:assert/strict';
import { isWorkingAdultAudition } from '../lib/auditionAudience.ts';
const check = (text) => isWorkingAdultAudition({ age: '', student: text, description: '', features: [] });
for (const text of ['社会人として最低限のマナーを守れる方', '社会人経験を活かせます', '会社員は応募できません']) assert.equal(check(text), false, text);
for (const text of ['学生・社会人ともに応募可能。学業・仕事との両立相談可', '社会人OK', '社会人の方も歓迎', '仕事との両立可', '学生や本業があっても週1〜2回参加できる方', 'ダブルワーク相談可']) assert.equal(check(text), true, text);
console.log('Working adult eligibility: 9 cases passed');
