import { useId } from "react";
import type { LinkValue, PageSchema, SimpleField } from "@/templates/types";
import { helpClass, inputClass, labelClass } from "@/components/editor/fields/styles";

// A button: the words on it, and where it goes. The destination is chosen
// from the website's own pages, with "another address" for anything else, so
// a customer never has to know what "/contact" means.

type LinkFieldProps = {
  field: SimpleField;
  value: LinkValue;
  onChange: (value: LinkValue) => void;
  pages: PageSchema[];
};

const OTHER = "__other";

export default function LinkField({ field, value, onChange, pages }: LinkFieldProps) {
  const id = useId();
  const goesToPage = pages.some((page) => page.path === value.href);

  return (
    <fieldset className="rounded-control border border-line p-3">
      <legend className="px-1 font-medium">{field.label}</legend>
      {field.help && <p className={helpClass}>{field.help}</p>}

      <div className="grid gap-3">
        <div>
          <label htmlFor={`${id}-label`} className={labelClass}>
            Words on the button
          </label>
          <input
            id={`${id}-label`}
            type="text"
            value={value.label}
            onChange={(event) => onChange({ ...value, label: event.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor={`${id}-page`} className={labelClass}>
            Where it goes
          </label>
          <select
            id={`${id}-page`}
            value={goesToPage ? value.href : OTHER}
            onChange={(event) => onChange({ ...value, href: event.target.value === OTHER ? "" : event.target.value })}
            className={inputClass}
          >
            {pages.map((page) => (
              <option key={page.key} value={page.path}>
                {page.label} page
              </option>
            ))}
            <option value={OTHER}>Another address</option>
          </select>
        </div>

        {!goesToPage && (
          <div>
            <label htmlFor={`${id}-href`} className={labelClass}>
              Address
            </label>
            <p id={`${id}-href-help`} className={helpClass}>
              A full web address, for example https://example.com
            </p>
            <input
              id={`${id}-href`}
              type="url"
              value={value.href}
              onChange={(event) => onChange({ ...value, href: event.target.value })}
              aria-describedby={`${id}-href-help`}
              className={inputClass}
            />
          </div>
        )}
      </div>
    </fieldset>
  );
}
