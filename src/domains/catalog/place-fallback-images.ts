import type { CategorySlug } from "./api/types";

export function placeFallbackImage(slug: CategorySlug) {
  return `/static/place-fallback-${slug}.webp`;
}
