import BackToTop from "@/components/ui/BackToTop";
import MobileNav from "@/components/dashboard/MobileNav";
import SidebarContent from "@/components/dashboard/SidebarContent";
import DemoLabel from "@/components/ui/DemoLabel";
import { site } from "@/lib/site";

// Layout for every DASHBOARD page: the sidebar on wide screens, a top bar
// with a menu button on phones, and the page itself where {children} is.
// Moving between dashboard pages swaps only {children}; the sidebar stays put
// and is not reloaded. (In the plain HTML version every page reloaded its own
// copy of the navigation.)
//
// "(dashboard)" is a route group: the parentheses keep it out of the address.
// The pages live in the "dashboard" folder inside it, so the addresses are
// /dashboard, /dashboard/websites, and so on.
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[17rem_minmax(0,1fr)]">
      {/* Wide screens: the sidebar stays in view while the page scrolls. */}
      <aside className="sticky top-0 hidden h-dvh border-r border-line bg-panel lg:block">
        <SidebarContent />
      </aside>

      <div className="flex min-w-0 flex-col">
        {/* Phones and tablets: a slim top bar. The same sidebar content opens as a drawer. */}
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-line bg-panel px-4 py-2 lg:hidden">
          <div className="flex items-center gap-2">
            <MobileNav>
              <SidebarContent />
            </MobileNav>
            <span className="font-display text-sm font-semibold tracking-wide">{site.name}</span>
          </div>
          <DemoLabel>Demo mode</DemoLabel>
        </header>

        <main id="main" className="flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
          <div className="mx-auto max-w-5xl">{children}</div>
        </main>
      </div>

      <BackToTop />
    </div>
  );
}
