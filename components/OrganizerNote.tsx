"use client";

import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";
import { createJournalTracker } from "@/lib/journalTracking";
import { organizerJournal } from "@/lib/organizerJournal";
import styles from "@/app/for-organizers/organizers.module.css";

export function OrganizerNote({ article, heading, paragraphs }: { article: string; heading: string; paragraphs: string[] }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const trackerRef = useRef<ReturnType<typeof createJournalTracker> | null>(null);
  if (trackerRef.current === null) {
    trackerRef.current = createJournalTracker(event => {
      // The Next.js Analytics component may still be suspended during hydration.
      // Use the SDK's pre-load queue so an early view/click is not silently dropped.
      window.va ??= (...args) => { (window.vaq ??= []).push(args); };
      track(event, { article, version: "1" });
    });
  }

  useEffect(() => {
    const tracker = trackerRef.current!;
    let visible = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const update = () => {
      clearTimeout(timer);
      if (document.visibilityState !== "visible") return;
      tracker.view();
      if (visible) timer = setTimeout(() => tracker.reach(), 1000);
    };
    // Root Analytics initializes its queue in an effect; wait until that effect has run.
    const initialView = setTimeout(update, 0);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
      update();
    }, { threshold: [0, 0.5] });
    if (headingRef.current) observer.observe(headingRef.current);
    document.addEventListener("visibilitychange", update);
    return () => { clearTimeout(initialView); clearTimeout(timer); observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);

  return (
    <aside className={styles.note} aria-labelledby="note-heading">
      <p className={styles.eyebrow}>この話の続き</p>
      <h2 ref={headingRef} id="note-heading">{heading}</h2>
      {paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      <div className={styles.noteAction}>
        <a className={styles.primary} href={organizerJournal.noteUrl} target="_blank" rel="noopener noreferrer"
          onClick={() => trackerRef.current?.click()} onAuxClick={event => { if (event.button === 1) trackerRef.current?.click(); }}>
          続きはnoteで読む <span aria-hidden="true">↗</span>
        </a>
      </div>
    </aside>
  );
}
