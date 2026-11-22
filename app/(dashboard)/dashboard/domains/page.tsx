import type { Metadata } from "next";
import DomainsContent from "@/components/dashboard/DomainsContent";
import DemoLabel from "@/components/ui/DemoLabel";
import PageHeader from "@/components/ui/PageHeader";

// "/dashboard/domains": each website's address and the customer's own domain.
export const metadata: Metadata = { title: "Domains" };

export default function DomainsPage() {
  return (
    <>
      <PageHeader
        title="Domains"
        description="The web address people type to reach your website. Every website gets a free one, and you can connect your own."
        actions={<DemoLabel>Simulated: no real domain is checked</DemoLabel>}
      />
      <DomainsContent />
    </>
  );
}
