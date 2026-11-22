"use client"; // it reacts to a click and uses the browser's storage

import { Moon, Sun } from "lucide-react";

// The light / dark mode button.
//
// How the theme works: <html> carries data-theme="light" or "dark", and
// app/globals.css gives the color tokens different values for each. So this
// button only has to do two things: flip that one attribute, and remember
// the choice in localStorage so it survives a reload (app/layout.tsx reads
// it back before the page is drawn).
//
// Notice there is no React state here. Both labels are always in the HTML and
// CSS shows the right one ("dark:" classes apply only in dark mode). That
// way the server never has to guess which theme the visitor picked.
export default function ThemeToggle() {
  function switchTheme() {
    const root = document.documentElement; // the <html> element
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be blocked (private windows). The theme still switches for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={switchTheme}
      className="flex min-h-11 items-center gap-3 rounded-control px-3 font-medium text-fg-muted transition-colors hover:bg-raised hover:text-fg"
    >
      {/* Light mode (the default) offers the moon; dark mode offers the sun. */}
      <Moon aria-hidden="true" className="size-5 shrink-0 dark:hidden" />
      <Sun aria-hidden="true" className="hidden size-5 shrink-0 dark:block" />
      <span className="dark:hidden">Switch to dark mode</span>
      <span className="hidden dark:inline">Switch to light mode</span>
    </button>
  );
}
