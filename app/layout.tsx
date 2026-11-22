import type { Metadata } from "next";
import { Orbitron, Poppins } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

// The root layout: the outer shell of EVERY page (<html> and <body>).
// In a plain HTML site this markup was repeated at the top of every file.
// Here it is written once, and each page is dropped in where {children} is.

// next/font downloads these font files when the site is built and serves them
// from our own site, so the browser never contacts Google. Each one creates a
// CSS variable that globals.css turns into the font-sans / font-display classes.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"], // only the weights the design uses
  variable: "--font-poppins",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

// "metadata" becomes the tags inside <head>. In plain HTML you typed <title>
// and <meta> into every page; here Next.js writes them for you.
export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s | ${site.name}`, // a page titled "Billing" becomes "Billing | MigsFlow Studio"
  },
  description: "Prototype of the MigsFlow Studio customer dashboard.",
  // This is a prototype, so search engines are told to stay out.
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
