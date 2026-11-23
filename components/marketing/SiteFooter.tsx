import Link from "next/link";
import CurrentYear from "@/components/marketing/CurrentYear";
import DemoLabel from "@/components/ui/DemoLabel";
import { industries } from "@/lib/industries";
import { site } from "@/lib/site";

// The footer on every public page.

const link = "text-fg-muted underline-offset-4 hover:text-fg hover:underline";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-panel">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-[2fr_1fr_1fr] sm:px-6">
        <div>
          <p className="font-display text-base font-semibold tracking-wide">{site.name}</p>
          <p className="mt-2 max-w-sm text-fg-muted">
            Website templates for small businesses. Pick one, make it yours, and publish it.
          </p>
          <div className="mt-4">
            <DemoLabel>Prototype: nothing here is for sale yet</DemoLabel>
          </div>
        </div>

        <nav aria-labelledby="footer-templates">
          <h2 id="footer-templates" className="font-semibold">
            Templates
          </h2>
          <ul role="list" className="mt-3 grid gap-2">
            <li>
              <Link href="/templates" className={link}>
                All templates
              </Link>
            </li>
            {industries.map((industry) => (
              <li key={industry.slug}>
                <Link href={`/templates/industry/${industry.slug}`} className={link}>
                  {industry.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-studio">
          <h2 id="footer-studio" className="font-semibold">
            Studio
          </h2>
          <ul role="list" className="mt-3 grid gap-2">
            <li>
              <Link href="/dashboard" className={link}>
                Demo dashboard
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-5 text-sm text-fg-muted sm:px-6">
          © <CurrentYear /> {site.name}
        </p>
      </div>
    </footer>
  );
}
