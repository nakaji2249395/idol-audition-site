import Link from "next/link";
import styles from "./mens.module.css";

export default function MensLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles.theme}>
    <header className={styles.header}>
      <Link href="/mens-idol-audition" className={styles.brand}>アイドルオーディションナビ<span>MEN’S AUDITION</span></Link>
      <nav aria-label="募集カテゴリー" className={styles.navigation}>
        <Link href="/idol-audition">女性アイドル</Link>
        <Link href="/mens-idol-audition" aria-current="true">メンズアイドル</Link>
        <Link href="/post">掲載希望</Link>
      </nav>
    </header>
    {children}
    <footer className={styles.footer}><Link href="/">アイドルオーディションナビ</Link><Link href="/about">運営情報</Link><Link href="/post">掲載希望</Link></footer>
  </div>;
}
