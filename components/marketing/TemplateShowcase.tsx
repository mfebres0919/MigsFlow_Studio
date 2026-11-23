import BrowserFrame from "@/components/marketing/BrowserFrame";
import type { Template } from "@/lib/types";
import { templateCardImage } from "@/lib/showcase";

// The picture on the right of the marketplace's top section: two of the real
// templates, each in a browser frame, overlapping at a slight tilt. They rise
// into place when the page loads (once; skipped for reduced motion).

// The pretend address shown in each frame, by industry.
const addresses: Record<string, string> = {
  moving: "yourmovers.com",
  cleaning: "yourcleaning.com",
  nonprofit: "yourcause.org",
};

export default function TemplateShowcase({ templates }: { templates: Template[] }) {
  // The first two templates, each shown by a picture of its hero section.
  const shown = templates.slice(0, 2).map((template) => ({ template, src: templateCardImage(template.id) }));

  if (shown.length === 0) return null;
  const [front, back] = shown;

  return (
    // Decoration: the same templates are listed, with names, right below.
    <div aria-hidden="true" className="relative mx-auto w-full max-w-xl pb-10 lg:pb-14">
      {back && (
        <div className="ml-auto w-[78%] -rotate-3 motion-safe:animate-rise [animation-delay:140ms]">
          <BrowserFrame src={back.src} address={addresses[back.template.industry] ?? "yourbusiness.com"} sizes="(min-width: 1024px) 28vw, 70vw" />
        </div>
      )}
      <div className={`w-[82%] rotate-2 motion-safe:animate-rise ${back ? "absolute bottom-0 left-0" : ""}`}>
        <BrowserFrame src={front.src} address={addresses[front.template.industry] ?? "yourbusiness.com"} sizes="(min-width: 1024px) 30vw, 75vw" preload />
      </div>
    </div>
  );
}
