# 管理者向け日次レポート

- Vercel Cron: `/api/cron/daily-report`, UTC `0 0 * * *`（日本時間毎朝9時）。Mac不要。
- 既存の `ADMIN_LINE_USER_ID` だけに公式LINEから送信。一般利用者には配信しない。
- `CRON_SECRET` で認証。`REPORT_VERCEL_TOKEN` は本番Secret、対象プロジェクト限定。
- トークン有効期限は2027-01-14。期限前に同スコープでローテーションして再デプロイする。
- `supabase/migrations/202610160001_daily_reports.sql` を事前適用。
- `/api/admin/daily-report` は既存管理者セッションで閲覧できる送信なしプレビュー。
- Cronの `?dryRun=1` も認証が必要で送信なし。

## データ

Vercel公式集計APIで本番のみを取得。昨日・前週同曜日・7日・前7日・30日・前30日の期間内訪問者数とPV、7日のページ・流入元、昨日のイベント、7日の案件別広告クリック。
日付は日本時間の完了日のみ。失敗は未取得とし0にしない。閲覧数と訪問者数を区別する。

Search Consoleは `REPORT_GOOGLE_SERVICE_ACCOUNT_JSON`（本番Secret）で認証する。対象は `sc-domain:idol-audition-navi.jp` 固定、サービスアカウントのプロパティ権限は「制限付き」、OAuth scopeは `webmasters.readonly` のみ。Google Cloud側でSearch Console APIの有効化が必要。
確定データ（dataState=final）の直近14日から最新記録日を検出し、その日までの7日・28日と各前期間を比較する。クリック、表示、CTR、平均順位、7日の検索語・ページ上位5件を掲載する。Google集計日は米国太平洋時間で、Vercelの日本時間とは異なる。匿名化された検索語等は全件ではなく、上位行の合計を総計に使わない。データがない日はAPIから省略されるため「最新記録日」はGoogleの更新完了日そのものではない。

**A8の収益レポート自動取得は未接続。** レポートには未取得と明記する。サイトの広告クリックはA8側のクリック・成果ではない。ブラウザのログインセッションをサーバーへコピーしない。

## 送信・復旧

`daily_reports` に日付を主キーとして本文・宛先・LINE retry keyを保存。匿名／一般認証ユーザーはアクセス不可。
5分のleaseで競合を防止。再実行は同じ本文・宛先・retry keyを使用し、LINE 409のaccepted-request-idも受付済みとして記録。
LINEの受付成功は端末への到達保証ではない。DB記録後の同日再実行はスキップ。
障害時はVercelログの`daily_report_failed`とテーブルのlast_errorを確認する。
5分後〜作成から23時間以内なら `vercel crons run /api/cron/daily-report` で再試行可能。自動再試行は未設定。
23時間超の不明送信は自動再送しない。履歴を確認し、送信済み行を削除して再送しないこと。

テスト: `node --experimental-strip-types scripts/test-daily-report.mjs`。
