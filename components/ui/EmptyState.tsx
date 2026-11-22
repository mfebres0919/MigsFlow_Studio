import type { LucideIcon } from "lucide-react";

// Shown when a page or list has nothing in it yet. It says what belongs here
// and, when there is one, offers the next step.

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
};

// "icon: Icon" renames the prop so it can be used as a tag: <Icon />.
export default function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="rounded-panel border border-dashed border-line-strong px-6 py-12 text-center">
      <Icon aria-hidden="true" className="mx-auto size-8 text-signal" />
      <h2 className="mt-4 text-lg font-semibold">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-fg-muted">{description}</p>
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}
