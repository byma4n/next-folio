import { AppShell } from "@/widgets/app-shell";

/**
 * Layout for the main app section.
 *
 * Routes inside this group share the three-column shell. Marketing
 * or auth pages can live in their own route group with no shell.
 */
export default function AppGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
