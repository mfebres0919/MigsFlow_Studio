// Protects the design from unreadable color choices. A customer may pick any
// brand color, including pale yellow. These helpers work out which text
// color is readable on it, using the same contrast formula as WCAG.

const DARK_TEXT = "#0f172a";
const LIGHT_TEXT = "#ffffff";

/** True for a full hex color like "#12806f". */
export function isHexColor(value: string): boolean {
  return /^#[0-9a-f]{6}$/i.test(value);
}

/** Returns the color if it is valid, otherwise the fallback. */
export function safeHex(value: string, fallback: string): string {
  return isHexColor(value) ? value : fallback;
}

function channels(hex: string): [number, number, number] {
  return [1, 3, 5].map((start) => parseInt(hex.slice(start, start + 2), 16)) as [number, number, number];
}

/** How bright a color is, from 0 (black) to 1 (white), the way WCAG measures it. */
function luminance(hex: string): number {
  const [r, g, b] = channels(hex).map((value) => {
    const share = value / 255;
    return share <= 0.03928 ? share / 12.92 : ((share + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Contrast between two colors, from 1 (identical) to 21 (black on white). 4.5 is the minimum for text. */
export function contrast(a: string, b: string): number {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

/** The text color (dark or white) that reads best on this background. */
export function textOn(background: string): string {
  return contrast(background, DARK_TEXT) >= contrast(background, LIGHT_TEXT) ? DARK_TEXT : LIGHT_TEXT;
}

/**
 * The brand color, darkened only as far as needed to be readable as text on
 * white. A dark brand color comes back unchanged.
 */
export function readableOnWhite(brand: string): string {
  let [r, g, b] = channels(brand);
  let hex = brand;
  // Step toward black 6% at a time until the text passes 4.5:1.
  for (let step = 0; step < 40 && contrast(hex, LIGHT_TEXT) < 4.5; step += 1) {
    [r, g, b] = [r, g, b].map((value) => Math.round(value * 0.94));
    hex = `#${[r, g, b].map((value) => value.toString(16).padStart(2, "0")).join("")}`;
  }
  return hex;
}
