import { useId } from "react";
import { ChevronDown } from "lucide-react";
import FieldRenderer, { type FieldContext } from "@/components/editor/FieldRenderer";
import type { FieldValue, SectionContent, SectionSchema } from "@/templates/types";

// One group of fields in the editor, e.g. "Business details". It folds open
// and shut so a long page of settings stays manageable.
//
// A section the template lets customers switch off (schema: hideable) also
// gets a Show / Hide switch beside its name. A hidden section keeps its
// fields, so switching it back on brings everything back.

type SectionFormProps = {
  section: SectionSchema;
  content: SectionContent;
  open: boolean;
  onToggle: (open: boolean) => void;
  onFieldChange: (fieldKey: string, value: FieldValue) => void;
  context: FieldContext;
  /** Set when this section still holds placeholder content: "required" must be changed before publishing. */
  flag?: "required" | "recommended";
  /** Only for hideable sections: whether it is switched off, and how to change that. */
  visibility?: { hidden: boolean; onChange: (hidden: boolean) => void };
};

// The small note beside a section's name. Words carry the meaning; the color backs it up.
const flags = {
  required: { text: "Must change", className: "border-danger/60 text-danger" },
  recommended: { text: "Suggested", className: "border-warning/60 text-warning" },
};

export default function SectionForm({
  section,
  content,
  open,
  onToggle,
  onFieldChange,
  context,
  flag,
  visibility,
}: SectionFormProps) {
  const bodyId = useId();

  return (
    // data-section-open lets the editor find the open section when a field is clicked in the preview.
    <section
      data-section-open={open}
      className={`rounded-panel border bg-panel transition-colors ${open ? "border-line-strong" : "border-line"}`}
    >
      <div className="flex items-center">
        <h3 className="min-w-0 flex-1">
          {/* aria-expanded tells screen readers whether the section is open;
            aria-controls says which element it opens. */}
          <button
            type="button"
            aria-expanded={open}
            aria-controls={bodyId}
            onClick={() => onToggle(!open)}
            // An open section gets the same blue marker as the current page in the dashboard menu.
            className={`relative flex min-h-12 w-full items-center gap-3 rounded-panel px-4 py-2 text-left font-semibold ${
              open
                ? "before:absolute before:inset-y-3 before:left-0 before:w-1 before:rounded-full before:bg-linear-to-b before:from-signal before:to-accent"
                : ""
            }`}
          >
            <span className={`flex-1 ${visibility?.hidden ? "text-fg-muted line-through decoration-1" : ""}`}>
              {section.label}
            </span>
            {visibility?.hidden && (
              <span className="shrink-0 rounded-full border border-line px-2 py-0.5 text-xs font-medium text-fg-muted">
                Hidden
              </span>
            )}
            {flag && (
              <span className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium ${flags[flag].className}`}>
                {flags[flag].text}
              </span>
            )}
            <ChevronDown
              aria-hidden="true"
              className={`size-5 shrink-0 text-fg-muted transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
            />
          </button>
        </h3>

        {/* The Show / Hide switch. It sits beside the heading button, not inside
          it: a button inside a button is not allowed. role="switch" makes
          screen readers announce it as "on" or "off". */}
        {visibility && (
          <button
            type="button"
            role="switch"
            aria-checked={!visibility.hidden}
            onClick={() => visibility.onChange(!visibility.hidden)}
            className="mr-3 grid min-h-11 shrink-0 place-items-center px-1"
          >
            <span
              aria-hidden="true"
              className={`relative h-6 w-11 rounded-full transition-colors motion-reduce:transition-none ${visibility.hidden ? "bg-line-strong/60" : "bg-accent"}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform motion-reduce:transition-none ${visibility.hidden ? "" : "translate-x-5"}`}
              />
            </span>
            <span className="sr-only">Show {section.label} on your website</span>
          </button>
        )}
      </div>

      {/* The smooth open and close. A browser cannot animate "height: auto",
          but it can animate a grid row from 0fr (no height) to 1fr (as tall
          as the content). The inner element hides what does not fit yet.
          "inert" keeps a closed section's inputs out of reach of the Tab key
          and screen readers. People who ask for reduced motion get no animation. */}
      <div
        id={bodyId}
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        {/* "relative" is needed here too. A closed section's content is still
            laid out at full height and merely hidden. Its visually hidden
            helpers are positioned absolutely, and without "relative" they
            escape this hiding and add a tall blank area to the bottom of the panel. */}
        <div className="relative min-h-0 overflow-hidden">
          {/* data-section-body and data-field let the editor find a field's
              input when its text is clicked in the preview. */}
          <div data-section-body className="grid gap-5 border-t border-line p-4">
            {visibility?.hidden && (
              <p className="rounded-control bg-raised px-3 py-2 text-sm text-fg-muted">
                This section is hidden from your website. What you entered is kept: switch it back on any time.
              </p>
            )}
            {section.description && <p className="text-sm text-fg-muted">{section.description}</p>}
            {section.fields.map((field) => (
              <div key={field.key} data-field={field.key}>
                <FieldRenderer
                  field={field}
                  value={content[field.key]}
                  onChange={(value) => onFieldChange(field.key, value)}
                  context={context}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
