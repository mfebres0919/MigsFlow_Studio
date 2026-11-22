import { buildSeed, type DemoData } from "@/lib/mock/seed";

// The prototype's stand-in for a database: the demo data lives in the
// browser's localStorage, so it survives a reload and (from Milestone 5) so
// do your edits. It never leaves this browser.
//
// Only the files in lib/data/ use this. In Phase 3 this file is deleted and
// those files talk to Supabase instead.

const STORAGE_KEY = "migsflow-studio:demo:v4"; // bump the number if the data shape changes

// Data saved by an earlier version of the prototype may lack things that
// were added later. This fills those in, so nobody's saved edits are lost
// when a new kind of data is introduced.
function withNewerFields(saved: Partial<DemoData>): DemoData {
  const fresh = buildSeed(new Date());
  return {
    websites: (saved.websites ?? fresh.websites).map((website) => ({
      ...website,
      domainStatus: website.domainStatus ?? (website.customDomain ? "pending" : "none"),
    })),
    activity: saved.activity ?? fresh.activity,
    deployments: saved.deployments ?? fresh.deployments,
    purchases: saved.purchases ?? fresh.purchases,
  };
}

/** Reads the demo data, creating it from the sample seed on the first visit. */
export function readDemoData(): DemoData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return withNewerFields(JSON.parse(saved) as Partial<DemoData>);
  } catch {
    // Storage blocked or the saved text is damaged: fall through and start fresh.
  }

  const seed = buildSeed(new Date());
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  } catch {
    // Storage blocked (for example a private window). The demo still works, it just won't remember.
  }
  return seed;
}

/** Saves the demo data. Throws if the browser will not store it, so the caller can tell the customer. */
export function writeDemoData(data: DemoData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    throw new Error("Your browser's storage is full or switched off, so this could not be saved.");
  }
}

/** A short pause that imitates waiting for a real server, so loading states are visible and tested. */
export function pause(ms = 250): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
