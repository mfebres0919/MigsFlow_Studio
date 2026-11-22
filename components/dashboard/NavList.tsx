import Link from "next/link";
import { navItems } from "@/lib/navigation";

// The list of dashboard links. It is told the current address and marks the
// matching link as "you are here".

type NavListProps = {
  /** The current address, e.g. "/dashboard/billing". null = not known yet. */
  pathname: string | null;
};

function isCurrent(href: string, pathname: string | null): boolean {
  if (!pathname) return false;
  // Overview must match exactly, or it would light up on every dashboard page.
  if (href === "/dashboard") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function NavList({ pathname }: NavListProps) {
  return (
    // role="list" keeps VoiceOver announcing this as a list after Tailwind removes the bullets.
    <ul role="list" className="grid gap-1">
      {navItems.map(({ href, label, icon: Icon }) => {
        const current = isCurrent(href, pathname);
        return (
          <li key={href}>
            <Link
              href={href}
              // aria-current tells screen readers which page is open.
              aria-current={current ? "page" : undefined}
              className={`relative flex min-h-11 items-center gap-3 rounded-control px-3 font-medium transition-colors ${
                current
                  ? "bg-raised text-fg before:absolute before:inset-y-2.5 before:left-0 before:w-1 before:rounded-full before:bg-linear-to-b before:from-signal before:to-accent"
                  : "text-fg-muted hover:bg-raised hover:text-fg"
              }`}
            >
              <Icon aria-hidden="true" className={`size-5 shrink-0 ${current ? "text-signal" : ""}`} />
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
