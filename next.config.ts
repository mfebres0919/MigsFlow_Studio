import type { NextConfig } from "next";

// Settings for Next.js itself.
const nextConfig: NextConfig = {
  // Both written by create-next-app: pages are prerendered as static HTML
  // wherever possible, and links start loading the next page early.
  cacheComponents: true,
  partialPrefetching: true,
  // Hides the round "N" badge Next.js shows in a corner while developing.
  // It sat on top of the editor's Save draft button. It never appears on a
  // built site; errors still show on screen while developing.
  devIndicators: false,
};

export default nextConfig;
