import type { Metadata } from "next";
import PauseOffscreen from "@/components/marketing/PauseOffscreen";
import SiteFooter from "@/components/marketing/SiteFooter";
import SiteHeader from "@/components/marketing/SiteHeader";
import BackToTop from "@/components/ui/BackToTop";
import { site } from "@/lib/site";

// Search engines may list the public pages only once Studio launches
// (site.indexable in lib/site.ts). Until then the root layout's "noindex" applies.
export const metadata: Metadata = site.indexable ? { robots: { index: true, follow: true } } : {};

// Layout for the PUBLIC pages: the landing page and the template marketplace.
// The folder name "(public)" is in parentheses, which makes it a "route
// group": it gives these pages their own header and footer, but never
// appears in the address. app/(public)/templates/page.tsx is "/templates".
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    // A column as tall as the screen, so a short page still has its footer at the bottom.
    // "site-backdrop" (app/globals.css) is the soft brand glow from migsflow.com, down the whole page.
    <div className="site-backdrop flex min-h-dvh flex-col">
      <SiteHeader />
      {/* pt-4: a little air under the floating header. Pages that open with a
          PageHero pull themselves up beneath the header instead. */}
      <main id="main" className="flex-1 pt-4">
        {children}
      </main>
      <SiteFooter />
      {/* Freezes the stars and other animations while they are scrolled out of view. */}
      <PauseOffscreen />
      <BackToTop />
    </div>
  );
}
