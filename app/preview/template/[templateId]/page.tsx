import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TemplateLivePreview from "@/components/marketing/TemplateLivePreview";
import LoadingState from "@/components/ui/LoadingState";
import { getTemplate, getTemplates } from "@/lib/data/templates";
import { formatPrice } from "@/lib/format";

// "/preview/template/<template id>": a template's full-screen live preview,
// opened from the template's page. It lives under /preview, not under the
// public pages, so it has no site header or footer: the template gets the
// whole screen.
//
// The part that reads the address (which template?) sits inside <Suspense>.
// Next.js can then show the page's frame the instant a link is clicked and
// fill in the template a moment later, instead of waiting with a blank
// screen (Next.js's "instant navigation" advice, 2026-11-23).

export async function generateStaticParams() {
  return (await getTemplates()).map((template) => ({ templateId: template.id }));
}

export async function generateMetadata({ params }: PageProps<"/preview/template/[templateId]">): Promise<Metadata> {
  const template = await getTemplate((await params).templateId);
  return { title: template ? `${template.name} Live Preview` : "Template preview", robots: { index: false } };
}

type Params = PageProps<"/preview/template/[templateId]">["params"];

async function Preview({ params }: { params: Params }) {
  const template = await getTemplate((await params).templateId);
  if (!template) notFound();
  return <TemplateLivePreview templateId={template.id} name={template.name} price={formatPrice(template.priceCents)} />;
}

export default function TemplatePreviewPage({ params }: PageProps<"/preview/template/[templateId]">) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-3xl px-4 py-10">
          <LoadingState label="Loading the preview" />
        </main>
      }
    >
      <Preview params={params} />
    </Suspense>
  );
}
