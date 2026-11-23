"use client"; // it remembers which answers are open

import { useId, useState } from "react";
import { Plus } from "lucide-react";

// The FAQ's questions and answers, opening and closing smoothly
// (Miguelle, 2026-11-23: "smooth going down and up").
//
// Why not <details>? The browser's own <details> snaps shut in most
// browsers. Here each question is a button, and its answer slides open and
// shut with the same trick as the editor's sections: a grid row animated
// from 0fr (no height) to 1fr (full height). aria-expanded tells screen
// readers whether an answer is showing. Several answers can be open at once.

export type FaqItem = { q: string; a: string };

function FaqEntry({ item, open, onToggle }: { item: FaqItem; open: boolean; onToggle: () => void }) {
  const answerId = useId();
  return (
    <li
      className={`rounded-2xl border bg-panel transition-[border-color,box-shadow] duration-300 motion-reduce:transition-none ${
        open ? "border-signal/40 shadow-lg shadow-accent/10" : "border-line hover:border-line-strong"
      }`}
    >
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={answerId}
          onClick={onToggle}
          className="flex min-h-16 w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left text-lg font-semibold"
        >
          {item.q}
          {/* The plus turns into a cross, and its circle fills with blue, when open. */}
          <span
            aria-hidden="true"
            className={`grid size-9 shrink-0 place-items-center rounded-full border transition-colors duration-300 motion-reduce:transition-none ${
              open ? "bg-brand-gradient border-transparent text-white" : "border-line text-signal"
            }`}
          >
            <Plus
              className={`size-4 transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-45" : ""}`}
            />
          </span>
        </button>
      </h3>

      {/* "inert" keeps a closed answer out of reach of the Tab key and screen readers. */}
      <div
        id={answerId}
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        {/* "relative": keeps anything positioned inside from escaping the hidden area (the project's layout rule). */}
        <div className="relative min-h-0 overflow-hidden">
          <p className="px-5 pb-5 text-fg-muted">{item.a}</p>
        </div>
      </div>
    </li>
  );
}

export default function FaqList({ items }: { items: FaqItem[] }) {
  // The first answer starts open, so it is clear these open.
  const [open, setOpen] = useState<number[]>([0]);
  const toggle = (index: number) =>
    setOpen((current) => (current.includes(index) ? current.filter((entry) => entry !== index) : [...current, index]));

  return (
    <ul role="list" className="grid gap-3">
      {items.map((item, index) => (
        <FaqEntry key={item.q} item={item} open={open.includes(index)} onToggle={() => toggle(index)} />
      ))}
    </ul>
  );
}
