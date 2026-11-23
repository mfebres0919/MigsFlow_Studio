import SiteFooter from "@/components/marketing/SiteFooter";
import SiteHeader from "@/components/marketing/SiteHeader";
import BackToTop from "@/components/ui/BackToTop";

// Layout for the PUBLIC pages: the landing page and the template marketplace.
// The folder name "(public)" is in parentheses, which makes it a "route
// group": it gives these pages their own header and footer, but never
// appears in the address. app/(public)/templates/page.tsx is "/templates".
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    // A column as tall as the screen, so a short page still has its footer at the bottom.
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      {/* pt-4: a little air under the floating header. Pages that open with a
          PageHero pull themselves up beneath the header instead. */}
      <main id="main" className="flex-1 pt-4">
        {children}
      </main>
      <SiteFooter />
      <BackToTop />
    </div>
  );
}
