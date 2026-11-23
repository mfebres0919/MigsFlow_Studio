import type { BasicContent } from "@/templates/basic/content";
import { defineBasicTemplate } from "@/templates/basic/define";

// The Clean Slate template: one of Claude's basic placeholder templates
// ("banner" layout, see templates/basic/BasicTemplate.tsx).
//
// SAMPLE CONTENT. Sparrow Lane Cleaning is a made-up business: its name, phone number
// (555-01xx numbers are reserved for fiction) and email are invented, and the
// preview labels it as sample content. A customer's new website starts from
// placeholders instead (templates/basic/content.ts).
const sample: BasicContent = {
  site: {
    business: {
      name: "Sparrow Lane Cleaning",
      tagline: "Careful cleaning for busy homes.",
    },
    brand: {
      color: "#0e7490",
      fonts: "clean",
    },
    contact: {
      phone: "(555) 010-0155",
      email: "hello@sparrowlane.example",
      area: "Serving Riverton and nearby towns",
    },
  },
  pages: {
    home: {
      seo: {
        title: "Sparrow Lane Cleaning | Riverton and nearby towns",
        description: "Weekly, every-other-week or one-time cleans by the same trusted team. Book online in two minutes.",
      },
      hero: {
        heading: "A spotless home, without lifting a finger",
        text: "Weekly, every-other-week or one-time cleans by the same trusted team. Book online in two minutes.",
        image: {
          src: "/images/templates/cleaning-slate/hero.svg",
          alt: "Sample photo of a tidy, sunlit kitchen",
        },
        primaryButton: {
          label: "Book a clean",
          href: "#contact",
        },
        secondaryButton: {
          label: "See services",
          href: "#services",
        },
      },
      services: {
        heading: "What we clean",
        text: "Pick one visit or set up a regular schedule.",
        items: [
          {
            id: "item-1",
            name: "Standard clean",
            description: "Kitchens, bathrooms, floors and dusting throughout.",
          },
          {
            id: "item-2",
            name: "Deep clean",
            description: "Inside appliances, baseboards and every corner.",
          },
          {
            id: "item-3",
            name: "Move-out clean",
            description: "Leave your old place ready for the next people.",
          },
        ],
      },
      about: {
        heading: "Small team, big care",
        text: "We are a local team of five who treat every home as if it were our own. Same cleaners each visit, supplies included.",
      },
      contact: {
        heading: "Ask for a quote",
        text: "Tell us a little about your home and we will reply within a day.",
        buttonLabel: "Send request",
      },
    },
  },
};

export const cleaningSlate = defineBasicTemplate({
  id: "cleaning-slate",
  layout: "banner",
  words: { services: "Services", item: "Service" },
  sample,
});
