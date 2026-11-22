import type { Metadata } from "next";
import BillingContent from "@/components/dashboard/BillingContent";
import DemoLabel from "@/components/ui/DemoLabel";
import PageHeader from "@/components/ui/PageHeader";

// "/dashboard/billing": purchases, subscription, payments and invoices.
export const metadata: Metadata = { title: "Billing" };

export default function BillingPage() {
  return (
    <>
      <PageHeader
        title="Billing"
        description="Your purchases, payments and invoices."
        actions={<DemoLabel>Sample purchases and prices</DemoLabel>}
      />
      <BillingContent />
    </>
  );
}
