import { editable } from "@/templates/editable";
import type { CleaningContent } from "@/templates/cleaning-fresh/content";

type ServiceCardsProps = {
  services: CleaningContent["site"]["services"]["items"];
  /** "h2" on the services page, "h3" on the home page where a heading sits above the cards. */
  headingLevel: "h2" | "h3";
};

// A grid of service cards. Used on the home page (first three) and the services page (all).
export default function ServiceCards({ services, headingLevel: Heading }: ServiceCardsProps) {
  return (
    <ul role="list" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <li key={service.id} className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6">
          <Heading {...editable("site", "services", "items", service.id, "name")} className="font-(family-name:--font-heading) text-xl font-bold text-slate-900">{service.name}</Heading>
          <p {...editable("site", "services", "items", service.id, "description")} className="mt-2 flex-1 text-slate-700">{service.description}</p>
          {service.price && <p {...editable("site", "services", "items", service.id, "price")} className="mt-5 font-bold text-(--brand-text)">{service.price}</p>}
        </li>
      ))}
    </ul>
  );
}
