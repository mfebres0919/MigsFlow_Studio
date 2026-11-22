"use client";

import InlineEditing from "@/components/preview/InlineEditing";
import { useMediaUrls } from "@/hooks/useMediaUrls";
import { mediaIdsIn, withMediaResolved } from "@/lib/media/ref";
import type { SiteContent, TemplateDefinition, TemplateHost } from "@/templates/types";

// Draws a website with its template. Two jobs happen here, just before drawing:
// 1. uploaded pictures ("media:…" in the content) are swapped for addresses
//    the browser can show, so the template only ever sees ordinary pictures;
// 2. inside the editor, the website is wrapped so it can be edited by clicking.

type TemplateViewProps = {
  template: TemplateDefinition;
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
