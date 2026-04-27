"use client";

import { useEffect } from "react";

const KEY = "main-page-scroll";

export function MainScrollRestorer() {
  useEffect(() => {
    const saved = sessionStorage.getItem(KEY);
    if (saved && !window.location.hash) {
      window.scrollTo(0, parseInt(saved, 10));
    }

    const onClickCapture = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest?.("a");
      if (!link) return;
      sessionStorage.setItem(KEY, String(window.scrollY));
    };
    const onPageHide = () => {
      sessionStorage.setItem(KEY, String(window.scrollY));
    };
    document.addEventListener("click", onClickCapture, true);
    window.addEventListener("pagehide", onPageHide);
    return () => {
      document.removeEventListener("click", onClickCapture, true);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, []);

  return null;
}
