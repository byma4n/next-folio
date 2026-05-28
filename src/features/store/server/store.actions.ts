"use server";

import type { StoreFilter, StorePage } from "../types";
import { loadStoreItems } from "./store.repository";

/**
 * Server Action wrapper around `loadStoreItems`.
 */
export async function loadStoreItemsAction(args: {
  filter?: StoreFilter;
  cursor?: number;
  limit?: number;
}): Promise<StorePage> {
  return loadStoreItems(args);
}
