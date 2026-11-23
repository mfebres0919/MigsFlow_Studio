import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronLeft } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import DemoLabel from "@/components/ui/DemoLabel";
import { getTemplate, getTemplates } from "@/lib/data/templates";
import { formatMoney } from "@/lib/format";
import { getIndustry } from "@/lib/industries";
import { templateHeroImage } from "@/lib/website-preview";
import { getTemplateDefinition } from "@/templates/registry";

// "/templates/<template id>": one template's own page.

// Tells Next.js which templates exist, so it can build each page ahead of time.
export async function generateStaticParams() {
  return (await getTemplates()).map((template) => ({ id: template.id }));
}

export async function generateMetadata({ params }: PageProps<"/templates/[id]">): Promise<Metadata> {
  const template = await getTemplate((await params).id);
  if (!template) return {};
  return { title: `${template.name} Template`, description: template.summary };
}

export default async function TemplatePage({ params }: PageProps<"/templates/[id]">) {
  const template = await getTemplate((await params).id);
  if (!template) notFound();

  const industry = getIndustry(template.industry);
  const hero = templateHeroImage(template.id);
  // The list of what a buyer can change comes straight from the template's
  // schema, so it can never promise something the editor does not offer.
  const definition = getTemplateDefinition(template.id);
  const pages = definition?.schema.pages ?? [];
  const editable = definition
    ? [...definition.schema.site, ...pages.flatMap((page) => page.sections)]
        .map((section) => section.label)
        // The same section name can appear on several pages; list each once.
        .filter((label, index, all) => all.indexOf(label) === index)
    : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Link href="/templates" className="inline-flex min-h-11 items-center gap-1 rounded-control font-medium text-fg-muted hover:text-fg">
        <ChevronLeft aria-hidden="true" className="size-5" />
        All templates
      </Link>

      <div className="mt-4 grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-14">
        {/* The picture, and under it the longer lists. */}
        <div className="grid content-start gap-10">
          <div className="relative aspect-16/10 overflow-hidden rounded-panel border border-line bg-raised">
            {hero && (
              <Image src={hero.src} alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" preload className="object-cover" />
            )}
          </div>

          <section aria-labelledby="included-title">
            <h2 id="included-title" className="text-xl font-semibold">
              What is included
            </h2>
            <ul role="list" className="mt-4 grid gap-3 sm:grid-cols-2">
              {template.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-signal" />
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          {editable.length > 0 && (
            <section aria-labelledby="editable-title">
              <h2 id="editable-title" className="text-xl font-semibold">
                What you can change yourself
              </h2>
              <p className="mt-2 text-fg-muted">
                Every word and photo in these parts is yours to edit. The layout stays as designed, so it always looks right.
              </p>
              <ul role="list" className="mt-4 flex flex-wrap gap-2">
                {editable.map((label) => (
                  <li key={label} className="rounded-full border border-line px-3 py-1 text-sm">
                    {label}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* The name, price and buttons. On wide screens this stays in view
            while the longer column scrolls (the project's sticky-column rule). */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          {industry && <Badge>{industry.label}</Badge>}
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-wide sm:text-4xl">{template.name}</h1>
          <p className="mt-4 text-lg text-fg-muted">{template.description}</p>

          <dl className="mt-6 grid gap-2 border-y border-line py-5">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-fg-muted">Price</dt>
              <dd className="text-2xl font-semibold">
                {formatMoney(template.priceCents)}
                <span className="text-base font-normal text-fg-muted"> one-time</span>
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-fg-muted">Pages</dt>
              <dd>{pages.map((page) => page.label).join(", ")}</dd>
            </div>
          </dl>

          <div className="mt-6 grid gap-3">
            <Button disabled>Buy this template</Button>
            <Button href="/dashboard/websites" variant="secondary">
              Try it in the demo dashboard
            </Button>
          </div>
          <div className="mt-4">
            <DemoLabel>Buying is not built yet</DemoLabel>
          </div>
        </div>
      </div>
    </div>
  );
}
