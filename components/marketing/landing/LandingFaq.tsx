import { ArrowRight } from "lucide-react";
import FaqList from "@/components/marketing/landing/FaqList";
import SectionHeading from "@/components/marketing/landing/SectionHeading";
import DemoLabel from "@/components/ui/DemoLabel";
import StarField from "@/components/marketing/StarField";

// "Questions": a short FAQ. Only answers Miguelle has already decided are
// here (2026-11-23). Ownership, refunds and terms are still open decisions
// (CLAUDE.md, "Decisions to make before selling"), so they are left out
// until they are settled.
//
// Two columns on wide screens: the heading and a way to ask more on the
// left, the questions on the right (FaqList.tsx, which opens them smoothly).

export default function LandingFaq({ hostingPrice, lowestPrice }: { hostingPrice: string; lowestPrice: string }) {
  const questions = [
    {
      q: "Do I need to know how to build a website?",
      a: "No. You fill in your details in simple fields and see your website change as you type. There is no code and nothing to install.",
    },
    {
      q: "How much does it cost?",
      a: `Templates start at ${lowestPrice}, paid once. Hosting is optional: ${hostingPrice} a month if you want us to host it.`,
    },
    {
      q: "Can I change my website after it is published?",
      a: "Yes. Edit it any time in the same editor, then publish again. Your visitors keep seeing the last published version until you do.",
    },
    {
      q: "Do I have to host my website with you?",
      a: "No. Hosting with us is an optional extra. You can also take your website and host it yourself; looking after it is then up to you.",
    },
    {
      q: "Will it work on phones?",
      a: "Yes. Every template lays itself out for phones, tablets and desktops, and you can check each size in the live preview before you buy.",
    },
    {
      q: "What if my business doesn't have reviews or photos yet?",
      a: "Hide those sections until you do. Nothing you entered is lost, and you can switch them back on later.",
    },
  ];

  return (
    <section
      aria-labelledby="faq-title"
      data-pause-offscreen
      suppressHydrationWarning
      className="relative isolate mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16"
    >
      {/* Twinkling stars, as in every section (Miguelle, 2026-11-23). */}
      <StarField count={8} />
      {/* The left column stays in view while the questions scroll (the project's sticky-column rule). */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <SectionHeading
          id="faq-title"
          eyebrow="Questions"
          title="Good to know"
          text="The short answers to what people ask most before choosing a template."
          align="left"
        />
        <a
          href="https://migsflow.com/contact/"
          target="_blank"
          rel="noopener"
          className="group mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-panel px-5 font-medium transition-colors hover:border-signal/50"
        >
          Ask us something else
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
          />
          <span className="sr-only"> (opens migsflow.com in a new tab)</span>
        </a>
        <div className="mt-6">
          <DemoLabel>Prototype: prices and terms are not final</DemoLabel>
        </div>
      </div>

      <FaqList items={questions.map(({ q, a }) => ({ q, a }))} />
    </section>
  );
}
