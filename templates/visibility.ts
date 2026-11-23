import type { SiteContent } from "@/templates/types";

// Showing and hiding sections (Miguelle, 2026-11-23).
//
// A template marks the sections a customer may switch off with
// `hideable: true` in its schema. The switched-off ones are listed in the
// content's `hidden` list as "page/section" addresses, e.g. "home/gallery".
// Hiding never deletes anything: the section's words and photos stay in the
// content, so switching it back on brings everything back.
//
// Templates call isHidden() to leave a section (and any menu link to it) out
// of the page. Hand-written HTML templates do the same with the
// data-edit-section marker (public/studio-bridge.js).

/** The address of one page's section: "home/gallery". */
export function sectionAddress(pageKey: string, sectionKey: string): string {
  return `${pageKey}/${sectionKey}`;
}

/** True when the customer has switched this section off. */
export function isHidden(content: SiteContent, pageKey: string, sectionKey: string): boolean {
  return content.hidden?.includes(sectionAddress(pageKey, sectionKey)) ?? false;
}

/** A copy of the content with one section switched on or off. */
export function withSectionHidden(content: SiteContent, pageKey: string, sectionKey: string, hidden: boolean): SiteContent {
  const address = sectionAddress(pageKey, sectionKey);
  const rest = (content.hidden ?? []).filter((entry) => entry !== address);
  return { ...content, hidden: hidden ? [...rest, address] : rest };
}
