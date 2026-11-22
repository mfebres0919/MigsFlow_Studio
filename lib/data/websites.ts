import type { ActivityItem, Template, Website } from "@/lib/types";
import type { SiteContent } from "@/templates/types";
import { templates } from "@/lib/mock/templates";
import { pause, readDemoData, writeDemoData } from "@/lib/data/store";

// The doorway for websites and templates (see lib/data/README.md).
// These run in the browser, because the demo data lives in localStorage.

/** Every website the signed-in customer owns, most recently edited first. */
export async function getWebsites(): Promise<Website[]> {
  await pause();
  const { websites } = readDemoData();
  // [...websites] copies the list first, because sort() rearranges the list it is given.
  return [...websites].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

/** One website by its id, or null when the customer has no website with that id. */
export async function getWebsite(id: string): Promise<Website | null> {
  await pause();
  const { websites } = readDemoData();
  // "?? null" turns find()'s "undefined" (nothing found) into an explicit null.
  return websites.find((website) => website.id === id) ?? null;
}

export async function getTemplates(): Promise<Template[]> {
  return templates;
}

/* ---------- Saving and publishing ---------- */

const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

// The website's name and thumbnail color follow its content. Every template
// keeps these two values in the same place: site.business.name and site.brand.color.
function summaryFrom(content: SiteContent, fallback: Website): Pick<Website, "name" | "brandColor"> {
  const name = content.site.business?.name;
  const color = content.site.brand?.color;
  return {
    name: typeof name === "string" && name.trim() ? name : fallback.name,
    brandColor: typeof color === "string" ? color : fallback.brandColor,
  };
}

// Adds a line to "Recent activity". Saving many times in a row updates one line instead of adding ten.
function withActivity(activity: ActivityItem[], item: Omit<ActivityItem, "id">): ActivityItem[] {
  const [latest, ...rest] = activity;
  if (latest && latest.kind === item.kind && latest.websiteId === item.websiteId) {
    return [{ ...latest, message: item.message, at: item.at }, ...rest];
  }
  return [{ ...item, id: `act_${Date.now()}` }, ...activity].slice(0, 20);
}

function changeWebsite(id: string, change: (website: Website, now: string) => { website: Website; activity: Omit<ActivityItem, "id" | "at"> }): Website {
  const data = readDemoData();
  const current = data.websites.find((website) => website.id === id);
  if (!current) throw new Error("This website no longer exists.");

  const now = new Date().toISOString();
  const { website, activity } = change(current, now);
  writeDemoData({
    websites: data.websites.map((item) => (item.id === id ? website : item)),
    activity: withActivity(data.activity, { ...activity, at: now }),
  });
  return website;
}

/**
 * Saves the customer's edits as the draft. The published copy is NOT touched:
 * visitors keep seeing the last published version until Publish is pressed.
 */
export async function saveDraft(id: string, draft: SiteContent): Promise<Website> {
  await pause();
  return changeWebsite(id, (current, now) => {
    const summary = summaryFrom(draft, current);
    return {
      website: {
        ...current,
        ...summary,
        draft,
        updatedAt: now,
        hasUnpublishedChanges: current.status === "published" && !same(draft, current.published),
      },
      activity: { kind: "edited", message: `You edited ${summary.name}.`, websiteId: id },
    };
  });
}

/**
 * SIMULATED. Copies the draft over the published copy and marks the website
 * as live. In this prototype nothing is put online; Phase 5 replaces the
 * inside of this function with the real publishing steps.
 */
export async function publishWebsite(id: string): Promise<Website> {
  await pause(600);
  return changeWebsite(id, (current, now) => ({
    website: {
      ...current,
      published: structuredClone(current.draft), // its own copy, so later draft edits cannot leak into it
      status: "published",
      hasUnpublishedChanges: false,
      publishedAt: now,
    },
    activity: { kind: "published", message: `You published ${current.name}.`, websiteId: id },
  }));
}
