import { editable, editableInForm } from "@/templates/editable";
import type { TemplateHost } from "@/templates/types";
import type { CleaningContent } from "@/templates/cleaning-fresh/content";
import { buttonPrimary, heading } from "@/templates/cleaning-fresh/styles";

type QuoteFormProps = {
  form: CleaningContent["pages"]["contact"]["form"];
  services: CleaningContent["site"]["services"]["items"];
  host: TemplateHost;
};

const label = "block font-semibold text-slate-900";
const input =
  "mt-1.5 block min-h-12 w-full rounded-xl border-2 border-slate-400 bg-white px-4 py-2.5 text-base text-slate-900 focus-visible:border-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900";

// The quote request form. Where its messages are delivered is not decided
// yet (see CLAUDE.md, "Forms on customer sites"), so it has no destination.
// Inside Studio's preview the host stops it from sending.
export default function QuoteForm({ form, services, host }: QuoteFormProps) {
  return (
    <form onSubmit={host.onFormSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
      <h2 {...editable("contact", "form", "heading")} className={`${heading} text-2xl sm:text-3xl`}>{form.heading}</h2>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {/* Each <label> is tied to its input by matching htmlFor and id. */}
        <div>
          <label htmlFor="quote-name" className={label}>Your name</label>
          <input id="quote-name" name="name" type="text" autoComplete="name" required className={input} />
        </div>
        <div>
          <label htmlFor="quote-phone" className={label}>Phone number</label>
          <input id="quote-phone" name="phone" type="tel" autoComplete="tel" className={input} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="quote-email" className={label}>Email address</label>
          <input id="quote-email" name="email" type="email" autoComplete="email" required className={input} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="quote-service" className={label}>What do you need?</label>
          <select id="quote-service" name="service" className={input}>
            {services.map((service) => (
              <option key={service.id}>{service.name}</option>
            ))}
            <option>Something else</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="quote-message" className={label}>Tell us about your space</label>
          <textarea id="quote-message" name="message" rows={4} required className={input} />
        </div>
      </div>

      <button type="submit" className={`${buttonPrimary} mt-6 w-full sm:w-auto`}>
        {/* Inside a real <button>, typing in place is unreliable, so a click opens this field in the form instead. */}
        <span {...editableInForm("contact", "form", "buttonLabel")}>{form.buttonLabel}</span>
      </button>
      {form.note && <p {...editable("contact", "form", "note")} className="mt-3 text-sm text-slate-600">{form.note}</p>}
    </form>
  );
}
