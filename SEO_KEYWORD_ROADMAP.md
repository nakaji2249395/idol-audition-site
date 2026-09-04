# SEO keyword roadmap

Updated: 2026-09-04

## Decision rule

One search intent maps to one canonical page. Do not create a second page only because spacing, word order, or a synonym differs. Create a new indexable page only when it has distinct intent, enough matching live auditions, and unique guidance.

## Search Console opportunities

Search Console period: 2026-06-29 to 2026-09-01 (three months).

| Priority | Query or page | Clicks | Impressions | Average position | Canonical target | Action |
| --- | --- | ---: | ---: | ---: | --- | --- |
| P0 | `アイドルオーディション 高校生` | 18 | 148 | 9.5 | `/idol-audition/high-school` | Protect the existing URL and strengthen its beginner/parent links |
| P0 | `/idol-audition/high-school` | 27 | 371 | 11.1 | `/idol-audition/high-school` | Keep title intent stable; improve supporting links rather than create duplicates |
| P0 | `アイドル オーディション 未経験` | 0 | 65 | 28.8 | `/idol-audition/mikeiken` | Rewrite title, H1, comparison data, beginner guide, FAQ, and related-intent links |
| P0 | `/idol-audition/mikeiken` | 3 | 149 | 18.1 | `/idol-audition/mikeiken` | Consolidate `未経験`, `初心者`, and `経験不問` on this URL |
| P0 | `20代 アイドル 募集 未経験` | 0 | 39 | 20.3 | `/idol-audition/20s` | Add reciprocal links between the 20s and beginner pages |
| P1 | `/idol-audition/osaka` | 10 | 156 | 35.3 | `/idol-audition/osaka` | Align title and lead with `大阪`, `関西`, `オーディション`, and `募集` |
| P1 | `/idol-audition/cost` | 3 | 183 | 9.1 | `/idol-audition/cost` | Next: improve search-result promise and links to free listings |
| P1 | `/idol-audition/how-to-apply` | 3 | 63 | 11.3 | `/idol-audition/how-to-apply` | Own `自己PR`, `志望動機`, and `例文`; link from beginner pages |
| P1 | `/idol-audition/tokyo` | 2 | 83 | 15.3 | `/idol-audition/tokyo` | Next: strengthen Tokyo-specific area and beginner sections |

## Canonical keyword map

| Search intent | Main terms | Target page |
| --- | --- | --- |
| General female auditions | 女性 アイドル オーディション, アイドル募集, 2026 | `/idol-audition` |
| Beginner | 未経験, 初心者, 経験不問, 歌 ダンス 未経験 | `/idol-audition/mikeiken` |
| High school | 高校生, 未成年, 学生, 親 同意 | `/idol-audition/high-school` |
| 20s | 20代, 20代後半, 20代 未経験 | `/idol-audition/20s` |
| 30s | 30代, 30歳以上 | `/idol-audition/30s` |
| No age limit | 年齢制限なし, 年齢不問, 上限なし | `/idol-audition/age-limit-none` |
| Working adults | 社会人, 会社員, ダブルワーク, 仕事 両立 | `/idol-audition/working-adult` |
| Low cost | 費用なし, 無料, レッスン無料, 衣装代無料 | `/idol-audition/free` |
| Cost questions | 費用, 登録料, レッスン費, 衣装代 | `/idol-audition/cost` |
| Tokyo | 東京, 関東, 都内, 横浜, 埼玉, 千葉 | `/idol-audition/tokyo` |
| Osaka | 大阪, 関西, 大阪 アイドル募集 | `/idol-audition/osaka` |
| Nagoya | 名古屋, 愛知, 東海 | `/idol-audition/nagoya` |
| Fukuoka | 福岡, 九州, 博多 | `/idol-audition/fukuoka` |
| Nationwide | 全国, 地方, オンライン, 上京 | `/idol-audition/nationwide` |
| Application writing | 自己PR, 志望動機, 例文, 応募写真 | `/idol-audition/how-to-apply` |
| Safety | 怪しい, 安全, 詐欺, 契約 | `/idol-audition/suspicious` |
| Agency choice | アイドルになりたい 事務所, 事務所 選び方 | `/idol-audition/agency-guide` |

## Candidate pages: create only after demand and inventory validation

| Candidate intent | Required evidence before creation |
| --- | --- |
| 新規グループ・初期メンバー | Search Console demand or external demand, plus at least five live matching listings |
| 追加メンバー | Same as above, with reliable recruitment-type data |
| 地下・ライブアイドル | Clear definition and at least five listings explicitly matching the concept |
| 中学生 | At least five live listings with explicit age eligibility and parent guidance |
| 大学生 | At least five live listings and content distinct from the 20s/working-adult pages |
| 札幌・仙台・広島・沖縄 | At least five live local listings per indexable region page |

## Implementation in this batch

- Rebuilt `/idol-audition/mikeiken` around the proven beginner queries.
- Added live listing counts for beginner, low-cost, high-school, and 20s availability.
- Added reciprocal intent links for high-school and 20s searches.
- Added beginner and low-cost links from matching audition detail pages.
- Updated Osaka metadata and headings to cover both audition and member-recruitment wording.
- Kept the successful high-school URL and core title intent unchanged.
