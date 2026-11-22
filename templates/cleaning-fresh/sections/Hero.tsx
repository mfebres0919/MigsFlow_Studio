import { editable } from "@/templates/editable";
import type { TemplateHost } from "@/templates/types";
import type { CleaningContent } from "@/templates/cleaning-fresh/content";
import TemplateLink from "@/templates/cleaning-fresh/TemplateLink";
import { buttonPrimary, buttonSecondary, container, heading } from "@/templates/cleaning-fresh/styles";

type HeroProps = {
  hero: CleaningContent["pages"]["home"]["hero"];
  host: TemplateHost;
};

// The top of the home page: the main message, two buttons and a photo.
export default function Hero({ hero, host }: HeroProps) {
  return (
    <section className={`${container} grid items-center gap-10 py-12 md:py-20 lg:grid-cols-2 lg:gap-16`}>
      <div>
        {/* The page's one <h1>. */}
        <h1 {...editable("home", "hero", "heading")} className={`${heading} text-4xl text-balance sm:text-5xl lg:text-6xl`}>{hero.heading}</h1>
        <p {...editable("home", "hero", "text")} className="mt-5 max-w-xl text-lg text-slate-700">{hero.text}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <TemplateLink href={hero.primaryButton.href} host={host} className={buttonPrimary} edit={["home", "hero", "primaryButton"]}>
            {hero.primaryButton.label}
          </TemplateLink>
          <TemplateLink href={hero.secondaryButton.href} host={host} className={buttonSecondary} edit={["home", "hero", "secondaryButton"]}>
            {hero.secondaryButton.label}
          </TemplateLink>
        </div>
      </div>

      {/* The photo sits on a block of the brand color, nudged down and right. */}
      <div className="relative pr-4 pb-4">
        <div aria-hidden="true" className="absolute inset-0 top-4 left-4 rounded-4xl bg-(--brand)" />
        {/* No picture chosen: the brand-colored block stands alone. */}
        {!hero.image.src && <div {...editable("home", "hero", "image")} className="relative aspect-4/3 w-full" />}
        {hero.image.src && <img
          src={hero.image.src}
          {...editable("home", "hero", "image")}
          alt={hero.image.alt}
          width={1200}
          height={900}
          className="relative aspect-4/3 w-full rounded-4xl object-cover"
        />}
      </div>
    </section>
  );
}
