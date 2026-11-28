import type { Metadata } from "next";
import Button from "@/components/ui/Button";

// Shown for any address that does not exist (the old 404.html), with a
// real 404 status, so search engines don't list it.
export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-dvh place-items-center px-4 text-center">
      <div>
        <h1 className="font-display text-2xl font-semibold sm:text-3xl">Page not found</h1>
        <p className="mt-3 text-fg-muted">That address does not exist in MigsFlow Studio.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href="/">Go to the home page</Button>
          <Button href="/templates" variant="secondary">
            Browse templates
          </Button>
        </div>
      </div>
    </main>
  );
}
