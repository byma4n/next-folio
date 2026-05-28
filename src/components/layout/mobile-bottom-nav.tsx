"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { sidebarNav } from "@/config/nav";
import { cn } from "@/lib/utils";

/**
 * Bottom tab bar for mobile.
 *
 * Mirrors the desktop sidebar nav so users see the same destinations
 * regardless of device. Visible only below `md` since on wider
 * screens the left sidebar already plays this role.
 *
 * Pads the safe-area inset so the bar sits above the iOS home
 * indicator.
 */
export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around px-2">
        {sidebarNav.map((item) => {
          const Icon = item.icon;
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                aria-label={item.label}
                className={cn(
                  "flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="size-5" aria-hidden />
                <span className="truncate">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
