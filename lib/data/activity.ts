import type { ActivityItem } from "@/lib/types";
import { pause, readDemoData } from "@/lib/data/store";

/** The customer's most recent actions, newest first. */
export async function getRecentActivity(limit = 5): Promise<ActivityItem[]> {
  await pause();
  const { activity } = readDemoData();
  return [...activity].sort((a, b) => b.at.localeCompare(a.at)).slice(0, limit);
}
