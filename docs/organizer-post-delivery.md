# 運営者のX投稿案：クラウドLINE配信

- 本番 Vercel Cron `/api/cron/organizer-posts`。UTC `0 0,3,9,12 * * *` = JST 9/12/18/21時。Mac不要。
- 既存 `CRON_SECRET` 認証。宛先は `ADMIN_LINE_USER_ID` 限定、既存 `LINE_CHANNEL_ACCESS_TOKEN` 使用。
- 2026-10-22 09:00〜10-28 21:00：28回、各3案、84案。原稿は `content/organizer-posts/2026-10-22.json`。
- 時間が経過した配信枠を一気に送らない。障害で飛ばされた枠は要確認。
- 10/29以降、初回に在庫切れ通知を1回送り、補充まで停止。同じ原稿を再利用しない。
- 作り置きであり、最新トレンドを毎回調査・生成する機能はない。未確認の出来事を創作せず、意見・本音の候補として送る。
- Supabase非公開バケット `organizer-post-deliveries` に変更不可の本文・宛先・retry keyを保存し、受付後にsent記録を追加。同時実行や通信再試行は同じLINE retry keyを使用。
- 23時間超の受付不明は手動確認。LINE受付と端末到達は別。Cronの自動再試行は未設定。
- 認証済み `?dryRun=1` は送信せず本文と非公開ストレージを確認。時間外は次の枠を表示。
- 補充：新しいid/startDateと3案ずつのbatchesを作成し、配信モジュールのJSON importを切り替えてテスト・デプロイ。過去の配信記録は削除しない。
- 旧ローカル定期実行 `x-line` はPAUSED。再有効化しない。

検証：`node --experimental-strip-types scripts/test-organizer-posts.mjs`、`npx tsc --noEmit`、本番dryRun。非認証リクエストは401であること。

## 作り置き返信案（別配信）
- `/api/cron/organizer-replies` はJST 0/9/12/14/16/18/20/22時。24時は翌日0時。
- 現行原稿 `content/organizer-posts/replies-2026-10-24.json`：10/24 9時〜10/26 22時の23件。初日は0時枠を飛ばす（startHour: 9）。10/27 0時以降は補充通知1回のみ。通常投稿案の既存配信は継続。
- 現行23投稿は10/24にXの検索結果で本文とURLを確認。配信時の再検索・削除確認はしない。送信前に利用者がリンク先の文脈と返信済みかを確認する。Xへの自動投稿はしない。
- LINEはADMIN_LINE_USER_IDだけに、相手・URLと返信本文を別の吹き出しで送る。既存の非公開バケット・重複防止方式を利用。
- 確認用 `/api/admin/organizer-replies` は管理者ログイン必須・送信なし。
- 補充は新しいqueue id/startDate/startHourと実在URLを持つ原稿に差し替える。通常8枠/日。自動補充なし。
- 検証：`node --experimental-strip-types scripts/test-organizer-replies.mjs`。

## 2026-10-24 復旧記録
- 配信API・原稿・Cron設定がGit未登録のため、Gitデプロイで本番から欠落していた。両Cron APIは404。
- 非公開ストレージ確認：投稿案は10/22の9/12/18/21時のみ受付記録あり。10/23の投稿案と返信案は受付記録なし。
- 配信API・依存モジュール・原稿・確認用API・テスト・Cron設定を一緒にGit管理し、本番に復旧する。
- 過去枠の一括送信はしない。投稿案は10/28まで。返信案は10/23分のみで、復旧後の現在枠では補充通知になる。返信原稿の新規補充は別作業。

## 2026-10-24 原稿補充
- 23件すべて異なる相手。旧10/23分は再送しないという依頼により、新しい投稿・返信案だけを採用。
- 初日の9時開始と日付切替、期間終了、重複防止をテスト。Xには投稿せずLINEで候補を届ける。
