import { parseEditPath } from "@/lib/editor/edit-path";
import type { Website } from "@/lib/types";
import { getTemplateDefinition } from "@/templates/registry";
import type { ImageValue, SiteContent } from "@/templates/types";

// Finds the picture that represents a website or a template in lists: its
// hero image, the big photo at the top of its home page (Miguelle,
// 2026-11-22). Each template says where its hero image is kept
// (TemplateDefinition.heroImage), so this works for every template, including
// ones added later.

function imageAt(content: SiteContent, address: string): ImageValue | null {
  const target = parseEditPath(address);
  if (!target) return null;

  const where = target.scope === "site" ? content.site : content.pages[target.scope];
  let value: unknown = where?.[target.sectionKey]?.[target.fieldKey];
  // The hero image may sit inside one entry of a list (e.g. the first slide of a slideshow).
  if (target.itemId && target.subKey && Array.isArray(value)) {
    value = value.find((item) => item.id === target.itemId)?.[target.subKey];
  }

  const image = value as Partial<ImageValue> | undefined;
  return image && typeof image.src === "string" && image.src ? { src: image.src, alt: image.alt ?? "" } : null;
}

/** The website's hero image as it stands in its draft, or null if it has none. */
export function heroImageOf(website: Website): ImageValue | null {
  const template = getTemplateDefinition(website.templateId);
  return template ? imageAt(website.draft, template.heroImage) : null;
}

/** A template's own hero image, from its sample content. Used in the marketplace. */
export function templateHeroImage(templateId: string): ImageValue | null {
  const template = getTemplateDefinition(templateId);
  return template ? imageAt(template.sampleContent, template.heroImage) : null;
}
