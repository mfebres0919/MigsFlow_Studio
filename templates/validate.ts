import type { Field, SectionContent, SectionSchema, SiteContent, TemplateSchema } from "@/templates/types";

// Checks that saved content has every field its template's schema expects,
// in the right shape. Content is saved data, and saved data can be out of
// date or damaged. Checking it once, before drawing, means the template
// itself never has to worry about a missing value.

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// "unknown" means "could be anything": TypeScript then insists we check before using it.
function valueMatches(field: Field, value: unknown): boolean {
  switch (field.type) {
    case "image":
      return isRecord(value) && typeof value.src === "string" && typeof value.alt === "string";
    case "link":
      return isRecord(value) && typeof value.label === "string" && typeof value.href === "string";
    case "list":
      return (
        Array.isArray(value) &&
        value.every(
          (item) =>
            isRecord(item) &&
            typeof item.id === "string" &&
            field.fields.every((inner) => valueMatches(inner, item[inner.key])),
        )
      );
    default:
      // text, longText, email, phone, url, color, font: all stored as plain text
      return typeof value === "string";
  }
}

function sectionMatches(schema: SectionSchema, content: SectionContent | undefined): boolean {
  return isRecord(content) && schema.fields.every((field) => valueMatches(field, content[field.key]));
}

/** True when the content has everything the schema asks for. */
export function contentMatchesSchema(schema: TemplateSchema, content: SiteContent): boolean {
  if (!isRecord(content) || !isRecord(content.site) || !isRecord(content.pages)) return false;

  const siteOk = schema.site.every((section) => sectionMatches(section, content.site[section.key]));
  const pagesOk = schema.pages.every((page) => {
    const pageContent = content.pages[page.key];
    return isRecord(pageContent) && page.sections.every((section) => sectionMatches(section, pageContent[section.key]));
  });

  return siteOk && pagesOk;
}
