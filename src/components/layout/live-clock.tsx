"use client";

import { useClock } from "@/hooks/use-clock";
import { useMounted } from "@/hooks/use-mounted";
import { siteConfig } from "@/config/site";

/**
 * Live clock with date and region label.
 *
 *   ┌─────────────────────┬──────┐
 *   │  15:12   USA        │ MAY  │
 *   │                     │  29  │
 *   └─────────────────────┴──────┘
 *
 * Single pill with a subtle internal divider — both segments share
 * the same background so the widget reads as one unit. SSR-safe via
 * `useMounted` so server/client outputs match before hydration.
 */
export function LiveClock() {
  const mounted = useMounted();
  const now = useClock();

  const date = mounted ? new Date(now) : null;

  return (
    <div
      role="group"
      aria-label="Local time and date"
      className="flex w-fit items-stretch overflow-hidden rounded-xl border border-border/60 bg-muted/60 text-foreground"
    >
      <ClockSegment date={date} />
      <Divider />
      <DateSegment date={date} />
    </div>
  );
}

function ClockSegment({ date }: { date: Date | null }) {
  return (
    <div className="flex flex-1 items-center gap-1.5 px-3 py-2">
      <time
        dateTime={date?.toISOString()}
        className="font-mono text-sm font-medium tabular-nums leading-none"
      >
        {date ? formatTime(date) : "--:--"}
      </time>
      <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {siteConfig.region}
      </span>
    </div>
  );
}

function Divider() {
  return <span aria-hidden className="w-px self-stretch bg-border/60" />;
}

function DateSegment({ date }: { date: Date | null }) {
  return (
    <div className="flex w-12 flex-col items-center justify-center px-2 py-1">
      <span className="text-[9px] font-semibold uppercase tracking-wider text-rose-400/90">
        {date ? formatMonth(date) : "---"}
      </span>
      <span className="text-sm font-semibold leading-tight">
        {date ? String(date.getDate()).padStart(2, "0") : "--"}
      </span>
    </div>
  );
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: siteConfig.timezone,
  });
}

function formatMonth(date: Date): string {
  return date.toLocaleString("en-US", {
    month: "short",
    timeZone: siteConfig.timezone,
  });
}
