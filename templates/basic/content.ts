import type { ImageValue, LinkValue } from "@/templates/types";

// The content shape shared by Claude's basic templates (Clean Slate, Easy
// Move, Steady Haul, Open Door, Common Ground). They are deliberately simple
// one-page sites, holding places until Miguelle's own templates replace them
// (Miguelle, 2026-11-23: "make them as basic as possible").
//
// schema.ts lists the same fields for the editor; the two must agree.

export type BasicContent = {
  site: {
    business: { name: string; tagline: string };
    brand: { color: string; fonts: string };
    contact: { phone: string; email: string; area: string };
  };
  pages: {
    home: {
      seo: { title: string; description: string };
      hero: { heading: string; text: string; image: ImageValue; primaryButton: LinkValue; secondaryButton: LinkValue };
      services: { heading: string; text: string; items: { id: string; name: string; description: string }[] };
      about: { heading: string; text: string };
      contact: { heading: string; text: string; buttonLabel: string };
    };
  };
};

/**
 * What a customer's new website starts with: the sample with every made-up
 * fact swapped for an obvious placeholder, so nobody publishes a fictional
 * phone number by accident.
 */
export function starterFrom(sample: BasicContent, itemWord: string): BasicContent {
  const starter = JSON.parse(JSON.stringify(sample).replaceAll(sample.site.business.name, "Your Business Name")) as BasicContent;
  starter.site.business.tagline = "Your tagline goes here.";
  starter.site.contact = { phone: "(000) 000-0000", email: "you@example.com", area: "Your area goes here" };
  starter.pages.home.services.items = [1, 2, 3].map((number) => ({
    id: `item-${number}`,
    name: `${itemWord} ${number}`,
    description: `Describe this ${itemWord.toLowerCase()} in a sentence or two.`,
  }));
  starter.pages.home.hero.image = { ...sample.pages.home.hero.image, alt: "" };
  return starter;
}
