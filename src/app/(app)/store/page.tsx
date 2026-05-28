import type { Metadata } from "next";

import { JsonLd } from "@/components/common/json-ld";
import { siteConfig } from "@/config/site";
import {
  listStoreCategories,
  loadStoreItems,
  STORE_PAGE_SIZE,
  StoreView,
} from "@/features/store";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  collectionPageJsonLd,
} from "@/lib/seo";

const description = "Digital products — templates, e-books, and tools.";

export const metadata: Metadata = {
  title: "Store",
  description,
  alternates: { canonical: "/store" },
  openGraph: {
    title: `Store · ${siteConfig.name}`,
    description,
    url: absoluteUrl("/store"),
    type: "website",
  },
};

type RouteProps = {
  searchParams: Promise<{ category?: string }>;
};

/**
 * Store — listing of free and paid digital products.
 * First page rendered on the server; client view picks up infinite
 * scroll and filter changes.
 */
export default async function StorePage({ searchParams }: RouteProps) {
  const { category } = await searchParams;
  const filter = category ? { categorySlug: category } : undefined;

  const [initialPage, categories] = await Promise.all([
    loadStoreItems({ filter, limit: STORE_PAGE_SIZE }),
    listStoreCategories(),
  ]);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <JsonLd
        data={collectionPageJsonLd({
          name: "Store",
          description,
          url: absoluteUrl("/store"),
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: absoluteUrl("/") },
          { name: "Store", url: absoluteUrl("/store") },
        ])}
      />

      <header className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Store
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Things you can use
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
          Templates, e-books, and tools. Some free, some paid — all
          built to be useful.
        </p>
      </header>

      <StoreView
        initialPage={initialPage}
        categories={categories}
        initialCategorySlug={category ?? null}
      />
    </div>
  );
}
