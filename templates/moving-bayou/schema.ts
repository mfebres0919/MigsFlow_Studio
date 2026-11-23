import type { ListField, SectionSchema, SimpleField, TemplateSchema } from "@/templates/types";

// The list of everything a customer may change in the Moving Day template.
// Every address here ("home" + section key + field key) matches a marker in
// public/site-templates/moving-bayou/index.html.
//
// This template is one long page, so it has a single page, "home", plus the
// site-wide settings.

const eyebrowHeadingText: SimpleField[] = [
  { key: "eyebrow", label: "Small label above the heading", type: "text" },
  { key: "heading", label: "Heading", type: "text" },
  { key: "text", label: "Text", type: "longText" },
];

// A list whose number of entries is set by the design: editable, not add/remove.
function fixedList(field: Omit<ListField, "type" | "fixed" | "maxItems"> & { count: number }): ListField {
  const { count, ...rest } = field;
  return { ...rest, type: "list", fixed: true, maxItems: count };
}

const site: SectionSchema[] = [
  {
    key: "business",
    label: "Business details",
    fields: [
      { key: "name", label: "Business name", type: "text", help: "The first part of the name, e.g. Bayou City.", publishCheck: "required" },
      { key: "nameAccent", label: "Highlighted word", type: "text", help: "The last word of the name, shown in your main color, e.g. Movers." },
      { key: "tagline", label: "Tagline", type: "text", help: "The short line under your name.", publishCheck: "required" },
      { key: "logo", label: "Logo", type: "image" },
    ],
  },
  {
    key: "brand",
    label: "Colors",
    description: "Buttons, highlights, gradients and background textures all follow these two colors.",
    fields: [
      { key: "color", label: "Main color", type: "color", help: "Pick a strong, fairly dark color: white text sits on it." },
      { key: "colorSecond", label: "Second color", type: "color", help: "A darker companion to the main color." },
    ],
  },
  {
    key: "contact",
    label: "Contact information",
    fields: [
      { key: "phone", label: "Phone number", type: "phone", publishCheck: "required" },
      { key: "email", label: "Email address", type: "email", publishCheck: "required" },
      { key: "addressLine1", label: "Street address", type: "text", publishCheck: "required" },
      { key: "addressCity", label: "City and state", type: "text", help: "For example: Houston, TX.", publishCheck: "required" },
      { key: "addressZip", label: "ZIP code", type: "text", publishCheck: "required" },
      { key: "hoursLine1", label: "Opening hours, first line", type: "text", publishCheck: "recommended" },
      { key: "hoursLine2", label: "Opening hours, second line", type: "text" },
    ],
  },
  {
    key: "social",
    label: "Social media",
    description: "Paste the address of each profile. Leave one empty to hide its icon.",
    fields: [
      { key: "facebook", label: "Facebook", type: "url" },
      { key: "x", label: "X", type: "url" },
      { key: "instagram", label: "Instagram", type: "url" },
      { key: "linkedin", label: "LinkedIn", type: "url" },
    ],
  },
];

const home: SectionSchema[] = [
  {
    key: "seo",
    label: "Search engine listing",
    description: "What people see when your website shows up in a Google search.",
    fields: [
      { key: "title", label: "Page title", type: "text", help: "Keep it under 50 characters.", publishCheck: "recommended" },
      { key: "description", label: "Short description", type: "longText", help: "One or two sentences, about 150 characters.", publishCheck: "recommended" },
    ],
  },
  {
    key: "hero",
    label: "Top of the page",
    description: "The first thing visitors see.",
    fields: [
      { key: "eyebrow", label: "Small label above the heading", type: "text" },
      { key: "heading", label: "Heading", type: "text" },
      { key: "headingAccent", label: "Highlighted end of the heading", type: "text", help: "Shown in your main color." },
      { key: "text", label: "Text", type: "longText" },
      { key: "buttonLabel", label: "Main button", type: "text" },
      fixedList({
        key: "badges",
        label: "Trust points",
        help: "Only claim what is true for your business.",
        itemLabel: "point",
        count: 4,
        publishCheck: "required",
        fields: [{ key: "text", label: "Text", type: "text" }],
      }),
      fixedList({
        key: "slides",
        label: "Background photos",
        help: "These fade from one to the next behind the heading.",
        itemLabel: "photo",
        count: 4,
        publishCheck: "recommended",
        fields: [{ key: "image", label: "Photo", type: "image" }],
      }),
    ],
  },
  {
    key: "quote",
    label: "Quote form",
    description: "The questions in the form itself are part of the design.",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "text", label: "Text", type: "longText" },
    ],
  },
  {
    key: "services",
    label: "Services",
    fields: [
      ...eyebrowHeadingText,
      { key: "ratingScore", label: "Star rating", type: "text", help: "Your real average, e.g. 4.9.", publishCheck: "required" },
      { key: "ratingText", label: "Words beside the rating", type: "text", publishCheck: "required" },
      { key: "reviewQuote", label: "Customer review", type: "longText", help: "Only use a real review from one of your customers.", publishCheck: "required" },
      { key: "reviewName", label: "Who said it", type: "text", publishCheck: "required" },
      fixedList({
        key: "items",
        label: "Your services",
        itemLabel: "service",
        count: 9,
        publishCheck: "recommended",
        fields: [
          { key: "title", label: "Service name", type: "text" },
          { key: "price", label: "Price note", type: "text", help: "For example: From $120/hr." },
          { key: "point1", label: "First point", type: "text" },
          { key: "point2", label: "Second point", type: "text" },
          { key: "point3", label: "Third point", type: "text" },
          { key: "image", label: "Photo", type: "image" },
        ],
      }),
    ],
  },
  {
    key: "areas",
    label: "Areas you serve",
    fields: [
      ...eyebrowHeadingText,
      fixedList({
        key: "items",
        label: "Areas",
        itemLabel: "area",
        count: 6,
        publishCheck: "required",
        fields: [
          { key: "name", label: "Area name", type: "text" },
          { key: "note", label: "Note", type: "text", help: "For example: No travel fee." },
        ],
      }),
    ],
  },
  {
    key: "process",
    label: "How it works",
    fields: [
      ...eyebrowHeadingText,
      { key: "buttonLabel", label: "Main button", type: "text" },
      fixedList({
        key: "steps",
        label: "Steps",
        itemLabel: "step",
        count: 4,
        fields: [
          { key: "title", label: "Step name", type: "text" },
          { key: "text", label: "Short description", type: "longText", help: "Shown on the step's card." },
          { key: "point1", label: "First point", type: "text" },
          { key: "point2", label: "Second point", type: "text" },
          { key: "point3", label: "Third point", type: "text" },
          { key: "timing", label: "Timing note", type: "text" },
          { key: "image", label: "Photo", type: "image" },
        ],
      }),
      fixedList({
        key: "stats",
        label: "Numbers at a glance",
        help: "Only use numbers that are true for your business.",
        itemLabel: "number",
        count: 7,
        publishCheck: "required",
        fields: [
          { key: "value", label: "Number", type: "text" },
          { key: "label", label: "What it counts", type: "text" },
        ],
      }),
    ],
  },
  {
    key: "cta",
    label: "Closing banner",
    fields: [
      ...eyebrowHeadingText,
      { key: "primaryLabel", label: "Main button", type: "text" },
      { key: "secondaryLabel", label: "Second button", type: "text" },
    ],
  },
  {
    key: "contact",
    label: "Contact section",
    description: "Your phone, email, address and hours are under Site-wide settings.",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "text", label: "Text", type: "longText" },
      { key: "image", label: "Background photo", type: "image" },
    ],
  },
  {
    key: "footer",
    label: "Bottom of the page",
    fields: [
      { key: "blurb", label: "About your business", type: "longText" },
      { key: "legal", label: "Licence line", type: "text", help: "Only state licences and insurance you really hold.", publishCheck: "required" },
    ],
  },
];

export const schema: TemplateSchema = {
  site,
  pages: [{ key: "home", label: "Home", path: "/", sections: home }],
};
