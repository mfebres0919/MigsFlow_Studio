import type { CSSProperties } from "react";
import { readableOnWhite, safeHex, textOn } from "@/templates/color";
import { editable, editableInForm } from "@/templates/editable";
import { getFontPair } from "@/templates/fonts";
import type { TemplateHost, TemplateRenderProps } from "@/templates/types";
import type { BasicContent } from "@/templates/basic/content";
import type { BasicWords } from "@/templates/basic/schema";

// The design shared by Claude's basic templates: one page with a header, a
// hero, a list of services (or programs), an about section, a contact form
// and a footer. Two looks for the hero:
// - "split": words on the left, the photo on the right;
// - "banner": the photo fills the hero, with the words on top of it.
//
// Like Fresh Start, it uses only its own colors (white, slate and the
// customer's brand color), never Studio's, so Studio's light or dark mode
// never changes a customer's website.

export type BasicLayout = "split" | "banner";

const container = "mx-auto w-full max-w-6xl px-4 sm:px-6";
const heading = "font-(family-name:--font-heading) font-bold tracking-tight";
const button =
  "inline-flex min-h-12 items-center justify-center rounded-lg px-6 font-bold transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2";

/** A link that asks the host for its real address, so it works in the preview and on a finished site. */
function SiteLink({ href, host, className, edit, children }: { href: string; host: TemplateHost; className?: string; edit?: string[]; children: React.ReactNode }) {
  return (
    <a
      href={host.hrefFor(href)}
      onClick={host.onNavigate ? (event) => host.onNavigate?.(href, event) : undefined}
      className={className}
      {...(edit ? editable(...edit) : {})}
    >
      {children}
    </a>
  );
}

/** Makes a basic template's drawing function for one layout and one set of words. */
export function makeBasicTemplate(layout: BasicLayout, words: BasicWords) {
  return function BasicTemplate({ content, host }: TemplateRenderProps) {
    // Safe: content is checked against the schema before it reaches a template.
    const { site, pages } = content as unknown as BasicContent;
    const home = pages.home;
    const brand = safeHex(site.brand.color, "#2563eb");
    const fonts = getFontPair(site.brand.fonts);
    const style = {
      "--brand": brand,
      "--on-brand": textOn(brand),
      "--brand-text": readableOnWhite(brand),
      "--font-heading": fonts.heading,
      "--font-body": fonts.body,
    } as CSSProperties;

    const menu = [
      { href: "#services", label: words.services },
      { href: "#about", label: "About" },
      { href: "#contact", label: "Contact" },
    ];
    const banner = layout === "banner";

    return (
      <div style={style} className="scheme-light flex min-h-dvh flex-col bg-white font-(family-name:--font-body) text-slate-800">
        <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2">
          Skip to main content
        </a>

        <header className="border-b border-slate-200 bg-white">
          <div className={`${container} flex flex-wrap items-center justify-between gap-4 py-4`}>
            <p {...editable("site", "business", "name")} className={`${heading} text-xl text-slate-900`}>
              {site.business.name}
            </p>
            <nav aria-label="Main">
              <ul className="flex flex-wrap gap-x-6 gap-y-1 text-sm font-semibold">
                {menu.map((item) => (
                  <li key={item.href}>
                    <SiteLink href={item.href} host={host} className="hover:text-(--brand-text)">
                      {item.label}
                    </SiteLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        <main id="content" className="flex-1">
          {/* The hero. */}
          {banner ? (
            <section className="relative isolate overflow-hidden">
              {home.hero.image.src && (
                <img {...editable("home", "hero", "image")} src={home.hero.image.src} alt={home.hero.image.alt} className="absolute inset-0 -z-10 size-full object-cover" />
              )}
              {/* A dark layer over the photo keeps the white words readable on any picture. */}
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-slate-950/65" />
              <div className={`${container} py-24 text-center text-white md:py-36`}>
                <h1 {...editable("home", "hero", "heading")} className={`${heading} mx-auto max-w-3xl text-4xl text-balance sm:text-6xl`}>
                  {home.hero.heading}
                </h1>
                <p {...editable("home", "hero", "text")} className="mx-auto mt-5 max-w-2xl text-lg text-white/90">
                  {home.hero.text}
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <SiteLink href={home.hero.primaryButton.href} host={host} edit={["home", "hero", "primaryButton"]} className={`${button} bg-(--brand) text-(--on-brand) focus-visible:outline-white`}>
                    {home.hero.primaryButton.label}
                  </SiteLink>
                  <SiteLink href={home.hero.secondaryButton.href} host={host} edit={["home", "hero", "secondaryButton"]} className={`${button} border-2 border-white text-white focus-visible:outline-white`}>
                    {home.hero.secondaryButton.label}
                  </SiteLink>
                </div>
              </div>
            </section>
          ) : (
            <section className={`${container} grid items-center gap-10 py-14 md:py-20 lg:grid-cols-2`}>
              <div>
                <h1 {...editable("home", "hero", "heading")} className={`${heading} text-4xl text-balance text-slate-900 sm:text-5xl`}>
                  {home.hero.heading}
                </h1>
                <p {...editable("home", "hero", "text")} className="mt-5 max-w-xl text-lg text-slate-700">
                  {home.hero.text}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <SiteLink href={home.hero.primaryButton.href} host={host} edit={["home", "hero", "primaryButton"]} className={`${button} bg-(--brand) text-(--on-brand) focus-visible:outline-slate-900`}>
                    {home.hero.primaryButton.label}
                  </SiteLink>
                  <SiteLink href={home.hero.secondaryButton.href} host={host} edit={["home", "hero", "secondaryButton"]} className={`${button} border-2 border-slate-300 text-slate-800 focus-visible:outline-slate-900`}>
                    {home.hero.secondaryButton.label}
                  </SiteLink>
                </div>
              </div>
              {home.hero.image.src ? (
                <img {...editable("home", "hero", "image")} src={home.hero.image.src} alt={home.hero.image.alt} width={1200} height={900} className="aspect-4/3 w-full rounded-2xl object-cover" />
              ) : (
                <div {...editable("home", "hero", "image")} className="aspect-4/3 w-full rounded-2xl bg-slate-100" />
              )}
            </section>
          )}

          {/* Services (or programs). */}
          <section id="services" aria-labelledby="services-title" className="scroll-mt-4 bg-slate-50 py-16 md:py-20">
            <div className={container}>
              <h2 id="services-title" {...editable("home", "services", "heading")} className={`${heading} text-3xl text-slate-900`}>
                {home.services.heading}
              </h2>
              <p {...editable("home", "services", "text")} className="mt-3 max-w-2xl text-slate-700">
                {home.services.text}
              </p>
              <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {home.services.items.map((item) => (
                  <li key={item.id} className="rounded-xl border border-slate-200 bg-white p-6">
                    <div aria-hidden="true" className="mb-4 h-1.5 w-10 rounded-full bg-(--brand)" />
                    <h3 {...editable("home", "services", "items", item.id, "name")} className={`${heading} text-lg text-slate-900`}>
                      {item.name}
                    </h3>
                    <p {...editable("home", "services", "items", item.id, "description")} className="mt-2 text-slate-700">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* About. */}
          <section id="about" aria-labelledby="about-title" className={`${container} scroll-mt-4 py-16 md:py-20`}>
            <div className="max-w-3xl border-l-4 border-(--brand) pl-6">
              <h2 id="about-title" {...editable("home", "about", "heading")} className={`${heading} text-3xl text-slate-900`}>
                {home.about.heading}
              </h2>
              <p {...editable("home", "about", "text")} className="mt-4 text-lg text-slate-700">
                {home.about.text}
              </p>
            </div>
          </section>

          {/* Contact: the details on one side, a short form on the other. */}
          <section id="contact" aria-labelledby="contact-title" className="scroll-mt-4 bg-slate-900 py-16 text-white md:py-20">
            <div className={`${container} grid gap-10 lg:grid-cols-2`}>
              <div>
                <h2 id="contact-title" {...editable("home", "contact", "heading")} className={`${heading} text-3xl`}>
                  {home.contact.heading}
                </h2>
                <p {...editable("home", "contact", "text")} className="mt-3 text-white/85">
                  {home.contact.text}
                </p>
                <ul className="mt-6 grid gap-2">
                  <li>
                    <a href={`tel:${site.contact.phone.replace(/[^\d+]/g, "")}`} className="font-semibold underline-offset-4 hover:underline" {...editable("site", "contact", "phone")}>
                      {site.contact.phone}
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${site.contact.email}`} className="underline-offset-4 hover:underline" {...editable("site", "contact", "email")}>
                      {site.contact.email}
                    </a>
                  </li>
                  <li {...editable("site", "contact", "area")} className="text-white/85">
                    {site.contact.area}
                  </li>
                </ul>
              </div>
              <form onSubmit={host.onFormSubmit} className="grid gap-4 rounded-xl bg-white p-6 text-slate-800">
                <label className="grid gap-1.5 text-sm font-semibold">
                  Your name
                  <input name="name" autoComplete="name" required className="min-h-11 rounded-lg border border-slate-400 px-3 font-normal" />
                </label>
                <label className="grid gap-1.5 text-sm font-semibold">
                  Email or phone
                  <input name="reply" autoComplete="email" required className="min-h-11 rounded-lg border border-slate-400 px-3 font-normal" />
                </label>
                <label className="grid gap-1.5 text-sm font-semibold">
                  Message
                  <textarea name="message" rows={4} className="rounded-lg border border-slate-400 px-3 py-2 font-normal" />
                </label>
                <button type="submit" className={`${button} bg-(--brand) text-(--on-brand) focus-visible:outline-slate-900`}>
                  <span {...editableInForm("home", "contact", "buttonLabel")}>{home.contact.buttonLabel}</span>
                </button>
              </form>
            </div>
          </section>
        </main>

        <footer className="border-t border-slate-200 py-8 text-sm text-slate-600">
          <div className={`${container} flex flex-wrap justify-between gap-3`}>
            <p {...editable("site", "business", "tagline")}>{site.business.tagline}</p>
            <p>
              © {new Date().getFullYear()} {site.business.name}
            </p>
          </div>
        </footer>
      </div>
    );
  };
}
