import type { Metadata } from "next";
import OverviewContent from "@/components/dashboard/OverviewContent";
import PageHeader from "@/components/ui/PageHeader";
import { getCurrentCustomer } from "@/lib/data/customer";
import { firstName } from "@/lib/format";

// "/dashboard": the Overview page.
//
// Like every page, it is split in two:
// - this file runs on the server: it sets the page title and draws the heading;
// - OverviewContent ("use client") runs in the browser and loads the data.
export const metadata: Metadata = { title: "Overview" };

export default async function OverviewPage() {
  const customer = await getCurrentCustomer();

  return (
    <>
      <PageHeader
        title={`Welcome back, ${firstName(customer.name)}`}
        description="Here is where your websites stand and what to do next."
      />
      <OverviewContent />
    </>
  );
}
