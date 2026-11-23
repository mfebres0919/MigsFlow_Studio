import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IndustryFilter from "@/components/marketing/IndustryFilter";
import PageHero from "@/components/marketing/PageHero";
import TemplateGrid from "@/components/marketing/TemplateGrid";
import { getTemplates } from "@/lib/data/templates";
import { getIndustry, industries } from "@/lib/industries";

// "/templates/industry/<industry>": the templates for one kind of business.
// The square brackets in the folder name mean "any value goes here".

// Tells Next.js which industries exist, so it can build each page ahead of time.
export function generateStaticParams() {
  return industries.map((industry) => ({ industry: industry.slug }));
}

// A page whose title depends on its address uses generateMetadata instead of
// a fixed "metadata" object. "params" is a promise, so it is awaited.
export async function generateMetadata({ params }: PageProps<"/templates/industry/[industry]">): Promise<Metadata> {
  const industry = getIndustry((await params).industry);
  if (!industry) return {};
  return { title: `${industry.label} Website Templates`, description: industry.description };
}

export default async function IndustryPage({ params }: PageProps<"/templates/industry/[industry]">) {
  const industry = getIndustry((await params).industry);
  if (!industry) notFound(); // an address for an industry that does not exist shows the "page not found" page

  const templates = (await getTemplates()).filter((template) => template.industry === industry.slug);

  return (
    <>
      <PageHero title={industry.heading} text={industry.description} />

      <section aria-labelledby="browse-title" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-5">
          {/* An <h2> here keeps the headings in order: page title, this, then each template's name. */}
          <h2 id="browse-title" className="font-display text-2xl font-semibold tracking-wide sm:text-3xl">
            {industry.label} templates
          </h2>
          <IndustryFilter current={industry.slug} />
        </div>

        <div className="mt-8">
          <TemplateGrid
            templates={templates}
            emptyTitle={`No templates for ${industry.label.toLowerCase()} yet`}
            emptyText="This one is being designed. The other industries have templates ready to look at."
          />
        </div>
      </section>
    </>
  );
}
