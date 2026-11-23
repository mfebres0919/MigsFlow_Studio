"use client"; // reads the address and browser-stored data, and switches pages on click

import { useCallback, useEffect, useState, type FormEvent, type MouseEvent } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { SearchX } from "lucide-react";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import LoadingState from "@/components/ui/LoadingState";
import HtmlTemplateFrame from "@/components/preview/HtmlTemplateFrame";
import PreviewBar from "@/components/preview/PreviewBar";
import TemplateView from "@/components/preview/TemplateView";
import { useLoad } from "@/hooks/useLoad";
import { getWebsite } from "@/lib/data/websites";
import { noteCaret } from "@/lib/editor/caret";
import { isStudioMessage, type PreviewMessage } from "@/lib/preview-messages";
import { getTemplateDefinition } from "@/templates/registry";
import type { SiteContent, TemplateHost } from "@/templates/types";
import { contentMatchesSchema } from "@/templates/validate";

// Tells the editor (the page this preview is embedded in) something.
function tellEditor(message: PreviewMessage) {
  window.parent.postMessage(message, window.location.origin);
}

// Shows one website's draft, drawn by its template. This is the "host" side
// of templates/types.ts: it decides what links and the form do while the
// site is only a preview.
//
// It is used two ways:
// - on its own (Preview button): with Studio's bar above the website;
// - embedded in the editor ("?embed=1" in the address): no bar, and the
//   content comes from the editor as messages, so unsaved edits show at once.
export default function PreviewContent() {
  // useParams reads the [websiteId] part of the address.
  const { websiteId } = useParams<{ websiteId: string }>();

  // useCallback keeps this the SAME function between renders (until the id
  // changes), which useLoad needs so it does not reload on every render.
  const loadWebsite = useCallback(() => getWebsite(websiteId), [websiteId]);
  const { state, reload } = useLoad(loadWebsite);

  const [pageKey, setPageKey] = useState("home");
  const [notice, setNotice] = useState<string | null>(null);

  const embedded = useSearchParams().get("embed") === "1";
  // The newest content sent by the editor. null until the first message arrives.
  const [liveContent, setLiveContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    if (!embedded) return;
    function onMessage(event: MessageEvent) {
      // Only accept messages from our own site, sent by the page we are embedded in.
      if (event.origin !== window.location.origin || event.source !== window.parent) return;
      if (!isStudioMessage(event.data) || event.data.type !== "studio:content") return;
      noteCaret(); // remember where the typing cursor is before the new content is drawn
      setLiveContent(event.data.content);
      setPageKey(event.data.pageKey);
    }
    window.addEventListener("message", onMessage);
    tellEditor({ type: "studio:ready" }); // "I am listening: send me the content"
    return () => window.removeEventListener("message", onMessage);
  }, [embedded]);

  // In the editor, messages for the customer are shown by the editor.
  function say(text: string | null) {
    if (embedded && text) tellEditor({ type: "studio:notice", text });
    else setNotice(text);
  }

  if (state.status === "loading") {
    return (
      <main id="main" className="mx-auto max-w-3xl px-4 py-10">
        <LoadingState label="Loading the preview" />
      </main>
    );
  }

  if (state.status === "error") {
    return (
      <main id="main" className="mx-auto max-w-3xl px-4 py-10">
        <ErrorState title="The preview could not be loaded" message={state.message} onRetry={reload} />
      </main>
    );
  }

  const website = state.data;
  const backButton = (
    <Button href="/dashboard/websites" variant="secondary">
      Back to my websites
    </Button>
  );

  if (!website) {
    return (
      <main id="main" className="mx-auto max-w-3xl px-4 py-10">
        <EmptyState
          icon={SearchX}
          title="Website not found"
          description="There is no website with this address in your account."
          action={backButton}
        />
      </main>
    );
  }

  const template = getTemplateDefinition(website.templateId);

  // Never hand a template content it was not built for. Content arriving
  // from the editor is checked too; if it ever fails, the saved draft is shown.
  const content =
    template && liveContent && contentMatchesSchema(template.schema, liveContent) ? liveContent : website.draft;

  if (!template || !contentMatchesSchema(template.schema, content)) {
    return (
      <main id="main" className="mx-auto max-w-3xl px-4 py-10">
        <EmptyState
          icon={SearchX}
          title="This website cannot be shown"
          description="Its saved content does not match its template. Nothing has been lost, but it needs a fix from MigsFlow."
          action={backButton}
        />
      </main>
    );
  }

  // A hand-written HTML template is a whole page of its own, shown in a frame
  // that fills the screen below Studio's bar.
  if (template.kind === "html") {
    return (
      <div className="flex h-dvh flex-col">
        {!embedded && <PreviewBar websiteName={website.name} notice={notice} />}
        <div id="main" className="flex min-h-0 flex-1 flex-col">
          <HtmlTemplateFrame entry={template.entry} content={content} onNotice={setNotice} />
        </div>
      </div>
    );
  }

  const pages = template.schema.pages;

  const host: TemplateHost = {
    // On a finished site "/services" is a real address. In the preview it is
    // only a hint in the link; clicks are handled by onNavigate below.
    hrefFor: (href) => {
      const page = pages.find((item) => item.path === href);
      return page ? `?page=${page.key}` : href;
    },

    onNavigate: (href: string, event: MouseEvent<HTMLAnchorElement>) => {
      if (href.startsWith("#")) return; // a jump within the page: let the browser do it
      event.preventDefault(); // stop the browser from leaving the preview
      const page = pages.find((item) => item.path === href);
      if (page) {
        setPageKey(page.key);
        say(null);
        window.scrollTo({ top: 0 });
        if (embedded) tellEditor({ type: "studio:page", pageKey: page.key }); // keep the editor on the same page
      } else {
        say("Links that leave your website are switched off in the preview.");
      }
    },

    onFormSubmit: (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      say("This is a preview, so the form did not send anything.");
    },
  };

  // In the editor, the website can be edited by clicking on it. Each action
  // is reported to the editor, which owns the content.
  const editing = embedded
    ? {
        onSelect: (path: string, typing: boolean) => tellEditor({ type: "studio:select", path, typing }),
        onEdit: (path: string, value: string) => tellEditor({ type: "studio:edit", path, value }),
        onDropImage: (path: string, file: File) => tellEditor({ type: "studio:drop-image", path, file }),
      }
    : undefined;

  return (
    <>
      {!embedded && <PreviewBar websiteName={website.name} notice={notice} />}
      {/* id="main" is the skip link's target. The template draws its own <main> inside. */}
      <div id="main">
        <TemplateView template={template} content={content} pageKey={pageKey} host={host} editing={editing} />
      </div>
    </>
  );
}
