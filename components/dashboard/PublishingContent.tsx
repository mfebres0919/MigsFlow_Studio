"use client";

import { Rocket } from "lucide-react";
import PublishingCard from "@/components/dashboard/PublishingCard";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import LoadingState from "@/components/ui/LoadingState";
import { useLoad } from "@/hooks/useLoad";
import { getDeployments } from "@/lib/data/publishing";
import { getWebsites } from "@/lib/data/websites";

const loadPublishing = () => Promise.all([getWebsites(), getDeployments()]);

// The body of the Hosting & publishing page: one card per website.
export default function PublishingContent() {
  const { state, reload } = useLoad(loadPublishing);

  if (state.status === "loading") return <LoadingState label="Loading your publishing details" />;
  if (state.status === "error") {
    return <ErrorState title="Your publishing details could not be loaded" message={state.message} onRetry={reload} />;
  }

  const [websites, deployments] = state.data;

  if (websites.length === 0) {
    return <EmptyState icon={Rocket} title="No websites yet" description="Once you have a website, you can publish it from here." />;
  }

  return (
    <div className="grid gap-6">
      {websites.map((website) => (
        <PublishingCard
          key={website.id}
          website={website}
          deployments={deployments.filter((deployment) => deployment.websiteId === website.id)}
          onChange={reload}
        />
      ))}
    </div>
  );
}
