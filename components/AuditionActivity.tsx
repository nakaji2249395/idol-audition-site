"use client";

import { useEffect, useId, useRef, useState } from "react";
import { activityDateLabel, type ActivityArchive, type ActivityEvent } from "@/lib/auditionActivity";
import styles from "./AuditionActivity.module.css";

type XWidgets = { widgets: { createTweet: (id: string, container: HTMLElement, options: Record<string, unknown>) => Promise<HTMLElement | undefined> } };
let widgetsPromise: Promise<XWidgets> | undefined;
const kindLabels: Record<string, string> = { live: "ライブ", photo: "撮影・チェキ会", exchange: "交流イベント", solo: "ソロ出演" };

function loadWidgets(): Promise<XWidgets> {
  const xWindow = window as Window & { twttr?: XWidgets };
  if (xWindow.twttr?.widgets) return Promise.resolve(xWindow.twttr);
  if (widgetsPromise) return widgetsPromise;
  widgetsPromise = new Promise<XWidgets>((resolve, reject) => {
    const script = document.createElement("script");
    const timer = window.setTimeout(() => { script.remove(); reject(new Error("X embed timeout")); }, 12000);
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.onload = () => {
      window.clearTimeout(timer);
      if (xWindow.twttr?.widgets) resolve(xWindow.twttr);
      else { script.remove(); reject(new Error("X embed unavailable")); }
    };
    script.onerror = () => { window.clearTimeout(timer); script.remove(); reject(new Error("X embed unavailable")); };
    document.head.appendChild(script);
  }).catch((error: unknown) => { widgetsPromise = undefined; throw error; });
  return widgetsPromise;
}

function OfficialPost({ event, onClose }: { event: ActivityEvent; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const embed = useRef<HTMLDivElement>(null);
  const headingId = useId();
  const isX = new URL(event.sourceUrl).hostname === "x.com";
  const [status, setStatus] = useState<"loading" | "ready" | "unavailable">("loading");

  useEffect(() => {
    const element = dialog.current;
    const host = embed.current;
    if (!element || !host) return;
    const previousFocus = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    if (!isX) return () => {
      element.close();
      document.body.style.overflow = overflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
    let active = true;
    // Give each render its own node so a late X response cannot overwrite a newer post.
    const container = document.createElement("div");
    host.appendChild(container);
    const timer = window.setTimeout(() => { if (active) setStatus("unavailable"); }, 15000);
    const id = event.sourceUrl.split("/").at(-1)!;
    loadWidgets().then((x) => {
      if (!active) return undefined;
      return x.widgets.createTweet(id, container, { lang: "ja", dnt: true, conversation: "none", align: "center" });
    }).then((result) => {
      if (active) { window.clearTimeout(timer); setStatus(result ? "ready" : "unavailable"); }
    }).catch(() => { if (active) { window.clearTimeout(timer); setStatus("unavailable"); } });
    return () => {
      active = false;
      window.clearTimeout(timer);
      container.remove();
      element.close();
      document.body.style.overflow = overflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [event.sourceUrl, isX]);

  return (
    <dialog ref={dialog} className={styles.dialog} aria-labelledby={headingId} onCancel={onClose}>
      <div className={styles.dialogHeader}>
        <div><p className={styles.eyebrow}>OFFICIAL INFORMATION</p><h3 id={headingId}>{isX ? "公式告知" : "公式カレンダー掲載情報"}</h3></div>
        <button type="button" onClick={onClose} className={styles.close}>閉じる ×</button>
      </div>
      <div className={styles.dialogBody}>
        <p className={styles.meta}>{activityDateLabel(event.date)} · {event.group}</p>
        <p className={styles.postTitle}>{event.title}</p>
        {!isX ? <p className={styles.meta}>{kindLabels[event.kind ?? "live"]} {event.venue ? `／ ${event.venue}` : ""}{event.performanceTime ? `／ 出演 ${event.performanceTime}` : ""}</p> : null}
        {isX && status === "loading" ? <p className={styles.loading} role="status"><span className={styles.spinner} aria-hidden="true" />公式投稿を読み込み中…</p> : null}
        {isX && status === "unavailable" ? <p className={styles.notice} role="status">この環境では投稿を表示できません。下のリンクから公式告知をご覧いただけます。</p> : null}
        <div ref={embed} />
        <a className={styles.external} href={event.sourceUrl} target="_blank" rel="noopener noreferrer">{isX ? "Xで公式投稿" : "公式の掲載ページ"}を開く（別タブ） ↗</a>
        <p className={styles.fine}>{isX ? "Xの埋め込みを表示しています。投稿内のリンクは外部ページへ移動する場合があります。" : "公式カレンダーの掲載内容を要約しています。原文は別タブで確認でき、この募集ページはそのまま残ります。"}</p>
      </div>
      <div className={styles.dialogFooter}><button type="button" onClick={onClose}>募集ページに戻る</button></div>
    </dialog>
  );
}

export function AuditionActivity({ archive }: { archive: ActivityArchive }) {
  const [view, setView] = useState<"list" | "calendar">("list");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<ActivityEvent | null>(null);
  const [expanded, setExpanded] = useState(false);
  const headingId = useId();
  const contentId = useId();
  const [year, month] = archive.month.split("-").map(Number);
  const numberOfDays = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const offset = (new Date(Date.UTC(year, month - 1, 1)).getUTCDay() + 6) % 7;
  const days = new Set(archive.events.map((event) => event.date));
  const groups = new Set(archive.events.map((event) => event.group));
  const events = view === "calendar" && selectedDate ? archive.events.filter((event) => event.date === selectedDate) : archive.events;
  const visibleEvents = expanded || (view === "calendar" && selectedDate) ? events : events.slice(0, 6);

  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <p className={styles.eyebrow}>ACTIVITY ARCHIVE</p>
      <div className={styles.heading}><h2 id={headingId}>ライブ・イベント活動を見てみる</h2><span className={styles.month}>{year}年{month}月</span></div>
      <p className={styles.intro}>どんな場所で、どんな日に活動している？ 公式サイト・公式カレンダー・Xの告知から、活動のイメージを見られます。</p>
      <div className={styles.toolbar}>
        <p className={styles.count}>掲載 <strong>{archive.events.length}</strong>件 <span>／ {days.size}日分の告知</span></p>
        <div className={styles.toggle} role="group" aria-label="活動表の表示方法">
          <button type="button" aria-pressed={view === "list"} aria-controls={contentId} onClick={() => setView("list")}>リスト</button>
          <button type="button" aria-pressed={view === "calendar"} aria-controls={contentId} onClick={() => setView("calendar")}>カレンダー</button>
        </div>
      </div>
      {groups.size > 1 ? <p className={styles.meta}>{[...groups].map(group => `${group} ${archive.events.filter(event => event.group === group).length}件`).join(" ／ ")}</p> : null}
      <div id={contentId}>
        {view === "calendar" ? <>
          <div className={styles.calendar} aria-label={`${year}年${month}月の活動カレンダー`}>
            {["月", "火", "水", "木", "金", "土", "日"].map((day) => <div key={day} className={styles.weekday}>{day}</div>)}
            {Array.from({ length: offset }, (_, i) => <div key={`empty-${i}`} aria-hidden="true" />)}
            {Array.from({ length: numberOfDays }, (_, index) => {
              const day = index + 1;
              const date = `${archive.month}-${String(day).padStart(2, "0")}`;
              const count = archive.events.filter((event) => event.date === date).length;
              return count ? <button key={date} type="button" className={styles.calendarDay} aria-label={`${activityDateLabel(date)}、${count}件の告知を見る`} aria-pressed={selectedDate === date} onClick={() => setSelectedDate(selectedDate === date ? null : date)}>
                <span>{day}</span><small>{count}件</small>
              </button> : <div key={date} className={styles.emptyDay}>{day}</div>;
            })}
          </div>
          <div className={styles.calendarHelp}><p>予定のある日を押すと、下に詳細が表示されます。</p>{selectedDate ? <button type="button" onClick={() => setSelectedDate(null)}>すべての日を見る</button> : null}</div>
        </> : null}
        <p className={styles.resultsLabel} aria-live="polite">{selectedDate && view === "calendar" ? `${activityDateLabel(selectedDate)}の告知 ${events.length}件` : `${year}年${month}月の掲載予定`}</p>
        <ul className={styles.list}>
          {visibleEvents.map((event) => <li key={`${event.date}-${event.group}-${event.title}`} className={styles.event}>
            <time className={styles.date} dateTime={event.date}>{activityDateLabel(event.date)}</time>
            <div className={styles.eventBody}>
              {groups.size > 1 ? <span className={styles.group}>{event.group}</span> : null}
              <span className={styles.meta}> {kindLabels[event.kind ?? "live"]}</span>
              <h3>{event.title}</h3>
              <p className={styles.meta}>{event.venue}{event.performanceTime ? <> <span>／ 出演 {event.performanceTime}</span></> : null}</p>
              <button type="button" className={styles.source} onClick={() => setSelectedEvent(event)} aria-haspopup="dialog">公式告知を見る <span aria-hidden="true">↗</span></button>
            </div>
          </li>)}
        </ul>
        {events.length > 6 && !(view === "calendar" && selectedDate) ? <button type="button" className={styles.source} onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>{expanded ? "表示を少なくする" : `10月の活動をすべて見る（${events.length}件）`}</button> : null}
      </div>
      <p className={styles.fine}>2026年10月の公式告知を掲載しています。同じイベントの追加枠や複数の出演時間は原則1件にまとめています。複数グループの募集はグループごとに集計しています。開催実績・レッスン・全稼働日を保証するものではなく、空欄は休日を意味しません。加入後の活動日程とは異なる場合があります。</p>
      {selectedEvent ? <OfficialPost key={selectedEvent.sourceUrl} event={selectedEvent} onClose={() => setSelectedEvent(null)} /> : null}
    </section>
  );
}
