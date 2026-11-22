/** "(555) 010-0142" → "tel:5550100142", so tapping the number starts a call. */
export function phoneHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
