import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowUpRightFromSquare,
  faDownload,
  faLock,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import { ArticleBody } from "@/features/articles";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { StoreItem } from "../types";

/**
 * Detail page for a store item.
 *
 *   - Back button
 *   - Cover (16:10)
 *   - Pricing badge + title + excerpt
 *   - Action cards (preview + buy/download/source)
 *   - Body blocks
 */
export function StoreItemDetail({ item }: { item: StoreItem }) {
  return (
    <article className="flex flex-col gap-8">
      <BackButton />
      <Cover item={item} />
      <Headline item={item} />
      <ActionRow item={item} />
      <ArticleBody blocks={item.body} />
    </article>
  );
}

function BackButton() {
  return (
    <Button
      asChild
      variant="ghost"
      size="sm"
      className="-ml-2 w-fit rounded-full"
    >
      <Link href="/store">
        <FontAwesomeIcon icon={faArrowLeft} className="size-3.5" aria-hidden />
        Back to Store
      </Link>
    </Button>
  );
}

function Cover({ item }: { item: StoreItem }) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-muted">
      <Image
        src={item.coverUrl}
        alt={item.title}
        fill
        priority
        sizes="(min-width: 1024px) 720px, 100vw"
        className="object-cover"
      />
    </div>
  );
}

function Headline({ item }: { item: StoreItem }) {
  return (
    <header className="flex flex-col gap-3 sm:gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <PricingPill item={item} />
        {item.categories.map((category) => (
          <Link
            key={category.slug}
            href={`/store?category=${category.slug}`}
            className="inline-flex items-center rounded-full border border-border/60 bg-card px-2.5 py-0.5 text-xs text-muted-foreground transition-colors hover:border-border hover:text-foreground"
          >
            {category.name}
          </Link>
        ))}
      </div>
      <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {item.title}
      </h1>
      <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
        {item.excerpt}
      </p>
    </header>
  );
}

function PricingPill({ item }: { item: StoreItem }) {
  if (item.pricing === "free") {
    return (
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-500">
        Free
      </span>
    );
  }
  return (
    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-medium text-amber-500">
      <FontAwesomeIcon icon={faTag} className="size-3" aria-hidden />
      {item.priceLabel ?? "Paid"}
    </span>
  );
}

function ActionRow({ item }: { item: StoreItem }) {
  const actions = collectActions(item);
  if (actions.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {actions.map((action) => (
        <ActionCard key={action.id} action={action} />
      ))}
    </div>
  );
}

function ActionCard({ action }: { action: Action }) {
  return (
    <a
      href={action.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex items-center gap-3 rounded-xl border border-border/60 bg-card p-3 transition-colors hover:border-border",
        action.primary && "border-foreground/30 bg-foreground/5",
      )}
    >
      <span
        className={cn(
          "inline-flex size-10 shrink-0 items-center justify-center rounded-full",
          action.accentClass,
        )}
      >
        <FontAwesomeIcon icon={action.icon} className="size-4" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">{action.title}</p>
        <p className="truncate text-xs text-muted-foreground">
          {action.subtitle}
        </p>
      </div>
      <FontAwesomeIcon
        icon={faArrowUpRightFromSquare}
        className="size-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
        aria-hidden
      />
    </a>
  );
}

type Action = {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly href: string;
  readonly icon: IconDefinition;
  readonly accentClass: string;
  readonly primary?: boolean;
};

function collectActions(item: StoreItem): readonly Action[] {
  const actions: Action[] = [
    {
      id: "preview",
      title: "Live Preview",
      subtitle: hostnameOf(item.previewUrl),
      href: item.previewUrl,
      icon: faArrowUpRightFromSquare,
      accentClass: "bg-sky-500/15 text-sky-500",
    },
  ];

  if (item.pricing === "paid") {
    actions.push({
      id: "buy",
      title: item.priceLabel ? `Buy — ${item.priceLabel}` : "Buy",
      subtitle: hostnameOf(item.purchaseUrl),
      href: item.purchaseUrl,
      icon: faTag,
      accentClass: "bg-amber-500 text-white",
      primary: true,
    });
    return actions;
  }

  if (item.repoUrl) {
    actions.push({
      id: "source",
      title: "Source Code",
      subtitle: hostnameOf(item.repoUrl),
      href: item.repoUrl,
      icon: faGithub,
      accentClass: "bg-foreground text-background",
      primary: true,
    });
  }
  if (item.downloadUrl) {
    actions.push({
      id: "download",
      title: "Download",
      subtitle: hostnameOf(item.downloadUrl),
      href: item.downloadUrl,
      icon: faDownload,
      accentClass: "bg-emerald-500/15 text-emerald-500",
    });
  }

  if (actions.length === 1) {
    actions.push({
      id: "soon",
      title: "Soon",
      subtitle: "Download details coming",
      href: "#",
      icon: faLock,
      accentClass: "bg-muted text-muted-foreground",
    });
  }

  return actions;
}

function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
