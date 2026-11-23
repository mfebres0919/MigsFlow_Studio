// Switching between light and dark mode, with the animation.
//
// How the theme works: <html> carries data-theme="light" or "dark", and
// app/globals.css gives the color tokens different values for each. So a
// switch only has to flip that one attribute and remember the choice
// (app/layout.tsx reads it back before the page is drawn).
//
// The animation: the new look spreads out in a growing circle from the
// button that was pressed. It uses the browser's View Transitions: the
// browser takes a picture of the page before and after the change, and we
// reveal the "after" picture through a circle that grows from the click.
// Browsers without that feature, and people who ask for reduced motion, get
// a plain instant switch.

/** Flips the theme. Pass the button that was pressed so the circle can start from it. */
export function switchTheme(button?: HTMLElement | null) {
  const root = document.documentElement; // the <html> element
  const next = root.dataset.theme === "dark" ? "light" : "dark";

  // "applied" makes sure the change happens exactly once, whichever of the
  // callers below gets to it first.
  let applied = false;
  const apply = () => {
    if (applied) return;
    applied = true;
    root.dataset.theme = next;
  };

  try {
    localStorage.setItem("theme", next);
  } catch {
    // Storage can be blocked (private windows). The theme still switches for this visit.
  }

  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || calm) {
    apply();
    return;
  }

  // The circle starts at the middle of the button (or the top right corner if there is none)…
  const box = button?.getBoundingClientRect();
  const x = box ? box.left + box.width / 2 : window.innerWidth;
  const y = box ? box.top + box.height / 2 : 0;
  // …and must grow far enough to reach the farthest corner of the screen.
  const reach = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  // Tells globals.css to switch off the browser's default cross-fade for this transition.
  root.dataset.themeWipe = "";
  const transition = document.startViewTransition(apply);

  transition.ready.then(() => {
    root.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${reach}px at ${x}px ${y}px)`] },
      { duration: 650, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" },
    );
  });
  transition.finished.finally(() => {
    delete root.dataset.themeWipe;
  });

  // Safety net: if the browser is slow to start the transition (seen in
  // Safari's engine), switch anyway after a moment. The theme then changes
  // without the circle rather than not at all.
  window.setTimeout(apply, 400);
}
