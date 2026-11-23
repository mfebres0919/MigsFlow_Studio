"use client"; // the size buttons and the frame's messages need the browser

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft } from "lucide-react";
import DeviceToggle, { type Device } from "@/components/editor/DeviceToggle";
import DemoLabel from "@/components/ui/DemoLabel";
import { useDeviceFrame } from "@/hooks/useDeviceFrame";
import { isStudioMessage } from "@/lib/preview-messages";

// A template's full-screen live preview: Studio's bar on top (back, name,
// price, size buttons), and the template's sample website filling the rest.
// The website runs in an <iframe> so the size buttons are honest: at "Phone"
// it really is 390 pixels wide and lays itself out as on a phone. It is the
// same frame and sizing the editor uses (hooks/useDeviceFrame.ts).

type TemplateLivePreviewProps = {
  templateId: string;
  name: string;
  /** e.g. "$450". */
  price: string;
};

export default function TemplateLivePreview({ templateId, name, price }: TemplateLivePreviewProps) {
  const [device, setDevice] = useState<Device>("fit");
  const [notice, setNotice] = useState<string | null>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const { area, pageWidth, holderStyle, frameStyle } = useDeviceFrame<HTMLElement>(device);

  // Messages from the website in the frame, e.g. "the form did not send".
  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      if (isStudioMessage(event.data) && event.data.type === "studio:notice") setNotice(event.data.text);
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div className="flex h-dvh flex-col bg-ink">
      <header className="border-b border-line bg-panel">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2.5">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href={`/templates/${templateId}`}
              className="flex min-h-10 shrink-0 items-center gap-1 rounded-full border border-line pr-3.5 pl-2 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
            >
              <ChevronLeft aria-hidden="true" className="size-4" />
              Back<span className="sr-only"> to the {name} template</span>
            </Link>
            <div className="min-w-0">
              <h1 className="truncate font-display font-semibold tracking-wide">{name}</h1>
              <p className="text-xs text-fg-muted">Live preview · {price} one-time</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <DeviceToggle device={device} onChange={setDevice} />
            {pageWidth > 0 && <p className="hidden text-sm text-fg-muted md:block">{Math.round(pageWidth)} px wide</p>}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <DemoLabel>Sample content</DemoLabel>
            <Link
              href="/dashboard/websites"
              className="bg-brand-gradient group hidden h-10 items-center gap-2 rounded-full px-4 text-sm font-medium text-white shadow-md shadow-accent/25 lg:inline-flex"
            >
              Try the editor
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </Link>
          </div>
        </div>
        {/* Messages from the website, read out by screen readers when they appear. */}
        <p aria-live="polite" className="px-4 text-sm text-fg-muted">
          {notice && <span className="block pb-2.5">{notice}</span>}
        </p>
      </header>

      {/* The template itself is the page's main content. "relative" keeps
          anything hidden-for-screen-readers inside this box (the project's layout rule). */}
      <main id="main" ref={area} className="relative min-h-0 flex-1 overflow-hidden bg-raised">
        <div style={holderStyle} className="mx-auto overflow-hidden bg-white shadow-lg">
          <iframe
            ref={frame}
            src={`/preview/template/${templateId}/site`}
            title={`${name} template, with sample content`}
            style={frameStyle}
            className="origin-top-left border-0"
          />
        </div>
      </main>
    </div>
  );
}
