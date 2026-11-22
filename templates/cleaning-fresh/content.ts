import type { ImageValue, LinkValue } from "@/templates/types";

// The exact shape of this template's content, and a filled-in example.
//
// schema.ts lists the same fields for the editor. The two must agree: every
// field here appears there, and the other way round.

type Seo = { title: string; description: string };
type CallToAction = { heading: string; text: string; button: LinkValue };

export type CleaningContent = {
  site: {
    business: { name: string; tagline: string; logo: ImageValue };
    brand: { color: string; fonts: string };
    contact: { phone: string; email: string; area: string };
    hours: { items: { id: string; days: string; hours: string }[] };
    social: { facebook: string; instagram: string };
    services: { items: { id: string; name: string; description: string; price: string }[] };
  };
  pages: {
    home: {
      seo: Seo;
      hero: { heading: string; text: string; image: ImageValue; primaryButton: LinkValue; secondaryButton: LinkValue };
      highlights: { items: { id: string; title: string; text: string }[] };
      servicesIntro: { heading: string; text: string; button: LinkValue };
      gallery: {
        heading: string;
        text: string;
        items: { id: string; before: ImageValue; after: ImageValue; caption: string }[];
      };
      testimonials: { heading: string; items: { id: string; quote: string; name: string; detail: string }[] };
      cta: CallToAction;
    };
    services: { seo: Seo; intro: { heading: string; text: string }; cta: CallToAction };
    contact: { seo: Seo; intro: { heading: string; text: string }; form: { heading: string; buttonLabel: string; note: string } };
  };
};

const images = "/images/templates/cleaning-fresh";

/** The pictures that come with this template. */
export const stockImages: ImageValue[] = [
  { src: `${images}/hero.svg`, alt: "Sample photo of a bright, freshly cleaned living room" },
  { src: `${images}/sample-before-1.svg`, alt: "Sample photo of a room before cleaning" },
  { src: `${images}/sample-after-1.svg`, alt: "Sample photo of a room after cleaning" },
];

// SAMPLE CONTENT. Brightside Cleaning Co. is a made-up business. Its phone
// number, prices and customer reviews are invented so the template can be
// previewed with realistic text, and the preview says so on screen. A real
// customer replaces all of it with their own.
export const sampleContent: CleaningContent = {
  site: {
    business: {
      name: "Brightside Cleaning Co.",
      tagline: "Home and office cleaning you can count on.",
      logo: { src: "", alt: "" }, // empty = show the business name as text
    },
    brand: { color: "#12806f", fonts: "friendly" },
    contact: {
      phone: "(555) 010-0142", // 555-01xx numbers are reserved for fiction
      email: "hello@brightside-cleaning.example",
      area: "Serving Springfield and nearby towns",
    },
    hours: {
      items: [
        { id: "hours-1", days: "Monday to Friday", hours: "8:00 am to 6:00 pm" },
        { id: "hours-2", days: "Saturday", hours: "9:00 am to 2:00 pm" },
        { id: "hours-3", days: "Sunday", hours: "Closed" },
      ],
    },
    social: {
      facebook: "https://facebook.com/",
      instagram: "https://instagram.com/",
    },
    services: {
      items: [
        {
          id: "service-1",
          name: "Regular home cleaning",
          description: "Weekly or every-other-week visits that keep kitchens, bathrooms and living spaces fresh.",
          price: "From $120 a visit",
        },
        {
          id: "service-2",
          name: "Deep cleaning",
          description: "A top-to-bottom clean for the places a quick tidy misses: ovens, baseboards, grout and more.",
          price: "From $260",
        },
        {
          id: "service-3",
          name: "Office cleaning",
          description: "After-hours cleaning for offices and shops, scheduled around your opening times.",
          price: "Ask for a quote",
        },
      ],
    },
  },
  pages: {
    home: {
      seo: {
        title: "Home and Office Cleaning in Springfield",
        description:
          "Reliable home and office cleaning in Springfield. Regular visits, deep cleans and move-out cleans. Ask for a free quote today.",
      },
      hero: {
        heading: "Come home to a clean house",
        text: "Friendly, careful cleaners for homes and small offices in Springfield. Tell us what you need and get a free quote within one working day.",
        image: { src: `${images}/sample-hero.svg`, alt: "Sample photo of a bright, freshly cleaned living room" },
        primaryButton: { label: "Get a free quote", href: "/contact" },
        secondaryButton: { label: "See our services", href: "/services" },
      },
      highlights: {
        items: [
          { id: "highlight-1", title: "The same cleaner each visit", text: "You get someone who knows your home and how you like it." },
          { id: "highlight-2", title: "Supplies included", text: "We bring everything, including products that are safe around pets." },
          { id: "highlight-3", title: "Easy to reschedule", text: "Plans change. Move a visit with a day's notice at no charge." },
        ],
      },
      servicesIntro: {
        heading: "What we clean",
        text: "Pick a regular visit, a one-time deep clean, or a plan for your office.",
        button: { label: "All services and prices", href: "/services" },
      },
      gallery: {
        heading: "Before and after",
        text: "A few rooms from recent visits.",
        items: [
          {
            id: "gallery-1",
            before: { src: `${images}/before-1.svg`, alt: "Sample photo of a kitchen before cleaning" },
            after: { src: `${images}/after-1.svg`, alt: "Sample photo of the same kitchen after cleaning" },
            caption: "Kitchen deep clean",
          },
          {
            id: "gallery-2",
            before: { src: `${images}/sample-before-2.svg`, alt: "Sample photo of a bathroom before cleaning" },
            after: { src: `${images}/sample-after-2.svg`, alt: "Sample photo of the same bathroom after cleaning" },
            caption: "Bathroom refresh",
          },
          {
            id: "gallery-3",
            before: { src: `${images}/sample-before-3.svg`, alt: "Sample photo of an office before cleaning" },
            after: { src: `${images}/sample-after-3.svg`, alt: "Sample photo of the same office after cleaning" },
            caption: "Office after-hours clean",
          },
        ],
      },
      testimonials: {
        heading: "What customers say",
        items: [
          {
            id: "review-1",
            quote: "They arrive on time, every time, and the house has never looked better.",
            name: "Maria T.",
            detail: "Regular home cleaning",
          },
          {
            id: "review-2",
            quote: "We booked a deep clean before guests arrived. The oven looks new again.",
            name: "James R.",
            detail: "Deep cleaning",
          },
          {
            id: "review-3",
            quote: "Our office is spotless every morning and we never have to think about it.",
            name: "Priya S.",
            detail: "Office cleaning",
          },
        ],
      },
      cta: {
        heading: "Ready for a cleaner home?",
        text: "Tell us about your space and we will send a free quote.",
        button: { label: "Get a free quote", href: "/contact" },
      },
    },
    services: {
      seo: {
        title: "Cleaning Services and Prices in Springfield",
        description:
          "Regular home cleaning, deep cleaning and office cleaning in Springfield, with clear starting prices. Ask for a free quote.",
      },
      intro: {
        heading: "Cleaning services",
        text: "Every visit is done by a trained cleaner who brings their own supplies. Prices depend on the size of your space, so the figures below are starting points.",
      },
      cta: {
        heading: "Not sure which service you need?",
        text: "Describe your space and we will suggest the right one.",
        button: { label: "Ask us", href: "/contact" },
      },
    },
    contact: {
      seo: {
        title: "Get a Free Cleaning Quote in Springfield",
        description:
          "Ask Brightside Cleaning Co. for a free quote. Tell us about your home or office and we will reply within one working day.",
      },
      intro: {
        heading: "Get a free quote",
        text: "Fill in the form and we will reply within one working day. Prefer to talk? Call us.",
      },
      form: {
        heading: "Tell us about your space",
        buttonLabel: "Send my request",
        note: "We only use your details to reply to this request.",
      },
    },
  },
};

// STARTER CONTENT: what a new customer's website begins with. It is the
// sample above with every made-up fact swapped for an obvious placeholder, so
// nobody can publish Brightside's phone number or invented reviews by
// accident. The fields marked publishCheck in schema.ts are compared against
// this when the customer presses Publish.
function buildStarterContent(): CleaningContent {
  // Swap the fictional names wherever they appear in the text.
  const text = JSON.stringify(sampleContent)
    .replaceAll("Brightside Cleaning Co.", "Your Business Name")
    .replaceAll("Springfield", "Your Town");
  const starter = JSON.parse(text) as CleaningContent;

  starter.site.business.tagline = "Your tagline goes here.";
  starter.site.contact = {
    phone: "(000) 000-0000",
    email: "you@example.com",
    area: "Your service area goes here",
  };
  starter.site.social = { facebook: "", instagram: "" };
  starter.site.hours.items = [
    { id: "hours-1", days: "Monday to Friday", hours: "9:00 am to 5:00 pm" },
    { id: "hours-2", days: "Saturday and Sunday", hours: "Closed" },
  ];
  starter.site.services.items = [1, 2, 3].map((number) => ({
    id: `service-${number}`,
    name: `Service ${number}`,
    description: "Describe this service in a sentence or two: what it includes and who it is for.",
    price: "Your price",
  }));

  // The template's own placeholder pictures, in place of Brightside's.
  starter.pages.home.hero.image = { src: `${images}/hero.svg`, alt: "" };
  starter.pages.home.gallery.items = [1, 2, 3].map((number) => ({
    id: `gallery-${number}`,
    before: { src: `${images}/before-${number}.svg`, alt: "" },
    after: { src: `${images}/after-${number}.svg`, alt: "" },
    caption: "Describe this job",
  }));
  starter.pages.home.testimonials.items = [1, 2, 3].map((number) => ({
    id: `review-${number}`,
    quote: "Replace this with a real review from one of your customers.",
    name: "Customer name",
    detail: "Service they used",
  }));

  return starter;
}

export const starterContent: CleaningContent = buildStarterContent();
