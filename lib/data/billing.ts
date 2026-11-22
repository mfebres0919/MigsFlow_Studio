import type { Purchase } from "@/lib/types";
import { pause, readDemoData } from "@/lib/data/store";

// The doorway for purchases. SAMPLE DATA: nothing was really bought and no
// payment exists. Phase 4 reads these from Stripe-verified records instead.

/** The customer's template purchases, newest first. */
export async function getPurchases(): Promise<Purchase[]> {
  await pause();
  const { purchases } = readDemoData();
  return [...purchases].sort((a, b) => b.purchasedAt.localeCompare(a.purchasedAt));
}
