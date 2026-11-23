"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import DeviceToggle, { deviceWidths, type Device } from "@/components/editor/DeviceToggle";
import { isStudioMessage, type EditorMessage } from "@/lib/preview-messages";
import type { SiteContent } from "@/templates/types";

// The right-hand side of the editor: the live preview.
//
// The website is shown in an <iframe>, a separate page inside this one. That
// is what makes the tablet and phone buttons honest: the template's layout
// follows the width of the page it is in, and only an iframe gives it a page
// of its own to be narrow in.
//
// After every edit this component sends the content to that page with
// postMessage (see lib/preview-messages.ts). Nothing is saved by doing so.

type PreviewPaneProps = {
  /** The page to show in the preview frame. */
  src: string;
  content: SiteContent;
  pageKey: string;
  device: Device;
  onDeviceChange: (device: Device) => void;
  /** Called when a menu link is clicked inside the preview. */
  onPageChange: (pageKey: string) => void;
  /** Called when something editable is clicked in the preview. */
  onSelectField: (path: string, typing: boolean) => void;
  /** Called when the customer types directly on the preview. */
  onInlineEdit: (path: string, value: string) => void;
  /** Called when a picture file is dropped on a photo in the preview. */
  onDropImage: (path: string, file: File) => void;
};

export default function PreviewPane({
  src,
  content,
  pageKey,
  device,
  onDeviceChange,
  onPageChange,
  onSelectField,
  onInlineEdit,
  onDropImage,
}: PreviewPaneProps) {
  const frame = useRef<HTMLIFrameElement>(null);
  const area = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [space, setSpace] = useState({ width: 0, height: 0 });

  // Listen for messages coming back from the preview page.
  useEffect(() => {
    function onMessage(event: MessageEvent) {
      // Only trust messages from our own site AND from our own iframe.
      if (event.origin !== window.location.origin) return;
      if (event.source !== frame.current?.contentWindow) return;
      if (!isStudioMessage(event.data)) return;

      if (event.data.type === "studio:ready") setReady(true);
      if (event.data.type === "studio:page") onPageChange(event.data.pageKey);
      if (event.data.type === "studio:notice") setNotice(event.data.text);
      if (event.data.type === "studio:select") onSelectField(event.data.path, event.data.typing);
      if (event.data.type === "studio:edit") onInlineEdit(event.data.path, event.data.value);
      if (event.data.type === "studio:drop-image") onDropImage(event.data.path, event.data.file);
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [onPageChange, onSelectField, onInlineEdit, onDropImage]);

  // Send the content to the preview: once it is ready, and again after every edit.
  useEffect(() => {
    if (!ready) return;
    const message: EditorMessage = { type: "studio:content", content, pageKey };
    frame.current?.contentWindow?.postMessage(message, window.location.origin);
  }, [ready, content, pageKey]);

  // Measure the space available, and keep measuring as the window is resized.
  useEffect(() => {
    const element = area.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      setSpace({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // "Fit": the website is exactly as wide as this pane, at real size. Drag
  // the editing panel wider or thinner and the website's layout changes with it.
  //
  // Desktop, Tablet, Phone: the website is drawn at that device's real width
  // (1280px for desktop) and then shrunk to fit, like a photo of a screen. So
  // "Desktop" shows the true desktop layout even when this pane is only 700px wide.
  const pageWidth =
    device === "fit" ? space.width : device === "desktop" ? Math.max(deviceWidths.desktop, space.width) : deviceWidths[device];
  const scale = space.width > 0 && pageWidth > 0 ? Math.min(1, space.width / pageWidth) : 1;

  // Sizes worked out at run time cannot be classes, so they are styles (the
  // handbook's dynamic-value exception).
  const holderStyle: CSSProperties = { width: pageWidth * scale, height: space.height };
  const frameStyle: CSSProperties = {
    width: pageWidth,
    height: scale > 0 ? space.height / scale : space.height,
    transform: `scale(${scale})`,
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-panel px-4 py-2">
        <div className="flex flex-wrap items-center gap-3">
          <DeviceToggle device={device} onChange={onDeviceChange} />
          {/* How wide the website is being drawn right now. */}
          {pageWidth > 0 && <p className="text-sm text-fg-muted">{Math.round(pageWidth)} px wide</p>}
        </div>
        {/* Messages from the preview, read out by screen readers when they appear. */}
        <p aria-live="polite" className="text-sm text-fg-muted">
          {notice ?? "Click any text to change it, or drop a photo onto a picture. Visitors see nothing until you publish."}
        </p>
      </div>

      <div ref={area} className="min-h-0 flex-1 overflow-hidden bg-raised">
        <div style={holderStyle} className="mx-auto overflow-hidden bg-white shadow-lg">
          <iframe
            ref={frame}
            src={src}
            title="Live preview of your website"
            style={frameStyle}
            className="origin-top-left border-0"
          />
        </div>
      </div>
    </div>
  );
}
