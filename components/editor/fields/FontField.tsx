import { useId } from "react";
import type { SimpleField } from "@/templates/types";
import { fontPairs } from "@/templates/fonts";
import { helpClass } from "@/components/editor/fields/styles";

// Chooses one of the template's font pairs. Each option is written in its own
// heading font, so the choice can be seen before it is made.

type FontFieldProps = {
  field: SimpleField;
  value: string;
  onChange: (value: string) => void;
};

export default function FontField({ field, value, onChange }: FontFieldProps) {
  const name = useId(); // radio buttons that share a name form one group

  return (
    // <fieldset> + <legend> is how a group of radio buttons gets a label.
    <fieldset>
      <legend className="font-medium">{field.label}</legend>
      {field.help && <p className={helpClass}>{field.help}</p>}
      <div className="mt-2 grid gap-2">
        {fontPairs.map((pair) => (
          <label
            key={pair.id}
            className="flex cursor-pointer items-start gap-3 rounded-control border border-line p-3 has-checked:border-signal has-checked:bg-raised"
          >
            <input
              type="radio"
              name={name}
              value={pair.id}
              checked={value === pair.id}
              onChange={() => onChange(pair.id)}
              className="mt-1.5 accent-(--color-signal)"
            />
            <span>
              {/* The font is data, so it is applied with a style (the handbook's dynamic-value exception). */}
              <span style={{ fontFamily: pair.heading }} className="block text-lg font-bold">
                {pair.label}
              </span>
              <span className="block text-sm text-fg-muted">{pair.description}</span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
