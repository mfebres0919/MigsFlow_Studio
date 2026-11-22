import { Lora, Manrope, Nunito, Source_Sans_3 } from "next/font/google";

// The font choices a customer can pick from. It is a fixed list, not "any
// font", because fonts are downloaded when Studio is built (next/font), so
// every option must be known in advance. Each choice is a heading font plus a
// body font that are known to look good together.
//
// preload: false means a font is only fetched when a page actually uses it.

const manrope = Manrope({ subsets: ["latin"], preload: false });
const lora = Lora({ subsets: ["latin"], preload: false });
const sourceSans = Source_Sans_3({ subsets: ["latin"], preload: false });
const nunito = Nunito({ subsets: ["latin"], preload: false });

export type FontPair = {
  id: string;
  label: string;
  description: string;
  /** Ready-to-use CSS font-family values. */
  heading: string;
  body: string;
};

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
];

/** Finds a pair by id. An unknown id falls back to the first pair, so a site never loses its fonts. */
export function getFontPair(id: string): FontPair {
  return fontPairs.find((pair) => pair.id === id) ?? fontPairs[0];
}
