/**
 * Formats an experience period like:
 *   "Jan 2024 — Present · 1 yr 8 mo"
 *   "Mar 2022 — Dec 2023 · 1 yr 10 mo"
 *
 * Pure function — no React, easy to unit-test.
 */
export function formatPeriod(
  startIso: string,
  endIso: string | null,
  options?: { presentLabel?: string; locale?: string },
): string {
  const presentLabel = options?.presentLabel ?? "Present";
  const locale = options?.locale ?? "en-US";

  const start = new Date(startIso);
  const end = endIso ? new Date(endIso) : new Date();

  const startLabel = formatMonth(start, locale);
  const endLabel = endIso ? formatMonth(end, locale) : presentLabel;
  const duration = formatDuration(start, end);

  return `${startLabel} — ${endLabel} · ${duration}`;
}

function formatMonth(date: Date, locale: string): string {
  return date.toLocaleDateString(locale, {
    month: "short",
    year: "numeric",
  });
}

function formatDuration(start: Date, end: Date): string {
  const totalMonths =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth()) +
    1;

  if (totalMonths <= 0) return "less than 1 mo";

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (months > 0) parts.push(`${months} mo`);
  return parts.join(" ") || "less than 1 mo";
}
