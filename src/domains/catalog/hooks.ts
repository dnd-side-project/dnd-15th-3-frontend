import { useQuery } from "@tanstack/react-query";

import { catalogQueries } from "./api/queries";

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
