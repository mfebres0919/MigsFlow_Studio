import { Settings2 } from "lucide-react";
import type { PageSchema } from "@/templates/types";
import { SITE_SCOPE, type PublishIssue } from "@/templates/publish-checks";

// Chooses what the form shows: one of the website's pages, or the settings
// shared by every page. Every choice is visible at once, and a red dot marks
// the ones that still hold placeholder details that must be changed.

type ScopePickerProps = {
  pages: PageSchema[];
  scope: string;
  issues: PublishIssue[];
  onChange: (scope: string) => void;
};

const pill =
  "inline-flex min-h-9 items-center gap-2 rounded-full border border-line px-3.5 text-sm font-medium text-fg-muted hover:text-fg aria-pressed:border-signal aria-pressed:bg-raised aria-pressed:text-fg";

export default function ScopePicker({ pages, scope, issues, onChange }: ScopePickerProps) {
  // True when a page (or the site-wide settings) has something that blocks publishing.
  const mustChange = (key: string) => issues.some((issue) => issue.scope === key && issue.level === "required");

  const choices = [...pages.map((page) => ({ key: page.key, label: page.label })), { key: SITE_SCOPE, label: "Site-wide settings" }];

  return (
    <div role="group" aria-label="What to edit" className="flex flex-wrap gap-2">
      {choices.map((choice) => (
        <button
          key={choice.key}
          type="button"
          aria-pressed={scope === choice.key} // tells screen readers which one is showing
          onClick={() => onChange(choice.key)}
          className={pill}
        >
          {choice.key === SITE_SCOPE && <Settings2 aria-hidden="true" className="size-4" />}
          {choice.label}
          {mustChange(choice.key) && (
            <>
              <span aria-hidden="true" className="size-2 rounded-full bg-danger" />
              {/* The dot is only a color, so the same fact is also written for screen readers. */}
              <span className="sr-only">(has details that must be changed)</span>
            </>
          )}
        </button>
      ))}
    </div>
  );
}
