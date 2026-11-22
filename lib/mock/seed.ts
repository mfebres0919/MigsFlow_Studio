import type { ActivityItem, Deployment, Purchase, Website } from "@/lib/types";
import type { SiteContent } from "@/templates/types";
import { sampleContent, starterContent, type CleaningContent } from "@/templates/cleaning-fresh/content";

// SAMPLE DATA. Everything here is made up for the prototype: the websites,
// the addresses and the activity. Phase 3 replaces it with real rows from
// the database.
//
// It is a function, not a fixed list, so the dates can be written as "2 hours
// ago" and "3 days ago" relative to the moment the demo is first opened.

export type DemoData = {
  websites: Website[];
  activity: ActivityItem[];
  deployments: Deployment[];
  purchases: Purchase[];
};

// SAMPLE PRICE. Miguelle's range for templates is $300 to $500; exact prices
// are not set. This one figure exists so the Billing page has something to
// show, and the page labels it as a sample. Real prices will come from the
// database (and Stripe) in Phase 4, never from a component.
const SAMPLE_TEMPLATE_PRICE_CENTS = 35000;

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

// Each website gets its OWN copy of the content. structuredClone makes a
// deep copy; without it, both websites would share one object and editing
// one would silently change the other.
function contentFrom(base: CleaningContent, change: (content: CleaningContent) => void): SiteContent {
  const copy = structuredClone(base);
  change(copy);
  return copy as unknown as SiteContent;
}

export function buildSeed(now: Date): DemoData {
  const ago = (ms: number) => new Date(now.getTime() - ms).toISOString();

  // Brightside's live site, and a draft with one edit since: a fourth service.
  // That difference is what "Unpublished changes" means.
  const brightsidePublished = contentFrom(sampleContent, () => {});
  const brightsideDraft = contentFrom(sampleContent, (content) => {
    content.site.services.items.push({
      id: "service-4",
      name: "Move-out cleaning",
      description: "Leave your old place spotless for the next tenant, and get your deposit back.",
      price: "From $310",
    });
  });

  // The second website was bought recently and only partly filled in: it
  // still has placeholder contact details and reviews, so trying to publish
  // it shows the "change these first" list.
  const commercialDraft = contentFrom(starterContent, (content) => {
    content.site.business.name = "Brightside Commercial";
    content.site.business.tagline = "Office and shop cleaning, after hours.";
    content.site.brand.color = "#2f4fb8";
    content.site.brand.fonts = "modern";
    content.pages.home.hero.heading = "A clean office every morning";
    content.pages.home.hero.text =
      "After-hours cleaning for offices and shops, scheduled around your opening times.";
  });

  return {
    websites: [
      {
        id: "site_brightside",
        name: "Brightside Cleaning Co.",
        templateId: "cleaning-fresh",
        status: "published",
        hasUnpublishedChanges: true,
        address: "brightside-cleaning.studio.example", // ".example" can never be a real address
        customDomain: null,
        domainStatus: "none",
        brandColor: "#12806f",
        draft: brightsideDraft,
        published: brightsidePublished,
        updatedAt: ago(2 * HOUR),
        publishedAt: ago(3 * DAY),
      },
      {
        id: "site_brightside_commercial",
        name: "Brightside Commercial",
        templateId: "cleaning-fresh",
        status: "draft",
        hasUnpublishedChanges: false,
        address: "brightside-commercial.studio.example",
        customDomain: null,
        domainStatus: "none",
        brandColor: "#2f4fb8",
        draft: commercialDraft,
        published: null,
        updatedAt: ago(9 * DAY),
        publishedAt: null,
      },
    ],
    activity: [
      {
        id: "act_5",
        kind: "edited",
        message: "You edited the services on Brightside Cleaning Co.",
        websiteId: "site_brightside",
        at: ago(2 * HOUR),
      },
      {
        id: "act_4",
        kind: "edited",
        message: "You changed the opening hours on Brightside Cleaning Co.",
        websiteId: "site_brightside",
        at: ago(1 * DAY + 3 * HOUR),
      },
      {
        id: "act_3",
        kind: "published",
        message: "You published Brightside Cleaning Co.",
        websiteId: "site_brightside",
        at: ago(3 * DAY),
      },
      {
        id: "act_2",
        kind: "created",
        message: "You started a new website, Brightside Commercial.",
        websiteId: "site_brightside_commercial",
        at: ago(9 * DAY),
      },
      {
        id: "act_1",
        kind: "purchased",
        message: "You bought the Fresh Start template.",
        websiteId: null,
        at: ago(12 * DAY),
      },
    ],
    // Brightside has been published three times.
    deployments: [
      { id: "dep_3", websiteId: "site_brightside", at: ago(3 * DAY), status: "success" },
      { id: "dep_2", websiteId: "site_brightside", at: ago(8 * DAY), status: "success" },
      { id: "dep_1", websiteId: "site_brightside", at: ago(11 * DAY), status: "success" },
    ],
    // One purchase per website.
    purchases: [
      {
        id: "pur_2",
        templateId: "cleaning-fresh",
        websiteId: "site_brightside_commercial",
        amountCents: SAMPLE_TEMPLATE_PRICE_CENTS,
        purchasedAt: ago(9 * DAY),
        invoiceNumber: "INV-0002",
      },
      {
        id: "pur_1",
        templateId: "cleaning-fresh",
        websiteId: "site_brightside",
        amountCents: SAMPLE_TEMPLATE_PRICE_CENTS,
        purchasedAt: ago(12 * DAY),
        invoiceNumber: "INV-0001",
      },
    ],
  };
}
