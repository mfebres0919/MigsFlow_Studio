import type { Website } from "@/lib/types";

// One place that decides how a website's state is worded and colored, so the
// Overview, My Websites and (later) the editor always agree.

type StatusDisplay = {
  label: string;
  tone: "neutral" | "info" | "success";
};

export function websiteStatusDisplay(website: Website): StatusDisplay {
  if (website.status === "draft") return { label: "Draft", tone: "neutral" };
  if (website.hasUnpublishedChanges) return { label: "Unpublished changes", tone: "info" };
  return { label: "Published", tone: "success" };
}

export function editHref(website: Website): string {
  return `/dashboard/websites/${website.id}/edit`;
}

export function previewHref(website: Website): string {
  return `/preview/${website.id}`;
}
