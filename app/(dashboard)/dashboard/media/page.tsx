import type { Metadata } from "next";
import PlannedPage from "@/components/dashboard/PlannedPage";

export const metadata: Metadata = { title: "Media library" };

export default function Page() {
  return (
    <PlannedPage
      title="Media library"
      description="Your logos and photos, ready to use on any of your websites."
      milestone={6}
    />
  );
}
