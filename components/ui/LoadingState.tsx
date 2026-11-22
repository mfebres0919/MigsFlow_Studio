// Shown while data is on its way. role="status" makes screen readers announce it.

type LoadingStateProps = {
  /** What is loading, e.g. "Loading your websites". */
  label: string;
};

export default function LoadingState({ label }: LoadingStateProps) {
  return (
    <div role="status" className="grid gap-4">
      <span className="sr-only">{label}</span>
      {/* Soft placeholder blocks. The pulse is skipped for people who ask for reduced motion. */}
      <div aria-hidden="true" className="h-24 rounded-panel bg-panel motion-safe:animate-pulse" />
      <div aria-hidden="true" className="h-40 rounded-panel bg-panel motion-safe:animate-pulse" />
    </div>
  );
}
