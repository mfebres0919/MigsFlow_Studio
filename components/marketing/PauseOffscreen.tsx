"use client"; // it watches the page scroll, which only happens in the browser

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Pauses animations nobody can see (the same fix as migsflow.com's
// ".is-offscreen", 2026-11-23). Any element marked data-pause-offscreen gets
// data-offscreen while it is scrolled out of view, and app/globals.css
// freezes every animation inside it. The moment it comes back into view,
// they carry on from where they stopped.
//
// It draws nothing. It sits once in the public layout and looks after the
// whole page, so the stars, floating devices and flowing lines don't each
// need their own watcher.
//
// Every marked element also carries suppressHydrationWarning: this script may
// add data-offscreen before React has finished taking over that part of the
// page, and that attribute is expected to differ from the built HTML.
//
// IntersectionObserver is the browser's built-in "tell me when this enters
// or leaves the screen". It is far cheaper than checking on every scroll.

export default function PauseOffscreen() {
  // The page changes on navigation without a reload, so look again for marked elements each time.
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        entry.target.toggleAttribute("data-offscreen", !entry.isIntersecting);
      }
    });
    document.querySelectorAll("[data-pause-offscreen]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
