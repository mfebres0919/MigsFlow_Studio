"use client"; // loads data stored in the browser, so it runs in the browser

import { PanelsTopLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import DemoLabel from "@/components/ui/DemoLabel";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import LoadingState from "@/components/ui/LoadingState";
import SplitColumns from "@/components/ui/SplitColumns";
import ActivityList from "@/components/dashboard/ActivityList";
import NextStep from "@/components/dashboard/NextStep";
import QuickActions from "@/components/dashboard/QuickActions";
import WebsiteRow from "@/components/dashboard/WebsiteRow";
import { useLoad } from "@/hooks/useLoad";
import { getRecentActivity } from "@/lib/data/activity";
import { getWebsites } from "@/lib/data/websites";

// Defined outside the component so it is the same function on every render.
const loadOverview = () => Promise.all([getWebsites(), getRecentActivity()]);

// The body of the Overview page, in its four states.
export default function OverviewContent() {
  const { state, reload } = useLoad(loadOverview);

  if (state.status === "loading") return <LoadingState label="Loading your overview" />;

  if (state.status === "error") {
    return <ErrorState title="Your overview could not be loaded" message={state.message} onRetry={reload} />;
  }

  const [websites, activity] = state.data;

  if (websites.length === 0) {
    return (
      <EmptyState
        icon={PanelsTopLeft}
        title="You have no websites yet"
        description="When you buy a template it appears here, ready to edit. The template marketplace is coming in a later phase."
      />
    );
  }

  return (
    <div className="grid gap-6">
      <NextStep websites={websites} />

      {/* Left: the websites, then the shortcuts. Right: recent activity. Putting
          the shortcuts under the websites keeps the two columns close to the
          same height, so there is no empty gap beside the activity list. */}
      <SplitColumns
        main={
          <>
            <Card
              title="Your websites"
              action={
                <Button href="/dashboard/websites" variant="ghost" size="sm">
                  View all
                </Button>
              }
            >
              <ul role="list" className="-my-4 divide-y divide-line">
                {websites.map((website) => (
                  <li key={website.id}>
                    <WebsiteRow website={website} />
                  </li>
                ))}
              </ul>
            </Card>
            <Card title="Quick actions">
              <QuickActions />
            </Card>
          </>
        }
        side={
          <Card title="Recent activity" action={<DemoLabel>Sample activity</DemoLabel>}>
            <ActivityList items={activity} />
          </Card>
        }
      />
    </div>
  );
}
