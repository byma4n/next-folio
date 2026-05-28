"use client";

import { useTheme } from "next-themes";
import { Monitor, Moon, Sun, type LucideIcon } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useMounted } from "@/hooks/use-mounted";

type ThemeMode = "system" | "light" | "dark";

const OPTIONS: ReadonlyArray<{
  value: ThemeMode;
  icon: LucideIcon;
  label: string;
}> = [
  { value: "system", icon: Monitor, label: "Follow system" },
  { value: "light", icon: Sun, label: "Light mode" },
  { value: "dark", icon: Moon, label: "Dark mode" },
];

/**
 * Three-way theme switcher: System / Light / Dark.
 *
 * Uses `theme` (the user's stored preference) rather than
 * `resolvedTheme` (the effective one) so the "System" option remains
 * selectable even when the OS reports light or dark.
 *
 * Renders a stable placeholder pre-mount to avoid a hydration
 * mismatch caused by `next-themes` reading the user's stored theme
 * on the client.
 */
export function ThemeToggle({
  className,
  orientation = "horizontal",
}: {
  className?: string;
  orientation?: "horizontal" | "vertical";
}) {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  const value: ThemeMode | "" = mounted ? (theme as ThemeMode) ?? "system" : "";

  return (
    <ToggleGroup
      type="single"
      size="sm"
      orientation={orientation}
      value={value}
      onValueChange={(next) => {
        if (next === "system" || next === "light" || next === "dark") {
          setTheme(next);
        }
      }}
      aria-label="Choose theme"
      className={className}
    >
      {OPTIONS.map((option) => {
        const Icon = option.icon;
        return (
          <ToggleGroupItem
            key={option.value}
            value={option.value}
            aria-label={option.label}
            title={option.label}
          >
            <Icon className="size-3.5" aria-hidden />
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
  );
}
