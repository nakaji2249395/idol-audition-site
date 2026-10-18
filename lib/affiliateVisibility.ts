/** A view is 50% of the card in view for one uninterrupted second in a visible tab. */
export function observeAffiliateVisibility(element: Element, onView: () => void) {
  if (typeof IntersectionObserver === "undefined") return () => {};
  let visible = false;
  let sent = false;
  let disposed = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const clear = () => {
    if (timer !== undefined) clearTimeout(timer);
    timer = undefined;
  };
  const update = () => {
    clear();
    if (!disposed && !sent && visible && document.visibilityState === "visible") {
      timer = setTimeout(() => {
        if (disposed || sent || !visible || document.visibilityState !== "visible") return;
        sent = true;
        observer.disconnect();
        document.removeEventListener("visibilitychange", update);
        onView();
      }, 1000);
    }
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = !!entry && entry.isIntersecting && entry.intersectionRatio >= 0.5;
    update();
  }, { threshold: [0, 0.5] });
  observer.observe(element);
  document.addEventListener("visibilitychange", update);
  return () => {
    disposed = true;
    clear();
    observer.disconnect();
    document.removeEventListener("visibilitychange", update);
  };
}
