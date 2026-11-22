import { editable } from "@/templates/editable";
import type { CleaningContent } from "@/templates/cleaning-fresh/content";
import { container, heading } from "@/templates/cleaning-fresh/styles";

type GalleryProps = {
  gallery: CleaningContent["pages"]["home"]["gallery"];
};

const label = "absolute top-3 left-3 rounded-full bg-slate-900/85 px-3 py-1 text-sm font-bold text-white";

// Before-and-after photo pairs. A pair with no photo chosen yet shows a grey block in its place.
export default function Gallery({ gallery }: GalleryProps) {
  if (gallery.items.length === 0) return null;

  return (
    <section className="bg-slate-50">
      <div className={`${container} py-14 md:py-20`}>
        <h2 {...editable("home", "gallery", "heading")} className={`${heading} text-3xl sm:text-4xl`}>{gallery.heading}</h2>
        <p {...editable("home", "gallery", "text")} className="mt-3 max-w-2xl text-lg text-slate-700">{gallery.text}</p>

        <ul role="list" className="mt-10 grid gap-8 lg:grid-cols-3">
          {gallery.items.map((item) => (
            <li key={item.id}>
              {/* <figure> ties the two photos to their caption. */}
              <figure>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    {item.before.src ? (
                      <img src={item.before.src} alt={item.before.alt} width={800} height={600} loading="lazy" className="aspect-4/3 w-full rounded-l-2xl object-cover" {...editable("home", "gallery", "items", item.id, "before")} />
                    ) : (
                      <div {...editable("home", "gallery", "items", item.id, "before")} className="aspect-4/3 w-full rounded-l-2xl bg-slate-200" />
                    )}
                    <span className={label}>Before</span>
                  </div>
                  <div className="relative">
                    {item.after.src ? (
                      <img src={item.after.src} alt={item.after.alt} width={800} height={600} loading="lazy" className="aspect-4/3 w-full rounded-r-2xl object-cover" {...editable("home", "gallery", "items", item.id, "after")} />
                    ) : (
                      <div {...editable("home", "gallery", "items", item.id, "after")} className="aspect-4/3 w-full rounded-r-2xl bg-slate-200" />
                    )}
                    <span className={label}>After</span>
                  </div>
                </div>
                <figcaption {...editable("home", "gallery", "items", item.id, "caption")} className="mt-3 font-semibold text-slate-800">{item.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
