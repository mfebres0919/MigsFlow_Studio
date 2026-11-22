import type { Field, FieldValue, ListItem, SectionSchema, SiteContent, TemplateDefinition } from "@/templates/types";

// The checks run when a customer presses Publish (decided by Miguelle,
// 2026-11-22). A new website starts with placeholder content. This finds the
// fields that still hold their placeholder, so a customer cannot go live with
// "Your Business Name", a fake phone number, or reviews nobody wrote.
//
// Which fields are checked, and how strictly, is set per field in the
// template's schema (publishCheck).

/** Where site-wide sections live in the editor's page selector. No page may use this as its key. */
export const SITE_SCOPE = "site";

export type PublishIssue = {
  /** "required" blocks publishing; "recommended" only warns. */
  level: "required" | "recommended";
  /** SITE_SCOPE, or the key of the page the field is on. */
  scope: string;
  sectionKey: string;
  /** Where to find it, in the customer's words: "Home page: Customer reviews". */
  where: string;
  /** What is wrong and what to do. */
  problem: string;
};

// Two values are "the same" if they would be saved as the same text.
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

// List entries are compared without their id, which is only a label for telling them apart.
function withoutId(item: ListItem) {
  return Object.fromEntries(Object.entries(item).filter(([key]) => key !== "id"));
}

function problemWith(field: Field, current: FieldValue | undefined, starter: FieldValue | undefined): string | null {
  if (field.type === "list") {
    const items = Array.isArray(current) ? current : [];
    const starters = Array.isArray(starter) ? starter : [];
    const untouched = items.filter((item) => starters.some((original) => same(withoutId(item), withoutId(original)))).length;
    if (untouched === 0) return null;
    const noun = untouched === 1 ? field.itemLabel : `${field.itemLabel}s`;
    return `${untouched} placeholder ${noun} still in place. Replace ${untouched === 1 ? "it" : "them"} with your own, or remove ${untouched === 1 ? "it" : "them"}.`;
  }

  if (typeof current === "string" && current.trim() === "") {
    return field.publishCheck === "required" ? "This is empty. Fill it in." : null;
  }
  if (!same(current, starter)) return null;
  return field.type === "image"
    ? "This still shows the sample photo. Choose your own."
    : "This still has the placeholder text. Replace it with your own.";
}

function checkSections(
  sections: SectionSchema[],
  scope: string,
  whereStart: string,
  current: Record<string, Record<string, FieldValue>> | undefined,
  starter: Record<string, Record<string, FieldValue>> | undefined,
): PublishIssue[] {
  const issues: PublishIssue[] = [];
  for (const section of sections) {
    for (const field of section.fields) {
      if (!field.publishCheck) continue;
      const problem = problemWith(field, current?.[section.key]?.[field.key], starter?.[section.key]?.[field.key]);
      if (problem) {
        issues.push({
          level: field.publishCheck,
          scope,
          sectionKey: section.key,
          where: `${whereStart}: ${section.label}, ${field.label}`,
          problem,
        });
      }
    }
  }
  return issues;
}

/** Everything that should be changed before this content goes live. An empty list means it is ready. */
export function findPublishIssues(template: TemplateDefinition, content: SiteContent): PublishIssue[] {
  const { schema, starterContent } = template;
  return [
    ...checkSections(schema.site, SITE_SCOPE, "Site-wide settings", content.site, starterContent.site),
    ...schema.pages.flatMap((page) =>
      checkSections(page.sections, page.key, `${page.label} page`, content.pages[page.key], starterContent.pages[page.key]),
    ),
  ];
}
