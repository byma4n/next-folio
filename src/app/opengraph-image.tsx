import { ImageResponse } from "next/og";

import { OG_SIZE, OgTemplate } from "@/components/common/og-template";
import { siteConfig } from "@/config/site";

/**
 * Default OG image for the whole site.
 *
 * Per-route OG images can override this by adding their own
 * `opengraph-image.tsx` inside the route folder — Next.js picks the
 * most specific.
 *
 * Kept dependency-free (no font fetching, no remote cover) so the
 * build doesn't need network access for the homepage card.
 */
export const alt = `${siteConfig.name} — ${siteConfig.author.role}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <OgTemplate
        eyebrow={siteConfig.shortName}
        title={siteConfig.author.name}
        meta={siteConfig.author.role}
      />
    ),
    { ...size },
  );
}
