import { editable } from "@/templates/editable";
import type { LinkValue, TemplateHost } from "@/templates/types";
import TemplateLink from "@/templates/cleaning-fresh/TemplateLink";
import { container } from "@/templates/cleaning-fresh/styles";

type CallToActionProps = {
  cta: { heading: string; text: string; button: LinkValue };
  /** Which page this banner is on ("home" or "services"), so its fields can be addressed. */
  pageKey: string;
  host: TemplateHost;
};

// The closing banner in the brand color. Its text uses --on-brand, so it
// stays readable whatever color the customer picks.
export default function CallToAction({ cta, pageKey, host }: CallToActionProps) {
  return (
    <section className={`${container} pb-14 md:pb-20`}>
      <div className="flex flex-wrap items-center justify-between gap-6 rounded-4xl bg-(--brand) px-6 py-10 text-(--on-brand) sm:px-10 md:py-14">
        <div className="max-w-xl">
          <h2 {...editable(pageKey, "cta", "heading")} className="font-(family-name:--font-heading) text-3xl font-bold tracking-tight sm:text-4xl">{cta.heading}</h2>
          <p {...editable(pageKey, "cta", "text")} className="mt-3 text-lg">{cta.text}</p>
        </div>
        <TemplateLink
          href={cta.button.href}
          host={host}
          edit={[pageKey, "cta", "button"]}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-base font-bold text-slate-900 transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
        >
          {cta.button.label}
        </TemplateLink>
      </div>
    </section>
  );
}
