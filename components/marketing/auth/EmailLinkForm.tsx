"use client"; // it checks what is typed and changes what it shows after sending

import { useId, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, MailCheck } from "lucide-react";
import DemoLabel from "@/components/ui/DemoLabel";
import { validateEmail, validateName } from "@/lib/validation";

// The form on the Log in and Create account pages.
//
// Studio signs people in WITHOUT a password: they type their email and get a
// sign-in link (Supabase's "magic link", Phase 3). Nobody has a password to
// forget, and Studio never stores one.
//
// For now it is a design only (Phase 2, step 5): it checks what was typed,
// then shows the "check your email" message, labeled as a demo, with a way
// into the demo dashboard. No email is sent and nothing is stored.

type Kind = "login" | "signup";

type FieldSpec = {
  name: string;
  label: string;
  type: "text" | "email";
  autoComplete: string;
  validate: (value: string) => string | null;
};

const fieldsFor: Record<Kind, FieldSpec[]> = {
  login: [{ name: "email", label: "Email address", type: "email", autoComplete: "email", validate: validateEmail }],
  signup: [
    { name: "name", label: "Your name", type: "text", autoComplete: "name", validate: validateName },
    {
      name: "business",
      label: "Business or organization name",
      type: "text",
      autoComplete: "organization",
      validate: (value) => (value.trim() ? null : "Enter your business or organization name."),
    },
    { name: "email", label: "Email address", type: "email", autoComplete: "email", validate: validateEmail },
  ],
};

const words: Record<Kind, { button: string; sentTitle: string; sentText: (email: string) => string }> = {
  login: {
    button: "Email me a sign-in link",
    sentTitle: "Check your email",
    sentText: (email) =>
      `We sent a sign-in link to ${email}. Open it on this device to sign in. It works once and expires after an hour.`,
  },
  signup: {
    button: "Create my account",
    sentTitle: "Check your email to finish",
    sentText: (email) => `We sent a link to ${email}. Open it to confirm your email and finish creating your account.`,
  },
};

export default function EmailLinkForm({ kind }: { kind: Kind }) {
  const id = useId();
  const fields = fieldsFor[kind];
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sentTo, setSentTo] = useState<string | null>(null);
  const form = useRef<HTMLFormElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found: Record<string, string> = {};
    for (const field of fields) {
      const problem = field.validate(values[field.name] ?? "");
      if (problem) found[field.name] = problem;
    }
    setErrors(found);
    const first = fields.find((field) => found[field.name]);
    if (first) {
      // Put the cursor in the first field that needs fixing.
      form.current?.querySelector<HTMLInputElement>(`[name="${first.name}"]`)?.focus();
      return;
    }
    setSentTo((values.email ?? "").trim());
  }

  if (sentTo) {
    return (
      // role="status": screen readers read this out when it replaces the form.
      <div role="status" className="grid justify-items-center gap-4 text-center">
        <span className="bg-brand-gradient grid size-14 place-items-center rounded-2xl text-white shadow-lg shadow-accent/25">
          <MailCheck aria-hidden="true" className="size-7" />
        </span>
        <h2 className="font-display text-xl font-medium">{words[kind].sentTitle}</h2>
        <p className="text-fg-muted">{words[kind].sentText(sentTo)}</p>
        <DemoLabel>Demo: no email was sent</DemoLabel>
        <Link
          href="/dashboard"
          className="bg-brand-gradient group mt-2 inline-flex min-h-12 items-center gap-2 rounded-full px-6 font-medium text-white shadow-lg shadow-accent/25"
        >
          Open the demo dashboard
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
          />
        </Link>
      </div>
    );
  }

  return (
    // noValidate: our own messages replace the browser's, so they read the same everywhere.
    <form ref={form} noValidate onSubmit={handleSubmit} className="grid gap-5">
      {fields.map((field) => {
        const inputId = `${id}-${field.name}`;
        const errorId = `${inputId}-error`;
        const error = errors[field.name];
        return (
          <div key={field.name} className="grid gap-1.5">
            <label htmlFor={inputId} className="font-medium">
              {field.label}
            </label>
            <input
              id={inputId}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              value={values[field.name] ?? ""}
              onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? errorId : undefined}
              className="min-h-12 rounded-control border border-line-strong bg-panel px-4 text-base aria-invalid:border-danger"
            />
            {error && (
              <p id={errorId} className="text-sm font-medium text-danger">
                {error}
              </p>
            )}
          </div>
        );
      })}

      <button
        type="submit"
        className="bg-brand-gradient group mt-1 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 font-medium text-white shadow-lg shadow-accent/25 transition-transform hover:-translate-y-0.5 motion-reduce:transition-none"
      >
        {words[kind].button}
        <ArrowRight aria-hidden="true" className="size-4" />
      </button>
      <p className="text-center text-sm text-fg-muted">No password needed: we email you a link each time you sign in.</p>
    </form>
  );
}
