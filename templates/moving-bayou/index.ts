import type { TemplateDefinition } from "@/templates/types";
import { sampleContent, starterContent, stockImages } from "@/templates/moving-bayou/content";
import { schema } from "@/templates/moving-bayou/schema";

// The Moving Day template: Miguelle's hand-written moving company website.
// Its design is the real HTML, CSS and JavaScript in
// public/site-templates/moving-bayou/. Nothing about it was rebuilt in React.
export const movingBayou: TemplateDefinition = {
  id: "moving-bayou",
  kind: "html",
  entry: "/site-templates/moving-bayou/index.html",
  schema,
  sampleContent,
  starterContent,
  stockImages,
  // The first photo of the slideshow at the top of the page.
  heroImage: "home/hero/slides/h1/image",
};
