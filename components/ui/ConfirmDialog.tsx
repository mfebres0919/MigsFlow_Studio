"use client";

import { useEffect, useRef } from "react";
import Button from "@/components/ui/Button";

// A small "are you sure?" window, used before anything that cannot be undone.

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  /** What will happen, in plain words. */
  children: React.ReactNode;
  /** The words on the button that goes ahead, e.g. "Delete photo". */
  confirmLabel: string;
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({ open, title, children, confirmLabel, busy = false, onConfirm, onCancel }: ConfirmDialogProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  // Keep the real <dialog> in step with the "open" value. showModal() gives
  // the dimmed background, the focus trap and Escape-to-close for free.
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
  }, [open]);

  return (
    <dialog
      ref={dialog}
      onClose={onCancel}
      aria-labelledby="confirm-title"
      className="m-auto w-full max-w-lg rounded-panel border border-line bg-panel p-6 text-center text-fg backdrop:bg-black/60 sm:p-8"
    >
      <h2 id="confirm-title" className="font-display text-xl font-semibold tracking-wide">
        {title}
      </h2>
      <div className="mx-auto mt-3 max-w-md text-fg-muted">{children}</div>
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={busy}>
          {busy ? "Working" : confirmLabel}
        </Button>
      </div>
    </dialog>
  );
}
