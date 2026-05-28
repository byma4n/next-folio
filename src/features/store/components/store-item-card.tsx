import Image from "next/image";
import Link from "next/link";
import { Tag } from "lucide-react";

import { cn } from "@/lib/utils";

import type { StoreItem } from "../types";

/**
 * A single store-item card.
 *
 * Cover stays at intrinsic ratio so a masonry layout can pack cards
 * cleanly. A small pricing badge ("Free" / "$49") sits in the
 * top-left of the cover.
 */
export function StoreItemCard({
  item,
  className,
}: {
  item: StoreItem;
  className?: string;
}) {
  return (
    <article className={cn("flex flex-col gap-2.5", className)}>
      <Link
        href={`/store/${item.slug}`}
        className="group relative block overflow-hidden rounded-xl bg-muted"
      >
        <Image
          src={item.coverUrl}
          alt={item.title}
          width={item.coverWidth}
          height={item.coverHeight}
          sizes="(min-width: 768px) 360px, 100vw"
          className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
        />

        <PricingBadge item={item} />

        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0 p-3">
          <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-white drop-shadow-sm sm:text-base">
            {item.title}
          </h3>
        </div>
      </Link>
    </article>
  );
}

function PricingBadge({ item }: { item: StoreItem }) {
  if (item.pricing === "free") {
    return (
      <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-emerald-500/90 px-2 py-0.5 text-[10px] font-medium text-white shadow-sm backdrop-blur-sm">
        Free
      </span>
    );
  }
  return (
    <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-amber-500/90 px-2 py-0.5 text-[10px] font-medium text-white shadow-sm backdrop-blur-sm">
      <Tag className="size-2.5" aria-hidden />
      {item.priceLabel ?? "Paid"}
    </span>
  );
}
