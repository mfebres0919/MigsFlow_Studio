import type { SiteContent, TemplateDefinition } from "@/templates/types";
import { sampleContent, starterContent, stockImages } from "@/templates/cleaning-fresh/content";
import { schema } from "@/templates/cleaning-fresh/schema";
import CleaningFreshTemplate from "@/templates/cleaning-fresh/Template";

// Everything Studio needs for the Fresh Start template, in one bundle.
export const cleaningFresh: TemplateDefinition = {
  id: "cleaning-fresh",
  kind: "react",
  schema,
  sampleContent: sampleContent as unknown as SiteContent,
  starterContent: starterContent as unknown as SiteContent,
  stockImages,
  heroImage: "home/hero/image",
  Component: CleaningFreshTemplate,
};
