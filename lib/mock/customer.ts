import type { Customer } from "@/lib/types";

// SAMPLE DATA. This person and business are made up for the prototype, and
// the dashboard labels them "Sample account" on screen. Phase 3 replaces this
// file with the real signed-in customer from Supabase.
export const sampleCustomer: Customer = {
  id: "cus_sample_01",
  name: "Dana Whitfield",
  email: "dana@brightside-cleaning.example", // ".example" addresses can never be real
  businessName: "Brightside Cleaning Co.",
};
