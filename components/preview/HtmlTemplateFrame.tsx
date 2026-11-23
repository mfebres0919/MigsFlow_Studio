"use client";

import { useEffect, useRef, useState } from "react";
import { isStudioMessage, type EditorMessage } from "@/lib/preview-messages";
import type { SiteContent } from "@/templates/types";

// Shows a hand-written HTML template (one in public/site-templates/) with a
// website's content filled in.
//
// The template is a complete web page of its own, with its own CSS and
// JavaScript, so it is shown in an <iframe> where none of Studio's styles
// can touch it. The page includes public/studio-bridge.js; when that says it
// is ready, this component sends it the content, and it puts the customer's
// words and pictures in place.

type HtmlTemplateFrameProps = {
  /** The template's page, e.g. "/site-templates/your-template/index.html". */
  entry: string;
  content: SiteContent;
  /** Something the page wants the customer told, e.g. "the form did not send". */
  onNotice?: (text: string) => void;
};

export default function HtmlTemplateFrame({ entry, content, onNotice }: HtmlTemplateFrameProps) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      // Only trust messages from our own site AND from our own iframe.
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      if (!isStudioMessage(event.data)) return;
      if (event.data.type === "studio:ready") setReady(true);
      if (event.data.type === "studio:notice") onNotice?.(event.data.text);
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [onNotice]);

  useEffect(() => {
    if (!ready) return;
    const message: EditorMessage = { type: "studio:content", content, pageKey: "home" };
    frame.current?.contentWindow?.postMessage(message, window.location.origin);
  }, [ready, content]);

  return <iframe ref={frame} src={entry} title="Your website" className="min-h-0 w-full flex-1 border-0 bg-white" />;
}
