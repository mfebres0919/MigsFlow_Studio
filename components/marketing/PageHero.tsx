import FlowLines from "@/components/marketing/FlowLines";

// The top section of a public page: the page's <h1>, a line of text, and
// optionally something beside it (the marketplace shows real templates
// there). The glow and flowing lines behind it are the same on every page.

type PageHeroProps = {
  title: string;
  text: string;
  /** Buttons or a short list, shown under the text. */
  children?: React.ReactNode;
  /** Something to show on the right on wide screens. */
  aside?: React.ReactNode;
};

export default function PageHero({ title, text, children, aside }: PageHeroProps) {
  return (
    // -mt-20 slides this section up underneath the floating header, so the
    // glow reaches the very top of the page; pt-* then makes room for the header.
    <section className="brand-backdrop -mt-20 border-b border-line pt-28 pb-12 sm:pt-32 sm:pb-16">
      <FlowLines />
      <div className={`mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 ${aside ? "lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]" : ""}`}>
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl leading-[1.08] font-semibold tracking-wide text-balance sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-fg-muted sm:text-xl">{text}</p>
          {children}
        </div>
        {aside}
      </div>
    </section>
  );
}
