import { test } from 'node:test';
import assert from 'node:assert/strict';
import { splitSubmissionHighlights } from '../lib/submissionHighlights.ts';

test('multiline activities preserve punctuation and full sentences', () => {
  const items = [
    'ライブ活動（対バン・イベント出演・大型フェス・主催ライブを想定）',
    '楽曲制作とリリース（楽曲派の音楽と、作り込まれたコンセプト・振付が特徴です）',
    '撮影（アーティスト写真、グッズ等のビジュアル撮影）',
    'モデル活動（提携アパレルブランドとのコラボレーションや、モデルとしての起用）',
    'メディア出演（千葉テレビ・テレビ埼玉・東京MX等でのドラマ出演、YouTube企画など）',
    'SNS・WEBでの発信活動（Instagram／TikTok／YouTube等）',
    'ファンサイト「BKKN MEMBER」と連動した会員向けコンテンツ',
  ];
  assert.deepEqual(splitSubmissionHighlights(items.join('\n')), items);
  assert.deepEqual(splitSubmissionHighlights('\r\n' + items.join('\r\n') + '\r\n'), items);
});

test('legacy single-line categories and empty values retain their behavior', () => {
  assert.deepEqual(splitSubmissionHighlights('ライブ・撮影、SNS,モデル'), ['ライブ', '撮影', 'SNS', 'モデル']);
  assert.deepEqual(splitSubmissionHighlights(''), []);
});
