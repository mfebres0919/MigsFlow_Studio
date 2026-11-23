"use client";

import InlineEditing from "@/components/preview/InlineEditing";
import { useMediaUrls } from "@/hooks/useMediaUrls";
import { mediaIdsIn, withMediaResolved } from "@/lib/media/ref";
import type { SiteContent, TemplateDefinition, TemplateHost } from "@/templates/types";

// Draws a website with a React template (kind "react"). Hand-written HTML
// templates are shown by HtmlTemplateFrame instead.
// Two jobs happen here, just before drawing:
// 1. uploaded pictures ("media:…" in the content) are swapped for addresses
//    the browser can show, so the template only ever sees ordinary pictures;
// 2. inside the editor, the website is wrapped so it can be edited by clicking.

type TemplateViewProps = {
  /** Extract<…> narrows the type to the React kind of template, the only kind with a Component. */
  template: Extract<TemplateDefinition, { kind: "react" }>;
  content: SiteContent;
  pageKey: string;
  host: TemplateHost;
  /** Set inside the editor: turns on click-to-edit and reports what the customer does. */
  editing?: {
    onSelect: (path: string, typing: boolean) => void;
    onEdit: (path: string, value: string) => void;
    onDropImage: (path: string, file: File) => void;
  };
};

export default function TemplateView({ template, content, pageKey, host, editing }: TemplateViewProps) {
  const resolve = useMediaUrls(mediaIdsIn(content));
  const Template = template.Component;
  const page = <Template content={withMediaResolved(content, resolve)} pageKey={pageKey} host={host} />;

  if (!editing) return page;
  return (
    <InlineEditing schema={template.schema} {...editing}>
      {page}
    </InlineEditing>
  );
}
