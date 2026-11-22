"use client";

import { useCallback } from "react";
import { useParams } from "next/navigation";
import { SearchX } from "lucide-react";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import LoadingState from "@/components/ui/LoadingState";
import EditorShell from "@/components/editor/EditorShell";
import { useLoad } from "@/hooks/useLoad";
import { getWebsite } from "@/lib/data/websites";
import { getTemplateDefinition } from "@/templates/registry";
import { contentMatchesSchema } from "@/templates/validate";

// Fetches the website named in the address, handles loading / error / not
// found, and only then opens the editor. The editor itself can therefore
// assume it always has a website and valid content.
export default function EditorLoader() {
  const { id } = useParams<{ id: string }>();
  const loadWebsite = useCallback(() => getWebsite(id), [id]);
  const { state, reload } = useLoad(loadWebsite);

  const back = (
    <Button href="/dashboard/websites" variant="secondary">
      Back to my websites
    </Button>
  );

  if (state.status === "loading") {
    return (
      <main id="main" className="mx-auto max-w-3xl px-4 py-10">
        <LoadingState label="Opening the editor" />
      </main>
    );
  }

  if (state.status === "error") {
    return (
      <main id="main" className="mx-auto max-w-3xl px-4 py-10">
        <ErrorState title="The editor could not open" message={state.message} onRetry={reload} />
      </main>
    );
  }

  const website = state.data;
  const template = website ? getTemplateDefinition(website.templateId) : undefined;

  if (!website) {
    return (
      <main id="main" className="mx-auto max-w-3xl px-4 py-10">
        <EmptyState icon={SearchX} title="Website not found" description="There is no website with this address in your account." action={back} />
      </main>
    );
  }

  if (!template || !contentMatchesSchema(template.schema, website.draft)) {
    return (
      <main id="main" className="mx-auto max-w-3xl px-4 py-10">
        <EmptyState
          icon={SearchX}
          title="This website cannot be edited"
          description="Its saved content does not match its template. Nothing has been lost, but it needs a fix from MigsFlow."
          action={back}
        />
      </main>
    );
  }

  return <EditorShell website={website} template={template} />;
}
