import type { Deployment } from "@/lib/types";
import { pause, readDemoData } from "@/lib/data/store";

/** Every time the customer's websites were published, newest first. */
export async function getDeployments(): Promise<Deployment[]> {
  await pause();
  const { deployments } = readDemoData();
  return [...deployments].sort((a, b) => b.at.localeCompare(a.at));
}
