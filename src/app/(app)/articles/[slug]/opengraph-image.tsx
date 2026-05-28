import { ImageResponse } from "next/og";

import { OG_SIZE, OgTemplate } from "@/components/common/og-template";
import { getArticleBySlug } from "@/features/articles";
import { compressForOg, fetchImageAsDataUrl } from "@/lib/og-image";

/**
 * Per-article OG image.
 *
 * The cover is downloaded server-side and inlined as a data URL, so
 * Satori always has the bytes available and we can fall back to the
 * gradient template if fetching fails.
 */
export const size = OG_SIZE;
export const contentType = "image/png";

type RouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateImageMetadata({ params }: RouteProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  return [
    {
      id: "main",
      alt: article ? article.title : "Article",
      contentType,
      size,
    },
  ];
}

export default async function Image({ params }: RouteProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  const title = article?.title ?? "Article";

  const coverDataUrl = article?.coverUrl
    ? await fetchImageAsDataUrl(compressForOg(article.coverUrl))
    : null;

  const meta = article?.publishedAt
    ? formatPublishedShort(article.publishedAt)
    : undefined;

  return new ImageResponse(
    (
      <OgTemplate
        eyebrow="Article"
        title={title}
        coverDataUrl={coverDataUrl}
        meta={meta}
      />
    ),
    { ...size },
  );
}

function formatPublishedShort(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}
