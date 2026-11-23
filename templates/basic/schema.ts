import type { TemplateSchema } from "@/templates/types";

// Everything a customer may change in a basic template. The editor builds
// its form from this list. "words" lets a nonprofit say "Programs" where a
// business says "Services".

export type BasicWords = {
  /** The menu label and editor label for the list, e.g. "Services" or "Programs". */
  services: string;
  /** One entry in that list, e.g. "Service" or "Program". */
  item: string;
};

export function basicSchema(words: BasicWords): TemplateSchema {
  return {
    site: [
      {
        key: "business",
        label: "Business details",
        fields: [
          { key: "name", label: "Name", type: "text", publishCheck: "required" },
          { key: "tagline", label: "Tagline", type: "text", help: "A short line shown in the footer.", publishCheck: "required" },
        ],
      },
      {
        key: "brand",
        label: "Colors and fonts",
        fields: [
          { key: "color", label: "Brand color", type: "color", help: "Used for buttons and highlights. Text on it stays readable automatically." },
          { key: "fonts", label: "Fonts", type: "font" },
        ],
      },
      {
        key: "contact",
        label: "Contact information",
        fields: [
          { key: "phone", label: "Phone number", type: "phone", publishCheck: "required" },
          { key: "email", label: "Email address", type: "email", publishCheck: "required" },
          { key: "area", label: "Area you serve", type: "text", publishCheck: "required" },
        ],
      },
    ],
    pages: [
      {
        key: "home",
        label: "Home",
        path: "/",
        sections: [
          {
            key: "seo",
            label: "Search engine listing",
            description: "What people see when this page shows up in a Google search.",
            fields: [
              { key: "title", label: "Page title", type: "text", help: "Keep it under 50 characters.", publishCheck: "recommended" },
              { key: "description", label: "Short description", type: "longText", help: "One or two sentences, about 150 characters." },
            ],
          },
          {
            key: "hero",
            label: "Top of the page",
            description: "The first thing visitors see.",
            fields: [
              { key: "heading", label: "Heading", type: "text" },
              { key: "text", label: "Text", type: "longText" },
              { key: "image", label: "Photo", type: "image", publishCheck: "recommended" },
              { key: "primaryButton", label: "Main button", type: "link" },
              { key: "secondaryButton", label: "Second button", type: "link" },
            ],
          },
          {
            key: "services",
            label: words.services,
            hideable: true,
            fields: [
              { key: "heading", label: "Heading", type: "text" },
              { key: "text", label: "Text", type: "longText" },
              {
                key: "items",
                label: `Your ${words.services.toLowerCase()}`,
                type: "list",
                publishCheck: "recommended",
                itemLabel: words.item.toLowerCase(),
                maxItems: 6,
                fields: [
                  { key: "name", label: "Name", type: "text" },
                  { key: "description", label: "Description", type: "longText" },
                ],
              },
            ],
          },
          {
            key: "about",
            label: "About",
            hideable: true,
            fields: [
              { key: "heading", label: "Heading", type: "text" },
              { key: "text", label: "Text", type: "longText" },
            ],
          },
          {
            key: "contact",
            label: "Contact form",
            fields: [
              { key: "heading", label: "Heading", type: "text" },
              { key: "text", label: "Text", type: "longText" },
              { key: "buttonLabel", label: "Button text", type: "text" },
            ],
          },
        ],
      },
    ],
  };
}
