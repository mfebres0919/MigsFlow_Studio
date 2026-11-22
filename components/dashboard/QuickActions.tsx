import Link from "next/link";
import { Globe, Images, PanelsTopLeft, type LucideIcon } from "lucide-react";

// Shortcuts to the things a customer does most, as a row of three tiles.

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
    // One column on phones, three across from 640px.
    <ul role="list" className="grid gap-3 sm:grid-cols-3">
      {actions.map(({ href, label, hint, icon: Icon }) => (
        <li key={href} className="grid">
          <Link
            href={href}
            className="flex gap-3 rounded-control border border-line p-4 transition-colors hover:border-line-strong hover:bg-raised sm:flex-col"
          >
            <Icon aria-hidden="true" className="size-6 shrink-0 text-signal" />
            <span>
              <span className="block font-medium">{label}</span>
              <span className="mt-0.5 block text-sm text-fg-muted">{hint}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
