import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import FieldRenderer, { type FieldContext } from "@/components/editor/FieldRenderer";
import type { ListField as ListFieldSchema, ListItem, SimpleField } from "@/templates/types";
import { helpClass } from "@/components/editor/fields/styles";

// A repeating list: services, reviews, opening hours. Entries can be added,
// removed and reordered with buttons (no dragging, so it works with a
// keyboard and on a phone). The schema's maxItems is the most the design holds.

type ListFieldProps = {
  field: ListFieldSchema;
  value: ListItem[];
  onChange: (value: ListItem[]) => void;
  context: FieldContext;
};

// What a brand-new entry starts as, by field type.
function emptyValue(field: SimpleField): ListItem[string] {
  if (field.type === "image") return { src: "", alt: "" };
  if (field.type === "link") return { label: "", href: "/" };
  return "";
}

const iconButton =
  "grid size-9 place-items-center rounded-control text-fg-muted hover:bg-raised hover:text-fg disabled:cursor-not-allowed disabled:opacity-40";

export default function ListField({ field, value, onChange, context }: ListFieldProps) {
  const full = value.length >= field.maxItems;
  const name = field.itemLabel; // e.g. "service"
  const Name = name[0].toUpperCase() + name.slice(1);

  function add() {
    const item: ListItem = { id: crypto.randomUUID() }; // a random, unique id
    for (const inner of field.fields) item[inner.key] = emptyValue(inner);
    onChange([...value, item]);
  }

  function remove(index: number) {
    onChange(value.filter((_, position) => position !== index));
  }

  function move(index: number, by: -1 | 1) {
    const next = [...value]; // copy first: the original list must not be changed in place
    [next[index], next[index + by]] = [next[index + by], next[index]]; // swap two entries
    onChange(next);
  }

  function changeItem(index: number, key: string, fieldValue: ListItem[string]) {
    onChange(value.map((item, position) => (position === index ? { ...item, [key]: fieldValue } : item)));
  }

  return (
    <fieldset>
      <legend className="font-medium">{field.label}</legend>
      {field.help && <p className={helpClass}>{field.help}</p>}

      <ol role="list" className="mt-2 grid gap-3">
        {value.map((item, index) => (
          <li key={item.id} data-item={item.id} className="rounded-control border border-line p-3">
            <div className="mb-3 flex items-center justify-between gap-2">
              <p className="font-medium">
                {Name} {index + 1}
              </p>
              {/* A list the design fixes in number has no move or remove buttons. */}
              <div className={field.fixed ? "hidden" : "flex"}>
                <button type="button" onClick={() => move(index, -1)} disabled={index === 0} className={iconButton}>
                  <ArrowUp aria-hidden="true" className="size-4" />
                  <span className="sr-only">Move {name} {index + 1} up</span>
                </button>
                <button type="button" onClick={() => move(index, 1)} disabled={index === value.length - 1} className={iconButton}>
                  <ArrowDown aria-hidden="true" className="size-4" />
                  <span className="sr-only">Move {name} {index + 1} down</span>
                </button>
                <button type="button" onClick={() => remove(index)} className={`${iconButton} hover:text-danger`}>
                  <Trash2 aria-hidden="true" className="size-4" />
                  <span className="sr-only">Remove {name} {index + 1}</span>
                </button>
              </div>
            </div>
            <div className="grid gap-4">
              {field.fields.map((inner) => (
                <div key={inner.key} data-field={inner.key}>
                  <FieldRenderer
                    field={inner}
                    value={item[inner.key]}
                    onChange={(fieldValue) => changeItem(index, inner.key, fieldValue as ListItem[string])}
                    context={context}
                  />
                </div>
              ))}
            </div>
          </li>
        ))}
      </ol>

      <div className={field.fixed ? "hidden" : "mt-3"}>
        <Button variant="secondary" size="sm" onClick={add} disabled={full}>
          <Plus aria-hidden="true" className="size-4" />
          Add {name}
        </Button>
        {full && <p className={helpClass}>This design holds up to {field.maxItems}.</p>}
      </div>
    </fieldset>
  );
}
