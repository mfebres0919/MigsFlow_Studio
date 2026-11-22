import { editable } from "@/templates/editable";
import type { CleaningContent } from "@/templates/cleaning-fresh/content";
import { container, heading } from "@/templates/cleaning-fresh/styles";

type TestimonialsProps = {
  testimonials: CleaningContent["pages"]["home"]["testimonials"];
};

// Customer reviews.
export default function Testimonials({ testimonials }: TestimonialsProps) {
  if (testimonials.items.length === 0) return null;

  return (
    <section className={`${container} py-14 md:py-20`}>
      <h2 {...editable("home", "testimonials", "heading")} className={`${heading} text-3xl sm:text-4xl`}>{testimonials.heading}</h2>
      <ul role="list" className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.items.map((review) => (
          <li key={review.id}>
            {/* The thick brand-colored edge marks each card as a quotation. */}
            <figure className="flex h-full flex-col rounded-3xl border-l-8 border-(--brand) bg-slate-50 p-6">
              <blockquote className="flex-1 text-lg text-slate-800">
                {/* The quotation marks are decoration, so only the words between them are marked. */}
                <p>“<span {...editable("home", "testimonials", "items", review.id, "quote")}>{review.quote}</span>”</p>
              </blockquote>
              <figcaption className="mt-5">
                <span {...editable("home", "testimonials", "items", review.id, "name")} className="block font-bold text-slate-900">{review.name}</span>
                <span {...editable("home", "testimonials", "items", review.id, "detail")} className="block text-slate-600">{review.detail}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
