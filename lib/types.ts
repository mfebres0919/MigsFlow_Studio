// The "shapes" of the app's data. A type is a written promise about what an
// object contains. If code tries to read customer.phone and Customer has no
// "phone", the editor underlines it before the app ever runs. Plain
// JavaScript would only fail later, in the browser.
//
// These shapes are also the first draft of the Phase 3 database tables.

import type { SiteContent } from "@/templates/types";

export type Customer = {
  id: string;
  name: string;
  email: string;
  businessName: string;
};

// A "union" type: the value must be exactly one of these words. A typo such
// as "cleanning" is caught immediately.
export type Industry = "cleaning" | "nonprofit" | "moving";

/** A design a customer can buy. The design itself is built in Milestone 4. */
export type Template = {
  id: string;
  name: string;
  industry: Industry;
  description: string;
};

/** "draft" = never been published. "published" = a version is live. */
export type WebsiteStatus = "draft" | "published";

/** One website a customer owns: a template plus their own content. */
export type Website = {
  id: string;
  name: string;
  templateId: string;
  status: WebsiteStatus;
  /** True when the draft has edits that the live version does not. */
  hasUnpublishedChanges: boolean;
  /** The free address every site gets. The real domain is not decided yet. */
  address: string;
  /** The customer's own domain, or null if none is connected. */
  customDomain: string | null;
  /** The site's main brand color, used to tint its thumbnail. */
  brandColor: string;
  /** The working copy the customer edits. Changing it never changes the live site. */
  draft: SiteContent;
  /** The copy visitors see: a snapshot of the draft taken at the last publish. null until then. */
  published: SiteContent | null;
  /** Dates are ISO text, e.g. "2026-11-22T15:04:00.000Z". */
  updatedAt: string;
  publishedAt: string | null;
};

export type ActivityKind = "edited" | "published" | "media" | "created" | "purchased";

/** One line in "Recent activity". */
export type ActivityItem = {
  id: string;
  kind: ActivityKind;
  message: string;
  /** Which website it was about, when there is one. */
  websiteId: string | null;
  at: string;
};

/** A picture the customer uploaded. The picture data itself is stored separately (lib/data/media.ts). */
export type MediaItem = {
  id: string;
  /** The file's original name, e.g. "kitchen-after.jpg". */
  name: string;
  /** The kind of picture, e.g. "image/jpeg". */
  type: string;
  width: number;
  height: number;
  /** Size in bytes after shrinking. */
  size: number;
  createdAt: string;
};
