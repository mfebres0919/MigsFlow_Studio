import type { FieldValue, ListItem, SectionContent, SiteContent } from "@/templates/types";
import type { EditTarget } from "@/lib/editor/edit-path";
import { SITE_SCOPE } from "@/templates/publish-checks";

// Reading and changing one field inside a website's content.
//
// "scope" says where a section lives: SITE_SCOPE for site-wide settings, or
// a page key such as "home".

export function getSectionContent(content: SiteContent, scope: string, sectionKey: string): SectionContent {
  return scope === SITE_SCOPE ? content.site[sectionKey] : content.pages[scope][sectionKey];
}

/**
 * Returns a NEW content object with one field changed. The original is left
 * untouched: the "..." spreads copy each level on the way down.
 *
 * React needs this. It decides whether to redraw by asking "is this the same
 * object as before?", so a changed-in-place object would look unchanged.
 * It is also how the editor knows there are unsaved changes: the content is
 * no longer the object that was last saved.
 */
export function setFieldValue(
  content: SiteContent,
  scope: string,
  sectionKey: string,
  fieldKey: string,
  value: FieldValue,
): SiteContent {
  if (scope === SITE_SCOPE) {
    return {
      ...content,
      site: { ...content.site, [sectionKey]: { ...content.site[sectionKey], [fieldKey]: value } },
    };
  }
  const page = content.pages[scope];
  return {
    ...content,
    pages: { ...content.pages, [scope]: { ...page, [sectionKey]: { ...page[sectionKey], [fieldKey]: value } } },
  };
}

// Replaces the words of a value. A button keeps where it goes; only its label changes.
function withText(old: FieldValue | ListItem[string] | undefined, text: string) {
  return typeof old === "object" && old !== null && "label" in old ? { ...old, label: text } : text;
}

/**
 * Returns new content with the value at one address replaced. The address
 * may point at a field, or at a field inside one entry of a list.
 */
export function setValueAtTarget(content: SiteContent, target: EditTarget, value: ListItem[string]): SiteContent {
  const old = getSectionContent(content, target.scope, target.sectionKey)[target.fieldKey];
  if (target.itemId && target.subKey && Array.isArray(old)) {
    const subKey = target.subKey;
    const list = old.map((item) => (item.id === target.itemId ? { ...item, [subKey]: value } : item));
    return setFieldValue(content, target.scope, target.sectionKey, target.fieldKey, list as ListItem[]);
  }
  return setFieldValue(content, target.scope, target.sectionKey, target.fieldKey, value);
}

/**
 * Returns new content with the words at one address changed. Used when the
 * customer types directly on the preview. The address may point at a field,
 * or at a field inside one entry of a list.
 */
export function setTextAtTarget(content: SiteContent, target: EditTarget, text: string): SiteContent {
  const section = getSectionContent(content, target.scope, target.sectionKey);
  const old = section[target.fieldKey];

  if (target.itemId && target.subKey && Array.isArray(old)) {
    const subKey = target.subKey;
    const list = old.map((item) => (item.id === target.itemId ? { ...item, [subKey]: withText(item[subKey], text) } : item));
    return setFieldValue(content, target.scope, target.sectionKey, target.fieldKey, list as ListItem[]);
  }
  return setFieldValue(content, target.scope, target.sectionKey, target.fieldKey, withText(old as FieldValue, text) as FieldValue);
}
