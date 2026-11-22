"use client";

import { useEffect, useLayoutEffect, useRef, type CompositionEvent, type FormEvent, type KeyboardEvent, type MouseEvent } from "react";
import { forgetTyping, noteTyping, restoreCaret } from "@/lib/editor/caret";
import { editFieldType, editKind } from "@/lib/editor/edit-path";
import type { TemplateSchema } from "@/templates/types";

// Lets the customer edit their website by clicking on it, inside the editor's
// preview. It wraps the template and listens for clicks and typing on any
// element the template marked with data-edit (see templates/editable.ts).
//
// - Plain words (headings, paragraphs, button labels): click, and type right there.
// - Everything else (photos, colors, lists): a click opens that field in the form.
// - Photos: a picture file can also be dragged from the computer and dropped on one.
//
// The template itself knows nothing about this. It only carries the markers.

type InlineEditingProps = {
  schema: TemplateSchema;
  /** Something editable was clicked. typing = the customer can type in place. */
  onSelect: (path: string, typing: boolean) => void;
  /** The customer typed: this field's words are now "value". */
  onEdit: (path: string, value: string) => void;
  /** A picture file was dropped on a photo. */
  onDropImage: (path: string, file: File) => void;
  children: React.ReactNode;
};

// Finds the marked element a click or keystroke happened in, if any.
function markedElement(target: EventTarget): HTMLElement | null {
  return target instanceof Element ? target.closest<HTMLElement>("[data-edit]") : null;
}

export default function InlineEditing({ schema, onSelect, onEdit, onDropImage, children }: InlineEditingProps) {
  const root = useRef<HTMLDivElement>(null);

  // After every redraw, switch typing on for the marked elements that hold
  // plain words. It runs every time because the template may have drawn new
  // elements (a new service, another page).
  useEffect(() => {
    root.current?.querySelectorAll<HTMLElement>("[data-edit]").forEach((element) => {
      const kind = element.dataset.editMode === "jump" ? "jump" : editKind(schema, element.dataset.edit ?? "");
      if (kind === "text") {
        // "plaintext-only": typing and pasting can only ever add plain text,
        // never bold, links or pasted formatting. The design stays protected.
        element.contentEditable = "plaintext-only";
        element.spellcheck = true;
      }
      if (kind) element.dataset.editKind = kind;
      if (editFieldType(schema, element.dataset.edit ?? "") === "image") element.dataset.editImage = "";
    });
  });

  // Dragging a file over the page. Two jobs:
  // 1. A browser's normal reaction to a dropped file is to OPEN it, replacing
  //    the page. That must never happen here, wherever the file lands.
  // 2. If it lands on a photo, hand the file to the editor.
  // These listen on the whole window (not just the template) for job 1.
  useEffect(() => {
    let over: HTMLElement | null = null;
    const photoUnder = (event: DragEvent) =>
      event.target instanceof Element ? event.target.closest<HTMLElement>("[data-edit-image]") : null;
    const highlight = (element: HTMLElement | null) => {
      if (over === element) return;
      over?.removeAttribute("data-drop-over");
      element?.setAttribute("data-drop-over", "");
      over = element;
    };

    function onDragOver(event: DragEvent) {
      if (!event.dataTransfer?.types.includes("Files")) return; // dragging text, not a file
      event.preventDefault();
      const photo = photoUnder(event);
      event.dataTransfer.dropEffect = photo ? "copy" : "none"; // the cursor shows whether dropping here does anything
      highlight(photo);
    }
    function onDragLeave(event: DragEvent) {
      if (!event.relatedTarget) highlight(null); // the file left the page altogether
    }
    function onDrop(event: DragEvent) {
      if (!event.dataTransfer?.types.includes("Files")) return;
      event.preventDefault();
      const photo = photoUnder(event);
      const file = event.dataTransfer.files[0];
      highlight(null);
      if (photo?.dataset.edit && file) onDropImage(photo.dataset.edit, file);
    }

    window.addEventListener("dragover", onDragOver);
    window.addEventListener("dragleave", onDragLeave);
    window.addEventListener("drop", onDrop);
    return () => {
      window.removeEventListener("dragover", onDragOver);
      window.removeEventListener("dragleave", onDragLeave);
      window.removeEventListener("drop", onDrop);
    };
  }, [onDropImage]);

  // After every redraw, put the typing cursor back (see lib/editor/caret.ts).
  // useLayoutEffect runs before the browser paints, so there is no flicker.
  useLayoutEffect(() => {
    restoreCaret();
  });

  function reportTyping(element: HTMLElement) {
    // Browsers sometimes type a "non-breaking space"; store an ordinary one.
    onEdit(element.dataset.edit ?? "", (element.textContent ?? "").replace(/ /g, " "));
  }

  // "Capture" handlers run BEFORE the clicked element's own handlers. That
  // lets this stop a marked button or link from doing its normal job: in the
  // editor, clicking it means "edit this", not "go there". The website's menu
  // is not marked, so it still switches pages.
  function handleClick(event: MouseEvent<HTMLDivElement>) {
    const element = markedElement(event.target);
    if (!element?.dataset.editKind) return;
    event.preventDefault();
    event.stopPropagation();
    onSelect(element.dataset.edit ?? "", element.dataset.editKind === "text");
  }

  function handleInput(event: FormEvent<HTMLDivElement>) {
    const element = markedElement(event.target);
    if (!element || element.dataset.editKind !== "text") return;
    noteTyping(element); // remember the text and cursor as of this keystroke
    // While a character is still being composed (accents, Chinese, Japanese …)
    // wait for it to finish; handleCompositionEnd reports it.
    if ((event.nativeEvent as InputEvent).isComposing) return;
    reportTyping(element);
  }

  function handleCompositionEnd(event: CompositionEvent<HTMLDivElement>) {
    const element = markedElement(event.target);
    if (element?.dataset.editKind === "text") reportTyping(element);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const element = markedElement(event.target);
    if (element?.dataset.editKind !== "text") return;
    // Each field is one run of text, so Enter finishes the edit instead of
    // adding a line. Escape finishes it too.
    if (event.key === "Enter" || event.key === "Escape") {
      event.preventDefault();
      element.blur();
    }
  }

  return (
    // The "studio-editing" class switches on the hover and focus outlines in app/globals.css.
    <div
      ref={root}
      className="studio-editing"
      onClickCapture={handleClick}
      onInput={handleInput}
      onCompositionEnd={handleCompositionEnd}
      onKeyDown={handleKeyDown}
      onBlur={forgetTyping}
    >
      {children}
    </div>
  );
}
