// The flowing lines along the bottom of the hero: MigsFlow's "flow", drawn as
// three curves in the brand's cyan-to-blue. Each curve is drawn twice: once
// as a faint, unbroken line, and once as a single brighter stretch that
// travels slowly along it. Purely decoration, so it is hidden from screen
// readers, and the travelling stretch is skipped for reduced motion.

const curves = [
  { d: "M-40 150 C 220 70, 380 230, 640 130 S 1020 -30, 1240 40", width: 2, seconds: 14 },
  { d: "M-40 205 C 260 145, 420 285, 700 185 S 1040 25, 1240 95", width: 1.5, seconds: 19 },
  { d: "M-40 100 C 180 20, 360 190, 600 80 S 980 -90, 1240 -30", width: 1, seconds: 24 },
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
          <g key={curve.d}>
            <path d={curve.d} strokeWidth={curve.width} opacity="0.22" />
            {/* One bright stretch (180 long) with a long gap after it, sliding along the curve.
                The duration is data, so it is set with a style (the handbook's dynamic-value exception). */}
            <path
              d={curve.d}
              strokeWidth={curve.width}
              strokeDasharray="180 1460"
              opacity="0.9"
              style={{ animationDuration: `${curve.seconds}s` }}
              className="motion-safe:animate-flow"
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
