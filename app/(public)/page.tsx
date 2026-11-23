import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, LayoutTemplate, PenLine, Play, Smartphone, type LucideIcon } from "lucide-react";
import mark from "@/public/images/brand/migsflow-mark.svg";
import DeviceShowcase, { type ShowcaseItem } from "@/components/marketing/DeviceShowcase";
import HeroRings from "@/components/marketing/HeroRings";
import StarField from "@/components/marketing/StarField";
import DemoLabel from "@/components/ui/DemoLabel";
import { getHostingPrice, getTemplates } from "@/lib/data/templates";
import { formatPrice } from "@/lib/format";
import { getIndustry } from "@/lib/industries";
import { showcasePictures, showcaseTemplateIds } from "@/lib/showcase";

// The homepage ("/"). Its top section follows the hero of migsflow.com
// (Miguelle, 2026-11-23): a big Orbitron headline with a gradient line, the
// prices stated plainly, a gradient button and a play-style second button,
// and on the right a laptop and phone cycling through real templates, over
// twinkling stars and gradient rings.
//
// Later the same day Miguelle shared the Framo template's landing page as an
// example, not to copy: from it came the dark rounded panel the hero sits in,
// and the small floating tags around the laptop. The heading stays in
// Orbitron. The rest of the landing page is a later step.
//
// Like the marketplace, this runs on the server and is built ahead of time.

export const metadata: Metadata = {
  description:
    "Professionally designed website templates for small businesses. Pick one, make it yours with a live preview, and publish it. No code.",
};

// The small tags floating around the laptop (wide screens only).
const tags: { icon: LucideIcon; strong: string; rest: string; place: string }[] = [
  { icon: PenLine, strong: "Live editor", rest: "no code", place: "-top-4 left-[14%]" },
  { icon: Globe, strong: "Hosting", rest: "optional", place: "top-0 -right-2" },
  { icon: Smartphone, strong: "Phone-ready", rest: "every page", place: "top-[58%] -left-8" },
];

export default async function Home() {
  // Prices come from the data doorway, never written into the page.
  const [templates, hostingCents] = await Promise.all([getTemplates(), getHostingPrice()]);
  const lowestCents = Math.min(...templates.map((template) => template.priceCents));

  const showcase: ShowcaseItem[] = showcaseTemplateIds.flatMap((id) => {
    const template = templates.find((entry) => entry.id === id);
    if (!template) return [];
    return [
      {
        id,
        name: template.name,
        industry: getIndustry(template.industry)?.label ?? "",
        price: formatPrice(template.priceCents),
        href: `/templates/${id}`,
        ...showcasePictures(id),
      },
    ];
  });

  return (
    <div className="px-3 sm:px-4">
      {/* The rounded panel. It follows Studio's light and dark mode like the
          rest of the page: soft blues in light mode, deep navy in dark mode
          (".hero-panel" in app/globals.css). */}
      <section
        data-pause-offscreen
        aria-labelledby="hero-title"
        className="hero-panel relative isolate overflow-clip rounded-4xl border border-line pt-12 pb-14 text-fg sm:pt-16 lg:pb-20"
      >
        <HeroRings />
        <StarField shooting />

        <div className="mx-auto grid max-w-6xl items-center gap-x-10 gap-y-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          <div className="motion-safe:animate-rise">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/85 px-3.5 py-1.5 text-sm font-medium text-fg-muted shadow-sm">
              {/* A small pulsing light, like a "live" indicator. */}
              <span aria-hidden="true" className="relative flex size-2">
                <span className="absolute inset-0 rounded-full bg-signal opacity-60 motion-safe:animate-ping" />
                <span className="relative size-2 rounded-full bg-signal" />
              </span>
              Website templates for small businesses
            </p>

            <h1
              id="hero-title"
              className="mt-6 font-display text-[2.35rem] leading-[1.18] font-medium tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]"
            >
              Websites Built For Your Trade, <span className="text-brand-gradient">Ready To Make Yours</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-fg-muted">
              Pick a professionally designed template, fill in your business details with a live preview, and publish it when it
              looks right. No code, no designer fees.
            </p>

            {/* The prices, stated plainly before the buttons (as on the main site).
              Side by side where there is room, stacked where the column is narrow
              (phones, and the two-column layout on smaller laptops). Each price
              stays on one line. */}
            <p className="mt-7 inline-flex flex-col gap-1 rounded-2xl border border-signal/30 bg-panel/80 px-5 py-2.5 text-fg-muted sm:whitespace-nowrap sm:flex-row sm:items-center sm:gap-4 lg:flex-col lg:items-start lg:gap-1 xl:flex-row xl:items-center xl:gap-4">
              <span>
                Templates from <strong className="text-xl font-bold text-fg">{formatPrice(lowestCents)}</strong> one-time
              </span>
              <span aria-hidden="true" className="hidden w-px self-stretch bg-signal/30 sm:block lg:hidden xl:block" />
              <span>
                Hosting <strong className="text-xl font-bold text-fg">{formatPrice(hostingCents)}/mo</strong> optional
              </span>
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-5">
              {/* The main button: brand gradient, a glossy top half, and an icon in a circle. */}
              <Link
                href="/templates"
                className="bg-brand-gradient group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full pr-2 pl-6 font-medium text-white shadow-[0_16px_28px_-10px_rgb(11_60_255/0.6)] transition-transform before:absolute before:inset-0 before:bg-linear-to-b before:from-white/20 before:to-transparent hover:-translate-y-0.5 motion-reduce:transition-none"
              >
                {/* "relative" lifts the words above the glossy layer. */}
                <span className="relative">Browse templates</span>
                <span className="relative grid size-10 place-items-center rounded-full bg-white/20">
                  <LayoutTemplate aria-hidden="true" className="size-5" />
                </span>
              </Link>

              {/* The second button: a white circle with a play mark, then words. */}
              <Link href="/dashboard" className="group inline-flex items-center gap-3.5 rounded-full pr-3 font-medium">
                <span className="grid size-12 place-items-center rounded-full bg-panel text-accent shadow-lg shadow-accent/20 ring-1 ring-line transition-transform group-hover:scale-105 motion-reduce:transition-none dark:text-signal">
                  <Play aria-hidden="true" className="ml-0.5 size-5 fill-current" />
                </span>
                Try the editor demo
              </Link>
            </div>

            {/* Who is behind it: a real link to MigsFlow, in place of the main site's client photos. */}
            <a
              href="https://migsflow.com"
              target="_blank"
              rel="noopener"
              className="group mt-9 inline-flex items-center gap-3 rounded-full border border-line bg-panel/85 py-2 pr-5 pl-2 shadow-sm transition-colors hover:border-signal/50"
            >
              <Image src={mark} alt="" width={36} height={36} />
              <span className="text-sm leading-tight">
                <span className="block text-fg-muted">Designed and built by</span>
                <span className="flex items-center gap-1.5 font-semibold">
                  MigsFlow Web Design
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                  />
                </span>
              </span>
              <span className="sr-only"> (opens migsflow.com in a new tab)</span>
            </a>

            <div className="mt-6">
              <DemoLabel>Prototype: prices are not final and nothing is for sale yet</DemoLabel>
            </div>
          </div>

          <div className="relative motion-safe:animate-rise [animation-delay:150ms]">
            <DeviceShowcase items={showcase} />
            {tags.map(({ icon: Icon, strong, rest, place }) => (
              <p
                key={strong}
                className={`absolute ${place} z-10 hidden items-center gap-2.5 rounded-full border border-line bg-panel/90 py-1.5 pr-4 pl-1.5 text-sm text-fg shadow-xl shadow-accent/10 lg:flex dark:shadow-black/30`}
              >
                <span className="grid size-8 place-items-center rounded-full bg-raised text-signal">
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <span>
                  <strong className="font-semibold">{strong}</strong> <span className="text-fg-muted">{rest}</span>
                </span>
              </p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
