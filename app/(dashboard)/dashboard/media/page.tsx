import type { Metadata } from "next";
import MediaContent from "@/components/dashboard/MediaContent";
import DemoLabel from "@/components/ui/DemoLabel";
import PageHeader from "@/components/ui/PageHeader";

// "/dashboard/media": the Media Library.
export const metadata: Metadata = { title: "Media library" };

export default function MediaPage() {
  return (
    <>
      <PageHeader
        title="Media library"
        description="Your logos and photos, ready to use on any of your websites."
        actions={<DemoLabel>Kept in this browser only</DemoLabel>}
      />
      <MediaContent />
    </>
  );
}
