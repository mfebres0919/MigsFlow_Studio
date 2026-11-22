import BackToTop from "@/components/ui/BackToTop";
import ThemeToggle from "@/components/ui/ThemeToggle";

// Layout for the PUBLIC pages (landing page now; marketplace and pricing in Phase 2).
// The folder name "(public)" is in parentheses, which makes it a "route group":
// it organizes files and gives these pages their own shell, but it never
// appears in the address. app/(public)/page.tsx is simply "/".
// The public header and footer are added here in Phase 2.
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>
      <main id="main" className="grid min-h-dvh place-items-center px-4 py-16">
        {children}
      </main>
      <BackToTop />
    </>
  );
}
