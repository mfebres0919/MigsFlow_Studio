import { useId } from "react";
import type { SimpleField } from "@/templates/types";
import { helpClass, inputClass, labelClass } from "@/components/editor/fields/styles";

// One line of text, a paragraph, an email, a phone number or a web address.

type TextFieldProps = {
  field: SimpleField;
  value: string;
  onChange: (value: string) => void;
};

// Which keyboard and browser checks each kind of text gets.
const inputTypes: Partial<Record<SimpleField["type"], string>> = {
  email: "email",
  phone: "tel",
  url: "url",
};

export default function TextField({ field, value, onChange }: TextFieldProps) {
  // useId makes an id that is unique on the page, so the same field component
  // can appear many times and every label still points at its own input.
  const id = useId();
  const helpId = field.help ? `${id}-help` : undefined;

  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {field.label}
      </label>
      {field.help && (
        <p id={helpId} className={helpClass}>
          {field.help}
        </p>
      )}
      {/* A "controlled" input: React holds the value and the input only
          displays it. Every keystroke calls onChange, the editor updates the
          content, and the new value comes back down as the value prop. */}
      {field.type === "longText" ? (
        <textarea
          id={id}
          rows={4}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-describedby={helpId}
          className={inputClass}
        />
      ) : (
        <input
          id={id}
          type={inputTypes[field.type] ?? "text"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-describedby={helpId}
          className={inputClass}
        />
      )}
    </div>
  );
}
