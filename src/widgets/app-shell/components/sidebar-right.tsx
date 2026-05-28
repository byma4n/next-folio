import { ArticleListCard, listArticles } from "@/features/articles";
import { LatestProjectsCard, listLatestProjects } from "@/features/projects";
import {
  LatestStoreItemsCard,
  listLatestStoreItems,
} from "@/features/store";
import { cn } from "@/lib/utils";

/**
 * Right sidebar of the app shell.
 *
 * Composes three independent features (articles, projects, store).
 * This composition lives in a widget — features never reference each
 * other directly.
 */
export async function SidebarRight({ className }: { className?: string }) {
  const [articles, latestProjects, latestStoreItems] = await Promise.all([
    listArticles(),
    listLatestProjects(4),
    listLatestStoreItems(4),
  ]);

  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-svh w-72 shrink-0 flex-col gap-4 overflow-y-auto border-l border-border/60 px-4 py-4 lg:flex",
        className,
      )}
    >
      <ArticleListCard articles={articles} />
      <LatestProjectsCard projects={latestProjects} />
      <LatestStoreItemsCard items={latestStoreItems} />
    </aside>
  );
}
