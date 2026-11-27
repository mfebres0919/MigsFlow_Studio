"use client"; // usePathname and the open/close menu only work in the browser-side part of React

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { industries } from "@/lib/industries";

// The links in the public header, with the current page marked
// (Miguelle, 2026-11-27: "consolidate it"): "All templates", which opens a
// small menu of the template types, and "Pricing".
//
// Kept as its own small client component so the rest of the header can stay
// on the server.

export type NavLink = { href: string; label: string };

/** "All templates" first, then one link per template type. Adding an industry adds a link. */
export const templateLinks: NavLink[] = [
  { href: "/templates", label: "All templates" },
  ...industries.map((industry) => ({ href: `/templates/industry/${industry.slug}`, label: industry.label })),
];

const pricing: NavLink = { href: "/pricing", label: "Pricing" };

const linkClass =
  "block px-3.5 py-2 text-sm font-medium text-fg-muted transition-colors hover:text-fg aria-[current=page]:bg-raised aria-[current=page]:text-fg";

function isCurrent(href: string, pathname: string | null) {
  if (!pathname) return false;
  // "All templates" is current on the marketplace and on a single template's page,
  // but not on an industry page, which has its own link.
  if (href === "/templates") return pathname === href || (pathname.startsWith("/templates/") && !pathname.startsWith("/templates/industry/"));
  return pathname === href;
}

/**
 * Wide screens: "All templates" is a button that opens a small menu under it.
 *
 * It closes when a link is chosen, on Escape (the cursor goes back to the
 * button), on a click anywhere else, or when the Tab key moves past it.
 * aria-expanded tells screen readers whether it is open.
 */
function TemplatesMenu({ pathname }: { pathname: string | null }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const wrapper = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const inTemplates = pathname?.startsWith("/templates") ?? false;

  // Listen for outside clicks and Escape only while the menu is open.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={wrapper}
      className="relative"
      // The cursor left the menu with Tab: close it.
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
        // data-current: the same "you are here" look as the links, on any templates page.
        data-current={inTemplates || undefined}
        className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium text-fg-muted transition-colors hover:text-fg data-current:bg-raised data-current:text-fg"
      >
        All templates
        <ChevronDown
          aria-hidden="true"
          className={`size-4 transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Always in the page so it can fade in and out. "invisible" when closed
          also takes its links out of the Tab order and away from screen readers. */}
      <div
        id={menuId}
        className={`absolute top-full left-0 z-10 mt-3 w-60 rounded-panel border border-line bg-panel p-2 shadow-xl transition-[opacity,translate,visibility] duration-200 motion-reduce:transition-none ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <ul role="list" className="grid gap-0.5">
          {templateLinks.map((item, index) => (
            <li key={item.href} className={index === 1 ? "mt-1 border-t border-line pt-1" : undefined}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isCurrent(item.href, pathname) ? "page" : undefined}
                className={`${linkClass} rounded-xl`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

type NavProps = {
  /** "bar" lays the links out in a row (wide screens); "list" stacks them (the Menu on narrower screens). */
  layout: "bar" | "list";
  /** The current address, when known. Left out for the instant before it is (see SiteHeader's Suspense). */
  pathname?: string | null;
};

export function NavLinkList({ layout, pathname = null }: NavProps) {
  if (layout === "bar") {
    return (
      <ul role="list" className="flex items-center gap-1">
        <li>
          <TemplatesMenu pathname={pathname} />
        </li>
        <li>
          <Link href={pricing.href} aria-current={isCurrent(pricing.href, pathname) ? "page" : undefined} className={`${linkClass} rounded-full`}>
            {pricing.label}
          </Link>
        </li>
      </ul>
    );
  }

  // The Menu: every link is already showing, with the template types indented under "All templates".
  const [all, ...types] = templateLinks;
  return (
    <ul role="list" className="grid gap-1">
      <li>
        <Link href={all.href} aria-current={isCurrent(all.href, pathname) ? "page" : undefined} className={`${linkClass} rounded-full`}>
          {all.label}
        </Link>
        <ul role="list" className="mt-1 ml-3.5 grid gap-1 border-l border-line pl-2">
          {types.map((item) => (
            <li key={item.href}>
              <Link href={item.href} aria-current={isCurrent(item.href, pathname) ? "page" : undefined} className={`${linkClass} rounded-full`}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </li>
      <li>
        <Link href={pricing.href} aria-current={isCurrent(pricing.href, pathname) ? "page" : undefined} className={`${linkClass} rounded-full`}>
          {pricing.label}
        </Link>
      </li>
    </ul>
  );
}

export default function MarketingNavLinks({ layout }: Pick<NavProps, "layout">) {
  return <NavLinkList layout={layout} pathname={usePathname()} />;
}
