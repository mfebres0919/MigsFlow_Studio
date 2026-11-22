import { Hammer } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";

// TEMPORARY. A stand-in for a dashboard page that has not been built yet, so
// the menu works while the prototype grows. Each use is replaced by the real
// page in its milestone, and this file is deleted when none are left.

type PlannedPageProps = {
  title: string;
  description: string;
  milestone: number;
};

export default function PlannedPage({ title, description, milestone }: PlannedPageProps) {
  return (
    <>
      <PageHeader title={title} description={description} />
      <EmptyState
        icon={Hammer}
        title="Not built yet"
        description={`This page is part of Milestone ${milestone}. The menu, layout and components around it are what Milestone 2 delivers.`}
      />
    </>
  );
}
