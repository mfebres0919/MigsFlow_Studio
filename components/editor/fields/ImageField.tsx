"use client";

import { useId, useState, type DragEvent } from "react";
import { ImageUp } from "lucide-react";
import type { FieldContext } from "@/components/editor/FieldRenderer";
import { mediaSrc } from "@/lib/media/ref";
import type { ImageValue, SimpleField } from "@/templates/types";
import { helpClass, inputClass, labelClass } from "@/components/editor/fields/styles";

// Chooses a picture and describes it. A picture can come from three places:
// - a file from the customer's computer, phone or tablet (button, or drag and drop);
// - something they uploaded earlier;
// - the pictures that came with the template.

type ImageFieldProps = {
  field: SimpleField;
  value: ImageValue;
  onChange: (value: ImageValue) => void;
  context: FieldContext;
};

const choice = "overflow-hidden rounded-control border-2 border-line aria-pressed:border-signal";
const thumb = "h-16 w-20 object-cover";

export default function ImageField({ field, value, onChange, context }: ImageFieldProps) {
  const id = useId();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  async function addFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const item = await context.uploadImage(file);
      // A new picture needs its own description, so the old one is cleared.
      onChange({ src: mediaSrc(item.id), alt: "" });
    } catch (problem) {
      setError(problem instanceof Error ? problem.message : "That picture could not be added.");
    } finally {
      setBusy(false);
    }
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault(); // without this the browser would open the file instead
    setDragging(false);
    void addFile(event.dataTransfer.files[0]);
  }

  return (
    <fieldset>
      <legend className="font-medium">{field.label}</legend>
      {field.help && <p className={helpClass}>{field.help}</p>}

      {value.src && (
        <img
          src={context.resolveSrc(value.src) || undefined}
          alt=""
          className="mt-2 aspect-video w-full rounded-control border border-line bg-raised object-cover"
        />
      )}

      {/* The drop area. data-dropzone tells the editor's "do not open dropped
          files" guard that dropping here is allowed. */}
      <div
        data-dropzone
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        // "relative" keeps the hidden file input positioned inside this box. Without
        // it the input sat outside the scrolling panel, and focusing it scrolled the whole editor.
        className={`relative mt-2 rounded-control border-2 border-dashed p-4 text-center ${dragging ? "border-signal bg-raised" : "border-line-strong"}`}
      >
        <ImageUp aria-hidden="true" className="mx-auto size-6 text-signal" />
        <p className="mt-1 text-sm text-fg-muted">Drag a photo here, or</p>
        {/* A file input cannot be restyled, so it is hidden (still usable by
            keyboard and screen reader) and its <label> is drawn as the button.
            On a phone, tapping it offers the camera and the photo library. */}
        <input
          id={`${id}-file`}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          disabled={busy}
          onChange={(event) => {
            void addFile(event.target.files?.[0]);
            event.target.value = ""; // so choosing the same file again still counts as a change
          }}
          className="peer sr-only"
        />
        <label
          htmlFor={`${id}-file`}
          className="mt-2 inline-flex min-h-11 cursor-pointer items-center justify-center rounded-control border border-line-strong px-4 font-medium peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-signal peer-disabled:cursor-not-allowed peer-disabled:opacity-50 hover:bg-raised"
        >
          {busy ? "Adding your photo" : value.src ? "Replace with a photo from this device" : "Choose a photo from this device"}
        </label>
        <p className={helpClass}>JPG, PNG, WebP or GIF. Large photos are made smaller automatically.</p>
        {error && (
          <p role="alert" className="mt-2 text-sm font-medium text-danger">
            {error}
          </p>
        )}
      </div>

      {context.uploads.length > 0 && (
        <>
          <p className="mt-3 text-sm font-medium">Your photos</p>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {context.uploads.map((item) => {
              const src = mediaSrc(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  // aria-pressed tells screen readers which picture is the chosen one.
                  aria-pressed={value.src === src}
                  onClick={() => onChange({ src, alt: value.src === src ? value.alt : "" })}
                  className={choice}
                >
                  <img src={context.resolveSrc(src) || undefined} alt="" className={thumb} />
                  <span className="sr-only">Use your photo {item.name}</span>
                </button>
              );
            })}
          </div>
        </>
      )}

      <p className="mt-3 text-sm font-medium">Pictures included with the template</p>
      <div className="mt-1.5 flex flex-wrap gap-2">
        {field.optional && (
          <button
            type="button"
            aria-pressed={value.src === ""}
            onClick={() => onChange({ src: "", alt: "" })}
            className="grid h-16 w-20 place-items-center rounded-control border-2 border-line text-sm text-fg-muted aria-pressed:border-signal aria-pressed:text-fg"
          >
            None
          </button>
        )}
        {context.images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            aria-pressed={value.src === image.src}
            onClick={() => onChange(image)}
            className={choice}
          >
            <img src={image.src} alt="" className={thumb} />
            <span className="sr-only">
              Use included picture {index + 1}: {image.alt}
            </span>
          </button>
        ))}
      </div>

      {value.src && (
        <div className="mt-3">
          <label htmlFor={id} className={labelClass}>
            Describe this picture
          </label>
          <p id={`${id}-help`} className={helpClass}>
            Read aloud to visitors who cannot see it, and shown if the picture fails to load.
          </p>
          <input
            id={id}
            type="text"
            value={value.alt}
            onChange={(event) => onChange({ ...value, alt: event.target.value })}
            aria-describedby={`${id}-help`}
            className={inputClass}
          />
        </div>
      )}
    </fieldset>
  );
}
