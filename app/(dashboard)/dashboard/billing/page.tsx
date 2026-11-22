import type { Metadata } from "next";
import PlannedPage from "@/components/dashboard/PlannedPage";

export const metadata: Metadata = { title: "Billing" };

export default function Page() {
  return (
    <PlannedPage
      title="Billing"
      description="Your purchases, payments and invoices."
      milestone={6}
    />
  );
}
