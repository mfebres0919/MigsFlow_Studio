"use client"; // switches pages on click and talks to the page around it

import { useCallback, useState, type FormEvent, type MouseEvent } from "react";
import HtmlTemplateFrame from "@/components/preview/HtmlTemplateFrame";
import TemplateView from "@/components/preview/TemplateView";
import type { PreviewMessage } from "@/lib/preview-messages";
import { getTemplateDefinition } from "@/templates/registry";
import type { TemplateHost } from "@/templates/types";

// A template drawn with its sample content, and nothing else on the page.
// It is shown inside the frame of a template's live preview
// (components/marketing/TemplateLivePreview.tsx), which sets its width.
//
// Unlike /preview/<website id>, there is no customer and nothing stored: the
// content is the template's own sample content, the same for every visitor.

// Tells the page around the frame something, e.g. "the form did not send".
function tellParent(text: string) {
  const message: PreviewMessage = { type: "studio:notice", text };
  window.parent.postMessage(message, window.location.origin);
}

export default function SampleSite({ templateId }: { templateId: string }) {
  const [pageKey, setPageKey] = useState("home");
  const onNotice = useCallback((text: string) => tellParent(text), []);

  const template = getTemplateDefinition(templateId);
  if (!template) return null;

  // A hand-written HTML template is a whole page of its own, in a frame filling this one.
  if (template.kind === "html") {
    return (
      <div id="main" className="flex h-dvh flex-col">
        <HtmlTemplateFrame entry={template.entry} content={template.sampleContent} onNotice={onNotice} />
      </div>
    );
  }

  const pages = template.schema.pages;
  const host: TemplateHost = {
    hrefFor: (href) => {
      const page = pages.find((item) => item.path === href);
      return page ? `?page=${page.key}` : href;
    },
    onNavigate: (href: string, event: MouseEvent<HTMLAnchorElement>) => {
      if (href.startsWith("#")) return; // a jump within the page: let the browser do it
      event.preventDefault(); // stay inside the preview
      const page = pages.find((item) => item.path === href);
      if (page) {
        setPageKey(page.key);
        window.scrollTo({ top: 0 });
      } else {
        tellParent("Links that leave the website are switched off in the preview.");
      }
    },
    onFormSubmit: (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      tellParent("This is a preview, so the form did not send anything.");
    },
  };

  return (
    <div id="main">
      <TemplateView template={template} content={template.sampleContent} pageKey={pageKey} host={host} />
    </div>
  );
}
