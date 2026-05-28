import { StoreItemCard } from "./store-item-card";
import type { StoreItem } from "../types";

/**
 * Masonry grid of store-item cards.
 *
 * 1 column on mobile, 2 on small+ screens — same rhythm as the
 * Projects page so users feel at home moving between the two.
 */
export function StoreGrid({ items }: { items: readonly StoreItem[] }) {
  if (items.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No products yet.
      </p>
    );
  }

  return (
    <div className="columns-1 gap-5 sm:columns-2 [column-fill:_balance]">
      {items.map((item) => (
        <div key={item.id} className="mb-5 break-inside-avoid">
          <StoreItemCard item={item} />
        </div>
      ))}
    </div>
  );
}
