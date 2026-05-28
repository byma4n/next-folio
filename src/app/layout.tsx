import type { Metadata, Viewport } from "next";

import { JsonLd } from "@/components/common/json-ld";
import { siteConfig } from "@/config/site";
import { fontVariables } from "@/lib/fonts";
import "@/lib/fontawesome";
import { absoluteUrl, personJsonLd, webSiteJsonLd } from "@/lib/seo";
import {
  facebookUrl,
  githubUrl,
  instagramUrl,
  linkedinUrl,
  threadsUrl,
  tiktokUrl,
  xUrl,
} from "@/lib/social-links";
import { cn } from "@/lib/utils";
import { AppProviders } from "@/providers";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  category: "technology",
  /**
   * Tells the browser not to auto-link strings that look like phone
   * numbers, emails, or addresses. Avoids inconsistent styling on
   * iOS and keeps the contact UX explicit.
   */
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [siteConfig.ogImage],
    locale: siteConfig.ogLocale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: siteConfig.verification.google || undefined,
    yandex: siteConfig.verification.yandex || undefined,
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

/**
 * Builds the list of social profile URLs used by the `Person`
 * JSON-LD `sameAs` array. Helpers return `null` for empty handles,
 * so we can filter cleanly without referring to each platform twice.
 */
function buildSameAsUrls(): string[] {
  const { socials } = siteConfig.contact;
  return [
    facebookUrl(socials.facebook),
    instagramUrl(socials.instagram),
    threadsUrl(socials.threads),
    tiktokUrl(socials.tiktok),
    xUrl(socials.x),
    linkedinUrl(socials.linkedin),
    githubUrl(socials.github),
  ].filter((url): url is string => url !== null);
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const sameAsUrls = buildSameAsUrls();

  return (
    <html
      lang={siteConfig.htmlLang}
      suppressHydrationWarning
      className={cn("h-full", fontVariables)}
    >
      <body className={cn("min-h-full font-sans antialiased")}>
        {/*
          Site-wide structured data. `WebSite` exposes a SearchAction
          for search engines; `Person` connects this site to other
          social profiles via sameAs.
        */}
        <JsonLd data={webSiteJsonLd()} />
        <JsonLd data={personJsonLd({ socialUrls: sameAsUrls })} />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

/**
 * Helper exported for callers that want to build absolute URLs
 * without importing `lib/seo` directly.
 */
export { absoluteUrl };
