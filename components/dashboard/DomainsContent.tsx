"use client";

import { Globe } from "lucide-react";
import DomainCard from "@/components/dashboard/DomainCard";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import LoadingState from "@/components/ui/LoadingState";
import { useLoad } from "@/hooks/useLoad";
import { getWebsites } from "@/lib/data/websites";

// The body of the Domains page: one card per website, in the usual four states.
export default function DomainsContent() {
  const { state, reload } = useLoad(getWebsites);

  if (state.status === "loading") return <LoadingState label="Loading your domains" />;
  if (state.status === "error") {
    return <ErrorState title="Your domains could not be loaded" message={state.message} onRetry={reload} />;
  }
  if (state.data.length === 0) {
    return <EmptyState icon={Globe} title="No websites yet" description="Once you have a website, its address and domain settings appear here." />;
  }

  return (
    <div className="grid gap-6">
      {state.data.map((website) => (
        // After a change, load the list again so the page shows what was saved.
        <DomainCard key={website.id} website={website} onChange={reload} />
      ))}
    </div>
  );
}
