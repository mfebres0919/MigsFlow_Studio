import type { Industry } from "@/lib/types";

// The industries Studio sells templates for, in the order they are shown.
// "slug" is the word used in the address: /templates/industry/moving.

export type IndustryInfo = {
  slug: Industry;
  /** Short name, for filter buttons and badges. */
  label: string;
  /** Page heading on the industry's own page. */
  heading: string;
  description: string;
};

export const industries: IndustryInfo[] = [
  {
    slug: "cleaning",
    label: "Cleaning",
    heading: "Website templates for cleaning companies",
    description: "For home and office cleaners: services, before-and-after photos, reviews and a quote form.",
  },
  {
    slug: "moving",
    label: "Moving & logistics",
    heading: "Website templates for moving companies",
    description: "For movers and haulers: services, the areas you cover, a quote form and tap-to-call.",
  },
  {
    slug: "nonprofit",
    label: "Nonprofits",
    heading: "Website templates for nonprofits",
    description: "For community organizations: your mission, programs, ways to volunteer and a donation link.",
  },
];

export function getIndustry(slug: string): IndustryInfo | undefined {
  return industries.find((industry) => industry.slug === slug);
}
