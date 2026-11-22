"use client"; // opening and closing the drawer happens in the browser

import { useRef } from "react";
import { Menu, X } from "lucide-react";

// The menu button and slide-out drawer for phones and tablets.
//
// It uses the browser's own <dialog> element. Opened with showModal(), the
// browser itself keeps keyboard focus inside the drawer, closes it on Escape
// and dims the page behind it: things a hand-built drawer needs a lot of
// JavaScript to get right.
//
// "children" is whatever is placed between <MobileNav> and </MobileNav>: here
// the sidebar content, which was already drawn on the server.
export default function MobileNav({ children }: { children: React.ReactNode }) {
  // A ref is a handle on a real element, like document.querySelector would give.
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        className="grid size-11 place-items-center rounded-control text-fg hover:bg-raised"
      >
        <span className="sr-only">Open menu</span>
        <Menu aria-hidden="true" className="size-6" />
      </button>

      <dialog
        ref={dialog}
        aria-label="Menu"
        // Close when a link inside is chosen, or when the dimmed area is clicked
        // (a click on the dimmed area lands on the <dialog> element itself).
        onClick={(event) => {
          const target = event.target as HTMLElement;
          if (target === dialog.current || target.closest("a")) dialog.current?.close();
        }}
        className="m-0 h-dvh max-h-none w-72 max-w-[85vw] border-r border-line bg-panel text-fg backdrop:bg-black/60"
      >
        <div className="relative h-full">
          {children}
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            className="absolute top-3 right-3 grid size-11 place-items-center rounded-control text-fg-muted hover:bg-raised hover:text-fg"
          >
            <span className="sr-only">Close menu</span>
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>
      </dialog>
    </>
  );
}
