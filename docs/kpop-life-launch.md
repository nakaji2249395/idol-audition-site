# 推しのとなり — 初版 (2026-10-27)

URL: https://idol-audition-navi.jp/kpop-life

## Scope
- 独立ナビ・CSS moduleのメディアトップ、3カテゴリ、8記事、編集方針。既存オーディション側への入口追加なし。
- 静的生成、ページ固有canonical/title/description、Article/BreadcrumbList JSON-LD、サイトマップ13 URL。
- 公表情報の編集記事。受講したと偽るレビュー、根拠のない順位・上達保証は使わない。
- 料金は2026-10-27の公式情報を確認。コリアンカレッジの月額表示は分割払いであることを明記。

## Affiliate
- NAYUTAS vocal s00000020785002: 提携中、既存自由テキスト素材020を管理画面で照合。
- NAYUTAS dance s00000020785008: 提携中、素材001を照合、指定のテキストを使用。
- Korean College s00000023579001: 2026-10-27に提携申請し「提携完了」を確認。素材004を取得、指定テキストを使用。
- 各広告はA8のトラッキングURL/ピクセルを維持。rel=sponsored nofollow noopener。
- affiliate_view: 広告枠50%以上が1秒表示、affiliate_click: クリック。placement=kpop-life/{category}/{slug}/end。PVはVercel Analytics。
- 表示やクリックは購入者数・入会数ではない。確定成果はA8レポートで確認する。
- 公開後に3プログラムへ全8記事の広告掲載URLを提出済み（ダンス3・ボイトレ2・韓国語3）。いずれも管理画面で提出完了を確認。

## Validation
- npm run build / npx tsc --noEmit / scoped eslint
- node scripts/test-kpop-life.mjs (TEST_BASE_URL指定で本番も検証可能)
- desktop/mobile browser: homepage, Korean article, FAQ open, advertisement placement

## Follow-up
初版では検索順位の保証や検索量の推定をしない。Search Consoleの表示クエリ、記事PV、広告枠到達率、クリック率、A8の承認成果を照合し、地域記事や教室の比較対象を追加する。情報確認日の更新は再確認時のみ。

本番公開確認: deployment dpl_GpEJKk1mV4yPqp1QEmFLeEtcr6bv、13ページのHTTP/metadata/広告リンク/サイトマップ検査に合格。広告枠の可視時間・非表示タブ・一度限り計測の既存テストも合格。
