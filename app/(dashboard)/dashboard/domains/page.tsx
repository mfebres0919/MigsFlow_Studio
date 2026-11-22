import type { Metadata } from "next";
import PlannedPage from "@/components/dashboard/PlannedPage";

export const metadata: Metadata = { title: "Domains" };

export default function Page() {
  return (
    <PlannedPage
      title="Domains"
      description="The web address people type to reach your website."
      milestone={6}
    />
  );
}
