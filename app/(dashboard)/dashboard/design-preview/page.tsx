import type { Metadata } from "next";
import { Images } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import DemoLabel from "@/components/ui/DemoLabel";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";

// TEMPORARY review page: every shared component in one place, so the look can
// be approved before real pages are built with them. Not in the menu. Removed
// in Milestone 7.
export const metadata: Metadata = { title: "Design preview" };

export default function DesignPreviewPage() {
  return (
    <>
      <PageHeader
        title="Design preview"
        description="Every shared building block in one place. Real pages are assembled from these."
        actions={
          <>
            <Button variant="secondary">Preview website</Button>
            <Button>Publish</Button>
          </>
        }
      />

      <div className="grid gap-6">
        <Card title="Buttons" description="One loud button per screen; the rest stay quiet.">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Save draft</Button>
            <Button variant="secondary">Preview website</Button>
            <Button variant="ghost">Cancel</Button>
            <Button variant="danger">Delete image</Button>
            <Button disabled>Publishing</Button>
            <Button size="sm" variant="secondary">
              Small button
            </Button>
          </div>
        </Card>

        <Card title="Status badges" description="The word carries the meaning; the color backs it up.">
          <div className="flex flex-wrap items-center gap-3">
            <Badge>Draft</Badge>
            <Badge tone="success">Published</Badge>
            <Badge tone="info">Unpublished changes</Badge>
            <Badge tone="warning">Waiting for DNS</Badge>
            <Badge tone="danger">Publish failed</Badge>
            <DemoLabel>Simulated</DemoLabel>
          </div>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card
            title="A card with an action"
            action={
              <Button size="sm" variant="secondary" href="/dashboard/websites">
                View all
              </Button>
            }
          >
            <p className="text-fg-muted">
              Cards group related content. Main text is near-white and supporting text like this is
              a softer blue-grey, both readable on the dark panels.
            </p>
          </Card>
          <Card title="Text and links">
            <p>
              Body text is Poppins at 16px.{" "}
              <a href="#top" className="text-signal underline underline-offset-4">
                Links are cyan and underlined
              </a>
              , so they are never marked by color alone.
            </p>
          </Card>
        </div>

        <EmptyState
          icon={Images}
          title="No images yet"
          description="Upload your logo and photos here, then use them on any of your websites."
          action={<Button>Upload images</Button>}
        />
      </div>
    </>
  );
}
