import { formatDistanceToNowStrict } from "date-fns";

/**
 * Formats a timestamp as a short relative label like "Last month",
 * "3 weeks ago", "2 days ago".
 */
export function formatRelative(iso: string): string {
  const date = new Date(iso);
  const diffMs = Date.now() - date.getTime();

  const oneMinute = 60_000;
  if (diffMs < oneMinute) return "Just now";

  const oneMonth = 30 * 24 * 60 * 60 * 1000;
  const twoMonths = 2 * oneMonth;
  if (diffMs >= oneMonth && diffMs < twoMonths) return "Last month";

  return `${formatDistanceToNowStrict(date)} ago`;
}
