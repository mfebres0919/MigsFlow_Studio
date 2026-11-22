import type { Metadata } from "next";
import PublishingContent from "@/components/dashboard/PublishingContent";
import DemoLabel from "@/components/ui/DemoLabel";
import PageHeader from "@/components/ui/PageHeader";

// "/dashboard/publishing": whether each website is live, and its publishing history.
export const metadata: Metadata = { title: "Hosting & publishing" };

export default function PublishingPage() {
  return (
    <>
      <PageHeader
        title="Hosting & publishing"
        description="Whether each website is live, where, and every time you published it."
        actions={<DemoLabel>Simulated: nothing goes online</DemoLabel>}
      />
      <PublishingContent />
    </>
  );
}
