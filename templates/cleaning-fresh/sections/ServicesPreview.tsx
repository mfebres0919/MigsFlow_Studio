import { editable } from "@/templates/editable";
import type { TemplateHost } from "@/templates/types";
import type { CleaningContent } from "@/templates/cleaning-fresh/content";
import ServiceCards from "@/templates/cleaning-fresh/sections/ServiceCards";
import TemplateLink from "@/templates/cleaning-fresh/TemplateLink";
import { buttonSecondary, container, heading } from "@/templates/cleaning-fresh/styles";

type ServicesPreviewProps = {
  intro: CleaningContent["pages"]["home"]["servicesIntro"];
  services: CleaningContent["site"]["services"]["items"];
  host: TemplateHost;
};

// Home page: a heading, the first three services, and a link to the full list.
export default function ServicesPreview({ intro, services, host }: ServicesPreviewProps) {
  return (
    <section className={`${container} py-14 md:py-20`}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h2 {...editable("home", "servicesIntro", "heading")} className={`${heading} text-3xl sm:text-4xl`}>{intro.heading}</h2>
          <p {...editable("home", "servicesIntro", "text")} className="mt-3 text-lg text-slate-700">{intro.text}</p>
        </div>
        <TemplateLink href={intro.button.href} host={host} className={buttonSecondary} edit={["home", "servicesIntro", "button"]}>
          {intro.button.label}
        </TemplateLink>
      </div>
      <div className="mt-10">
        <ServiceCards services={services.slice(0, 3)} headingLevel="h3" />
      </div>
    </section>
  );
}
