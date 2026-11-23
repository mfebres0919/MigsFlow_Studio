import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/marketing/landing/SectionHeading";
import TemplateGrid from "@/components/marketing/TemplateGrid";
import type { Template } from "@/lib/types";
import StarField from "@/components/marketing/StarField";

// "Templates for your trade": one template from each industry, the same
// cards as the shop, and a link to all of them.

type FeaturedTemplatesProps = {
  /** The templates to show (the page picks one per industry). */
  featured: Template[];
  /** How many templates there are in total, for the "See all" link. */
  total: number;
};

export default function FeaturedTemplates({ featured, total }: FeaturedTemplatesProps) {
  return (
    <section
      aria-labelledby="featured-title"
      data-pause-offscreen
      suppressHydrationWarning
      className="relative isolate mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24"
    >
      {/* Twinkling stars, as in every section (Miguelle, 2026-11-23). */}
      <StarField count={8} />
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          id="featured-title"
          eyebrow="Templates"
          title="Built for your trade"
          text="Each template is designed around how customers find and choose a business like yours."
          align="left"
        />
        <Link
          href="/templates"
          className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-panel px-5 font-medium transition-colors hover:border-signal/50"
        >
          See all {total} templates
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
          />
        </Link>
      </div>

      <div className="mt-12">
        <TemplateGrid
          templates={featured}
          emptyTitle="No templates yet"
          emptyText="Templates will appear here as they are finished."
        />
      </div>
    </section>
  );
}
