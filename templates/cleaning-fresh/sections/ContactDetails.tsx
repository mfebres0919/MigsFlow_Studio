import { editable } from "@/templates/editable";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { CleaningContent } from "@/templates/cleaning-fresh/content";
import { phoneHref } from "@/templates/cleaning-fresh/helpers";

type ContactDetailsProps = {
  site: CleaningContent["site"];
};

const link = "font-semibold text-(--brand-text) underline underline-offset-4";
const icon = "mt-1 size-5 shrink-0 text-(--brand-text)";

// Phone, email, service area and opening hours, beside the quote form.
export default function ContactDetails({ site }: ContactDetailsProps) {
  const { contact, hours } = site;

  return (
    <div className="grid content-start gap-6 text-slate-800">
      <h2 className="font-(family-name:--font-heading) text-2xl font-bold text-slate-900">Contact us directly</h2>
      <p className="flex gap-3">
        <Phone aria-hidden="true" className={icon} />
        <a href={phoneHref(contact.phone)} className={link} {...editable("site", "contact", "phone")}>{contact.phone}</a>
      </p>
      <p className="flex gap-3">
        <Mail aria-hidden="true" className={icon} />
        <a href={`mailto:${contact.email}`} className={`${link} break-all`} {...editable("site", "contact", "email")}>{contact.email}</a>
      </p>
      <p className="flex gap-3">
        <MapPin aria-hidden="true" className={icon} />
        <span {...editable("site", "contact", "area")}>{contact.area}</span>
      </p>

      {hours.items.length > 0 && (
        <div className="flex gap-3">
          <Clock aria-hidden="true" className={icon} />
          <div className="flex-1">
            <h3 className="font-bold text-slate-900">Opening hours</h3>
            <dl className="mt-2 grid gap-1.5">
              {hours.items.map((row) => (
                <div key={row.id} className="flex flex-wrap justify-between gap-x-6">
                  <dt {...editable("site", "hours", "items", row.id, "days")}>{row.days}</dt>
                  <dd {...editable("site", "hours", "items", row.id, "hours")} className="font-semibold">{row.hours}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}
