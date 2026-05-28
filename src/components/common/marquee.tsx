"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Generic infinite-scrolling marquee.
 *
 * Animates a track by `-50%`, so the second copy of the content
 * slides into the first copy's position seamlessly. Reversing the
 * animation direction handles right-to-left vs left-to-right without
 * extra keyframes.
 *
 * The track must always be at least twice as wide as the viewport,
 * otherwise `translateX(-50%)` produces visible gaps. We measure the
 * children once on mount and repeat them as many times as needed
 * before duplicating the whole group for the loop. This keeps short
 * content lists working without forcing callers to pad them by hand.
 *
 * Edges are softened with a horizontal mask so items don't pop in.
 * Hovering the marquee pauses the animation when `pauseOnHover` is
 * on.
 */
type MarqueeProps = React.ComponentProps<"div"> & {
  /** Direction items travel. */
  direction?: "left" | "right";
  /** Animation duration in seconds. Larger = slower. */
  speed?: number;
  /** Pause animation when the user hovers the marquee. */
  pauseOnHover?: boolean;
};

export function Marquee({
  direction = "left",
  speed = 30,
  pauseOnHover = true,
  className,
  children,
  ...props
}: MarqueeProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const sampleRef = React.useRef<HTMLDivElement | null>(null);
  const [repeatCount, setRepeatCount] = React.useState(1);

  // Measure once after mount (and on resize) to figure out how many
  // times the children need to repeat to overflow the viewport.
  React.useEffect(() => {
    const container = containerRef.current;
    const sample = sampleRef.current;
    if (!container || !sample) return;

    function recompute() {
      if (!container || !sample) return;
      const containerWidth = container.clientWidth;
      const sampleWidth = sample.scrollWidth;
      if (containerWidth === 0 || sampleWidth === 0) return;
      // Need at least 2x viewport width per copy so the -50% loop
      // never reveals an empty stretch. Round up and clamp.
      const needed = Math.max(
        1,
        Math.ceil((containerWidth * 2) / sampleWidth),
      );
      setRepeatCount(needed);
    }

    recompute();

    const ro = new ResizeObserver(recompute);
    ro.observe(container);
    ro.observe(sample);
    return () => ro.disconnect();
  }, []);

  const trackStyle: React.CSSProperties = {
    animation: `marquee ${speed}s linear infinite`,
    animationDirection: direction === "left" ? "normal" : "reverse",
  };

  // The track holds two identical halves, each containing
  // `repeatCount` copies of the children. The animation slides the
  // track by -50%, swapping halves seamlessly.
  const copies = Array.from({ length: repeatCount });

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative flex w-full overflow-hidden",
        "[--mask:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        "[mask-image:var(--mask)] [-webkit-mask-image:var(--mask)]",
        className,
      )}
      {...props}
    >
      <div
        style={trackStyle}
        className={cn(
          "flex w-max shrink-0",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
      >
        <MarqueeHalf>
          {/* First copy is measured to drive `repeatCount`. */}
          <MarqueeGroup ref={sampleRef}>{children}</MarqueeGroup>
          {copies.slice(1).map((_, idx) => (
            <MarqueeGroup key={`first-${idx}`} aria-hidden>
              {children}
            </MarqueeGroup>
          ))}
        </MarqueeHalf>
        {/* Duplicated half for the seamless loop. Hidden from
            assistive tech so screen readers don't see it twice. */}
        <MarqueeHalf aria-hidden>
          {copies.map((_, idx) => (
            <MarqueeGroup key={`second-${idx}`}>{children}</MarqueeGroup>
          ))}
        </MarqueeHalf>
      </div>
    </div>
  );
}

function MarqueeHalf({
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className="flex shrink-0 items-center" {...props}>
      {children}
    </div>
  );
}

const MarqueeGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function MarqueeGroup({ children, ...props }, ref) {
  return (
    <div
      ref={ref}
      className="flex shrink-0 items-center gap-3 pr-3"
      {...props}
    >
      {children}
    </div>
  );
});
