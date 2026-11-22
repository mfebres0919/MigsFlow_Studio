import type { PageSchema, SectionSchema, SimpleField, TemplateSchema } from "@/templates/types";

// The list of everything a customer may change in the Fresh Start template.
// The editor (Milestone 5) reads this list and builds its form from it, so
// adding a field here is all it takes to make that field editable.
//
// Labels and hints are written for a business owner, not a developer.

// Fields used on more than one page are written once and reused.
const seo: SectionSchema = {
  key: "seo",
  label: "Search engine listing",
  description: "What people see when this page shows up in a Google search.",
  fields: [
    { key: "title", label: "Page title", type: "text", help: "Keep it under 50 characters.", publishCheck: "recommended" },
    { key: "description", label: "Short description", type: "longText", help: "One or two sentences, about 150 characters." },
  ],
};

const headingAndText: SimpleField[] = [
  { key: "heading", label: "Heading", type: "text" },
  { key: "text", label: "Text", type: "longText" },
];

const callToAction: SectionSchema = {
  key: "cta",
  label: "Closing banner",
  description: "The colored banner near the bottom of the page.",
  fields: [...headingAndText, { key: "button", label: "Button", type: "link" }],
};

const site: SectionSchema[] = [
  {
    key: "business",
    label: "Business details",
    fields: [
      { key: "name", label: "Business name", type: "text", publishCheck: "required" },
      { key: "tagline", label: "Tagline", type: "text", help: "A short line shown in the footer.", publishCheck: "required" },
      { key: "logo", label: "Logo", type: "image", optional: true, help: "Leave empty to show your business name as text." },
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
      { key: "area", label: "Service area", type: "text", help: "For example: Serving Springfield and nearby towns.", publishCheck: "required" },
    ],
  },
  {
    key: "hours",
    label: "Business hours",
    fields: [
      {
        key: "items",
        label: "Opening hours",
        type: "list",
        publishCheck: "recommended",
        itemLabel: "row",
        maxItems: 7,
        fields: [
          { key: "days", label: "Days", type: "text" },
          { key: "hours", label: "Hours", type: "text" },
        ],
      },
    ],
  },
  {
    key: "social",
    label: "Social media",
    description: "Leave one empty to hide it.",
    fields: [
      { key: "facebook", label: "Facebook page", type: "url" },
      { key: "instagram", label: "Instagram profile", type: "url" },
    ],
  },
  {
    key: "services",
    label: "Services",
    description: "Shown on the home page (first three) and in full on the services page.",
    fields: [
      {
        key: "items",
        label: "Your services",
        type: "list",
        publishCheck: "recommended",
        itemLabel: "service",
        maxItems: 9,
        fields: [
          { key: "name", label: "Service name", type: "text" },
          { key: "description", label: "Description", type: "longText" },
          { key: "price", label: "Price note", type: "text", help: "For example: From $120 a visit." },
        ],
      },
    ],
  },
];

const home: PageSchema = {
  key: "home",
  label: "Home",
  path: "/",
  sections: [
    seo,
    {
      key: "hero",
      label: "Top of the page",
      description: "The first thing visitors see.",
      fields: [
        ...headingAndText,
        { key: "image", label: "Photo", type: "image", publishCheck: "recommended" },
        { key: "primaryButton", label: "Main button", type: "link" },
        { key: "secondaryButton", label: "Second button", type: "link" },
      ],
    },
    {
      key: "highlights",
      label: "Why choose you",
      fields: [
        {
          key: "items",
          label: "Reasons",
          type: "list",
          itemLabel: "reason",
          maxItems: 3,
          fields: [
            { key: "title", label: "Title", type: "text" },
            { key: "text", label: "Text", type: "longText" },
          ],
        },
      ],
    },
    {
      key: "servicesIntro",
      label: "Services introduction",
      fields: [...headingAndText, { key: "button", label: "Button", type: "link" }],
    },
    {
      key: "gallery",
      label: "Before and after photos",
      fields: [
        ...headingAndText,
        {
          key: "items",
          label: "Photo pairs",
          type: "list",
          // Before-and-after photos are a claim about real results, so the
          // sample pictures must be replaced or removed before going live
          // (confirmed as a hard stop by Miguelle, 2026-11-22).
          publishCheck: "required",
          itemLabel: "photo pair",
          maxItems: 6,
          fields: [
            { key: "before", label: "Before photo", type: "image" },
            { key: "after", label: "After photo", type: "image" },
            { key: "caption", label: "Caption", type: "text" },
          ],
        },
      ],
    },
    {
      key: "testimonials",
      label: "Customer reviews",
      description: "Only use real reviews from your own customers.",
      fields: [
        { key: "heading", label: "Heading", type: "text" },
        {
          key: "items",
          label: "Reviews",
          type: "list",
          publishCheck: "required",
          itemLabel: "review",
          maxItems: 6,
          fields: [
            { key: "quote", label: "What they said", type: "longText" },
            { key: "name", label: "Customer name", type: "text" },
            { key: "detail", label: "Service they used", type: "text" },
          ],
        },
      ],
    },
    callToAction,
  ],
};

const services: PageSchema = {
  key: "services",
  label: "Services",
  path: "/services",
  sections: [seo, { key: "intro", label: "Top of the page", fields: headingAndText }, callToAction],
};

const contact: PageSchema = {
  key: "contact",
  label: "Contact",
  path: "/contact",
  sections: [
    seo,
    { key: "intro", label: "Top of the page", fields: headingAndText },
    {
      key: "form",
      label: "Quote request form",
      fields: [
        { key: "heading", label: "Form heading", type: "text" },
        { key: "buttonLabel", label: "Button text", type: "text" },
        { key: "note", label: "Privacy note", type: "text", help: "A short line under the button." },
      ],
    },
  ],
};

export const schema: TemplateSchema = { site, pages: [home, services, contact] };
