import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import mark from "@/public/images/brand/migsflow-mark.svg";
import MarketingNavLinks, { NavLinkList, type NavLink } from "@/components/marketing/MarketingNavLinks";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { industries } from "@/lib/industries";
import { site } from "@/lib/site";

// The header on every public page: a floating bar holding the brand, the
// links, the light/dark switch and the way into the dashboard.

const links: NavLink[] = [
  { href: "/templates", label: "All templates" },
  ...industries.map((industry) => ({ href: `/templates/industry/${industry.slug}`, label: industry.label })),
];

// The main call to action: solid brand blue with a soft glow, and an arrow
// that slides forward on hover.
const cta =
  "group inline-flex h-10 items-center justify-center gap-2 rounded-full bg-accent px-4 text-sm font-medium text-white shadow-lg shadow-accent/30 transition-colors hover:bg-accent-hover";

export default function SiteHeader() {
  return (
    // "sticky" keeps the bar at the top while the page scrolls under it.
    <header className="sticky top-0 z-30 px-3 pt-3 sm:px-6">
      {/* The bar itself: nearly solid. No blur behind it: blurring the page on
          every frame of a scroll is what made the page lag (2026-11-23). */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-line bg-panel/90 py-2 pr-2 pl-4 shadow-lg shadow-accent/5">
        <Link href="/" className="flex items-center gap-2.5 rounded-full pr-2">
          <Image src={mark} alt="" width={30} height={30} />
          <span className="font-display text-sm font-semibold tracking-wide sm:text-base">{site.name}</span>
        </Link>

        {/* Wide screens: links in the bar. Suspense shows the plain list for
            the instant before the current address is known. */}
        <nav aria-label="Main" className="hidden lg:block">
          <Suspense fallback={<NavLinkList links={links} layout="bar" />}>
            <MarketingNavLinks links={links} layout="bar" />
          </Suspense>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle variant="icon" />

          {/* The wrapper does the hiding on phones, so the button's own classes are never contradicted. */}
          <div className="hidden sm:block">
            <Link href="/dashboard" className={cta}>
              Open the demo
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </Link>
          </div>

          {/* Narrower screens: <details> is the browser's own open/close
              element, so the menu works with no JavaScript. It fades in and out. */}
          <details className="relative lg:hidden details-content:opacity-0 details-content:transition-[opacity,content-visibility] details-content:transition-discrete details-content:duration-200 open:details-content:opacity-100 motion-reduce:details-content:transition-none">
            <summary className="flex h-10 cursor-pointer list-none items-center rounded-full border border-line px-4 text-sm font-medium [&::-webkit-details-marker]:hidden">
              Menu
            </summary>
            <nav aria-label="Main" className="absolute top-full right-0 z-10 mt-3 w-64 rounded-panel border border-line bg-panel p-3 shadow-xl">
              <Suspense fallback={<NavLinkList links={links} layout="list" />}>
                <MarketingNavLinks links={links} layout="list" />
              </Suspense>
              <div className="mt-3 grid sm:hidden">
                <Link href="/dashboard" className={cta}>
                  Open the demo
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
