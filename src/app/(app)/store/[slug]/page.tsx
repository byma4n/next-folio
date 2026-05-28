import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/common/json-ld";
import { siteConfig } from "@/config/site";
import {
  getStoreItemBySlug,
  listStoreItemSlugs,
  StoreItemDetail,
} from "@/features/store";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  productJsonLd,
} from "@/lib/seo";

type RouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await listStoreItemSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getStoreItemBySlug(slug);
  if (!item) {
    return {
      title: "Product not found",
      robots: { index: false, follow: false },
    };
  }

  const url = absoluteUrl(`/store/${item.slug}`);

  return {
    title: item.title,
    description: item.excerpt,
    alternates: { canonical: `/store/${item.slug}` },
    openGraph: {
      title: item.title,
      description: item.excerpt,
      url,
      type: "website",
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.excerpt,
    },
  };
}

export default async function StoreItemPage({ params }: RouteProps) {
  const { slug } = await params;
  const item = await getStoreItemBySlug(slug);
  if (!item) notFound();

  const url = absoluteUrl(`/store/${item.slug}`);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <JsonLd
        data={productJsonLd({
          title: item.title,
          description: item.excerpt,
          url,
          imageUrl: item.coverUrl,
          pricing: item.pricing,
          priceLabel:
            item.pricing === "paid" ? item.priceLabel : undefined,
          purchaseUrl:
            item.pricing === "paid" ? item.purchaseUrl : item.previewUrl,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: absoluteUrl("/") },
          { name: "Store", url: absoluteUrl("/store") },
          { name: item.title, url },
        ])}
      />
      <StoreItemDetail item={item} />
    </div>
  );
}
