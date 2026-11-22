"use client";

import { useId, useState, type DragEvent } from "react";
import { ImageUp, Images } from "lucide-react";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import LoadingState from "@/components/ui/LoadingState";
import { useLoad } from "@/hooks/useLoad";
import { forgetMediaUrl, useMediaUrls } from "@/hooks/useMediaUrls";
import { deleteMedia, listMedia, replaceImage, uploadImage } from "@/lib/data/media";
import { getWebsites } from "@/lib/data/websites";
import { formatDate, formatFileSize } from "@/lib/format";
import { mediaIdsIn, mediaSrc } from "@/lib/media/ref";
import type { MediaItem } from "@/lib/types";

// The Media Library: every picture the customer has uploaded, with a way to
// add more, swap one for a newer file, or delete one.

// Both lists are needed: the pictures, and the websites (to say where each picture is used).
const loadLibrary = () => Promise.all([listMedia(), getWebsites()]);

const fileTypes = "image/jpeg,image/png,image/webp,image/gif";

export default function MediaContent() {
  const { state, reload } = useLoad(loadLibrary);
  const uploadId = useId();
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ tone: "ok" | "error"; text: string } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [toDelete, setToDelete] = useState<MediaItem | null>(null);

  const items = state.status === "success" ? state.data[0] : [];
  const resolve = useMediaUrls(items.map((item) => item.id));

  if (state.status === "loading") return <LoadingState label="Loading your photos" />;
  if (state.status === "error") {
    return <ErrorState title="Your photos could not be loaded" message={state.message} onRetry={reload} />;
  }

  const websites = state.data[1];

  // The names of the websites whose draft or live version uses a picture.
  const usedOn = (id: string) =>
    websites.filter((site) => mediaIdsIn([site.draft, site.published]).includes(id)).map((site) => site.name);

  // Runs one upload, replace or delete, and reports how it went.
  async function attempt(work: () => Promise<string>) {
    setBusy(true);
    setNotice(null);
    try {
      setNotice({ tone: "ok", text: await work() });
      reload();
    } catch (problem) {
      setNotice({ tone: "error", text: problem instanceof Error ? problem.message : "That did not work. Try again." });
    } finally {
      setBusy(false);
    }
  }

  function addFiles(files: FileList | null) {
    const chosen = [...(files ?? [])];
    if (chosen.length === 0) return;
    void attempt(async () => {
      // One at a time, so a problem with one file is reported for that file.
      for (const file of chosen) await uploadImage(file);
      return chosen.length === 1 ? "1 photo added." : `${chosen.length} photos added.`;
    });
  }

  function replace(item: MediaItem, file: File | undefined) {
    if (!file) return;
    void attempt(async () => {
      await replaceImage(item.id, file);
      forgetMediaUrl(item.id); // throw away the old picture's address so the new one shows
      return `${item.name} was replaced. Every website using it now shows the new photo.`;
    });
  }

  function confirmDelete() {
    const item = toDelete;
    if (!item) return;
    setToDelete(null);
    void attempt(async () => {
      await deleteMedia(item.id);
      forgetMediaUrl(item.id);
      return `${item.name} was deleted.`;
    });
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault(); // without this the browser would open the file instead
    setDragging(false);
    addFiles(event.dataTransfer.files);
  }

  const deleteUses = toDelete ? usedOn(toDelete.id) : [];

  return (
    <div className="grid gap-6">
      {/* The upload area: drop photos on it, or use the button. */}
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`relative rounded-panel border-2 border-dashed p-6 text-center ${dragging ? "border-signal bg-raised" : "border-line-strong"}`}
      >
        <ImageUp aria-hidden="true" className="mx-auto size-8 text-signal" />
        <p className="mt-2 font-medium">Drag photos or your logo here</p>
        <p className="mt-1 text-sm text-fg-muted">JPG, PNG, WebP or GIF. Large photos are made smaller automatically.</p>
        {/* The real file input is hidden and its <label> is drawn as the button.
            "multiple" allows several photos at once. On a phone it offers the camera and photo library. */}
        <input
          id={uploadId}
          type="file"
          accept={fileTypes}
          multiple
          disabled={busy}
          onChange={(event) => {
            addFiles(event.target.files);
            event.target.value = "";
          }}
          className="peer sr-only"
        />
        <label
          htmlFor={uploadId}
          className="mt-4 inline-flex min-h-11 cursor-pointer items-center justify-center rounded-control bg-accent px-5 font-medium text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-signal peer-disabled:cursor-not-allowed peer-disabled:opacity-50 hover:bg-accent-hover"
        >
          {busy ? "Working" : "Choose photos from this device"}
        </label>
      </div>

      {/* role="status" reads the result aloud. Errors are worded as errors, not only colored. */}
      <p role="status" className={`text-sm ${notice?.tone === "error" ? "font-medium text-danger" : "text-fg-muted"}`}>
        {notice?.text}
      </p>

      {items.length === 0 ? (
        <EmptyState
          icon={Images}
          title="No photos yet"
          description="Photos you add here, or while editing a website, are kept in this browser and can be used on any of your websites."
        />
      ) : (
        <ul role="list" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const uses = usedOn(item.id);
            return (
              <li key={item.id} className="flex flex-col overflow-hidden rounded-panel border border-line bg-panel">
                {/* The customer's own upload, so a plain <img> (see CLAUDE.md, handbook exceptions). */}
                <img
                  src={resolve(mediaSrc(item.id)) || undefined}
                  alt=""
                  className="aspect-video w-full bg-raised object-cover"
                />
                <div className="flex flex-1 flex-col gap-3 p-4">
                  <div>
                    <h2 className="font-medium break-all">{item.name}</h2>
                    <p className="mt-1 text-sm text-fg-muted">
                      {item.width} × {item.height} pixels, {formatFileSize(item.size)}, added {formatDate(item.createdAt)}
                    </p>
                    <p className="mt-1 text-sm text-fg-muted">
                      {uses.length > 0 ? `Used on ${uses.join(" and ")}` : "Not used on a website yet"}
                    </p>
                  </div>
                  <div className="mt-auto flex flex-wrap gap-2">
                    <input
                      id={`replace-${item.id}`}
                      type="file"
                      accept={fileTypes}
                      disabled={busy}
                      onChange={(event) => {
                        replace(item, event.target.files?.[0]);
                        event.target.value = "";
                      }}
                      className="peer sr-only"
                    />
                    <label
                      htmlFor={`replace-${item.id}`}
                      className="inline-flex h-9 cursor-pointer items-center justify-center rounded-control border border-line-strong px-3.5 text-sm font-medium peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-signal peer-disabled:cursor-not-allowed peer-disabled:opacity-50 hover:bg-raised"
                    >
                      Replace<span className="sr-only"> {item.name}</span>
                    </label>
                    <Button variant="danger" size="sm" disabled={busy} onClick={() => setToDelete(item)}>
                      Delete<span className="sr-only"> {item.name}</span>
                    </Button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <ConfirmDialog
        open={toDelete !== null}
        title="Delete this photo?"
        confirmLabel="Delete photo"
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      >
        <p>{toDelete?.name} will be removed for good.</p>
        {deleteUses.length > 0 && (
          <p className="mt-2 font-medium text-danger">
            Used on: {deleteUses.join(", ")}
            <br />
            Those spots will be empty until you choose another photo.
          </p>
        )}
      </ConfirmDialog>
    </div>
  );
}
