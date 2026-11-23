import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import mark from "@/public/images/brand/migsflow-mark.svg";
import CurrentYear from "@/components/marketing/CurrentYear";
import StarField from "@/components/marketing/StarField";
import DemoLabel from "@/components/ui/DemoLabel";
import { industries } from "@/lib/industries";
import { site } from "@/lib/site";

// The footer on every public page. It follows the footer of migsflow.com
// (Miguelle, 2026-11-23: "an extension of each other"): brand, a short line
// and round social buttons on the left, link columns on the right, then a
// giant line of Orbitron with a round gradient "bubble" button over it, all
// over the same twinkling stars. The words are Studio's own.

type FooterLink = { href: string; label: string; external?: boolean };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Templates",
    links: [
      { href: "/templates", label: "All templates" },
      ...industries.map((industry) => ({ href: `/templates/industry/${industry.slug}`, label: industry.label })),
    ],
  },
  {
    title: "Studio",
    links: [
      { href: "/", label: "Home" },
      { href: "/dashboard", label: "Demo dashboard" },
      { href: "/dashboard/websites", label: "Try the editor" },
    ],
  },
  {
    title: "MigsFlow",
    links: [
      { href: "https://migsflow.com", label: "Custom websites", external: true },
      { href: "https://migsflow.com/pricing/", label: "Pricing", external: true },
      { href: "https://migsflow.com/contact/", label: "Contact", external: true },
    ],
  },
];

// The same two accounts as the main site's footer. The icons are the main site's own drawings.
const socials = [
  {
    href: "https://www.instagram.com/migsflow.web/",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-4.5">
        <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Z" stroke="currentColor" strokeWidth="2" />
        <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="2" />
        <path d="M17.2 6.8h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "https://www.tiktok.com/@migs.flow",
    label: "TikTok",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-4.5">
        <path d="M16.5 3c.3 2.2 1.5 3.6 3.5 3.9v2.6c-1.3.1-2.5-.3-3.5-1v5.9a5.2 5.2 0 1 1-5.2-5.2c.3 0 .5 0 .8.1v2.7a2.5 2.5 0 1 0 1.7 2.4V3h2.7Z" fill="currentColor" />
      </svg>
    ),
  },
];

const linkClass =
  "inline-flex items-center gap-1.5 text-sm text-fg-muted transition-[color,translate] hover:translate-x-0.5 hover:text-fg motion-reduce:transition-none";

export default function SiteFooter() {
  return (
    <footer data-pause-offscreen className="relative isolate overflow-clip px-4 pt-20 pb-8 sm:px-6 sm:pt-24">
      <StarField count={18} />
      {/* A thin line of light across the top, fading out at both ends. */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-signal/40 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_auto]">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image src={mark} alt="" width={36} height={36} />
              <span className="font-display text-lg font-semibold tracking-wide">{site.name}</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-fg-muted">
              Professionally designed website templates for small businesses. Pick one, make it yours, and publish it.
              From the team at MigsFlow Web Design.
            </p>
            <ul role="list" className="mt-5 flex gap-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener"
                    className="grid size-11 place-items-center rounded-full border border-line bg-panel text-fg-muted shadow-lg shadow-accent/10 transition-[translate,color,border-color] hover:-translate-y-0.5 hover:border-signal/50 hover:text-fg motion-reduce:transition-none"
                  >
                    {social.icon}
                    <span className="sr-only">{social.label} (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-3 lg:gap-x-16">
            {columns.map((column) => (
              <nav key={column.title} aria-labelledby={`footer-${column.title}`}>
                <h2 id={`footer-${column.title}`} className="font-medium">
                  {column.title}
                </h2>
                <ul role="list" className="mt-4 grid gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      {link.external ? (
                        <a href={link.href} target="_blank" rel="noopener" className={linkClass}>
                          {link.label}
                          <ArrowUpRight aria-hidden="true" className="size-3.5" />
                          <span className="sr-only"> (opens migsflow.com in a new tab)</span>
                        </a>
                      ) : (
                        <Link href={link.href} className={linkClass}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* The giant line and the bubble (the main site's "LET'S COLLABORATE").
            On wide screens the bubble sits on top of the words; on phones it
            sits under them. */}
        <div className="relative mt-16 grid place-items-center py-8 sm:mt-20 sm:py-14">
          <p
            aria-hidden="true"
            className="text-center font-display text-[clamp(2.4rem,9vw,5.25rem)] leading-none font-medium tracking-tight uppercase sm:whitespace-nowrap"
          >
            Let&rsquo;s build yours
          </p>
          <Link
            href="/templates"
            className="bg-brand-gradient mt-8 grid size-36 place-items-center rounded-full border border-white/20 text-center font-display text-sm tracking-wide text-white uppercase shadow-[0_24px_50px_rgb(30_64_175/0.3),0_0_60px_rgb(24_201_255/0.2)] transition-transform hover:-translate-y-2 hover:scale-[1.02] motion-reduce:transition-none sm:absolute sm:top-1/2 sm:left-1/2 sm:mt-0 sm:size-[clamp(9.5rem,17vw,13rem)] sm:-translate-1/2 sm:text-base sm:hover:translate-y-[-60%] dark:shadow-[0_30px_70px_rgb(0_0_0/0.55),0_0_70px_rgb(24_201_255/0.18)]"
          >
            Browse
            <br />
            templates
          </Link>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 text-center text-sm text-fg-muted sm:mt-14">
          <DemoLabel>Prototype: nothing here is for sale yet</DemoLabel>
          <p>
            © <CurrentYear /> {site.name} · A MigsFlow Web Design product
          </p>
        </div>
      </div>
    </footer>
  );
}
