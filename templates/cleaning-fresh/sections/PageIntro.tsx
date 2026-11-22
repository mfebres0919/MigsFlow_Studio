import { editable } from "@/templates/editable";
import { container, heading } from "@/templates/cleaning-fresh/styles";

type PageIntroProps = {
  intro: { heading: string; text: string };
  /** Which page this is ("services" or "contact"), so its fields can be addressed. */
  pageKey: string;
};

// The heading band at the top of the inner pages (Services, Contact).
export default function PageIntro({ intro, pageKey }: PageIntroProps) {
  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <div className={`${container} py-12 md:py-16`}>
        <h1 {...editable(pageKey, "intro", "heading")} className={`${heading} text-4xl text-balance sm:text-5xl`}>{intro.heading}</h1>
        <p {...editable(pageKey, "intro", "text")} className="mt-4 max-w-2xl text-lg text-slate-700">{intro.text}</p>
      </div>
    </section>
  );
}
