import { useId } from "react";
import type { SimpleField } from "@/templates/types";
import { helpClass, labelClass } from "@/components/editor/fields/styles";

// A color picker. The browser's own picker does the work.

type ColorFieldProps = {
  field: SimpleField;
  value: string;
  onChange: (value: string) => void;
};

export default function ColorField({ field, value, onChange }: ColorFieldProps) {
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
      <div className="mt-1.5 flex items-center gap-3">
        <input
          id={id}
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-describedby={helpId}
          className="h-11 w-16 cursor-pointer rounded-control border border-line-strong bg-ink p-1"
        />
        {/* The color's code, for anyone who needs to match it elsewhere. */}
        <span className="text-sm text-fg-muted">{value}</span>
      </div>
    </div>
  );
}
