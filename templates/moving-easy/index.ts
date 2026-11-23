import type { BasicContent } from "@/templates/basic/content";
import { defineBasicTemplate } from "@/templates/basic/define";

// The Easy Move template: one of Claude's basic placeholder templates
// ("split" layout, see templates/basic/BasicTemplate.tsx).
//
// SAMPLE CONTENT. Northgate Moving Co. is a made-up business: its name, phone number
// (555-01xx numbers are reserved for fiction) and email are invented, and the
// preview labels it as sample content. A customer's new website starts from
// placeholders instead (templates/basic/content.ts).
const sample: BasicContent = {
  site: {
    business: {
      name: "Northgate Moving Co.",
      tagline: "Local and long-distance moves, done right.",
    },
    brand: {
      color: "#c2410c",
      fonts: "confident",
    },
    contact: {
      phone: "(555) 010-0163",
      email: "moves@northgate.example",
      area: "Serving Fairview and the whole county",
    },
  },
  pages: {
    home: {
      seo: {
        title: "Northgate Moving Co. | Fairview and the whole county",
        description: "Careful movers, upfront prices and no surprises on moving day. Get a free quote today.",
      },
      hero: {
        heading: "Moving made simple",
        text: "Careful movers, upfront prices and no surprises on moving day. Get a free quote today.",
        image: {
          src: "/images/templates/moving-easy/hero.svg",
          alt: "Sample photo of a moving truck loaded with boxes",
        },
        primaryButton: {
          label: "Get a free quote",
          href: "#contact",
        },
        secondaryButton: {
          label: "Our services",
          href: "#services",
        },
      },
      services: {
        heading: "How we can help",
        text: "Everything from a single room to a whole house.",
        items: [
          {
            id: "item-1",
            name: "Local moves",
            description: "Across town in a day, with trained, careful crews.",
          },
          {
            id: "item-2",
            name: "Packing help",
            description: "We bring the boxes and pack everything safely.",
          },
          {
            id: "item-3",
            name: "Long-distance",
            description: "Your belongings delivered on a set date, anywhere.",
          },
        ],
      },
      about: {
        heading: "Family owned since day one",
        text: "We started with one truck and a promise to treat every move like our own. Hundreds of moves later, that has not changed.",
      },
      contact: {
        heading: "Get your free quote",
        text: "Tell us where you are moving from and to, and when.",
        buttonLabel: "Request my quote",
      },
    },
  },
};

export const movingEasy = defineBasicTemplate({
  id: "moving-easy",
  layout: "split",
  words: { services: "Services", item: "Service" },
  sample,
});
