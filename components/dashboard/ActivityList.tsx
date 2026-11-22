import { CreditCard, Images, PenLine, Plus, Rocket, type LucideIcon } from "lucide-react";
import { formatTimeAgo } from "@/lib/format";
import type { ActivityItem, ActivityKind } from "@/lib/types";

// "Recent activity": what the customer did, newest first.

// Record<ActivityKind, LucideIcon> means "an icon for EVERY kind". Add a new
// kind to the type and TypeScript complains here until it gets an icon too.
const icons: Record<ActivityKind, LucideIcon> = {
  edited: PenLine,
  published: Rocket,
  media: Images,
  created: Plus,
  purchased: CreditCard,
};

export default function ActivityList({ items }: { items: ActivityItem[] }) {
  if (items.length === 0) {
    return <p className="text-fg-muted">Nothing yet. Your edits and publishes will show up here.</p>;
  }

  return (
    <ol role="list" className="grid gap-4">
      {items.map((item) => {
        const Icon = icons[item.kind];
        return (
          <li key={item.id} className="flex items-start gap-3">
            <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-raised text-signal">
              <Icon aria-hidden="true" className="size-4" />
            </span>
            <div>
              <p>{item.message}</p>
              {/* <time> carries the exact moment for machines; people read "2 hours ago". */}
              <time dateTime={item.at} className="text-sm text-fg-muted">
                {formatTimeAgo(item.at)}
              </time>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
