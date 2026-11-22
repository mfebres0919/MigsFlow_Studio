import { Suspense } from "react";
import type { Metadata } from "next";
import EditorLoader from "@/components/editor/EditorLoader";
import LoadingState from "@/components/ui/LoadingState";

// "/dashboard/websites/<website id>/edit": the Website Editor.
//
// It lives in its own route group, "(editor)", so it does NOT get the
// dashboard's sidebar: the editor needs the whole screen. The address is
// still under /dashboard, because the parentheses never appear in it.
// There is no layout file here on purpose; the editor uses only the root
// layout, and (by agreement) has no back-to-top button.
export const metadata: Metadata = { title: "Website editor" };

export default function EditWebsitePage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-3xl px-4 py-10">
          <LoadingState label="Opening the editor" />
        </main>
      }
    >
      <EditorLoader />
    </Suspense>
  );
}
