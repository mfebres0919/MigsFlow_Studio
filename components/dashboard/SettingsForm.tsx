"use client";

import { useId, useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

// One settings form (personal details, or business details). The two forms
// work the same way, so they share this component and differ only in the
// fields they are given.

export type SettingsField = {
  name: string;
  label: string;
  type: "text" | "email" | "tel";
  /** Tells the browser what the field is, so it can offer to fill it in. */
  autoComplete: string;
  /** Returns a message if the value is not acceptable, or null if it is. */
  validate?: (value: string) => string | null;
};

type SettingsFormProps = {
  title: string;
  description: string;
  fields: SettingsField[];
  /** The starting values, by field name. */
  initial: Record<string, string>;
};

export default function SettingsForm({ title, description, fields, initial }: SettingsFormProps) {
  const id = useId();
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Check every field and collect the messages for the ones that fail.
    const found: Record<string, string> = {};
    for (const field of fields) {
      const problem = field.validate?.(values[field.name] ?? "");
      if (problem) found[field.name] = problem;
    }
    setErrors(found);
    // SIMULATED: nothing is sent or stored. Phase 3 saves this to the customer's profile.
    setSaved(Object.keys(found).length === 0);
  }

  return (
    <Card title={title} description={description}>
      {/* noValidate: our own messages are used instead of the browser's pop-up bubbles. */}
      <form onSubmit={handleSubmit} noValidate className="grid max-w-xl gap-5">
        {fields.map((field) => {
          const inputId = `${id}-${field.name}`;
          const error = errors[field.name];
          return (
            <div key={field.name}>
              <label htmlFor={inputId} className="block font-medium">
                {field.label}
              </label>
              <input
                id={inputId}
                name={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                value={values[field.name] ?? ""}
                onChange={(event) => {
                  setValues({ ...values, [field.name]: event.target.value });
                  setSaved(false);
                }}
                // These two tie the error message to the input for screen readers.
                aria-invalid={error ? "true" : undefined}
                aria-describedby={error ? `${inputId}-error` : undefined}
                className="mt-1.5 block min-h-11 w-full rounded-control border border-line-strong bg-ink px-3 py-2 text-fg"
              />
              {error && (
                <p id={`${inputId}-error`} className="mt-1.5 text-sm font-medium text-danger">
                  {error}
                </p>
              )}
            </div>
          );
        })}

        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit">Save changes</Button>
          {/* role="status" reads the result aloud when it appears. */}
          <p role="status" className="text-sm text-fg-muted">
            {saved && "Checked and accepted. In this prototype your details are not stored."}
            {Object.keys(errors).length > 0 && "Some details need fixing. See the messages above."}
          </p>
        </div>
      </form>
    </Card>
  );
}
