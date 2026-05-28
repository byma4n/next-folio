import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { MobileThemeFloater } from "@/components/layout/mobile-theme-floater";

import { SidebarLeft } from "./sidebar-left";
import { SidebarRight } from "./sidebar-right";

/**
 * Three-column application shell.
 *
 *   ┌──────┬────────────────────────────┬──────┐
 *   │ left │ main (children)            │ right│
 *   └──────┴────────────────────────────┴──────┘
 *
 * Sidebars stick to the viewport on wide screens; the main column
 * scrolls naturally so feeds can grow without bound.
 *
 * On mobile the side rails are hidden — `MobileBottomNav` takes
 * over primary navigation, and `MobileThemeFloater` floats the theme
 * switcher just above it. The main column reserves bottom padding so
 * the last item isn't hidden behind these bars.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-[1400px]">
      <SidebarLeft />
      <main className="min-w-0 flex-1 px-4 pt-6 pb-28 md:px-8 md:pb-6">
        {children}
      </main>
      <SidebarRight />
      <MobileThemeFloater />
      <MobileBottomNav />
    </div>
  );
}
