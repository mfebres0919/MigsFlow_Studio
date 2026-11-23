"use client"; // it reacts to a click and uses the browser's storage

import { Moon, Sun } from "lucide-react";
import { switchTheme } from "@/lib/theme";

// The light / dark mode button. Two looks:
// - "icon": a round sun-or-moon button, for the public header;
// - "row": an icon with words, for the dashboard's sidebar.
//
// There is no React state here. Both icons and both labels are always in the
// HTML and CSS shows the right one ("dark:" classes apply only in dark mode).
// That way the server never has to guess which theme the visitor picked.

type ThemeToggleProps = {
  variant?: "icon" | "row";
};

export default function ThemeToggle({ variant = "row" }: ThemeToggleProps) {
  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={(event) => switchTheme(event.currentTarget)}
        className="relative grid size-10 shrink-0 place-items-center rounded-full border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
      >
        {/* The two icons sit on top of each other. Switching theme spins one
            out and the other in. Light mode shows the moon ("go dark"). */}
        <Moon
          aria-hidden="true"
          className="col-start-1 row-start-1 size-5 transition-[rotate,scale,opacity] duration-500 dark:scale-0 dark:rotate-90 dark:opacity-0 motion-reduce:transition-none"
        />
        <Sun
          aria-hidden="true"
          className="col-start-1 row-start-1 size-5 scale-0 -rotate-90 opacity-0 transition-[rotate,scale,opacity] duration-500 dark:scale-100 dark:rotate-0 dark:opacity-100 motion-reduce:transition-none"
        />
        <span className="sr-only dark:hidden">Switch to dark mode</span>
        <span className="sr-only hidden dark:inline">Switch to light mode</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={(event) => switchTheme(event.currentTarget)}
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
