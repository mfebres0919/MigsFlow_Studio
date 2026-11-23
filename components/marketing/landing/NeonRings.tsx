// The glowing neon rings from the services section of migsflow.com
// (Miguelle, 2026-11-23: "it adds a really nice touch"), two on each side,
// drifting slowly. Styles: ".neon-ring" in app/globals.css. Decoration only;
// shown from tablet width up, where there is room beside the content.

// Size, place and timing of each ring. Each is a complete class list, so Tailwind can find it.
const rings = [
  "size-60 left-[2%] top-[22%] [animation-duration:12s]",
  "size-36 left-[5%] top-[68%] [animation-duration:9s] [animation-delay:-2s]",
  "size-64 right-[2%] top-[40%] [animation-duration:13s] [animation-delay:-3s]",
  "size-40 right-[6%] top-[70%] [animation-duration:10s] [animation-delay:-1s]",
];

export default function NeonRings() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 hidden overflow-clip md:block">
      {rings.map((ring) => (
        <span key={ring} className={`neon-ring ${ring}`} />
      ))}
    </div>
  );
}
