import type { Metadata } from "next";
import PlannedPage from "@/components/dashboard/PlannedPage";

export const metadata: Metadata = { title: "Hosting & publishing" };

export default function Page() {
  return (
    <PlannedPage
      title="Hosting & publishing"
      description="Whether your website is live, and a history of each time you published."
      milestone={6}
    />
  );
}
