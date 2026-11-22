import Button from "@/components/ui/Button";
import DemoLabel from "@/components/ui/DemoLabel";

// The strip above a website preview. It belongs to Studio, not to the
// customer's website, so it uses Studio's own colors and follows Studio's
// light or dark mode.

type PreviewBarProps = {
  websiteName: string;
  /** A one-off message, e.g. after pressing the form's button. */
  notice: string | null;
};

export default function PreviewBar({ websiteName, notice }: PreviewBarProps) {
  return (
    // <aside> with a name makes this a "landmark": screen-reader users can
    // jump to it, and it is clearly separate from the customer's website below.
    <aside aria-label="About this preview" className="border-b border-line bg-panel text-fg">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-medium">
            Preview of your draft<span className="text-fg-muted">: {websiteName}</span>
          </p>
          <DemoLabel>Sample content</DemoLabel>
        </div>
        <Button href="/dashboard/websites" variant="secondary" size="sm">
          Back to my websites
        </Button>
      </div>
      {/* aria-live makes screen readers read the message out when it appears. */}
      <p aria-live="polite" className="mx-auto max-w-6xl px-4 text-sm text-fg-muted sm:px-6">
        {notice && <span className="block pb-3">{notice}</span>}
      </p>
    </aside>
  );
}
