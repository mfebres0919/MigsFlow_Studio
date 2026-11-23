import type { Template } from "@/lib/types";

// The templates on sale, with their prices. This is the ONE place prices
// live; no page or component has a price written into it. In Phase 4 this
// list comes from the database and Stripe.
//
// Prices are whole cents (35000 = $350.00), between $300 and $500
// (Miguelle's range). The five basic templates added 2026-11-23 are Claude's
// placeholders (Miguelle: "make them as basic as possible"), priced by Claude.

/** Optional hosting through MigsFlow, per month (Miguelle, 2026-11-22: $25/mo). */
export const hostingMonthlyCents = 2500;

export const templates: Template[] = [
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
  {
    id: "cleaning-slate",
    name: "Clean Slate",
    industry: "cleaning",
    summary: "A simple one-page site with a big photo across the top.",
    description:
      "A plain, dependable one-page site for cleaning companies: a full-width photo with your main message, your services, a short about section and a contact form.",
    features: ["One page: top section, services, About and Contact", "Contact form and tap-to-call phone number", "Your brand color and twelve font pairs", "Looks right on phones"],
    priceCents: 30000,
  },
  {
    id: "moving-easy",
    name: "Easy Move",
    industry: "moving",
    summary: "A simple one-page site with your message beside a photo.",
    description:
      "A straightforward one-page site for movers: your message and a photo side by side, your services, a short about section and a quote form.",
    features: ["One page: top section, services, About and Contact", "Contact form and tap-to-call phone number", "Your brand color and twelve font pairs", "Looks right on phones"],
    priceCents: 35000,
  },
  {
    id: "moving-haul",
    name: "Steady Haul",
    industry: "moving",
    summary: "A simple one-page site with a big photo across the top.",
    description:
      "A bold but simple one-page site for moving and hauling companies: a full-width photo with your main message, your services, an about section and a contact form.",
    features: ["One page: top section, services, About and Contact", "Contact form and tap-to-call phone number", "Your brand color and twelve font pairs", "Looks right on phones"],
    priceCents: 40000,
  },
  {
    id: "nonprofit-door",
    name: "Open Door",
    industry: "nonprofit",
    summary: "A simple one-page site with your mission beside a photo.",
    description:
      "A warm one-page site for community organizations: your mission and a photo side by side, your programs, an about section and a contact form for volunteers and donors.",
    features: ["One page: top section, programs, About and Contact", "Contact form and tap-to-call phone number", "Your brand color and twelve font pairs", "Looks right on phones"],
    priceCents: 30000,
  },
  {
    id: "nonprofit-ground",
    name: "Common Ground",
    industry: "nonprofit",
    summary: "A simple one-page site with a big photo across the top.",
    description:
      "A one-page site for nonprofits: a full-width photo with your mission, your programs, why your work matters, and a way to get in touch.",
    features: ["One page: top section, programs, About and Contact", "Contact form and tap-to-call phone number", "Your brand color and twelve font pairs", "Looks right on phones"],
    priceCents: 35000,
  },
];
