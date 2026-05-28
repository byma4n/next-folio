import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Tag } from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { StoreItem } from "../types";

/**
 * Sidebar widget that lists the most recent store items.
 */
export function LatestStoreItemsCard({
  items,
}: {
  items: readonly StoreItem[];
}) {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>Latest in Store</CardTitle>
        <CardAction>
          <Link
            href="/store"
            aria-label="View all products"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowUpRight className="size-4" />
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {items.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            No products yet.
          </p>
        ) : (
          items.map((item) => <StoreRow key={item.id} item={item} />)
        )}
      </CardContent>
    </Card>
  );
}

function StoreRow({ item }: { item: StoreItem }) {
  return (
    <Link
      href={`/store/${item.slug}`}
      className="group flex items-center gap-3"
    >
      <div className="relative size-10 shrink-0 overflow-hidden rounded-md bg-muted">
        <Image
          src={item.coverUrl}
          alt=""
          fill
          sizes="40px"
          className="object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground group-hover:underline">
          {item.title}
        </p>
        <PricingMeta item={item} />
      </div>
    </Link>
  );
}

function PricingMeta({ item }: { item: StoreItem }) {
  if (item.pricing === "free") {
    return <span className="text-xs text-emerald-500">Free</span>;
  }
  return (
    <span className="inline-flex items-center gap-1 truncate text-xs text-amber-500">
      <Tag className="size-2.5" aria-hidden />
      {item.priceLabel ?? "Paid"}
    </span>
  );
}
