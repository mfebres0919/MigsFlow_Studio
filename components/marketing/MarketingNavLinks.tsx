"use client"; // usePathname only works in the browser-side part of React

import Link from "next/link";
import { usePathname } from "next/navigation";

// The links in the public header, with the current page marked.
// Kept as its own small client component so the rest of the header can stay
// on the server.

export type NavLink = { href: string; label: string };

type MarketingNavLinksProps = {
  links: NavLink[];
  /** "bar" lays them out in a row (wide screens); "list" stacks them (phone menu). */
  layout: "bar" | "list";
  /** The current address, when the caller already knows it. Otherwise it is read here. */
  pathname?: string | null;
};

function isCurrent(href: string, pathname: string | null) {
  if (!pathname) return false;
  // "All templates" is current on the marketplace and on a single template's page,
  // but not on an industry page, which has its own link.
  if (href === "/templates") return pathname === href || (pathname.startsWith("/templates/") && !pathname.startsWith("/templates/industry/"));
  return pathname === href;
}

export function NavLinkList({ links, layout, pathname = null }: MarketingNavLinksProps) {
  return (
    <ul role="list" className={layout === "bar" ? "flex items-center gap-1" : "grid gap-1"}>
      {links.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            aria-current={isCurrent(item.href, pathname) ? "page" : undefined}
            className="block rounded-full px-3.5 py-2 text-sm font-medium text-fg-muted transition-colors hover:text-fg aria-[current=page]:bg-raised aria-[current=page]:text-fg"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function MarketingNavLinks({ links, layout }: MarketingNavLinksProps) {
  return <NavLinkList links={links} layout={layout} pathname={usePathname()} />;
}
