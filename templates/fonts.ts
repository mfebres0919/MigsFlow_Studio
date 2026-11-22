import localFont from "next/font/local";

// The font choices a customer can pick from: twelve pairs, each a heading
// font plus a body font that are known to look good together. It is a fixed
// list, not "any font", so every choice looks right in every template.
//
// WHERE THE FONTS COME FROM (Miguelle's rule, 2026-11-22): font files are
// downloaded once and kept in this project (templates/font-files/). Nothing
// is ever loaded from Google or any other outside service, when the site is
// built or when someone visits it. next/font/local serves these files from
// our own site.
//
// The files being here also matters later: when a customer's website is
// published or downloaded, the fonts it uses can be copied along with it.
//
// To add a pair: download the .woff2 files (latin, the weights listed below)
// into templates/font-files/, declare the family here, and add an entry to
// fontPairs. A body font needs 400, 600 and 700; a heading-only font needs 700.
//
// preload: false means a font is only fetched when a page actually uses it.

const nunito = localFont({
  src: [
    { path: "./font-files/nunito-v32-latin-regular.woff2", weight: "400", style: "normal" },
    { path: "./font-files/nunito-v32-latin-600.woff2", weight: "600", style: "normal" },
    { path: "./font-files/nunito-v32-latin-700.woff2", weight: "700", style: "normal" },
  ],
  preload: false,
});

const manrope = localFont({
  src: [
    { path: "./font-files/manrope-v23-latin-regular.woff2", weight: "400", style: "normal" },
    { path: "./font-files/manrope-v23-latin-600.woff2", weight: "600", style: "normal" },
    { path: "./font-files/manrope-v23-latin-700.woff2", weight: "700", style: "normal" },
  ],
  preload: false,
});

const lora = localFont({
  src: [
    { path: "./font-files/lora-v37-latin-700.woff2", weight: "700", style: "normal" },
  ],
  preload: false,
});

const sourceSans = localFont({
  src: [
    { path: "./font-files/source-sans-3-v20-latin-regular.woff2", weight: "400", style: "normal" },
    { path: "./font-files/source-sans-3-v20-latin-600.woff2", weight: "600", style: "normal" },
    { path: "./font-files/source-sans-3-v20-latin-700.woff2", weight: "700", style: "normal" },
  ],
  preload: false,
});

const inter = localFont({
  src: [
    { path: "./font-files/inter-v20-latin-regular.woff2", weight: "400", style: "normal" },
    { path: "./font-files/inter-v20-latin-600.woff2", weight: "600", style: "normal" },
    { path: "./font-files/inter-v20-latin-700.woff2", weight: "700", style: "normal" },
  ],
  preload: false,
});

const montserrat = localFont({
  src: [
    { path: "./font-files/montserrat-v31-latin-700.woff2", weight: "700", style: "normal" },
  ],
  preload: false,
});

const openSans = localFont({
  src: [
    { path: "./font-files/open-sans-v44-latin-regular.woff2", weight: "400", style: "normal" },
    { path: "./font-files/open-sans-v44-latin-600.woff2", weight: "600", style: "normal" },
    { path: "./font-files/open-sans-v44-latin-700.woff2", weight: "700", style: "normal" },
  ],
  preload: false,
});

const playfair = localFont({
  src: [
    { path: "./font-files/playfair-display-v40-latin-700.woff2", weight: "700", style: "normal" },
  ],
  preload: false,
});

const lato = localFont({
  src: [
    { path: "./font-files/lato-v25-latin-regular.woff2", weight: "400", style: "normal" },
    { path: "./font-files/lato-v25-latin-700.woff2", weight: "700", style: "normal" },
  ],
  preload: false,
});

const bitter = localFont({
  src: [
    { path: "./font-files/bitter-v42-latin-700.woff2", weight: "700", style: "normal" },
  ],
  preload: false,
});

const poppins = localFont({
  src: [
    { path: "./font-files/poppins-v24-latin-regular.woff2", weight: "400", style: "normal" },
    { path: "./font-files/poppins-v24-latin-600.woff2", weight: "600", style: "normal" },
    { path: "./font-files/poppins-v24-latin-700.woff2", weight: "700", style: "normal" },
  ],
  preload: false,
});

const baskerville = localFont({
  src: [
    { path: "./font-files/libre-baskerville-v24-latin-700.woff2", weight: "700", style: "normal" },
  ],
  preload: false,
});

const karla = localFont({
  src: [
    { path: "./font-files/karla-v33-latin-regular.woff2", weight: "400", style: "normal" },
    { path: "./font-files/karla-v33-latin-600.woff2", weight: "600", style: "normal" },
    { path: "./font-files/karla-v33-latin-700.woff2", weight: "700", style: "normal" },
  ],
  preload: false,
});

const rubik = localFont({
  src: [
    { path: "./font-files/rubik-v31-latin-regular.woff2", weight: "400", style: "normal" },
    { path: "./font-files/rubik-v31-latin-600.woff2", weight: "600", style: "normal" },
    { path: "./font-files/rubik-v31-latin-700.woff2", weight: "700", style: "normal" },
  ],
  preload: false,
});

const jakarta = localFont({
  src: [
    { path: "./font-files/plus-jakarta-sans-v12-latin-regular.woff2", weight: "400", style: "normal" },
    { path: "./font-files/plus-jakarta-sans-v12-latin-600.woff2", weight: "600", style: "normal" },
    { path: "./font-files/plus-jakarta-sans-v12-latin-700.woff2", weight: "700", style: "normal" },
  ],
  preload: false,
});

const robotoSlab = localFont({
  src: [
    { path: "./font-files/roboto-slab-v36-latin-700.woff2", weight: "700", style: "normal" },
  ],
  preload: false,
});

const roboto = localFont({
  src: [
    { path: "./font-files/roboto-v51-latin-regular.woff2", weight: "400", style: "normal" },
    { path: "./font-files/roboto-v51-latin-500.woff2", weight: "500", style: "normal" },
    { path: "./font-files/roboto-v51-latin-700.woff2", weight: "700", style: "normal" },
  ],
  preload: false,
});

export type FontPair = {
  id: string;
  label: string;
  description: string;
  /** Ready-to-use CSS font-family values. */
  heading: string;
  body: string;
};

// The ids are saved inside customers' websites, so never rename one.
export const fontPairs: FontPair[] = [
  {
    id: "friendly",
    label: "Friendly",
    description: "Rounded and approachable (Nunito)",
    heading: nunito.style.fontFamily,
    body: nunito.style.fontFamily,
  },
  {
    id: "modern",
    label: "Modern",
    description: "Crisp and geometric (Manrope)",
    heading: manrope.style.fontFamily,
    body: manrope.style.fontFamily,
  },
  {
    id: "classic",
    label: "Classic",
    description: "Elegant headings, easy-reading text (Lora with Source Sans)",
    heading: lora.style.fontFamily,
    body: sourceSans.style.fontFamily,
  },
  {
    id: "clean",
    label: "Clean",
    description: "Neutral and very readable (Inter)",
    heading: inter.style.fontFamily,
    body: inter.style.fontFamily,
  },
  {
    id: "confident",
    label: "Confident",
    description: "Strong headings, plain text (Montserrat with Open Sans)",
    heading: montserrat.style.fontFamily,
    body: openSans.style.fontFamily,
  },
  {
    id: "elegant",
    label: "Elegant",
    description: "Refined, high-contrast headings (Playfair Display with Lato)",
    heading: playfair.style.fontFamily,
    body: lato.style.fontFamily,
  },
  {
    id: "warm",
    label: "Warm",
    description: "Sturdy, friendly serif headings (Bitter with Source Sans)",
    heading: bitter.style.fontFamily,
    body: sourceSans.style.fontFamily,
  },
  {
    id: "geometric",
    label: "Geometric",
    description: "Round and even (Poppins)",
    heading: poppins.style.fontFamily,
    body: poppins.style.fontFamily,
  },
  {
    id: "editorial",
    label: "Editorial",
    description: "Bookish headings, relaxed text (Libre Baskerville with Karla)",
    heading: baskerville.style.fontFamily,
    body: karla.style.fontFamily,
  },
  {
    id: "sturdy",
    label: "Sturdy",
    description: "Soft corners, solid feel (Rubik)",
    heading: rubik.style.fontFamily,
    body: rubik.style.fontFamily,
  },
  {
    id: "fresh",
    label: "Fresh",
    description: "Light and contemporary (Plus Jakarta Sans)",
    heading: jakarta.style.fontFamily,
    body: jakarta.style.fontFamily,
  },
  {
    id: "trusted",
    label: "Trusted",
    description: "Dependable slab headings (Roboto Slab with Roboto)",
    heading: robotoSlab.style.fontFamily,
    body: roboto.style.fontFamily,
  },
];

/** Finds a pair by id. An unknown id falls back to the first pair, so a site never loses its fonts. */
export function getFontPair(id: string): FontPair {
  return fontPairs.find((pair) => pair.id === id) ?? fontPairs[0];
}
