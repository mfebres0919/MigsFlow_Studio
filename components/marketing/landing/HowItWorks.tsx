import { LayoutTemplate, PenLine, Rocket } from "lucide-react";
import SectionHeading from "@/components/marketing/landing/SectionHeading";
import StarField from "@/components/marketing/StarField";

// "How it works": the three steps from browsing to a live website.

type HowItWorksProps = {
  /** The optional hosting price, e.g. "$25". From the data doorway, never typed in. */
  hostingPrice: string;
};

export default function HowItWorks({ hostingPrice }: HowItWorksProps) {
  const steps = [
    {
      icon: LayoutTemplate,
      title: "Pick a template",
      text: "Browse designs made for your kind of business, and try each one live on phone, tablet and desktop before you buy.",
    },
    {
      icon: PenLine,
      title: "Make it yours",
      text: "Add your name, photos, services and colors in a simple editor, and watch the website change as you type. Hide sections you don't need.",
    },
    {
      icon: Rocket,
      title: "Publish",
      text: `When it looks right, publish it. Host it with us for ${hostingPrice} a month, or take your website and host it wherever you like.`,
    },
  ];

  return (
    <section
      aria-labelledby="how-title"
      data-pause-offscreen
      suppressHydrationWarning
      className="relative isolate mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24"
    >
      {/* Twinkling stars, as in every section (Miguelle, 2026-11-23). */}
      <StarField count={8} />
      <SectionHeading id="how-title" eyebrow="How it works" title="From template to website in three steps" />

      {/* An ordered list: the steps happen in this order. */}
      <ol className="mt-12 grid gap-5 md:grid-cols-3">
        {steps.map(({ icon: Icon, title, text }, index) => (
          <li key={title} className="relative rounded-panel border border-line bg-panel p-6 shadow-lg shadow-accent/5">
            <div className="flex items-center justify-between">
              <span className="bg-brand-gradient grid size-12 place-items-center rounded-2xl text-white">
                <Icon aria-hidden="true" className="size-6" />
              </span>
              {/* The big step number is decoration: the list already says which step it is. */}
              <span aria-hidden="true" className="font-display text-4xl font-medium text-line-strong">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-5 text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-fg-muted">{text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
