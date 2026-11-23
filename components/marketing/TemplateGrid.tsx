import { LayoutTemplate } from "lucide-react";
import TemplateCard from "@/components/marketing/TemplateCard";
import EmptyState from "@/components/ui/EmptyState";
import type { Template } from "@/lib/types";

// The grid of template cards, or a message when there are none to show.

type TemplateGridProps = {
  templates: Template[];
  /** What to say when the list is empty. */
  emptyTitle: string;
  emptyText: string;
};

export default function TemplateGrid({ templates, emptyTitle, emptyText }: TemplateGridProps) {
  if (templates.length === 0) {
    return <EmptyState icon={LayoutTemplate} title={emptyTitle} description={emptyText} />;
  }

  return (
    <ul role="list" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {templates.map((template, index) => (
        <li key={template.id}>
          <TemplateCard template={template} first={index === 0} />
        </li>
      ))}
    </ul>
  );
}
