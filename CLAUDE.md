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

### Where things stand (2026-11-22) — read this first
**Phase 1 (the dashboard prototype) is finished: all 7 milestones are built.** It runs entirely on sample data in the browser. The next roadmap step is Phase 2, the public template marketplace, which has not been started or planned in detail.

- **Waiting on Miguelle:** a review of Milestones 6 and 7, the by-hand checks listed under "Not verified" in the Milestone 7 log entry (VoiceOver, Firefox, real Safari, a real phone), and the "Decisions to make before selling" list below.
- **Git:** private GitHub repository `mfebres0919/MigsFlow_Studio`, one commit (`933c1fc`) pushed by Miguelle from before Milestones 6 and 7. **Later work is uncommitted.** Commit and push only when Miguelle asks. No Netlify site yet; GitHub Pages cannot run this app.
- **To run it:** in the VS Code terminal, inside this folder, `npm run dev`, then http://localhost:3000. The demo data lives in the browser (`localStorage` key `migsflow-studio:demo:v4`, plus uploaded pictures in IndexedDB `migsflow-studio-media`); clearing site data resets it.
- **Commands:** `npm run lint`, `npm run typecheck` (regenerates Next.js's route types, then checks), `npm run build`.
- **How Claude tested:** production builds were made in a separate copy of the project so Miguelle's running `npm run dev` was not disturbed, and pages were driven with Playwright (borrowed from the Courier Portal's install; Studio has no test tooling of its own). A new chat should make its own copy. axe-core was installed in that copy only.

**Built so far:** the design tokens with light (default) and dark themes; the dashboard shell; shared UI components; the data doorway with sample data kept in the browser; all eight dashboard screens (**Overview, My Websites, Website Editor, Media Library, Domains, Hosting & Publishing, Billing, Account Settings**); the template system and the **Fresh Start** cleaning template (Home, Services, Contact); the preview page. Everything simulated is labeled on screen. Lint, the type check and a production build pass.

### What the platform is (short version of the brief)
Small business owners buy a website template, edit its content through structured fields (not drag-and-drop) with a live preview, and later publish it on a subdomain or their own domain. First industries: cleaning, nonprofit, moving and logistics. Later phases: Supabase (passwordless login, data, uploads), Stripe (payments), Netlify API (publishing).

### Roadmap
| Phase | Work | Status |
|---|---|---|
| 1 | Dashboard prototype: all dashboard pages, the editor, one cleaning template, mock data saved in the browser | **Done 2026-11-22** (all 7 milestones), awaiting Miguelle's review |
| 2 | Public template marketplace, nonprofit and moving templates | |
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
- **Font choices are a fixed list of pairs** in `templates/fonts.ts` (Friendly: Nunito; Modern: Manrope; Classic: Lora with Source Sans), loaded with `next/font`.
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
