"use client";

import { useEffect, useRef } from "react";
import { CircleAlert, TriangleAlert } from "lucide-react";
import Button from "@/components/ui/Button";
import DemoLabel from "@/components/ui/DemoLabel";
import type { PublishIssue } from "@/templates/publish-checks";

// The window that opens when Publish is pressed. It shows one of three things:
// 1. A red list of what MUST be changed first (publishing is blocked).
// 2. A yellow list of what SHOULD be changed (they may publish anyway).
// 3. A simple "ready to publish?" question.

type PublishDialogProps = {
  open: boolean;
  websiteName: string;
  issues: PublishIssue[];
  publishing: boolean;
  onClose: () => void;
  onConfirm: () => void;
  /** Takes the customer to the field an issue is about. */
  onGoTo: (issue: PublishIssue) => void;
};

function IssueList({ issues, onGoTo }: { issues: PublishIssue[]; onGoTo: (issue: PublishIssue) => void }) {
  return (
    <ul role="list" className="mt-3 grid gap-2">
      {issues.map((issue) => (
        <li key={issue.where} className="flex flex-wrap items-center justify-between gap-3 rounded-control border border-line p-3">
          <div className="min-w-48 flex-1">
            <p className="font-medium">{issue.where}</p>
            <p className="text-sm text-fg-muted">{issue.problem}</p>
          </div>
          <Button variant="secondary" size="sm" onClick={() => onGoTo(issue)}>
            Fix this
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default function PublishDialog({ open, websiteName, issues, publishing, onClose, onConfirm, onGoTo }: PublishDialogProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  // Keep the real <dialog> in step with the "open" value held by the editor.
  // showModal() gives us the dimmed background, the focus trap and Escape-to-close for free.
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
  }, [open]);

  const required = issues.filter((issue) => issue.level === "required");
  const recommended = issues.filter((issue) => issue.level === "recommended");
  const blocked = required.length > 0;

  return (
    <dialog
      ref={dialog}
      onClose={onClose} // also fires when Escape closes it
      aria-labelledby="publish-title"
      className="m-auto w-full max-w-2xl rounded-panel border border-line bg-panel p-0 text-fg backdrop:bg-black/60"
    >
      <div className="max-h-[85dvh] overflow-y-auto p-6">
        <h2 id="publish-title" className="font-display text-xl font-semibold tracking-wide">
          {blocked ? "Change these before you publish" : `Publish ${websiteName}?`}
        </h2>

        {blocked && (
          <section className="mt-5 rounded-panel border border-danger/60 p-4">
            <h3 className="flex items-center gap-2 font-semibold text-danger">
              <CircleAlert aria-hidden="true" className="size-5 shrink-0" />
              {required.length === 1 ? "1 thing must be changed" : `${required.length} things must be changed`}
            </h3>
            <p className="mt-1 text-sm text-fg-muted">
              Your website still has placeholder details. Publishing them would show visitors information that is not yours.
            </p>
            <IssueList issues={required} onGoTo={onGoTo} />
          </section>
        )}

        {recommended.length > 0 && (
          <section className="mt-5 rounded-panel border border-warning/60 p-4">
            <h3 className="flex items-center gap-2 font-semibold text-warning">
              <TriangleAlert aria-hidden="true" className="size-5 shrink-0" />
              {blocked ? "Also worth changing" : "Worth changing first"}
            </h3>
            <p className="mt-1 text-sm text-fg-muted">These will not stop you from publishing.</p>
            <IssueList issues={recommended} onGoTo={onGoTo} />
          </section>
        )}

        {!blocked && (
          <p className="mt-4 text-fg-muted">
            Visitors will see your latest edits. You can keep editing afterwards; nothing changes for visitors until you publish again.
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <DemoLabel>Simulated: nothing goes online in this prototype</DemoLabel>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={onClose}>
              {blocked ? "Close" : "Not yet"}
            </Button>
            {!blocked && (
              <Button onClick={onConfirm} disabled={publishing}>
                {publishing ? "Publishing" : recommended.length > 0 ? "Publish anyway" : "Publish"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
