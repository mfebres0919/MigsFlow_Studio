import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import SampleSite from "@/components/preview/SampleSite";
import { getTemplate } from "@/lib/data/templates";

// "/preview/template/<template id>/site": the template's sample website on
// its own. It is what the live preview shows inside its frame; visitors
// normally see it there, not at this address.
//
// This page is drawn when it is visited, not built ahead of time: templates
// may show today's date (the year in a footer), which would be frozen at
// whatever day the site was built. `await connection()` tells Next.js "wait
// for a real visitor", and Suspense is what it shows for that first instant.

export const metadata: Metadata = { title: "Template sample", robots: { index: false } };

async function Site({ params }: { params: Promise<{ templateId: string }> }) {
  await connection();
  const { templateId } = await params;
  if (!(await getTemplate(templateId))) notFound();
  return <SampleSite templateId={templateId} />;
}

export default function TemplateSitePage({ params }: PageProps<"/preview/template/[templateId]/site">) {
  return (
    <Suspense fallback={null}>
      <Site params={params} />
    </Suspense>
  );
}
