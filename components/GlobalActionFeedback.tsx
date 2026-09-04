"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const PENDING_CLASS = "ui-action-pending";
const MANAGED_ATTRIBUTE = "data-pending-managed";

function clearPendingActions() {
  document.querySelectorAll<HTMLElement>(`.${PENDING_CLASS}`).forEach((element) => {
    element.classList.remove(PENDING_CLASS);
    element.removeAttribute("aria-busy");
    element.removeAttribute("aria-disabled");
  });
}

function showPending(element: HTMLElement, timeoutMs = 60_000) {
  if (element.hasAttribute(MANAGED_ATTRIBUTE)) return;

  clearPendingActions();
  element.classList.add(PENDING_CLASS);
  element.setAttribute("aria-busy", "true");
  element.setAttribute("aria-disabled", "true");

  window.setTimeout(() => {
    element.classList.remove(PENDING_CLASS);
    element.removeAttribute("aria-busy");
    element.removeAttribute("aria-disabled");
  }, timeoutMs);
}

export function GlobalActionFeedback() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    clearPendingActions();
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target instanceof Element ? event.target : null;
      const link = target?.closest<HTMLAnchorElement>("a[href]");

      if (link) {
        if (link.hasAttribute("download") || link.target === "_blank") return;

        const url = new URL(link.href, window.location.href);
        if (!["http:", "https:"].includes(url.protocol)) return;
        if (url.href === window.location.href || url.hash && url.pathname === window.location.pathname && url.search === window.location.search) return;

        showPending(link);
        return;
      }

      const button = target?.closest<HTMLButtonElement>("button");
      if (!button || button.disabled || button.type === "submit") return;

      window.setTimeout(() => {
        if (!event.defaultPrevented) showPending(button, 1_200);
      }, 0);
    };

    const handleSubmit = (event: SubmitEvent) => {
      const submitter = event.submitter;
      if (submitter instanceof HTMLElement) showPending(submitter);
    };

    document.addEventListener("click", handleClick, true);
    document.addEventListener("submit", handleSubmit, true);
    window.addEventListener("pageshow", clearPendingActions);
    window.addEventListener("popstate", clearPendingActions);

    return () => {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("submit", handleSubmit, true);
      window.removeEventListener("pageshow", clearPendingActions);
      window.removeEventListener("popstate", clearPendingActions);
    };
  }, []);

  return null;
}
