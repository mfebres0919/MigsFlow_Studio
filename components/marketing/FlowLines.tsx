// The flowing lines along the bottom of the hero: MigsFlow's "flow", drawn as
// three curves in the brand's cyan-to-blue. Purely decoration, so it is
// hidden from screen readers.
//
// They used to have a bright stretch sliding along each curve. That was
// dropped (2026-11-23): animating a line's dashes makes the browser redraw
// the whole drawing on every frame, and the pages lagged in Firefox. Now the
// lines are still, so they are drawn once.

const curves = [
  { d: "M-40 150 C 220 70, 380 230, 640 130 S 1020 -30, 1240 40", width: 2 },
  { d: "M-40 205 C 260 145, 420 285, 700 185 S 1040 25, 1240 95", width: 1.5 },
  { d: "M-40 100 C 180 20, 360 190, 600 80 S 980 -90, 1240 -30", width: 1 },
];

export default function FlowLines() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 260"
      // "slice" keeps the curves' shape on narrow screens (cropping the sides) instead of squashing them.
      preserveAspectRatio="xMidYMax slice"
      // On wide screens the lines fade out toward the left, so they never run through the text there.
      className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64 w-full lg:mask-[linear-gradient(to_right,transparent_32%,black_66%)]"
    >
      <defs>
        <linearGradient id="flow-stroke" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="var(--color-signal)" stopOpacity="0" />
          <stop offset="0.3" stopColor="var(--color-signal)" />
          <stop offset="0.75" stopColor="var(--color-accent)" />
          <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#flow-stroke)" strokeLinecap="round">
        {curves.map((curve) => (
          <path key={curve.d} d={curve.d} strokeWidth={curve.width} opacity="0.5" />
        ))}
      </g>
    </svg>
  );
}
