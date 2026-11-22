import type { SiteContent } from "@/templates/types";

// The editor and its live preview are two separate pages: the preview runs
// inside an <iframe> (a page within the page). They talk by passing small
// messages with the browser's postMessage. These are the only messages allowed.

/** Editor → preview: "draw this content, on this page". Sent after every edit. */
export type EditorMessage = { type: "studio:content"; content: SiteContent; pageKey: string };

/** Preview → editor. */
export type PreviewMessage =
  | { type: "studio:ready" } // the preview has loaded and can receive content
  | { type: "studio:page"; pageKey: string } // a menu link was clicked inside the preview
  | { type: "studio:notice"; text: string } // something to tell the customer, e.g. "the form did not send"
  // Something editable was clicked in the preview. "path" is its field address
  // (templates/editable.ts). typing = true when the customer can type right there.
  | { type: "studio:select"; path: string; typing: boolean }
  // The customer typed in the preview: this field's words are now "value".
  | { type: "studio:edit"; path: string; value: string }
  // A picture file was dropped onto a photo in the preview.
  | { type: "studio:drop-image"; path: string; file: File };

/** True if a received message is one of ours. Anything else is ignored. */
export function isStudioMessage(data: unknown): data is EditorMessage | PreviewMessage {
  return (
    typeof data === "object" &&
    data !== null &&
    typeof (data as { type?: unknown }).type === "string" &&
    (data as { type: string }).type.startsWith("studio:")
  );
}
