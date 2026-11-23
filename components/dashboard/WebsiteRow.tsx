import Button from "@/components/ui/Button";
import WebsiteStatusBadge from "@/components/dashboard/WebsiteStatusBadge";
import WebsiteThumbnail from "@/components/dashboard/WebsiteThumbnail";
import { formatTimeAgo } from "@/lib/format";
import { editHref } from "@/lib/website-status";
import type { Website } from "@/lib/types";

// The compact, one-line version of a website, used on the Overview.
export default function WebsiteRow({ website }: { website: Website }) {
  return (
    <div className="flex flex-wrap items-center gap-4 py-4">
      <div className="w-24 shrink-0">
        <WebsiteThumbnail website={website} />
      </div>
      <div className="min-w-40 flex-1">
        <h3 className="font-semibold">{website.name}</h3>
        <p className="mt-0.5 text-sm text-fg-muted">Edited {formatTimeAgo(website.updatedAt)}</p>
        <div className="mt-2">
          <WebsiteStatusBadge website={website} />
        </div>
      </div>
      <Button href={editHref(website)} variant="secondary" size="sm">
        Edit<span className="sr-only"> {website.name}</span>
      </Button>
    </div>
  );
}
