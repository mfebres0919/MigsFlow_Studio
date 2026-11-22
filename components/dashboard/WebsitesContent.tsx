"use client"; // loads data stored in the browser, so it runs in the browser

import { PanelsTopLeft } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import LoadingState from "@/components/ui/LoadingState";
import WebsiteCard from "@/components/dashboard/WebsiteCard";
import { useLoad } from "@/hooks/useLoad";
import { getTemplates, getWebsites } from "@/lib/data/websites";

// Defined outside the component so it is the same function on every render
// (see hooks/useLoad.ts). Promise.all runs both requests at the same time
// and waits for both.
const loadWebsitesPage = () => Promise.all([getWebsites(), getTemplates()]);

// The body of the My Websites page, in its four states.
export default function WebsitesContent() {
  const { state, reload } = useLoad(loadWebsitesPage);

  if (state.status === "loading") return <LoadingState label="Loading your websites" />;

  if (state.status === "error") {
    return <ErrorState title="Your websites could not be loaded" message={state.message} onRetry={reload} />;
  }

  // From here TypeScript knows the status is "success", so state.data exists.
  const [websites, templates] = state.data;

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
    <ul role="list" className="grid gap-6 md:grid-cols-2">
      {websites.map((website) => (
        // "key" lets React tell the cards apart when the list changes.
        <li key={website.id} className="grid">
          <WebsiteCard
            website={website}
            template={templates.find((template) => template.id === website.templateId)}
          />
        </li>
      ))}
    </ul>
  );
}
