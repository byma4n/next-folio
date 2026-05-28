import { ImageResponse } from "next/og";

import { OG_SIZE, OgTemplate } from "@/components/common/og-template";
import { getStoreItemBySlug } from "@/features/store";
import { compressForOg, fetchImageAsDataUrl } from "@/lib/og-image";

/**
 * Per-store-item OG image.
 *
 * Pricing is surfaced in the eyebrow so the card communicates
 * "Free vs Paid" at a glance. Categories form the meta line.
 */
export const size = OG_SIZE;
export const contentType = "image/png";

type RouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateImageMetadata({ params }: RouteProps) {
  const { slug } = await params;
  const item = await getStoreItemBySlug(slug);
  return [
    {
      id: "main",
      alt: item ? item.title : "Store",
      contentType,
      size,
    },
  ];
}

export default async function Image({ params }: RouteProps) {
  const { slug } = await params;
  const item = await getStoreItemBySlug(slug);
  const title = item?.title ?? "Store";

  const coverDataUrl = item?.coverUrl
    ? await fetchImageAsDataUrl(compressForOg(item.coverUrl))
    : null;

  const eyebrow = item ? buildEyebrow(item) : "Store";
  const meta =
    item && item.categories.length > 0
      ? item.categories.map((c) => c.name).join(" · ")
      : undefined;

  return new ImageResponse(
    (
      <OgTemplate
        eyebrow={eyebrow}
        title={title}
        coverDataUrl={coverDataUrl}
        meta={meta}
      />
    ),
    { ...size },
  );
}

function buildEyebrow(item: {
  pricing: "free" | "paid";
  priceLabel?: string;
}): string {
  if (item.pricing === "free") return "Store · Free";
  return item.priceLabel ? `Store · ${item.priceLabel}` : "Store · Paid";
}
