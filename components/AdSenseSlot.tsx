"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import styles from "./AdSenseSlot.module.css";

declare global {
  interface Window {
    adsbygoogle?: { push: (value: Record<string, unknown>) => void };
  }
}

/** One manually placed unit. No auto ads, refresh timer, or click tracking. */
export function AdSenseSlot() {
  const container = useRef<HTMLElement>(null);
  const unit = useRef<HTMLModElement>(null);
  const requested = useRef(false);
  const [nearby, setNearby] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setNearby(true);
        observer.disconnect();
      }
    }, { rootMargin: "300px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  function requestAd() {
    if (requested.current || !unit.current || unit.current.dataset.adsbygoogleStatus) return;
    if (unit.current.getBoundingClientRect().width === 0) return;
    requested.current = true;
    try {
      const queue = window.adsbygoogle || ([] as Record<string, unknown>[]);
      window.adsbygoogle = queue;
      queue.push({});
    } catch {
      setFailed(true);
    }
  }

  return (
    <aside ref={container} aria-label="広告" className={styles.slot} hidden={failed}>
      <p className={styles.label}>広告</p>
      <ins ref={unit} className="adsbygoogle" style={{ display: "block" }}
        data-ad-client="ca-pub-3776709942545828" data-ad-slot="8373997115"
        data-ad-format="auto" data-full-width-responsive="true" />
      {nearby ? <Script id="adsense-detail-script"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3776709942545828"
        strategy="afterInteractive" crossOrigin="anonymous"
        onReady={requestAd} onError={() => setFailed(true)} /> : null}
    </aside>
  );
}
