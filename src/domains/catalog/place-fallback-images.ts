import type { CategorySlug } from "./api/types";

export const CATEGORY_SLUGS: CategorySlug[] = [
  "restaurant",
  "activity",
  "shopping",
  "walk",
  "bar",
  "culture",
  "cafe",
  "other",
];

export function placeFallbackImage(slug: CategorySlug) {
  return `/static/place-fallback-${slug}.webp`;
}
