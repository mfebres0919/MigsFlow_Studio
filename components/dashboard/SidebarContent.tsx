import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { LogOut } from "lucide-react";
import mark from "@/public/images/brand/migsflow-mark.svg";
import ActiveNav from "@/components/dashboard/ActiveNav";
import NavList from "@/components/dashboard/NavList";
import DemoLabel from "@/components/ui/DemoLabel";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { getCurrentCustomer } from "@/lib/data/customer";
import { initials } from "@/lib/format";
import { site } from "@/lib/site";

// Everything inside the sidebar: brand, menu, and who is signed in.
// It is used twice: in the fixed sidebar on wide screens and inside the
// slide-out drawer on phones.
//
// This is a Server Component (no "use client"), so it may be "async" and
// wait for data before it draws. The customer comes through lib/data, never
// straight from the mock files.
export default async function SidebarContent() {
  const customer = await getCurrentCustomer();

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <Link href="/dashboard" className="flex items-center gap-3 rounded-control px-2 py-1">
        <Image src={mark} alt="" width={32} height={32} />
        <span className="font-display text-base font-semibold tracking-wide">{site.name}</span>
      </Link>

      <nav aria-label="Dashboard" className="flex-1 overflow-y-auto">
        {/* Suspense shows the "fallback" (the menu with nothing highlighted) for
            the instant before the current address is known, then swaps in the
            highlighted one. Next.js needs this on pages whose address is only
            known when someone visits, like one website's editor. */}
        <Suspense fallback={<NavList pathname={null} />}>
          <ActiveNav />
        </Suspense>
      </nav>

      <ThemeToggle />

      {/* The way back out of the demo to Studio's public website (Miguelle, 2026-11-23). */}
      <Link
        href="/"
        className="flex min-h-11 items-center gap-3 rounded-control px-3 font-medium text-fg-muted transition-colors hover:bg-raised hover:text-fg"
      >
        <LogOut aria-hidden="true" className="size-5 shrink-0" />
        Exit the demo
      </Link>

      <div className="rounded-panel border border-line p-3">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-raised font-semibold text-signal"
          >
            {initials(customer.name)}
          </span>
          <div className="min-w-0">
            <p className="truncate font-medium">{customer.name}</p>
            {/* A long business name wraps onto a second line instead of being cut off. */}
            <p className="text-sm break-words text-fg-muted">{customer.businessName}</p>
          </div>
        </div>
        <div className="mt-3">
          <DemoLabel>Sample account</DemoLabel>
        </div>
      </div>
    </div>
  );
}
