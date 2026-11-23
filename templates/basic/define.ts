import type { SiteContent, TemplateDefinition } from "@/templates/types";
import { makeBasicTemplate, type BasicLayout } from "@/templates/basic/BasicTemplate";
import { starterFrom, type BasicContent } from "@/templates/basic/content";
import { basicSchema, type BasicWords } from "@/templates/basic/schema";

// Turns a few choices (layout, words, sample content) into a complete
// template Studio can preview and edit. Each basic template's folder is then
// just its sample content plus one call to this.

type BasicTemplateOptions = {
  id: string;
  layout: BasicLayout;
  words: BasicWords;
  sample: BasicContent;
};

export function defineBasicTemplate({ id, layout, words, sample }: BasicTemplateOptions): TemplateDefinition {
  return {
    id,
    kind: "react",
    schema: basicSchema(words),
    sampleContent: sample as unknown as SiteContent,
    starterContent: starterFrom(sample, words.item) as unknown as SiteContent,
    stockImages: [sample.pages.home.hero.image],
    heroImage: "home/hero/image",
    Component: makeBasicTemplate(layout, words),
  };
}
