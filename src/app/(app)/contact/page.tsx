import type { Metadata } from "next";

import { JsonLd } from "@/components/common/json-ld";
import {
  ContactPrimaryChannels,
  ContactSocialChannels,
} from "@/components/common/contact-channels";
import { siteConfig } from "@/config/site";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

const description =
  "How to get in touch — WhatsApp, email, or social media.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact · ${siteConfig.name}`,
    description,
    url: absoluteUrl("/contact"),
    type: "website",
  },
};

/**
 * Contact — single-purpose page surfacing every way to reach you.
 * Data lives in `siteConfig.contact`; this page only composes.
 */
export default function ContactPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: absoluteUrl("/") },
          { name: "Contact", url: absoluteUrl("/contact") },
        ])}
      />

      <header className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Contact
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Let&apos;s talk
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          A new project, a collaboration, or just a friendly hello —
          pick whichever channel works best for you.
        </p>
      </header>

      <ContactPrimaryChannels />

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Or find me on
        </h2>
        <ContactSocialChannels />
      </section>
    </div>
  );
}
