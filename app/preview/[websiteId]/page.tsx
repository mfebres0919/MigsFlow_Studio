import { Suspense } from "react";
import type { Metadata } from "next";
import PreviewContent from "@/components/preview/PreviewContent";
import LoadingState from "@/components/ui/LoadingState";

// "/preview/<website id>": a customer's website on its own, with none of the
// dashboard around it. The square brackets in the folder name [websiteId]
// mean "any value goes here", so this one file serves every website.
// In Milestone 5 the editor shows this same page inside its live preview.
export const metadata: Metadata = { title: "Website preview" };

export default function PreviewPage() {
  return (
    // The website id is only known once someone visits, so Next.js asks for a
    // Suspense "fallback" to show for that first instant.
    <Suspense
      fallback={
        <main className="mx-auto max-w-3xl px-4 py-10">
          <LoadingState label="Loading the preview" />
        </main>
      }
    >
      <PreviewContent />
    </Suspense>
  );
}
