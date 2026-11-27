"use client"; // it remembers which tab is chosen and reacts to the arrow keys

import { useId, useRef, useState, type KeyboardEvent } from "react";
import FaqList, { type FaqItem } from "@/components/marketing/landing/FaqList";

// The FAQ split into tabs by topic (Miguelle, 2026-11-27: "so people know
// what certain questions are about"). Each tab shows its own FaqList.
//
// This follows the standard "tabs" pattern screen readers know:
// - role="tablist" / "tab" / "tabpanel", and aria-selected on the chosen tab;
// - only the chosen tab is reached with Tab; the arrow keys (and Home / End)
//   move between tabs, so a keyboard user doesn't have to step through all of them.
//
// Every panel stays in the page, with "hidden" on the ones not chosen, so
// the answers opened in one tab are still open when you come back to it.

export type FaqGroup = { label: string; items: FaqItem[] };

export default function FaqTabs({ groups }: { groups: FaqGroup[] }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const last = groups.length - 1;
    const next =
      event.key === "ArrowRight" ? (active === last ? 0 : active + 1)
      : event.key === "ArrowLeft" ? (active === 0 ? last : active - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null;
    if (next === null) return;
    event.preventDefault(); // stop the page scrolling on Home / End
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Question topics"
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-2"
      >
        {groups.map((group, index) => {
          const selected = index === active;
          return (
            <button
              key={group.label}
              ref={(element) => {
                tabs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${index}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${index}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              className={`min-h-11 rounded-full border px-4 text-sm font-medium transition-colors motion-reduce:transition-none ${
                selected
                  ? "bg-brand-gradient border-transparent text-white shadow-lg shadow-accent/25"
                  : "border-line bg-panel text-fg-muted hover:border-line-strong hover:text-fg"
              }`}
            >
              {group.label}
              <span className={selected ? "ml-1.5 text-white/80" : "ml-1.5 text-fg-muted"}>{group.items.length}</span>
            </button>
          );
        })}
      </div>

      {groups.map((group, index) => (
        <div
          key={group.label}
          role="tabpanel"
          id={`${baseId}-panel-${index}`}
          aria-labelledby={`${baseId}-tab-${index}`}
          hidden={index !== active}
          className="mt-6"
        >
          <FaqList items={group.items} />
        </div>
      ))}
    </div>
  );
}
