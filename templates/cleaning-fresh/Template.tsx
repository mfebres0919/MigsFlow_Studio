import type { CSSProperties } from "react";
import type { TemplateRenderProps } from "@/templates/types";
import { readableOnWhite, safeHex, textOn } from "@/templates/color";
import { getFontPair } from "@/templates/fonts";
import { isHidden } from "@/templates/visibility";
import type { CleaningContent } from "@/templates/cleaning-fresh/content";
import { schema } from "@/templates/cleaning-fresh/schema";
import { container } from "@/templates/cleaning-fresh/styles";
import CallToAction from "@/templates/cleaning-fresh/sections/CallToAction";
import ContactDetails from "@/templates/cleaning-fresh/sections/ContactDetails";
import Gallery from "@/templates/cleaning-fresh/sections/Gallery";
import Hero from "@/templates/cleaning-fresh/sections/Hero";
import Highlights from "@/templates/cleaning-fresh/sections/Highlights";
import PageIntro from "@/templates/cleaning-fresh/sections/PageIntro";
import QuoteForm from "@/templates/cleaning-fresh/sections/QuoteForm";
import ServiceCards from "@/templates/cleaning-fresh/sections/ServiceCards";
import ServicesPreview from "@/templates/cleaning-fresh/sections/ServicesPreview";
import SiteFooter from "@/templates/cleaning-fresh/sections/SiteFooter";
import SiteHeader from "@/templates/cleaning-fresh/sections/SiteHeader";
import Testimonials from "@/templates/cleaning-fresh/sections/Testimonials";

// The Fresh Start template: content in, web page out.
//
// It uses no state and reads nothing from the outside world. The same content
// always draws the same page. That is what lets the editor show a live
// preview now, and lets a finished website be produced from it later.
//
// Its colors are its own (white, slate, and the customer's brand color). It
// deliberately uses none of Studio's dashboard tokens, so Studio's light or
// dark mode never changes how a customer's website looks.
export default function CleaningFreshTemplate({ content, pageKey, host }: TemplateRenderProps) {
  // The editor stores content in a general shape. Here we tell TypeScript it
  // is this template's exact shape. That is safe because the content is
  // checked against the schema (templates/validate.ts) before it gets here.
  const { site, pages } = content as unknown as CleaningContent;

  const brand = safeHex(site.brand.color, "#12806f");
  const fonts = getFontPair(site.brand.fonts);

  // The customer's choices become CSS variables on the template's outer
  // element; every section reads them with classes like bg-(--brand).
  // (A style attribute is allowed for values only known at run time.)
  const style = {
    "--brand": brand,
    "--on-brand": textOn(brand), // readable text ON the brand color
    "--brand-text": readableOnWhite(brand), // the brand color, safe to use AS text on white
    "--font-heading": fonts.heading,
    "--font-body": fonts.body,
  } as CSSProperties;

  // The menu comes from the schema's page list, so a template's pages are named in one place.
  const menu = schema.pages.map(({ key, label, path }) => ({ key, label, path }));

  // Has the customer switched this home page section off?
  const hidden = (sectionKey: string) => isHidden(content, "home", sectionKey);

  return (
    <div
      style={style}
      className="scheme-light flex min-h-dvh flex-col bg-white font-(family-name:--font-body) text-base text-slate-800"
    >
      <SiteHeader site={site} pages={menu} pageKey={pageKey} host={host} />

      <main className="flex-1">
        {pageKey === "home" && (
          <>
            <Hero hero={pages.home.hero} host={host} />
            {/* Sections the customer can switch off in the editor (templates/visibility.ts). */}
            {!hidden("highlights") && <Highlights highlights={pages.home.highlights} />}
            {!hidden("servicesIntro") && (
              <ServicesPreview intro={pages.home.servicesIntro} services={site.services.items} host={host} />
            )}
            {!hidden("gallery") && <Gallery gallery={pages.home.gallery} />}
            {!hidden("testimonials") && <Testimonials testimonials={pages.home.testimonials} />}
            <CallToAction cta={pages.home.cta} pageKey="home" host={host} />
          </>
        )}

        {pageKey === "services" && (
          <>
            <PageIntro intro={pages.services.intro} pageKey="services" />
            <section className={`${container} py-14 md:py-20`}>
              <ServiceCards services={site.services.items} headingLevel="h2" />
            </section>
            <CallToAction cta={pages.services.cta} pageKey="services" host={host} />
          </>
        )}

        {pageKey === "contact" && (
          <>
            <PageIntro intro={pages.contact.intro} pageKey="contact" />
            <section className={`${container} grid gap-10 py-14 md:py-20 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16`}>
              <QuoteForm form={pages.contact.form} services={site.services.items} host={host} />
              <ContactDetails site={site} />
            </section>
          </>
        )}
      </main>

      <SiteFooter site={site} pages={menu} host={host} />
    </div>
  );
}
