"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import WebsiteStatusBadge from "@/components/dashboard/WebsiteStatusBadge";
import type { Device } from "@/components/editor/DeviceToggle";
import EditorActions from "@/components/editor/EditorActions";
import type { FieldContext } from "@/components/editor/FieldRenderer";
import PanelResizer from "@/components/editor/PanelResizer";
import PreviewPane from "@/components/editor/PreviewPane";
import PublishDialog from "@/components/editor/PublishDialog";
import ScopePicker from "@/components/editor/ScopePicker";
import SectionForm from "@/components/editor/SectionForm";
import UnsavedDialog from "@/components/editor/UnsavedDialog";
import { useMediaUrls } from "@/hooks/useMediaUrls";
import { listMedia, uploadImage } from "@/lib/data/media";
import { publishWebsite, saveDraft } from "@/lib/data/websites";
import { getSectionContent, setFieldValue, setTextAtTarget, setValueAtTarget } from "@/lib/editor/content-path";
import { editFieldType, editKind, parseEditPath, type EditTarget } from "@/lib/editor/edit-path";
import { mediaIdsIn, mediaSrc } from "@/lib/media/ref";
import type { MediaItem, Website } from "@/lib/types";
import { findPublishIssues, SITE_SCOPE, type PublishIssue } from "@/templates/publish-checks";
import type { FieldValue, TemplateDefinition } from "@/templates/types";

// The Website Editor: fields on the left, live preview on the right.
//
// This component is the editor's memory. It holds the content being edited
// and hands pieces of it down to the form and the preview. When a field
// changes, the new content is stored here, and both sides redraw from it.
// That one-way loop (state down, changes up) is the core idea of React.

type EditorShellProps = {
  website: Website;
  template: TemplateDefinition;
};

type Message = { tone: "ok" | "error"; text: string };

// The editing panel's width in pixels: where it starts, and how far it can be dragged.
const PANEL = { start: 416, min: 320, max: 720 };
const PANEL_KEY = "migsflow-studio:editor-panel-width";

export default function EditorShell({ website: loaded, template }: EditorShellProps) {
  const pages = template.schema.pages;

  // The website's facts (status, dates). Replaced after each save or publish.
  const [website, setWebsite] = useState(loaded);
  // The content as it is on screen right now, including edits not yet saved.
  const [content, setContent] = useState(loaded.draft);
  // The content as it was last saved. Edits always create a NEW content
  // object (see setFieldValue), so "is it still the saved object?" answers
  // "are there unsaved changes?".
  const [savedContent, setSavedContent] = useState(loaded.draft);
  const unsaved = content !== savedContent;

  // Which group of fields is shown: site-wide settings or one page.
  const [scope, setScope] = useState(pages[0].key);
  // Which page the preview shows. Follows "scope", except on site-wide settings.
  const [previewPage, setPreviewPage] = useState(pages[0].key);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [device, setDevice] = useState<Device>("fit");

  // How wide the editing panel is. Dragging the divider changes it, and the
  // choice is remembered in this browser for next time.
  // The function inside useState runs once, when the editor first appears,
  // to work out the starting value. (The editor only ever appears in the
  // browser, after the website has loaded, so reading browser storage is safe.)
  const [panelWidth, setPanelWidth] = useState(() => {
    try {
      const saved = Number(localStorage.getItem(PANEL_KEY));
      if (saved >= PANEL.min && saved <= PANEL.max) return saved;
    } catch {
      // Storage blocked: fall through to the normal width.
    }
    return PANEL.start;
  });
  function resizePanel(width: number) {
    setPanelWidth(width);
    try {
      localStorage.setItem(PANEL_KEY, String(width));
    } catch {
      // Not remembered this time; nothing else is affected.
    }
  }
  // Phones show one side at a time.
  const [phoneView, setPhoneView] = useState<"edit" | "preview">("edit");

  const [busy, setBusy] = useState<"saving" | "publishing" | null>(null);
  const [message, setMessage] = useState<Message | null>(null);
  const [publishOpen, setPublishOpen] = useState(false);
  const [leaveOpen, setLeaveOpen] = useState(false);

  // Editing by clicking on the preview. "wanted" is the field that was just
  // clicked there; the effect below brings its input into view in the form.
  const form = useRef<HTMLElement>(null);
  const [wanted, setWanted] = useState<(EditTarget & { typing: boolean; at: number }) | null>(null);
  // useRouter lets code move to another page, the way clicking a <Link> does.
  const router = useRouter();
  const websitesPage = "/dashboard/websites";

  // Ask the browser to warn before the tab is closed with unsaved changes.
  useEffect(() => {
    if (!unsaved) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [unsaved]);

  // The customer's uploaded pictures. Loaded once when the editor opens, then
  // added to as they upload more.
  const [uploads, setUploads] = useState<MediaItem[]>([]);
  useEffect(() => {
    listMedia().then(setUploads, () => undefined); // if the list cannot be read, the editor still works without it
  }, []);

  const addImage = useCallback(async (file: File) => {
    const item = await uploadImage(file);
    setUploads((current) => [item, ...current]);
    return item;
  }, []);

  // Addresses for showing uploaded pictures in the form (thumbnails and the current picture).
  const resolveSrc = useMediaUrls([...new Set([...uploads.map((item) => item.id), ...mediaIdsIn(content)])]);

  // A browser's normal reaction to a file dropped on a page is to OPEN it,
  // which would replace the editor and lose unsaved work. Stop that everywhere
  // except the photo drop areas (marked data-dropzone), which handle the file themselves.
  useEffect(() => {
    const guard = (event: DragEvent) => {
      if (event.target instanceof Element && event.target.closest("[data-dropzone]")) return;
      event.preventDefault();
      if (event.dataTransfer) event.dataTransfer.dropEffect = "none";
    };
    window.addEventListener("dragover", guard);
    window.addEventListener("drop", guard);
    return () => {
      window.removeEventListener("dragover", guard);
      window.removeEventListener("drop", guard);
    };
  }, []);

  // useMemo re-runs the checks only when the content changes, not on every redraw.
  const issues = useMemo(() => findPublishIssues(template, content), [template, content]);
  const context: FieldContext = useMemo(
    () => ({ pages, images: template.stockImages, uploads, uploadImage: addImage, resolveSrc }),
    [pages, template, uploads, addImage, resolveSrc],
  );

  const sections = scope === SITE_SCOPE ? template.schema.site : (pages.find((page) => page.key === scope)?.sections ?? []);

  function chooseScope(next: string) {
    setScope(next);
    setOpenSection(null);
    if (next !== SITE_SCOPE) setPreviewPage(next);
  }

  // A menu link was clicked inside the preview: follow it in the form too.
  // useCallback keeps this the same function between redraws, so the preview
  // does not re-attach its message listener every time.
  const followPreview = useCallback((pageKey: string) => {
    setPreviewPage(pageKey);
    setScope((current) => (current === SITE_SCOPE ? current : pageKey));
  }, []);

  // Something editable was clicked in the preview: show its field in the form.
  const selectField = useCallback(
    (path: string, typing: boolean) => {
      const target = parseEditPath(path);
      // Ignore anything that is not a real field of this template.
      if (!target || !editKind(template.schema, path)) return;
      setScope(target.scope);
      setOpenSection(target.sectionKey);
      setWanted({ ...target, typing, at: Date.now() }); // "at" makes each click count, even on the same field
      // On a phone only one side shows. Typing in place stays on the preview;
      // anything else needs the form, so switch to it.
      if (!typing) setPhoneView("edit");
    },
    [template.schema],
  );

  // The customer typed directly on the preview: store the new words. The
  // form on the left redraws from the same content, so it stays in step.
  const applyInlineEdit = useCallback(
    (path: string, value: string) => {
      const target = parseEditPath(path);
      if (!target || editKind(template.schema, path) !== "text") return;
      setContent((current) => setTextAtTarget(current, target, value));
      setMessage(null);
    },
    [template.schema],
  );

  // A picture file was dropped on a photo in the preview: store it, then use it there.
  const dropImage = useCallback(
    async (path: string, file: File) => {
      const target = parseEditPath(path);
      if (!target || editFieldType(template.schema, path) !== "image") return;
      try {
        const item = await addImage(file);
        setContent((current) => setValueAtTarget(current, target, { src: mediaSrc(item.id), alt: "" }));
        setMessage({ tone: "ok", text: "Photo replaced. Add a short description of it in the form on the left." });
        selectField(path, false); // open its field, where the description goes
      } catch (problem) {
        setMessage({ tone: "error", text: problem instanceof Error ? problem.message : "That picture could not be added." });
      }
    },
    [template.schema, addImage, selectField],
  );

  // After the form has redrawn with the right section open, scroll the
  // clicked field into view. If it cannot be typed in place (a photo, a
  // color), also move the keyboard focus to its input.
  useEffect(() => {
    if (!wanted) return;
    const body = form.current?.querySelector('[data-section-open="true"] [data-section-body]');
    let element = body?.querySelector<HTMLElement>(`:scope > [data-field="${CSS.escape(wanted.fieldKey)}"]`) ?? null;
    if (element && wanted.itemId) {
      const entry = element.querySelector<HTMLElement>(`[data-item="${CSS.escape(wanted.itemId)}"]`);
      const inner = wanted.subKey ? entry?.querySelector<HTMLElement>(`[data-field="${CSS.escape(wanted.subKey)}"]`) : null;
      element = inner ?? entry ?? element;
    }
    if (!element) return;
    const found = element;
    const typing = wanted.typing;

    const show = () => {
      found.scrollIntoView({ block: "center" });
      // preventScroll: the line above already put it in view, and letting the
      // browser scroll again could move the whole editor.
      if (!typing) found.querySelector<HTMLElement>("input, textarea, select, button")?.focus({ preventScroll: true });
    };

    // If the section is still sliding open, wait for it to finish; scrolling
    // to a field inside a half-open section would land in the wrong place.
    const sliding = body instanceof HTMLElement && body.parentElement && body.parentElement.offsetHeight < body.offsetHeight - 1;
    if (!sliding) return show();
    const timer = setTimeout(show, 320);
    return () => clearTimeout(timer);
  }, [wanted]);

  function changeField(sectionKey: string, fieldKey: string, value: FieldValue) {
    setContent((current) => setFieldValue(current, scope, sectionKey, fieldKey, value));
    setMessage(null);
  }

  // Returns true if the draft was saved, so callers can decide what happens next.
  async function handleSave(): Promise<boolean> {
    setBusy("saving");
    try {
      const snapshot = content; // exactly what is being saved
      setWebsite(await saveDraft(website.id, snapshot));
      setSavedContent(snapshot);
      setMessage({ tone: "ok", text: "Draft saved in this browser. Visitors still see your last published version." });
      return true;
    } catch (error) {
      setMessage({ tone: "error", text: error instanceof Error ? error.message : "The draft could not be saved." });
      return false;
    } finally {
      setBusy(null);
    }
  }

  // "Save changes" in the leaving question: save first, and only leave if that worked.
  async function saveAndLeave() {
    const saved = await handleSave();
    setLeaveOpen(false);
    if (saved) router.push(websitesPage);
  }

  async function handlePublish() {
    setBusy("publishing");
    try {
      const snapshot = content;
      if (unsaved) {
        await saveDraft(website.id, snapshot); // publish what is on screen, not an older save
        setSavedContent(snapshot);
      }
      setWebsite(await publishWebsite(website.id));
      setPublishOpen(false);
      setMessage({ tone: "ok", text: "Published (simulated). In this prototype nothing is put online." });
    } catch (error) {
      setMessage({ tone: "error", text: error instanceof Error ? error.message : "The website could not be published." });
    } finally {
      setBusy(null);
    }
  }

  function goToIssue(issue: PublishIssue) {
    setPublishOpen(false);
    chooseScope(issue.scope);
    setOpenSection(issue.sectionKey);
    setPhoneView("edit");
  }

  const tab = "min-h-11 flex-1 rounded-control font-medium text-fg-muted aria-pressed:bg-raised aria-pressed:text-fg";

  return (
    // The editor fills the screen exactly (h-dvh) and each side scrolls on its
    // own, like an app, instead of the whole page scrolling. overflow-hidden
    // makes sure nothing can ever scroll the editor as a whole.
    <div className="relative flex h-dvh flex-col overflow-hidden">
      {/* The names on <header> and <main> tell the editor's own regions apart from
          the website's header and main content, which sit in the preview below. */}
      <header aria-label="Website editor" className="border-b border-line bg-panel">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2">
          <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1">
            <Link
              href={websitesPage}
              // With unsaved edits, stop the link and ask first. Otherwise it is an ordinary link.
              onClick={(event) => {
                if (!unsaved) return;
                event.preventDefault();
                setLeaveOpen(true);
              }}
              className="flex min-h-11 items-center gap-1 rounded-control pr-2 font-medium text-fg-muted hover:text-fg"
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
              My websites
            </Link>
            <h1 className="font-display text-base font-semibold tracking-wide">
              <span className="sr-only">Editing </span>
              {website.name}
            </h1>
            <WebsiteStatusBadge website={website} />
          </div>
        </div>

        {/* role="status" reads the message aloud; errors are also shown in the danger color with words, never color alone. */}
        <p role="status" className={`px-4 text-sm ${message?.tone === "error" ? "text-danger" : "text-fg-muted"}`}>
          {message && <span className="block pb-2">{message.text}</span>}
        </p>

        <div className="flex gap-1 border-t border-line p-1 lg:hidden">
          <button type="button" aria-pressed={phoneView === "edit"} onClick={() => setPhoneView("edit")} className={tab}>
            Edit
          </button>
          <button type="button" aria-pressed={phoneView === "preview"} onClick={() => setPhoneView("preview")} className={tab}>
            Preview
          </button>
        </div>
      </header>

      {/* <main> holds everything below the top bar, so every part of the editor
          sits inside a named region that screen-reader users can jump between.
          min-h-0 lets the two sides shrink to the space left and scroll inside it. */}
      <main id="main" aria-label="Website editor" className="flex min-h-0 flex-1 flex-col">
        <div className="flex min-h-0 flex-1">
          {/* The editing panel: a scrolling form with a title that stays at the
              top and the Save / Publish bar that stays at the bottom. */}
          <div
            // The panel's width is a number that changes as the divider is
            // dragged, so it is passed in as a CSS variable (the handbook's
            // dynamic-value exception). It only applies on wide screens; on a
            // phone the panel is simply full width.
            style={{ "--panel-width": `${panelWidth}px` } as React.CSSProperties}
            className={`w-full shrink-0 flex-col lg:flex lg:w-(--panel-width) ${phoneView === "edit" ? "flex" : "hidden"}`}
          >
            <section
              aria-label="Editing panel"
              ref={form}
              data-scope={scope}
              // "relative" matters: the form contains visually hidden helpers
              // (screen-reader text, the file inputs) that are positioned
              // absolutely. Without it they are placed against the whole page,
              // escape this panel's scrolling, and make the page itself scrollable,
              // which showed up as an empty grey band under the editor.
              className="relative min-h-0 flex-1 overflow-y-auto bg-ink"
            >
              {/* "sticky" keeps the title and the page choices in view while the form scrolls under them. */}
              <div className="sticky top-0 z-10 border-b border-line bg-ink p-4">
                <h2 className="font-display text-lg font-semibold tracking-wide">Edit your website</h2>
                <p className="mt-1 mb-3 text-sm text-fg-muted">
                  Pick a page, then open a section. You can also click things in the preview.
                </p>
                <ScopePicker pages={pages} scope={scope} issues={issues} onChange={chooseScope} />
              </div>

              <div className="grid gap-3 p-4">
                {sections.map((section) => {
                  // Does this section still hold placeholder content? The worst case decides the note.
                  const found = issues.filter((issue) => issue.scope === scope && issue.sectionKey === section.key);
                  const flag = found.some((issue) => issue.level === "required") ? "required" : found.length > 0 ? "recommended" : undefined;
                  return (
                    <SectionForm
                      // The key includes the scope, so switching pages starts each section fresh.
                      key={`${scope}:${section.key}`}
                      section={section}
                      content={getSectionContent(content, scope, section.key)}
                      open={openSection === section.key}
                      onToggle={(open) => setOpenSection((current) => (open ? section.key : current === section.key ? null : current))}
                      onFieldChange={(fieldKey, value) => changeField(section.key, fieldKey, value)}
                      context={context}
                      flag={flag}
                    />
                  );
                })}
              </div>
            </section>

            {/* Wide screens: Save and Publish sit at the bottom of the panel. */}
            <div className="hidden lg:block">
              <EditorActions unsaved={unsaved} busy={busy} onSave={() => void handleSave()} onPublish={() => setPublishOpen(true)} />
            </div>
          </div>

          <PanelResizer width={panelWidth} min={PANEL.min} max={PANEL.max} onChange={resizePanel} />

          <section aria-label="Live preview" className={`min-w-0 flex-1 flex-col lg:flex ${phoneView === "preview" ? "flex" : "hidden"}`}>
            <PreviewPane
              // A hand-written HTML template is shown directly, in editing mode.
              // A React template is shown through Studio's own preview page.
              src={template.kind === "html" ? `${template.entry}?studio=edit` : `/preview/${website.id}?embed=1`}
              content={content}
              pageKey={previewPage}
              device={device}
              onDeviceChange={setDevice}
              onPageChange={followPreview}
              onSelectField={selectField}
              onInlineEdit={applyInlineEdit}
              onDropImage={dropImage}
            />
          </section>
        </div>

        {/* Phones: the same bar runs along the bottom of the screen, so it is
            there in both the Edit and the Preview view. */}
        <div className="lg:hidden">
          <EditorActions unsaved={unsaved} busy={busy} onSave={() => void handleSave()} onPublish={() => setPublishOpen(true)} />
        </div>
      </main>

      <UnsavedDialog
        open={leaveOpen}
        saving={busy === "saving"}
        onSave={() => void saveAndLeave()}
        onLeave={() => router.push(websitesPage)}
        onStay={() => setLeaveOpen(false)}
      />

      <PublishDialog
        open={publishOpen}
        websiteName={website.name}
        issues={issues}
        publishing={busy === "publishing"}
        onClose={() => setPublishOpen(false)}
        onConfirm={handlePublish}
        onGoTo={goToIssue}
      />
    </div>
  );
}
