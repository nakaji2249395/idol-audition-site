import type { Metadata } from "next";
import Link from "next/link";
import { organizerJournal } from "@/lib/organizerJournal";
import styles from "./organizers.module.css";

export const metadata: Metadata = {
  title: { absolute: organizerJournal.name },
  description: organizerJournal.description,
  icons: { icon: "/backstage-icon.svg" },
  keywords: ["アイドル運営", "アイドルグループ 作り方", "アイドル メンバー 募集", "アイドル運営 人脈"],
  robots: { index: true, follow: true },
  openGraph: { title: organizerJournal.name, description: organizerJournal.description, siteName: organizerJournal.name, url: "/for-organizers", type: "website", locale: "ja_JP" },
  twitter: { card: "summary", title: organizerJournal.name, description: organizerJournal.description },
};

export default function OrganizerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.shell}>
      <a className={styles.skip} href="#journal-main">本文へスキップ</a>
      <header className={styles.header}>
        <Link className={styles.brand} href="/for-organizers" aria-label="BACKSTAGE 運営をはじめるノート トップ"><span className={styles.brandMark} aria-hidden="true">B/</span><span>BACKSTAGE<small>運営をはじめるノート</small></span></Link>
        <nav aria-label="運営ノート"><Link href="/for-organizers#stories">STORIES <span>体験を読む</span></Link></nav>
      </header>
      {children}
      <footer className={styles.footer}><Link href="/for-organizers">BACKSTAGE<span>運営をはじめるノート</span></Link><p>ステージが始まる、その前の話。</p><small>© BACKSTAGE JOURNAL</small></footer>
    </div>
  );
}
