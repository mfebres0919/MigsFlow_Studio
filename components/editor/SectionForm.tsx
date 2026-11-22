import { useId } from "react";
import { ChevronDown } from "lucide-react";
import FieldRenderer, { type FieldContext } from "@/components/editor/FieldRenderer";
import type { FieldValue, SectionContent, SectionSchema } from "@/templates/types";

// One group of fields in the editor, e.g. "Business details". It folds open
// and shut so a long page of settings stays manageable.

type SectionFormProps = {
  section: SectionSchema;
  content: SectionContent;
  open: boolean;
  onToggle: (open: boolean) => void;
  onFieldChange: (fieldKey: string, value: FieldValue) => void;
  context: FieldContext;
  /** Set when this section still holds placeholder content: "required" must be changed before publishing. */
  flag?: "required" | "recommended";
};

// The small note beside a section's name. Words carry the meaning; the color backs it up.
const flags = {
  required: { text: "Must change", className: "border-danger/60 text-danger" },
  recommended: { text: "Suggested", className: "border-warning/60 text-warning" },
};

export default function SectionForm({ section, content, open, onToggle, onFieldChange, context, flag }: SectionFormProps) {
  const bodyId = useId();

  return (
    // data-section-open lets the editor find the open section when a field is clicked in the preview.
    <section
      data-section-open={open}
      className={`rounded-panel border bg-panel transition-colors ${open ? "border-line-strong" : "border-line"}`}
    >
      <h3>
        {/* aria-expanded tells screen readers whether the section is open;
            aria-controls says which element it opens. */}
        <button
          type="button"
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={() => onToggle(!open)}
          // An open section gets the same blue marker as the current page in the dashboard menu.
          className={`relative flex min-h-12 w-full items-center gap-3 rounded-panel px-4 py-2 text-left font-semibold ${
            open ? "before:absolute before:inset-y-3 before:left-0 before:w-1 before:rounded-full before:bg-linear-to-b before:from-signal before:to-accent" : ""
          }`}
        >
          <span className="flex-1">{section.label}</span>
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
