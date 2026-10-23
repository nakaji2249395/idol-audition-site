import type { Metadata } from "next";
import { organizerArticles } from "@/lib/organizerArticles";
import Link from "next/link";
import styles from "./organizers.module.css";

export const metadata: Metadata = { alternates: { canonical: "/for-organizers" } };

export default function OrganizerHome() {
  return (
    <main id="journal-main" className={styles.home}>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span className={styles.dot} /> FROM ENGINEER TO PRODUCER</p>
          <h1>観る側だった。<br />今度は、<em>作る側へ。</em></h1>
          <p className={styles.intro}>人脈も、運営経験もなかった。<br />あったのは「作ってみたい」という気持ちだけ。<br />元エンジニアが綴る、アイドル運営のはじまり。</p>
          <Link href="#stories" className={styles.primary}>最初の話を読む <span aria-hidden="true">↗</span></Link>
        </div>
        <aside className={styles.cover} aria-label="最初の記録">
          <div className={styles.coverTop}><span>FIELD NOTES</span><span>VOL. 01</span></div>
          <div className={styles.coverNumber} aria-hidden="true">0<span>→</span>1</div>
          <p className={styles.coverCaption}>THE FIRST STEP<br />BEHIND THE STAGE.</p>
          <blockquote>「で、誰に<br />相談すれば<br />いいんだろう」</blockquote>
          <div className={styles.coverBottom}><span>人脈のなかった、あの頃。</span><span aria-hidden="true">↗</span></div>
        </aside>
      </header>
      <section id="stories" aria-labelledby="stories-heading" className={styles.stories}>
        <div className={styles.sectionLabel}><p className={styles.eyebrow}>THE JOURNAL</p><h2 id="stories-heading">はじまりの記録。</h2><p>うまくいかなかったことも、<br />最初に動いた日のことも。</p></div>
        <div className={styles.storyList}>
        <Link className={styles.story} href="/for-organizers/no-connections">
          <span className={styles.storyNumber}>01</span>
          <div><span className={styles.eyebrow}>人脈がない / FREE STORY</span><h3>アイドル運営は人脈なしでも始められる？ 元エンジニアの立ち上げ体験</h3><p>コードは書けても、誰に相談すればいいか分からない。ブラウザのタブだけが増えていた頃の話。</p><span className={styles.read}>体験談を読む <span aria-hidden="true">↗</span></span></div>
        </Link>
        {organizerArticles.map(article => (
          <Link key={article.slug} className={styles.story} href={`/for-organizers/${article.slug}`}>
            <span className={styles.storyNumber}>{article.number}</span>
            <div><span className={styles.eyebrow}>{article.category}</span><h3>{article.title}</h3><p>{article.excerpt}</p><span className={styles.read}>記事を読む <span aria-hidden="true">↗</span></span></div>
          </Link>
        ))}
        </div>
      </section>
      <section className={styles.editorialNote} aria-label="このノートについて"><span className={styles.eyebrow}>A NOTE FROM THE EDITOR</span><p>昔の僕が読みたかったのは、<br />成功する方法より、<br /><strong>誰かが最初に動いた日の話だった。</strong></p><small>その頃の自分に向けて、一つずつ書いていく。</small></section>
    </main>
  );
}
