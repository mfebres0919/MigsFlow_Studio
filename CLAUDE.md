# MigsFlow Studio

@handbook/CLAUDE.md

Project guide and change log for **MigsFlow Studio — Self-Service Website Platform**, a MigsFlow product owned by Miguelle (not a client site). The line above loads the MigsFlow handbook, Next.js + Tailwind edition (v3.1), so read it before writing any code. The scope is `documentation/project-brief.md`.

## 1. How to work in this project

- **Follow the handbook** (`handbook/CLAUDE.md`), except where Section 3 below records an exception. If a request conflicts with one of its hard rules, explain the conflict before building an exception.
- **Log every change** in the change log at the bottom of this file before ending a reply, and keep Section 2 current.
- **Keep `documentation/project-checklist.md` current:** tick what is done and note anything unverified.
- **Don't trust memory for Next.js.** Read the matching guide in `node_modules/next/dist/docs/` first (handbook Section 21).
- **Commit and push only when Miguelle asks.**
- Never invent facts, prices, reviews or features. Ask. (Labeled sample content is the one exception: Section 3.)
- **Build one milestone at a time** (Section 2) and stop after each so Miguelle can review it. Don't build ahead, and don't start a later phase's integrations (Supabase, Stripe, Netlify API) early.
- **Anything simulated is labeled on screen** (for example "Demo mode" or "Simulated"): logins, payments, publishing, domains, uploads.
- Miguelle is moving from HTML, CSS and JavaScript to this stack: explain each new Next.js, TypeScript or Tailwind idea briefly, compared with the plain HTML way, the first time it is used.
- Use they/them for anyone whose pronouns have not been stated.

## 2. Current state

### Where things stand (2026-11-23) — read this first
**Stopping point: Phase 2 step 3 (template live preview) is built, Moving Day is replaced by six basic templates, and both wait for review. The landing hero, footer and speed fixes from the same day are approved. Everything up to the Framo-style redesign is committed and pushed.** Phase 1 is finished; Phase 2 steps 1 and 2 are built.

- **Design direction (Miguelle, 2026-11-23):** Studio's public pages should have "the same vibe and feeling" as Miguelle's main website (`../MigsFlow_Website`, live at migsflow.com): "professional, serious, but also tech, not overwhelming". The footer should feel like "an extension" of the main site's footer: similar, some differences allowed. So for any new public page, look at how the main site does the same thing first (its `styles.css`, `css/global.css`, `css/theme.css`), and reuse the pieces already brought over: `site-backdrop`, `StarField`, `HeroRings`, `text-brand-gradient`, `bg-brand-gradient`, `DeviceShowcase`.
- **Next:** Miguelle reviews step 3 (the template live preview). Then step 4, the rest of the landing page. Keep chat replies short (Miguelle, 2026-11-23).
- **Phase 2 steps** (Miguelle, 2026-11-22: "build things step by step how we've been doing"):
  | # | Step | Status |
  |---|---|---|
  | 1 | Moving Day template, from Miguelle's HTML site | Done 2026-11-22; **removed 2026-11-23** at Miguelle's request, replaced by Claude's basic templates (see Templates below) |
  | 2 | Public header and footer; marketplace `/templates` with industry filter; industry pages; a page per template | Done 2026-11-22, redesigned the same day after Miguelle's feedback; awaiting review of the redesign |
  | 3 | Full live preview of a template from its page (with phone, tablet and desktop sizes) | Built 2026-11-23, waiting for Miguelle's review |
  | 4 | The real landing page | Top section built 2026-11-23 (migsflow.com style); the rest of the page is still to do |
  | 5 | Pricing, Log in and Create account pages (designs only; real accounts are Phase 3, payments Phase 4) | |
  | 6 | Checks: accessibility, widths, Safari, and the handbook's SEO rules (canonical addresses, sitemap, link preview image) | |
  **Templates now (Miguelle, 2026-11-23):** Claude's own basic templates, two per industry: Fresh Start and Clean Slate (cleaning), Easy Move and Steady Haul (moving), Open Door and Common Ground (nonprofit). "Make them as basic as possible"; they are placeholders until Miguelle says their own templates are ready. Miguelle's templates will be hand-written HTML (`kind: "html"`); the HTML engine (`public/studio-bridge.js`, `HtmlTemplateFrame`) stays for them. Each template appears in the marketplace by being added to `templates/registry.ts` and `lib/mock/templates.ts`, plus its pictures (`tools/make-template-pictures.py`).
- **Git:** private GitHub repository `mfebres0919/MigsFlow_Studio`, branch `main`. On 2026-11-22 Miguelle told Claude to commit and push all changes at the end of that session, which Claude did. **That was permission for that one time**: in a new session, commit and push only when Miguelle asks.
- **To run it:** in the VS Code terminal, inside this folder, `npm run dev`, then http://localhost:3000. The demo data lives in the browser (`localStorage` key `migsflow-studio:demo:v7`, plus uploaded pictures in IndexedDB `migsflow-studio-media`); clearing site data resets it.
- **Commands:** `npm run lint`, `npm run typecheck`, `npm run build`. `python3 tools/sample-content-from-html.py <template-id>` regenerates a template's sample content from its page. `python3 tools/make-showcase-screens.py <template-id> laptop.png phone.png` makes a template's tilted laptop and phone pictures for the landing page (screenshots at 1440×900 and 390×844), then add the id to `lib/showcase.ts`.
- **How Claude tested:** production builds in a separate copy of the project; pages driven with Playwright borrowed from the Courier Portal's install (Chromium and WebKit). A new chat should make its own copy.

**Built so far:** the design tokens with light (default) and dark themes; the dashboard shell; shared UI components; the data doorway with sample data kept in the browser; all eight dashboard screens (**Overview, My Websites, Website Editor, Media Library, Domains, Hosting & Publishing, Billing, Account Settings**); the template system and the **Fresh Start** cleaning template (Home, Services, Contact); the preview page. Everything simulated is labeled on screen. Lint, the type check and a production build pass.

### What the platform is (short version of the brief)
Small business owners buy a website template, edit its content through structured fields (not drag-and-drop) with a live preview, and later publish it on a subdomain or their own domain. First industries: cleaning, nonprofit, moving and logistics. Later phases: Supabase (passwordless login, data, uploads), Stripe (payments), Netlify API (publishing).

### Roadmap
| Phase | Work | Status |
|---|---|---|
| 1 | Dashboard prototype: all dashboard pages, the editor, one cleaning template, mock data saved in the browser | **Done 2026-11-22** (all 7 milestones), awaiting Miguelle's review |
| 2 | Public template marketplace, nonprofit and moving templates | In progress: marketplace, template pages and live preview built; six basic placeholder templates (2026-11-23); landing page partly built |
| 3 | Supabase: login, database, uploads, ownership rules | |
| 4 | Stripe payments | |
| 5 | Hosting, publishing and custom domains | |
| 6 | Admin dashboard and production readiness | |

### Phase 1 milestones
| # | Milestone | Status |
|---|---|---|
| 1 | Create the app (Next.js, TypeScript, Tailwind), Node version file, local Git repository, starter page runs | Done 2026-11-22 |
| 2 | Design tokens (navy, black, blue), fonts, dashboard shell (sidebar, top bar), shared UI components | Done 2026-11-22 |
| 3 | Data types, mock data layer, **Overview** and **My Websites** pages (plus the light/dark theme Miguelle asked for) | Done 2026-11-22 |
| 4 | Template content schema and the sample cleaning template, with a full-page preview route | Done 2026-11-22 |
| 5 | **Website Editor**: schema-driven fields, live preview in an iframe, desktop/tablet/mobile modes, save draft (browser storage), simulated publish | Done 2026-11-22 (plus click-and-type editing, photo upload, resizable panel) |
| 6 | **Media Library, Domains, Hosting & Publishing, Billing, Account Settings** (all mock, labeled) | Done 2026-11-22 |
| 7 | Checks: lint, build, accessibility, responsive widths; update the checklist | Done 2026-11-22, awaiting review |

### Decisions to make before selling (Miguelle's list; collected 2026-11-22)
None of these block the prototype. All of them need an answer before a real customer pays.

**Terms of sale and ownership** (to be written down and reviewed by a lawyer)
- [ ] Does one template purchase cover one website, or more?
- [ ] May a customer, or a developer they hire, edit the files they download?
- [ ] Wording that the customer may not resell or give away the template itself.
- [ ] When someone stops paying for hosting: is the site taken offline at once or after a grace period, can they still download it, and how long is their content kept?
- [ ] A privacy policy and terms for Studio itself (it will hold customers' details and, if the form inbox is built, their visitors' messages).

**Product**
- [ ] The product's name ("MigsFlow Studio" is a working name) and its own domain.
- [ ] The exact price of each template within $300–$500.
- [ ] Where the templates' photos come from (own photos, licensed stock, or images made with ChatGPT), and confirmation of the right to sell them inside a template.
- [ ] How quote and contact forms are delivered: the Studio form inbox, Netlify's own forms, or the customer's own service; and whether working forms are part of the $25 hosting plan.
- [ ] How Studio relates to the existing MigsFlow plans (Starter $175/mo, Lump Sum, Enterprise) and to `../MigsFlow_Website`.

**Netlify** (ask a person there, and get the answer in writing)
- [ ] Is the Pro plan required to host customers' sites? (Not stated in the terms Claude could read.)
- [ ] Is the limit really 500 projects per team, and can it be raised? (The docs say 500; the support assistant could not confirm it.)
- [ ] Raise the publishing limit above 3 a minute and 100 a day.
- [ ] Create the separate Studio team and turn on auto-recharge.

### Design decisions already settled for Phase 1
- **Preview runs in an iframe** (a page inside the page). Tailwind's breakpoints follow the window width, so only an iframe gives the tablet and mobile previews a real narrow window.
- **How a template is built** (`templates/types.ts` is the reference). A template is a folder holding a **schema** (which fields a customer may edit, grouped into site-wide sections and per-page sections, with plain-language labels), **sample content**, and a **component** that draws a page from content. Content is stored per website as `draft` and `published` (`lib/types.ts`). Field types: text, longText, email, phone, url, image, color, font, link, and list (repeating entries with a `maxItems` the design can hold). `templates/validate.ts` checks saved content against the schema before a template draws it. `templates/registry.ts` lists the templates.
- **Templates are multi-page, up to 5 pages each** (Miguelle, 2026-11-22). Fresh Start has Home, Services and Contact.
- **A template never knows where it is running.** It gets a `host` (`TemplateHost`) that resolves links and, in the preview, switches pages and stops the form. Templates use plain `<a>` and `<img>`, no `next/link` or `next/image`, and no React state, so they can later be turned into a standalone website.
- **A template has its own colors**, never Studio's dashboard tokens, so Studio's light/dark mode cannot change a customer's site. The customer's brand color and font pair are applied as CSS variables on the template's outer element. `templates/color.ts` picks readable text for any brand color, so a pale color cannot make buttons or links unreadable.
- **Font choices are a fixed list of twelve pairs** in `templates/fonts.ts`, to be grown over time (Miguelle, 2026-11-22): Friendly (Nunito), Modern (Manrope), Classic (Lora + Source Sans), Clean (Inter), Confident (Montserrat + Open Sans), Elegant (Playfair Display + Lato), Warm (Bitter + Source Sans), Geometric (Poppins), Editorial (Libre Baskerville + Karla), Sturdy (Rubik), Fresh (Plus Jakarta Sans), Trusted (Roboto Slab + Roboto). The pair ids are saved inside websites, so never rename one. All are open-licensed (SIL Open Font License) families; the files are in `templates/font-files/` (latin, weights 400/600/700 for body fonts, 700 for heading-only fonts).
- **Starter content and publish checks** (decided by Miguelle, 2026-11-22). A new customer's website starts with obvious placeholders (`starterContent`: "Your Business Name", "(000) 000-0000", "Replace this with a real review…"), not the realistic Brightside sample, which is kept for previews (`sampleContent`). When Publish is pressed, `templates/publish-checks.ts` compares the draft with the starter content, field by field. Each schema field can carry `publishCheck`: **"required"** blocks publishing and is listed in a red box ("Change these before you publish") with a "Fix this" button that opens the field; **"recommended"** is listed in a yellow box and can be published anyway. Required: business name, tagline, phone, email, service area, reviews, before-and-after photos. Recommended: services, opening hours, the hero photo, page titles. Every future template must mark its fields the same way.
- **How the editor works.** `components/editor/EditorShell.tsx` holds the content being edited in React state. `FieldRenderer` picks an input for each schema field by its type, so there is no per-template editor code. The preview is an iframe of `/preview/[id]?embed=1`; the editor sends the content to it with `postMessage` after every edit (`lib/preview-messages.ts`), and the preview tells the editor when a menu link is clicked. The preview is drawn at a true device width (1280, 768 or 390px) and scaled to fit. Save draft writes only the draft; Publish (simulated) copies the draft to `published`. The editor is in its own route group `app/(editor)/` with no sidebar and no back-to-top button.
- **Editing by clicking on the preview** (asked for by Miguelle, built 2026-11-22). In the editor's preview, plain words (headings, paragraphs, button labels, phone, email, list entries' text) can be clicked and typed in place; the form on the left updates as they type. Clicking anything else (a photo, a social link, the quote form's button) opens and focuses its field in the form. The website's own menu still switches pages; every other button or link is edited when clicked, not followed. Enter or Escape ends an edit; text is always plain (no formatting can be typed or pasted).
  - **Rule for every template:** each element showing customer content carries `data-edit` with the field's address, added with `editable(...)` from `templates/editable.ts` (`"home/hero/heading"`, or `"site/services/items/<entry id>/name"` for a list entry). The element must contain only that field's text; wrap part of a sentence in a `<span>`. Use `editableInForm(...)` for text inside a real `<button>`.
  - **How it works:** `components/preview/InlineEditing.tsx` wraps the template in the embedded preview, turns on `contenteditable="plaintext-only"` for text fields, and sends `studio:select` and `studio:edit` messages to the editor. `lib/editor/edit-path.ts` reads the addresses and decides text vs. form. `lib/editor/caret.ts` keeps the typing cursor in place while React redraws the text. The editor applies the words with `setTextAtTarget` and scrolls the matching field into view (`data-field` / `data-item` markers in the form).
  - **Limits:** the browser's Undo (Cmd+Z) is unreliable while typing in place; fields hidden when empty (a service's price, the form's note) can only be filled from the form; page titles for search engines are form-only because they are not visible on the page.
- **Leaving the editor with unsaved edits** (Miguelle, 2026-11-22): the "My websites" link opens a question, "Save your changes?", with Save changes (save, then leave), Continue without saving, and Keep editing (`components/editor/UnsavedDialog.tsx`). Closing the tab shows the browser's own warning. The browser's Back button is not covered.
- **Photo upload** (asked for by Miguelle, built 2026-11-22). In an image field a customer can choose a file from their device (on a phone this offers the camera and photo library), drag a file onto the field's drop area, drag a file onto a photo in the preview, or reuse an earlier upload. `lib/media/prepare-image.ts` accepts JPG, PNG, WebP and GIF up to 25 MB and shrinks anything larger than 2000px on its longest side (PNG stays PNG, other photos become JPEG). Uploads are stored in the browser's **IndexedDB** (`lib/data/media.ts`, database `migsflow-studio-media`), not `localStorage`, which is too small for pictures. Content refers to an upload as `media:<id>` (`lib/media/ref.ts`); `components/preview/TemplateView.tsx` swaps those for drawable addresses just before a template draws (`hooks/useMediaUrls.ts`), so templates only ever see ordinary pictures. Phase 3 replaces the store with Supabase Storage. Files dropped anywhere else in the editor or preview are ignored, so a stray drop cannot open the file and lose work. **The Media Library page (Milestone 6) should be built on this same store:** list, delete, and "where is this picture used".
- **Save draft and Publish live at the bottom of the editing panel**, not in the top bar (Miguelle, 2026-11-22). `components/editor/EditorActions.tsx` is pinned to the bottom of the panel on wide screens and runs along the bottom of the screen on phones (so it is there in both Edit and Preview). Claude pinned it rather than placing it after the last section, so it is reachable without scrolling a long form; Miguelle asked for "below the last thing being edited" and may still prefer that literally.
- **Editing panel look** (Claude's choices, 2026-11-22, on Miguelle's invitation to improve it): the title and the page choices stay at the top while the form scrolls; pages and "Site-wide settings" are pill buttons (`components/editor/ScopePicker.tsx`), with a red dot on any that still has placeholder details that block publishing; each section shows "Must change" (red) or "Suggested" (yellow) from the same publish checks; the open section gets the dashboard menu's blue marker.
- **Editor layout** (Miguelle, 2026-11-22). The editing panel has a title ("Edit your website"). A draggable divider (`components/editor/PanelResizer.tsx`; also arrow keys, Home and End) sets the panel's width between 320 and 720px, remembered in this browser. Preview sizes are **Fit** (the default: the website is exactly as wide as the space it has, at real size, so dragging the divider reflows it like a browser's inspect tool), Desktop, Tablet and Phone, with a "px wide" readout. Sections open and close with a 300ms slide (a grid-rows transition, skipped for reduced motion); they are buttons with `aria-expanded`, not `<details>`, and a closed section is `inert`.
- **The Milestone 6 pages** (2026-11-22). Each is a server `page.tsx` plus a `"use client"` content component in `components/dashboard/` with the four states.
  - **Media Library** runs on the real upload store: add several photos at once (button or drag and drop), see size and where each is used, **Replace** (keeps the picture's id, so every website using it shows the new file) and **Delete** (warns when the picture is in use; those spots then show empty).
  - **Domains** (simulated): each website's free address; add your own domain (cleaned and validated by `lib/validation.ts`), the two DNS records to add, "Check again" (always succeeds, and says so on the page), connected and SSL status, remove. `192.0.2.1` is a reserved example address.
  - **Hosting & Publishing** (simulated): status, live address, last published, a publishing history table, and a Publish button that runs the same publish checks as the editor ("Fix this" goes to the editor). Each publish adds a row to the history.
  - **Billing** (sample): templates bought, "no subscription", payments and invoices. One sample price, $350, lives in `lib/mock/seed.ts`; Miguelle's range is $300–$500 and real prices are not set. Invoice download is simulated.
  - **Account Settings:** personal and business forms with validation; saving is simulated and says the details are not stored (the sample customer is read on the server, so persisting edits would need the customer moved into the browser store; left for Phase 3). Sign-in is described as passwordless; Sign out is simulated.
- **Transitions** (Miguelle, 2026-11-22): the dashboard's phone menu slides in and out and its backdrop fades; the template's phone menu fades; the light/dark switch cross-fades (View Transitions); editor sections slide. All are skipped for reduced motion, and older browsers fall back to an instant change.
- **Overview layout** (Miguelle, 2026-11-22): "Your websites" then "Quick actions" (three tiles) on the left, "Recent activity" on the right, so the columns are close in height.
- **Layout trap, found the hard way (three times):** any scrolling panel, any `overflow-hidden` wrapper, and any `overflow-x-auto` table box that contains visually hidden (`sr-only`) elements must be `relative`. Otherwise those absolutely positioned elements escape the panel, make the whole page scrollable, and focusing one scrolls the page (this was the "grey space" Miguelle saw under the editor).
- **Two kinds of template** (2026-11-22). `kind: "html"`: a hand-written HTML/CSS/JS site in `public/templates/<id>/`, shown as the real page in an iframe and filled in by **`public/studio-bridge.js`** (plain JavaScript, no build step). `kind: "react"`: a React component (Fresh Start). **HTML is the main kind from now on, because it is how Miguelle builds templates.** Schema, content, the editor, publish checks and click-to-edit are the same for both. The bridge's markers (`data-edit`, `data-mirror`, `data-edit-image`, `data-edit-tel`, `data-edit-mailto`, `data-edit-map`, `data-edit-href`, `data-edit-content`, `data-studio-colors`) are documented at the top of the bridge file and in **`documentation/template-guide.md`**, the step-by-step guide written for Miguelle. In the editor the preview iframe points straight at the template page with `?studio=edit`; the stand-alone preview shows it under Studio's bar (`components/preview/HtmlTemplateFrame.tsx`).
- **Fixed lists.** A list field with `fixed: true` has a set number of entries (9 services, 4 steps): editable, but no add, remove or reorder, because the template's own markup and scripts expect that number. Entries have stable ids (`s1`…`s9`) used in the page's markers.
- **(Removed 2026-11-23.) Moving Day template** (`moving-bayou`, $450, from `../Moving_Company`, the fictional Bayou City Movers). One page: hero slideshow, multi-step quote form, services carousel, areas, four-step process, numbers strip, closing banner, contact, footer. 160 marked values. **Changed from the original, on Miguelle's instruction:** the Houston map, ZIP checker and neighbourhood cards were replaced by a simple six-item areas list in the same style, and the map's JavaScript and Leaflet were removed. Otherwise the layout is untouched: 26 parts of the page measure the same as the original at 1440, 1024 and 390px. Two colors are editable, and **every brand color on the page follows them** (2026-11-22): the 27 fixed see-through reds in the CSS were rewritten as `color-mix()` of the color variables, two more shades became variables, and the two red SVG background textures are recolored by the bridge (`data-studio-textures`). Set back to the originals, the page's own values are used again exactly. The logo and the photos are pictures, so they do not change color. Fonts are the template's own (Bebas Neue, Poppins), not the twelve pairs.
- **A website's picture in lists is its hero image** (Miguelle, 2026-11-22, for this and every future template). Each template names it with `heroImage` in its `index.ts`; `lib/website-preview.ts` reads it from the draft and `components/dashboard/WebsiteThumbnail.tsx` shows it in My Websites and the Overview, so it changes when the customer changes that photo.
- **Addresses.** The marketplace owns `/templates` (`/templates`, `/templates/industry/<industry>`, `/templates/<id>`). The hand-written template files therefore live at **`/site-templates/<id>/`** (`public/site-templates/`), moved from `public/templates/` on 2026-11-22.
- **Public pages are Server Components built ahead of time** (`app/(public)/`, components in `components/marketing/`). They read the catalog through `lib/data/templates.ts`, which works on the server because the catalog does not live in the browser. Industry filtering is done with links to industry pages, not JavaScript. Industries are listed in `lib/industries.ts`. A template's page lists "what you can change" straight from its schema.
- **Known gap:** an address for a template or industry that does not exist shows the "Page not found" page with a `noindex` tag, but answers with status 200, not 404. Under Cache Components the `dynamicParams` setting that would force a 404 is not available. Settle this in the checks step.
- **Next.js keeps the page you just left in the document, hidden**, after moving between pages. Tests must look at visible elements only.
- **Public page look** (2026-11-22, after Miguelle said the marketplace looked plain). Header: a floating, see-through rounded bar (`components/marketing/SiteHeader.tsx`) with the brand, the industry links with the current one marked, a round sun/moon theme button, and "Open the demo". Top sections use `components/marketing/PageHero.tsx`: a large Orbitron heading over `.brand-backdrop` (a glow made from the color tokens) and `FlowLines` (three curves in the brand blues with a bright stretch travelling along each). The marketplace shows two real templates in tilted browser frames (`TemplateShowcase`, `BrowserFrame`) that rise into place once on load. Template cards are browser frames that lift on hover, with **the price on a green tag over the picture** (Miguelle's request). All motion is skipped for reduced motion.
- **Theme switch** (`lib/theme.ts`): the new theme spreads out in a growing circle from the button that was pressed, using View Transitions; the sun and moon spin into each other. Browsers without View Transitions, and reduced motion, switch instantly. A 400ms safety net applies the theme anyway if the browser is slow to start the transition (seen once in WebKit). The public header has the round icon button; the dashboard sidebar keeps the icon-and-words row.
- **Template prices** live in `lib/mock/templates.ts` only, all Claude's picks within Miguelle's $300–$500: Fresh Start $350, Clean Slate $300, Easy Move $350, Steady Haul $400, Open Door $300, Common Ground $350.
- **Shop pictures** (Miguelle, 2026-11-23): in the shop, the template page and the marketplace showcase, a template is shown by a **picture of its hero section** (`public/images/templates/<id>/card.webp`, via `templateCardImage()` in `lib/showcase.ts`), not just its hero photo. In the dashboard a customer's website is still shown by its hero photo, so it follows their edits.
- **A template is a pure function of its content:** the same saved content always renders the same site. This keeps every Phase 5 publishing option open.
- **Each website stores two copies of its content, `draft` and `published`.** The editor changes only the draft; Publish copies draft to published (simulated in Phase 1).
- **Customer brand colors** are applied as CSS variables on the template's root (handbook Section 3, exception 2). **Fonts** are chosen from a fixed list, because `next/font` loads fonts at build time.
- **Components never read mock data directly.** They call functions in `lib/data/`, so Phase 3 swaps Supabase in without touching the pages.
- **Websites and activity are loaded in the browser**, because the demo data lives in `localStorage` (`lib/data/store.ts`) so that Milestone 5's edits can persist. A page is two files: `page.tsx` on the server (title, heading) and a `"use client"` content component that calls `useLoad()` (`hooks/useLoad.ts`) and handles loading, error, empty and success. The sample customer is still read on the server.
- **Light and dark themes** (Miguelle, 2026-11-22). **Light is the default**; `<html data-theme>` starts as `light` and `[data-theme="dark"]` in `app/globals.css` gives the same tokens dark values. A `dark:` class prefix exists for the rare dark-only class. Components use tokens only, so no component knows which theme is on. The choice is saved in `localStorage` under `theme` and applied before first paint by the inline script in `app/layout.tsx`. The system's own light/dark setting is not followed; ask Miguelle if that is wanted.
- **No blank space beside a longer column** (Miguelle, 2026-11-22). Every side-by-side layout uses `components/ui/SplitColumns.tsx`: the shorter column stays in view (sticky) while the longer one scrolls. Applies to all future pages.
- **Body text is Poppins everywhere** (Miguelle, 2026-11-22). Orbitron is only for the brand name and page titles.
- **Verification builds run in a separate copy of the project**, not in this folder, so Miguelle's running `npm run dev` is not disturbed.
- **Prices live in one data file**, never in components. **Template price range: $300–$500** (Miguelle, 2026-11-22: these are informational static sites, and this range lets the product scale). This replaces the brief's "$15–$20". Exact prices per template are not set.
- Dashboard, editor and preview pages are `noindex` and stay out of the sitemap. The handbook's static-page and SEO rules apply to the public pages (Phase 2).

### Still open (ask Miguelle; do not assume)
- **Forms and the hosting choice (Claude's suggestion, 2026-11-22, not decided):** make the Studio form inbox part of the $25 hosting plan. A hosted site's quote form then works with no setup, and a downloaded site's form would need the customer's own form service or fall back to "call or email us". It gives the subscription a clear benefit and keeps downloads free of support.
- **Forms on customer sites (not decided; needed by Phase 3):** Miguelle wants the least possible involvement and no per-customer cost surprises. Their own sites use Netlify Forms plus Brevo for branded emails, and Brevo costs money. Claude's recommendation (2026-11-22): a **Studio form inbox**. Every template's form posts to one Studio endpoint, the submission is saved to the customer's dashboard ("Messages") and a plain notification email goes to the address the customer typed in the editor. It works on any host, needs no customer setup, and one email account serves the whole platform. Fallback with zero running cost: the customer pastes their own form-service key or a link to their own form. Either way the content schema gets a "send form submissions to" email field, and the form in Phase 1 is a labeled demo.
- **Hosting and downloads (decided by Miguelle, 2026-11-22).** (1) MigsFlow offers hosting through **Netlify under Miguelle's own account**, as an **optional extra at $25 a month** on top of the one-time template price ($300–$500). (2) Customers may instead **download their website files** and host them elsewhere; all setup there is **the customer's responsibility, not MigsFlow's**, and the product must say so plainly. (3) Miguelle will confirm with Netlify: whether hosting other businesses' sites under one account is allowed, limits and pricing as site numbers grow, the deploy API, and the real DNS values (the Domains page shows placeholders). **Studio customers' sites will live in their own Netlify team, separate from Miguelle's client projects** (decided by Miguelle, 2026-11-22), so Studio's API key cannot touch client sites and a credit shortfall cannot pause them. Turn auto-recharge on for that team.
- **Netlify facts for Phase 5** (Miguelle's answer from Netlify, checked by Claude against netlify.com and docs.netlify.com on 2026-11-22; re-check before building, prices and limits change).
  - **Allowed:** the Acceptable Use Policy permits using Netlify "to build, deploy, and host sites and applications for third parties". Reselling Netlify itself as a standalone hosting service is not allowed without a written agreement. Studio sells finished sites, so it is on the allowed side.
  - **Plan and cost:** Pro is $20 a month flat (unlimited members) with 3,000 credits; more credits in steps up to 20,000 a month, or auto-recharge at $10 per 1,500. Rates: bandwidth 20 credits per GB, each production deploy 15 credits, web requests 2 credits per 10,000, **form submissions free and unlimited**. So one publish costs about 10 cents and a GB of traffic about 13 cents, against $25 a month per hosted customer.
  - **The big risk:** when a team's credits run out, **every site on that team is paused** and shows "Site not available". Auto-recharge is **off by default**. Turn it on, and this is the strongest reason to keep Studio's sites in their own team, apart from client projects.
  - **Project limit: 500 per team, per Netlify's docs.** The page "Credit-based pricing plans" (docs.netlify.com, last updated Oct 30, 2026) has the row "Project count limit | 500 projects | 500 projects | 500 projects" for Free, Personal and Pro, twice, with no note on raising it. Netlify's support assistant told Miguelle it could not find that figure; Claude re-read the page on 2026-11-22 and the row is there. Treat 500 as real until a person at Netlify says otherwise in writing.
  - **Publishing rate limit: 3 deploys a minute and 100 a day, per API token** (so shared by every Studio customer), per Netlify's answer to Miguelle; Netlify's API docs say to contact them for higher limits. **Phase 5 must put publishes in a queue:** space them out, retry when Netlify answers "too many requests" (HTTP 429), and merge repeated publishes of the same site, which also saves credits (15 per publish). Show the customer "Publishing…" and then the result, not an instant answer. Ask Netlify for a higher limit once on Pro.
  - **Miguelle will turn auto-recharge on** for the Studio team (already does so for client sites).
  - **Deploy API:** base `https://api.netlify.com/api/v1/`; create a site with `POST /sites`; publish without Git by sending a ZIP or file digest to `POST /sites/{site_id}/deploys`; set `custom_domain` with `PATCH /sites/{site_id}`; sign in with a personal access token.
  - **Real DNS values** (the Domains page still shows placeholders): `www` as a CNAME to the site's `…netlify.app` address (Netlify recommends the `www` form as primary); the bare domain as an A record to `75.2.60.5`, or ALIAS/ANAME to `apex-loadbalancer.netlify.com` where the registrar supports it.
  - **Not confirmed:** that commercial or client hosting requires Pro (the Terms and AUP do not say so; the subscription agreement could not be read), and the "100 domains per site" figure (the docs only recommend no more than 50 aliases per site; irrelevant while each customer has their own site).
- **Who owns what (asked by Miguelle 2026-11-22; Claude's explanation, terms not written yet).** Studio has **no GitHub repository per customer**. A template's code lives once, in Studio's own repository, and is sold to many customers, so it cannot be handed over the way a one-to-one client repo is. A customer's website is that template plus *their* content, stored as data. Proposed split: **MigsFlow owns** the template designs and the platform; **the customer owns** their content (words, photos, logo), their domain (always at their own registrar), and gets a **license** to use the template for their website; the **download** is their copy of the finished site's files, theirs to keep and host anywhere. Decisions for Miguelle before selling: one website per purchase or more; whether downloaded files may be edited and by whom; no reselling the template; what happens to a hosted site and its data when hosting is cancelled. These belong in written terms of sale, reviewed by a lawyer.
- **What the download must be (Claude's design note for Phase 5, from Miguelle's worry that not every host accepts the files).** Export **plain static files**: one folder per page with an `index.html`, one CSS file, the pictures and the font files, with no Next.js, React or server needed. That is the one format essentially every web host accepts. The parts that do not travel by themselves: the **quote form** (it needs somewhere to send to; see "Forms"), and the **fonts** (they must be bundled into the download). Templates are already built for this: no state, plain `<a>` and `<img>`.
- **Prices are data, not code:** $25 a month for hosting and the template prices belong in the pricing data (database and Stripe in Phase 4). The Billing page still says "no subscription" and "hosting plans are not part of this prototype"; update it when hosting is built.
- **Consequence for Phase 1 either way:** a template must work as plain website files with no dependence on Studio, so it can be downloaded or hosted anywhere.
- **Publishing method and Netlify limits** (the brief asks to confirm them before Phase 5).
- The product name ("MigsFlow Studio" is tentative), the domain, the GitHub repository and the Netlify site.
- How Studio relates to the existing MigsFlow plans (Starter $175/mo, Lump Sum, Enterprise) and to `../MigsFlow_Website`.
- **Template photos.** Fresh Start's photos are drawn placeholders that say "Sample photo" (`public/images/templates/cleaning-fresh/`). Real photos are needed before the template is sold. Miguelle is considering images generated with ChatGPT (asked 2026-11-22); Claude's view: workable for marketing-preview and placeholder pictures, as long as they are never presented as real results, and Miguelle should check OpenAI's current terms for commercial use. Not decided.
- **Published sites and fonts/icons.** How the chosen fonts travel with a downloaded or published site is a Phase 5 question.
- **Uploaded images in the Media Library:** the exception is confirmed (Section 3). The exact Phase 1 approach (browser-only storage) is decided at Milestone 6.

## 3. Handbook exceptions for this project

Decided by Miguelle on 2026-11-21. These apply to Studio only; the handbook itself is unchanged.

| Handbook rule | Studio does this instead | Why |
|---|---|---|
| JavaScript, not TypeScript (Section 8; "never silently switch to TypeScript") | **TypeScript** (`.ts` / `.tsx` files) | The brief asks for it. Explain each TypeScript idea the first time it appears. |
| Reviews, testimonials and facts must be real (hard rule 13) | **Fictional sample content is allowed** in templates and mock customer data, and is **labeled on screen as sample content** that the customer replaces | A template needs example content to be previewed |
| No route groups without agreement (Section 1) | **Two route groups:** one for public pages, one for the dashboard, each with its own layout | The dashboard needs a sidebar shell; public pages need a header and footer |
| Back-to-top button on every page (hard rule 14) | **Left off the Website Editor screen only** | It would sit on top of the live preview |
| Every raster image uses `next/image` from `public/images/` (hard rule 6) | **Customer-uploaded images are exempt** (they are not files in the repo). Studio's own images still follow the rule. | Customers must be able to upload images from their own computer. Confirmed by Miguelle on 2026-11-22. |
| Keep the Tailwind wiring exactly as `create-next-app` wrote it; don't migrate by hand (Section 1) | **Switched to `@tailwindcss/postcss`** with `postcss.config.mjs`; `@tailwindcss/turbopack` removed | With the generated loader (Next.js 16.4.6, Tailwind 4.3.3) a running `npm run dev` did not notice saves to `app/globals.css`, so style changes needed a restart. Reproduced in a clean copy; the PostCSS setup picked up the same saves. This answers the handbook's open question in Section 23; the handbook itself has not been edited. |
| Fonts load through `next/font`, and `next/font/google` is allowed (Section 7) | **Never `next/font/google` or any Google font service.** Font files are downloaded once as `.woff2` and kept in the project (`app/fonts/` for Studio's own, `templates/font-files/` for customers' choices), loaded with `next/font/local` | Miguelle's rule for all their work (2026-11-22): they download every font and host it themselves. It also means a published or downloaded customer site can carry its fonts with it. |
| Approved dependencies only (Section 8) | Supabase and Stripe packages will need approval in Phases 3 and 4. Phase 1 adds none beyond the approved set plus TypeScript. | |

## 4. Folder layout

| Path | What it is |
|---|---|
| `CLAUDE.md` | This file: project guide and change log |
| `handbook/CLAUDE.md` | Copy of the MigsFlow handbook v3.1 (Next.js + Tailwind). The master is `../MigsFlow Handbook/v3.0-nextjs-tailwind/CLAUDE.md`; when a rule changes, change both and add a row to the handbook's Section 23 |
| `documentation/project-brief.md` | The scope, as written by Miguelle |
| `documentation/project-checklist.md` | Launch checklist, from the v3.1 template (written for client projects; client-only items are N/A) |

Planned once the app exists (Milestone 1 onward): `app/` (routes, in two groups plus the preview route), `components/` (`ui/`, `dashboard/`, `editor/`), `templates/` (one folder per template: schema, sample content, sections), `lib/` (`types.ts`, `data/`, `mock/`, `site.ts`).

**Frontend and backend (Miguelle, 2026-11-22: the structure must keep them clearly apart, because real backend data is coming).** Approved by Miguelle on 2026-11-22: one Next.js app, not two top-level `frontend/` and `backend/` folders, because with Supabase there is no separate backend program to put in a `backend/` folder (unlike the Courier Portal's separate server). The split is drawn like this instead: **frontend** = `app/`, `components/`, `templates/`; **backend** = `supabase/` (database tables and security rules, added in Phase 3) and `lib/server/` (code that only ever runs on the server and may hold secrets: later Stripe, publishing, form inbox); **the one doorway between them** = `lib/data/`, the only code pages call for data. In Phase 1 `lib/data/` reads mock data; `lib/server/` and `supabase/` exist as empty, explained placeholders (each has a README).

**The handbook is guidance for this project, not a fixed rulebook** (Miguelle, 2026-11-22): where Studio needs something different, say so, record it in Section 3 and go ahead.

Folders now: `app/` (root layout, `globals.css`, `robots.ts`, `not-found.tsx`, `global-error.tsx`, icons; `(public)/` landing placeholder; `(dashboard)/` shell and the seven sidebar pages; `(editor)/` the editor; `preview/[websiteId]/`), `components/` (`ui/`, `dashboard/`, `editor/`, `preview/`), `templates/` (the system files plus `cleaning-fresh/`), `hooks/`, `lib/` (`data/`, `mock/`, `editor/`, `media/`, `server/`, and single files), `public/images/`, `supabase/`, plus `next.config.ts`, `postcss.config.mjs`, `tsconfig.json`, `eslint.config.mjs`, `.nvmrc` (Node 24), `.gitignore`, `AGENTS.md`, `README.md`.

## 5. Change log

Newest first.

### 2026-11-22: marketplace redesigned; theme switch moved to the header; stopping point
- **Miguelle's feedback:** the marketplace's top section and navigation looked very plain; nothing in Studio should look basic; put the light/dark switch in the header as a sun and moon icon with a good color transition; show the price on the card on a green background. Then: taking a break, log the stopping point, commit and push.
- **Built:** floating header with marked current link (`SiteHeader`, `MarketingNavLinks`); `PageHero`, `FlowLines`, `BrowserFrame`, `TemplateShowcase`; marketplace and industry pages rebuilt on them; template cards as browser frames with a green price tag (`formatPrice` drops the ".00"); `lib/theme.ts` with the circular reveal; `ThemeToggle` gained an icon variant; the footer's switch was replaced by a Studio links column; `.brand-backdrop`, `rise` and `flow` animations in `app/globals.css`.
- Fixed on the way: the header's demo button showed squeezed on phones (a hiding class contradicted the button's own display class; the wrapper hides it now); the flowing lines ran through the text and were moved to the bottom and faded out on the left; industry pages skipped a heading level (an `h2` was added).
- Verified on a production build of a copy, in a real browser: the marketplace, a template page and the marketplace in dark mode pass axe with no issues; cards show $450 and $350 on the green tag; filtering, the template pages and the editor still work; no sideways scrolling on six public pages at six widths; the theme switches by click and by keyboard, is remembered after a reload, and switches back, in both Chromium and WebKit; with reduced motion it switches at once; no console errors.
- Not verified: the industry page was not rescanned after its heading fix; how the circular reveal looks in real Safari and Firefox; the redesign by Miguelle's eye.
- **Committed and pushed** at Miguelle's instruction.
- **Next:** Phase 2 step 3, the full live preview of a template.

### 2026-11-23: Next.js "instant navigation" warning; footer class names; commit
- Next.js's dev tools flagged "URL data outside of Suspense" on `/preview/template/[templateId]`. Fixed the way its guide (`node_modules/next/dist/docs/01-app/02-guides/instant-navigation.md`) recommends: the part that reads the address moved into its own component inside `<Suspense>`. **Rule for new pages:** anything that awaits `params` goes inside `<Suspense>`.
- Footer: three Tailwind class-name warnings fixed (`size-4.5`, `sm:hover:translate-y-[-60%]`).
- Miguelle asked to commit and push all of 2026-11-23's work; done. **Next:** redesign the landing page's hero after the Framo template Miguelle shared (not identical).

### 2026-11-23: Moving Day removed; six basic templates; hero-section pictures in the shop
- Miguelle: remove the moving company template; Claude makes its own templates, "two for each" industry, "as basic as possible", until Miguelle's own are ready. And the shop should show each template's hero section as its picture.
- **Removed:** `templates/moving-bayou/`, `public/site-templates/moving-bayou/` (both still in Git history, commit `cb84252`), its showcase pictures, its catalog entry, and the demo website "Bayou City Movers". The HTML engine (`public/studio-bridge.js`, `HtmlTemplateFrame`, `tools/sample-content-from-html.py`, `documentation/template-guide.md`) stays for Miguelle's own templates.
- **New shared design** `templates/basic/`: one page (header, hero, services or programs, about, contact form, footer) with two hero layouts, "split" (words beside the photo) and "banner" (photo across the top, words over it). `defineBasicTemplate()` turns a sample business into a full template. Five templates on it: Clean Slate (cleaning, banner, $300), Easy Move (moving, split, $350), Steady Haul (moving, banner, $400), Open Door (nonprofit, split, $300), Common Ground (nonprofit, banner, $350). Each has a made-up sample business (555-01xx phone numbers, `.example` emails) and a drawn "Sample photo" hero picture (`public/images/templates/<id>/hero.svg`). Starter content swaps the sample business for placeholders.
- **Demo data:** the third demo website is now "Northgate Moving Co." on Easy Move (`site_northgate`). Storage key bumped to `v8`, so the demo resets once.
- **Pictures:** `tools/make-showcase-screens.py` became `tools/make-template-pictures.py`, which also writes the shop picture (`card.webp`, the top 16:10 of a 1440×900 screenshot). Cards, the marketplace showcase and the template page use it. The landing page's laptop now cycles through all six templates; its dots became 24 × 24 px tap targets.
- **Tested** on a production build: axe finds 0 issues on all six sample sites, all six template pages, the marketplace, the three industry pages and the landing page (desktop and 320 px); no sideways scrolling at 320 px; each industry page lists its two templates; the editor opens Northgate and typing on its preview works.

### 2026-11-23: Phase 2 step 3, the template live preview
- `/preview/template/<id>` (`app/preview/template/[templateId]/page.tsx` + `components/marketing/TemplateLivePreview.tsx`): full screen, no site header or footer. Bar: Back, the template's name and price, Fit / Desktop / Tablet / Phone, "Sample content" label, "Try the editor". Below: the sample website in an iframe sized like the editor's.
- `/preview/template/<id>/site` (`components/preview/SampleSite.tsx`): the template drawn with its sample content, nothing else. Drawn per visit (`await connection()`), because Fresh Start's footer shows the current year. Menu links switch pages inside it; the form and outside links show a notice in the viewer's bar.
- The editor's sizing code moved into `hooks/useDeviceFrame.ts`, now shared by the editor and the live preview.
- The template page (`/templates/<id>`) got a "Live preview" button, and its picture now opens the preview too.
- Tested on a production build, both templates: every size gives the right width (1440 / 768 / 390), Fresh Start's pages switch, the form notice shows, axe finds 0 issues on the viewer and the template page, no sideways scrolling at 320–768 px, and the editor's Phone size still works.
- Miguelle's earlier verdict on Firefox: still choppy after turning on hardware acceleration; accepted as a Firefox issue, moving on.

### 2026-11-23: Second speed pass, for Firefox
- Miguelle: still slow after the first pass. Animations choppy, scrolling stutters, clicking between pages is slow. **Miguelle views the site in Firefox**, and had only tried `npm run dev`.
- Measured: Chromium on the M1's graphics chip at Retina size drew the page smoothly (about 4% of the chip's time). Clicking between pages: up to 1.4 s on the dev server against under 0.2 s on a production build, so part of the slowness is the dev server itself. Playwright's Firefox would not start on this Mac ("Could not find profile folder", even outside the sandbox), so Firefox itself could not be measured.
- Changed, aiming at what Firefox redraws on every frame:
  - Stars: the glow is a radial gradient inside each star, not three box-shadows; the twinkle animates only `transform` and `opacity`, with `will-change`.
  - Floating laptop and phone: no `drop-shadow` filter on the moving pictures; still, soft "floor" shadows underneath instead.
  - Flowing lines (`FlowLines.tsx`): no longer animated (dash animation repaints the SVG every frame). The `flow` keyframes were removed.
  - All keyframes (float, shooting stars, rise, caption) use `transform` instead of the newer `translate`/`scale` properties.
- **Speed rule for public pages** (also written in `globals.css`): looping animations change only `transform` and `opacity`; no box-shadow or filter on anything that moves; no `backdrop-blur`; `data-pause-offscreen` on animated sections.
- Checked: type check and lint pass; screenshots in light and dark look as before. **Waiting on Miguelle** to try it in Firefox with a production build (`npm run build`, then `npm run start`).
- Miguelle's verdict afterwards: smooth in Chrome, still slow in Firefox; they think it is Firefox itself. Agreed to leave it there. The speed fixes stay (they cost nothing in looks). Suggested check if it matters later: Firefox's `about:support`, "Compositing" row ("WebRender (Software)" means Firefox is not using the graphics chip); and compare migsflow.com in the same Firefox.

### 2026-11-23: Smoother scrolling on the public pages
- Miguelle: the site "moves extremely slowly and its laggy", probably the animations.
- Measured first (production build and the dev server, Chromium without a graphics card): a steady 60 frames a second and little work per frame, so the cost is in what the Mac's graphics chip redraws on a Retina screen, which that test cannot see. The fix follows the one migsflow.com already made ("remove card blurs, pause off-screen animations"):
  - **No frosted-glass blur** (`backdrop-blur`) anywhere on the public pages: the sticky header bar, the hero's pills and the slideshow caption are now nearly solid (`bg-panel/85`–`/90`). The header was re-blurring the page on every scroll frame.
  - **Animations pause off screen:** `components/marketing/PauseOffscreen.tsx` (in the public layout) marks any `data-pause-offscreen` section with `data-offscreen` while it is out of view, and `globals.css` pauses every animation inside it. Marked: the landing hero, `PageHero`, the footer.
  - **The rings no longer spin.**
- **Rule for later pages:** no `backdrop-blur` on public pages, and put `data-pause-offscreen` on any section with looping animations.
- Checked: type check and lint pass; in the dev server, the footer stars stay paused until the footer is scrolled into view, the marketplace's top section pauses once scrolled past, and no element has a blur. **Not yet confirmed by Miguelle** that it feels smooth on their Mac.

### 2026-11-23: Landing hero and footer in the migsflow.com style
- Miguelle's request: the landing page looked "basic and plain"; make its hero match (or beat) migsflow.com's hero, and make the footer an extension of the main site's footer.
- **Landing page `/`** (`app/(public)/page.tsx`): eyebrow pill with a pulsing dot; Orbitron headline "Websites Built For Your Trade, Ready To Make Yours" with the gradient line; the prices in a bordered strip ("Templates from $350 one-time | Hosting $25/mo optional", both read from the data doorway); a gradient "Browse templates" pill with a glossy top and an icon circle; a "Try the editor demo" button with a white play circle; a "Designed and built by MigsFlow Web Design" link to migsflow.com in place of the main site's client photos (no fake reviews); the Prototype label.
- **Device showcase** (`components/marketing/DeviceShowcase.tsx`): the main site's laptop and iPhone frames (copied to `public/images/showcase/`) cycling through Moving Day and Fresh Start every 6 seconds, with the caption bar, View template, previous / dots / pause / next. Pauses while pointed at or focused; starts paused for reduced motion; screen readers hear slide changes only once paused. The tilted screens are made by the new `tools/make-showcase-screens.py` (the shape of the glass is in `tools/showcase-masks/`).
- **Footer** (`components/marketing/SiteFooter.tsx`): brand, short line, the Instagram and TikTok buttons; columns Templates / Studio / MigsFlow (the last links to migsflow.com); the giant "LET'S BUILD YOURS" with the round gradient "Browse templates" bubble over it (under it on phones); stars; Prototype label and copyright.
- **Shared look** (`app/globals.css`): `site-backdrop` (the main site's glows down the whole public page, light and dark), stars and shooting stars, gradient text and fill, floating keyframes. `StarField` was also added to `PageHero`, so the marketplace and industry pages share the stars.
- New data: `hostingMonthlyCents` (2500) in `lib/mock/templates.ts`, read through `getHostingPrice()` in `lib/data/templates.ts`. `lib/showcase.ts` lists which templates the showcase shows.
- **Tested** on a production build: axe finds 0 issues on `/`, `/templates`, `/templates/industry/moving` and `/templates/moving-bayou`, in light and dark (this includes the industry page rescan owed from 2026-11-22). No sideways scrolling at 320–1920 px. Slideshow: advances by itself, stays put when paused, dots / next / View template work, starts paused with reduced motion. WebKit renders it with no errors and no overflow. Fixed during testing: the price strip broke "one-time" across lines at laptop width.
- **Not checked:** real Safari and Firefox; Miguelle's own eye.
- **Not committed** (Miguelle did not ask this time).

### 2026-11-22: Phase 2 step 2, the marketplace
- Miguelle: carry on step by step; the marketplace is next.
- **Moved** the hand-written template files from `public/templates/` to `public/site-templates/` so the marketplace can use `/templates`. Storage key bumped to `migsflow-studio:demo:v7` because saved content holds picture addresses (demo edits reset again; uploads kept).
- **Built:** `components/marketing/` (SiteHeader, SiteFooter, CurrentYear, IndustryFilter, TemplateCard, TemplateGrid); `app/(public)/layout.tsx` with the real header and footer; `/templates`; `/templates/industry/[industry]` (cleaning, moving, nonprofit; nonprofit shows an empty state); `/templates/[id]` (hero image, description, price, pages, what is included, what you can change, a disabled Buy button labeled as not built). The landing page is still the placeholder, now with a "Browse templates" button.
- **Data:** `Template` gained `summary` and `features`; `lib/data/templates.ts`; `lib/industries.ts`; `templateHeroImage()` in `lib/website-preview.ts`. `NEXT_PUBLIC_BUILD_YEAR` added in `next.config.ts` for the footer year.
- Verified on a production build of a copy, in a real browser: all seven new addresses are built ahead of time as static pages; both template cards show their image, name and price ($450 and $350); the filter leads to the right industry page and marks it as current; the nonprofit page shows its empty state; each template page shows the right price and pages and a disabled Buy button; axe reports no issues on the marketplace, an industry page, a template page and the marketplace in dark mode; no sideways scrolling on six public pages at six widths from 320 to 1920px; the template files load from their new address and the editor still opens the moving template; no console errors or failed requests.
- Not verified: Safari and Firefox for the new pages; keyboard and VoiceOver by a person; page speed (needs a deployed address).
- **Next:** Miguelle reviews, then step 3 (full live preview of a template).

### 2026-11-22: Moving Day colors follow everywhere; hero image as each website's picture
- **Colors** (Miguelle: the contact form's colors and the site's gradients should change too). In the Studio copy of the template: 27 `rgba()` brand colors became `color-mix()` of the variables; `#FF8A98` and `#2A050C` became `--color-red-soft` and `--color-maroon-deep`; the contact section's streaks and the process section's particles are now recolored copies made by the bridge. `public/studio-bridge.js` gained the `soft` and `deep` shades and `data-studio-textures`. The schema's note that textures stay red was removed.
- **Thumbnails** (Miguelle: show the hero image as the site's preview in My Websites, for every site from now on). `heroImage` added to `TemplateDefinition`; new `lib/website-preview.ts`; `WebsiteThumbnail` now takes the website and shows its hero image, with the drawn page as a fallback.
- `documentation/template-guide.md` updated for both.
- Verified in a real browser: recolored to blue, no element on the page is left with a red text, background or border color, and both textures are replaced; set back, the page has no overrides left. Compared with the original site pixel by pixel in 14 parts with colors unchanged: 8 are identical; the other 6 differ in under 1.4% of pixels, which in the two crops Claude looked at (footer, closing banner) is the whole part sitting one pixel lower, not a color or layout change. My Websites shows the moving truck photo for Bayou City Movers. The moving template's editor test still passes. A production build of a copy compiles.
- Not verified: the recolored page with a light main color (white text sits on it; nothing protects against a pale choice in this template), Safari and Firefox for `color-mix()` and the recolored textures.
- Miguelle asked where the page listing the templates is. There is none yet: that is the marketplace, not built. A template can be opened on its own at `/templates/<id>/index.html`.

### 2026-11-22: Phase 2 begins. HTML templates, and the Moving Day template
- **Miguelle's instructions:** start with the moving company; use the site in `../Moving_Company` as the template; price it at $450; modify its code as needed to work in Studio but **do not change the layout or design**; leave the service-areas map out and show areas more simply; other templates come later, built by Miguelle. Asked whether writing templates as static HTML/CSS/JS is a problem for Studio: no, and Studio now supports it directly.
- **New engine for hand-written templates:** `public/studio-bridge.js` and `public/studio-bridge.css`; `kind: "html" | "react"` on `TemplateDefinition`; `components/preview/HtmlTemplateFrame.tsx`; `PreviewPane` takes a `src`; `fixed` lists in the schema and `ListField`.
- **Moving Day template:** site copied to `public/templates/moving-bayou/` (73 images, 5.6 MB; unused source PNGs left behind), 160 markers added by script, areas section replaced, map code removed. `templates/moving-bayou/` holds `schema.ts`, `content.ts`, `sample-content.json`, `index.ts`. New tool `tools/sample-content-from-html.py` builds the sample content from the page.
- **Data:** `Template.priceCents`; a third sample website, "Bayou City Movers" (`site_bayou`), with its purchase and activity line. Storage key bumped to `migsflow-studio:demo:v6`, so earlier demo edits are reset (uploaded photos are kept).
- **Guide for Miguelle:** `documentation/template-guide.md`.
- **Caught by comparing against the original:** a scripting slip had written `<liNone>` into the numbers strip (it was 90px shorter), and adding the ZIP to the top bar made it 47px wider. Both fixed; the address is now three fields (street, city and state, ZIP).
- Verified in a real browser (dev server, a production build of a copy, and WebKit): the template shows in the editor; typing on the hero heading updates the form; a phone number changed in the form updates every place it appears and every `tel:` link; the business name updates in the menu, footer and copyright line; the main color changes buttons and returns to the exact original when set back; a service renamed in the form updates the card, the menu, the footer and the contact form's option; an uploaded photo replaces a service photo and its smaller versions are switched off; clicking text opens its section; Save draft works and the site is renamed from its content; the stand-alone preview shows the saved content with nothing editable; the page opened directly is untouched; the cleaning template still passes its click-to-edit test; no console errors.
- Not verified: the template's own accessibility (it is Miguelle's design and was not scanned); every one of the 160 markers by hand; dropping a file onto a photo in this template; how the quote form and carousels feel while editing; Firefox; a real phone.
- Known limits: no adding or removing services or steps; forms do not send; the starter content's placeholder text has not been reviewed by Miguelle.
- **Next:** Miguelle reviews the Moving Day template. Then either more templates from Miguelle, or the marketplace pages.

### 2026-11-22: fonts approved and pushed; font source confirmed (no code)
- Miguelle tested all twelve font pairs ("all of them look great") and pushed the work to GitHub.
- Miguelle confirmed the font source: **https://gwfh.mranftl.com/fonts** (google-webfonts-helper). Use it for any font added later.
- Miguelle asked what the next phase is. Claude outlined Phase 2 (the template marketplace); not started.

### 2026-11-22: twelve font pairs; all fonts now local files, nothing from Google
- Miguelle chose twelve font pairs and stated a standing rule: **never use Google Fonts for anything; fonts are downloaded and self-hosted.**
- `templates/fonts.ts` rewritten with `next/font/local` and twelve pairs; 38 `.woff2` files (about 700 KB) added in `templates/font-files/`. `app/layout.tsx` now loads Poppins and Orbitron from `app/fonts/`, copied from `../MigsFlow_Website/fonts`. No `next/font/google` remains.
- **Where the files came from:** Claude downloaded them from google-webfonts-helper (gwfh.mranftl.com), which packages open-licensed font families as self-hostable files. Miguelle confirmed afterwards that this is the site they use.
- Verified in a real browser against the dev server: all twelve choices appear in the editor; for each one the preview's heading and paragraph use the right font and the font file is loaded; no choice causes sideways scrolling; Studio's own text is Poppins and its titles Orbitron; **no request leaves the site**. A production build of a copy compiles.
- Slip caught by the linter: the edit to `app/layout.tsx` briefly removed the `metadata` block (page titles); restored, and the page title was checked afterwards.
- Not verified: how each pair looks by eye across all three template pages (only measured), and on the Services and Contact pages specifically.

### 2026-11-22: Miguelle's by-hand checks; font list question (no code)
- **Miguelle did the keyboard check and the VoiceOver check by hand and reports both are good.** Still not done by a person: Firefox, Safari itself, a real phone.
- Miguelle asked whether every font could be offered. Claude advised against all ~1,700 Google fonts (they must be built in ahead of time, most pairings look poor, some would break the layouts, and it overwhelms a non-designer) and suggested growing the curated list instead, to about 8 to 12 pairs. Awaiting Miguelle's choice; `templates/fonts.ts` still has 3 pairs.

### 2026-11-22: dark mode lightened to dark gray; GitHub and hosting notes; `netlify.toml`
- Miguelle asked for dark mode to be a dark gray instead of near-black. Dark tokens in `app/globals.css` changed (`ink` #1a1c22, `panel` #23262e, `raised` #2e323c, lines and muted text adjusted). Contrast recalculated for every text and status color on all three backgrounds: lowest text pair is 6.3:1; the strong line is 3.6:1 or better. Not rescanned with axe and not yet seen by Miguelle.
- **Git:** Miguelle created a private GitHub repository, `mfebres0919/MigsFlow_Studio`, and pushed one commit (`933c1fc`, "Update"). That commit is from **before Milestones 6 and 7**; everything since is uncommitted on Miguelle's Mac. Commit and push only when Miguelle asks.
- **GitHub Pages cannot show this app**, private or public: Pages only serves ready-made files, and Studio is a Next.js app that has to be built and run. (Pages on a private repository also needs a paid GitHub plan.) The way to get a link is Netlify, connected to the private repository. `netlify.toml` added for that. Not deployed; Miguelle to connect it.
- Claude explained VoiceOver and how to do a keyboard check by hand.

### 2026-11-22: Milestone 7, final checks and cleanup. Phase 1 finished
- Miguelle asked for the before-selling questions to be stored (now "Decisions to make before selling" in Section 2) and for Milestone 7.
- **Cleanup:** `/dashboard/design-preview` removed. Added `app/robots.ts` (keeps search engines out of the whole prototype), `app/global-error.tsx`, security headers and `poweredByHeader: false` in `next.config.ts`, and an `npm run typecheck` command. `README.md` rewritten. `documentation/project-checklist.md` ticked, with the live-site sections marked N/A.
- **Accessibility scan (axe-core, WCAG 2.0 to 2.2 A and AA plus best practices):** 54 scans covering every page, light and dark, desktop and phone, the phone menu open, the editor with a section open, the publish window, and the three template pages. First run: no contrast or WCAG failures, 14 scans with landmark notes. Fixed: the editor is now `<header>` + `<main>` with named regions inside, and the preview bar is a named `<aside>`. Final run: **0 issues**.
- **Widths:** 10 pages at 320, 360, 390, 600, 768, 900, 1024, 1280, 1440 and 1920px, in Chromium and in WebKit (the Safari engine): no sideways scrolling, exactly one `h1` per page.
- **Safari engine (WebKit 27.2):** theme switch, typing on the preview (end and start of text), section animation, panel resize, preview sizes, save, publish window, phone menu and template menu all work. **Two faults found and fixed:** photo upload failed because WebKit would not store a Blob in IndexedDB in a private session, so pictures are now stored as raw bytes (`ArrayBuffer`), which also covers Safari's Private Browsing; and the Domains page was 61px too wide at 320px.
- **Keyboard:** the skip link is the first stop and works; every stop on the Overview has a name and a visible outline; a section opens with Enter and focus moves to its first field; closed sections cannot be tabbed into; the publish window takes focus, keeps it, closes on Escape and returns focus to Publish; the phone menu does the same; with "reduce motion" the menu appears with no animation.
- **Regression:** the click-and-type, panel, Milestone 6 and menu tests were rerun on the production build and pass.
- `npm audit`: 0 vulnerabilities. `npm run lint` and `npm run typecheck` pass; production build compiles.
- **Not verified (needs a person or a deployed site):** VoiceOver; Firefox; Safari itself and a real iPhone or Android phone (camera and photo-library chooser, touch); a real drag from Finder; HEIC photos; the look of the light/dark fade; PageSpeed scores (need a deployed address). Lighthouse was not run.
- Not done on purpose: website thumbnails are still the drawn stand-in, not a real miniature; no `netlify.toml` (Studio itself is not deployed); no automated tests live in the project (Claude's test scripts were temporary).
- **Next:** Miguelle reviews. Then decide between a first Git commit and GitHub repository, and starting Phase 2 (the marketplace).

### 2026-11-22: ownership model explained (no code)
- Miguelle asked how customers own their site when there is no repo to hand over, as there is with one-to-one clients. Claude's explanation and the decisions it leaves are recorded under "Who owns what" in Section 2.

### 2026-11-22: Netlify project limit rechecked; publish queue noted for Phase 5 (no code)
- Miguelle relayed two more answers from Netlify's assistant: it could not confirm a 500-project limit, and the deploy rate limit is per token and can be raised on request. Claude re-read Netlify's docs page: the 500-project row is there. Both points recorded under "Netlify facts for Phase 5".

### 2026-11-22: separate Netlify team decided (no code)
- Miguelle: Studio sites will be handled by a separate Netlify team, not the one holding client projects.

### 2026-11-22: Netlify answers recorded and checked (no code)
- Miguelle pasted Netlify's answers on terms, pricing, the deploy API and DNS. Claude checked each claim against Netlify's own pages. Nearly all confirmed; differences and two new findings (the deploy rate limit, auto-recharge off by default) are recorded in Section 2 under "Netlify facts for Phase 5".

### 2026-11-22: hosting price and download option decided (no code)
- Miguelle: hosting is an **additional $25 a month**; a **download option** will exist; setting up a downloaded site elsewhere is the customer's job. Miguelle will confirm the Netlify questions themselves. Recorded in Section 2 with Claude's design note on what the download must contain.

### 2026-11-22: hosting direction decided (no code)
- Miguelle asked whether the A record on the Domains page is real (no: `192.0.2.1` and `.studio.example` are placeholders) and whether Studio would host customers' sites. Miguelle then decided: **hosting will be offered, through Netlify under their own account.** Recorded under "Still open" in Section 2 with the remaining questions and Claude's recommendation to use a separate Netlify team or account.

### 2026-11-22: Milestone 6, the five remaining dashboard pages; transitions; Overview layout
- Miguelle said "move onto phase 6"; Claude took that as **Milestone 6**.
- **Pages built:** Media Library, Domains, Hosting & Publishing, Billing, Account Settings (details in Section 2). `components/dashboard/PlannedPage.tsx` deleted: no stand-in pages remain.
- **New shared pieces:** `components/ui/ConfirmDialog.tsx`, `components/ui/DataTable.tsx`, `lib/validation.ts`; `lib/data/domains.ts`, `publishing.ts`, `billing.ts`; `deleteMedia` and `replaceImage` in `lib/data/media.ts`; `formatMoney` and `formatFileSize`.
- **Data:** `Website.domainStatus`, `Deployment`, `Purchase`, `Customer.businessPhone` added. Saved demo data from before this change is filled in on read (`withNewerFields` in `lib/data/store.ts`), so the storage key did not change and earlier edits are kept. Publishing now adds a deployment.
- **Transitions** (Miguelle): phone menu slide (`MobileNav.tsx`), template menu fade (`SiteHeader.tsx`), light/dark cross-fade (`ThemeToggle.tsx`, `globals.css`).
- **Overview** (Miguelle did not like the gap under "Your websites"): Quick actions moved under it as three tiles.
- Fixed on the way: a doubled full stop in activity lines for names ending in "." ("Brightside Cleaning Co.."); cards could not shrink below a wide table on phones; hidden text in a table's buttons widened the Billing page on phones.
- Verified in a real browser against the dev server: Media: empty state, two photos added at once (3000x2000 stored as 2000x1333), thumbnails load, "Used on" after choosing one in the editor, Replace keeps it in use, Delete warns when in use and removes the card. Domains: a bad entry is refused; "https://WWW.BrightsideCleaning.com/" is saved as brightsidecleaning.com; the two DNS rows show; Check again gives Connected and SSL Active. Publishing: the connected domain shows as the live address; publishing adds a history row (3 to 4) and disables the button; the draft website is blocked by the checks. Billing: "2 bought, $700.00 in total", two invoices, the download message. Settings: a bad email is refused with a message, a good one accepted, Sign out message. The phone menu and the template menu are part-way through their animation 100ms after opening and closing. No page scrolls sideways at 390px or 320px. No console errors. A production build of a copy compiles.
- Not verified: the theme cross-fade by eye (only that the theme still switches), Safari and Firefox, a real phone, screen reader, axe.
- **Next:** Miguelle reviews, then Milestone 7.

### 2026-11-22: blank space under the editing panel's sections fixed
- Miguelle reported, with a phone screenshot, a large empty grey area below the last section in the editing panel. Measured: up to 4,289px of blank scrolling under the sections, on desktop as well as phone. Cause: the same trap as the earlier grey band. A closed section's content is hidden by an `overflow-hidden` wrapper, but its visually hidden helpers are positioned absolutely and escaped it. Fixed by making that wrapper `relative` in `components/editor/SectionForm.tsx`.
- Verified in a real browser at 390px and 1440px, on the Home page and site-wide settings, with a section open and closed: the scroll area now ends 16px (the panel's padding) below the last section.

### 2026-11-22: Save and Publish moved into the editing panel; panel restyled
- Miguelle asked for Save draft and Publish to sit below the editing panel's fields instead of the top right, and invited improvements to the panel's look.
- New `components/editor/EditorActions.tsx` and `components/editor/ScopePicker.tsx`. `EditorShell.tsx`: buttons removed from the top bar; the panel is now a column of sticky title, scrolling sections, pinned action bar. `SectionForm.tsx`: "Must change" / "Suggested" notes and an open-section marker. The page selector changed from a drop-down to pill buttons.
- `next.config.ts`: `devIndicators: false`, because Next.js's development badge sat on top of the Save draft button.
- Verified in a real browser against the dev server: no Save or Publish in the top bar; both sit directly below the form inside the panel; they and the title stay visible while a long section is scrolled; the page cannot scroll; pills switch pages; notes match the publish checks; typing in the preview shows "Unsaved changes", Save draft works, Publish opens the checks; on a 390px phone the bar shows in both Edit and Preview with no overflow; no console errors.
- Not verified: Safari and Firefox, screen reader, a real phone.
- **Next:** Miguelle reviews, then Milestone 6.

### 2026-11-22: photo upload, resizable panel, Fit size, smooth sections, grey-gap fix
- **Photo upload** (Miguelle: "upload photos to replace images on the site, drag and drop or upload from computer/phone/device"). New: `lib/media/ref.ts`, `lib/media/prepare-image.ts`, `lib/data/media.ts`, `hooks/useMediaUrls.ts`, `components/preview/TemplateView.tsx`; `MediaItem` in `lib/types.ts`; `ImageField` rebuilt; `setValueAtTarget` and `editFieldType` helpers; a `studio:drop-image` message.
- **Panel title, resizable panel, Fit size, smooth sections** (Miguelle, same day). New `components/editor/PanelResizer.tsx`; `DeviceToggle` gained "Fit" (now the default); `SectionForm` rebuilt without `<details>`.
- **Grey space under the editor** (reported by Miguelle with a screenshot, after clicking a photo). Cause: visually hidden elements in the form escaped the scrolling panel and made the page scrollable; focusing the hidden file input scrolled it. Fixed by making the panel and the editor root `relative` (plus `overflow-hidden` on the root and `preventScroll` on the focus call).
- Found and fixed while testing: uploaded pictures never appeared in the dev server, because the picture-loading hook dropped its result when React's development mode ran the effect twice. The hook now notifies every component using it. Saving a picture now waits for the browser to finish committing it before the preview is told about it.
- Verified in a real browser against the dev server: a 4000x3000 JPEG chosen from the device shows in the preview and is stored as 2000x1500; a PDF is refused with a readable message; a PNG dropped on the form's drop area and another dropped on a gallery photo in the preview both replace the picture; a file dropped elsewhere does nothing and the editor stays open; pictures survive Save draft and a reload and show on the stand-alone preview; after clicking a photo the page height equals the window height (no grey band); a section's height is mid-way 120ms after clicking and a closed section is inert; dragging the divider 200px changes the panel from 416 to 616px and the website from 1016 to 816px wide; arrow keys and End work; Desktop, Tablet and Phone still give 1280, 768 and 390px; the width is remembered after a reload; the click-and-type test still passes; no console errors. A production build of a copy compiles.
- Not verified: a real phone or tablet (camera and photo-library chooser, touch-dragging the divider), a real drag from Finder (the test fired the drop events directly), HEIC photos, a full storage error, Safari and Firefox, screen reader.
- Known gaps: uploads cannot be deleted yet (Media Library, Milestone 6); the divider has keyboard and drag control but no click-only control.
- **Next:** Miguelle reviews, then Milestone 6.

### 2026-11-22: click-and-type editing on the preview
- Miguelle came back from the pause and approved the idea proposed earlier. Both steps built: click to jump, and type in place.
- New: `templates/editable.ts`, `components/preview/InlineEditing.tsx`, `lib/editor/edit-path.ts`, `lib/editor/caret.ts`; `setTextAtTarget` in `lib/editor/content-path.ts`; two new preview messages in `lib/preview-messages.ts`; outline styles in `app/globals.css`.
- Every content element in Fresh Start's 12 sections now carries its field address. `CallToAction` and `PageIntro` take a `pageKey` so they can address their fields on whichever page they are on.
- Editor: `EditorShell` handles the two new messages; `SectionForm` and `ListField` mark their fields so a clicked field can be found and scrolled to. The preview's hint now reads "Click any text in the preview to change it."
- Found and fixed while testing: with very fast typing a keystroke could be lost when it landed between "new content arrived" and "new content drawn". The cursor code now also records every keystroke and uses the newer record.
- Verified in a real browser against the dev server (three runs): typing at the end, at the start and in a 44-character burst all land in order and match the form; Enter adds no line; typing in the form still updates the preview afterwards; a button's words change while its destination stays; the business name typed in the header also changes in the footer; clicking the hero photo opens its field with keyboard focus in it; a service's name edited on the Home page updates the site-wide Services list; the menu still switches pages; the stand-alone preview has nothing editable and its buttons still work; no console errors. A production build of a copy compiles.
- Not verified: Safari and Firefox (both matter here, since typing in place depends on browser behavior), typing with accents or other composed characters, pasting, a phone or tablet touch keyboard, screen reader.
- **Next:** Miguelle reviews, then Milestone 6.

### 2026-11-22: unsaved-changes question restyled; project paused
- Miguelle asked for the "Save your changes?" window to be centered with its buttons in one row. `components/editor/UnsavedDialog.tsx`: text centered, wider window, the three buttons in one centered row from 640px up (stacked on phones, where three cannot fit side by side).
- Miguelle asked about typing directly on the preview. Claude explained it and proposed two steps; nothing built (see "Where we stopped" in Section 2).
- **Miguelle paused the project.** State saved in Section 2.

### 2026-11-22: "Save your changes?" when leaving the editor; photos confirmed as a hard stop
- Miguelle asked that leaving the editor with unsaved edits asks whether to save. Added `components/editor/UnsavedDialog.tsx` and wired it to the "My websites" link in `EditorShell.tsx`. Claude added a third choice, "Keep editing", beyond the two Miguelle named.
- Miguelle confirmed before-and-after photos are a hard stop in the publish checks.

### 2026-11-22: Milestone 5, the Website Editor, starter content and publish checks
- Miguelle said "we can move to phase 5"; Claude took that as **Milestone 5** (the editor), since roadmap Phase 5 is real hosting.
- **Decisions from Miguelle:** new websites start with obvious placeholders; publishing is blocked, with a red list of what to change, while company details, contact details or reviews are still placeholders; services are a softer warning.
- **Editor** built: `app/(editor)/dashboard/websites/[id]/edit/page.tsx`, `components/editor/` (EditorLoader, EditorShell, SectionForm, FieldRenderer, PreviewPane, DeviceToggle, PublishDialog, and `fields/` Text, Color, Font, Image, Link, List), `lib/editor/content-path.ts`, `lib/preview-messages.ts`. The stand-in editor page under `(dashboard)` was removed.
- **Publish checks:** `templates/publish-checks.ts`; `publishCheck` added to the schema; `starterContent` and `stockImages` added to the template definition.
- **Data:** `saveDraft` and `publishWebsite` (simulated) in `lib/data/websites.ts`; `writeDemoData` in `store.ts`. Saving updates the website's name, thumbnail color, status and "Recent activity". Storage key is now `migsflow-studio:demo:v4`.
- **Sample data changed:** Brightside Cleaning Co. now has its own (drawn) pictures so it passes the checks and can be published; Brightside Commercial starts from the starter content, so pressing Publish on it shows five required changes.
- Preview page: `?embed=1` mode added (no Studio bar, content arrives by message).
- Verified in a real browser on a production build of a copy: typing in a field changes the preview at once; the three preview sizes give the page 1280, 768 and 390px; a pale yellow brand color gets dark button text automatically; the Classic font pair applies; Save draft persists across a reload; clicking a menu link in the preview moves the editor to that page; Brightside publishes and its badge becomes "Published"; Brightside Commercial is blocked with 5 required items and no publish button, and "Fix this" opens the right section; the Overview's next-step banner updates; the phone layout switches between Edit and Preview; no console errors.
- Not verified: adding, removing and reordering list entries by hand (the code is there, the automated test did not exercise it), the unsaved-changes warning on closing the tab, a full storage error, Safari and Firefox, screen reader, axe.
- Known gap: when a website's current picture is not one of the template's own, none of the choices in the image field is shown as selected.
- **Next:** Miguelle reviews, then Milestone 6 (Media Library, Domains, Hosting & Publishing, Billing, Account Settings).

### 2026-11-22: page limit decided (no code)
- Miguelle: three pages for Fresh Start is fine; **templates have at most 5 pages**.
- Miguelle asked what "a source for photos" and "blocking publishing" meant; Claude explained both. Neither is decided yet (still under "Still open").

### 2026-11-22: Milestone 4, template system, Fresh Start template, preview page
- **Template system** in `templates/`: `types.ts` (schema, content and host types), `validate.ts`, `color.ts`, `fonts.ts`, `registry.ts`.
- **Fresh Start** in `templates/cleaning-fresh/`: `schema.ts` (6 site-wide sections, 3 pages), `content.ts` (the content type and the fictional Brightside sample), `Template.tsx`, and 12 section components. Home has hero, reasons, services, before/after photos, reviews and a closing banner; Services lists every service; Contact has the quote form, contact details and hours.
- **Preview** at `/preview/[websiteId]` (`components/preview/`): Studio's bar ("Preview of your draft", "Sample content") above the template. Menu links switch pages inside the preview; the quote form and outside links are switched off with a message.
- **Data:** `Website` gained `draft` and `published`. The seed gives Brightside a published copy plus a draft with a fourth service (that difference is its "Unpublished changes"), and Brightside Commercial a blue, differently worded draft. Storage key bumped to `migsflow-studio:demo:v2`, so earlier demo data is rebuilt.
- ESLint: `@next/next/no-img-element` is off for `templates/**` only (reason in `eslint.config.mjs`).
- Sample photos are SVG placeholders made by Claude, each reading "Sample photo".
- Verified in a real browser on a production build of a copy: all three pages draw at 1440px and 390px; exactly one `h1` per page; menu links and in-page buttons switch pages; the phone menu opens; the form shows the preview message; an unknown website id shows "Website not found"; Studio's dark mode leaves the template white; no console errors; no sideways scroll at 390px or 320px. Two layout faults found in screenshots and fixed (a phone-only header button showing on phones twice, and stretched spacing in the contact details). Not verified: the template with a pale brand color or other font pairs (the code paths exist, no way to change them until the editor), Safari and Firefox, screen reader, axe.
- **Next:** Miguelle reviews, then Milestone 5 (the Website Editor).

### 2026-11-22: theme button fixed, light mode first, sticky columns, Tailwind wiring changed
- **Miguelle reported the light/dark switch did nothing.** Cause: the running dev server was serving a stylesheet without the new theme rules. Root cause found and reproduced in a clean copy: with the generated `@tailwindcss/turbopack` loader, saving `app/globals.css` in place is not noticed by a running dev server. **Fix:** switched to `@tailwindcss/postcss` (`postcss.config.mjs`; the loader rule removed from `next.config.ts`; `@tailwindcss/turbopack` uninstalled). Recorded as a handbook exception in Section 3.
- **Light mode is now the default** (Miguelle). Light values moved into `@theme`, dark values into `[data-theme="dark"]`; `app/layout.tsx` starts with `data-theme="light"`; the toggle's variant is now `dark:`.
- **Sticky columns** (Miguelle): new `components/ui/SplitColumns.tsx`, used on the Overview. Rule recorded in Section 2 for all future side-by-side layouts.
- Added `data-scroll-behavior="smooth"` to `<html>` (Next.js asked for it in the console).
- Verified on Miguelle's own running preview (port 3000) in a real browser: first visit is light; the button switches to dark and its label flips; the choice survives a reload; switching back works; on the Overview the shorter column holds at the top while the longer one scrolls; no console errors. Lint, type check and a production build of a copy pass.
- Seen, not fixed: at some widths the back-to-top button overlaps the bottom-right corner of the last card.
- **Next:** Milestone 4 (content schema and the cleaning template), which Miguelle has already approved starting.

### 2026-11-22: Milestone 3, data layer, Overview, My Websites, and light/dark mode
- **Light/dark mode** added at Miguelle's request: light token values in `app/globals.css`, `components/ui/ThemeToggle.tsx` (in the sidebar, the phone drawer and the landing page), the no-flash script in `app/layout.tsx` (handbook Section 3, exception 4). Light-theme text colors were chosen by calculated contrast; not yet checked with axe.
- **Poppins:** Miguelle asked that body text be Poppins. It already was; confirmed in a browser (`body` computes to Poppins). The Arial in their earlier screenshot came from the stale dev server.
- **Types** in `lib/types.ts`: Template, Website, ActivityItem. **Sample data** in `lib/mock/` (one template "Fresh Start"; two fictional websites, one published with unpublished changes and one draft; five activity lines). Sample addresses end in `.studio.example` because the real domain is undecided.
- **Data doorway:** `lib/data/websites.ts`, `activity.ts`, `store.ts` (browser storage, key `migsflow-studio:demo:v1`), `hooks/useLoad.ts`.
- **Overview** (`/dashboard`): welcome heading, a "what to do next" banner worked out from the websites, the websites list, quick actions, recent activity (labeled sample). **My Websites** (`/dashboard/websites`): a card per website with status, template, address, dates, Edit and Preview.
- New components: `ui/LoadingState`, `ui/ErrorState`, `ui/ThemeToggle`; `dashboard/OverviewContent`, `WebsitesContent`, `NextStep`, `WebsiteRow`, `WebsiteCard`, `WebsiteStatusBadge`, `WebsiteThumbnail` (a drawn stand-in until Milestone 4), `ActivityList`, `QuickActions`.
- Stand-in routes so the buttons lead somewhere: `/dashboard/websites/[id]/edit` (Milestone 5) and `/preview/[websiteId]` (Milestone 4).
- Verified in a real browser on a production build of a copy: both pages render in both themes; the theme survives a page load; Edit opens the editor stand-in; no console errors; no sideways scroll at 390px or 320px. Not verified: the error and empty states (nothing triggers them yet), Safari and Firefox, screen reader, axe.
- **Next:** Miguelle restarts the dev server and reviews, then Milestone 4 (content schema and the cleaning template).

### 2026-11-22: stale styles in a long-running dev server (no code change)
- Miguelle's `npm run dev`, left running since Milestone 1, showed the Milestone 2 pages with no colors or fonts (white page, invisible primary button). Its stylesheet still held the old starter theme. A fresh dev server on a copy of the project served the correct styles, so the code is fine.
- Likely cause (not proven): Claude ran `npm run build` and replaced `app/globals.css` while that dev server was running.
- **Working rule:** after Claude finishes a milestone, tell Miguelle to stop the dev server (Ctrl+C) and start it again before reviewing. If styles still look wrong, delete the `.next` folder and start again. (Root cause found later the same day: see the entry above about the Tailwind wiring. A restart should no longer be needed for style changes.)

### 2026-11-22: Milestone 2, design and dashboard shell
- **Design tokens** in `app/globals.css`: near-black navy backgrounds (`ink`, `panel`, `raised`), `fg` and `fg-muted` text, brand blues (`accent` #0b3cff for filled buttons, `signal` #18c9ff for links, focus and the current-page marker), status colors, two corner sizes. Colors and fonts follow `../MigsFlow_Website` (Orbitron + Poppins, the cyan-to-blue pair). Contrast was calculated for each text/background pair when choosing them; not yet checked with axe or Lighthouse (Milestone 7).
- **Fonts** through `next/font`: Poppins (400, 500, 600) for everything read, Orbitron for the brand name and page titles only.
- **Shell:** `app/(dashboard)/layout.tsx`. Wide screens get a fixed sidebar and no top bar; phones and tablets get a top bar whose menu opens the same sidebar as a `<dialog>` drawer. The signed-in block shows the sample customer with a "Sample account" label. The back-to-top button is rendered by the public and dashboard layouts, not the root layout, so the editor (Milestone 5) can leave it out.
- **Design decision for Milestone 5:** the editor gets its own route group and layout, so it does not inherit the sidebar.
- **Current-page highlight:** `ActiveNav` (the only client part of the menu) sits in `<Suspense>` as the Next.js docs require under Cache Components. Seen in testing: on a full page load the highlight appears a moment after the menu.
- **Shared components** in `components/ui/`. Modal, Tabs and DataTable from the plan are **not built yet**; each is built in the milestone that first uses it.
- **Data:** first use of the doorway. `lib/data/customer.ts` returns the sample customer from `lib/mock/customer.ts` (fictional: Dana Whitfield, Brightside Cleaning Co.).
- **Dependency added:** `lucide-react` 1.77.0 (icons; on the handbook's approved list).
- **Icons:** `app/favicon.ico`, `app/icon.svg`, `app/apple-icon.png` and `public/images/brand/migsflow-mark.svg` are copies of the MigsFlow website's own icon files, used as-is. Miguelle has not yet said whether Studio should have its own mark.
- Verified: lint clean; build passes with all 12 routes static; screenshots at 1440px and 390px reviewed; in a real browser at phone width the menu opens, closes on Escape and on choosing a link, with no console errors; no sideways scroll at 390px or 320px. Not verified: Safari and Firefox, screen reader, axe.
- **Next:** Miguelle reviews the look, then Milestone 3 (data types, mock data, Overview and My Websites).

### 2026-11-22: Milestone 1, app created
- Miguelle approved the frontend/backend split, set the template price range at $300–$500, and left hosting and forms to decide later.
- App generated with `create-next-app` 16.4.6 in a temporary folder and moved in: TypeScript, Tailwind, ESLint, App Router, no `src/` folder, `@/*` alias, Cache Components on, `AGENTS.md`. Tailwind wiring left as generated (`@tailwindcss/turbopack` in `next.config.ts`).
- `app/page.tsx` replaced with a placeholder; `app/layout.tsx` given the Studio title and `noindex`. Starter images and the default favicon deleted (the real icons come with the design in Milestone 2).
- Added `.nvmrc`, the `.gitignore` additions, `README.md`, and the placeholder folders `lib/data/`, `lib/server/`, `supabase/` with READMEs.
- `git init` on branch `main`. Nothing committed.
- Verified: `npm run lint` clean, `npm run build` passes with `/` static, homepage returns 200 in dev. Not verified: Miguelle running it on their own.
- Not done on purpose: `netlify.toml` (no hosting yet), security headers, fonts and tokens (Milestone 2).
- **Next:** Miguelle reviews, then Milestone 2 (design tokens, fonts, dashboard shell, shared UI).

### 2026-11-22: image exception confirmed; structure, forms and hosting discussed (no code)
- Miguelle confirmed the exception for customer-uploaded images (Section 3).
- Miguelle asked for a clear frontend/backend split in the folder structure. Claude proposed the split inside one app (Section 4). Awaiting Miguelle's OK.
- Forms and hosting: Miguelle's leanings and Claude's recommendations recorded under "Still open" (Section 2). Neither is decided, and neither blocks Phase 1.
- **Next:** on Miguelle's go-ahead, Milestone 1 (create the app).

### 2026-11-21: scope saved, decisions recorded, Phase 1 planned (no code)
- Claude reviewed the handbook, the checklist and this file against Miguelle's brief and reported the conflicts and gaps.
- Brief saved word for word as `documentation/project-brief.md`.
- Miguelle decided four points (Section 3): TypeScript, labeled fictional sample content, two route groups, no back-to-top button on the editor.
- This file rewritten: current state, roadmap, Phase 1 milestones, settled design decisions, open questions, handbook exceptions.
- `documentation/project-checklist.md`: title and top table filled in for an internal product.
- Noted, not fixed: handbook hard rule 15 mentions `handbook/project-checklist-template.md`, which is not in this folder.
- **Next:** on Miguelle's go-ahead, Milestone 1 (create the app).

### 2026-11-21: project folder created
- Folder created by Claude at Miguelle's request, with `handbook/CLAUDE.md` (handbook v3.1), `documentation/project-checklist.md` (blank template) and this file. No code, no Git repository.
- The handbook was updated to v3.1 the same day: the link preview image is always a picture of the homepage hero, and icons are generated from the logo when none are supplied (handbook Section 23).
