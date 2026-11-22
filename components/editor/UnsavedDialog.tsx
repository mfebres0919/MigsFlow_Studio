"use client";

import { useEffect, useRef } from "react";
import Button from "@/components/ui/Button";

// Asked when the customer leaves the editor with edits that are not saved
// (Miguelle, 2026-11-22): save them, or leave without saving.

type UnsavedDialogProps = {
  open: boolean;
  saving: boolean;
  /** Save the draft, then leave. */
  onSave: () => void;
  /** Leave; the unsaved edits are dropped. */
  onLeave: () => void;
  /** Stay in the editor. Also what Escape does. */
  onStay: () => void;
};

export default function UnsavedDialog({ open, saving, onSave, onLeave, onStay }: UnsavedDialogProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  // Keep the real <dialog> in step with the "open" value held by the editor.
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
  }, [open]);

  return (
    <dialog
      ref={dialog}
      onClose={onStay}
      aria-labelledby="unsaved-title"
      // Everything is centered (Miguelle, 2026-11-22). The dialog is wide enough
      // for the three buttons to sit in one row.
      className="m-auto w-full max-w-2xl rounded-panel border border-line bg-panel p-6 text-center text-fg backdrop:bg-black/60 sm:p-8"
    >
      <h2 id="unsaved-title" className="font-display text-xl font-semibold tracking-wide">
        Save your changes?
      </h2>
      <p className="mx-auto mt-3 max-w-md text-fg-muted">
        You have edits that are not saved yet. If you continue without saving, they will be lost.
      </p>
      {/* One row from 640px up. On a phone three buttons cannot fit side by side, so they stack. */}
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <Button variant="ghost" onClick={onStay}>
          Keep editing
        </Button>
        <Button variant="secondary" onClick={onLeave} disabled={saving}>
          Continue without saving
        </Button>
        <Button onClick={onSave} disabled={saving}>
          {saving ? "Saving" : "Save changes"}
        </Button>
      </div>
    </dialog>
  );
}
