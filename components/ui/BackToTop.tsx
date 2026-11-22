"use client"; // runs in the browser: it needs to know how far the page has scrolled

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

// The round "back to top" button, bottom-right (MigsFlow handbook rule).
// It is a plain link to #top, so it works even before JavaScript loads.
// JavaScript only decides when it is visible.
export default function BackToTop() {
  // "state" is a value React remembers and redraws for. When setShown changes
  // it, the button re-renders with the new classes. (Vanilla version: a scroll
  // listener that toggled a class with classList.)
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    // Tidy up: remove the listener if this component ever leaves the page.
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#top"
      // "invisible" (not just see-through) while hidden, so it cannot be tabbed to.
      className={`fixed right-4 bottom-4 z-40 grid size-12 place-items-center rounded-full bg-accent text-white shadow-lg transition-[opacity,visibility] duration-300 hover:bg-accent-hover motion-reduce:transition-none ${shown ? "visible opacity-100" : "invisible opacity-0"}`}
    >
      <span className="sr-only">Back to top</span>
      <ArrowUp aria-hidden="true" className="size-5" />
    </a>
  );
}
