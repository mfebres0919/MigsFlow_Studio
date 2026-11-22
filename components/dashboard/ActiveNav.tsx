"use client"; // usePathname only works in the browser-side part of React

import { usePathname } from "next/navigation";
import NavList from "@/components/dashboard/NavList";

// Reads the current address and passes it to NavList so the right link is
// highlighted. This is the only part of the sidebar that needs "use client";
// keeping it this small keeps the JavaScript sent to the browser small.
// (Vanilla version: compare location.pathname to each link's href on load.)
export default function ActiveNav() {
  const pathname = usePathname();
  return <NavList pathname={pathname} />;
}
