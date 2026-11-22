import { CircleCheck, PenLine, Rocket } from "lucide-react";
import Button from "@/components/ui/Button";
import { editHref } from "@/lib/website-status";
import type { Website } from "@/lib/types";

// The one thing the customer should probably do next, worked out from their
// websites. It is the loudest element on the Overview on purpose: a business
// owner should not have to read a dashboard to know what needs attention.

export default function NextStep({ websites }: { websites: Website[] }) {
  // find() returns the first match, or undefined when there is none.
  const waiting = websites.find((site) => site.status === "published" && site.hasUnpublishedChanges);
  const draft = websites.find((site) => site.status === "draft");

  let icon = CircleCheck;
  let title = "Everything is published";
  let text = "Your live websites match your latest edits. Nothing needs your attention.";
  let action: React.ReactNode = null;

  if (waiting) {
    icon = Rocket;
    title = `${waiting.name} has changes that are not live yet`;
    text = "Visitors still see the last version you published. Publish when you are happy with your edits.";
    action = <Button href="/dashboard/publishing">Review and publish</Button>;
  } else if (draft) {
    icon = PenLine;
    title = `${draft.name} is still a draft`;
    text = "Nobody can see it yet. Finish your edits, then publish it.";
    action = <Button href={editHref(draft)}>Continue editing</Button>;
  }

  const Icon = icon;

  return (
    <section
      aria-labelledby="next-step-title"
      className="relative overflow-hidden rounded-panel border border-line bg-raised p-5 pl-7 before:absolute before:inset-y-0 before:left-0 before:w-1.5 before:bg-linear-to-b before:from-signal before:to-accent sm:p-6 sm:pl-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-5">
        <div className="flex max-w-2xl items-start gap-4">
          <Icon aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-signal" />
          <div>
            <h2 id="next-step-title" className="text-lg font-semibold">
              {title}
            </h2>
            <p className="mt-1 text-fg-muted">{text}</p>
          </div>
        </div>
        {action}
      </div>
    </section>
  );
}
