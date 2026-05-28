import type { Metadata } from "next";
import { Newspaper } from "lucide-react";

import { JsonLd } from "@/components/common/json-ld";
import { siteConfig } from "@/config/site";
import {
  ARTICLES_PAGE_SIZE,
  loadArticles,
  PostsView,
} from "@/features/articles";
import {
  getCurrentProfile,
  ProfileHeader,
  ProfileSocialLinks,
} from "@/features/profile";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  /**
   * Use the global title (`siteConfig.name`) as-is — the home page
   * is the landing page, so the brand stands alone instead of being
   * suffixed via the layout's title template.
   */
  title: { absolute: `${siteConfig.name} — ${siteConfig.author.role}` },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.author.role}`,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    type: "website",
  },
};

/**
 * Home route — profile header and the latest articles feed.
 * The first article page is fetched on the server so the initial
 * paint includes content; the client view picks up infinite scroll.
 */
export default async function HomePage() {
  const [profile, initialPage] = await Promise.all([
    getCurrentProfile(),
    loadArticles({ limit: ARTICLES_PAGE_SIZE }),
  ]);

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
  ]);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
      <JsonLd data={breadcrumb} />

      <ProfileHeader
        profile={profile}
        action={<ProfileSocialLinks profileName={profile.name} />}
      />

      <section className="flex flex-col gap-6">
        <h2 className="flex items-center gap-2 text-base font-semibold text-foreground">
          <Newspaper className="size-4" aria-hidden />
          Latest Posts
        </h2>
        <PostsView initialPage={initialPage} />
      </section>
    </div>
  );
}
