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
  // Do not announce which software runs the site.
  poweredByHeader: false,
  // The year the site was built, for the footer (see components/marketing/CurrentYear.tsx).
  env: { NEXT_PUBLIC_BUILD_YEAR: String(new Date().getFullYear()) },
  // Basic safety instructions sent to the browser with every page.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Do not guess a file's type from its contents.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Share only the site's address, not the full page address, with other sites.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Only this site may show its pages inside a frame. The editor's
          // live preview is a frame of this same site, so it still works.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // The app never needs the camera, microphone or location.
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
