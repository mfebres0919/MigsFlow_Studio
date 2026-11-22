import type { Customer } from "@/lib/types";
import { sampleCustomer } from "@/lib/mock/customer";

// The doorway for customer data (see lib/data/README.md).
// Today it hands back the sample customer. In Phase 3 the inside of this
// function changes to ask Supabase "who is signed in?", and nothing that
// calls it has to change.
//
// "async" and "Promise<Customer>" mean: the answer arrives a moment later
// (as it will from a real database), and when it arrives it is a Customer.
export async function getCurrentCustomer(): Promise<Customer> {
  return sampleCustomer;
}
