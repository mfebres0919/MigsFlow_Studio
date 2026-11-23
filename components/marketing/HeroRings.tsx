// Three thin circles in the brand's cyan-to-blue, half off the top-right
// corner: the same rings migsflow.com draws behind its hero. Decoration only.
// They used to turn very slowly; that was dropped (2026-11-23) because
// redrawing a circle this big all the time cost more than the motion added.

export default function HeroRings() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 600"
      fill="none"
      className="pointer-events-none absolute -top-48 -right-56 -z-10 size-160 max-sm:-right-80 max-sm:size-120"
    >
      <defs>
        <linearGradient id="hero-rings" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#18c9ff" />
          <stop offset="1" stopColor="#0b3cff" />
        </linearGradient>
      </defs>
      <g stroke="url(#hero-rings)" strokeWidth="2">
        <circle cx="300" cy="300" r="290" opacity="0.14" />
        <circle cx="300" cy="300" r="225" opacity="0.2" strokeDasharray="2 10" />
        <circle cx="300" cy="300" r="160" opacity="0.28" />
      </g>
    </svg>
  );
}
