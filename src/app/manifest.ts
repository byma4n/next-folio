import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

/**
 * Web App Manifest.
 *
 * Even without a full PWA setup, shipping a manifest improves the
 * "Add to Home Screen" experience on mobile and is one of the small
 * signals search engines use when assessing site polish.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    lang: siteConfig.locale,
    dir: "ltr",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
