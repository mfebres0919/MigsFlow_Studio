// The pictures that show templates on Studio's public pages. They are made
// from screenshots by tools/make-template-pictures.py.

/**
 * The templates on the landing page's laptop and phone, in the order they
 * are shown. Each needs its showcase pictures first (see the tool above).
 */
export const showcaseTemplateIds = ["moving-easy", "cleaning-fresh", "nonprofit-ground", "moving-haul", "cleaning-slate", "nonprofit-door"];

/** Where a template's two device pictures for the landing page live. */
export function showcasePictures(templateId: string) {
  return {
    laptop: `/images/showcase/${templateId}-laptop.webp`,
    phone: `/images/showcase/${templateId}-phone.webp`,
  };
}

/**
 * A template's picture in the shop: a screenshot of the top of its home
 * page, so a buyer sees the real hero section, not just its photo
 * (Miguelle, 2026-11-23). Every template needs one: public/images/templates/<id>/card.webp.
 */
export function templateCardImage(templateId: string): string {
  return `/images/templates/${templateId}/card.webp`;
}
