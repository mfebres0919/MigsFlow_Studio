import type { TemplateDefinition } from "@/templates/types";
import { cleaningFresh } from "@/templates/cleaning-fresh";
import { cleaningSlate } from "@/templates/cleaning-slate";
import { movingEasy } from "@/templates/moving-easy";
import { movingHaul } from "@/templates/moving-haul";
import { nonprofitDoor } from "@/templates/nonprofit-door";
import { nonprofitGround } from "@/templates/nonprofit-ground";

// The list of templates Studio can draw. A new template is added here once,
// and the preview and the editor can use it straight away.
//
// For now these are Claude's own basic templates, two per industry
// (Miguelle, 2026-11-23). Miguelle's own templates replace them later; those
// will be hand-written HTML sites ("kind: html", see templates/types.ts).
const definitions: TemplateDefinition[] = [cleaningFresh, cleaningSlate, movingEasy, movingHaul, nonprofitDoor, nonprofitGround];

export function getTemplateDefinition(id: string): TemplateDefinition | undefined {
  return definitions.find((definition) => definition.id === id);
}
