// Facts about MigsFlow Studio itself, written once and read everywhere.
// "MigsFlow Studio" is a working name: change it here and it changes on every page.

/** The product's domain (bought by Miguelle, 2026-11-28). */
const productionUrl = "https://migsflow.studio";

/**
 * The site's full address, used for canonical tags, the sitemap and the link
 * preview image (handbook Section 12).
 *
 * Always the real domain, except on a Netlify preview: there Netlify tells
 * the build its own address (DEPLOY_PRIME_URL), so the preview image loads
 * on that preview. Previews are never listed by search engines, so their
 * canonicals don't matter.
 */
const isPreview = process.env.CONTEXT !== undefined && process.env.CONTEXT !== "production";
const url = (isPreview && process.env.DEPLOY_PRIME_URL) || productionUrl;

export const site = {
  name: "MigsFlow Studio",
  url,
  /**
   * May search engines list the public pages? Not yet: Studio is a
   * prototype. Turning this on (at launch) lets them in to the public pages
   * only; the dashboard, editor and previews stay out either way.
   */
  indexable: false,
};
