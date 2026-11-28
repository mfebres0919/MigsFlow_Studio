import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Builds /robots.txt, the file that tells search engines what they may read.
// (In a plain HTML site this was a robots.txt file written by hand.)
//
// While Studio is a prototype (site.indexable is false), search engines are
// asked to stay out of all of it. At launch they may read the public pages,
// but never the dashboard, the editor or the previews.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: site.indexable
      ? { userAgent: "*", allow: "/", disallow: ["/dashboard", "/preview"] }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
