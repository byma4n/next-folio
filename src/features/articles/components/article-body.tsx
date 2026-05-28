import type { ArticleBlock } from "../types";

/**
 * Renders a list of article blocks as the body of a long-form page.
 *
 * Reused by the store-item detail page: the block schema is the
 * same, so there's no point duplicating the renderer.
 */
export function ArticleBody({
  blocks,
}: {
  blocks?: readonly ArticleBlock[];
}) {
  if (!blocks || blocks.length === 0) {
    return (
      <p className="text-sm italic text-muted-foreground">
        No content yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-5 text-sm leading-[1.75] text-foreground sm:text-[15px]">
      {blocks.map((block, idx) => (
        <BlockRenderer key={idx} block={block} />
      ))}
    </div>
  );
}

function BlockRenderer({ block }: { block: ArticleBlock }) {
  switch (block.kind) {
    case "heading":
      return block.level === 2 ? (
        <h2 className="mt-3 text-lg font-semibold tracking-tight text-foreground sm:mt-4 sm:text-xl">
          {block.text}
        </h2>
      ) : (
        <h3 className="mt-3 text-base font-semibold tracking-tight text-foreground sm:mt-4 sm:text-lg">
          {block.text}
        </h3>
      );
    case "paragraph":
      return <p>{block.text}</p>;
  }
}
