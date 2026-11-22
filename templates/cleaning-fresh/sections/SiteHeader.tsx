import { editable } from "@/templates/editable";
import type { TemplateHost } from "@/templates/types";
import type { CleaningContent } from "@/templates/cleaning-fresh/content";
import TemplateLink from "@/templates/cleaning-fresh/TemplateLink";
import { buttonPrimary, container } from "@/templates/cleaning-fresh/styles";
import { phoneHref } from "@/templates/cleaning-fresh/helpers";

type SiteHeaderProps = {
  site: CleaningContent["site"];
  pages: { key: string; label: string; path: string }[];
  pageKey: string;
  host: TemplateHost;
};

// The top bar: logo or business name, the menu, and a tap-to-call button.
export default function SiteHeader({ site, pages, pageKey, host }: SiteHeaderProps) {
  const { business, contact } = site;

  const menu = pages.map((page) => (
    <li key={page.key}>
      <TemplateLink
        href={page.path}
        host={host}
        current={page.key === pageKey}
        className="block rounded-lg px-3 py-2 font-semibold text-slate-700 hover:text-slate-950 aria-[current=page]:text-(--brand-text) aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8"
      >
        {page.label}
      </TemplateLink>
    </li>
  ));

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className={`${container} flex items-center justify-between gap-4 py-4`}>
        <TemplateLink href="/" host={host} className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900">
          {business.logo.src ? (
            <img src={business.logo.src} alt={business.logo.alt || business.name} className="h-10 w-auto" {...editable("site", "business", "logo")} />
          ) : (
            <span {...editable("site", "business", "name")} className="font-(family-name:--font-heading) text-xl font-extrabold tracking-tight text-(--brand-text)">
              {business.name}
            </span>
          )}
        </TemplateLink>

        {/* Wide screens: the menu sits in the bar. */}
        <nav aria-label="Main" className="hidden md:block">
          <ul role="list" className="flex items-center gap-2">
            {menu}
          </ul>
        </nav>
        {/* The wrapper does the hiding, so the button's own classes are never contradicted. */}
        <div className="hidden md:block">
          <a href={phoneHref(contact.phone)} className={buttonPrimary}>
            {/* Only the number is customer content, so only the number is marked. */}
            Call&nbsp;<span {...editable("site", "contact", "phone")}>{contact.phone}</span>
          </a>
        </div>

        {/* Phones: <details> is the browser's own open/close element, so the
            menu works with no JavaScript at all on the finished website. */}
        {/* details-content: styles the part of <details> that opens and closes.
            The menu fades in and out over a fifth of a second; "transition-discrete"
            keeps it drawn while it fades out. No animation for reduced motion,
            and browsers without this feature just show and hide it. */}
        <details className="relative md:hidden details-content:opacity-0 details-content:transition-[opacity,content-visibility] details-content:transition-discrete details-content:duration-200 open:details-content:opacity-100 motion-reduce:details-content:transition-none">
          <summary className="flex min-h-11 cursor-pointer list-none items-center rounded-full border-2 border-slate-300 px-4 font-bold text-slate-800 [&::-webkit-details-marker]:hidden">
            Menu
          </summary>
          <nav aria-label="Main" className="absolute top-full right-0 z-10 mt-2 w-60 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
            <ul role="list" className="grid gap-1">
              {menu}
            </ul>
            <a href={phoneHref(contact.phone)} className={`${buttonPrimary} mt-3 w-full`}>
              Call&nbsp;<span {...editable("site", "contact", "phone")}>{contact.phone}</span>
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}
