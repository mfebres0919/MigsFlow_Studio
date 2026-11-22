import Button from "@/components/ui/Button";

// Save draft and Publish, with a line saying whether anything is unsaved.
// It sits at the bottom of the editing panel, pinned there so it is always in
// reach however long the form above it is (Miguelle, 2026-11-22: these belong
// with the fields, not in the top corner).

type EditorActionsProps = {
  unsaved: boolean;
  busy: "saving" | "publishing" | null;
  onSave: () => void;
  onPublish: () => void;
};

export default function EditorActions({ unsaved, busy, onSave, onPublish }: EditorActionsProps) {
  return (
    <div className="border-t border-line bg-panel p-4">
      <p className="text-sm text-fg-muted">
        {unsaved ? "Unsaved changes" : "All changes saved"}
        <span className="sr-only">.</span>
      </p>
      {/* Two equal columns, so the buttons share the panel's width. */}
      <div className="mt-2 grid grid-cols-2 gap-3">
        <Button variant="secondary" onClick={onSave} disabled={!unsaved || busy !== null}>
          {busy === "saving" ? "Saving" : "Save draft"}
        </Button>
        <Button onClick={onPublish} disabled={busy !== null}>
          Publish
        </Button>
      </div>
    </div>
  );
}
