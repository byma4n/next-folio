/**
 * Formats an article's publish date as a short, locale-aware label,
 * e.g. "May 10, 2026".
 */
export function formatPublished(
  iso: string,
  locale: string = "en-US",
): string {
  return new Date(iso).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
