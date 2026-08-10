import { useQuery } from "@tanstack/react-query";

import { catalogQueries } from "./api/queries";
import type { CategorySlug } from "./api/types";

export function useMeetingTypes() {
  const { data } = useQuery(catalogQueries.meetingTypes());
  return data ?? [];
}

export function useCategories() {
  const { data } = useQuery(catalogQueries.categories());
  return data ?? [];
}

export function useProfileAvatars() {
  const { data } = useQuery(catalogQueries.profileAvatars());
  return data ?? [];
}

/** 추천·검색 응답은 카테고리를 id 로만 주기 때문에 슬러그로 바꿔 쓴다. */
export function useCategorySlug() {
  const categories = useCategories();
  return (categoryId: string): CategorySlug =>
    categories.find((category) => category.id === categoryId)?.slug ?? "other";
}
