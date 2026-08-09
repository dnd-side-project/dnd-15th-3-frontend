import { useQuery } from "@tanstack/react-query";

import { catalogQueries } from "./api/queries";
import { CATEGORIES, MEETING_TYPES, PROFILE_AVATARS } from "./fallback";

export function useMeetingTypes() {
  const { data } = useQuery(catalogQueries.meetingTypes());
  return data ?? MEETING_TYPES;
}

export function useCategories() {
  const { data } = useQuery(catalogQueries.categories());
  return data ?? CATEGORIES;
}

export function useProfileAvatars() {
  const { data } = useQuery(catalogQueries.profileAvatars());
  return data ?? PROFILE_AVATARS;
}
