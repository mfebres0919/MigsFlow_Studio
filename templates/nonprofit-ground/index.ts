import type { BasicContent } from "@/templates/basic/content";
import { defineBasicTemplate } from "@/templates/basic/define";

// The Common Ground template: one of Claude's basic placeholder templates
// ("banner" layout, see templates/basic/BasicTemplate.tsx).
//
// SAMPLE CONTENT. Greenway Youth Alliance is a made-up business: its name, phone number
// (555-01xx numbers are reserved for fiction) and email are invented, and the
// preview labels it as sample content. A customer's new website starts from
// placeholders instead (templates/basic/content.ts).
const sample: BasicContent = {
  site: {
    business: {
      name: "Greenway Youth Alliance",
      tagline: "Opening doors for young people.",
    },
    brand: {
      color: "#15803d",
      fonts: "classic",
    },
    contact: {
      phone: "(555) 010-0192",
      email: "info@greenway.example",
      area: "Serving young people across Millbrook",
    },
  },
  pages: {
    home: {
      seo: {
        title: "Greenway Youth Alliance | young people across Millbrook",
        description: "Mentoring, sports and job skills for young people aged 12 to 18. Help us reach more of them.",
      },
      hero: {
        heading: "Growing tomorrow's leaders",
        text: "Mentoring, sports and job skills for young people aged 12 to 18. Help us reach more of them.",
        image: {
          src: "/images/templates/nonprofit-ground/hero.svg",
          alt: "Sample photo of young people planting a community garden",
        },
        primaryButton: {
          label: "Support our work",
          href: "#contact",
        },
        secondaryButton: {
          label: "See programs",
          href: "#services",
        },
      },
      services: {
        heading: "What we do",
        text: "Programs that build confidence and skills.",
        items: [
          {
            id: "item-1",
            name: "Mentoring",
            description: "One-to-one mentors who meet with a young person each week.",
          },
          {
            id: "item-2",
            name: "Youth sports",
            description: "Free leagues and coaching all year round.",
          },
          {
            id: "item-3",
            name: "Job skills",
            description: "Résumé help, interview practice and first-job placements.",
          },
        ],
      },
      about: {
        heading: "Why it matters",
        text: "Every young person deserves someone in their corner. Since our start, our volunteers have mentored hundreds of local teens.",
      },
      contact: {
        heading: "Join us",
        text: "Become a mentor, sponsor a team or ask how you can help.",
        buttonLabel: "Send message",
      },
    },
  },
};

export const nonprofitGround = defineBasicTemplate({
  id: "nonprofit-ground",
  layout: "banner",
  words: { services: "Programs", item: "Program" },
  sample,
});
