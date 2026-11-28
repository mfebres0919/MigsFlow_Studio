import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Minus, PencilLine, Receipt, ServerCog } from "lucide-react";
import { ArcDivider, FlowDivider, WaveDivider } from "@/components/marketing/landing/Dividers";
import FaqList from "@/components/marketing/landing/FaqList";
import SectionHeading from "@/components/marketing/landing/SectionHeading";
import PageHero from "@/components/marketing/PageHero";
import DemoLabel from "@/components/ui/DemoLabel";
import { getHostingPrice, getTemplates } from "@/lib/data/templates";
import { formatPrice } from "@/lib/format";

// "/pricing" (Phase 2, step 5; redesigned 2026-11-27 from Miguelle's
// example screenshots, taking the feel only, not the layout piece by piece).
//
// 1. A centered hero.
// 2. The two ways to buy as cards. The featured card has a colored band
//    across its top. Under them, three short facts.
// 3. "Compare plans": the same two plans in a table, line by line.
// 4. Pricing questions.
// 5. A way to MigsFlow's custom websites.
// SVG dividers sit between the sections.
//
// Every price comes from the data doorway (lib/data/templates.ts); none is
// typed into this page. Only decided facts are stated: what happens when
// someone stops paying for hosting is still an open decision, so nothing is
// promised about cancelling.

export const metadata: Metadata = {
  title: "Pricing",
  alternates: { canonical: "/pricing" },
  description: "Pay once for your website. Hosting with working forms and your own domain is an optional monthly extra.",
};

/** One line of the comparison table: true = included, false = not included, words = how. */
type Cell = boolean | string;

function CompareCell({ value }: { value: Cell }) {
  if (value === true) {
    return (
      <span className="inline-grid size-7 place-items-center rounded-full bg-signal/15 text-signal">
        <Check aria-hidden="true" className="size-4" />
        <span className="sr-only">Included</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-grid size-7 place-items-center text-fg-muted">
        <Minus aria-hidden="true" className="size-4" />
        <span className="sr-only">Not included</span>
      </span>
    );
  }
  return <>{value}</>;
}

export default async function PricingPage() {
  const [templates, hostingCents] = await Promise.all([getTemplates(), getHostingPrice()]);
  // "$450": the number shown big on the cards, without its "$" (drawn smaller beside it).
  const lowest = formatPrice(Math.min(...templates.map((template) => template.priceCents)));
  const hosting = formatPrice(hostingCents);

  const plans = [
    {
      name: "Website",
      text: "Your website, ready to download and host wherever you like.",
      cadence: "one-time",
      features: [
        "The template of your choice",
        "The live preview editor",
        "Your colors, fonts and photos",
        "Show or hide sections",
        "Download your website's files",
      ],
      note: "You set up hosting, your domain and forms yourself.",
      featured: false,
    },
    {
      name: "Website + Hosting",
      text: "Everything handled for you: publish in one click and we keep it running.",
      cadence: `one-time, then ${hosting}/mo`,
      features: [
        "Everything in Website",
        "Hosting, managed by MigsFlow",
        "One-click publishing, and restore earlier versions",
        "Your own domain, with the secure padlock (HTTPS)",
        "Working contact forms: messages in your dashboard and inbox",
      ],
      note: null,
      featured: true,
    },
  ];

  // Three short facts under the cards. Each is something already decided.
  const facts = [
    { icon: Receipt, text: "Pay once for your template" },
    { icon: ServerCog, text: "Hosting is optional" },
    { icon: PencilLine, text: "Edit your website any time" },
  ];

  const compare: { label: string; website: Cell; hosted: Cell }[] = [
    { label: "Price", website: `From ${lowest}, once`, hosted: `From ${lowest}, once + ${hosting}/mo` },
    { label: "Template and live editor", website: true, hosted: true },
    { label: "Your colors, fonts and photos", website: true, hosted: true },
    { label: "Show or hide sections", website: true, hosted: true },
    { label: "Hosting", website: "You arrange it", hosted: "Managed by MigsFlow" },
    { label: "Publishing", website: "Upload the files yourself", hosted: "One click" },
    { label: "Restore earlier versions", website: false, hosted: true },
    { label: "Free web address", website: false, hosted: true },
    { label: "Your own domain", website: "You connect it", hosted: "Connected for you, with HTTPS" },
    { label: "Contact forms", website: "Link your own form service", hosted: "Messages in your dashboard and inbox" },
  ];

  const questions = [
    {
      q: "What do I pay for?",
      a: `The template, once: from ${lowest}, depending on the template. Hosting is an optional ${hosting} a month.`,
    },
    {
      q: "Can I change my website after I buy it?",
      a: "Yes, as often as you like, in the same editor. Hosted websites go live again with one click.",
    },
    {
      q: "Why do forms only work with hosting?",
      a: 'With hosting, messages from your form arrive in your dashboard and your email with no setup. If you download your website instead, you can link your own form service when you download, or show a "call or email us" box.',
    },
    {
      q: "Do I need my own domain?",
      a: "No. Every hosted website gets a free address. You can connect a domain you own at any time.",
    },
  ];

  return (
    <>
      <PageHero
        centered
        title="Pay once for your website"
        text={`Templates from ${lowest}, paid once. Hosting with working forms and your own domain is an optional ${hosting} a month.`}
      >
        <div className="mt-6">
          <DemoLabel>Prototype: prices are not final and nothing is for sale yet</DemoLabel>
        </div>
      </PageHero>

      <ArcDivider />

      {/* 2. The two ways to buy. */}
      <section aria-labelledby="plans-title" className="mx-auto max-w-5xl px-4 pt-8 pb-16 sm:px-6 sm:pb-20">
        <h2 id="plans-title" className="sr-only">
          Ways to buy
        </h2>
        {/* items-center: the featured card is a little taller and sits in the middle of the other. */}
        <ul role="list" className="grid gap-6 md:grid-cols-2 md:items-center">
          {plans.map((plan) => (
            <li
              key={plan.name}
              className={`flex flex-col overflow-hidden rounded-3xl border bg-panel ${
                plan.featured ? "border-signal/50 shadow-2xl shadow-accent/20" : "border-line"
              }`}
            >
              {/* The featured plan's name sits on a colored band; the other's on the card itself. */}
              <div
                className={`flex flex-wrap items-center justify-between gap-3 px-7 sm:px-8 ${
                  plan.featured ? "bg-brand-gradient py-5 text-white" : "pt-7 sm:pt-8"
                }`}
              >
                <h3 className="font-display text-2xl font-medium tracking-tight">{plan.name}</h3>
                {plan.featured && (
                  <p className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium">Everything handled</p>
                )}
              </div>

              <div className={`flex flex-1 flex-col px-7 pb-7 sm:px-8 sm:pb-8 ${plan.featured ? "pt-6" : "pt-2"}`}>
                <p className="text-fg-muted">{plan.text}</p>

                <p className="mt-6 border-b border-line pb-6">
                  <span className="block text-sm font-medium text-fg-muted">From</span>
                  {/* The "$" is drawn small and raised, beside the big number. */}
                  <span className="mt-1 flex items-start gap-1">
                    <span className="mt-2 text-xl font-semibold text-fg-muted">$</span>
                    <span className="text-6xl font-light tracking-tight">{lowest.slice(1)}</span>
                  </span>
                  <span className="mt-2 block text-fg-muted">{plan.cadence}</span>
                </p>

                <ul role="list" className="mt-6 grid flex-1 content-start gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-signal/15 text-signal">
                        <Check aria-hidden="true" className="size-3.5" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                {plan.note && <p className="mt-5 text-sm text-fg-muted">{plan.note}</p>}

                <Link
                  href="/templates"
                  className={`group mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 font-medium transition-colors ${
                    plan.featured
                      ? "bg-brand-gradient text-white shadow-lg shadow-accent/25"
                      : "border border-signal/60 text-signal hover:bg-signal/10"
                  }`}
                >
                  Choose a template
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                  />
                </Link>
              </div>
            </li>
          ))}
        </ul>

        <ul role="list" className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-fg-muted">
          {facts.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-2">
              <Icon aria-hidden="true" className="size-4 text-signal" />
              {text}
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Compare plans, on a light band between two waves (like "What's included" on the home page). */}
      <WaveDivider />
      <section
        aria-labelledby="compare-title"
        className="flow-lines-bg overflow-clip bg-panel/60 py-12 sm:py-16"
      >
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <SectionHeading id="compare-title" eyebrow="Compare plans" title="Both plans, line by line" />

          {/* A real table, so screen readers can announce each answer with its row and column. */}
          <div className="mt-10 overflow-hidden rounded-3xl border border-line bg-panel">
            <table className="w-full table-fixed border-collapse text-left text-sm sm:text-base">
              <caption className="sr-only">What each plan includes</caption>
              <colgroup>
                <col className="w-[34%]" />
                <col className="w-[33%]" />
                <col className="w-[33%]" />
              </colgroup>
              <thead>
                <tr>
                  <td className="p-3 sm:p-5" />
                  <th scope="col" className="p-3 text-center font-display font-medium sm:p-5 sm:text-lg">
                    Website
                  </th>
                  {/* The featured plan's column is tinted all the way down. */}
                  <th scope="col" className="bg-signal/10 p-3 text-center font-display font-medium text-signal sm:p-5 sm:text-lg">
                    Website + Hosting
                  </th>
                </tr>
              </thead>
              <tbody>
                {compare.map((row) => (
                  <tr key={row.label} className="border-t border-line">
                    <th scope="row" className="p-3 font-medium sm:px-5 sm:py-4">
                      {row.label}
                    </th>
                    <td className="p-3 text-center text-fg-muted sm:px-5 sm:py-4">
                      <CompareCell value={row.website} />
                    </td>
                    <td className="bg-signal/10 p-3 text-center sm:px-5 sm:py-4">
                      <CompareCell value={row.hosted} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <WaveDivider flip />

      {/* 4. Pricing questions. */}
      <section aria-labelledby="pricing-faq-title" className="mx-auto max-w-3xl px-4 pt-12 pb-12 sm:px-6 sm:pt-16">
        <SectionHeading id="pricing-faq-title" eyebrow="Questions" title="About pricing" />
        <div className="mt-8">
          <FaqList items={questions} />
        </div>
      </section>

      <FlowDivider />

      {/* 5. MigsFlow's own custom work, for anyone who needs more than a template. */}
      <section aria-labelledby="custom-title" className="mx-auto max-w-5xl px-4 pt-12 pb-20 sm:px-6">
        <div className="tint-card flex flex-col items-start gap-5 rounded-3xl border border-signal/30 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 id="custom-title" className="font-display text-2xl font-medium tracking-tight">
              Need something custom?
            </h2>
            <p className="mt-2 max-w-xl text-fg-muted">
              MigsFlow Web Design builds fully custom websites and offers SEO for businesses that need more than a template.
            </p>
          </div>
          <a
            href="https://migsflow.com"
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full border border-line-strong bg-panel px-6 font-medium hover:bg-raised"
          >
            Visit migsflow.com
            <ArrowUpRight aria-hidden="true" className="size-4" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </section>
    </>
  );
}
