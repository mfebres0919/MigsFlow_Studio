import type { Field, SimpleField, TemplateSchema } from "@/templates/types";
import { SITE_SCOPE } from "@/templates/publish-checks";

// Understanding the field addresses that templates put on their elements
// (see templates/editable.ts). Used by both the preview, to decide what a
// click should do, and the editor, to find the field that was clicked.

export type EditTarget = {
  /** SITE_SCOPE or a page key. */
  scope: string;
  sectionKey: string;
  fieldKey: string;
  /** Set when the field is inside one entry of a list. */
  itemId?: string;
  subKey?: string;
};

/** "home/hero/heading" → its parts. null if the text is not a valid address. */
export function parseEditPath(path: string): EditTarget | null {
  const parts = path.split("/");
  if (parts.some((part) => part === "")) return null;
  if (parts.length === 3) return { scope: parts[0], sectionKey: parts[1], fieldKey: parts[2] };
  if (parts.length === 5) {
    return { scope: parts[0], sectionKey: parts[1], fieldKey: parts[2], itemId: parts[3], subKey: parts[4] };
  }
  return null;
}

/** Finds the schema field an address points at, or null if the template has no such field. */
export function findEditField(schema: TemplateSchema, target: EditTarget): Field | SimpleField | null {
  const sections =
    target.scope === SITE_SCOPE ? schema.site : schema.pages.find((page) => page.key === target.scope)?.sections;
  const field = sections?.find((section) => section.key === target.sectionKey)?.fields.find((item) => item.key === target.fieldKey);
  if (!field) return null;
  if (!target.itemId) return field;
  // An address with an entry id must point into a list.
  if (field.type !== "list") return null;
  return field.fields.find((inner) => inner.key === target.subKey) ?? null;
}

// The kinds of field that are plain words and can be typed in place. For a
// "link", typing changes the words on the button; where it goes stays in the form.
const typedInPlace: Field["type"][] = ["text", "longText", "email", "phone", "link"];

/** The type of the field at an address ("text", "image" …), or null if the template has no such field. */
export function editFieldType(schema: TemplateSchema, path: string): Field["type"] | null {
  const target = parseEditPath(path);
  return (target && findEditField(schema, target)?.type) ?? null;
}

/**
 * What clicking this address in the preview should do:
 * "text" = type right there; "jump" = open the field in the form; null = not a real field.
 */
export function editKind(schema: TemplateSchema, path: string): "text" | "jump" | null {
  const type = editFieldType(schema, path);
  if (!type) return null;
  return typedInPlace.includes(type) ? "text" : "jump";
}
