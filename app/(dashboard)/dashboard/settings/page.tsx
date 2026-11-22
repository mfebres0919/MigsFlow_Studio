import type { Metadata } from "next";
import SettingsContent from "@/components/dashboard/SettingsContent";
import DemoLabel from "@/components/ui/DemoLabel";
import PageHeader from "@/components/ui/PageHeader";
import { getCurrentCustomer } from "@/lib/data/customer";

// "/dashboard/settings": the customer's own details and how they sign in.
// This page fetches the customer on the server and hands it to the forms.
export const metadata: Metadata = { title: "Account settings" };

export default async function SettingsPage() {
  const customer = await getCurrentCustomer();

  return (
    <>
      <PageHeader
        title="Account settings"
        description="Your personal details, business details and how you sign in."
        actions={<DemoLabel>Sample account</DemoLabel>}
      />
      <SettingsContent customer={customer} />
    </>
  );
}
