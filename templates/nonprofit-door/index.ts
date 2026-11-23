import type { BasicContent } from "@/templates/basic/content";
import { defineBasicTemplate } from "@/templates/basic/define";

// The Open Door template: one of Claude's basic placeholder templates
// ("split" layout, see templates/basic/BasicTemplate.tsx).
//
// SAMPLE CONTENT. Harbor Light Community is a made-up business: its name, phone number
// (555-01xx numbers are reserved for fiction) and email are invented, and the
// preview labels it as sample content. A customer's new website starts from
// placeholders instead (templates/basic/content.ts).
const sample: BasicContent = {
  site: {
    business: {
      name: "Harbor Light Community",
      tagline: "Neighbors helping neighbors.",
    },
    brand: {
      color: "#7c3aed",
      fonts: "friendly",
    },
    contact: {
      phone: "(555) 010-0188",
      email: "hello@harborlight.example",
      area: "Serving the Eastside neighborhoods",
    },
  },
  pages: {
    home: {
      seo: {
        title: "Harbor Light Community | the Eastside neighborhoods",
        description: "We provide meals, tutoring and support for families in our community. Join us.",
      },
      hero: {
        heading: "Every neighbor deserves a helping hand",
        text: "We provide meals, tutoring and support for families in our community. Join us.",
        image: {
          src: "/images/templates/nonprofit-door/hero.svg",
          alt: "Sample photo of volunteers packing food boxes",
        },
        primaryButton: {
          label: "Volunteer with us",
          href: "#contact",
        },
        secondaryButton: {
          label: "Our programs",
          href: "#services",
        },
      },
      services: {
        heading: "Our programs",
        text: "Run by volunteers, open to everyone.",
        items: [
          {
            id: "item-1",
            name: "Community meals",
            description: "Free hot meals every Tuesday and Thursday evening.",
          },
          {
            id: "item-2",
            name: "After-school tutoring",
            description: "Homework help for students from grades 1 to 8.",
          },
          {
            id: "item-3",
            name: "Family support",
            description: "Help with forms, benefits and finding local services.",
          },
        ],
      },
      about: {
        heading: "Our mission",
        text: "We believe a strong community starts with people looking out for each other. Every program is free and run by local volunteers.",
      },
      contact: {
        heading: "Get involved",
        text: "Volunteer, donate or ask us a question. We would love to hear from you.",
        buttonLabel: "Send message",
      },
    },
  },
};

export const nonprofitDoor = defineBasicTemplate({
  id: "nonprofit-door",
  layout: "split",
  words: { services: "Programs", item: "Program" },
  sample,
});
