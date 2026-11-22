import type { TemplateHost } from "@/templates/types";
import { editable } from "@/templates/editable";

// Every link inside the template goes through this. It asks the host for the
// real address, so the same template works inside Studio's preview (which
// switches pages without leaving) and as a finished website (plain links).
//
// It is a plain <a>, not Next.js's <Link>: a published website has no Next.js.

type TemplateLinkProps = {
  href: string;
  host: TemplateHost;
  className?: string;
  /** Marks the menu link for the page being viewed. */
  current?: boolean;
  /** For a button whose words are customer content: the field's address, e.g. ["home", "hero", "primaryButton"]. */
  edit?: string[];
  children: React.ReactNode;
};

export default function TemplateLink({ href, host, className, current, edit, children }: TemplateLinkProps) {
  const { onNavigate } = host;
  return (
    <a
      href={host.hrefFor(href)}
      onClick={onNavigate ? (event) => onNavigate(href, event) : undefined}
      aria-current={current ? "page" : undefined}
      className={className}
      {...(edit ? editable(...edit) : {})}
    >
      {children}
    </a>
  );
}
