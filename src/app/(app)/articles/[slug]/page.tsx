import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/common/json-ld";
import { siteConfig } from "@/config/site";
import {
  ArticleDetail,
  getArticleBySlug,
  listArticleSlugs,
  type ArticleAuthor,
} from "@/features/articles";
import { getCurrentProfile } from "@/features/profile";
import {
  absoluteUrl,
  articleJsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";

type RouteProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Pre-renders every known article slug at build time so detail
 * pages are served as static HTML. New slugs added later will fall
 * through to dynamic rendering by default.
 */
export async function generateStaticParams() {
  const slugs = await listArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) {
    return {
      title: "Article not found",
      robots: { index: false, follow: false },
    };
  }

  const url = absoluteUrl(`/articles/${article.slug}`);

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.publishedAt,
      authors: [siteConfig.author.name],
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default async function ArticleDetailPage({ params }: RouteProps) {
  const { slug } = await params;
  const [article, profile] = await Promise.all([
    getArticleBySlug(slug),
    getCurrentProfile(),
  ]);
  if (!article) notFound();

  const author: ArticleAuthor = {
    name: profile.name,
    handle: profile.handle,
    avatarUrl: profile.avatarUrl,
  };

  const url = absoluteUrl(`/articles/${article.slug}`);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <JsonLd
        data={articleJsonLd({
          title: article.title,
          description: article.excerpt,
          url,
          imageUrl: article.coverUrl,
          publishedAt: article.publishedAt,
          authorName: profile.name,
          authorUrl: absoluteUrl("/profile"),
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: absoluteUrl("/") },
          { name: "Articles", url: absoluteUrl("/articles") },
          { name: article.title, url },
        ])}
      />
      <ArticleDetail article={article} author={author} />
    </div>
  );
}
