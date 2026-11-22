"use client";

import { useState } from "react";
import { CreditCard } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import DataTable from "@/components/ui/DataTable";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import LoadingState from "@/components/ui/LoadingState";
import { useLoad } from "@/hooks/useLoad";
import { getPurchases } from "@/lib/data/billing";
import { getTemplates, getWebsites } from "@/lib/data/websites";
import { formatDate, formatMoney } from "@/lib/format";

const loadBilling = () => Promise.all([getPurchases(), getWebsites(), getTemplates()]);

// The body of the Billing page: what was bought, the subscription, and payments with invoices.
export default function BillingContent() {
  const { state, reload } = useLoad(loadBilling);
  const [notice, setNotice] = useState<string | null>(null);

  if (state.status === "loading") return <LoadingState label="Loading your billing details" />;
  if (state.status === "error") {
    return <ErrorState title="Your billing details could not be loaded" message={state.message} onRetry={reload} />;
  }

  const [purchases, websites, templates] = state.data;

  if (purchases.length === 0) {
    return <EmptyState icon={CreditCard} title="No purchases yet" description="Templates you buy, and their invoices, appear here." />;
  }

  const templateName = (id: string) => templates.find((template) => template.id === id)?.name ?? "Unknown template";
  const websiteName = (id: string) => websites.find((website) => website.id === id)?.name ?? "A deleted website";
  // reduce() adds the amounts up, starting from 0. Whole cents keep the sum exact.
  const total = purchases.reduce((sum, purchase) => sum + purchase.amountCents, 0);

  return (
    <div className="grid gap-6">
      <Card title="Your templates" description={`${purchases.length} bought, ${formatMoney(total)} in total.`}>
        <DataTable
          caption="Templates you have bought"
          rows={purchases}
          rowKey={(purchase) => purchase.id}
          columns={[
            { header: "Template", cell: (purchase) => templateName(purchase.templateId) },
            { header: "Used for", cell: (purchase) => websiteName(purchase.websiteId) },
            { header: "Bought", cell: (purchase) => formatDate(purchase.purchasedAt) },
            { header: "Price", cell: (purchase) => formatMoney(purchase.amountCents), alignRight: true },
          ]}
        />
      </Card>

      <Card title="Subscription">
        <p>You have no subscription. Each template is a one-time purchase.</p>
        <p className="mt-2 text-fg-muted">
          Optional hosting plans are not part of this prototype. If one is offered later, it will show here with its
          renewal date.
        </p>
      </Card>

      <Card title="Payments and invoices">
        <DataTable
          caption="Payments and invoices"
          rows={purchases}
          rowKey={(purchase) => purchase.id}
          columns={[
            { header: "Date", cell: (purchase) => formatDate(purchase.purchasedAt) },
            { header: "Invoice", cell: (purchase) => purchase.invoiceNumber },
            { header: "For", cell: (purchase) => `${templateName(purchase.templateId)} template` },
            { header: "Status", cell: () => <Badge tone="success">Paid</Badge> },
            { header: "Amount", cell: (purchase) => formatMoney(purchase.amountCents), alignRight: true },
            {
              header: "Invoice file",
              cell: (purchase) => (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setNotice(`Invoice ${purchase.invoiceNumber} cannot be downloaded: invoices are simulated in this prototype.`)}
                >
                  Download<span className="sr-only"> invoice {purchase.invoiceNumber}</span>
                </Button>
              ),
            },
          ]}
        />
        {/* Read aloud when a Download button is pressed. */}
        <p role="status" className="mt-3 text-sm text-fg-muted">
          {notice}
        </p>
      </Card>
    </div>
  );
}
