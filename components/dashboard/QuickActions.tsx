import Link from "next/link";
import { ChevronRight, Globe, Images, PanelsTopLeft, type LucideIcon } from "lucide-react";

// Shortcuts to the things a customer does most.

type QuickAction = {
  href: string;
  label: string;
  hint: string;
  icon: LucideIcon;
};

const actions: QuickAction[] = [
  { href: "/dashboard/websites", label: "Edit a website", hint: "Change your text, photos and colors", icon: PanelsTopLeft },
  { href: "/dashboard/media", label: "Upload images", hint: "Add your logo and photos", icon: Images },
  { href: "/dashboard/domains", label: "Connect a domain", hint: "Use your own web address", icon: Globe },
];

export default function QuickActions() {
  return (
    <ul role="list" className="-mx-2 grid">
      {actions.map(({ href, label, hint, icon: Icon }) => (
        <li key={href}>
          <Link
            href={href}
            className="flex items-center gap-3 rounded-control px-2 py-2.5 transition-colors hover:bg-raised"
          >
            <Icon aria-hidden="true" className="size-5 shrink-0 text-signal" />
            <span className="flex-1">
              <span className="block font-medium">{label}</span>
              <span className="block text-sm text-fg-muted">{hint}</span>
            </span>
            <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-fg-muted" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
