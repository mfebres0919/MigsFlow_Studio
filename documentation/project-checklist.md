# Project Checklist: MigsFlow Studio

*MigsFlow project checklist, from handbook v3.1 (Next.js + Tailwind edition). MigsFlow Studio is an internal MigsFlow product, not a client site, so client-only items are marked N/A as they come up. Scope: `documentation/project-brief.md`.*

| | |
|---|---|
| **Client** | MigsFlow (internal product) |
| **Main contact** | Miguelle |
| **Project type** | ☑ New build ☐ Redesign / migration |
| **Plan** | N/A (internal product) |
| **Live domain** | Not decided |
| **Preview URL** | |
| **GitHub repo** | Not created yet |
| **Stack** | Next.js + TypeScript + Tailwind CSS (TypeScript is a handbook exception, see root `CLAUDE.md` Section 3) |
| **URL style** | ☑ No trailing slash (new sites) ☐ Trailing slash (matches the old site) |
| **Start date** | 2026-11-21 (scope and plan; no code yet) |
| **Target launch** | |
| **Launched on** | |

**Status (2026-11-22):** Phase 1 is a prototype that runs on sample data and is **not deployed**. Sections 2, 3, 4, 6, 7, 8, 9 and 10 below are about a live site and are **N/A until a launch is planned**. PageSpeed scores have not been measured (they need a deployed address).

**How to use it:**
- Tick items as they're done.
- Items tagged *(Redesign)* only apply to redesigns and migrations. On a new build, write N/A instead of deleting them.
- Anything still open at launch gets a note explaining why.
- The handbook section with the details is in brackets, e.g. [§18]. The handbook is `handbook/CLAUDE.md`.

---

## 1. Discovery [§17]

- [x] Business name and main contact confirmed (MigsFlow, Miguelle; the product name is a working name)
- [x] The site's main job agreed: sell website templates that customers edit and publish themselves
- [x] Scope confirmed in writing: `documentation/project-brief.md`
- [x] Brand assets: MigsFlow's own mark, colors and fonts reused. Template photos are placeholders (open decision)
- [ ] Form destination email confirmed: ______________________
- [ ] Legal and industry needs identified (privacy policy, disclaimers, license numbers, SMS consent)

## 2. Current setup and access [§17]

- [ ] Domain registrar: ______________ Owner and controller: ______________
- [ ] DNS managed at: ______________
- [ ] Email hosted at: ______________
- [ ] Current website platform and host: ______________ *(Redesign)*
- [ ] GA4: ☐ exists ☐ none. Access granted.
- [ ] Search Console: ☐ exists ☐ none. Access granted.
- [ ] Google Business Profile: ☐ exists ☐ none. Access granted.
- [ ] Existing forms, booking tools, CRM, pixels and marketing tools listed
- [ ] Access received through invitations or delegated access, **not passwords**

## 3. Old site audit *(Redesign)* [§18]

- [ ] Every URL listed, including pages not in the menu (sitemap + Search Console + crawler)
- [ ] Client confirmed which hidden or old pages to keep
- [ ] Titles, meta descriptions, headings and main keywords recorded
- [ ] Existing redirects, canonicals, `robots.txt`, sitemap and schema noted
- [ ] Every form and its destination noted
- [ ] Tracking noted: GA4 ID __________, GTM ☐ yes ☐ no, ad pixels, conversion events
- [ ] Old site backed up (content, images, key page copies)
- [ ] Anything beyond a brochure site (logins, member areas, carts, portals) flagged, and a plan and price agreed

## 4. URL map and redirects *(Redesign)* [§12, §18]

| Old URL | New URL | Keep / 301 / Retire | Tested |
|---|---|---|---|
| | | | ☐ |
| | | | ☐ |
| | | | ☐ |

- [ ] Every old URL has a row
- [ ] Redirects go to the closest matching page, never to the homepage by default
- [ ] Redirects written in `next.config.mjs` with `statusCode: 301`: no chains, no loops
- [ ] Internal links point straight at the new URLs

## 5. Build and pre-launch QA [§19]

- [x] `npm run lint` and `npm run build` pass (2026-11-22). Every page is `○ (Static)` except the editor and preview, which are `◐` because their address contains a website id.
- [ ] Built and reviewed on a Netlify preview. Client approved the preview.
- [ ] Preview kept out of search. Canonicals and sitemap use the production domain.
- [ ] All pages and content migrated, with no placeholders left
- [ ] Menus, dropdowns and every link work. No broken links.
- [x] Responsive from 320px to 1920px, with no sideways scrolling (10 pages at 10 widths, in Chromium and in the Safari engine, 2026-11-22)
- [ ] Accessibility: WCAG 2.2 AA. axe: zero issues on 54 scans (every page, light and dark, desktop and phone). Keyboard: automated pass, and checked by hand by Miguelle (2026-11-22). VoiceOver: checked by Miguelle (2026-11-22), sounds good.
- [ ] PageSpeed mobile on every page: Performance 98+, other categories 100 (scores saved)
- [ ] Tested in Chrome, Safari, Firefox and on a real phone. Done by automated test: Chromium and the Safari engine (WebKit). **Not done: Firefox, real Safari, a real phone.**
- [ ] SEO basics: every page exports its own title (≤50 characters with the brand), description and canonical; one `h1`; alt text; schema; icons (generated from the logo if none supplied); `opengraph-image` made from the homepage hero (1200×630); `manifest.js`; `robots.js`; `sitemap.js` listing every page; `not-found.js`
- [ ] Every form submitted for real and received in the right inbox (spam folder checked)
- [ ] Form validation, success and error messages, and any auto-reply emails work
- [ ] Form events show up in GA4
- [ ] Privacy policy, disclaimers and SMS consent in place where needed. No unnecessary sensitive data collected.
- [x] No secrets in the repo or in `NEXT_PUBLIC_` variables (Phase 1 has no secrets or environment variables at all).
- [x] Only approved dependencies installed (plus TypeScript, a recorded exception). `npm audit`: 0 vulnerabilities (2026-11-22).

## 6. Google and integrations [§18]

- [ ] GA4: existing property reused (or new one created for a new build). No duplicate tags.
- [ ] GA4 key events (form submits, consultations) set up and confirmed in Realtime or DebugView
- [ ] Search Console property kept or verified
- [ ] Google Business Profile website link correct. Name, address and phone match the site.
- [ ] Google Ads landing pages and conversion tracking tested *(if the client runs ads)*
- [ ] CRM, booking and email-marketing connections tested
- [ ] Cookie or consent needs checked for the client's audience

## 7. Domain, DNS and hosting [§14]

**DNS log (record everything before changing anything):**

| Type | Name | Value | TTL | Used for | Changed? |
|---|---|---|---|---|---|
| A | @ | | | website | |
| CNAME | www | | | website | |
| MX | @ | | | email (don't touch) | |
| TXT | @ | | | SPF / verification (don't touch) | |
| | | | | | |

- [ ] All existing records exported or screenshotted into the log above
- [ ] Email records identified, and left untouched
- [ ] Netlify site connected to the GitHub repo (build command `npm run build`, publish `.next`), with the production domain added
- [ ] TTL on the website records lowered to 300 the day before launch
- [ ] Nameservers stay where they are *(or, if moving: email records recreated first)*
- [ ] Old site stays live until the new one is verified

## 8. Launch day [§20]

- [ ] Client's written approval to launch
- [ ] Final backup of the old site *(Redesign)*
- [ ] Production deployed from `main`, and the Netlify deploy finished without errors
- [ ] Website DNS records updated (website records only)
- [ ] Domain resolves to the new site. HTTPS works on `www` and the bare domain.
- [ ] Every page and menu link clicked
- [ ] Every form submitted and received
- [ ] Redirects from the URL map tested *(Redesign)*
- [ ] Live site is indexable: no `noindex` in the page source, and `/robots.txt` allows crawling
- [ ] GA4 Realtime shows visits
- [ ] Sitemap submitted in Search Console
- [ ] Google Business Profile link checked
- [ ] Business email sends and receives
- [ ] Checked on desktop and a phone
- [ ] Client told the site is live

## 9. After launch [§20]

**First 24–72 hours**
- [ ] Site up, HTTPS valid
- [ ] Forms arriving in the right inbox
- [ ] Analytics recording visits and events
- [ ] Important old URLs return the right page, never a 404
- [ ] No DNS or email issues

**First 30 days**
- [ ] Search Console indexing and crawl errors reviewed
- [ ] Impressions and clicks show no unexplained drop
- [ ] Conversions still recording
- [ ] Migration bugs fixed within the support period
- [ ] Next.js and React checked for security updates
- [ ] Client check-in done and the client is happy
- [ ] Old hosting cancelled, only after all of the above *(Redesign)*

## 10. Handoff [§20]

- [ ] Live URL and care guide sent to the client
- [ ] Domain, DNS, hosting and email explained: who renews what, and when
- [ ] Ownership and access confirmed for the client's plan
- [ ] Recurring hosting or maintenance charges confirmed
- [ ] How to request updates, and the support period, explained
- [ ] Third-party services listed with account owners and costs

---

## Change log

Record anything significant: DNS edits, redirects, accounts connected, pages retired, launch.

| Date | Change | By |
|---|---|---|
| 2026-11-22 | Phase 1 prototype finished: dashboard, editor, one template, all on sample data. Not deployed. | Claude with Miguelle |
| | | |
