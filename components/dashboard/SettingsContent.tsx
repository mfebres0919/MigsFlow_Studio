"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SettingsForm, { type SettingsField } from "@/components/dashboard/SettingsForm";
import type { Customer } from "@/lib/types";
import { validateEmail, validateName } from "@/lib/validation";

// The body of the Account settings page.

const personalFields: SettingsField[] = [
  { name: "name", label: "Your name", type: "text", autoComplete: "name", validate: validateName },
  { name: "email", label: "Email address", type: "email", autoComplete: "email", validate: validateEmail },
];

const businessFields: SettingsField[] = [
  { name: "businessName", label: "Business name", type: "text", autoComplete: "organization", validate: validateName },
  { name: "businessPhone", label: "Business phone", type: "tel", autoComplete: "tel" },
];

export default function SettingsContent({ customer }: { customer: Customer }) {
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <div className="grid gap-6">
      <SettingsForm
        title="Personal information"
        description="Who MigsFlow Studio should contact about this account."
        fields={personalFields}
        initial={{ name: customer.name, email: customer.email }}
      />
      <SettingsForm
        title="Business information"
        description="Used on your invoices. Your website's own details are changed in the editor."
        fields={businessFields}
        initial={{ businessName: customer.businessName, businessPhone: customer.businessPhone }}
      />

      <Card title="Signing in and security">
        <p>
          You sign in with a link sent to <span className="font-medium break-all">{customer.email}</span>. There is no
          password to remember, and MigsFlow never asks for one.
        </p>
        <p className="mt-2 text-fg-muted">Signing in is simulated in this prototype: the dashboard opens as a sample customer.</p>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <Button variant="secondary" onClick={() => setNotice("Signing out is simulated in this prototype, so you are still signed in.")}>
            Sign out
          </Button>
          <p role="status" className="text-sm text-fg-muted">
            {notice}
          </p>
        </div>
      </Card>
    </div>
  );
}
