"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import WebsiteStatusBadge from "@/components/dashboard/WebsiteStatusBadge";
import PublishDialog from "@/components/editor/PublishDialog";
import { publishWebsite } from "@/lib/data/websites";
import { formatDate, formatTimeAgo } from "@/lib/format";
import type { Deployment, Website } from "@/lib/types";
import { editHref } from "@/lib/website-status";
import { findPublishIssues } from "@/templates/publish-checks";
import { getTemplateDefinition } from "@/templates/registry";

// Hosting and publishing for one website: whether it is live, where, when it
// was last published, and every publish so far. It can also publish, using
// the same checks as the editor.

type PublishingCardProps = {
  website: Website;
  deployments: Deployment[];
  onChange: () => void;
};

export default function PublishingCard({ website, deployments, onChange }: PublishingCardProps) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const template = getTemplateDefinition(website.templateId);
  const issues = useMemo(() => (template ? findPublishIssues(template, website.draft) : []), [template, website.draft]);

  const live = website.status === "published";
  const nothingNew = live && !website.hasUnpublishedChanges;
  // The customer's own domain is the live address only once it is connected.
  const liveAddress = website.domainStatus === "connected" && website.customDomain ? website.customDomain : website.address;

  async function handlePublish() {
    setPublishing(true);
    setError(null);
    try {
      await publishWebsite(website.id);
      setDialogOpen(false);
      onChange();
    } catch (problem) {
      setError(problem instanceof Error ? problem.message : "The website could not be published.");
    } finally {
      setPublishing(false);
    }
  }

  return (
    <Card title={website.name} action={<WebsiteStatusBadge website={website} />}>
      <dl className="grid gap-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-fg-muted">Live address</dt>
          <dd className="text-right break-all">{live ? liveAddress : "Not live yet"}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-fg-muted">Last published</dt>
          <dd>{website.publishedAt ? `${formatDate(website.publishedAt)} (${formatTimeAgo(website.publishedAt)})` : "Never"}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-fg-muted">Hosting</dt>
          <dd className="text-right">MigsFlow Studio hosting (simulated in this prototype)</dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button onClick={() => setDialogOpen(true)} disabled={!template || nothingNew}>
          {live ? "Publish changes" : "Publish"}
        </Button>
        <Button href={editHref(website)} variant="secondary">
          Edit website
        </Button>
        {nothingNew && <p className="text-sm text-fg-muted">The live website already has your latest edits.</p>}
      </div>
      {error && (
        <p role="alert" className="mt-3 text-sm font-medium text-danger">
          {error}
        </p>
      )}

      <h3 className="mt-6 mb-3 font-semibold">Publishing history</h3>
      {deployments.length === 0 ? (
        <p className="text-fg-muted">This website has not been published yet.</p>
      ) : (
        <DataTable
          caption={`Publishing history for ${website.name}`}
          rows={deployments}
          rowKey={(deployment) => deployment.id}
          columns={[
            { header: "Published", cell: (deployment) => `${formatDate(deployment.at)} (${formatTimeAgo(deployment.at)})` },
            {
              header: "Result",
              cell: (deployment) =>
                deployment.status === "success" ? <Badge tone="success">Published</Badge> : <Badge tone="danger">Failed</Badge>,
            },
          ]}
        />
      )}

      <PublishDialog
        open={dialogOpen}
        websiteName={website.name}
        issues={issues}
        publishing={publishing}
        onClose={() => setDialogOpen(false)}
        onConfirm={() => void handlePublish()}
        // Fixing happens in the editor, so "Fix this" goes there.
        onGoTo={() => router.push(editHref(website))}
      />
    </Card>
  );
}
