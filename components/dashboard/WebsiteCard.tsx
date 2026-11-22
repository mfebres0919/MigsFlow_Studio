import Button from "@/components/ui/Button";
import WebsiteStatusBadge from "@/components/dashboard/WebsiteStatusBadge";
import WebsiteThumbnail from "@/components/dashboard/WebsiteThumbnail";
import { formatDate, formatTimeAgo } from "@/lib/format";
import { editHref, previewHref } from "@/lib/website-status";
import type { Template, Website } from "@/lib/types";

// One website on the My Websites page: picture, name, status, facts, actions.

type WebsiteCardProps = {
  website: Website;
  /** The template it was made from. "| undefined" because a lookup can come back empty. */
  template: Template | undefined;
};

export default function WebsiteCard({ website, template }: WebsiteCardProps) {
  return (
    <article className="flex flex-col gap-5 rounded-panel border border-line bg-panel p-5">
      <WebsiteThumbnail brandColor={website.brandColor} />

      <div className="flex flex-wrap items-start justify-between gap-2">
        <h2 className="text-lg font-semibold">{website.name}</h2>
        <WebsiteStatusBadge website={website} />
      </div>

      {/* <dl> is a "description list": pairs of a label (<dt>) and its value (<dd>). */}
      <dl className="grid gap-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-fg-muted">Template</dt>
          <dd>{template ? template.name : "Unknown template"}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-fg-muted">Address</dt>
          <dd className="text-right break-all">{website.customDomain ?? website.address}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-fg-muted">Last edited</dt>
          <dd>{formatTimeAgo(website.updatedAt)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-fg-muted">Last published</dt>
          <dd>{website.publishedAt ? formatDate(website.publishedAt) : "Not published yet"}</dd>
        </div>
      </dl>

      {/* mt-auto pushes the buttons to the bottom, so cards in a row line up. */}
      <div className="mt-auto flex flex-wrap gap-3">
        <Button href={editHref(website)}>Edit website</Button>
        <Button href={previewHref(website)} variant="secondary">
          Preview
        </Button>
      </div>
    </article>
  );
}
