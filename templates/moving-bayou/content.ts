import type { ImageValue, ListItem, SiteContent } from "@/templates/types";
import sample from "@/templates/moving-bayou/sample-content.json";

// The Moving Day template's content.
//
// SAMPLE CONTENT is Bayou City Movers, a made-up business (its phone number
// is a reserved fictional one). It is kept in sample-content.json, which was
// generated from the template's own HTML page, so the two always agree word
// for word. If the page's default text changes, regenerate that file.
export const sampleContent = sample as unknown as SiteContent;

const images = "/site-templates/moving-bayou/images";

/** The pictures that come with this template, offered in the editor's photo fields. */
export const stockImages: ImageValue[] = [
  "hero-truck-skyline",
  "hero-crew-carrying-boxes",
  "hero-family-new-home",
  "hero-crew-wrapping-sofa",
  "service-local-moves",
  "service-long-distance-moves",
  "service-packing-unpacking",
  "service-apartment-condo-moves",
  "service-commercial-office-moves",
  "service-storage-solutions",
  "service-specialty-items",
  "service-junk-removal",
  "service-moving-day-essentials",
  "process-free-quote",
  "process-plan-move-day",
  "process-pack-and-move",
  "process-settle-in",
  "contact-piano",
].map((name) => ({ src: `${images}/${name}.jpg`, alt: "" }));

// STARTER CONTENT: what a new customer's website begins with. The sample's
// made-up facts are swapped for obvious placeholders, so nobody can publish
// Bayou City's phone number, review or numbers by accident. The fields marked
// publishCheck in schema.ts are compared against this when Publish is pressed.
function buildStarterContent(): SiteContent {
  const text = JSON.stringify(sample)
    .replaceAll("Bayou City Movers", "Your Business Name")
    .replaceAll("Greater Houston", "Your Area")
    .replaceAll("Houston", "Your City");
  const starter = JSON.parse(text) as SiteContent;
  const { site, pages } = starter;
  const home = pages.home;

  site.business = { ...site.business, name: "Your Business", nameAccent: "Name", tagline: "Your tagline goes here" };
  site.contact = {
    phone: "(000) 000 0000",
    email: "you@example.com",
    addressLine1: "Your street address",
    addressCity: "Your city, ST",
    addressZip: "00000",
    hoursLine1: "Your opening hours",
    hoursLine2: "",
  };
  site.social = { facebook: "", x: "", instagram: "", linkedin: "" };

  home.services = {
    ...home.services,
    ratingScore: "0.0",
    ratingText: "your real rating goes here",
    reviewQuote: "Replace this with a real review from one of your customers.",
    reviewName: "Customer name, neighborhood",
  };
  home.hero.badges = (home.hero.badges as ListItem[]).map((badge, index) => ({ ...badge, text: `Trust point ${index + 1}` }));
  home.areas.items = (home.areas.items as ListItem[]).map((area, index) => ({ ...area, name: `Area ${index + 1}`, note: "Add a note" }));
  home.process.stats = (home.process.stats as ListItem[]).map((stat) => ({ ...stat, value: "0", label: "Describe this number" }));
  home.footer = { ...home.footer, legal: "Your licence and insurance details go here." };

  return starter;
}

export const starterContent: SiteContent = buildStarterContent();
