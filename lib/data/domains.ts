import type { Website } from "@/lib/types";
import { pause } from "@/lib/data/store";
import { updateStoredWebsite } from "@/lib/data/websites";

// The doorway for custom domains. EVERYTHING HERE IS SIMULATED: no real
// domain is looked up and no DNS is checked. Phase 5 replaces the inside of
// these functions with calls to the hosting provider.

/** Adds the customer's own domain to a website. It starts as "pending" until its DNS is checked. */
export async function addCustomDomain(websiteId: string, domain: string): Promise<Website> {
  await pause();
  return updateStoredWebsite(websiteId, (website) => ({ ...website, customDomain: domain, domainStatus: "pending" }));
}

/**
 * SIMULATED. Pretends to check the domain's DNS records and always finds
 * them correct. The real check can also fail, and the page will need to say why.
 */
export async function checkCustomDomain(websiteId: string): Promise<Website> {
  await pause(900);
  return updateStoredWebsite(websiteId, (website) => ({ ...website, domainStatus: "connected" }));
}

/** Disconnects the customer's own domain. The website keeps its free address. */
export async function removeCustomDomain(websiteId: string): Promise<Website> {
  await pause();
  return updateStoredWebsite(websiteId, (website) => ({ ...website, customDomain: null, domainStatus: "none" }));
}
