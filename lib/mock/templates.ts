import type { Template } from "@/lib/types";

// The templates on sale, with their prices. This is the ONE place prices
// live; no page or component has a price written into it. In Phase 4 this
// list comes from the database and Stripe.
//
// Prices are whole cents (45000 = $450.00). Miguelle set Moving Day at $450
// (2026-11-22) and asked Claude to pick the others within $300 to $500.
export const templates: Template[] = [
  {
    id: "moving-bayou",
    name: "Moving Day",
    industry: "moving",
    summary: "A bold one-page site with a photo slideshow and a step-by-step quote form.",
    description:
      "Built for moving companies that win work on trust and speed. Visitors see your crew in action, get a quote in four short steps, and find your services, areas and process on one page.",
    features: [
      "Photo slideshow at the top of the page",
      "Step-by-step quote form",
      "Nine services with photos and prices",
      "Areas you serve",
      "Four-step process and your numbers at a glance",
      "Contact section with tap-to-call",
    ],
    priceCents: 45000,
  },
  {
    id: "cleaning-fresh",
    name: "Fresh Start",
    industry: "cleaning",
    summary: "A light, friendly three-page site with before-and-after photos and reviews.",
    description:
      "Built for home and office cleaners. A welcoming home page, a services page with prices, and a contact page with a quote form, in a clean style that suits the work.",
    features: [
      "Home, Services and Contact pages",
      "Before-and-after photo pairs",
      "Customer reviews",
      "Services with price notes",
      "Quote request form",
      "Twelve font pairs to choose from",
    ],
    priceCents: 35000,
  },
];
