import { editable } from "@/templates/editable";
import type { TemplateHost } from "@/templates/types";
import type { CleaningContent } from "@/templates/cleaning-fresh/content";
import TemplateLink from "@/templates/cleaning-fresh/TemplateLink";
import { container } from "@/templates/cleaning-fresh/styles";
import { phoneHref } from "@/templates/cleaning-fresh/helpers";

type SiteFooterProps = {
  site: CleaningContent["site"];
  pages: { key: string; label: string; path: string }[];
  host: TemplateHost;
};

const link = "underline-offset-4 hover:underline";

// The bottom of every page: name, contact details, menu and social links.
export default function SiteFooter({ site, pages, host }: SiteFooterProps) {
  const { business, contact, social } = site;
  // Only the social links that were filled in.
  const socials = [
    { label: "Facebook", url: social.facebook, key: "facebook" },
    { label: "Instagram", url: social.instagram, key: "instagram" },
  ].filter((item) => item.url);

  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className={`${container} grid gap-10 py-12 md:grid-cols-3`}>
        <div>
          <p {...editable("site", "business", "name")} className="font-(family-name:--font-heading) text-xl font-extrabold text-white">{business.name}</p>
          <p {...editable("site", "business", "tagline")} className="mt-2">{business.tagline}</p>
        </div>

        <div className="grid content-start gap-2">
          <a href={phoneHref(contact.phone)} className={link} {...editable("site", "contact", "phone")}>{contact.phone}</a>
          <a href={`mailto:${contact.email}`} className={`${link} break-all`} {...editable("site", "contact", "email")}>{contact.email}</a>
          <p {...editable("site", "contact", "area")}>{contact.area}</p>
        </div>

        <nav aria-label="Footer">
          <ul role="list" className="grid gap-2">
            {pages.map((page) => (
              <li key={page.key}>
                <TemplateLink href={page.path} host={host} className={link}>{page.label}</TemplateLink>
              </li>
            ))}
            {socials.map((item) => (
              <li key={item.label}>
                <a href={item.url} target="_blank" rel="noopener" className={link} {...editable("site", "social", item.key)}>
                  {item.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-slate-700">
        <p className={`${container} py-5 text-sm text-slate-300`}>
          © {new Date().getFullYear()} <span {...editable("site", "business", "name")}>{business.name}</span>
        </p>
      </div>
    </footer>
  );
}
