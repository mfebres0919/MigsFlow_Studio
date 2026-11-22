import type { MediaItem } from "@/lib/types";
import type { Field, FieldValue, ImageValue, LinkValue, ListItem, PageSchema } from "@/templates/types";
import ColorField from "@/components/editor/fields/ColorField";
import FontField from "@/components/editor/fields/FontField";
import ImageField from "@/components/editor/fields/ImageField";
import LinkField from "@/components/editor/fields/LinkField";
import ListField from "@/components/editor/fields/ListField";
import TextField from "@/components/editor/fields/TextField";

// The piece that makes ONE editor work for EVERY template. It looks at a
// field's type in the schema and shows the matching input. A new template
// needs no editor code at all: it only lists its fields.

/** Things some inputs need to know about the website being edited. */
export type FieldContext = {
  pages: PageSchema[];
  /** The pictures that came with the template. */
  images: ImageValue[];
  /** The pictures the customer has uploaded, newest first. */
  uploads: MediaItem[];
  /** Stores a picture file and returns its details. Throws with a readable message if it cannot. */
  uploadImage: (file: File) => Promise<MediaItem>;
  /** Turns a stored picture reference into an address an <img> can show. */
  resolveSrc: (src: string) => string;
};

type FieldRendererProps = {
  field: Field;
  value: FieldValue;
  onChange: (value: FieldValue) => void;
  context: FieldContext;
};

export default function FieldRenderer({ field, value, onChange, context }: FieldRendererProps) {
  // "value as string" tells TypeScript which shape this value has. It is safe
  // because content is checked against the schema before the editor opens.
  switch (field.type) {
    case "list":
      return <ListField field={field} value={value as ListItem[]} onChange={onChange} context={context} />;
    case "image":
      return <ImageField field={field} value={value as ImageValue} onChange={onChange} context={context} />;
    case "link":
      return <LinkField field={field} value={value as LinkValue} onChange={onChange} pages={context.pages} />;
    case "color":
      return <ColorField field={field} value={value as string} onChange={onChange} />;
    case "font":
      return <FontField field={field} value={value as string} onChange={onChange} />;
    default:
      return <TextField field={field} value={value as string} onChange={onChange} />;
  }
}
