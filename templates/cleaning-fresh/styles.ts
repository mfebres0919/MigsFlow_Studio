// Class lists this template repeats in several sections, written once.
// (The Studio dashboard does this with components; here a shared string is
// enough, and each one is still a complete, literal list Tailwind can find.)

/** The centered column every section's content sits in. */
export const container = "mx-auto w-full max-w-6xl px-4 sm:px-6";

/** A filled button in the customer's brand color. --on-brand is the readable text color for it. */
export const buttonPrimary =
  "inline-flex min-h-12 items-center justify-center rounded-full bg-(--brand) px-6 text-base font-bold text-(--on-brand) transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900";

/** A quieter outlined button. */
export const buttonSecondary =
  "inline-flex min-h-12 items-center justify-center rounded-full border-2 border-slate-300 px-6 text-base font-bold text-slate-800 transition-colors hover:border-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900";

/** Section headings use the customer's chosen heading font. */
export const heading = "font-(family-name:--font-heading) font-bold tracking-tight text-slate-900";
