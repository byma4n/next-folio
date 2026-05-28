import { ThemeToggle } from "@/components/common/theme-toggle";

/**
 * Floating theme switcher for mobile.
 *
 * Pinned to the right edge, vertically centred between the header
 * area and the bottom nav. Vertical orientation keeps the pill thin
 * so it doesn't cover content. Hidden on `md+` since the desktop
 * sidebar already exposes the same control.
 */
export function MobileThemeFloater() {
  return (
    <div className="pointer-events-none fixed right-0 bottom-72 z-40 pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="pointer-events-auto rounded-xl border border-border/60 bg-background/85 p-1 shadow-lg backdrop-blur">
        <ThemeToggle orientation="vertical" />
      </div>
    </div>
  );
}
