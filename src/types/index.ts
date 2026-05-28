/**
 * Shared types used across features.
 * Feature-specific types stay inside their feature folder.
 */

export type WithChildren<T = unknown> = T & {
  children: React.ReactNode;
};

export type AsyncPageProps<
  Params = Record<string, string>,
  SearchParams = Record<string, string | string[] | undefined>,
> = {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
};
