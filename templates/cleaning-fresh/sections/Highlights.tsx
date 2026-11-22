import { editable } from "@/templates/editable";
import { Check } from "lucide-react";
import type { CleaningContent } from "@/templates/cleaning-fresh/content";
import { container } from "@/templates/cleaning-fresh/styles";

type HighlightsProps = {
  highlights: CleaningContent["pages"]["home"]["highlights"];
};

// Up to three short reasons to choose this business.
export default function Highlights({ highlights }: HighlightsProps) {
  if (highlights.items.length === 0) return null; // an empty list simply leaves the section out

  return (
    <section aria-label="Why choose us" className="border-y border-slate-200 bg-slate-50">
      <ul role="list" className={`${container} grid gap-8 py-10 md:grid-cols-3`}>
        {highlights.items.map((item) => (
          <li key={item.id} className="flex gap-4">
            <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-full bg-(--brand) text-(--on-brand)">
              <Check aria-hidden="true" className="size-5" />
            </span>
            <div>
              <h2 {...editable("home", "highlights", "items", item.id, "title")} className="text-lg font-bold text-slate-900">{item.title}</h2>
              <p {...editable("home", "highlights", "items", item.id, "text")} className="mt-1 text-slate-700">{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
