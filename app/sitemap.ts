import type { MetadataRoute } from "next";
import { getTemplates } from "@/lib/data/templates";
import { industries } from "@/lib/industries";
import { site } from "@/lib/site";

// Builds /sitemap.xml: the list of public pages for search engines
// (handbook Section 12). Add a public page here in the same change that
// creates it. Template and industry pages are added from the data, so a new
// template appears here by itself.
//
// Left out on purpose: Log in and Create an account (they are "noindex"), and
// everything behind the dashboard, the editor and the previews.

const pages = ["", "/templates", "/pricing"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const templates = await getTemplates();
  const paths = [
    ...pages,
    ...industries.map((industry) => `/templates/industry/${industry.slug}`),
    ...templates.map((template) => `/templates/${template.id}`),
  ];
  return paths.map((path) => ({ url: `${site.url}${path}`, changeFrequency: "monthly" }));
}
