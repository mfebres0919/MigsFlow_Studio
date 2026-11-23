import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BrowserFrame from "@/components/marketing/BrowserFrame";
import Badge from "@/components/ui/Badge";
import { formatPrice } from "@/lib/format";
import { getIndustry } from "@/lib/industries";
import type { Template } from "@/lib/types";
import { templateCardImage } from "@/lib/showcase";

// One template in the marketplace grid: a picture of its hero section (the
// top of its home page) in a browser frame,
// then its name, industry, one-line summary and price. The whole card leads
// to the template's page, and lifts slightly when pointed at.

type TemplateCardProps = {
  template: Template;
  /** True for the first card on a page: its image is loaded straight away, not lazily. */
  first?: boolean;
};

export default function TemplateCard({ template, first = false }: TemplateCardProps) {
  const industry = getIndustry(template.industry);

  return (
    <article className="group relative flex h-full flex-col gap-5 transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none">
      {/* The price tag sits on the picture (Miguelle, 2026-11-22: on the card,
          on green, so it is clear at a glance). "text-ink" is the page's
          background color, which reads on the green in both themes. */}
      <p className="pointer-events-none absolute top-12 right-3 z-10 rounded-full bg-success px-3.5 py-1 text-lg font-semibold text-ink shadow-lg">
        <span className="sr-only">Price: </span>
        {formatPrice(template.priceCents)}
      </p>
      <BrowserFrame
        src={templateCardImage(template.id)}
        address={`${template.name.toLowerCase().replace(/\s+/g, "")}.template`}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        preload={first}
      />

      <div className="flex flex-1 flex-col gap-2 px-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="text-xl font-semibold">
            {/* The link's "after" layer covers the whole card, so anywhere on
                the card can be clicked while the link text stays just the name. */}
            <Link href={`/templates/${template.id}`} className="after:absolute after:inset-0 after:content-['']">
              {template.name}
            </Link>
          </h3>
          {industry && <Badge>{industry.label}</Badge>}
        </div>
        <p className="flex-1 text-fg-muted">{template.summary}</p>
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="text-sm text-fg-muted">One-time purchase</p>
          <span aria-hidden="true" className="flex items-center gap-1 text-sm font-medium text-signal">
            View template
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
          </span>
        </div>
      </div>
    </article>
  );
}
