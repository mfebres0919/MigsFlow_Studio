"use client";

import { useId, useState, type FormEvent } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import DataTable from "@/components/ui/DataTable";
import { addCustomDomain, checkCustomDomain, removeCustomDomain } from "@/lib/data/domains";
import type { Website } from "@/lib/types";
import { cleanDomain, validateDomain } from "@/lib/validation";

// The domain settings for one website: its free address, and the customer's
// own domain with the steps to connect it.

type DomainCardProps = {
  website: Website;
  /** Called after a change, with the updated website. */
  onChange: (website: Website) => void;
};

type DnsRecord = { type: string; name: string; value: string };

export default function DomainCard({ website, onChange }: DomainCardProps) {
  const inputId = useId();
  const [domain, setDomain] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<"adding" | "checking" | "removing" | null>(null);
  const [confirmRemove, setConfirmRemove] = useState(false);

  // The two records the customer adds at the company they bought their domain from.
  // 192.0.2.1 is an address reserved for examples; the real one comes from the hosting provider in Phase 5.
  const records: DnsRecord[] = [
    { type: "A", name: "@", value: "192.0.2.1" },
    { type: "CNAME", name: "www", value: website.address },
  ];

  // Runs one change and passes the updated website up. Errors are shown under the form.
  async function run(kind: NonNullable<typeof busy>, work: () => Promise<Website>) {
    setBusy(kind);
    setError(null);
    try {
      onChange(await work());
    } catch (problem) {
      setError(problem instanceof Error ? problem.message : "That did not work. Try again.");
    } finally {
      setBusy(null);
    }
  }

  function handleAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // stop the browser from reloading the page, as forms do by default
    const cleaned = cleanDomain(domain);
    const problem = validateDomain(cleaned);
    if (problem) return setError(problem);
    void run("adding", () => addCustomDomain(website.id, cleaned)).then(() => setDomain(""));
  }

  return (
    <Card title={website.name}>
      {/* <dl> pairs each label (<dt>) with its value (<dd>). */}
      {/* min-w-0 on each row lets it shrink to a narrow phone; without it Safari
          keeps the row as wide as the text box inside it wants to be. */}
      <dl className="grid gap-5">
        <div className="min-w-0">
          <dt className="text-sm text-fg-muted">Free address</dt>
          <dd className="mt-1 flex flex-wrap items-center gap-3">
            <span className="font-medium break-all">{website.address}</span>
            <Badge>Included</Badge>
          </dd>
        </div>

        <div className="min-w-0">
          <dt className="text-sm text-fg-muted">Your own domain</dt>
          <dd className="mt-1">
            {website.customDomain ? (
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-medium break-all">{website.customDomain}</span>
                {website.domainStatus === "connected" ? (
                  <Badge tone="success">Connected</Badge>
                ) : (
                  <Badge tone="warning">Waiting for DNS</Badge>
                )}
              </div>
            ) : (
              <form onSubmit={handleAdd} noValidate className="max-w-xl">
                <label htmlFor={inputId} className="sr-only">
                  Your domain for {website.name}
                </label>
                <div className="flex flex-wrap gap-3">
                  <input
                    id={inputId}
                    type="text"
                    inputMode="url"
                    autoCapitalize="none"
                    placeholder="yourbusiness.com"
                    value={domain}
                    onChange={(event) => setDomain(event.target.value)}
                    aria-invalid={error ? "true" : undefined}
                    aria-describedby={error ? `${inputId}-error` : undefined}
                    // basis-48: the box asks for 12rem; when that does not fit beside the button, the button wraps below it.
                    className="min-h-11 min-w-0 flex-1 basis-48 rounded-control border border-line-strong bg-ink px-3 py-2 text-fg"
                  />
                  <Button type="submit" disabled={busy !== null}>
                    {busy === "adding" ? "Adding" : "Add domain"}
                  </Button>
                </div>
              </form>
            )}
            {error && (
              <p id={`${inputId}-error`} role="alert" className="mt-2 text-sm font-medium text-danger">
                {error}
              </p>
            )}
          </dd>
        </div>
      </dl>

      {website.customDomain && website.domainStatus === "pending" && (
        <div className="mt-6 border-t border-line pt-6">
          <h3 className="font-semibold">Connect {website.customDomain}</h3>
          <ol className="mt-2 grid list-decimal gap-1 pl-5 text-fg-muted">
            <li>Sign in where you bought your domain (for example GoDaddy or Namecheap) and open its DNS settings.</li>
            <li>Add the two records below. Leave every other record alone, especially the ones for email (MX and TXT).</li>
            <li>Come back and press Check again. Changes can take up to an hour to be seen.</li>
          </ol>
          <div className="mt-4">
            <DataTable
              caption={`DNS records for ${website.customDomain}`}
              rows={records}
              rowKey={(record) => record.type}
              columns={[
                { header: "Type", cell: (record) => record.type },
                { header: "Name", cell: (record) => record.name },
                { header: "Value", cell: (record) => <span className="break-all">{record.value}</span> },
              ]}
            />
          </div>
        </div>
      )}

      {website.customDomain && website.domainStatus === "connected" && (
        <dl className="mt-6 grid gap-2 border-t border-line pt-6 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-fg-muted">Domain ownership</dt>
            <dd>Verified</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-fg-muted">Secure connection (SSL)</dt>
            <dd>Active</dd>
          </div>
        </dl>
      )}

      {website.customDomain && (
        <div className="mt-5 flex flex-wrap gap-3">
          {website.domainStatus === "pending" && (
            <Button disabled={busy !== null} onClick={() => void run("checking", () => checkCustomDomain(website.id))}>
              {busy === "checking" ? "Checking" : "Check again"}
            </Button>
          )}
          <Button variant="danger" disabled={busy !== null} onClick={() => setConfirmRemove(true)}>
            Remove domain
          </Button>
        </div>
      )}

      <ConfirmDialog
        open={confirmRemove}
        title="Remove this domain?"
        confirmLabel="Remove domain"
        busy={busy === "removing"}
        onCancel={() => setConfirmRemove(false)}
        onConfirm={() => {
          setConfirmRemove(false);
          void run("removing", () => removeCustomDomain(website.id));
        }}
      >
        <p>
          {website.customDomain} will stop showing {website.name}. The website stays reachable at its free address, and
          nothing changes at the company you bought the domain from.
        </p>
      </ConfirmDialog>
    </Card>
  );
}
