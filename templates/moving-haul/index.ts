import type { BasicContent } from "@/templates/basic/content";
import { defineBasicTemplate } from "@/templates/basic/define";

// The Steady Haul template: one of Claude's basic placeholder templates
// ("banner" layout, see templates/basic/BasicTemplate.tsx).
//
// SAMPLE CONTENT. Ironwood Hauling is a made-up business: its name, phone number
// (555-01xx numbers are reserved for fiction) and email are invented, and the
// preview labels it as sample content. A customer's new website starts from
// placeholders instead (templates/basic/content.ts).
const sample: BasicContent = {
  site: {
    business: {
      name: "Ironwood Hauling",
      tagline: "Moving and hauling you can count on.",
    },
    brand: {
      color: "#1d4ed8",
      fonts: "modern",
    },
    contact: {
      phone: "(555) 010-0171",
      email: "crew@ironwood.example",
      area: "Serving Lakeside and surrounding areas",
    },
  },
  pages: {
    home: {
      seo: {
        title: "Ironwood Hauling | Lakeside and surrounding areas",
        description: "Homes, offices and junk removal, handled by a crew that shows up on time.",
      },
      hero: {
        heading: "Strong crews. Fair prices.",
        text: "Homes, offices and junk removal, handled by a crew that shows up on time.",
        image: {
          src: "/images/templates/moving-haul/hero.svg",
          alt: "Sample photo of a moving crew carrying furniture",
        },
        primaryButton: {
          label: "Book a move",
          href: "#contact",
        },
        secondaryButton: {
          label: "See services",
          href: "#services",
        },
      },
      services: {
        heading: "Our services",
        text: "One call for moving, hauling and storage.",
        items: [
          {
            id: "item-1",
            name: "Home moves",
            description: "Apartments to family homes, packed and moved with care.",
          },
          {
            id: "item-2",
            name: "Office moves",
            description: "After-hours moves so your team is back at work fast.",
          },
          {
            id: "item-3",
            name: "Junk removal",
            description: "We haul away what you do not need, and recycle what we can.",
          },
        ],
      },
      about: {
        heading: "Why people choose us",
        text: "Licensed, insured and on time. We give you a clear price before we start, and we stick to it.",
      },
      contact: {
        heading: "Plan your move",
        text: "Send us the details and we will get back to you the same day.",
        buttonLabel: "Send details",
      },
    },
  },
};

export const movingHaul = defineBasicTemplate({
  id: "moving-haul",
  layout: "banner",
  words: { services: "Services", item: "Service" },
  sample,
});
