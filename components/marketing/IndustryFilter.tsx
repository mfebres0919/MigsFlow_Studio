import Link from "next/link";
import { industries } from "@/lib/industries";

// The row of industry buttons above the template grid.
//
// Each one is a plain link to that industry's own page, not a button that
// hides cards with JavaScript. So filtering works without any script, every
// industry has an address that can be shared and found by search engines, and
// the pages can all be built ahead of time.

type IndustryFilterProps = {
  /** The industry being shown, or null on the "all templates" page. */
  current: string | null;
};

const pill =
  "inline-flex min-h-10 items-center rounded-full border border-line px-4 font-medium text-fg-muted transition-colors hover:text-fg aria-[current=page]:border-signal aria-[current=page]:bg-raised aria-[current=page]:text-fg";

export default function IndustryFilter({ current }: IndustryFilterProps) {
  return (
    <nav aria-label="Filter templates by industry">
      <ul role="list" className="flex flex-wrap gap-2">
        <li>
          {/* aria-current tells screen readers which filter is showing. */}
          <Link href="/templates" aria-current={current === null ? "page" : undefined} className={pill}>
            All
          </Link>
        </li>
        {industries.map((industry) => (
          <li key={industry.slug}>
            <Link
              href={`/templates/industry/${industry.slug}`}
              aria-current={current === industry.slug ? "page" : undefined}
              className={pill}
            >
              {industry.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
