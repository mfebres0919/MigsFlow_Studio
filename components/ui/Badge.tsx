// A small status pill, such as "Draft" or "Published".
// The word always carries the meaning; the color only backs it up, so it
// still works for someone who cannot tell the colors apart.

type Tone = "neutral" | "info" | "success" | "warning" | "danger";

type BadgeProps = {
  tone?: Tone;
  children: React.ReactNode;
};

const tones: Record<Tone, string> = {
  neutral: "border-line-strong text-fg-muted",
  info: "border-signal/50 text-signal",
  success: "border-success/50 text-success",
  warning: "border-warning/50 text-warning",
  danger: "border-danger/50 text-danger",
};

export default function Badge({ tone = "neutral", children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-sm font-medium ${tones[tone]}`}
    >
      {/* The dot takes the text color ("bg-current"). */}
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}
