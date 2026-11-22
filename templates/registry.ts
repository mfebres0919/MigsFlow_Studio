import type { TemplateDefinition } from "@/templates/types";
import { cleaningFresh } from "@/templates/cleaning-fresh";

// The list of templates Studio can draw. A new template is added here once,
// and the preview and the editor can use it straight away.
const definitions: TemplateDefinition[] = [cleaningFresh];

export function getTemplateDefinition(id: string): TemplateDefinition | undefined {
  return definitions.find((definition) => definition.id === id);
}
