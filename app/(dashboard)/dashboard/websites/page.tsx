import type { Metadata } from "next";
import WebsitesContent from "@/components/dashboard/WebsitesContent";
import PageHeader from "@/components/ui/PageHeader";

// "/dashboard/websites": every website the customer owns.
export const metadata: Metadata = { title: "My websites" };

export default function WebsitesPage() {
  return (
    <>
      <PageHeader
        title="My websites"
        description="Every website you own. Edit one, preview it, or check whether it is live."
      />
      <WebsitesContent />
    </>
  );
}
