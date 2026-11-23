import type { Template } from "@/lib/types";
import { templates } from "@/lib/mock/templates";

// The doorway for the templates on sale (see lib/data/README.md).
// Unlike a customer's websites, the catalog is the same for everyone and does
// not live in the browser, so the public pages can read it on the server and
// be built ahead of time. In Phase 3 these read the database instead.

/** Every template on sale. */
export async function getTemplates(): Promise<Template[]> {
  return templates;
}

/** One template by its id, or null if there is no such template. */
export async function getTemplate(id: string): Promise<Template | null> {
  return templates.find((template) => template.id === id) ?? null;
}
