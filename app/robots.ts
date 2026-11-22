import type { MetadataRoute } from "next";

// Builds /robots.txt, the file that tells search engines what they may read.
// (In a plain HTML site this was a robots.txt file written by hand.)
//
// MigsFlow Studio is a prototype, so search engines are asked to stay out of
// all of it. When the public marketplace is built (Phase 2) this changes to
// allow the public pages and keep the dashboard, editor and previews out.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
