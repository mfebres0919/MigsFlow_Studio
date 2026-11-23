// The heading at the top of each landing page section: a small label above,
// the title in Orbitron, and an optional line of text. Every section uses
// it, so they all line up the same way.

type SectionHeadingProps = {
  /** The id the section's aria-labelledby points to. */
  id: string;
  /** The small word above the title, e.g. "How it works". */
  eyebrow: string;
  title: string;
  text?: string;
  /** Centered (default) or left-aligned. */
  align?: "center" | "left";
};

export default function SectionHeading({ id, eyebrow, title, text, align = "center" }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="text-sm font-semibold tracking-[0.16em] text-signal uppercase">{eyebrow}</p>
      <h2 id={id} className="mt-3 font-display text-3xl font-medium tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {text && <p className="mt-4 text-lg text-fg-muted">{text}</p>}
    </div>
  );
}
