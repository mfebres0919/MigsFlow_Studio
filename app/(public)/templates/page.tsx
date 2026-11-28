import type { Metadata } from "next";
import { ArrowDown, BadgeDollarSign, PenLine, Smartphone } from "lucide-react";
import IndustryFilter from "@/components/marketing/IndustryFilter";
import PageHero from "@/components/marketing/PageHero";
import TemplateGrid from "@/components/marketing/TemplateGrid";
import TemplateShowcase from "@/components/marketing/TemplateShowcase";
import { getTemplates } from "@/lib/data/templates";

// "/templates": the marketplace, showing every template.
//
// This page has no "use client": it runs on the server and is built once,
// ahead of time, as plain HTML. That makes it fast and readable by search
// engines, which matters for public pages in a way it did not for the dashboard.
export const metadata: Metadata = {
  title: "Website Templates",
  alternates: { canonical: "/templates" },
  description:
    "Professionally designed website templates for cleaning companies, movers and nonprofits. Buy once, edit it yourself, no coding needed.",
};

// Three true things about every template, shown under the heading.
const facts = [
  { icon: BadgeDollarSign, text: "One price, paid once" },
  { icon: PenLine, text: "Edit the words and photos yourself" },
  { icon: Smartphone, text: "Looks right on phones" },
];

export default async function TemplatesPage() {
  const templates = await getTemplates();

  return (
    <>
      <PageHero
        title="Templates made to fit any business"
        text="Every template has the sections most websites need. Make it yours: change the words, photos, colors and sections yourself. No code."
        aside={<TemplateShowcase templates={templates} />}
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {/* A plain link to the grid further down this page. */}
          <a
            href="#browse"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 font-medium text-white shadow-lg shadow-accent/30 transition-colors hover:bg-accent-hover"
          >
            Browse templates
            <ArrowDown aria-hidden="true" className="size-4 transition-transform group-hover:translate-y-0.5 motion-reduce:transition-none" />
          </a>
        </div>

        <ul role="list" className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
          {facts.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-2">
              <Icon aria-hidden="true" className="size-5 text-signal" />
              {text}
            </li>
          ))}
        </ul>
      </PageHero>

      {/* scroll-mt-24 leaves room for the floating header when "Browse templates" jumps here. */}
      <section id="browse" aria-labelledby="browse-title" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <h2 id="browse-title" className="font-display text-2xl font-semibold tracking-wide sm:text-3xl">
            All templates
          </h2>
          <IndustryFilter current={null} />
        </div>

        <div className="mt-8">
          <TemplateGrid
            templates={templates}
            emptyTitle="No templates yet"
            emptyText="Templates will appear here as they are finished."
          />
        </div>
      </section>
    </>
  );
}
