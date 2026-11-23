// SVG dividers between the landing page's sections (Miguelle, 2026-11-23).
// Decoration only, so screen readers skip them.
//
// - WaveDivider: a soft wave filled with the color of the band it leads
//   into (or out of), with a thin brand-gradient line along its edge.
// - FlowDivider: a thin flowing line in the brand blues, between two
//   sections that share the page background. It echoes the "flow" in MigsFlow.

/** The wave above (or, flipped, below) the light band behind "What's included". */
export function WaveDivider({ flip = false }: { flip?: boolean }) {
  const id = flip ? "wave-edge-bottom" : "wave-edge-top";
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      className={`block h-14 w-full sm:h-20 ${flip ? "rotate-180" : ""}`}
    >
      <defs>
        <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="var(--color-signal)" stopOpacity="0" />
          <stop offset="0.35" stopColor="var(--color-signal)" stopOpacity="0.55" />
          <stop offset="0.7" stopColor="var(--color-accent)" stopOpacity="0.55" />
          <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* The filled wave: the same color as the band (bg-panel/60). */}
      <path d="M0 90 V52 C 220 8, 470 2, 720 34 S 1210 84, 1440 26 V90 Z" fill="var(--color-panel)" fillOpacity="0.6" />
      {/* The thin line along its top edge. */}
      <path d="M0 52 C 220 8, 470 2, 720 34 S 1210 84, 1440 26" fill="none" stroke={`url(#${id})`} strokeWidth="2" />
    </svg>
  );
}

/** A thin flowing line with a small glowing dot in the middle. */
export function FlowDivider() {
  return (
    <div aria-hidden="true" className="mx-auto max-w-6xl px-4 sm:px-6">
      <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="block h-10 w-full">
        <defs>
          <linearGradient id="flow-divider" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="var(--color-signal)" stopOpacity="0" />
            <stop offset="0.5" stopColor="var(--color-signal)" stopOpacity="0.7" />
            <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 20 C 200 4, 400 36, 600 20 S 1000 4, 1200 20" fill="none" stroke="url(#flow-divider)" strokeWidth="1.5" />
        <circle cx="600" cy="20" r="4" fill="var(--color-signal)" />
        <circle cx="600" cy="20" r="10" fill="var(--color-signal)" fillOpacity="0.15" />
      </svg>
    </div>
  );
}

/**
 * Under the hero: a wide, gentle arc in the brand blues with a glowing dot
 * at its lowest point, leading the eye down into "How it works".
 */
export function ArcDivider() {
  return (
    <div aria-hidden="true" className="mx-auto mt-10 max-w-5xl px-4 sm:px-6">
      <svg viewBox="0 0 1000 70" preserveAspectRatio="none" className="block h-12 w-full sm:h-16">
        <defs>
          <linearGradient id="arc-divider" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="var(--color-signal)" stopOpacity="0" />
            <stop offset="0.5" stopColor="var(--color-signal)" stopOpacity="0.8" />
            <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 8 Q 500 120 1000 8" fill="none" stroke="url(#arc-divider)" strokeWidth="1.5" />
        <path d="M120 4 Q 500 90 880 4" fill="none" stroke="url(#arc-divider)" strokeWidth="1" opacity="0.5" />
        <circle cx="500" cy="64" r="4.5" fill="var(--color-signal)" />
        <circle cx="500" cy="64" r="12" fill="var(--color-signal)" fillOpacity="0.15" />
      </svg>
    </div>
  );
}
