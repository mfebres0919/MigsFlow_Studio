import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/lib/site";

// The root layout: the outer shell of EVERY page (<html> and <body>).
// In a plain HTML site this markup was repeated at the top of every file.
// Here it is written once, and each page is dropped in where {children} is.

// The two MigsFlow brand fonts. The files live in app/fonts/ (the same ones
// the MigsFlow website uses) and are served from our own site: nothing is
// loaded from Google or anywhere else. This is the old @font-face block,
// written as a function call. Each font creates a CSS variable that
// globals.css turns into the font-sans / font-display classes.
const poppins = localFont({
  src: [
    { path: "./fonts/poppins-v24-latin-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/poppins-v24-latin-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/poppins-v24-latin-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-poppins",
});

// Only the brand name and page titles use Orbitron, always at weight 600.
const orbitron = localFont({
  src: [{ path: "./fonts/orbitron-v35-latin-600.woff2", weight: "600", style: "normal" }],
  variable: "--font-orbitron",
});

// "metadata" becomes the tags inside <head>. In plain HTML you typed <title>
// and <meta> into every page; here Next.js writes them for you.
export const metadata: Metadata = {
  // The full address every link below (canonical, preview image) is built from.
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`, // a page titled "Billing" becomes "Billing | MigsFlow Studio"
  },
  description: "Prototype of the MigsFlow Studio customer dashboard.",
  // For link previews in texts, Slack and social media (handbook Section 12).
  // The picture itself is app/opengraph-image.jpg.
  openGraph: { type: "website", siteName: site.name },
  twitter: { card: "summary_large_image" },
  // Private by default: the dashboard, editor and previews are never listed
  // by search engines. The public pages' layout overrides this at launch.
  robots: { index: false, follow: false },
};

// Runs before the page is drawn: if this visitor chose a theme before, put it
// on <html> straight away. Without it, a dark-mode visitor would see a light
// flash on every page load. This tiny inline script is the one approved
// exception to "no inline scripts" (handbook Section 3), and it follows the
// Next.js guide "preventing flash before hydration".
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

// LayoutProps<"/"> is a type Next.js generates for us. It says: this layout
// receives "children" (the page to show inside it).
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-theme="light" is the default. suppressHydrationWarning tells React
    // it is fine that the script above may have changed this attribute.
    <html
      lang="en"
      data-theme="light"
      data-scroll-behavior="smooth" // lets Next.js skip the smooth scroll when changing pages
      suppressHydrationWarning
      className={`${poppins.variable} ${orbitron.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body id="top" className="min-h-dvh bg-ink font-sans text-fg">
        {/* Skip link: the first thing a keyboard user reaches. Hidden until focused. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-control focus:bg-fg focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
