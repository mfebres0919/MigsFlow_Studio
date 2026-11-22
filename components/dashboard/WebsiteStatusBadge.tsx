import Badge from "@/components/ui/Badge";
import { websiteStatusDisplay } from "@/lib/website-status";
import type { Website } from "@/lib/types";

// The Draft / Unpublished changes / Published pill for one website.
export default function WebsiteStatusBadge({ website }: { website: Website }) {
  const { label, tone } = websiteStatusDisplay(website);
  return <Badge tone={tone}>{label}</Badge>;
}
