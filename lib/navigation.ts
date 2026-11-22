import {
  CreditCard,
  Globe,
  Images,
  LayoutDashboard,
  PanelsTopLeft,
  Rocket,
  Settings,
  type LucideIcon,
} from "lucide-react";

// The dashboard's menu, written once. The sidebar and the phone drawer both
// read this list, so adding a page here adds it to both.
export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/websites", label: "My websites", icon: PanelsTopLeft },
  { href: "/dashboard/media", label: "Media library", icon: Images },
  { href: "/dashboard/domains", label: "Domains", icon: Globe },
  { href: "/dashboard/publishing", label: "Hosting & publishing", icon: Rocket },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { href: "/dashboard/settings", label: "Account settings", icon: Settings },
];
