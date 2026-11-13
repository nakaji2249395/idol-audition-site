"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./mens.module.css";

type Item = { slug: string; title: string; group: string; image?: string; summary: string; area: string; age: string; experience: string; activity: string; deadline: string; deadlineDay: number; beginner: boolean; kind: string };
const regions = [{ label: "すべての地域", value: "" }, { label: "東京・首都圏", value: "東京|関東|首都圏|神奈川|千葉|埼玉" }, { label: "大阪・関西", value: "大阪|関西|兵庫|神戸" }, { label: "名古屋・愛知", value: "名古屋|愛知" }, { label: "福岡", value: "福岡" }];

export default function MensDirectory({ items }: { items: Item[] }) {
  const [region, setRegion] = useState("");
  const [kind, setKind] = useState("");
  const [beginner, setBeginner] = useState(false);
  const [order, setOrder] = useState("");
  const filtered = items.filter(a => (!region || new RegExp(region).test(a.area)) && (!kind || a.kind === kind) && (!beginner || a.beginner));
  if (order === "deadline") filtered.sort((a, b) => a.deadlineDay - b.deadlineDay);
  return <section aria-label="メンズ募集一覧">
    <div className={styles.filters}>
      <label>活動地域<select value={region} onChange={e => setRegion(e.target.value)}>{regions.map(r => <option key={r.label} value={r.value}>{r.label}</option>)}</select></label>
      <label>募集タイプ<select value={kind} onChange={e => setKind(e.target.value)}><option value="">すべて</option><option value="new">新規グループ</option><option value="additional">追加メンバー</option></select></label>
      <label>並び順<select value={order} onChange={e => setOrder(e.target.value)}><option value="">掲載順</option><option value="deadline">締切が近い順</option></select></label>
      <label className={styles.checkbox}><input type="checkbox" checked={beginner} onChange={e => setBeginner(e.target.checked)} />未経験歓迎</label>
    </div>
    <p className={styles.result} role="status">{filtered.length}件の募集</p>
    <div className={styles.grid}>{filtered.map(a => <Link className={styles.card} key={a.slug} href={`/mens-idol-audition/${a.slug}`}>
      <div className={styles.cardImage}>{a.image ? <img src={a.image} alt={a.title} loading="lazy" /> : <span>MEN’S<br />AUDITION</span>}</div>
      <div className={styles.cardBody}>
        {a.area ? <p className={styles.location}>{a.area}</p> : null}
        <h2>{a.title}</h2>
        <p className={styles.cardSummary}>{a.summary}</p>
        <div className={styles.tags}>{a.age ? <span>{a.age}</span> : null}{a.beginner ? <span>未経験歓迎</span> : null}</div>
        {a.activity ? <p className={styles.activity}>{a.activity}</p> : null}
        <div className={styles.deadline}><span>締切 {a.deadline}</span><span aria-hidden="true">→</span></div>
      </div>
    </Link>)}</div>
    {!filtered.length ? <div className={styles.empty}><p>この条件の募集は現在ありません。</p><button onClick={() => { setRegion(""); setKind(""); setBeginner(false); }}>条件をリセット</button></div> : null}
  </section>;
}
