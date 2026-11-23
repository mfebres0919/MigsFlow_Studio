// The rules every template follows. This file is the heart of the editing
// system: it describes WHAT a customer may change (the schema) and the shape
// their answers are stored in (the content).
//
// The idea in one line: a template is a design + a schema. The customer never
// touches the design. They only fill in the values the schema lists, and the
// template draws itself from those values.

import type { ComponentType, FormEvent, MouseEvent } from "react";

/* ---------- The values a customer can enter ---------- */

/** A picture: where the file is, and the words that describe it (alt text). */
export type ImageValue = { src: string; alt: string };

/** A button or link: the words shown, and where it goes ("/contact", "tel:…", "https://…"). */
export type LinkValue = { label: string; href: string };

/** One entry in a repeating list, e.g. one service or one review. "id" tells entries apart. */
export type ListItem = { id: string } & Record<string, string | ImageValue | LinkValue>;

/** Any single value in a website's content. */
export type FieldValue = string | ImageValue | LinkValue | ListItem[];

/** One section's values, by field name: { heading: "…", text: "…" }. */
export type SectionContent = Record<string, FieldValue>;

/**
 * Everything a customer has entered for one website.
 * - "site" holds what is shared by every page (business name, colors, phone …).
 * - "pages" holds each page's own sections.
 * A website stores this twice: once as its draft and once as its published copy.
 */
export type SiteContent = {
  site: Record<string, SectionContent>;
  pages: Record<string, Record<string, SectionContent>>;
};

/* ---------- The schema: which fields exist ---------- */

type FieldBase = {
  /** The name the value is stored under. Must match the content exactly. */
  key: string;
  /** What the customer sees above the input, in plain words. */
  label: string;
  /** An optional hint shown under the label. */
  help?: string;
  /**
   * Checked when the customer presses Publish. A new website starts with
   * placeholder content; this marks the fields where leaving the placeholder
   * in place would be a problem.
   * - "required": publishing is blocked until it is changed (contact details, reviews).
   * - "recommended": a warning is shown, but they may publish anyway.
   */
  publishCheck?: "required" | "recommended";
};

/** A field holding one value. The "type" decides which input the editor shows. */
export type SimpleField = FieldBase & {
  type: "text" | "longText" | "email" | "phone" | "url" | "image" | "color" | "font" | "link";
  /** Images only: true when the picture may be left out (e.g. a logo). */
  optional?: boolean;
};

/** A repeating list (services, reviews, opening hours). Each entry has the same small set of fields. */
export type ListField = FieldBase & {
  type: "list";
  /** What one entry is called, for buttons like "Add service". */
  itemLabel: string;
  /** The most entries the design can hold without breaking. */
  maxItems: number;
  /**
   * True when the design has a set number of places for these (for example
   * exactly four steps). The entries can be edited but not added, removed or reordered.
   */
  fixed?: boolean;
  fields: SimpleField[];
};

export type Field = SimpleField | ListField;

/** A group of related fields, shown together in the editor. */
export type SectionSchema = {
  key: string;
  label: string;
  description?: string;
  fields: Field[];
};

/** One page of the website and the sections on it. */
export type PageSchema = {
  key: string;
  /** Shown in the editor's page selector and in the site's menu. */
  label: string;
  /** The page's address on the finished site: "/" or "/services". */
  path: string;
  sections: SectionSchema[];
};

export type TemplateSchema = {
  /** Site-wide sections, shared by every page. */
  site: SectionSchema[];
  pages: PageSchema[];
};

/* ---------- How a template is drawn ---------- */

/**
 * What the surrounding app does for the template. A template must work in
 * two places: inside Studio's preview, and later as a finished website with
 * no Studio around it. The host is how it stays unaware of which one it is in.
 */
export type TemplateHost = {
  /** Turns a link from the content into the real address to use. */
  hrefFor: (href: string) => string;
  /** Preview only: lets Studio switch pages without leaving the preview. */
  onNavigate?: (href: string, event: MouseEvent<HTMLAnchorElement>) => void;
  /** Preview only: lets Studio stop the form from sending. */
  onFormSubmit?: (event: FormEvent<HTMLFormElement>) => void;
};

export type TemplateRenderProps = {
  content: SiteContent;
  /** Which page to draw, e.g. "home". */
  pageKey: string;
  host: TemplateHost;
};

/**
 * Everything Studio needs to know about one template.
 *
 * A template's design can be supplied in two ways ("kind"):
 * - "html": a hand-written HTML, CSS and JavaScript website kept in
 *   public/site-templates/<id>/. Studio shows the real page and fills it in through
 *   public/studio-bridge.js. This is how Miguelle builds templates.
 * - "react": a React component in templates/<id>/ (the first template,
 *   Fresh Start, was built this way).
 * The schema, the content and the editor work the same for both.
 */
export type TemplateDefinition = TemplateBasics & TemplateDesign;

type TemplateDesign =
  | {
      kind: "react";
      /** A function that turns content into a web page. */
      Component: ComponentType<TemplateRenderProps>;
    }
  | {
      kind: "html";
      /** The address of the template's page, e.g. "/site-templates/your-template/index.html". */
      entry: string;
    };

type TemplateBasics = {
  id: string;
  schema: TemplateSchema;
  /** Realistic example content, used for previews. Fictional, and labeled as sample on screen. */
  sampleContent: SiteContent;
  /**
   * What a customer's website starts with after buying: obvious placeholders
   * ("Your Business Name") in place of the fictional details, so it is clear
   * what to replace. The publish checks compare a draft against this.
   */
  starterContent: SiteContent;
  /** Pictures that come with the template, offered in the editor's image fields. */
  stockImages: ImageValue[];
  /**
   * The address of the template's hero image: the big photo at the top of its
   * home page, e.g. "home/hero/image". Studio shows it as the website's
   * picture in "My websites" and on the Overview. Every template must name one.
   */
  heroImage: string;
};
