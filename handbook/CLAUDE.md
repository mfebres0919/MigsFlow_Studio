# MigsFlow Web Development Handbook

**Version 3.1 · November 21, 2026 · Next.js + Tailwind CSS edition**
Standards for every MigsFlow website built with Next.js and Tailwind CSS: project structure, routes, components, styling, images, fonts, performance, accessibility, SEO, forms, client onboarding, migrations, and launch.

This file is written for people and for AI coding agents. It lives in each project at `handbook/CLAUDE.md` and is loaded through the project's root `CLAUDE.md`, so Claude Code reads it before touching the code. Unless a project explicitly requires an exception, these rules are the standard.

**Core philosophy (unchanged from v2):** organized, reusable, lightweight, locally controlled, accessible, mobile-first, and fast.

**Which handbook applies where**
- **v3 (this file):** app-like builds: portals, logins, dashboards, platforms. Built with Next.js (App Router), React and Tailwind CSS v4, in JavaScript. (Decided by Miguelle on 2026-11-16.)
- **v2.2 (HTML/CSS/JS edition):** brochure and marketing sites, new and existing (for example the MigsFlow website and Moe's Movers). They keep their own `CLAUDE.md` and stay on that stack. Don't propose Next.js for a brochure site, and never convert one unless Miguelle asks for a rebuild.
- Section 22 maps every v2.1 rule to its v3.0 equivalent. Section 23 is this handbook's change log.

**Versions this edition was checked against:** Next.js 16.4, React 19.3, Tailwind CSS 4.3, Node.js 24, deployed on Netlify. The example code in this handbook was test-built on those versions on 2026-11-16. Next.js changes between major versions, so follow Section 21 before relying on memory.

---

## 0. Hard Rules at a Glance

1. Routes are folders inside `app/`. `app/page.js` is the homepage and `app/about/page.js` is `/about`. Never create `.html` pages or a `pages/` folder.
2. Styling is done with Tailwind utility classes in the markup. No `style={{…}}` attributes, no `<style>` tags and no inline `<script>` code, except the cases in Section 3.
3. Mobile-first: unprefixed classes are the phone layout, and `sm:`, `md:`, `lg:` and `xl:` add to it for larger screens.
4. Shared UI is a component in `components/`. Design tokens live in the `@theme` block of `app/globals.css`. Site facts (name, phone, address, links) live once in `lib/site.js`.
5. Fonts load through `next/font`, which self-hosts them. Never add a `<link>` to Google Fonts or any font CDN.
6. Every raster image is rendered with `next/image` from a file in a subfolder of `public/images/` (for example `public/images/hero/`). Never use a bare `<img>` for a raster image, and never leave image files loose in `public/images/`.
7. Only the one largest above-the-fold image per page gets `preload`. Everything else keeps the default lazy loading. Never preload more than one image, and never lazy-load the hero.
8. SVG icons only (inline SVG components or `lucide-react`). No icon fonts, no Font Awesome, no jQuery.
9. **Lighthouse mobile: Performance 98+ and Accessibility, Best Practices and SEO all 100 on every page.**
10. Accessibility meets **WCAG 2.2 Level AA**.
11. Every page exports `metadata` with a unique title (**50 characters or fewer, never over 60**), a description and a canonical URL, has exactly one `h1`, and has Open Graph tags, with a link preview image made from the homepage hero (Section 12, Site files). If no favicon is supplied, the icon set is generated from the logo.
12. Never put API keys, passwords or secrets in the repo or in any `NEXT_PUBLIC_` variable. Secrets live in Netlify environment variables and are read only by server code.
13. Reviews, testimonials, stats and credentials must be real. Never invent them.
14. Every site has a **back-to-top button** fixed to the bottom-right corner (Section 4).
15. Every client project has a `documentation/project-checklist.md`, copied from `handbook/project-checklist-template.md` and kept current until handoff (Section 17).
16. Redesigns never lose what already works: every old URL is kept or 301-redirected, existing DNS records are recorded before anything changes, and the client's existing GA4, Search Console and Google Business Profile are reused (Section 18).
17. Components are Server Components by default. Add `"use client"` only to the small component that needs state, effects or browser events, never to a whole page or layout.
18. Content pages are static. After `npm run build`, every content route shows `○ (Static)` in the build table. A `ƒ` or `◐` on a brochure page is a bug to fix before launch (Section 10).
19. `npm run lint` and `npm run build` both pass with no errors before any work is called done.
20. No new dependency without a reason and Miguelle's approval. The approved set is in Section 8.
21. Every project has two instruction files: `handbook/CLAUDE.md` (this handbook) and the root `CLAUDE.md` (the project's own guide and change log). Both are kept current (Section 21).

---

## 1. Project Structure and Routes

### Required structure

```
project-root/
├── app/                        ← routes only (plus the files Next.js looks for)
│   ├── layout.js               ← shared shell: <html>, <body>, fonts, header, footer, back-to-top
│   ├── page.js                 ← homepage → domain.com/
│   ├── globals.css             ← Tailwind import, @theme tokens, base styles
│   ├── about/
│   │   └── page.js             ← domain.com/about
│   ├── services/
│   │   ├── page.js             ← domain.com/services
│   │   └── surveillance/
│   │       └── page.js         ← domain.com/services/surveillance
│   ├── contact/
│   │   ├── page.js             ← domain.com/contact
│   │   └── actions.js          ← the contact form's Server Action (Section 13)
│   ├── privacy-policy/
│   │   └── page.js
│   ├── not-found.js            ← custom "page not found" page (replaces 404.html)
│   ├── global-error.js         ← last-resort error screen
│   ├── sitemap.js              ← generates /sitemap.xml
│   ├── robots.js               ← generates /robots.txt
│   ├── manifest.js             ← generates /manifest.webmanifest
│   ├── favicon.ico, icon.png, apple-icon.png
│   └── opengraph-image.jpg     ← default share image, 1200×630
├── components/                 ← one file per reusable piece: Header.js, Footer.js, Button.js, BackToTop.js
├── lib/
│   └── site.js                 ← business name, phone, address, URLs, nav links
├── public/
│   ├── images/                 ← subfolders only (Section 6), nothing loose
│   │   ├── brand/  hero/  about/  services/  decor/
│   ├── icon-192.png, icon-512.png
│   └── __forms.html            ← only when Netlify Forms is used (Section 13)
├── handbook/
│   ├── CLAUDE.md               ← this handbook
│   └── project-checklist-template.md
├── documentation/              ← project-checklist.md, client-safe docs, private/ (git-ignored)
├── next.config.mjs             ← Next.js settings: redirects, headers, image settings
├── netlify.toml                ← Netlify build settings
├── eslint.config.mjs, jsconfig.json, package.json, package-lock.json
├── .nvmrc                      ← the Node.js version, shared by your Mac and Netlify
├── .gitignore
├── AGENTS.md                   ← written by Next.js for coding agents; commit it
└── CLAUDE.md                   ← this project's guide and change log
```

**Compared with v2:** the folder-per-page idea is the same. `about/index.html` becomes `app/about/page.js`. What was repeated in every HTML file (the `<head>`, nav and footer) is written once in `app/layout.js`.

### Starting a project
- Create it with `npx create-next-app@latest`, choosing **JavaScript**, **ESLint**, **Tailwind CSS**, **App Router**, **no `src/` folder**, the `@/*` import alias, and **AGENTS.md**. Accept the recommended Cache Components setting.
- `create-next-app` refuses to run in a folder that already contains `CLAUDE.md`, `handbook/` or `documentation/`. Create the app in an empty temporary folder, then move its files into the project folder.
- **Leave the Tailwind wiring exactly as the generator wrote it.** On Next.js 16.4 that is the `@tailwindcss/turbopack` loader in `next.config.mjs`. Older and manual setups use `@tailwindcss/postcss` with a `postcss.config.mjs`. Both are valid. Use one, never both, and don't migrate between them by hand.
- There is no `tailwind.config.js` in Tailwind v4. Tokens live in `app/globals.css`.

### Route and file rules
- Route folders are lowercase, hyphenated and descriptive (`move-out-cleaning`, not `page2`). The folder name is the URL.
- `app/` holds routes and the special files only (`page.js`, `layout.js`, `not-found.js`, `actions.js`, metadata files). Reusable components go in `components/`, not beside a page.
- Component files are PascalCase and named for what they are: `Header.js`, `ServiceCard.js`. One component per file.
- Import with the alias, not long relative paths: `import Header from "@/components/Header"`.
- Internal links use `<Link href="/about">` from `next/link`. A plain `<a>` is for external sites, `tel:`, `mailto:`, file downloads and same-page `#anchors`.
- Don't create a `pages/` folder, a `src/` folder, or route groups and parallel routes unless a project needs them and Miguelle agrees.

### Trailing slashes
- **New sites:** keep the Next.js default, no trailing slash (`/about`). The canonical tag, the sitemap and every internal link use that form.
- **Redesigns of a site whose indexed URLs end in a slash:** set `trailingSlash: true` in `next.config.mjs`, so the addresses stay identical (`/about/`).
- Decide once per project, record it in the project's `CLAUDE.md`, and never mix the two forms.

---

## 2. Where Code Lives

v2 separated HTML, CSS and JavaScript into three files. In React the unit is the **component**: its markup, its Tailwind classes and its behavior live together in one file. The discipline is the same, drawn along different lines.

- **Markup** is semantic JSX: `header`, `nav`, `main`, `section`, `article`, `footer`, `button`, `a`.
- **Presentation** is Tailwind classes in `className`. Design decisions (colors, fonts, spacing) are tokens in `app/globals.css`, never hard-coded hex values in a component.
- **Behavior** lives in Client Components (Section 8), kept as small as possible.
- **Content and facts** that repeat (business name, phone, address, hours, nav links, service lists) live in `lib/`, and components read from there.

### Server and Client Components
- Every component is a **Server Component** unless its file starts with `"use client"`. Server Components render to HTML at build time and send no JavaScript for themselves.
- A component needs `"use client"` only when it uses state (`useState`), effects (`useEffect`), browser events (`onClick`, `onChange`) or browser APIs (`window`, `localStorage`).
- Put `"use client"` on the smallest piece: the menu toggle button, not the whole header. Everything a client file imports ships to the browser.
- A Client Component can still wrap server-rendered content passed in as `children`.
- `page.js` and `layout.js` stay Server Components. The `metadata` export only works there.

## 3. Approved Exceptions

These are the **only** places inline code or styles are allowed. Each gets a short comment explaining it.

1. **JSON-LD structured data**, rendered with the `components/JsonLd.js` pattern in Section 12. It is data, and Google expects it in the page.
2. **Dynamic values that cannot be a class**: a `style` attribute for a value computed at runtime (a progress width, a CSS variable for one element). Static values are always classes.
3. **Third-party embed snippets** that cannot work any other way, loaded with `next/script` (Section 8).
4. **A theme-init script in `<head>`** for sites with a dark/light toggle, to prevent a flash of the wrong theme. Follow the Next.js guide `preventing-flash-before-hydration`, with `suppressHydrationWarning` on `<html>`.
5. **Custom CSS in `app/globals.css`** for what utilities can't express well (Section 9). That is the only stylesheet; never add per-page CSS files.

If a requested feature conflicts with a hard rule, explain the conflict before building the exception.

---

## 4. Shared UI, Tokens and Components

### What goes where

| v2 file | v3 home | Holds |
|---|---|---|
| `global.css` tokens on `:root` | `@theme` in `app/globals.css` | Colors, fonts, type scale, radius, shadows, easing |
| `global.css` reset and base type | Tailwind's Preflight, plus `@layer base` in `app/globals.css` | Element defaults |
| Nav, footer, buttons, cards in `global.css` | `components/Header.js`, `Footer.js`, `Button.js`, `Card.js` | Anything used on more than one page |
| `global.js` | Small Client Components | Menu toggle, back-to-top, reveal animations |
| Page CSS and JS files | The page's own `page.js` and components used only there | One-off sections |

### Design tokens

```css
/* app/globals.css */
@import "tailwindcss";

/* "inline" is needed because the font tokens point at variables that next/font creates */
@theme inline {
  --color-ink: #17131a;          /* main text */
  --color-cream: #f7f3ee;        /* page background */
  --color-accent: #0b3cff;       /* buttons, links, highlights */
  --color-accent-dark: #082fc4;  /* hover state */
  --font-sans: var(--font-inter);
  --font-display: var(--font-playfair);
}

@layer base {
  html { scroll-behavior: smooth; scroll-padding-top: 5rem; }  /* keeps a sticky header off anchored headings */
  button:not(:disabled), [role="button"]:not(:disabled) { cursor: pointer; }
  @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
}
```

- Each `--color-*` token creates classes automatically: `--color-accent` gives `bg-accent`, `text-accent` and `border-accent`.
- **Name tokens by their job, not their color**: `accent`, `accent-dark`, `ink`, `cream`. To change a color, edit its value. Never rename the token and never hard-code a hex value in a component.
- Token families: `--color-*`, `--font-*`, `--text-*` (sizes), `--radius-*`, `--shadow-*`, `--ease-*`, `--animate-*`, `--breakpoint-*`.
- Check every text and background pair for contrast when the tokens are chosen (Section 11).

### Components
- Before writing markup, check `components/` for one that already does the job. If a pattern appears twice, make it a component.
- A component takes props for what varies (`<Button href="/contact" variant="primary">`) and keeps its classes inside.
- Repeating a long class list across files is the v3 version of duplicated CSS. Fix it with a component first. For a pattern that can't be a component, add a named class under `@layer components` in `globals.css`.
- **Write class names in full.** Tailwind finds classes by scanning files as text, so `` `text-${color}-600` `` is never generated. Map a prop to complete strings instead: `{ primary: "bg-accent text-white", ghost: "border border-ink text-ink" }[variant]`.
- Never put two conflicting utilities on one element (`p-4 p-6`). Choose one with a condition.

### Back-to-top button (required on every site)
- A round button fixed to the **bottom-right corner** in the accent color, with an upward arrow. It is rendered once in `app/layout.js`, so it appears on every page.
- It is a link to `#top` (the `id` on `<body>`), so it still works before JavaScript loads.
- It is hidden at the top of the page and fades in once the visitor scrolls past about 60% of the first screen.
- It has hidden link text, a visible focus style, a tap target of at least 44px, and uses `invisible` (not just `opacity-0`) while hidden so it can't be tabbed to.
- Keep other floating controls out of the bottom-right corner.

```jsx
// components/BackToTop.js
"use client"; // needs the browser's scroll position

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#top"
      className={`fixed right-4 bottom-4 z-40 grid size-12 place-items-center rounded-full bg-accent text-white shadow-lg transition-[opacity,visibility] duration-300 hover:bg-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none ${shown ? "visible opacity-100" : "invisible opacity-0"}`}
    >
      <span className="sr-only">Back to top</span>
      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20">
        <path d="M10 16V4m-5 5 5-5 5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
```

---

## 5. Mobile-First with Tailwind

**Hard rule:** unprefixed classes are the phone layout. Prefixed classes add enhancements at that width and up. Never build desktop first and undo it with `max-*` variants.

| Prefix | Applies from |
|---|---|
| *(none)* | every width, starting with phones |
| `sm:` | 640px |
| `md:` | 768px |
| `lg:` | 1024px |
| `xl:` | 1280px |
| `2xl:` | 1536px |

- Read `text-3xl md:text-5xl` as "3xl on phones, 5xl from 768px up".
- Mobile-first does not mean mobile-only. Every page must work and look balanced on phones, tablets, laptops, desktops and ultrawide screens.
- Prefer fluid layout: Flexbox and Grid, `max-w-*`, percentages, and `clamp()` values in tokens. Add a breakpoint only when the layout actually needs to change.
- A component that must adapt to its container, not the screen, uses container queries: `@container` on the parent, `@md:flex-row` on the child.
- Test the in-between widths (360, 390, 600, 768, 900, 1024, 1280, 1440, 1920) for overflow, awkward wrapping and layout jumps.
- No horizontal scrolling at any width down to 320px. This is also WCAG 1.4.10, Reflow.
- Keep a 16px minimum side gutter on mobile (`px-4`).
- Body text is at least 16px (`text-base`).
- Spacing uses the scale (`p-4` is 1rem, `gap-6` is 1.5rem). Any whole number works (`h-112`). Use an arbitrary value such as `top-[117px]` only when the design truly needs that exact number.

---

## 6. Images

**Hard rule:** every raster image is rendered with `next/image`, from a source file in a subfolder of `public/images/`.

`next/image` does what v2 did by hand. From one good source file it generates WebP at every needed size, serves the right one to each screen, sets the dimensions so the page doesn't jump, and lazy-loads by default. On Netlify the resizing runs on Netlify's image CDN with no setup.

### Folder organization
**Hard rule:** no image files sit loose at the root of `public/images/`. Use the section of the site (`hero/`, `about/`, `services/`, `gallery/`, `testimonials/`) or the type of asset (`brand/`, `decor/`). Keep original, unoptimized source files out of the repo, or in `documentation/source-images/`.

### Source files
- Save **one high-quality source** per image: JPG or WebP, cropped to the shape it is shown in, at about **2× the largest size it displays** (a full-width hero is about 2400px wide; a card image about 1200px).
- Compress the source before adding it (Squoosh or sharp). Aim for under about 400 KB per file so the repo stays light. `next/image` produces the small versions.
- Don't hand-make `.webp` copies or `-m` copies for resizing. Make a separate `-m` file only when the phone needs a **different crop** (see Art direction).
- File names are descriptive and hyphenated: `surveillance-night-vehicle.jpg`.
- SVG logos and illustrations are fine as files in `public/images/brand/` and are not resized.

### Markup

```jsx
import Image from "next/image";
import teamImg from "@/public/images/about/team-at-desk.jpg"; // importing the file gives width and height automatically

<Image src={teamImg} alt="Two investigators reviewing a case file" sizes="(max-width: 768px) 100vw, 50vw" className="h-auto w-full rounded-lg" />
```

- **Import the image file** as above. Next.js then knows its width and height, which prevents layout shift, and can show a blur while loading with `placeholder="blur"`.
- **`alt` is required.** See the alt text rules below.
- **Always set `sizes`** when the image is responsive or uses `fill`. It tells the browser how wide the image is at each breakpoint. Without it the browser assumes full screen width and downloads a file that is too large.
- **The largest above-the-fold image on a page gets `preload`.** It replaces the old `priority` prop, which is deprecated. Use it on one image only. Don't combine it with `loading` or `fetchPriority`.
- Every other image keeps the default lazy loading. Don't add `loading="lazy"` yourself.
- **Background images:** a positioned `next/image` behind the content, never CSS `background-image`:

```jsx
<section className="relative isolate">
  <Image src={heroImg} alt="" fill sizes="100vw" preload className="-z-10 object-cover" />
  {/* section content */}
</section>
```

- **Art direction (a different crop on phones):** use `getImageProps` with `<picture>`. Keep `alt` written on the `<img>` itself so the accessibility linter can see it.

```jsx
import { getImageProps } from "next/image";
import heroImg from "@/public/images/hero/office.jpg";
import heroMobile from "@/public/images/hero/office-m.jpg";

const alt = "Investigator reviewing a case file at a desk";
const { props: { srcSet: desktop } } = getImageProps({ alt, sizes: "100vw", src: heroImg });
const { props: { srcSet: mobile, ...rest } } = getImageProps({ alt, sizes: "100vw", src: heroMobile });

<picture>
  <source media="(min-width: 768px)" srcSet={desktop} />
  <source srcSet={mobile} />
  <img {...rest} alt={alt} className="h-auto w-full" />
</picture>
```

- **Quality:** the default is 75 and only values listed in `images.qualities` in `next.config.mjs` are honored. To use another value, add it to that list first.
- **Remote images** (from a CMS or another domain) must be allowed in `images.remotePatterns`. Prefer local files.
- **Carousels and sliders:** only the first visible slide may be eager. The rest stay lazy.

### Alt text
- Meaningful images get alt text describing what the image shows and why it matters, under about 125 characters, and without starting with "image of".
- Decorative images get `alt=""`.
- Logos use the business name as their alt text.

---

## 7. Fonts

**Hard rule:** fonts load through `next/font`. Never link to the Google Fonts CDN or any other font CDN.

`next/font` downloads the font files when the site is built and serves them from the site's own domain. The browser never contacts Google. That is the v2 self-hosting rule, done automatically, including the subsetting, the preload and the fallback-font sizing that prevents layout shift.

```jsx
// app/layout.js
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

<html lang="en" className={`${inter.variable} ${playfair.variable} antialiased`}>
```

- The `variable` names are wired to Tailwind in `globals.css` (`--font-sans: var(--font-inter)`), which creates `font-sans` and `font-display`.
- Use `next/font/google` for any Google font. Use `next/font/local` for a licensed or custom font file kept in the project.
- Latin subset only, unless the site's language needs more.
- Two families at most. Prefer variable fonts. For a non-variable font, list only the weights the design uses.
- Define each font once, in `app/layout.js` (or `app/fonts.js` if there are several), and never inside a component.
- `display` defaults to `swap`. Leave it.
- If a heading wraps differently when the web font arrives, adjust its size or tracking so it wraps the same way. This prevents CLS.

---

## 8. JavaScript, Client Components and Third-Party Code

### Language and dependencies
- **JavaScript, not TypeScript** (`.js` files), matching current MigsFlow projects. Revisit when Miguelle decides to adopt TypeScript.
- **Approved dependencies:** `next`, `react`, `react-dom`, `tailwindcss` and its Next.js integration, `eslint` with `eslint-config-next`, and `lucide-react` for icons. Optional for formatting: `prettier` with `prettier-plugin-tailwindcss`.
- Anything else (UI kits, animation libraries, carousels, state libraries, form libraries, CSS-in-JS) needs a clear reason and Miguelle's approval first. Build with HTML, Tailwind and a small component before reaching for a package.
- Keep Next.js and React on the latest patch release (Section 14).

### Keeping the browser's JavaScript small
- Server Components by default; `"use client"` on the smallest interactive piece (Section 2).
- Prefer the platform to state: `<details>` for an accordion, CSS `:hover`/`:focus-visible` for menus, `<dialog>` for a modal, anchor links for in-page navigation.
- Load a heavy client widget (a map, a gallery lightbox) only when needed, with `next/dynamic`.
- Never read `cookies()`, `headers()` or `searchParams`, and never call `new Date()`, `Date.now()` or `Math.random()`, in a Server Component on a content page. Each one stops the page from being static, and the build fails with an "uncached data" or "unstable value" error (Section 10). Anything that depends on the current time belongs in a small Client Component (see the footer year in Section 15).

### Third-party code
- Limit third-party scripts. Each one costs speed, privacy and reliability.
- Load them with `next/script`, in the page or layout that needs them, never with a raw `<script>` tag:
  - `afterInteractive` (the default) for analytics and tag managers.
  - `lazyOnload` for chat widgets and social embeds.
  - `beforeInteractive` only for something that must run first, such as a consent manager.
- **Heavy embeds are the #1 threat to a 98+ score.** Google Maps, YouTube, Calendly, Jobber, HoneyBook and chat widgets all fall in this group.
  - Never place a heavy embed above the fold if it can be avoided.
  - Use a **facade**: show a lightweight image or button and load the real embed only when the visitor clicks it or scrolls near it.
  - For a hero form, build the form natively (Section 13) instead of embedding a vendor iframe.
- **Popups and modals** open only after the visitor interacts (a scroll, a tap, or exit intent), never on a timer at page load.
- Google Analytics (GA4) loads with `next/script` after the page is interactive, never as a blocking script. If the client already uses Google Tag Manager, load GTM and don't add GA4 a second time.
- Icons are inline SVG or `lucide-react`. Import icons one by one (`import { Phone } from "lucide-react"`).

---

## 9. Tailwind and CSS Practice

- **One stylesheet:** `app/globals.css`, imported once in `app/layout.js`. No per-page CSS files, no CSS Modules and no CSS-in-JS unless a project needs them and Miguelle agrees.
- Tailwind generates only the classes the project uses, and Next.js minifies and splits CSS and JavaScript at build time. There is no manual minify step and no critical-CSS file.
- **Order of preference for styling:** utility classes → a component → a named class under `@layer components` → plain custom CSS in `globals.css`.
- **`@apply`** is for the rare case of styling markup you don't control (a third-party widget). It is not a way to rebuild BEM classes.
- **Preflight resets the browser's defaults.** Know these four:
  - Headings have no size or weight until you give them classes. They still carry meaning, so keep the heading order correct.
  - Lists have no bullets. If a real list stays unstyled, add `role="list"` so VoiceOver still announces it as a list.
  - Borders have no color until you name one (`border border-ink/20`).
  - An element with the `hidden` attribute stays hidden even with `block` or `flex`. Remove the attribute to show it.
- **States are variants:** `hover:`, `focus-visible:`, `active:`, `disabled:`, `aria-expanded:`, `data-[state=open]:`, `group-hover:`, `peer-invalid:`.
- **Dark mode**, when a site has it, is a `dark:` variant tied to a `data-theme` attribute with `@custom-variant` in `globals.css`. Only token values change between themes.
- Animate only `transform` and `opacity`. Wrap movement in `motion-safe:` or switch it off with `motion-reduce:`.
- Class order: install the `prettier-plugin-tailwindcss` formatter, or keep a consistent order by hand (layout → box → typography → color → states → responsive).
- The official **Tailwind CSS IntelliSense** extension for VS Code is required. A class that doesn't exist fails silently, and the extension is how you catch it.
- **Browser support:** Tailwind v4 needs Safari 16.4+, Chrome 111+ and Firefox 128+ (browsers from 2023 on). If a client must support older browsers, raise it before building.
- Don't add performance techniques by habit. Measure first, then keep what helps.

---

## 10. Performance Targets

**Hard rule:** every page must score at least the following in **PageSpeed Insights on mobile**:

| Category | Target |
|---|---|
| Performance | **98+** |
| Accessibility | **100** |
| Best Practices | **100** |
| SEO | **100** |

| Core Web Vital | Target |
|---|---|
| Largest Contentful Paint (LCP) | under 1.8 s (Google's "good" line is 2.5 s) |
| Cumulative Layout Shift (CLS) | under 0.05 |
| Total Blocking Time (TBT) | under 100 ms |
| Interaction to Next Paint (INP) | under 200 ms |

- Test **every page**, not just the homepage. Run PageSpeed Insights 2–3 times and use the typical score.
- Test the **live deployed URL**. `npm run dev` is slow by design and its scores mean nothing.
- Record before and after scores for each project in `documentation/`.
- A React site sends the framework's JavaScript to every page, so the target is harder to reach than with plain HTML. It is kept because the levers below make it reachable. If a page still lands at 95–97 after they are applied, report the score and the cause instead of hiding it, and Miguelle decides.

### Static pages
- Read the table printed by `npm run build`. Every content route must show `○ (Static)`.
- `◐` (partial) or `ƒ` (dynamic) on a brochure page means something request-time crept in: a cookie or header read, `searchParams`, an uncached fetch, or the current time. Find it and fix it (Section 8).
- A page that genuinely needs request-time data wraps that part in `<Suspense>` so the rest stays static.

### The most common reasons a page lands under 98
- An oversized hero source, a missing `sizes`, or a hero without `preload`.
- `"use client"` too high in the tree, which ships whole sections as JavaScript.
- A heavy third-party embed above the fold.
- A timed popup.
- A large package imported into a Client Component. Check with `npx next analyze`.
- Too many font families or weights.

Reference: CodeStitch Page Speed Handbook, https://codestitch.app/page-speed-handbook/. Where it differs from this handbook, MigsFlow rules take priority.

---

## 11. Accessibility (WCAG 2.2 Level AA)

Nothing about accessibility changes with the framework. React and Tailwind produce ordinary HTML and CSS, and that output is what gets tested.

### Why it matters
- In the US, ADA lawsuits over inaccessible websites are filed by the thousands each year, and small businesses are frequent targets.
- The DOJ's 2024 rule requires WCAG 2.1 AA for state and local government sites.
- The European Accessibility Act (in force June 2025) and Ontario's AODA set similar requirements.
- **WCAG 2.2 AA** is the standard to build to. It covers 2.1 and adds more.
- **Don't rely on accessibility overlay widgets.** They don't fix the underlying code, and sites using them still get sued. Accessibility is built into the markup and styles.

### The four principles (POUR)

**Perceivable**
- Text contrast is at least **4.5:1**. Large text (24px, or 18.66px bold) and UI parts such as icons, input borders and focus rings need at least **3:1**.
  - Check text over gradients and photos at their *lightest* point.
  - Never put white text on a light accent color.
  - Check opacity shortcuts such as `text-ink/60`. Lowering opacity lowers contrast.
- Meaningful images have alt text, and decorative images get `alt=""`. Decorative inline SVGs get `aria-hidden="true"`. See Section 6.
- Videos have captions. Auto-playing motion longer than 5 seconds has a pause button.
- Never use color as the only signal. An error message also needs an icon or text.
- Text can be resized to 200% and the layout reflows at 320px without horizontal scrolling.

**Operable**
- Everything works with a keyboard alone, in a logical tab order, and never traps focus. Menus and modals close with Escape.
- Every focusable element shows a **visible focus style** (`focus-visible:outline-2 focus-visible:outline-offset-2`), and the sticky header never hides it (WCAG 2.2, 2.4.11 Focus Not Obscured). `scroll-padding-top` in `globals.css` handles the header.
- Never remove an outline without replacing it. If one must be hidden, use `outline-hidden`, which keeps it visible in Windows high-contrast mode, not `outline-none`.
- Include a **skip link** ("Skip to main content") as the first focusable element. It lives in `app/layout.js` (Section 12).
- Tap targets are at least **24×24px**, and 44×44px (`size-11`) is better for primary buttons (2.5.8, Target Size).
- Any action that requires dragging also has a click alternative (2.5.7, Dragging Movements).
- A closed mobile menu uses `invisible` or the `hidden` attribute, not just `opacity-0` or zero height, so its links can't be tabbed to. The toggle is a `<button>` with `aria-expanded` and `aria-controls`.
- Respect reduced motion with `motion-reduce:` and `motion-safe:`. Turn off parallax, autoplay and large movement.
- **Scroll-reveal animations must never hide content with `opacity-0`.**
  - Scanners and Lighthouse read hidden text as failing contrast, and the text stays invisible if JavaScript fails.
  - Keep text visible and animate only `transform`, or fade with `filter: opacity()`.
  - The `h1` never waits on a reveal animation.
- **After a page change, focus and announcements still work.** Next.js announces the new page title to screen readers on client-side navigation, so every page needs a real title and `h1`.

**Understandable**
- Set `<html lang="en">` (or the correct language) in `app/layout.js`.
- Navigation and help links (phone, contact) stay in the same place on every page (3.2.6, Consistent Help). A shared layout gives this for free.
- Every form field has a visible `<label>` tied with `htmlFor` and `id`. A placeholder is not a label.
- Errors are written in text, tied to the field with `aria-describedby`, marked with `aria-invalid="true"`, and announced through an `aria-live` region.
- Don't make people re-enter information they already gave in the same flow (3.3.7, Redundant Entry). When a form comes back with errors, it keeps what was typed.
- Use `autoComplete` on name, email, phone and address fields.

**Robust**
- Use semantic elements: `header`, `nav`, `main`, `section`, `article`, `footer`, `button` and `a`. Never put `onClick` on a `div`.
- A `button` does something on the page. An `a` or `<Link>` goes somewhere. Don't swap them.
- Use one `h1` per page and never skip heading levels. Tailwind removes heading sizes, which makes it tempting to pick a heading by its look. Pick it by its level.
- Use ARIA only when HTML can't do the job. Give icon-only buttons an `aria-label` or `sr-only` text.
- No duplicate IDs. A component used twice on a page must not hard-code an `id`; use React's `useId()`.
- JSX spellings: `className`, `htmlFor`, `tabIndex`, `autoComplete`, `strokeWidth`. `aria-*` and `data-*` keep their hyphens.
- `npm run lint` includes accessibility checks (`jsx-a11y`). Fix every warning.

### Testing (every page, every launch)
- Lighthouse Accessibility at 100.
- **axe DevTools** or **WAVE** with zero errors.
- Keyboard-only walkthrough: Tab, Shift+Tab, Enter, Space and Escape.
- Test both themes if the site has a dark/light toggle.
- Zoom to 200% and check at a 320px width.
- Do a quick screen reader pass with VoiceOver (Cmd+F5 on Mac): headings, landmarks, forms, menu, and moving between two pages.

---

## 12. SEO and Launch Basics

### Site facts and the root layout

Facts that appear in many places are written once:

```js
// lib/site.js
// Netlify sets CONTEXT to "production", "deploy-preview" or "branch-deploy" while it builds.
export const isProduction = process.env.CONTEXT ? process.env.CONTEXT === "production" : true;

export const site = {
  name: "Business Name",
  // Canonicals and the sitemap always use the production domain, never a preview address.
  url: "https://www.example.com",
  phone: "+1-619-555-0100",
  phoneDisplay: "(619) 555-0100",
  email: "hello@example.com",
};
```

The root layout holds what v2 repeated in every page's `<head>`, plus the shared page shell:

```jsx
// app/layout.js
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { site, isProduction } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata = {
  metadataBase: new URL(site.url),              // lets every URL below be written as a path
  title: {
    default: "Private Investigator in San Diego | Business Name",   // the homepage title
    template: "%s | Business Name",                                 // inner pages fill in %s
  },
  description: "Licensed private investigations across San Diego County. Free, confidential consultation.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: site.name, url: "/" },
  twitter: { card: "summary_large_image" },
  robots: isProduction ? undefined : { index: false, follow: false },  // previews stay out of Google
};

export const viewport = { themeColor: "#17131a" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body id="top" className="bg-cream font-sans text-ink">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-ink">
          Skip to main content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
```

Next.js adds the charset and viewport tags by itself. Don't write a `<head>` by hand.

### Every page

```jsx
// app/services/surveillance/page.js
export const metadata = {
  title: "Surveillance Services in San Diego",       // becomes "Surveillance Services in San Diego | Business Name"
  description: "Discreet, court-ready surveillance across San Diego County. Licensed investigators. Request a confidential consultation.",
  alternates: { canonical: "/services/surveillance" },
  openGraph: {
    title: "Surveillance Services in San Diego",
    description: "Discreet, court-ready surveillance across San Diego County.",
    url: "/services/surveillance",
  },
};
```

- **Every `page.js` sets its own `title`, `description` and `alternates.canonical`.** A page that sets none inherits the layout's canonical of `/`, which tells Google the page is a copy of the homepage.
- `metadata` only works in Server Components, which is one more reason `page.js` never gets `"use client"`.
- A page's `openGraph` object **replaces** the layout's; it is not merged. The default share image still applies because it comes from the `app/opengraph-image.jpg` file.
- A page whose content comes from data (a list of services in `lib/`) uses `generateMetadata` instead. In Next.js 16 `params` is a Promise: `const { slug } = await params`.

### On-page rules
- **Title:** unique to the page, built as *main keyword + location | Brand*. The brand comes last, except on the homepage.
  - **Aim for 50 characters or fewer. 60 is the hard limit.** Google cuts titles off at about 60 characters, and preview checkers flag anything longer.
  - Count the title **after the template adds the brand**. Spaces and the `|` separator count.
  - If it runs long, shorten the keyword part first and keep the brand name whole. For a long brand name, write the full title with `title: { absolute: "…" }` to skip the template.
  - The Open Graph title follows the same limit and can differ from the page title.
- **Meta description:** unique, about 140–160 characters, with a benefit and a call to action. It doesn't affect ranking directly, but it wins clicks.
- **One `h1`** per page containing the main keyword. Below it, use `h2` and `h3` in order.
- **One main topic per page.**
  - Each service gets its own page targeting "*service* + *city*."
  - Never make two pages compete for the same keyword.
- **Write for people first.** Use keywords naturally in the title, `h1`, first paragraph, a subheading, image alt text and the URL. Never keyword-stuff.
- **Content that helps:** real details such as prices or starting prices, what's included, process, service area, FAQs and real photos. Thin pages with two sentences don't rank.
- **Content is in the HTML.** Text that matters for search is rendered by Server Components, never fetched in the browser after load.
- **Internal links:** every page links to related pages with descriptive anchor text ("see our surveillance process", not "click here"). No orphan pages.
- **No broken links.** Check before launch with a link checker.
- **Image SEO:** descriptive file names and alt text. `next/image` handles format and size.
- **Mobile-friendly and fast:** Google ranks the mobile version, so Sections 5 and 10 are SEO rules too.

### Local business essentials
- **NAP consistency:** the business **N**ame, **A**ddress (or service area) and **P**hone appear the same way in the footer, on the Contact page, in the schema and on the Google Business Profile. Reading them all from `lib/site.js` keeps them identical.
- **Phone numbers are tap-to-call links:** `<a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>`.
- **Google Business Profile:** link it to the new site, and add a link to the Google reviews.
- **LocalBusiness schema (JSON-LD)** on the homepage. Use the most specific type available, such as `LegalService`, `MovingCompany`, `HouseCleaningService` or `ProfessionalService`.

```jsx
// components/JsonLd.js  (approved exception, Section 3)
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      // The replace() stops a "<" inside the data from closing the script tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
```

```jsx
// app/page.js
<JsonLd data={{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  address: { "@type": "PostalAddress", addressLocality: "San Diego", addressRegion: "CA", addressCountry: "US" },
  areaServed: "San Diego County",
  openingHours: "Mo-Fr 09:00-17:00",
  sameAs: ["https://facebook.com/…"],
}} />
```

- **Optional schema:** `Service` on service pages, `BreadcrumbList` on nested pages, `FAQPage` where there's an FAQ.
- Only mark up content that's actually visible on the page, and never add fake ratings.
- Validate with Google's **Rich Results Test**.

### Site files
Next.js builds these from files in `app/`. Don't add the matching `<link>` or `<meta>` tags by hand.

| v2 file | v3 file | Notes |
|---|---|---|
| `favicon.ico` | `app/favicon.ico` | 32×32 |
| `favicon.svg` | `app/icon.svg` or `app/icon.png` | |
| `apple-touch-icon.png` | `app/apple-icon.png` | 180×180 |
| `icon-192.png`, `icon-512.png` | `public/icon-192.png`, `public/icon-512.png` | listed in the manifest |
| `site.webmanifest` | `app/manifest.js` | name, theme color, the two PNG icons |
| `images/social/og-home.jpg` | `app/opengraph-image.jpg` | **A picture of the homepage hero.** 1200×630, under 300 KB, plus `opengraph-image.alt.txt` holding its alt text. Rules below. |
| `robots.txt` | `app/robots.js` | below |
| `sitemap.xml` | `app/sitemap.js` | below |
| `404.html` | `app/not-found.js` | below |

**Icons: generate them from the logo if none are supplied (v3.1).** Don't wait to be asked. Use the logo's mark (the symbol, not the full wordmark, which is unreadable at 32px) on a solid or transparent square, check it is recognisable at 16px and 32px, and export `app/favicon.ico`, `app/icon.svg` or `app/icon.png`, `app/apple-icon.png` and the two manifest PNGs. If there is no usable mark, use the brand's initial in the brand color. Say that it was generated so it can be approved or replaced. A site never launches, or goes out for preview, with the framework's default icon (delete the `favicon.ico` that `create-next-app` writes).

**Link preview image: always a picture of the homepage hero (v3.1).** `app/opengraph-image.jpg` is what shows when a link is shared by text, in Slack or on social media, so it should look like the site. Every page uses it unless a route has its own `opengraph-image` file.
- **Size and file:** exactly 1200×630 pixels (1.91:1), JPG, under 300 KB.
- **Safe area:** some apps crop the preview to a square. Keep the headline, logo and button inside the middle 630×630 pixels, with a margin. If the real hero is wide, make a version with the text larger and more central.
- **How to make it:** render the homepage at 1200×630 with everything except the hero hidden and the animations finished, then save the result. Don't paste a full-width desktop screenshot: its text is too small and too wide.
- **Tags:** Next.js writes `og:image`, its width, height and type, and `twitter:image` from the file, and `og:image:alt` from `opengraph-image.alt.txt`. `og:site_name` and `twitter:card` come from the root layout above. Don't add any of them by hand.
- **Full address:** the image address is built from `metadataBase`. The root layout above sets that to the production domain, so **before the domain is live the preview image points at an address that does not exist yet and previews will fail in a share inspector.** While a site is under review on a Netlify preview address, `metadataBase` has to be the address actually being served (Netlify provides it at build time as `DEPLOY_PRIME_URL`), and the production domain again at launch. The exact code for this has not been test-built yet; see the open questions in Section 23, and add "preview image loads on the live domain" to the launch checks.
- **Keep it current:** it is a snapshot. Remake it whenever the hero's image or wording changes.
- **Check it:** run a meta-tag inspector on the address under review and fix every error and warning; after launch, LinkedIn's Post Inspector and Facebook's Sharing Debugger (they also clear old cached previews).

```js
// app/sitemap.js
import { site } from "@/lib/site";

// Add every public page here when it is created.
const paths = ["", "/about", "/services", "/services/surveillance", "/contact", "/privacy-policy"];

export default function sitemap() {
  return paths.map((path) => ({ url: `${site.url}${path}`, changeFrequency: "monthly" }));
}
```

```js
// app/robots.js
import { site, isProduction } from "@/lib/site";

export default function robots() {
  return {
    rules: isProduction ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
```

```jsx
// app/not-found.js
import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="px-4 py-24 text-center">
      <h1 className="font-display text-4xl">Page not found</h1>
      <p className="mt-4"><Link href="/" className="underline">Go back home</Link></p>
    </section>
  );
}
```

- The sitemap is a hand-kept list. **Add a page to it in the same change that creates the page.** If the project uses `trailingSlash: true`, write the paths with the slash.
- The not-found page returns a real 404 status and is kept out of search automatically. It still shows the header and footer from the layout.
- Also add `app/global-error.js` (a Client Component with its own `<html>` and `<body>`) so a crash shows a branded message.

### Redirects
- When replacing an old site, map every old URL to its new one so rankings and bookmarks carry over.
- Redirects live in `next.config.mjs`:

```js
// next.config.mjs
async redirects() {
  return [
    { source: "/about-us", destination: "/about", statusCode: 301 },
    { source: "/html/contact.html", destination: "/contact", statusCode: 301 },
  ];
},
```

- **Write `statusCode: 301`.** The shorter `permanent: true` sends a 308. Search engines treat both as permanent, but 301 is what every SEO tool and client report expects.
- For a very large or generated list (hundreds of rules), use a `[[redirects]]` block in `netlify.toml` instead. Netlify's rules run before Next.js's. Keep each project's redirects in **one** of the two places.
- If a URL isn't changing, it doesn't need a redirect. Keep old paths whenever practical.
- Send each old URL to its **closest matching** new page. Never dump unrelated pages on the homepage. If a page truly has no equivalent and the client agrees to drop it, let it return the 404 page.
- One hop only: no redirect chains (A → B → C) and no loops. Point internal links straight at the new URLs instead of relying on redirects.
- Test every redirect on the live site after launch.
- Keeping URLs reduces disruption, but no migration guarantees identical rankings. Never promise that to a client.

### After launch
- Verify the site in **Google Search Console** (or keep using the client's existing property), submit the sitemap and request indexing for the main pages.
- Install GA4 (Section 8). If the client already has a GA4 property, reuse its Measurement ID so their history carries over. Never create a duplicate property.
- Update the website link on the Google Business Profile, Facebook, Instagram, Yelp and any directories, but only where the URL actually changed.
- The full launch-day and monitoring steps are in Section 20.

---

## 13. Forms and Third-Party Integrations

v2 had no server, so every form posted to an outside service. A Next.js site on Netlify can run a small piece of server code, which opens a second option and lets private keys stay private.

### Choosing where a form sends

| Need | Use |
|---|---|
| Simple contact form that emails the client | **Netlify Forms** (pattern below), **Web3Forms** or **Formspree** |
| A form that needs server-side checks, a private API key, or its own email template | A **Server Action** that validates and then calls an email service (for example Resend) or a webhook |
| Leads must land in the client's CRM (Jobber, HoneyBook, HubSpot) | The CRM's own form embed, **or** a native form whose Server Action posts to the CRM's API or a **Zapier/Make webhook** |
| Booking | The client's booking tool (Calendly, Jobber, Acuity), behind a facade (Section 8) |

Pick one per form, record it in the project's `CLAUDE.md` and `documentation/`, and test it end to end.

### Pattern A: Server Action

```js
// app/contact/actions.js
"use server"; // this code runs on the server only; the browser never sees it

export async function sendMessage(prevState, formData) {
  // Honeypot: real visitors never see or fill this field.
  if (formData.get("company")) return { ok: true };

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  const errors = {};
  if (!name) errors.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address.";
  if (message.length < 10) errors.message = "Tell us a little more (at least 10 characters).";
  if (Object.keys(errors).length) return { ok: false, errors, values: { name, email, message } };

  // Send through the email service here, using a secret from process.env (never NEXT_PUBLIC_).
  return { ok: true };
}
```

```jsx
// components/ContactForm.js
"use client"; // needs state for errors and the "Sending…" button

import { useActionState } from "react";
import { sendMessage } from "@/app/contact/actions";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendMessage, { ok: false, errors: {}, values: {} });

  if (state.ok) return <p role="status">Thanks. Your message was sent.</p>;

  return (
    <form action={formAction} noValidate className="grid gap-4">
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name" name="name" type="text" autoComplete="name" required
          defaultValue={state.values?.name}
          aria-invalid={state.errors?.name ? "true" : undefined}
          aria-describedby={state.errors?.name ? "name-error" : undefined}
          className="block w-full rounded-md border border-ink/30 px-3 py-2"
        />
        {state.errors?.name && <p id="name-error" className="text-red-700">{state.errors.name}</p>}
      </div>

      {/* …email and message fields follow the same shape… */}

      {/* Honeypot: hidden from people and from screen readers */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p aria-live="polite" className="sr-only">{Object.values(state.errors || {}).join(" ")}</p>

      <button type="submit" disabled={pending} className="rounded-md bg-accent px-5 py-2.5 text-white disabled:opacity-60">
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
```

- **A Server Action is a public web address.** Anyone can send it anything, so it always validates on the server, even when the browser already checked the fields.
- It returns the typed values with the errors, so nobody has to re-enter them (Section 11).
- Requests are limited to 1 MB. File uploads need a different plan; raise it before building.

### Pattern B: Netlify Forms
Netlify finds forms by reading static HTML when it deploys, and it can't read React components. Two parts are needed:

1. **A static copy of the form** at `public/__forms.html`. Nobody visits it. It only tells Netlify which fields exist.

```html
<!-- public/__forms.html -->
<html>
  <head></head>
  <body>
    <form name="contact" data-netlify="true" netlify-honeypot="bot-field" hidden>
      <input type="hidden" name="form-name" value="contact" />
      <input name="name" />
      <input name="email" />
      <textarea name="message"></textarea>
      <input name="bot-field" />
    </form>
  </body>
</html>
```

2. **The real form**, a Client Component that posts to that file:

```js
async function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);   // includes the hidden form-name field
  const response = await fetch("/__forms.html", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  });
  // show the thank-you state if response.ok, an error message if not
}
```

- The real form includes `<input type="hidden" name="form-name" value="contact" />`, and every field name matches the static copy exactly.
- **Never put `data-netlify` or `netlify` attributes on a form in JSX.** The Netlify build fails on purpose when it finds them.
- Turn on form detection in the Netlify dashboard (Forms), and set the notification email there.
- This pattern cannot be tested with `npm run dev`. Test it on a Netlify deploy preview.

### Rules for every form
- **Never put API keys or secrets in browser code.**
  - Anything in a Client Component, and any variable starting with `NEXT_PUBLIC_`, is public.
  - Public form keys that the service designed to be public (Web3Forms access keys, Formspree IDs) are fine.
  - Private keys live in Netlify environment variables and are read only inside Server Actions or other server code.
- **Contact form and quote form are separate** when a client needs both. The quote or lead form goes to the CRM, and the contact form goes to email.
- Every form has:
  - Visible labels, the `required` attribute and the right `type` and `autoComplete` values.
  - Accessible error messages (Section 11).
  - A **honeypot** field for spam, plus the service's own spam setting.
  - A clear thank-you state or page, plus GA4 conversion tracking on success.
  - **A real test submission before launch**, checked all the way to the inbox or CRM.
- **Multi-step and qualifying forms:**
  - The branching logic lives in the form's Client Component.
  - To preselect a service from a link (`/quote?service=surveillance`), read the value in the browser with `useSearchParams` inside a `<Suspense>` boundary. Reading `searchParams` in the page itself makes the whole page dynamic (Section 10).
  - A Server Action form still submits before JavaScript has loaded. Keep that working.
- **Phone numbers and texting:**
  - If the client will text leads, add SMS consent wording beside a checkbox, for example: "By checking this box, you agree to receive text messages from *Business*. Msg & data rates may apply. Reply STOP to opt out."
  - The checkbox is never pre-checked.
- **Sensitive details:** collect only what the first contact needs. For businesses that handle private matters (legal, medical, investigations), tell visitors not to include confidential details in the form.
- **Privacy Policy page** is required whenever a form collects personal info, when analytics run and when SMS consent is collected. Link it in the footer.
- **Document every integration** in `documentation/` (vendor, account owner, where submissions go, any monthly cost), so the client and the next developer know how it works.

---

## 14. Domains, Hosting, Security and Git

### Hosting on Netlify
MigsFlow sites deploy to Netlify from GitHub, as before. Netlify detects Next.js and sets itself up.

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"
```

```
# .nvmrc
24
```

- Don't install or pin `@netlify/plugin-nextjs`. Netlify adds the current version automatically.
- **Don't use `output: "export"`** (static export). It switches off Server Actions, redirects and headers in `next.config.mjs`, and image optimization. The default build on Netlify still serves static pages from the CDN.
- `.nvmrc` sets the Node.js version for both your Mac and Netlify. Next.js 16 needs Node 20.9 or newer.
- **Environment variables:**
  - Secrets are set in the Netlify dashboard (Project configuration → Environment variables), never in `netlify.toml` and never in the repo.
  - Locally they go in `.env.local`, which is git-ignored. Commit a `.env.example` listing the names with no values.
  - Only names starting with `NEXT_PUBLIC_` reach the browser, and their values are baked in at build time. Treat them as public.
- **Previews:** every pull request gets a Deploy Preview, which Netlify marks `noindex` by itself. Branch deploys are not marked, which is why `lib/site.js`, `app/robots.js` and the layout's `robots` setting all check `isProduction`. Nothing needs removing on launch day.
- `netlify.toml` `[[headers]]` rules only reach static files, not pages. Security headers go in `next.config.mjs` (below).
- Netlify's own redirects run before Next.js's (Section 12).
- GitHub Pages cannot host a Next.js site with these features. Use Netlify previews.

### Domains and DNS
- **Four separate systems, often at four different companies:** domain registration (GoDaddy, Namecheap), DNS management, website hosting (Netlify) and email hosting (Google Workspace, Microsoft 365). Changing one doesn't change the others.
- Moving a website to Netlify **does not** require transferring the domain away from its registrar.
- **Before changing anything,** export or screenshot every DNS record (A, AAAA, CNAME, MX, TXT, SPF, DKIM, DMARC) into the DNS log in the project checklist, and note which records run email.
- When pointing a domain at the new site, **change only the website records** (the A record or CNAME for `@` and `www`) at the client's current DNS provider.
- **Never touch MX, TXT/SPF, DKIM or DMARC records.** They run the client's email.
- **Don't move nameservers** unless it's planned. If a domain's DNS ever moves to Netlify DNS, recreate every email record there *before* switching, or the client's email stops.
- **Lower the TTL** on the website records (to 300 seconds) a day before launch, so the switch, and any rollback, takes minutes instead of hours.
- Make sure both `domain.com` and `www.domain.com` work. One redirects to the other, and `site.url` in `lib/site.js` uses the one that is primary. HTTPS is on (Netlify issues free certificates).
- Never change a client's live DNS without their go-ahead and a rollback plan (Section 18).

### Security basics
- HTTPS only. No "mixed content" (`http://` images or scripts on an `https://` page).
- External links that open in a new tab use `target="_blank" rel="noopener"`.
- Use embeds and scripts only from trusted sources.
- Baseline settings in `next.config.mjs`:

```js
// next.config.mjs  (add to the settings create-next-app wrote; don't remove its lines)
poweredByHeader: false,
async headers() {
  return [{
    source: "/(.*)",
    headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ],
  }];
},
```

- A Content-Security-Policy is optional. If one is added, set it as a header here. The nonce-based kind forces every page to render on each request, which breaks the static rule (Section 10).
- Never render text from a form or URL with `dangerouslySetInnerHTML`. The JSON-LD component is the only approved use.
- **Keep Next.js and React patched.** Server-side frameworks get security fixes that matter. Run `npm audit` before launch, and update with `npx next upgrade` when a security release is announced. Commit `package-lock.json` so every build installs the same versions.
- `npm install` runs code from the internet. Install only the approved packages (Section 8), spelled exactly.

### Git
- One repo per project, with `main` as the default branch.
- Write short, clear commit messages describing what changed.
- Keep the `.gitignore` that `create-next-app` writes (it covers `node_modules`, `.next`, `.env*` and `.DS_Store`) and add:
  ```
  documentation/private/
  !.env.example
  ```
- Never commit `node_modules/`, `.next/` or any `.env` file. Always commit `package-lock.json` and `AGENTS.md`.
- **Never commit private client material:**
  - Contracts, logins, invoices and personal info belong in `documentation/private/` (ignored) or outside the repo.
  - Everything in a public repo, and everything deployed, is public.

---

## 15. Content Integrity

- Reviews and testimonials are **real**, quoted accurately and credited the way the source shows them. Never write fake reviews.
- Ratings, review counts, years in business, "clients served" and awards come from the client or a verifiable source.
- License numbers, certifications and memberships are shown exactly as issued, and only when the client has confirmed them.
- Use only licensed, client-provided or properly credited images and fonts.
- Mark placeholder content clearly (e.g. `[PLACEHOLDER: team photo]`) and search for it before launch so nothing ships by accident.
- The copyright year in the footer updates automatically. Under Next.js it must be a small Client Component, because reading the date in a Server Component fails the build (Section 8):

```jsx
// components/CurrentYear.js
"use client";

import { useSyncExternalStore } from "react";

const BUILD_YEAR = Number(process.env.NEXT_PUBLIC_BUILD_YEAR);
const subscribe = () => () => {};

export default function CurrentYear() {
  // The built HTML shows the year of the last deploy; the browser then shows today's year.
  return useSyncExternalStore(subscribe, () => new Date().getFullYear(), () => BUILD_YEAR);
}
```

```js
// next.config.mjs
env: { NEXT_PUBLIC_BUILD_YEAR: String(new Date().getFullYear()) },
```

Use it as `<p>&copy; <CurrentYear /> {site.name}</p>`.

---

## 16. MigsFlow Build Workflow

1. **Onboard:** copy the project checklist into `documentation/`, complete discovery and access (Section 17), and for a redesign, audit the old site and build the URL map (Section 18).
2. **Scaffold:** create the Next.js app (Section 1), add `.nvmrc`, `netlify.toml`, the `.gitignore` additions, `handbook/` and the root `CLAUDE.md`. Run `npm run dev` and confirm the starter page loads.
3. **Design system:** fonts in `app/layout.js`, tokens in `@theme`, base styles in `globals.css`. Check contrast for every token pair now.
4. **Site facts:** fill in `lib/site.js`.
5. **Shell:** `Header`, `Footer`, skip link and `BackToTop` in `app/layout.js`, plus shared pieces such as `Button`.
6. **Pages:** one route folder per page, built from semantic Server Components, phone layout first, with one `h1` and its own `metadata`.
7. **Interactivity:** small Client Components only where needed.
8. **Images:** crop and compress sources into `public/images/<section>/`, render with `next/image`, set `sizes`, and `preload` the hero.
9. **SEO files:** `sitemap.js`, `robots.js`, `manifest.js`, icons, `opengraph-image.jpg`, `not-found.js`, JSON-LD and redirects.
10. **Forms:** build, connect, add the honeypot, run a test submission and add the Privacy Policy.
11. **Check the build:** `npm run lint`, then `npm run build`. No errors, and every content route shows `○`.
12. **Test on a deploy preview:** responsive widths, keyboard, axe/WAVE, contrast, both themes, console errors and broken links.
13. **Clean:** remove dead components, unused images, `console.log` calls, placeholders and the starter files `create-next-app` left in `public/`.
14. **Final performance pass:** PageSpeed Insights mobile on **every page** of the deployed site must reach the Section 10 targets. Record the scores.
15. **Launch and monitor:** the Definition of Done (Section 19), then launch day, monitoring and handoff (Section 20).

**Everyday commands** (typed in the VS Code terminal, inside the project folder):

| Command | What it does |
|---|---|
| `npm install` | Downloads the project's packages. Run once after cloning, and after `package.json` changes. |
| `npm run dev` | Starts the local preview at http://localhost:3000. Leave it running while you work; press Ctrl+C to stop it. |
| `npm run lint` | Checks the code for mistakes, including accessibility problems. |
| `npm run build` | Builds the production version and prints the route table. Run before every push. |

---

## 17. Client Onboarding and Discovery

Every client project starts by copying `handbook/project-checklist-template.md` to `documentation/project-checklist.md`. It tracks what's done and what's still open, from the first call to the 30-day check-in.

- Tick the project type at the top: **New build** or **Redesign / migration**.
- Items tagged *Redesign* don't apply to new builds. Mark them N/A instead of deleting them, so the record stays complete.
- Keep it current as you go, and review it with the client before launch.

### What to collect before building
- The business name, the main contact, and the email address form submissions should go to.
- The site's main job: leads, bookings, information, or selling.
- The agreed scope: pages, features and integrations, matching the proposal.
- Brand assets: logo, colors, fonts, photos and written content.
- Legal needs: privacy policy, disclaimers, licensing numbers, and industry rules (for example attorney advertising rules, contractor license display, or a state investigator license number).

### Map the client's current setup
Even for a new build, find out:
- Where the domain is registered, and who owns and controls it.
- Who manages DNS, and where email is hosted.
- The current website platform and host, if there is one.
- Whether GA4, Search Console and a Google Business Profile already exist, and who has access.
- Any forms, booking tools, CRMs, tracking pixels or marketing tools already in use.

### Access without passwords
**Never ask a client to send account passwords.** Use the provider's own sharing tools instead:
- GoDaddy **Delegate Access** or Namecheap **Share Access** for domains and DNS.
- User invitations for GA4, Search Console and the Google Business Profile.
- A team invite for Netlify, and a collaborator invite for GitHub.

If a credential truly can't be avoided, receive it through a password manager's secure share (1Password, Bitwarden Send), never by email or text, and never store it in the repo (Section 14). Ask only for the access the job needs.

---

## 18. Redesigns and Migrations

A redesign isn't finished until everything the old site did has been accounted for: its content, URLs, forms, tracking and integrations. Each one is either kept or deliberately retired with the client's approval.

### Audit the old site before building
- List **every** URL, not just the ones in the menu. Combine the old `sitemap.xml`, the Search Console **Pages** report, and a crawler (Screaming Frog is free up to 500 URLs).
- **Pages missing from the navigation aren't automatically unneeded.** They may rank, or be linked from ads or emails. Confirm with the client before dropping any.
- For each page, record the title, meta description, headings (`h1`–`h3`) and main keywords, so the strongest content carries over.
- Note existing redirects, canonical tags, `robots.txt`, the sitemap and any schema markup.
- Note every form and where its submissions go.
- Note tracking: the GA4 Measurement ID, Google Tag Manager, ad pixels and conversion events.
- **Back up** the old site before anything changes: export the content and images, and save copies of the key pages.
- Flag anything outside a brochure site (logins, member areas, shopping carts, client portals). Next.js can build these, but they are a separate scope with their own security work. Agree on the plan and the price with the client before building.

### URL map
- Fill in the URL map in the project checklist: old URL → new URL → keep, 301 or retire (approved).
- Keep paths whenever practical, including whether they end in a slash (Section 1).
- Write the redirect rules from the map, following Section 12.

### Keep the client's existing Google accounts
Changing hosts doesn't remove a GA4 property, a Search Console property or a Google Business Profile. Keep using them.
- **GA4:** reuse the existing Measurement ID. If the old site loads tags through Google Tag Manager, keep GTM instead of adding a second copy of GA4, which would double-count every visit. Rebuild the important events (form submissions, consultation requests) and confirm them in **Realtime** or **DebugView**.
- **Search Console:** keep the existing property. A Domain property keeps working across a host change. After launch, submit the new sitemap and inspect the key URLs.
- **Google Business Profile:** change the website link only if the URL changes. Check that the name, address and phone still match the site (Section 12).
- **Ads and other tools:** test any Google Ads landing pages and conversion tracking, plus CRM, booking and email-marketing connections.
- Check whether the client needs a cookie or consent notice for analytics (for example, if they serve visitors in the EU or California).

### Staging and previews
- Build and review on a Netlify Deploy Preview or branch deploy. The client approves the preview before launch.
- Previews stay out of Google through the `isProduction` checks (Section 14). On launch day, **confirm** the live site is indexable: view the page source for a robots tag and open `/robots.txt`.
- Canonical tags and the sitemap always use the production domain, never a preview URL.

### Rollback plan and change log
- Keep the old site running, and its DNS values recorded, until the new one is verified live. Switching back is then one DNS change.
- Netlify keeps every deploy. A bad release is rolled back from the Deploys list with "Publish deploy" on an earlier one.
- Don't cancel the old hosting until launch is verified and the client agrees. Waiting until the 30-day check (Section 20) is safest.
- Record major changes in the project checklist's change log and the project's `CLAUDE.md`: DNS edits, redirects added, accounts connected, and pages retired.

---

## 19. Launch Checklist (Definition of Done)

**Code**
- [ ] `npm run lint` and `npm run build` pass with no errors or warnings.
- [ ] Every content route shows `○ (Static)` in the build table.
- [ ] No `style` attributes, `<style>` tags or inline scripts beyond the approved exceptions (Section 3).
- [ ] Shared UI lives in `components/`, tokens in `@theme`, facts in `lib/site.js`, with nothing duplicated.
- [ ] `"use client"` appears only on small interactive components, never on a page or layout.
- [ ] Mobile-first classes, with no horizontal scroll from 320px to 1920px.
- [ ] Internal links use `<Link>`, and one URL form (with or without trailing slash) is used everywhere.
- [ ] No console errors, no `console.log`, no placeholder text, no leftover starter files.
- [ ] Back-to-top button on every page, bottom-right, appearing on scroll.
- [ ] Only approved dependencies in `package.json`. `npm audit` shows nothing high or critical.

**Assets**
- [ ] Every raster image uses `next/image` with `alt` and `sizes`. One `preload` per page, on the hero.
- [ ] Sources are cropped, compressed and filed in `public/images/` subfolders.
- [ ] Fonts load through `next/font`: two families at most, latin subset, only the needed weights.
- [ ] Icons are inline SVG or `lucide-react`. No icon fonts and no jQuery.

**Performance (mobile, live URL, every page)**
- [ ] Performance 98+, Accessibility 100, Best Practices 100, SEO 100.
- [ ] No timed popups and no heavy embeds above the fold.

**Accessibility**
- [ ] WCAG 2.2 AA: contrast, keyboard, focus visible, skip link, labels, 24px targets, reduced motion.
- [ ] axe/WAVE reports zero errors, and the VoiceOver pass is done.

**SEO**
- [ ] Every page exports a unique title (50 characters or fewer with the brand, 60 max), description and canonical, and has one `h1`.
- [ ] LocalBusiness schema validated. Icons in place (generated from the logo if none were supplied), `opengraph-image` is a 1200×630 picture of the homepage hero that loads on the live domain and passes a meta-tag inspector, and `manifest.js`, `robots.js`, `sitemap.js` and `not-found.js` are in place, and the sitemap lists every page.
- [ ] Redirects from the URL map are tested and return 301, with no chains or loops, and there are no broken links.
- [ ] The production site is indexable, and previews are not.

**Forms and integrations**
- [ ] Every form tested end to end on a deployed URL, honeypot added, server-side validation in place and thank-you state working.
- [ ] No secrets in the repo or in `NEXT_PUBLIC_` variables. Environment variables are set in Netlify. Integrations are documented.
- [ ] Privacy Policy linked, and SMS consent included if the client texts leads.

**Launch and handoff**
- [ ] Domain points to the new site with HTTPS on both `www` and the bare domain. Email records are untouched.
- [ ] Search Console verified and sitemap submitted. GA4 connected and the client has access.
- [ ] Google Business Profile and social links updated.
- [ ] Before/after PageSpeed scores and integration notes saved in `documentation/`.
- [ ] The client has a short care guide: how to request changes, plus where the domain, hosting and forms live.
- [ ] The project checklist is complete, with no unexplained open items (Section 20).
- [ ] The project's `CLAUDE.md` change log is up to date.

---

## 20. Launch Day, Monitoring and Handoff

The launch-day, monitoring and handoff steps are tracked item by item in the project checklist.

### Launch day
1. Get the client's written approval to launch.
2. Take a final backup of the old site (for redesigns).
3. Make sure the DNS TTL was lowered the day before (Section 14).
4. Deploy the approved version to production: merge to `main` and confirm the Netlify production deploy finished without errors.
5. Update **only** the website DNS records, then confirm the domain resolves to the new site with HTTPS on both `www` and the bare domain.
6. Click through every page and menu link, submit every form for real, and test the redirects from the URL map.
7. Confirm that no page is blocked from search: no `noindex` in the page source, and `/robots.txt` allows crawling.
8. Confirm GA4 shows your visit in Realtime. Submit the sitemap in Search Console, and check the Google Business Profile link.
9. Send and receive a test email on the client's domain, to prove email still works.
10. Check the site on desktop and on a phone, then tell the client it's live.

### First 24–72 hours
- Check that the site is up and HTTPS is valid. Forms keep arriving in the right inbox (check spam too).
- Analytics is recording visits and events.
- The most important old URLs, and anything showing in Search Console, return the right page and never a 404.
- Fix DNS or email problems right away. Roll back if something critical breaks.

### First 30 days
- Review Search Console's indexing and crawl-error reports. Watch impressions and clicks for sudden drops.
- Confirm analytics events and conversions are still recording.
- Fix migration-related bugs within the agreed support period.
- Check in with the client to confirm they're happy. Then, and only then, retire the old hosting.

### Ongoing care (new with v3)
- A Next.js site has packages that receive security updates. On maintained sites, check for Next.js and React security releases about once a month, update, rebuild, and re-test the forms.

### Handoff
- Give the client the live URL and the care guide (Section 19).
- Explain where the domain, DNS, hosting and email live, and who renews each one, and when.
- Confirm website ownership and access under the client's plan (Monthly or Lump Sum), plus any recurring hosting or maintenance charges.
- Explain how to request updates, and how long the post-launch support period lasts.
- List the third-party services (forms, booking, CRM) with their account owners and any costs, as in Section 13.

---

## 21. Instructions for AI Coding Agents

When working on a MigsFlow Next.js website, follow this handbook as the default standard.

**Before writing code:**
- Read the project's root `CLAUDE.md` (its guide and change log) and `AGENTS.md`.
- **Don't trust memory for Next.js APIs.** Read the matching guide in `node_modules/next/dist/docs/` first, and heed deprecation notices. This handbook was checked against Next.js 16.4; if the project is on a newer major version and the bundled docs disagree with this handbook, the docs win. Tell Miguelle so the handbook can be updated.
- Read the existing structure and reuse the components, tokens and `lib/` data already there.
- Decide where new code belongs: a token, a shared component, or one page.
- Build with HTML, Tailwind and a small component before reaching for any dependency.
- Keep the established naming, paths and responsive behavior.

**Never silently:**
- Change the architecture, the router, the hosting setup or the Tailwind wiring.
- Switch the project to TypeScript, a `src/` folder or static export.
- Add a dependency, a font CDN, an icon library or a UI kit.
- Add `"use client"` to a page or layout, or make a content page dynamic.
- Add inline styles or scripts beyond Section 3, or a second stylesheet.
- Duplicate a component, a token or a site fact.
- Invent reviews or facts.
- Put secrets in the repo or in `NEXT_PUBLIC_` variables.
- Change live DNS, domain settings, Google accounts, Netlify settings or production deployments. Those changes are made only when the user explicitly asks.

**If a request conflicts with a hard rule,** explain the conflict and the trade-off before building an exception.

**Keep changes focused.** Don't rewrite unrelated code unless asked. When reporting changes, say which file each change is in.

**Explain as you go.** Miguelle is moving from HTML, CSS and JavaScript to this stack. When a change uses a Next.js or Tailwind idea for the first time in a project, say in a sentence or two what it is and what the plain HTML/CSS/JS version would have been. Comment code for a learner: say why, not what.

**Do without being asked:**
- If no favicon was supplied, generate the icon set from the logo (Section 12, Site files) and say that you did.
- Make the link preview image from the homepage hero, and remake it when the hero changes.

**Keep the records current:**
- **The project's root `CLAUDE.md`:** add a dated change-log entry for every change to the site before ending the reply, and update its "current state" notes.
- **`documentation/project-checklist.md`:** tick what's done, note anything unverified, and add major changes to its change log.
- **This handbook:** when Miguelle changes a standard, or a Next.js, Tailwind or Netlify update makes a rule here wrong, update the rule, bump the version line at the top, and add an entry to Section 23. Don't change the handbook to fit one project; a one-off exception is recorded in that project's `CLAUDE.md`.

**Before calling work done,** run `npm run lint` and `npm run build`, check the route table, check the work against Section 19, and report anything not yet verified.

---

## 22. What Carried Over From v2.1 and What Changed

**Carried over unchanged** (the standard is the same; only the tools differ): the performance targets, WCAG 2.2 AA, the title-length and on-page SEO rules, local SEO and schema, content integrity, the back-to-top button, mobile-first, image subfolders, self-hosted fonts, SVG-only icons, no secrets in the front end, facades for heavy embeds, no timed popups, client onboarding, redesign and migration rules, DNS safety, the launch checklist, and launch-day monitoring and handoff.

| Topic | v2.1 (HTML, CSS, JS) | v3.0 (Next.js, Tailwind) |
|---|---|---|
| Pages | `about/index.html` | `app/about/page.js` |
| Shared head, nav, footer | Repeated in every HTML file | Once, in `app/layout.js` |
| Trailing slash | Always | Off for new sites; kept on for redesigns that already use it |
| Styling | `global.css` plus page CSS files | Tailwind classes in the markup; one `app/globals.css` |
| Design tokens | CSS variables on `:root` | `@theme` in `app/globals.css` |
| Reusable pieces | Shared classes in `global.css` | Components in `components/` |
| Breakpoints | `min-width` media queries | `sm:` `md:` `lg:` `xl:` prefixes |
| JavaScript | `global.js` and page files with `defer` | Server Components by default; small `"use client"` components |
| Images | Hand-made WebP, `-m` copies, `<picture>`, width/height, lazy, preload | `next/image` from one source file, with `sizes` and `preload` |
| Background images | `<picture>` positioned behind content | `<Image fill>` positioned behind content |
| Fonts | Download, subset, `@font-face`, preload | `next/font` (self-hosted automatically) |
| Head tags | Written in each file | `export const metadata` in each `page.js` |
| Favicon, manifest, OG image | Root files plus `<link>` tags | Files in `app/`, tags generated |
| `robots.txt`, `sitemap.xml`, `404.html` | Hand-written files | `app/robots.js`, `app/sitemap.js`, `app/not-found.js` |
| Redirects | `_redirects` file | `redirects()` in `next.config.mjs` with `statusCode: 301` |
| Security headers | Not covered | `headers()` in `next.config.mjs` |
| Forms | Outside service only | Server Action, or Netlify Forms with the static-file pattern |
| Secrets | Zapier/Make in the middle | Netlify environment variables read by server code |
| Minifying, critical CSS | Manual step | Done by the build |
| Preview `noindex` | Add by hand, remove on launch day | Automatic through `isProduction` |
| Footer year | `global.js` | `CurrentYear` Client Component |
| Preview hosting | GitHub Pages or Netlify | Netlify only |
| Dependencies | None | A short approved list, kept patched |
| Checks before done | Manual review | `npm run lint` and `npm run build`, plus the manual review |

**New in v3.0, with no v2 equivalent:** Server and Client Components (Sections 2, 8); the static-route rule and the build table (Section 10); the things that break static rendering, including reading the date (Section 8); writing class names in full (Section 4); Preflight's reset (Section 9); environment variables (Section 14); dependency and patching policy (Sections 8, 14); the Netlify Forms static-file pattern (Section 13); `AGENTS.md` and the bundled Next.js docs (Section 21).

**Removed:** rules about `html/` folders and `.html` URLs, `../` relative paths, hand-written `@font-face`, manual WebP conversion, manual minifying, the `_redirects` file, and GitHub Pages hosting. They still apply to v2.1 sites.

---

## 23. Handbook Change Log

Add an entry whenever a rule in this handbook changes. Newest first. Say what changed, why, and which sections.

| Date | Version | Change |
|---|---|---|
| 2026-11-21 | 3.1 | Brought in the two rules added to the HTML edition in v2.2: **the link preview image is always a picture of the homepage hero** (`app/opengraph-image.jpg`, with size, safe-area, how-to, address and checking rules), and **icons are generated from the logo when none are supplied**. Hard rule 11, Section 12 (Site files), the launch checklist (Section 19) and the agent instructions (Section 21) updated. "Which handbook applies where" corrected to Miguelle's 2026-11-16 decision: this edition is for app-like builds, and brochure sites stay on the HTML edition (now v2.2). Not test-built: no example code was changed. |
| 2026-11-16 | 3.0 | First Next.js + Tailwind edition, rewritten from v2.1 (Nov 10, 2026). Sections 1–10, 13 and 14 rewritten for Next.js 16.4, Tailwind 4.3 and Netlify. Sections 11, 12 and 15–20 carried over with stack-specific changes. Hard rules 17–21 added. Sections 22 and 23 added. All example code test-built (`npm run build` fully static, `npm run lint` clean). |

**Open questions to settle on the first v3 build** (update the rules above once answered):
- **Performance 98+ (hard rule 9):** carried over from v2.1 but not yet measured on a deployed MigsFlow Next.js site. Record the first real scores here and confirm or adjust the number.
- **Tailwind wiring:** `create-next-app` 16.4.6 uses the `@tailwindcss/turbopack` loader, while Tailwind's own install guide shows `@tailwindcss/postcss`. Section 1 says to keep whatever the generator writes. Re-check when either tool updates.
- **Form backend:** Server Action plus an email service, or Netlify Forms. Both patterns are documented; note here which one becomes the MigsFlow default.
- **JavaScript or TypeScript:** JavaScript for now (Section 8).
- **Preview image address on preview deploys (added in v3.1):** `metadataBase` is the production domain, so `og:image` points there even on a Netlify preview. Proposed fix, **not yet test-built**: in `app/layout.js`, `metadataBase: new URL(isProduction ? site.url : (process.env.DEPLOY_PRIME_URL || site.url))`. Check on the first build that it works, and that canonicals and the sitemap still use the production domain (they must, per `lib/site.js`); previews are already `noindex`. Then move the working code into Section 12.

**Earlier versions:** v2.1 (Nov 10, 2026) and v2.0 are the HTML/CSS/JS editions. The master copies and PDFs are in `New Web Design Folder/MigsFlow Handbook/`.
