import { ProfileCard, getCurrentProfile } from "@/features/profile";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { LiveClock } from "@/components/layout/live-clock";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { cn } from "@/lib/utils";

/**
 * Left sidebar of the app shell.
 *
 * Composes the profile feature with shared navigation, clock, and
 * the theme switcher. Server Component — fetches the current
 * profile during render.
 */
export async function SidebarLeft({ className }: { className?: string }) {
  const profile = await getCurrentProfile();

  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-svh w-60 shrink-0 flex-col justify-between border-r border-border/60 px-3 py-4 md:flex",
        className,
      )}
    >
      <div className="flex flex-col gap-6">
        <ProfileCard profile={profile} />
        <SidebarNav />
      </div>
      <div className="flex flex-col gap-3">
        <ThemeToggle className="self-start" />
        <LiveClock />
      </div>
    </aside>
  );
}
